# SEO Relamping — étude marché + ultraplan de production

> Document vivant. Mis à jour à chaque itération du cron de production.
> Dernière maj : 2026-05-21.

## 1. ÉTAT DES LIEUX

### 1.1 Notre positionnement actuel

- **Pillar** `/services/electricite/relamping` + 4 sub-pages typologie (bureau, commerce, copro, industriel)
- **8 blog posts** MDX dont 5 dédiés au cluster relamping
- **Page auteur** Mehdi Belkacem + Person schema (E-E-A-T)
- **ROI calculator** interactif sur la pillar
- **Pricing transparent** (6 prix bornes-irve + 6 prix relamping pillar via calculator)
- Schemas exhaustifs : Service, FAQPage, Article, HowTo (2 posts), Organization, LocalBusiness, AggregateRating, BreadcrumbList automatique, VideoObject

### 1.2 BREAKING NEWS — arrêté du 23 février 2026

**Les fiches CEE éclairage LED ont été SUPPRIMÉES**, effet 25 février 2026 :
- ❌ BAT-EQ-127 (tertiaire) — supprimée
- ❌ IND-BA-116 (industrie) — supprimée
- ❌ BAR-EQ-110 (résidentiel) — supprimée

**Notre exposition** :
- `content/blog/aides-cee-eclairage-2026.mdx` → entièrement basé sur ces fiches → **obsolète**
- `content/blog/audit-eclairage-led-methode.mdx` → étape 6 mentionne BAT-EQ-127 → à corriger
- `content/blog/prix-relamping-led-2026.mdx` → mentions "prime CEE déduite" → à corriger
- Pillar relamping + sub-pages : phrases "Aides CEE & certifications RGE" → à atténuer

**Mais : opportunité SEO massive**. Tous les concurrents qui ont ranked sur "BAT-EQ-127 montant", "prime CEE relamping", "fiche CEE éclairage" diffusent maintenant du contenu **obsolète**. Une vague de contenus actualisés sur "relamping LED sans CEE", "financer un relamping après suppression CEE", "alternatives au CEE éclairage 2026" = gain massif et rapide.

## 2. CONCURRENTS CARTOGRAPHIÉS

### Concurrents directs IDF

| Concurrent | Force SEO | Type | Risque pour nous |
|---|---|---|---|
| **FastWatt** (fastwatt.fr) | ⭐⭐⭐⭐ | Spécialiste relamping bureau + copro IDF | Très direct, ranking sur "relamping LED bureau", "relamping copropriété" |
| **S.E.G Électricité** (seg-electricite.fr) | ⭐⭐⭐ | Generaliste avec pages /relamping-paris, /relamping-hauts-de-seine | Direct sur les pages locations |
| **O&M Distribution** (om-distribution-avis.com) | ⭐⭐⭐ | Audit gratuit éclairage pro | Direct |
| **FME Energies** | ⭐⭐⭐ | Entreprises, entrepôts, bureaux | Direct |
| **Volt Électricité** (volt-electricite.fr) | ⭐⭐ | Generaliste 92 | Indirect, surtout pro |
| **EkoLogic** (ekologic.fr) | ⭐⭐ | Relamping LED | Direct relamping |

### Concurrents informationnels (rankent sur la longue traîne mais ne convertissent pas en local)

| Site | Force | Sujet |
|---|---|---|
| **Opera Energie** (opera-energie.com) | ⭐⭐⭐⭐⭐ | Tout sur le CEE + prime LED |
| **Réseau CEE** (reseau-cee.fr) | ⭐⭐⭐⭐ | Guide CEE relamping |
| **Acieb Energie** (aciebenergie.fr) | ⭐⭐⭐ | Guide relamping entreprise |
| **Eco-performance-solutions** | ⭐⭐⭐ | Fiches CEE détaillées |
| **Tera Energie** | ⭐⭐⭐ | CEE éclairage + arnaques à éviter |
| **Amiel Groupe** | ⭐⭐ | "Sans CEE BAT-EQ-127" |
| **ERDS** | ⭐⭐ | "Fin primes CEE LED 2026" |
| **FFBâtiment** | ⭐⭐⭐⭐ | Suppression primes CEE luminaires (institutionnel) |
| **Capitole Énergie** | ⭐⭐ | Subventions éclairage entreprise |

### Sites fabricants / marketplaces (low compete pour nous)

LampesDirect, Silamp, Lited, Sylvania Group, Enerlis, Greener Pro.

## 3. CLUSTERS DE MOTS-CLÉS

### Cluster 1 — POST-CEE 2026 (URGENT, opportunity window)

- relamping LED sans CEE (KD ~25, vol ↑)
- financer un relamping après suppression CEE
- alternatives prime CEE éclairage 2026
- suppression BAT-EQ-127 que faire
- fin prime CEE éclairage février 2026
- subvention relamping LED 2026 (hors CEE)
- leasing LED entreprise
- relamping LED via économies (sans prime)
- arrêté 23 février 2026 luminaires LED

### Cluster 2 — DÉCRET TERTIAIRE (toujours pertinent, complémentaire)

- décret tertiaire éclairage 2030
- DEET réduction 40 % éclairage
- OPERAT déclaration éclairage
- conformité décret tertiaire LED
- audit énergétique éclairage obligatoire

### Cluster 3 — TYPOLOGIES (notre socle existant à étendre)

- relamping LED bureau / open-space / coworking
- relamping LED commerce / restaurant / boutique
- relamping LED copropriété / parking
- relamping LED industriel / entrepôt
- **À ajouter** : relamping LED pharmacie, école, gymnase, hôpital, ERP, hôtel, laboratoire, salle de sport, restaurant, garage automobile

