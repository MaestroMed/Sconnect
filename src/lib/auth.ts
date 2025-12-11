import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import fs from 'fs';
import path from 'path';

const JWT_SECRET = process.env.JWT_SECRET || 'sconnect-france-secret-key-2024';
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
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

export function verifyToken(token: string): { userId: string; email: string; role: string } | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; email: string; role: string };
    return decoded;
  } catch {
    return null;
  }
}

export async function authenticateUser(email: string, password: string): Promise<{ success: boolean; token?: string; user?: Omit<User, 'password'>; error?: string }> {
  const users = getUsers();
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  
  if (!user) {
    return { success: false, error: 'Email ou mot de passe incorrect' };
  }
  
  const isValid = await verifyPassword(password, user.password);
  
  if (!isValid) {
    return { success: false, error: 'Email ou mot de passe incorrect' };
  }
  
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

export function createInitialAdmin() {
  const filePath = getUsersFilePath();
  
  // Create default admin if file doesn't exist or is empty
  if (!fs.existsSync(filePath)) {
    const defaultAdmin = {
      users: [
        {
          id: '1',
          email: 'admin@sconnect-france.fr',
          password: bcrypt.hashSync('admin123', 10),
          name: 'Administrateur',
          role: 'admin',
          createdAt: new Date().toISOString()
        }
      ]
    };
    
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, JSON.stringify(defaultAdmin, null, 2));
  }
}




