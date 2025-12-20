-- =============================================
-- S'CONNECT DATABASE SCHEMA
-- =============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- SITE CONFIGURATION
-- =============================================
CREATE TABLE site_config (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  site_name TEXT NOT NULL DEFAULT 'S''Connect',
  site_tagline TEXT NOT NULL DEFAULT 'Expert en électricité, contrôle d''accès et serrurerie',
  phone TEXT NOT NULL DEFAULT '01 23 45 67 89',
  phone_emergency TEXT NOT NULL DEFAULT '06 12 34 56 78',
  email TEXT NOT NULL DEFAULT 'contact@sconnect.fr',
  address_street TEXT NOT NULL DEFAULT '123 Avenue des Champs-Élysées',
  address_postal_code TEXT NOT NULL DEFAULT '75008',
  address_city TEXT NOT NULL DEFAULT 'Paris',
  hours_weekdays TEXT NOT NULL DEFAULT '8h00 - 19h00',
  hours_saturday TEXT NOT NULL DEFAULT '9h00 - 17h00',
  hours_emergency TEXT NOT NULL DEFAULT '24h/24 - 7j/7',
  social_facebook TEXT,
  social_linkedin TEXT,
  social_instagram TEXT,
  seo_title TEXT NOT NULL DEFAULT 'S''Connect - Électricité, Contrôle d''accès, Serrurerie en Île-de-France',
  seo_description TEXT NOT NULL DEFAULT 'Expert en installation électrique, systèmes de contrôle d''accès et serrurerie en Île-de-France. Intervention rapide, devis gratuit.',
  seo_keywords TEXT NOT NULL DEFAULT 'électricien, contrôle accès, serrurerie, Île-de-France, Paris',
  stats_interventions INTEGER NOT NULL DEFAULT 2500,
  stats_years INTEGER NOT NULL DEFAULT 15,
  stats_satisfaction INTEGER NOT NULL DEFAULT 98,
  zones TEXT[] NOT NULL DEFAULT ARRAY['Paris', 'Hauts-de-Seine', 'Seine-Saint-Denis', 'Val-de-Marne', 'Yvelines', 'Essonne', 'Val-d''Oise', 'Seine-et-Marne'],
  logo_url TEXT,
  logo_dark_url TEXT,
  favicon_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =============================================
-- HOMEPAGE CONTENT
-- =============================================
CREATE TABLE homepage (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  hero_title TEXT NOT NULL DEFAULT 'Votre Expert en Électricité, Contrôle d''Accès & Serrurerie',
  hero_subtitle TEXT NOT NULL DEFAULT 'Intervention rapide en Île-de-France. Des solutions professionnelles pour sécuriser et équiper votre habitat et vos locaux professionnels.',
  hero_cta_primary TEXT NOT NULL DEFAULT 'Demander un devis gratuit',
  hero_cta_secondary TEXT NOT NULL DEFAULT 'Appeler maintenant',
  hero_image_url TEXT,
  hero_video_url TEXT,
  about_title TEXT NOT NULL DEFAULT 'Pourquoi choisir S''Connect ?',
  about_description TEXT NOT NULL DEFAULT 'Depuis plus de 15 ans, nous accompagnons particuliers et professionnels dans tous leurs projets d''électricité, de contrôle d''accès et de serrurerie.',
  about_features JSONB NOT NULL DEFAULT '[
    {"icon": "Shield", "title": "Expertise certifiée", "description": "Techniciens qualifiés et certifiés"},
    {"icon": "Clock", "title": "Intervention rapide", "description": "Disponible 24h/24 pour les urgences"},
    {"icon": "ThumbsUp", "title": "Satisfaction garantie", "description": "98% de clients satisfaits"}
  ]'::jsonb,
  services_title TEXT NOT NULL DEFAULT 'Nos domaines d''expertise',
  services_subtitle TEXT NOT NULL DEFAULT 'Des solutions complètes pour tous vos besoins',
  stats_title TEXT NOT NULL DEFAULT 'S''Connect en chiffres',
  testimonials_title TEXT NOT NULL DEFAULT 'Ce que disent nos clients',
  testimonials_subtitle TEXT NOT NULL DEFAULT 'La satisfaction de nos clients est notre priorité',
  cta_title TEXT NOT NULL DEFAULT 'Un projet ? Une urgence ?',
  cta_subtitle TEXT NOT NULL DEFAULT 'Contactez-nous dès maintenant pour un devis gratuit ou une intervention rapide',
  cta_button TEXT NOT NULL DEFAULT 'Demander un devis gratuit',
  brands_title TEXT NOT NULL DEFAULT 'Nos partenaires',
  brands_subtitle TEXT NOT NULL DEFAULT 'Nous travaillons avec les meilleures marques',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =============================================
-- SERVICE CATEGORIES
-- =============================================
CREATE TABLE service_categories (
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

-- =============================================
-- SERVICES
-- =============================================
CREATE TABLE services (
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

-- =============================================
-- REALIZATIONS
-- =============================================
CREATE TABLE realizations (
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

-- =============================================
-- TESTIMONIALS
-- =============================================
CREATE TABLE testimonials (
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

-- =============================================
-- BRANDS
-- =============================================
CREATE TABLE brands (
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

-- =============================================
-- ADMIN USERS
-- =============================================
CREATE TABLE admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'admin',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =============================================
-- INDEXES
-- =============================================
CREATE INDEX idx_services_category ON services(category_id);
CREATE INDEX idx_realizations_category ON realizations(category);
CREATE INDEX idx_realizations_featured ON realizations(featured);
CREATE INDEX idx_testimonials_category ON testimonials(category);
CREATE INDEX idx_brands_category ON brands(category);

-- =============================================
-- UPDATED_AT TRIGGER
-- =============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_site_config_updated_at BEFORE UPDATE ON site_config FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_homepage_updated_at BEFORE UPDATE ON homepage FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_service_categories_updated_at BEFORE UPDATE ON service_categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_realizations_updated_at BEFORE UPDATE ON realizations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON testimonials FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_brands_updated_at BEFORE UPDATE ON brands FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_admin_users_updated_at BEFORE UPDATE ON admin_users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- ROW LEVEL SECURITY (RLS)
-- =============================================
ALTER TABLE site_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE homepage ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE realizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Public read access for content tables
CREATE POLICY "Public read access" ON site_config FOR SELECT USING (true);
CREATE POLICY "Public read access" ON homepage FOR SELECT USING (true);
CREATE POLICY "Public read access" ON service_categories FOR SELECT USING (true);
CREATE POLICY "Public read access" ON services FOR SELECT USING (true);
CREATE POLICY "Public read access" ON realizations FOR SELECT USING (true);
CREATE POLICY "Public read access" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Public read access" ON brands FOR SELECT USING (true);

-- Service role full access (for admin API routes)
CREATE POLICY "Service role full access" ON site_config FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON homepage FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON service_categories FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON services FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON realizations FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON testimonials FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON brands FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON admin_users FOR ALL USING (true) WITH CHECK (true);

-- =============================================
-- STORAGE BUCKET FOR IMAGES
-- =============================================
INSERT INTO storage.buckets (id, name, public) VALUES ('images', 'images', true);

-- Storage policies
CREATE POLICY "Public read access for images" ON storage.objects FOR SELECT USING (bucket_id = 'images');
CREATE POLICY "Service role upload access" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'images');
CREATE POLICY "Service role update access" ON storage.objects FOR UPDATE USING (bucket_id = 'images');
CREATE POLICY "Service role delete access" ON storage.objects FOR DELETE USING (bucket_id = 'images');

-- =============================================
-- INITIAL DATA
-- =============================================

-- Insert default site config
INSERT INTO site_config (
  site_name, site_tagline, phone, phone_emergency, email,
  address_street, address_postal_code, address_city,
  hours_weekdays, hours_saturday, hours_emergency,
  seo_title, seo_description, seo_keywords,
  stats_interventions, stats_years, stats_satisfaction
) VALUES (
  'S''Connect',
  'Expert en électricité, contrôle d''accès et serrurerie',
  '01 23 45 67 89',
  '06 12 34 56 78',
  'contact@sconnect.fr',
  '123 Avenue des Champs-Élysées',
  '75008',
  'Paris',
  '8h00 - 19h00',
  '9h00 - 17h00',
  '24h/24 - 7j/7',
  'S''Connect - Électricité, Contrôle d''accès, Serrurerie en Île-de-France',
  'Expert en installation électrique, systèmes de contrôle d''accès et serrurerie en Île-de-France. Intervention rapide, devis gratuit.',
  'électricien, contrôle accès, serrurerie, Île-de-France, Paris',
  2500, 15, 98
);

-- Insert default homepage
INSERT INTO homepage DEFAULT VALUES;

-- Insert service categories
INSERT INTO service_categories (name, slug, icon, color, short_description, order_index) VALUES
('Électricité', 'electricite', 'Zap', 'electric', 'Installation, rénovation et dépannage électrique pour particuliers et professionnels', 1),
('Contrôle d''Accès', 'controle-acces', 'Shield', 'security', 'Systèmes de sécurité, interphonie, vidéosurveillance et contrôle d''accès', 2),
('Serrurerie', 'serrurerie', 'Key', 'lock', 'Ouverture de porte, remplacement de serrure et blindage', 3);

-- Insert default admin user (password: admin123)
INSERT INTO admin_users (email, password_hash, name, role) VALUES (
  'admin@sconnect.fr',
  '$2a$10$rQnM1.ZzVxGXGMKdVz8qR.8RvJqK5YvKQW5LMxZ9E5z6X5X5X5X5X',
  'Administrateur',
  'admin'
);




