# Setup GMB + Search Console — checklist Mehdi

> Pour passer de 7/10 à 8.5/10 sur les axes Local SEO + visibilité Google.
> Temps total estimé : ~1h.

## 1. Google Business Profile (~30 min)

### Étape 1 — Créer ou réclamer la fiche

1. Va sur https://business.google.com/
2. Connecte-toi avec un compte Google **dédié pro** (pas perso)
3. Cherche « S Connect France » à 35 rue des Cailloux, 92110 Clichy
4. Si elle existe : clique « Réclamer cette fiche »
5. Si elle n'existe pas : « Ajouter votre établissement »

### Étape 2 — Compléter la fiche à 100%

Champs critiques pour le SEO :

- **Nom** : `S Connect France`
- **Catégorie principale** : `Électricien` (Electrician)
- **Catégories supplémentaires** (max 9) :
  - Serrurier (Locksmith)
  - Métallier (Metalworker)
  - Société d'installation de bornes de recharge VE
  - Installateur d'éclairage (Lighting contractor)
- **Adresse** : 35 rue des Cailloux, 92110 Clichy
- **Zone de service** : ajoute toutes les communes de la couverture
  - Paris (75) — tous arrondissements
  - Clichy, Levallois-Perret, Asnières-sur-Seine, Saint-Ouen, Neuilly,
    Boulogne-Billancourt, Issy-les-Moulineaux, Nanterre, Courbevoie, Puteaux (92)
  - Saint-Denis, Aubervilliers, Pantin (93)
  - + La Défense
- **Téléphone** : `+33 6 52 82 06 85`
- **Site web** : `https://sconnectfrance.fr`
- **Horaires** :
  - Lun-Ven : 8h-19h
  - Sam : 9h-17h
  - Dim : Sur urgence (mention « Urgences 24/7 » dans description)
- **Description** (max 750 caractères) :
  > S Connect France — artisan électricien, serrurier, métallier et
  > spécialiste contrôle d'accès certifié Qualifélec, RGE et IRVE.
  > Basés 35 rue des Cailloux à Clichy (92110), nous intervenons sur
  > toute l'Île-de-France. Spécialité : relamping LED tertiaire pour
  > répondre au décret tertiaire 2030, bornes de recharge IRVE avec
  > prime ADVENIR, dépannage 24h/24 en serrurerie et électricité. Devis
  > ferme et gratuit sous 7 jours, facture finale = devis annoncé.

### Étape 3 — Photos (minimum 30, idéalement 50+)

Catégories à couvrir :
- **Logo** (la version SVG /images/logo_sconnect.svg fonctionnera)
- **Couverture** (1080×608 minimum) — image hero du site marche bien
- **Équipe** (photos du `/auteur/mehdi-belkacem` page)
- **Chantiers** — avant/après tableau électrique, relamping bureau, blindage porte
- **Véhicule** d'intervention (logo bien visible)
- **Local** atelier 35 rue des Cailloux

### Étape 4 — Demander 10 premiers avis

Stratégie :
1. Liste tes 20 derniers clients satisfaits (CRM ou mémoire)
2. Envoie-leur un email court avec lien direct vers la fiche
3. Cible : 10 avis 5⭐ dans le premier mois
4. **Lien direct** (généré une fois la fiche active) : récupère-le dans le
   tableau de bord GMB → bouton « Demander des avis »

### Étape 5 — Me donner l'URL GMB

Une fois la fiche active, l'URL canonique ressemble à :
```
https://g.page/r/CabcDef123_jklmnop/review
```

Donne-la moi → je l'injecte dans :
- `src/components/marketing/RatingBadge.tsx` (badge ⭐ cliquable dans le hero)
- `src/app/avis/page.tsx` (CTA "Voir nos avis Google")
- `src/components/layout/Footer.tsx` (lien social GMB dans le footer)

---

## 2. Google Search Console (~20 min)

### Étape 1 — Créer la propriété

1. Va sur https://search.google.com/search-console/welcome
2. Connecte-toi avec le même compte Google que GMB
3. Choisis « Domaine » (pas URL préfixe) → tape `sconnectfrance.fr`
4. Google te donne un enregistrement TXT DNS à ajouter

### Étape 2 — Ajouter le TXT DNS

1. Connecte-toi sur ton registrar (OVH, Gandi, Cloudflare, etc.)
2. Va dans la zone DNS du domaine `sconnectfrance.fr`
3. Ajoute un record :
   - Type : `TXT`
   - Nom : `@` (racine)
   - Valeur : `google-site-verification=XXXXXXXXXX` (copié depuis Search Console)
   - TTL : 3600 (1h)
4. Sauvegarde et attends 10-30 min la propagation
5. Reviens dans Search Console et clique « Valider »

