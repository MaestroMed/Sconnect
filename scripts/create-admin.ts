/**
 * Crée un compte admin LOCAL pour le back-office en développement.
 *
 * Le back-office (/admin) n'accepte le fichier JSON qu'en dev (en production,
 * seule la base Supabase fait foi — pas de backdoor livré dans le bundle).
 * Ce script remplit src/lib/data/admin-users.json EN LOCAL pour pouvoir
 * tester/utiliser l'admin via `npm run dev`. Le fichier est gitignoré : tes
 * identifiants ne partent jamais dans le repo.
 *
 * Usage :
 *   npm run admin:create -- ton@email.fr "TonMotDePasse"
 */
import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";

const [email, password] = process.argv.slice(2).filter((a) => a !== "--");

if (!email || !password) {
  console.error(
    '\nUsage : npm run admin:create -- ton@email.fr "TonMotDePasse"\n',
  );
  process.exit(1);
}

if (password.length < 8) {
  console.error("\n⚠️  Mot de passe trop court (8 caractères minimum).\n");
  process.exit(1);
}

const filePath = path.join(process.cwd(), "src/lib/data/admin-users.json");

type AdminUser = {
  id: string;
  email: string;
  password: string;
  name: string;
  role: string;
  createdAt: string;
};

let data: { _note?: string; users: AdminUser[] } = { users: [] };
try {
  const raw = fs.readFileSync(filePath, "utf-8");
  data = JSON.parse(raw);
  if (!Array.isArray(data.users)) data.users = [];
} catch {
  // Fichier absent/vide : on repart d'une liste vide.
}

const normalized = email.toLowerCase();
const hash = bcrypt.hashSync(password, 10);
const existing = data.users.find((u) => u.email.toLowerCase() === normalized);

if (existing) {
  existing.password = hash;
  console.log(`\n✓ Mot de passe mis à jour pour ${normalized}`);
} else {
  data.users.push({
    id: String(data.users.length + 1),
    email: normalized,
    password: hash,
    name: "Administrateur",
    role: "admin",
    createdAt: new Date().toISOString(),
  });
  console.log(`\n✓ Compte admin créé : ${normalized}`);
}

fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + "\n");
console.log(
  `  Fichier : ${path.relative(process.cwd(), filePath)} (local, gitignoré)\n` +
    `  Lance « npm run dev » puis connecte-toi sur http://localhost:3000/admin/login\n`,
);
