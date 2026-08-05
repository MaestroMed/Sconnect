-- =====================================================================
-- S CONNECT FRANCE — INSTALLATION COMPLÈTE DE LA BASE (à coller d'un bloc)
-- =====================================================================
-- À exécuter UNE FOIS dans Supabase → SQL Editor → New query → coller →
-- "Run". Re-jouable sans danger (IF NOT EXISTS / DROP IF EXISTS partout).
--
-- Ce fichier remplace l'ancien schema.sql / complete-setup.sql qui :
--   - créaient un bucket nommé « images » alors que le code utilise
--     « sconnectfrance » (uploads cassés),
--   - injectaient de FAUSSES données (téléphone 01 23…, « 15 ans »,
--     Champs-Élysées) qui écrasaient les vraies,
--   - créaient un admin backdoor admin@sconnect.fr / admin123.
-- Ici : STRUCTURE SEULE. Les vraies données viennent ensuite de
-- `npm run db:seed`, et l'admin de `npm run admin:create`.
-- =====================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ---------- Fonction de mise à jour automatique de updated_at ----------
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- ============================== TABLES ===============================

CREATE TABLE IF NOT EXISTS site_config (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  site_name TEXT NOT NULL DEFAULT 'S Connect France',
  site_tagline TEXT NOT NULL DEFAULT '',
  phone TEXT NOT NULL DEFAULT '',
  phone_emergency TEXT NOT NULL DEFAULT '',
  email TEXT NOT NULL DEFAULT 'contact@sconnectfrance.fr',
  address_street TEXT NOT NULL DEFAULT '',
  address_postal_code TEXT NOT NULL DEFAULT '',
  address_city TEXT NOT NULL DEFAULT '',
  hours_weekdays TEXT NOT NULL DEFAULT '',
  hours_saturday TEXT NOT NULL DEFAULT '',
  hours_emergency TEXT NOT NULL DEFAULT '',
  social_facebook TEXT,
  social_linkedin TEXT,
  social_instagram TEXT,
  seo_title TEXT NOT NULL DEFAULT '',
  seo_description TEXT NOT NULL DEFAULT '',
  seo_keywords TEXT NOT NULL DEFAULT '',
  stats_interventions INTEGER NOT NULL DEFAULT 0,
  stats_years INTEGER NOT NULL DEFAULT 0,
  stats_satisfaction INTEGER NOT NULL DEFAULT 0,
  zones TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  logo_url TEXT,
  logo_dark_url TEXT,
  favicon_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS homepage (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  hero_title TEXT NOT NULL DEFAULT '',
  hero_subtitle TEXT NOT NULL DEFAULT '',
  hero_cta_primary TEXT NOT NULL DEFAULT '',
  hero_cta_secondary TEXT NOT NULL DEFAULT '',
  hero_image_url TEXT,
  hero_video_url TEXT,
  about_title TEXT NOT NULL DEFAULT '',
  about_description TEXT NOT NULL DEFAULT '',
  about_features JSONB NOT NULL DEFAULT '[]'::jsonb,
  services_title TEXT NOT NULL DEFAULT '',
  services_subtitle TEXT NOT NULL DEFAULT '',
  stats_title TEXT NOT NULL DEFAULT '',
  testimonials_title TEXT NOT NULL DEFAULT '',
  testimonials_subtitle TEXT NOT NULL DEFAULT '',
  cta_title TEXT NOT NULL DEFAULT '',
  cta_subtitle TEXT NOT NULL DEFAULT '',
  cta_button TEXT NOT NULL DEFAULT '',
  brands_title TEXT NOT NULL DEFAULT '',
  brands_subtitle TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS service_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  icon TEXT NOT NULL,
  color TEXT NOT NULL DEFAULT 'electric',
  short_description TEXT NOT NULL,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id UUID NOT NULL REFERENCES service_categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  icon TEXT NOT NULL,
  description TEXT NOT NULL,
  full_description TEXT NOT NULL,
  prestations JSONB NOT NULL DEFAULT '[]'::jsonb,
  faqs JSONB NOT NULL DEFAULT '[]'::jsonb,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(category_id, slug)
);

CREATE TABLE IF NOT EXISTS realizations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  type TEXT NOT NULL,
  location TEXT NOT NULL,
  category TEXT NOT NULL,
  service_type TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  featured BOOLEAN NOT NULL DEFAULT false,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  text TEXT NOT NULL,
  service TEXT NOT NULL,
  category TEXT NOT NULL,
  location TEXT NOT NULL,
  date TEXT NOT NULL,
  verified BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS brands (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  logo_url TEXT,
  website TEXT,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'admin',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Phase 2 : boîte de réception des formulaires, newsletter, articles, reset MDP
CREATE TABLE IF NOT EXISTS submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type TEXT NOT NULL CHECK (type IN ('contact', 'devis', 'intervention')),
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'done', 'archived')),
  payload JSONB NOT NULL,
  contact_name TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL UNIQUE,
  consent_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  source TEXT,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed', 'bounced')),
  unsubscribe_token TEXT NOT NULL UNIQUE DEFAULT gen_random_uuid()::TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS posts (
  slug TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT,
  cover_url TEXT,
  body_mdx TEXT NOT NULL,
  tags TEXT[] NOT NULL DEFAULT '{}',
  author TEXT,
  published BOOLEAN NOT NULL DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS password_reset_tokens (
  token TEXT PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES admin_users(id) ON DELETE CASCADE,
  expires_at TIMESTAMPTZ NOT NULL,
  used_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================== INDEXES ==============================
CREATE INDEX IF NOT EXISTS idx_services_category ON services(category_id);
CREATE INDEX IF NOT EXISTS idx_realizations_category ON realizations(category);
CREATE INDEX IF NOT EXISTS idx_realizations_featured ON realizations(featured);
CREATE INDEX IF NOT EXISTS idx_testimonials_category ON testimonials(category);
CREATE INDEX IF NOT EXISTS idx_brands_category ON brands(category);
CREATE INDEX IF NOT EXISTS idx_submissions_status_created ON submissions (status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_submissions_type ON submissions (type);
CREATE INDEX IF NOT EXISTS idx_newsletter_status ON newsletter_subscribers (status);
CREATE INDEX IF NOT EXISTS idx_posts_published_published_at ON posts (published, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_tags ON posts USING GIN (tags);
CREATE INDEX IF NOT EXISTS idx_password_reset_user ON password_reset_tokens (user_id);
CREATE INDEX IF NOT EXISTS idx_password_reset_expires ON password_reset_tokens (expires_at);

-- ============================== TRIGGERS =============================
DO $$
DECLARE t TEXT;
BEGIN
  FOREACH t IN ARRAY ARRAY['site_config','homepage','service_categories','services',
    'realizations','testimonials','brands','admin_users','submissions',
    'newsletter_subscribers','posts']
  LOOP
    EXECUTE format('DROP TRIGGER IF EXISTS update_%I_updated_at ON %I;', t, t);
    EXECUTE format('CREATE TRIGGER update_%I_updated_at BEFORE UPDATE ON %I
      FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();', t, t);
  END LOOP;
END $$;

-- =================== ROW LEVEL SECURITY + POLICIES ===================
-- SÉCURITÉ : une policy sans clause TO s'applique au rôle `public`, donc
-- aussi à la clé `anon` exposée dans le navigateur. Toutes les policies
-- d'écriture sont donc scopées TO service_role (le code applicatif écrit
-- exclusivement via createServiceClient()). Les tables privées n'ont
-- AUCUNE policy pour anon/authenticated : RLS activé sans policy = tout
-- accès refusé par défaut.
DO $$
DECLARE t TEXT;
BEGIN
  -- Lecture publique pour les tables de contenu affichées sur le site
  FOREACH t IN ARRAY ARRAY['site_config','homepage','service_categories',
    'services','realizations','testimonials','brands']
  LOOP
    EXECUTE format('ALTER TABLE %I ENABLE ROW LEVEL SECURITY;', t);
    EXECUTE format('DROP POLICY IF EXISTS "Public read" ON %I;', t);
    EXECUTE format('CREATE POLICY "Public read" ON %I FOR SELECT TO anon, authenticated USING (true);', t);
    EXECUTE format('DROP POLICY IF EXISTS "Service write" ON %I;', t);
    EXECUTE format('CREATE POLICY "Service write" ON %I FOR ALL TO service_role USING (true) WITH CHECK (true);', t);
  END LOOP;

  -- Tables privées : accès service role uniquement (API admin).
  -- Surtout PAS de policy pour anon/authenticated ici.
  FOREACH t IN ARRAY ARRAY['admin_users','submissions','newsletter_subscribers',
    'password_reset_tokens']
  LOOP
    EXECUTE format('ALTER TABLE %I ENABLE ROW LEVEL SECURITY;', t);
    EXECUTE format('DROP POLICY IF EXISTS "Service write" ON %I;', t);
    EXECUTE format('CREATE POLICY "Service write" ON %I FOR ALL TO service_role USING (true) WITH CHECK (true);', t);
  END LOOP;

  -- posts : lecture publique des articles publiés + écriture service
  EXECUTE 'ALTER TABLE posts ENABLE ROW LEVEL SECURITY;';
  EXECUTE 'DROP POLICY IF EXISTS "Public read published" ON posts;';
  EXECUTE 'CREATE POLICY "Public read published" ON posts FOR SELECT TO anon, authenticated USING (published = true);';
  EXECUTE 'DROP POLICY IF EXISTS "Service write" ON posts;';
  EXECUTE 'CREATE POLICY "Service write" ON posts FOR ALL TO service_role USING (true) WITH CHECK (true);';
END $$;

-- ===================== STOCKAGE DES IMAGES ==========================
-- Bucket « sconnectfrance » (le nom EXACT attendu par le code d'upload).
INSERT INTO storage.buckets (id, name, public)
VALUES ('sconnectfrance', 'sconnectfrance', true)
ON CONFLICT (id) DO UPDATE SET public = true;

DROP POLICY IF EXISTS "sconnectfrance_public_read" ON storage.objects;
CREATE POLICY "sconnectfrance_public_read" ON storage.objects
  FOR SELECT USING (bucket_id = 'sconnectfrance');
-- Écritures storage : service_role uniquement (l'upload passe par l'API
-- admin côté serveur) — sans TO, la clé anon pouvait écraser les images.
DROP POLICY IF EXISTS "sconnectfrance_service_insert" ON storage.objects;
CREATE POLICY "sconnectfrance_service_insert" ON storage.objects
  FOR INSERT TO service_role WITH CHECK (bucket_id = 'sconnectfrance');
DROP POLICY IF EXISTS "sconnectfrance_service_update" ON storage.objects;
CREATE POLICY "sconnectfrance_service_update" ON storage.objects
  FOR UPDATE TO service_role USING (bucket_id = 'sconnectfrance');
DROP POLICY IF EXISTS "sconnectfrance_service_delete" ON storage.objects;
CREATE POLICY "sconnectfrance_service_delete" ON storage.objects
  FOR DELETE TO service_role USING (bucket_id = 'sconnectfrance');

-- =====================================================================
-- ✓ Terminé. Étapes suivantes (en local, voir docs/GUIDE-GESTION-SITE.md) :
--   1. npm run db:seed        → charge les vraies données depuis les JSON
--   2. npm run db:import-mdx  → (optionnel) importe les 52 articles
--   3. npm run admin:create -- ton@email.fr "MotDePasse"  → crée ton admin
-- =====================================================================
