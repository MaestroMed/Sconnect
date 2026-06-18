/**
 * Crée (ou met à jour) un compte admin pour le back-office.
 *
 * - Si Supabase est configuré dans .env.local (NEXT_PUBLIC_SUPABASE_URL +
 *   SUPABASE_SERVICE_ROLE_KEY) → écrit dans la table `admin_users` : c'est ce
 *   compte qui sert à se connecter EN PRODUCTION.
 * - Toujours : écrit aussi dans src/lib/data/admin-users.json (gitignoré) pour
 *   le back-office en dev local sans Supabase.
 *
 * Usage :
 *   npm run admin:create -- ton@email.fr "TonMotDePasse"
 */
import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";
import { config as loadEnv } from "dotenv";

loadEnv({ path: ".env.local" });
loadEnv();

const [email, password] = process.argv.slice(2).filter((a) => a !== "--");

if (!email || !password) {
  console.error('\nUsage : npm run admin:create -- ton@email.fr "TonMotDePasse"\n');
  process.exit(1);
}
if (password.length < 8) {
  console.error("\n⚠️  Mot de passe trop court (8 caractères minimum).\n");
  process.exit(1);
}

const normalized = email.toLowerCase();
const hash = bcrypt.hashSync(password, 10);

// ---------- 1. Fichier JSON local (dev) ----------
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
  data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  if (!Array.isArray(data.users)) data.users = [];
} catch {
  /* fichier absent/vide */
}
const existingLocal = data.users.find((u) => u.email.toLowerCase() === normalized);
if (existingLocal) {
  existingLocal.password = hash;
} else {
  data.users.push({
    id: String(data.users.length + 1),
    email: normalized,
    password: hash,
    name: "Administrateur",
    role: "admin",
    createdAt: new Date().toISOString(),
  });
}
fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + "\n");
console.log(`\n✓ Compte local (dev) écrit dans ${path.relative(process.cwd(), filePath)}`);

// ---------- 2. Supabase (production) si configuré ----------
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

async function upsertSupabase() {
  if (!url || !serviceKey) {
    console.log(
      "ℹ️  Supabase non configuré (.env.local) — compte créé en local seulement.\n" +
        "   Pour la PRODUCTION : renseigne NEXT_PUBLIC_SUPABASE_URL +\n" +
        "   SUPABASE_SERVICE_ROLE_KEY dans .env.local puis relance cette commande.\n",
    );
    return;
  }
  const { createClient } = await import("@supabase/supabase-js");
  const supabase = createClient(url, serviceKey, { auth: { persistSession: false } });
  const row = { email: normalized, password_hash: hash, name: "Administrateur", role: "admin" };
  const { data: existing } = await supabase
    .from("admin_users")
    .select("id")
    .eq("email", normalized)
    .maybeSingle();
  const { error } = existing
    ? await supabase.from("admin_users").update(row).eq("id", existing.id)
    : await supabase.from("admin_users").insert(row);
  if (error) {
    console.error(`\n✖ Supabase : ${error.message}`);
    console.error("   (Le schéma SETUP.sql est-il bien exécuté ? La clé est-elle la SERVICE_ROLE ?)\n");
    process.exit(1);
  }
  console.log(
    `✓ Compte admin ${existing ? "mis à jour" : "créé"} dans Supabase (production)\n` +
      `  Connecte-toi sur https://sconnectfrance.fr/admin/login\n`,
  );
}

upsertSupabase();
