# 🚀 Quick Start - Mise en Production

## Étape 1 : Variables d'Environnement (5 min)

Copier `env.example.txt` vers `.env.local` et compléter :

```bash
cp env.example.txt .env.local
```

Minimum requis pour démarrer :
```bash
NEXT_PUBLIC_SITE_URL=https://sconnectfrance.fr
RESEND_API_KEY=re_votre_clé_resend
ADMIN_EMAIL=votre_email@sconnectfrance.fr
```

## Étape 2 : Installer les Dépendances

```bash
npm install
```

## Étape 3 : Tester en Local

```bash
npm run dev
```

Site disponible sur http://localhost:3000

## Étape 4 : Fournir les Données Essentielles

Éditer les fichiers suivants avec VOS données réelles :

1. **`src/lib/data/site-config.json`**
   - Téléphones
   - Email
   - Adresse

2. **`src/lib/data/testimonials.json`**
   - Avis clients réels

3. **`src/lib/data/realizations.json`**
   - Vos projets

4. **`src/app/mentions-legales/page.tsx`**
   - Compléter champs `[À COMPLÉTER]`

## Étape 5 : Ajouter les Assets

Placer dans `/public/` :
- `logo.png`
- `favicon.ico`
- `og-image.jpg`
- `icon-192.png` et `icon-512.png`

## Étape 6 : Build de Production

```bash
npm run build
npm start
```

## Étape 7 : Déploiement Vercel

1. Push sur GitHub
2. Lier le repo sur https://vercel.com
3. Configurer les variables d'environnement sur Vercel
4. Déployer

## ✅ Checklist Avant Déploiement

- [ ] `.env.local` configuré
- [ ] Toutes les données factices remplacées
- [ ] Assets visuels ajoutés
- [ ] Build réussi (`npm run build`)
- [ ] Tests locaux OK
- [ ] Variables env configurées sur Vercel

## 🆘 Problèmes Courants

**Build échoue** : Vérifier `npm run lint`
**Emails non envoyés** : Vérifier `RESEND_API_KEY`
**Images manquantes** : Vérifier les chemins dans `/public/`

Voir `IMPLEMENTATION_SUMMARY.md` pour les détails complets.
