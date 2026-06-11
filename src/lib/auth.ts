import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import fs from 'fs';
import path from 'path';
import { getAdminUserByEmailFromDB, isPersistenceAvailable } from './data-adapter';

// Fail-closed : en production, un JWT_SECRET fort est obligatoire — aucun
// fallback committé (l'ancien fallback public permettait de forger un cookie
// admin valide 7 jours). En dev sans env, un secret explicitement non-sûr
// permet de travailler localement. Le throw est à l'USAGE (pas au chargement
// du module) pour ne pas casser le build si l'env manque : c'est l'auth
// admin qui se ferme, pas le site public.
function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (process.env.NODE_ENV !== 'production') {
    return secret || 'dev-only-insecure-jwt-secret';
  }
  if (!secret || secret.length < 32) {
    throw new Error(
      'JWT_SECRET manquant ou < 32 caractères en production — auth admin désactivée (fail-closed).',
    );
  }
  return secret;
}
const COOKIE_NAME = 'sconnect-admin-token';

interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: string;
  createdAt: string;
}

interface UsersData {
  users: User[];
}

function getUsersFilePath() {
  return path.join(process.cwd(), 'src/lib/data/admin-users.json');
}

function getUsers(): User[] {
  try {
    const filePath = getUsersFilePath();
    const data = fs.readFileSync(filePath, 'utf-8');
    const parsed: UsersData = JSON.parse(data);
    return parsed.users;
  } catch {
    return [];
  }
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export function generateToken(userId: string, email: string, role: string): string {
  return jwt.sign(
    { userId, email, role },
    getJwtSecret(),
    { expiresIn: '7d' }
  );
}

export function verifyToken(token: string): { userId: string; email: string; role: string } | null {
  try {
    // getJwtSecret() peut throw en prod mal configurée → catch = fail-closed
    // (aucun token accepté), jamais fail-open.
    const decoded = jwt.verify(token, getJwtSecret()) as { userId: string; email: string; role: string };
    return decoded;
  } catch {
    return null;
  }
}

export async function authenticateUser(email: string, password: string): Promise<{ success: boolean; token?: string; user?: Omit<User, 'password'>; error?: string }> {
  const normalizedEmail = email.toLowerCase();

  // Try Supabase first
  if (isPersistenceAvailable()) {
    const dbUser = await getAdminUserByEmailFromDB(normalizedEmail);
    if (dbUser) {
      const isValid = await verifyPassword(password, dbUser.password_hash);
      if (!isValid) return { success: false, error: 'Email ou mot de passe incorrect' };
      const token = generateToken(dbUser.id, dbUser.email, dbUser.role);
      return {
        success: true,
        token,
        user: {
          id: dbUser.id,
          email: dbUser.email,
          name: dbUser.name,
          role: dbUser.role,
          createdAt: dbUser.created_at,
        },
      };
    }
  }

  // Fallback fichier JSON : DEV UNIQUEMENT. En production, seule la base
  // fait foi — un fichier d'utilisateurs livré dans le bundle est un
  // backdoor (l'ancien admin-users.json committé contenait un compte au
  // mot de passe connu, accepté même quand Supabase était configuré).
  if (process.env.NODE_ENV === 'production') {
    return { success: false, error: 'Email ou mot de passe incorrect' };
  }
  const users = getUsers();
  const user = users.find(u => u.email.toLowerCase() === normalizedEmail);
  if (!user) return { success: false, error: 'Email ou mot de passe incorrect' };
  const isValid = await verifyPassword(password, user.password);
  if (!isValid) return { success: false, error: 'Email ou mot de passe incorrect' };
  const token = generateToken(user.id, user.email, user.role);
  const { password: _, ...userWithoutPassword } = user;
  return { success: true, token, user: userWithoutPassword };
}

export async function getAuthenticatedUser(): Promise<{ userId: string; email: string; role: string } | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  
  if (!token) {
    return null;
  }
  
  return verifyToken(token);
}

export async function setAuthCookie(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  });
}

export async function removeAuthCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