### Cluster 4 — LOCAL (gold mine non exploitée)

8 communes target × {général + 4 typologies} = **40 pages-cibles potentielles**.

Pattern : `/services/electricite/relamping/[ville]` ou `/relamping/[ville]/[typologie]`.

Villes priorisées (taille marché tertiaire + proximité Clichy) :
1. Paris (intra-muros)
2. La Défense
3. Boulogne-Billancourt
4. Levallois-Perret
5. Neuilly-sur-Seine
6. Saint-Denis (93)
7. Issy-les-Moulineaux
8. Nanterre
9. Asnières-sur-Seine
10. Clichy (siège)
11. Courbevoie
12. Puteaux

### Cluster 5 — INFORMATIONNELS / GUIDES (long-tail SEO + autorité)

- combien de lux pour un bureau
- comment choisir un luminaire DALI
- IRC qu'est-ce que c'est éclairage
- UGR éclairage explication
- température couleur LED 3000K vs 4000K
- IP65 IP54 IK10 luminaire qu'est-ce que c'est
- audit éclairage gratuit comment ça marche
- ROI relamping calcul
- norme NF EN 12464-1 résumé

### Cluster 6 — COMPARATIFS (haut intent, peu de concurrence)

- LED vs fluo : combien on économise
- Halogène vs LED tertiaire
- Tube T5 vs T8 vs LED
- 7 kW vs 11 kW vs 22 kW borne (déjà couvert IRVE)
- DALI vs sans gestion : ROI
- Détection de présence vs gradation crépusculaire
- Quelle marque LED pro choisir (Trilux, Sylvania, Philips, Hager)

## 4. SERP FEATURES & OPPORTUNITÉS RICH RESULTS

| Feature | État | Action |
|---|---|---|
| Rich snippet ⭐ | RatingBadge interne sur /avis ; manque link GMB | Ajouter URL GMB quand fournie par user |
| FAQ rich snippet | ✅ FAQ schema sur 5 pages relamping + IRVE | Ajouter sur installation-renovation + mise-aux-normes + posts |
| HowTo rich snippet | ✅ 2 posts (audit + dossier CEE — à mettre à jour vu CEE supprimés) | Ajouter sur 3-4 posts supplémentaires |
| Featured snippet (position 0) | À cibler avec définitions courtes + tableaux | Ajouter blocs "Définition" + tableaux comparatifs structurés |
| People Also Ask | Ranking par sujet à analyser | Ajouter sections FAQ thématiques aux blog posts |
| Video carousel | ✅ VideoObject schema sur 2 pages | Étendre |
| Local pack (Google Maps) | Dépend de GMB → relancer user pour URL | À configurer |
| Image search | OK avec next/image AVIF + alt explicites | Continuer alt riches |

## 5. SCORE ACTUEL ESTIMÉ

| Critère | Score | Note |
|---|---|---|
| Technical SEO | 9.5/10 | Schemas exhaustifs, sitemap, robots, perf solide |
| Content depth | 7/10 | 5 posts relamping + pillar + 4 sub mais 1 obsolète |
| E-E-A-T | 8.5/10 | Page auteur, Person schema, certifs visibles |
| Backlinks | inconnu | À auditer |
| Local SEO | 6/10 | Manque GMB intégré + pages location |
| Content velocity | 5/10 | 8 posts sur 12 mois — trop lent |

**Cible à 3 mois** : 9.5/10 sur tous les axes via la production loop ci-dessous.

## 6. ULTRAPLAN DE PRODUCTION (cron loop)

### Mécanisme

1. **Backlog** : `content/seo-backlog.json` liste tous les sujets à produire avec priorité, cluster, type, brief.
2. **Générateur** : `scripts/seo-generate.ts` :
   - Lit le backlog
   - Pick le prochain `pending` trié par priority desc + date asc
   - Génère le fichier (MDX ou TSX pour location pages) à partir d'un template adapté au type
   - Met à jour le backlog status à `generated` (à reviewer manuellement avant `published`)
3. **CI loop** : `.github/workflows/seo-loop.yml` :
   - Cron daily à 04:17 UTC
   - Run `npm run seo:generate`
   - Si nouveau fichier → ouvre une PR
4. **Validation manuelle** ou auto-merge selon le type (auto-merge pour les pages location à template strict, manual pour les blog posts).

### Cadence visée

- **1 nouveau contenu par jour** = 365/an = 30× la cadence actuelle
- Mix : 60 % location pages + 30 % posts longue traîne + 10 % comparatifs/guides

### Garde-fous

- Pas de contenu dupliqué (template + variables uniques par sujet)
- Pas de keyword stuffing
- Chaque page = ≥ 800 mots utiles + sources + maillage interne
- Frontmatter `draft: true` par défaut pour les blog posts (review humaine)
- Schemas adaptés au type

## 7. PROCHAINES ÉTAPES IMMÉDIATES

1. ✅ **URGENT (cette session)** : mettre à jour `aides-cee-eclairage-2026.mdx` avec banner warning + pivot vers post nouveau
2. ✅ **URGENT (cette session)** : générer `suppression-cee-eclairage-fevrier-2026.mdx`
3. ✅ Construire `content/seo-backlog.json` avec ≥ 40 items
4. ✅ Construire `scripts/seo-generate.ts`
5. ✅ Construire le workflow CI `.github/workflows/seo-loop.yml`
6. 🔲 (Tâche future) Pages location communes via route dynamique `[ville]`
7. 🔲 (Tâche future) Backlink audit + outreach plan
