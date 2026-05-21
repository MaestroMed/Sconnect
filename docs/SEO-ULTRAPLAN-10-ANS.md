# Ultraplan SEO 10 ans — devenir LA référence "Relamping LED IDF"

> Doc stratégique. Pas un plan marketing. La grille de décision pour
> chaque page produite, supprimée, refactorisée d'ici 2036.

## 0. CONTEXTE 2026 — pourquoi ce doc maintenant

Trois forces se cumulent en mai 2026 :

1. **Suppression CEE éclairage** (arrêté 23 février 2026). Les concurrents
   qui ont ranked sur "BAT-EQ-127 montant" diffusent du contenu obsolète.
   **Fenêtre d'opportunité : 6-12 mois** avant qu'ils rattrapent.
2. **Helpful Content Update + March 2026 Spam Update**. Google a explicitement
   nuké les sites "scaled content abuse" : 50-80 % de trafic perdu pour les
   sites qui ont publié des milliers de pages programmatiques sans
   éditorialisation. **Le volume sans valeur tue** — la quality multiplier
   au niveau domaine fait que les pages faibles tirent les bonnes vers le bas.
3. **Notre socle structurel** existe (50 drafts en backlog, 12 location pages
   scaffolded, 6 vertical pages, infra schema/sitemap/IndexNow OK).

Le réflexe naïf serait : *« générons 5 000 pages. »* C'est ce qui va planter
le site. Le bon move : **densifier la qualité éditoriale** sur le socle déjà
prêt, **pas** multiplier le volume.

## 1. LE COMPROMIS ASSUMÉ

**Cible : 200-300 URLs publiques de haute valeur, pas 2 000-5 000 de valeur thin.**

Stripe (~280 URLs publiques) domine le SEO B2B paiement.
Linear (~150 URLs) domine le SEO B2B project management.
Datadog (~400 URLs) domine le SEO B2B observabilité.

Aucun n'a > 1 000 URLs. Tous dominent leur SERP. Le pattern récurrent :
- **Topical authority maximale sur un cluster défini**
- **Information Gain** : chaque page apporte de la donnée que personne d'autre n'a
- **Expert voice** : un humain identifiable, citable, qui a fait le métier
- **Refresh régulier** : dateModified bumped au moins 2× / an

## 2. ARCHITECTURE CIBLE 2027 (T+12 mois)

```
~250 URLs publiques production-ready :

┌─ Pages pillar (4)
│  ├─ /services/electricite/relamping (la pillar mère)
│  ├─ /services/electricite/borne-irve
│  ├─ /services/serrurerie
│  └─ /services/metallerie
│
├─ Pages typologies (4 + 6 = 10)
│  ├─ /relamping/bureau-tertiaire, /commerce-restaurant,
│  │  /copropriete-parking, /industriel-entrepot
│  └─ /verticales/{parking-souterrain, pharmacie, restaurant,
│      ecole-college, hotel, gymnase-salle-sport}
│
├─ Pages location (12 villes target)
│  └─ Paris, Clichy, La Défense, Boulogne, Levallois, Neuilly,
│     Issy, Nanterre, Courbevoie, Puteaux, Asnières, Saint-Denis
│
├─ Pages SEO weapons (4)
│  ├─ /calculateur-relamping
│  ├─ /lexique-eclairage (50 termes)
│  ├─ /presse (kit + boilerplate)
│  └─ /etudes-de-cas (3-5 case studies chantiers réels documentés)
│
├─ Blog éditorialisé (~50 articles)
│  └─ Mélange : actualités sectorielles, guides techniques, comparatifs
│     marques, retours d'expérience chantiers (Information Gain)
│
└─ Pages corporate (10-15)
   └─ /presentation, /avis, /realisations, /contact, /actualites,
      /demande-devis, /demande-intervention, /auteur/mehdi-belkacem,
      /mentions-legales, /politique-confidentialite, /cookies,
      /conditions-generales
```

**Volume cible : 200-300 URLs**, jamais > 500. À chaque nouvelle URL, un
question-test : *« est-ce qu'il existe une SERP où cette URL doit ranker
top 5 ? Si non, on ne la fait pas. »*

## 3. CE QU'ON NE FAIT PAS

Anti-patterns à proscrire :

❌ **Pages "city × typology"** (12 × 6 = 72 combinations). Genère des doublons
   massifs (le contenu "relamping bureau Clichy" et "relamping bureau Puteaux"
   serait identique à 95 %). Risque scaled content = nuke domaine.
