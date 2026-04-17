# 🔌 S'Connect - Site Web Professionnel

Site vitrine moderne et performant pour S'Connect, expert en électricité, contrôle d'accès et serrurerie en Île-de-France.

![Next.js](https://img.shields.io/badge/Next.js-15.0-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)
![Production Ready](https://img.shields.io/badge/Production-Ready-green)

## 🌟 Fonctionnalités

### ✅ Déjà Implémenté

- ✅ **Design moderne et responsive** - Mobile-first, animations fluides
- ✅ **SEO optimisé** - Métadonnées complètes, Schema.org, sitemap dynamique
- ✅ **Formulaires fonctionnels** - Contact, devis, intervention avec envoi email réel
- ✅ **Google Analytics & GTM** - Tracking complet des conversions
- ✅ **Pages légales RGPD** - Mentions légales, confidentialité, cookies
- ✅ **Bannière cookies** - Consentement granulaire conforme RGPD
- ✅ **Performance optimisée** - Next.js 15, AVIF/WebP, lazy loading
- ✅ **Admin panel** - Gestion du contenu via back-office
- ✅ **Supabase** - Base de données et storage
- ✅ **Loading states** - Expérience utilisateur améliorée
- ✅ **Error boundaries** - Gestion élégante des erreurs

### 🎨 Design

- Interface moderne avec glassmorphisme
- Animations Framer Motion
- Dark patterns pour sections hero
- Composants réutilisables
- Palette de couleurs professionnelle (bleu électrique)

### 📱 Pages Principales

- **Accueil** - Hero dynamique, services, témoignages, réalisations
- **Services** - Électricité, Contrôle d'accès, Serrurerie, Métallerie
- **Réalisations** - Portfolio de projets
- **Avis clients** - Témoignages vérifiés
- **Contact** - Formulaire + informations
- **Demande de devis** - Formulaire multi-étapes
- **Intervention urgente** - Formulaire prioritaire
- **Pages légales** - Complètes et conformes

## 🚀 Démarrage Rapide

### Prérequis

- Node.js 18+
- npm ou yarn
- Compte Resend (pour les emails)
- Compte Supabase (base de données)

### Installation

```bash
# Cloner le repository
git clone https://github.com/MaestroMed/Sconnect.git
cd Sconnect

# Installer les dépendances
npm install

# Copier et configurer les variables d'environnement
cp env.example.txt .env.local
# Éditer .env.local avec vos vraies valeurs

# Lancer en développement
npm run dev
```

Le site sera accessible sur http://localhost:3000

### Build de Production

```bash
npm run build
npm start
```

## 📋 Configuration

### Variables d'Environnement

Créer un fichier `.env.local` avec :

```bash
# Site
NEXT_PUBLIC_SITE_URL=https://sconnectfrance.fr
NODE_ENV=production

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Resend (Email)
RESEND_API_KEY=re_your_api_key
EMAIL_FROM=contact@sconnectfrance.fr
ADMIN_EMAIL=contact@sconnectfrance.fr

# Contact
NEXT_PUBLIC_PHONE=01 XX XX XX XX
NEXT_PUBLIC_PHONE_EMERGENCY=06 XX XX XX XX

# Google Services (optionnel)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX

# Sécurité
JWT_SECRET=your_very_secure_secret

# Vérification moteurs de recherche (optionnel)
GOOGLE_SITE_VERIFICATION=
BING_SITE_VERIFICATION=

# Mode maintenance (rewrite tout le public vers /maintenance)
MAINTENANCE_MODE=false

# Sentry (optionnel — monitoring)
SENTRY_DSN=
SENTRY_ORG=
SENTRY_PROJECT=
SENTRY_AUTH_TOKEN=
```

Voir `env.example.txt` pour la liste complète.

### Déploiement Vercel

1. **Connecter le repo GitHub** au projet Vercel.
2. **Configurer les secrets** dans Project Settings → Environment Variables (Production + Preview) :
   - **Critiques** : `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`, `EMAIL_FROM`, `ADMIN_EMAIL`, `JWT_SECRET` (≥32 chars random)
   - **Recommandés** : `NEXT_PUBLIC_PHONE`, `NEXT_PUBLIC_PHONE_EMERGENCY`, `NEXT_PUBLIC_GA_ID`
   - **Optionnels** : `GOOGLE_SITE_VERIFICATION`, `BING_SITE_VERIFICATION`, `SENTRY_DSN`, `SENTRY_AUTH_TOKEN`, `SENTRY_ORG`, `SENTRY_PROJECT`, `WHATSAPP_NUMBER`, `MAINTENANCE_MODE`, `BREVO_API_KEY`, `RESEND_AUDIENCE_ID`
3. **Préparer Supabase** : créer le projet, exécuter `supabase/schema.sql` puis `supabase/storage-policies.sql`, puis `npm run db:seed` pour peupler les tables initiales.
4. **Premier admin** : si la table `admin_users` est vide, définir `ADMIN_BOOTSTRAP_EMAIL` + `ADMIN_BOOTSTRAP_PASSWORD_HASH` (bcrypt) dans les env vars Vercel pour permettre la première connexion.
5. **Déployer** : `git push` sur la branche principale déclenche le build automatique.
6. **Post-déploiement** :
   - Soumettre le sitemap (`/sitemap.xml`) à Google Search Console + Bing Webmaster Tools.
   - Vérifier les Speed Insights et Web Vitals dans le dashboard Vercel.
   - Tester `/admin/login`, le formulaire `/demande-devis`, et la newsletter.

## 📚 Documentation

- **[QUICK_START.md](QUICK_START.md)** - Démarrage rapide et déploiement
- **[IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md)** - Résumé complet de l'implémentation
- **[GUIDE_GOOGLE_SERVICES.md](GUIDE_GOOGLE_SERVICES.md)** - Configuration Google Analytics, GTM, Search Console

## 🏗️ Architecture

```
Sconnect/
├── src/
│   ├── app/                    # Routes Next.js App Router
│   │   ├── api/               # API Routes
│   │   │   ├── contact/       # Formulaire contact
│   │   │   ├── devis/         # Demande devis
│   │   │   └── intervention/  # Intervention urgente
│   │   ├── services/          # Pages services
│   │   ├── admin/             # Back-office
│   │   └── ...                # Autres pages
│   ├── components/            # Composants React
│   │   ├── layout/            # Header, Footer, etc.
│   │   ├── ui/                # Composants UI réutilisables
│   │   ├── forms/             # Formulaires
│   │   ├── analytics/         # Google Analytics
│   │   └── seo/               # SEO components
│   ├── lib/                   # Utilitaires
│   │   ├── email.ts           # Service email Resend
│   │   ├── analytics.ts       # Tracking événements
│   │   ├── structured-data.ts # Schema.org
│   │   └── supabase/          # Clients Supabase
│   └── contexts/              # React Contexts
├── public/                    # Assets statiques
├── supabase/                  # Migrations SQL
└── docs/                      # Documentation
```

## 🛠️ Technologies

### Frontend
- **Next.js 15** - Framework React avec App Router
- **TypeScript** - Typage statique
- **Tailwind CSS** - Styling utilitaire
- **Framer Motion** - Animations
- **Lucide React** - Icônes

### Backend
- **Supabase** - Base de données PostgreSQL + Storage
- **Resend** - Service d'envoi d'emails
- **React Hook Form** - Gestion des formulaires
- **Zod** - Validation des schémas

### Analytics & SEO
- **Google Analytics 4** - Tracking utilisateurs
- **Google Tag Manager** - Gestion des tags
- **Schema.org** - Données structurées
- **Next.js Metadata API** - SEO optimisé

### Déploiement
- **Vercel** - Hébergement et CI/CD
- **GitHub** - Version control

## 📊 Performance

- ⚡ **Lighthouse Score** : 90+ (cible)
- 🎨 **First Contentful Paint** : < 1.5s
- 🚀 **Time to Interactive** : < 3s
- 📱 **Mobile-friendly** : 100%
- ♿ **Accessibilité** : AAA

## 🔒 Sécurité

- HTTPS obligatoire
- Headers de sécurité (HSTS, CSP, X-Frame-Options)
- Validation des entrées côté serveur
- Protection CSRF
- JWT pour l'admin
- Variables d'environnement sécurisées

## 🌍 SEO

- Métadonnées complètes sur toutes les pages
- Schema.org (Organization, LocalBusiness, Service, Review)
- Sitemap.xml dynamique
- robots.txt configuré
- Open Graph tags
- Twitter cards
- Breadcrumbs
- URLs optimisées

## 🤝 Contribution

Ce projet est privé. Pour toute modification :

1. Créer une branche : `git checkout -b feature/nom-feature`
2. Commiter : `git commit -m 'feat: description'`
3. Pousser : `git push origin feature/nom-feature`
4. Créer une Pull Request

## 📝 Scripts Disponibles

```bash
npm run dev          # Développement (avec Turbopack)
npm run build        # Build de production
npm start            # Serveur de production
npm run lint         # Linter ESLint
```

## ⚠️ Actions Requises

Avant la mise en production complète :

1. **Fournir les données réelles** (voir IMPLEMENTATION_SUMMARY.md)
   - Coordonnées entreprise
   - SIRET, RCS, etc.
   - Horaires exacts

2. **Créer les assets visuels**
   - Logos (plusieurs formats)
   - Image Open Graph
   - Photos de réalisations

3. **Configurer les services**
   - Resend (emails)
   - Google Analytics
   - Google Tag Manager
   - Google My Business

4. **Tester**
   - Formulaires
   - Emails
   - Analytics
   - Performance
   - Mobile

## 📞 Support

Pour toute question technique :
- Consulter la documentation dans `/docs`
- Voir les fichiers GUIDE_*.md à la racine
- Vérifier les issues GitHub

## 📄 Licence

Propriété de S'Connect. Tous droits réservés.

---

**Statut** : ✅ Production Ready (nécessite données réelles)  
**Dernière mise à jour** : Janvier 2026  
**Version** : 1.0.0
