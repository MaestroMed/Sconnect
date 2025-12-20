# Configuration Supabase pour S CONNECT FRANCE

## Variables d'environnement requises

Créez un fichier `.env.local` à la racine du projet avec ces variables :

```bash
# JWT (obligatoire pour l'authentification admin)
JWT_SECRET=votre_cle_secrete_jwt_ici

# Supabase (obligatoire en production)
NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Configuration de Supabase

### 1. Créer un projet Supabase

1. Allez sur [supabase.com](https://supabase.com)
2. Créez un nouveau projet
3. Récupérez vos clés API dans Settings > API

### 2. Configurer la base de données

Exécutez ce SQL dans l'éditeur SQL de Supabase :

```sql
-- Site Configuration
CREATE TABLE IF NOT EXISTS site_config (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name TEXT NOT NULL DEFAULT 'S Connect France',
  phone TEXT NOT NULL DEFAULT '01 23 45 67 89',
  email TEXT NOT NULL DEFAULT 'contact@sconnectfrance.fr',
  address TEXT,
  slogan TEXT,
  description TEXT,
  zones TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Homepage
CREATE TABLE IF NOT EXISTS homepage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hero_title TEXT NOT NULL,
  hero_subtitle TEXT,
  hero_cta_primary TEXT,
  hero_cta_secondary TEXT,
  hero_image_url TEXT,
  hero_video_url TEXT,
  about_title TEXT,
  about_description TEXT,
  about_features JSONB DEFAULT '[]',
  services_title TEXT,
  services_subtitle TEXT,
  stats_title TEXT,
  testimonials_title TEXT,
  testimonials_subtitle TEXT,
  cta_title TEXT,
  cta_subtitle TEXT,
  cta_button TEXT,
  brands_title TEXT,
  brands_subtitle TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Service Categories
CREATE TABLE IF NOT EXISTS service_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  icon TEXT,
  color TEXT,
  order_index INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Services
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES service_categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  description TEXT,
  short_description TEXT,
  icon TEXT,
  features TEXT[],
  order_index INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Realizations
CREATE TABLE IF NOT EXISTS realizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  type TEXT,
  location TEXT,
  category TEXT,
  service_type TEXT,
  description TEXT,
  image TEXT,
  image_before TEXT,
  image_after TEXT,
  featured BOOLEAN DEFAULT false,
  order_index INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Testimonials
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author TEXT NOT NULL,
  location TEXT,
  rating INT CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  service TEXT,
  date TEXT,
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Brands
CREATE TABLE IF NOT EXISTS brands (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  logo TEXT,
  category TEXT,
  order_index INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Admin Users
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  name TEXT,
  role TEXT DEFAULT 'admin',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE site_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE homepage ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE realizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Public read site_config" ON site_config FOR SELECT USING (true);
CREATE POLICY "Public read homepage" ON homepage FOR SELECT USING (true);
CREATE POLICY "Public read service_categories" ON service_categories FOR SELECT USING (true);
CREATE POLICY "Public read services" ON services FOR SELECT USING (true);
CREATE POLICY "Public read realizations" ON realizations FOR SELECT USING (true);
CREATE POLICY "Public read testimonials" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Public read brands" ON brands FOR SELECT USING (true);

-- Service role can do everything
CREATE POLICY "Service role full access site_config" ON site_config FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access homepage" ON homepage FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access service_categories" ON service_categories FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access services" ON services FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access realizations" ON realizations FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access testimonials" ON testimonials FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access brands" ON brands FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access admin_users" ON admin_users FOR ALL USING (auth.role() = 'service_role');
```

### 3. Configurer le Storage

1. Allez dans Storage > Créer un nouveau bucket
2. Nommez-le `images`
3. Cochez "Public bucket"
4. Ajoutez ces policies :

```sql
-- Permettre la lecture publique
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'images');

-- Permettre l'upload authentifié
CREATE POLICY "Authenticated Upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'images');

-- Permettre la suppression authentifiée
CREATE POLICY "Authenticated Delete" ON storage.objects FOR DELETE USING (bucket_id = 'images');
```

### 4. Insérer les données initiales

```sql
-- Configuration du site
INSERT INTO site_config (company_name, phone, email, slogan, description, zones)
VALUES (
  'S Connect France',
  '01 23 45 67 89',
  'contact@sconnectfrance.fr',
  'Entretenir votre habitat, c''est préserver votre bien-être.',
  'Expert en électricité, contrôle d''accès et serrurerie en Île-de-France',
  ARRAY['Paris', 'Hauts-de-Seine', 'Seine-Saint-Denis', 'Val-de-Marne', 'Essonne', 'Yvelines']
);

-- Homepage
INSERT INTO homepage (hero_title, hero_subtitle, hero_cta_primary, hero_cta_secondary)
VALUES (
  'S Connect France',
  'Entretenir votre habitat, c''est préserver votre bien-être.',
  'Demander un devis',
  'Nos services'
);
```

## Mode développement

En développement (sans Supabase configuré), l'application utilise automatiquement les fichiers JSON locaux :
- Les données sont stockées dans `src/lib/data/*.json`
- Les images uploadées sont sauvegardées dans `public/uploads/`

## Variables d'environnement Vercel

Pour le déploiement sur Vercel, ajoutez ces variables dans les settings du projet :

1. `JWT_SECRET` - Votre clé secrète JWT
2. `NEXT_PUBLIC_SUPABASE_URL` - URL de votre projet Supabase
3. `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Clé publique Supabase
4. `SUPABASE_SERVICE_ROLE_KEY` - Clé de service Supabase (secret)