❌ **Pages "service × commune"** sur tous les autres services (serrurerie ×
   12 villes = 12 pages thin). Même raison.
❌ **Pages arrondissement Paris** (75001, 75002, … 75020 = 20 pages quasi-vides).
❌ **Pages "prix" indépendantes** par typologie (`/prix-relamping-bureau`,
   `/prix-relamping-commerce`, etc.). Le pricing centralisé suffit, intégré
   aux pages parent.
❌ **Cluster orphelin** : tout post sans maillage interne pertinent (au moins
   3 liens entrants depuis pillar/sub).
❌ **Auto-publish** sans review humaine. Le cron loop **scaffolds**, le humain
   **éditorialise et publie** (basculer `draft: false`).

## 4. CE QU'ON FAIT (recette de chaque URL prod-ready)

Pour qu'une URL passe de `draft: true` à `draft: false`, elle doit cocher :

✅ **Information Gain** : au moins un chiffre, un cas, ou un point de vue
   qu'on ne trouve pas dans le top 10 SERP actuel sur la query cible.
   Ça peut être : une mesure terrain réelle, un retour d'expérience anonymisé,
   un calcul ROI précis, une comparaison fournisseur sourcée.
✅ **Word count ≥ word target du backlog** (typique 800-1500).
✅ **Schema(s) appropriés** : Article + Person auteur, ou Service + FAQPage,
   ou HowTo si procédure pas-à-pas.
✅ **3+ liens internes** sortants vers pillar / sub / blog connexes.
✅ **1+ source externe citée** (norme officielle, étude, ADEME, Légifrance).
✅ **1+ image originale** (générée Higgsfield OU photo terrain S Connect).
✅ **Auteur réel signé** (Mehdi par défaut, équipe sinon).
✅ **Mise à jour planifiée** : `dateModified` revisité au moins 2× / an.
✅ **Bloc CTA pertinent** (audit gratuit / devis / urgence selon contexte).

## 5. CADENCE ÉDITORIALE 10 ANS

| Période | Objectif | Volume |
|---|---|---|
| **2026 T2-T3** (juin-sept) | Éditorialiser les 50 drafts existants à 100 % | 5-7 posts éditorialisés / semaine = 50 en 9 sem |
| **2026 T4** (oct-déc) | Production de 3-5 case studies chantiers réels | 12-15 nouveaux items prod-ready |
| **2027 T1** (jan-mars) | Maintenir cadence 1 post/sem + rafraîchir 100 % du back-catalogue | 12 nouveaux + 50 refresh |
| **2027 T2-T4** | Rythme de croisière : 1 post/sem + 1 case study/mois | ~52/an |
| **2028-2030** | Maintenir 1/sem + élargir verticals (BIM, IoT bâtiment, jumeau numérique éclairage) | ~52/an |
| **2031-2036** | Maturité : 1/2 sem + leadership thought (interventions conférences, livre blanc annuel) | ~26/an + 3-5 assets long-form/an |

**Total cumulé 2036** : ~500 URLs vivantes, dont ~300 production-ready, ~200
archivées (no-index) ou refondues.

## 6. SIGNALS HORS-CONTENU (le 50 % invisible du SEO)

Le contenu n'est que la moitié. L'autre moitié = signaux d'autorité et UX
mesurés par Google.

**Backlinks** (cible : 80-150 backlinks dofollow référents qualifiés d'ici
2027) :
- Citations média via /presse → cible 6-10 mentions/an
- Partenariats fabricants (Trilux, Sylvania, Hager, Philips) → co-publication
- Guest posts sur Batiactu, Les Echos Solutions, ARC Info, Energies & Filières
- Citation experte Mehdi sur podcasts métier (Le Bâtiment, ABC du BTP)
- Annuaires métier qualifiés (Qualifélec, RGE, FFB)

**Google Business Profile** :
- À configurer (l'utilisateur a skip l'URL pour l'instant)
- 30+ photos chantier authentiques
- Réponse < 24h à toute review
- Posts hebdo (offres, actu)
- Q&A proactif (10+ questions plantées + répondues)

**Engagement signal** :
- Newsletter avec 500+ abonnés qualifiés d'ici 2027 (artisans / syndics /
  responsables tertiaire)
- LinkedIn personnel Mehdi : 1 post/semaine sur retours chantier
- YouTube : 1 vidéo audit / mois (chantier filmé)

**Core Web Vitals p75 < seuils Google** sur 100 % des URLs.

## 7. RÔLE DU CRON LOOP DANS CE PLAN

