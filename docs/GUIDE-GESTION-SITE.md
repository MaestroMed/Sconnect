# Guide de gestion du site — S Connect France

Ce guide explique **comment gérer toi-même** les réalisations (chantiers) et les
images du site. Il dit aussi clairement **ce qui marche aujourd'hui** et **ce qui
demande une action de ta part** (Supabase, variables Vercel).

---

## 0. En une minute — où tout vit

| Ce que tu veux changer | Le fichier / dossier | Apparaît en ligne après |
|---|---|---|
| **Réalisations** (chantiers du portfolio) | `src/lib/data/realizations.json` | un déploiement |
| **Photos des réalisations** | `public/images/realisations/` | un déploiement |
| **Image du hero (accueil)** | `public/images/hero/hero-cinema-paris.*` | un déploiement |
| **Logo, coordonnées, horaires** | `src/lib/data/site-config.json` | un déploiement |
| **Articles de blog** | `content/blog/*.mdx` | un déploiement |

> **Règle d'or** : ce que le site public affiche vient des **fichiers du dépôt
> Git** (committés), pas d'une base de données. Modifier un fichier + déployer =
> c'est en ligne. C'est la méthode la plus fiable, et elle ne dépend d'**aucune
> infrastructure payante**.

---

## 1. ⚠️ Le back-office /admin : pourquoi il ne marche pas (encore) en ligne

L'adresse `https://sconnectfrance.fr/admin/login` existe, mais **en production
elle est volontairement bloquée aujourd'hui**, pour 3 raisons :

1. **`JWT_SECRET` n'est pas défini** dans Vercel → la connexion admin est en
   « fail-closed » (refusée). C'est une sécurité : l'ancien code avait un mot de
   passe secret écrit en dur dans le repo, ce qui permettait à n'importe qui de
   se faire passer pour admin. Corrigé.
