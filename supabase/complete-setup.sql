-- =============================================
-- S'CONNECT - COMPLETE DATABASE SETUP
-- Execute this ONCE in Supabase SQL Editor
-- =============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- DROP EXISTING TABLES (if any)
-- =============================================
DROP TABLE IF EXISTS services CASCADE;
DROP TABLE IF EXISTS service_categories CASCADE;
DROP TABLE IF EXISTS realizations CASCADE;
DROP TABLE IF EXISTS testimonials CASCADE;
DROP TABLE IF EXISTS brands CASCADE;
DROP TABLE IF EXISTS admin_users CASCADE;
DROP TABLE IF EXISTS homepage CASCADE;
DROP TABLE IF EXISTS site_config CASCADE;

-- =============================================
-- CREATE TABLES
-- =============================================

-- Site Configuration
CREATE TABLE site_config (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  site_name TEXT NOT NULL DEFAULT 'S Connect France',
  site_tagline TEXT NOT NULL DEFAULT 'Électricité • Contrôle d''accès • Serrurerie • Métallerie',
  phone TEXT NOT NULL DEFAULT '01 23 45 67 89',
  phone_emergency TEXT NOT NULL DEFAULT '01 23 45 67 89',
  email TEXT NOT NULL DEFAULT 'contact@sconnectfrance.fr',
  address_street TEXT NOT NULL DEFAULT 'XX Rue de XXX',
  address_postal_code TEXT NOT NULL DEFAULT '92110',
  address_city TEXT NOT NULL DEFAULT 'Clichy',
  hours_weekdays TEXT NOT NULL DEFAULT 'Lun-Ven: 8h - 19h',
  hours_saturday TEXT NOT NULL DEFAULT 'Samedi: 9h - 17h',
  hours_emergency TEXT NOT NULL DEFAULT 'Urgences 24h/24',
  social_facebook TEXT,
  social_linkedin TEXT,
  social_instagram TEXT,
  seo_title TEXT NOT NULL DEFAULT 'S Connect France | Électricité, Contrôle d''accès & Serrurerie',
  seo_description TEXT NOT NULL DEFAULT 'Expert en électricité, contrôle d''accès et serrurerie en Île-de-France.',
  seo_keywords TEXT NOT NULL DEFAULT 'électricien, serrurier, contrôle accès, Clichy, Paris',
  stats_interventions INTEGER NOT NULL DEFAULT 3000,
  stats_years INTEGER NOT NULL DEFAULT 4,
  stats_satisfaction INTEGER NOT NULL DEFAULT 98,
  zones TEXT[] NOT NULL DEFAULT ARRAY['Clichy', 'Levallois-Perret', 'Neuilly-sur-Seine', 'Paris', 'La Défense', 'Asnières', 'Hauts-de-Seine', 'Île-de-France'],
  logo_url TEXT,
  logo_dark_url TEXT,
  favicon_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Homepage Content
CREATE TABLE homepage (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  hero_title TEXT NOT NULL DEFAULT 'Entretenir votre habitat, c''est préserver votre bien-être.',
  hero_subtitle TEXT NOT NULL DEFAULT 'Votre expert multi-services en Île-de-France depuis 2021. Intervention rapide 24h/24, travail soigné et tarifs transparents.',
  hero_cta_primary TEXT NOT NULL DEFAULT 'Demander un devis gratuit',
  hero_cta_secondary TEXT NOT NULL DEFAULT 'Urgence 24h/24',
  hero_image_url TEXT,
  hero_video_url TEXT,
  about_title TEXT NOT NULL DEFAULT 'Votre partenaire multi-services de confiance',
  about_description TEXT NOT NULL DEFAULT 'Depuis 2021, S Connect France accompagne les particuliers et professionnels d''Île-de-France.',
  about_features JSONB NOT NULL DEFAULT '[]'::jsonb,
  services_title TEXT NOT NULL DEFAULT 'Nos expertises',
  services_subtitle TEXT NOT NULL DEFAULT '4 métiers pour répondre à tous vos besoins',
  stats_title TEXT NOT NULL DEFAULT 'S Connect France en chiffres',
  testimonials_title TEXT NOT NULL DEFAULT 'Ce que nos clients disent',
  testimonials_subtitle TEXT NOT NULL DEFAULT 'Découvrez les avis de ceux qui nous font confiance',
  cta_title TEXT NOT NULL DEFAULT 'Prêt à démarrer votre projet ?',
  cta_subtitle TEXT NOT NULL DEFAULT 'Contactez-nous dès maintenant pour un devis gratuit.',
  cta_button TEXT NOT NULL DEFAULT 'Demander un devis gratuit',
  brands_title TEXT NOT NULL DEFAULT 'Ils nous font confiance',
  brands_subtitle TEXT NOT NULL DEFAULT 'Nos clients et partenaires',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Service Categories
CREATE TABLE service_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  icon TEXT NOT NULL,
  color TEXT NOT NULL DEFAULT 'primary',
  short_description TEXT NOT NULL,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Services
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id UUID NOT NULL REFERENCES service_categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  icon TEXT NOT NULL,
  description TEXT NOT NULL,
  full_description TEXT NOT NULL DEFAULT '',
  prestations JSONB NOT NULL DEFAULT '[]'::jsonb,
  faqs JSONB NOT NULL DEFAULT '[]'::jsonb,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(category_id, slug)
);

-- Realizations
CREATE TABLE realizations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  type TEXT NOT NULL,
  location TEXT NOT NULL,
  category TEXT NOT NULL,
  service_type TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  image_before_url TEXT,
  image_after_url TEXT,
  featured BOOLEAN NOT NULL DEFAULT false,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Testimonials
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

-- Brands
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

-- Admin Users
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
-- ENABLE ROW LEVEL SECURITY
-- =============================================
ALTER TABLE site_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE homepage ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE realizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Public read" ON site_config FOR SELECT USING (true);
CREATE POLICY "Public read" ON homepage FOR SELECT USING (true);
CREATE POLICY "Public read" ON service_categories FOR SELECT USING (true);
CREATE POLICY "Public read" ON services FOR SELECT USING (true);
CREATE POLICY "Public read" ON realizations FOR SELECT USING (true);
CREATE POLICY "Public read" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Public read" ON brands FOR SELECT USING (true);

-- Service role full access
CREATE POLICY "Service write" ON site_config FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service write" ON homepage FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service write" ON service_categories FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service write" ON services FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service write" ON realizations FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service write" ON testimonials FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service write" ON brands FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service write" ON admin_users FOR ALL USING (true) WITH CHECK (true);

-- =============================================
-- INSERT INITIAL DATA
-- =============================================

-- Site config
INSERT INTO site_config DEFAULT VALUES;

-- Homepage
INSERT INTO homepage DEFAULT VALUES;

-- Service categories
INSERT INTO service_categories (name, slug, icon, color, short_description, order_index) VALUES
('Électricité', 'electricite', 'Zap', 'primary', 'Installation, rénovation et dépannage électrique pour particuliers et professionnels', 1),
('Contrôle d''accès', 'controle-acces', 'KeyRound', 'accent', 'Interphonie, vidéophonie, badges et digicodes pour sécuriser vos locaux', 2),
('Serrurerie', 'serrurerie', 'Lock', 'green', 'Ouverture de porte, remplacement de serrure, blindage et sécurisation de vos accès', 3),
('Métallerie', 'metallerie', 'Wrench', 'orange', 'Fabrication de portails, portes et structures métalliques sur mesure', 4);

-- Testimonials
INSERT INTO testimonials (name, rating, text, service, category, location, date, verified) VALUES
('Marie L.', 5, 'Intervention rapide et efficace pour une panne générale en soirée. L''électricien était très professionnel. Je recommande vivement !', 'Dépannage électrique', 'electricite', 'Clichy', '2024-11-15', true),
('Jean-Pierre D.', 5, 'Rénovation complète de l''électricité de notre appartement. Travail impeccable, respect des délais.', 'Rénovation électrique', 'electricite', 'Levallois-Perret', '2024-11-10', true),
('Sophie M.', 5, 'Porte claquée un dimanche soir, intervention en moins d''une heure ! Le serrurier a ouvert sans aucun dégât.', 'Ouverture de porte', 'serrurerie', 'Neuilly-sur-Seine', '2024-10-28', true),
('Restaurant Le Gourmet', 5, 'S Connect France a installé notre système de contrôle d''accès. Installation propre, un vrai partenaire.', 'Contrôle d''accès', 'controle-acces', 'Paris 17e', '2024-10-15', true),
('Thomas R.', 5, 'Blindage de ma porte d''entrée après une tentative d''effraction. Travail de qualité.', 'Blindage de porte', 'serrurerie', 'Asnières', '2024-09-20', true),
('Copropriété Les Tilleuls', 5, 'Remplacement de l''interphonie de notre résidence de 32 lots. Merci à toute l''équipe.', 'Interphonie', 'controle-acces', 'Clichy', '2024-09-05', true);

-- Realizations
INSERT INTO realizations (title, type, location, category, service_type, description, image_url, featured) VALUES
('Rénovation complète appartement haussmannien', 'Appartement', 'Paris 8e', 'electricite', 'Rénovation', 'Rénovation complète de l''installation électrique d''un appartement de 120m².', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop', true),
('Installation tableau électrique triphasé', 'Local commercial', 'Clichy', 'electricite', 'Installation', 'Installation d''un tableau électrique triphasé pour un restaurant.', 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&h=600&fit=crop', true),
('Système de contrôle d''accès entreprise', 'Bureaux', 'La Défense', 'controle-acces', 'Installation', 'Installation complète d''un système de badges et vidéophonie pour 50 collaborateurs.', 'https://images.unsplash.com/photo-1558002038-1055907df827?w=800&h=600&fit=crop', true),
('Blindage porte d''entrée villa', 'Maison', 'Neuilly-sur-Seine', 'serrurerie', 'Installation', 'Pose d''un bloc-porte blindé A2P BP2 avec serrure 5 points.', 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=600&fit=crop', true),
('Interphonie copropriété 24 lots', 'Copropriété', 'Levallois-Perret', 'controle-acces', 'Rénovation', 'Remplacement complet de l''interphonie avec passage en vidéophonie couleur.', 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop', true),
('Portail sur mesure en acier', 'Maison', 'Asnières', 'metallerie', 'Fabrication', 'Conception et fabrication d''un portail sur mesure en acier.', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop', true);

-- Brands
INSERT INTO brands (name, category, description, logo_url, website, order_index) VALUES
('Schneider Electric', 'electricite', 'Leader mondial de la gestion de l''énergie.', null, 'https://www.se.com', 1),
('Legrand', 'electricite', 'Spécialiste mondial des infrastructures électriques.', null, 'https://www.legrand.fr', 2),
('Hager', 'electricite', 'Solutions pour la distribution d''énergie.', null, 'https://www.hager.fr', 3),
('Fichet', 'serrurerie', 'Expert français de la sécurité depuis 1825.', null, 'https://www.fichet.fr', 4),
('Vachette', 'serrurerie', 'Fabricant français de serrures depuis 1864.', null, 'https://www.vachette.fr', 5),
('Aiphone', 'controle-acces', 'Leader mondial de l''interphonie.', null, 'https://www.aiphone.fr', 6);

-- Verify
SELECT 'Tables created and data inserted successfully!' as status;
SELECT 'site_config' as table_name, COUNT(*) as count FROM site_config
UNION ALL SELECT 'homepage', COUNT(*) FROM homepage
UNION ALL SELECT 'service_categories', COUNT(*) FROM service_categories
UNION ALL SELECT 'testimonials', COUNT(*) FROM testimonials
UNION ALL SELECT 'realizations', COUNT(*) FROM realizations
UNION ALL SELECT 'brands', COUNT(*) FROM brands;