### Étape 3 — (Alternatif) Méthode meta tag

Si tu préfères ne pas toucher au DNS :
1. Choisis « Préfixe URL » au lieu de « Domaine »
2. Google te donne un meta tag : `<meta name="google-site-verification" content="ABCXYZ..." />`
3. Donne-moi juste le content (`ABCXYZ...`)
4. J'ajoute en env var `GOOGLE_SITE_VERIFICATION` sur Vercel
5. Le code dans `src/app/layout.tsx` (déjà branché) injectera le meta tag automatiquement

### Étape 4 — Soumettre le sitemap

Une fois la propriété validée :
1. Menu de gauche → « Sitemaps »
2. Tape : `https://sconnectfrance.fr/sitemap.xml`
3. Clique « Envoyer »
4. Google met 2-7 jours pour indexer les nouvelles URLs

### Étape 5 — Inspection URL ciblée

Pour les 3 articles prod-ready prioritaires :
1. Menu de gauche → « Inspection d'URL »
2. Tape l'URL complète (ex: `https://sconnectfrance.fr/actualites/suppression-primes-cee-eclairage-led-2026`)
3. Clique « Demander l'indexation »
4. Répète pour : `financer-relamping-led-sans-cee-2026`, `decret-tertiaire-eclairage-strategie-2026-sans-cee`, `audit-eclairage-led-methode`

→ Ces URLs seront indexées par Google sous 24-72h au lieu d'attendre le
prochain crawl (qui peut prendre 2-4 semaines pour un site jeune).

---

## 3. Vercel env vars à configurer

Une fois GMB + Search Console actifs, ajoute dans Vercel :

| Variable | Valeur | Effet |
|---|---|---|
| `GOOGLE_SITE_VERIFICATION` | le code (ex: `ABCxyz123`) | Active la meta tag verification |
| `BING_SITE_VERIFICATION` | (optionnel, via Bing Webmaster) | Idem pour Bing |
| `INDEXNOW_TRIGGER_TOKEN` | un secret aléatoire que tu inventes | Active l'endpoint `/api/indexnow` |
| `NEXT_PUBLIC_GMB_URL` | l'URL GMB courte (ex: `https://g.page/r/...`) | Branche RatingBadge sur la vraie fiche |

Procédure Vercel :
1. Va sur https://vercel.com/dashboard
2. Sélectionne le projet `sconnect`
3. Settings → Environment Variables
4. Ajoute chaque var en sélectionnant tous les environments (Production + Preview + Development)
5. Redéploie le projet (Settings → Deployments → ... → Redeploy)

---

## 4. (Bonus) Vercel deploy hook → IndexNow ping automatique

Pour que chaque deploy Vercel ping Bing/Yandex/Google sitemap automatiquement :

1. Vercel project → Settings → Git → Deploy Hooks
2. Crée un hook nommé `seo-indexnow-ping`
3. Copie l'URL générée
4. Va sur GitHub Actions secrets : Settings → Secrets → Actions
5. Crée 2 secrets :
   - `VERCEL_DEPLOY_HOOK_URL` = l'URL du hook
   - `INDEXNOW_TRIGGER_TOKEN` = le même token qu'en var Vercel
6. Ajoute un workflow GitHub Actions qui POST sur `/api/indexnow` après chaque deploy réussi

Workflow type (à créer en suivi) :
```yaml
# .github/workflows/post-deploy-indexnow.yml
name: Post-deploy IndexNow ping
on:
  deployment_status:
jobs:
  ping:
    if: github.event.deployment_status.state == 'success'
    runs-on: ubuntu-latest
    steps:
      - name: Ping IndexNow
        run: |
          curl -X POST https://sconnectfrance.fr/api/indexnow \
            -H "Authorization: Bearer ${{ secrets.INDEXNOW_TRIGGER_TOKEN }}" \
            -H "Content-Type: application/json" \
            -d '{}'
```

---

## Estimation gain SEO

| Action | Impact SERP | Effort | Délai effet |
|---|---|---|---|
| GMB activé + 10 avis | +2 points Local Pack | 30 min + relances clients | 2-4 sem |
| Search Console + sitemap soumis | Indexation rapide 47 URLs | 20 min | 1-2 sem |
| Inspect URL prio | Top 3 articles indexés < 72h | 5 min | 24-72h |
| Env vars Vercel | Active features IndexNow + GMB link | 10 min | Immédiat |
| Deploy hook IndexNow | Indexation Bing/Yandex < 1h après deploy | 15 min | À chaque deploy |

**Total temps Mehdi : ~1h15. Total gain projeté : +2 points sur Local SEO + +1 point sur Backlinks/visibilité.**