2. **La base Supabase est morte** (le projet n'existe plus / en pause). L'admin
   stocke tout dans Supabase ; sans elle, rien ne s'enregistre.
3. **Les uploads d'images** passent par Supabase Storage. Sans Supabase, ils
   échouent (le disque de Vercel est en lecture seule, on ne peut pas y écrire).

**Conséquence** : tant que ces points ne sont pas réglés, on gère le site par les
fichiers (section 2 et 3), ce qui marche parfaitement. Pour réactiver le
back-office cloud, voir la **section 6**.

Tu peux aussi utiliser le back-office **en local sur ton ordinateur** (section 5)
si tu préfères une interface visuelle pour préparer tes changements.

---

## 2. Gérer les RÉALISATIONS (la méthode fiable)

Les réalisations vivent dans **`src/lib/data/realizations.json`**. Chaque chantier
est un bloc. Pour en **ajouter un** :

### Étape 1 — préparer la photo
- Mets ta photo dans `public/images/realisations/`.
- Nomme-la simplement, sans espace ni accent : `realisation-13.webp` (ou `.jpg`).
- Format conseillé : **WebP**, largeur ~1200 px, < 300 Ko. (Si tu n'as qu'un JPG,
  ça marche aussi — mets `.jpg` dans le chemin.)

### Étape 2 — ajouter le bloc dans `realizations.json`
Copie-colle ce modèle dans la liste `"realizations"` (attention à la **virgule**
entre chaque bloc) :

```json
{
  "id": "13",
  "title": "Relamping LED d'un entrepôt logistique",
  "type": "Entrepôt",
  "location": "Gennevilliers",
  "category": "electricite",
  "serviceType": "Installation",
  "description": "Remplacement de 80 luminaires par des high-bay LED avec détection de présence. −70 % de consommation.",
  "image": "/images/realisations/realisation-13.webp",
  "featured": true
}
```

**Champs à remplir :**

| Champ | Valeurs possibles | Rôle |
|---|---|---|
| `id` | un nombre unique (ex. `"13"`) | identifiant — ne pas dupliquer |
| `title` | texte libre | titre du chantier |
| `type` | texte libre (Appartement, Bureaux, Entrepôt…) | type de bâtiment |
| `location` | ville | lieu du chantier |
| `category` | `electricite`, `controle-acces`, `serrurerie`, `metallerie` | sert au **filtre** sur la page |
| `serviceType` | `Installation`, `Rénovation`, `Dépannage`, `Mise aux normes` | badge affiché |
| `description` | texte libre (1-2 phrases) | description courte |
| `image` | `/images/realisations/ton-fichier.webp` | photo principale (**obligatoire**) |
| `featured` | `true` ou `false` | `true` = aussi affiché sur la page d'accueil |

**Champs optionnels** (pour un avant/après) :
```json
  "imageBefore": "/images/realisations-before/ton-avant.webp",
  "imageAfter": "/images/realisations/ton-apres.webp",
```

### Étape 3 — déployer
- Soit tu **demandes à Claude** : « ajoute cette réalisation et déploie ».
- Soit en ligne de commande : `git add -A && git commit -m "réalisation: entrepôt Gennevilliers" && git push`.
- Le déploiement Vercel se lance, c'est en ligne en ~2 minutes.

**Modifier** une réalisation = changer son bloc. **Supprimer** = enlever son bloc
(et la virgule en trop). **Réordonner** = changer l'ordre des blocs dans le fichier.

> Astuce : avant de pousser, vérifie que le JSON est valide (pas de virgule
> oubliée) avec `node -e "require('./src/lib/data/realizations.json')"` — s'il
> n'affiche rien, c'est bon ; s'il affiche une erreur, c'est une virgule/accolade.

---

## 3. Changer les IMAGES du site

### Le hero de l'accueil
Remplace ces fichiers (garde **exactement les mêmes noms**) :
- `public/images/hero/hero-cinema-paris.webp` (principal)
- `public/images/hero/hero-cinema-paris.jpg` (secours)
- `public/images/hero/hero-cinema-paris-820.webp` et `-1366.webp` (versions mobile/tablette)

Pour régénérer les versions mobiles à partir de l'image pleine taille :
```bash
node -e "const s=require('sharp'); (async()=>{for(const w of [820,1366]){await s('public/images/hero/hero-cinema-paris.webp').resize(w).webp({quality:72}).toFile('public/images/hero/hero-cinema-paris-'+w+'.webp')}})()"
```
(ou demande simplement à Claude de le faire).

### Le logo, les coordonnées, les horaires
Tout est dans **`src/lib/data/site-config.json`** : téléphone, email, adresse,
horaires, réseaux sociaux. Édite, déploie.

### L'image de partage réseaux sociaux (OG)
`public/og-image.jpg` (générée par `npm run brand:og`).

### Les images des pages services / verticales
Dans `public/images/services/`, `public/images/verticales/`, `public/images/hero/`.
Les chemins sont écrits dans les pages — pour en changer une, remplace le fichier
en gardant le même nom, ou demande à Claude.

---

## 4. Déployer (rappel)

Le site se déploie tout seul à **chaque push sur la branche `main`** (et seulement
`main` — les autres branches ne consomment pas de build Vercel, c'est volontaire).

- **Le plus simple** : demande à Claude « commit et déploie ».
- **À la main** : `git add -A && git commit -m "ta description" && git push`.

---

## 5. Utiliser le back-office EN LOCAL (option visuelle)

Si tu veux une interface visuelle pour préparer tes changements (sans Supabase) :

```bash
# 1. Créer ton compte admin local (une seule fois) — reste sur ta machine
npm run admin:create -- ton@email.fr "TonMotDePasse"

# 2. Lancer le site en local
npm run dev

# 3. Ouvrir le back-office
#    http://localhost:3000/admin/login
```

En local, l'admin écrit dans les fichiers JSON et `public/uploads/`. Tu modifies
visuellement, puis tu **commits + push** pour mettre en ligne. ⚠️ Les uploads
locaux vont dans `public/uploads/` (gitignoré) — pour une réalisation destinée à
la prod, mets plutôt la photo dans `public/images/realisations/` (section 2).

> Ton compte admin local n'est **jamais** envoyé dans le dépôt (le fichier
> `admin-users.json` est gitignoré).

---

## 6. Activer le vrai back-office cloud (Supabase) — procédure exacte

Pour que `/admin` fonctionne **en ligne** (édition depuis n'importe où, uploads
d'images, stockage des demandes de devis et de la newsletter). Fais les étapes
**dans l'ordre**.

### A. Côté Supabase (dans ton navigateur)
1. Dans ton projet Supabase → **SQL Editor** → **New query**.
2. Ouvre le fichier **`supabase/SETUP.sql`** du dépôt, copie **tout**, colle, **Run**.
   → Ça crée toutes les tables, les sécurités, **et** le bucket d'images
   `sconnectfrance`. (Re-jouable sans risque — les anciens `schema.sql`/
   `seed.sql` dangereux ont été supprimés du dépôt.)
   **Si la base a été installée avant août 2026, re-exécute SETUP.sql** :
   il corrige les policies RLS qui laissaient la clé publique `anon` écrire
   dans toutes les tables (dont `admin_users` et les demandes clients).
3. **Project Settings → API** : note ces 3 valeurs :
   - `Project URL` → ira dans `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → ira dans `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key (secrète !) → ira dans `SUPABASE_SERVICE_ROLE_KEY`

### B. Côté ton ordinateur (fichier `.env.local`)
Crée/édite le fichier `.env.local` à la racine du projet (gitignoré, reste chez toi)
avec **au minimum** :
```
NEXT_PUBLIC_SUPABASE_URL=...        (Project URL)
NEXT_PUBLIC_SUPABASE_ANON_KEY=...   (anon public)
SUPABASE_SERVICE_ROLE_KEY=...       (service_role)
```
Puis, dans le terminal, charge les vraies données et crée ton compte admin :
```bash
npm run db:seed                                   # vraies données (réalisations, etc.)
npm run db:import-mdx                             # (optionnel) les 52 articles
npm run admin:create -- ton@email.fr "TonMotDePasse"   # crée l'admin DANS Supabase
```
> Claude peut lancer ces 3 commandes pour toi une fois `.env.local` rempli.

### C. Côté Vercel (Settings → Environment Variables, pour la PROD)
Ajoute ces variables (Production), puis **redéploie** :
| Variable | Valeur |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | anon public |
| `SUPABASE_SERVICE_ROLE_KEY` | service_role (secret) |
| `JWT_SECRET` | une chaîne aléatoire ≥ 32 caractères (Claude t'en a généré une) |
| `RESEND_API_KEY` | ta clé Resend |
| `RESEND_FROM_EMAIL` | `contact@sconnectfrance.fr` (domaine **vérifié** dans Resend) |
| `RESEND_TO_EMAIL` | l'adresse où recevoir les demandes |

Une fois redéployé : `https://sconnectfrance.fr/admin/login` fonctionne avec le
compte créé à l'étape B.

> Tant que ces variables ne sont pas mises, **rien n'est cassé** : le site lit les
> fichiers JSON/MDX committés. C'est juste l'édition « cloud » qui attend.
7. **Redéployer**. `/admin/login` fonctionne alors en ligne.

> Tant que Supabase n'est pas restauré, **rien n'est cassé** : le site lit les
> fichiers JSON committés. C'est juste l'édition « depuis le cloud » qui attend.

---

## 7. Ce qui reste à faire côté infra (récap)

Indépendamment du contenu, pour que **les devis arrivent** et que l'admin marche :

- [ ] **Vercel → `RESEND_API_KEY` + `RESEND_FROM_EMAIL`** (domaine vérifié dans
      Resend). **Sans ça, aucun email de devis ne part.** Priorité n°1.
- [ ] **Vérifier la boîte `contact@sconnectfrance.fr`** chez OVH (les MX existent).
- [ ] **Vercel → `JWT_SECRET`** (≥ 32 caractères).
- [ ] **Supabase** : recréer (section 6) ou laisser les variables vides.
- [ ] **Search Console** : re-soumettre `https://sconnectfrance.fr/sitemap.xml`.
- [ ] **Google Business Profile** + photos chantier (levier SEO local n°1).
