-- =============================================
-- S'CONNECT - SEED DATA
-- Execute this in Supabase SQL Editor
-- =============================================

-- Insert site config (avec les vraies données)
INSERT INTO site_config (
  site_name, site_tagline, phone, phone_emergency, email,
  address_street, address_postal_code, address_city,
  hours_weekdays, hours_saturday, hours_emergency,
  seo_title, seo_description, seo_keywords,
  stats_interventions, stats_years, stats_satisfaction,
  zones
) VALUES (
  'S Connect France',
  'Électricité • Contrôle d''accès • Serrurerie • Métallerie',
  '01 23 45 67 89',
  '01 23 45 67 89',
  'contact@sconnectfrance.fr',
  'XX Rue de XXX',
  '92110',
  'Clichy',
  'Lun-Ven: 8h - 19h',
  'Samedi: 9h - 17h',
  'Urgences 24h/24',
  'S Connect France | Électricité, Contrôle d''accès & Serrurerie à Clichy',
  'Expert en électricité, contrôle d''accès et serrurerie à Clichy et Île-de-France. Intervention rapide 24h/24. Devis gratuit.',
  'électricien, serrurier, contrôle accès, Clichy, Paris, Île-de-France, dépannage',
  3000, 4, 98,
  ARRAY['Clichy', 'Levallois-Perret', 'Neuilly-sur-Seine', 'Asnières', 'Paris', 'La Défense', 'Hauts-de-Seine', 'Île-de-France']
) ON CONFLICT DO NOTHING;

-- Insert homepage content
INSERT INTO homepage (
  hero_title, hero_subtitle, hero_cta_primary, hero_cta_secondary,
  about_title, about_description,
  services_title, services_subtitle,
  stats_title, testimonials_title, testimonials_subtitle,
  cta_title, cta_subtitle, cta_button,
  brands_title, brands_subtitle
) VALUES (
  'Entretenir votre habitat, c''est préserver votre bien-être.',
  'Votre expert multi-services en Île-de-France depuis 2021. Intervention rapide 24h/24, travail soigné et tarifs transparents.',
  'Demander un devis gratuit',
  'Urgence 24h/24',
  'Votre partenaire multi-services de confiance',
  'Depuis 2021, S Connect France accompagne les particuliers et professionnels d''Île-de-France dans tous leurs projets : électricité, contrôle d''accès, serrurerie et métallerie.',
  'Nos expertises',
  '4 métiers pour répondre à tous vos besoins',
  'S Connect France en chiffres',
  'Ce que nos clients disent',
  'Découvrez les avis de ceux qui nous font confiance',
  'Prêt à démarrer votre projet ?',
  'Contactez-nous dès maintenant pour un devis gratuit et personnalisé. Notre équipe vous répond sous 24h.',
  'Demander un devis gratuit',
  'Ils nous font confiance',
  'Nos clients et partenaires'
) ON CONFLICT DO NOTHING;

-- Insert service categories
INSERT INTO service_categories (name, slug, icon, color, short_description, order_index) VALUES
('Électricité', 'electricite', 'Zap', 'primary', 'Installation, rénovation et dépannage électrique pour particuliers et professionnels', 1),
('Contrôle d''accès', 'controle-acces', 'KeyRound', 'accent', 'Interphonie, vidéophonie, badges et digicodes pour sécuriser vos locaux', 2),
('Serrurerie', 'serrurerie', 'Lock', 'green', 'Ouverture de porte, remplacement de serrure, blindage et sécurisation de vos accès', 3),
('Métallerie', 'metallerie', 'Wrench', 'orange', 'Fabrication de portails, portes et structures métalliques sur mesure', 4)
ON CONFLICT (slug) DO NOTHING;