Le cron loop **n'est pas** un robot publisher. C'est un **scaffolder + reminder**.

- Il assure qu'on n'oublie pas un sujet du backlog (50 items + ajouts futurs)
- Il pré-rédige la structure (frontmatter, outline, maillage interne, CTAs)
  pour que le humain ne parte pas de zéro
- Il maintient la cadence (1 scaffold/jour = 30/mois) qui force la production
- Il n'auto-merge JAMAIS sur main (PR review obligatoire)
- Le draft reste `draft: true` jusqu'à validation humaine

**Quality gate ajoutée à scripts/seo-generate.ts** :
- Refuse de re-scaffolder un item déjà en `generated` (existant déjà)
- Marquera un item `needs-editorial` si scaffold > 30 jours sans review
- Alerte (via PR body) si > 5 drafts en attente d'éditorialisation

## 8. UTILISATION DE HIGGSFIELD (image / vidéo génératif)

Higgsfield = générateur unique par URL → résout le "every page looks the
same" qui inquiète Google sur le programmatic SEO.

**Politique** :
- **1 image originale par page production-ready** (hero, OG, illustrations)
- Pas de réutilisation d'image entre pages
- Style direction unifiée : photoréaliste, cinematic, éclairage tertiaire pro
- Models recommandés :
  - `nano_banana_pro` pour hero pages / OG haute qualité
  - `seedance_2_0` pour vidéos courtes (audit / installation)
- Budget : 2-3 images/sem × 52 = 100-150 images/an sur le compte Higgsfield

**Priorités images cette session** :
1. Hero /calculateur-relamping (relamping bureau en cours)
2. Hero /services/electricite/relamping/paris (skyline Paris + bureau LED)
3. Hero /services/electricite/relamping/la-defense (tours La Défense + LED)
4. Hero /services/electricite/relamping/verticales/parking-souterrain
5. Hero /services/electricite/relamping/verticales/pharmacie

## 9. KPIs DE SUIVI

Mesure mensuelle (à mettre dans `docs/SEO-KPI.md` à venir) :

| Métrique | T0 (mai 2026) | T+6 mois | T+12 mois | T+24 mois | T+60 mois |
|---|---|---|---|---|---|
| Pages prod-ready (`draft: false`) | ~15 | 60 | 110 | 180 | 280 |
| Pages classées top 10 sur ≥ 1 query | inconnu | 25 | 60 | 120 | 200 |
| Pages classées top 3 sur ≥ 1 query | inconnu | 8 | 25 | 60 | 120 |
| Mots-clés "relamping" top 3 | 0 | 4 | 12 | 25 | 40 |
| Backlinks dofollow référents | ~5 | 20 | 50 | 90 | 150 |
| Trafic organique mensuel | inconnu | 1 500 | 5 000 | 15 000 | 50 000 |
| Leads SEO / mois | 0 | 15 | 50 | 120 | 300 |

## 10. RÈGLES SOTA — non-négociables

1. ❌ **Aucun MDX `draft: true` ne va en prod**. Le filtre `getAllPosts`
   doit exclure les drafts en production (à implémenter si pas déjà fait).
2. ❌ **Aucun copier-coller** d'une page à l'autre > 30 % du contenu.
3. ❌ **Pas de stuffing keyword**. Densité primary keyword 0.5-1.5 %.
4. ✅ **Person schema** sur toute page importante (signé Mehdi).
5. ✅ **dateModified** bumped à chaque refresh éditorial.
6. ✅ **Internal linking** : chaque nouvelle URL crée au moins 1 lien
   sortant vers la pillar et 1 vers un sibling, ET reçoit ≥ 1 lien entrant
   depuis la pillar ou un sub.
7. ✅ **OG image dynamique** via `/api/og` route — déjà en place.
8. ✅ **Refresh signal** : recapper tout le back-catalogue 2× /an.
9. ✅ **Quality gate cron** : alerte si > 5 drafts non-éditorialisés.

## 11. PROCHAINE SESSION (à faire après celle-ci)

- [ ] Activer le filtre `draft: true` côté production (vérifier `getAllPosts`)
- [ ] Éditorialiser les 3 drafts urgents post-CEE (priority 100/95/90)
- [ ] Configurer Google Business Profile URL et la brancher dans RatingBadge
- [ ] Lancer le 1er audit Lighthouse en prod via `npm run perf:lh`
- [ ] Lancer outreach presse sur les 3 articles éditorialisés
- [ ] Mettre en place le tracking conversion (Vercel Analytics events)