-- Insert testimonials
INSERT INTO testimonials (name, rating, text, service, category, location, date, verified) VALUES
('Marie L.', 5, 'Intervention rapide et efficace pour une panne générale en soirée. L''électricien était très professionnel et a pris le temps de m''expliquer le problème. Prix correct et travail propre. Je recommande vivement !', 'Dépannage électrique', 'electricite', 'Clichy', '2024-11-15', true),
('Jean-Pierre D.', 5, 'Rénovation complète de l''électricité de notre appartement. Travail impeccable, respect des délais et équipe très sympathique. Le devis était clair et sans surprise.', 'Rénovation électrique', 'electricite', 'Levallois-Perret', '2024-11-10', true),
('Sophie M.', 5, 'Porte claquée un dimanche soir, intervention en moins d''une heure ! Le serrurier a ouvert sans aucun dégât et m''a même conseillé sur la sécurité de ma serrure. Très pro.', 'Ouverture de porte', 'serrurerie', 'Neuilly-sur-Seine', '2024-10-28', true),
('Restaurant Le Gourmet', 5, 'S Connect France a installé notre système de contrôle d''accès. Installation propre, formation complète de l''équipe. Un vrai partenaire de confiance.', 'Contrôle d''accès', 'controle-acces', 'Paris 17e', '2024-10-15', true),
('Thomas R.', 5, 'Blindage de ma porte d''entrée après une tentative d''effraction. Travail de qualité, porte comme neuve avec une sécurité renforcée. Je me sens enfin en sécurité.', 'Blindage de porte', 'serrurerie', 'Asnières', '2024-09-20', true),
('Copropriété Les Tilleuls', 5, 'Remplacement de l''interphonie de notre résidence de 32 lots. Le chantier a été bien organisé, les résidents informés, et le résultat est parfait. Merci à toute l''équipe.', 'Interphonie', 'controle-acces', 'Clichy', '2024-09-05', true)
ON CONFLICT DO NOTHING;

-- Insert realizations
INSERT INTO realizations (title, type, location, category, service_type, description, image_url, featured) VALUES
('Rénovation complète appartement haussmannien', 'Appartement', 'Paris 8e', 'electricite', 'Rénovation', 'Rénovation complète de l''installation électrique d''un appartement de 120m² avec mise aux normes et domotique.', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop', true),
('Installation tableau électrique triphasé', 'Local commercial', 'Clichy', 'electricite', 'Installation', 'Installation d''un tableau électrique triphasé pour un restaurant avec circuits spécialisés cuisine.', 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&h=600&fit=crop', true),
('Système de contrôle d''accès entreprise', 'Bureaux', 'La Défense', 'controle-acces', 'Installation', 'Installation complète d''un système de badges et vidéophonie pour 50 collaborateurs.', 'https://images.unsplash.com/photo-1558002038-1055907df827?w=800&h=600&fit=crop', true),
('Blindage porte d''entrée villa', 'Maison', 'Neuilly-sur-Seine', 'serrurerie', 'Installation', 'Pose d''un bloc-porte blindé A2P BP2 avec serrure 5 points et vidéophone intégré.', 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=600&fit=crop', true),
('Interphonie copropriété 24 lots', 'Copropriété', 'Levallois-Perret', 'controle-acces', 'Rénovation', 'Remplacement complet de l''interphonie avec passage en vidéophonie couleur.', 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop', true),
('Portail sur mesure en acier', 'Maison', 'Asnières', 'metallerie', 'Fabrication', 'Conception et fabrication d''un portail sur mesure en acier avec motorisation.', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop', true)
ON CONFLICT DO NOTHING;

-- Insert brands
INSERT INTO brands (name, category, description, logo_url, website, order_index) VALUES
('Schneider Electric', 'electricite', 'Leader mondial de la gestion de l''énergie et des automatismes.', null, 'https://www.se.com', 1),
('Legrand', 'electricite', 'Spécialiste mondial des infrastructures électriques et numériques du bâtiment.', null, 'https://www.legrand.fr', 2),
('Hager', 'electricite', 'Solutions pour la distribution d''énergie et la gestion technique du bâtiment.', null, 'https://www.hager.fr', 3),
('Fichet', 'serrurerie', 'Expert français de la sécurité depuis 1825. Serrures et portes blindées haute sécurité.', null, 'https://www.fichet.fr', 4),
('Vachette', 'serrurerie', 'Fabricant français de serrures et cylindres depuis 1864.', null, 'https://www.vachette.fr', 5),
('Aiphone', 'controle-acces', 'Leader mondial de l''interphonie et de la vidéophonie professionnelle.', null, 'https://www.aiphone.fr', 6)
ON CONFLICT DO NOTHING;

-- Verify data was inserted
SELECT 'site_config' as table_name, COUNT(*) as count FROM site_config
UNION ALL
SELECT 'homepage', COUNT(*) FROM homepage
UNION ALL
SELECT 'service_categories', COUNT(*) FROM service_categories
UNION ALL
SELECT 'testimonials', COUNT(*) FROM testimonials
UNION ALL
SELECT 'realizations', COUNT(*) FROM realizations
UNION ALL
SELECT 'brands', COUNT(*) FROM brands;



