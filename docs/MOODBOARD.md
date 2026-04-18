# Moodboard — Direction visuelle S'Connect

Document de référence après la refonte Phase 3. À consulter avant toute nouvelle section/page pour garder la cohérence.

---

## 1. Promesse visuelle

**Objectif :** sortir du "template SaaS dark glassmorphism" générique pour raconter **le métier** (courant, clé, acier, Paris) avec un ton éditorial premium mais pas froid.

**Une ligne :** *Un artisan-ingénieur. Précis, rapide, local.*

---

## 2. Palette

### Couleurs de marque (déjà dans Tailwind)

| Rôle | Token | Hex | Usage |
|---|---|---|---|
| **Primary** (courant/électricité) | `primary-500` / `primary-600` | `#3b82f6` / `#2563eb` | Électricité, bouton principal |
| **Electric** (courant cyan) | `electric-500` | `#0ea5e9` | Gradient partenaire de primary |
| **Accent** (or/urgence) | `accent-500` / `amber-400` | `#f59e0b` / `#fbbf24` | Urgence, contrôle d'accès, "en cours" |
| **Emerald** (sécurité serrurerie) | `emerald-500` / `teal-400` | `#10b981` / `#2dd4bf` | Serrurerie, ✅ sécurité |
| **Orange** (acier métallerie) | `orange-500` / `rose-500` | `#f97316` / `#f43f5e` | Métallerie, chaleur industrielle |
| **Violet** (accent premium) | `violet-500` | `#8b5cf6` | Touche éditoriale dans les veils |

### Gradients signature (à utiliser, pas à inventer)

- `gradient-text-living` — texte multi-couleur animé (hero, headings majeurs)
- `gradient-text-electric` — texte bleu/cyan/violet animé
- `gradient-veil` / `gradient-veil-warm` / `gradient-veil-cool` — voiles ambient (via `<GradientVeil variant="brand|warm|cool">`)
- `from-primary-500 to-electric-500` — boutons primaires, icônes électricité
- `from-accent-500 to-amber-400` — urgence / contrôle d'accès
- `from-emerald-500 to-teal-400` — serrurerie
- `from-orange-500 to-rose-500` — métallerie

**Règle :** une palette par métier. Jamais de gradient "arc-en-ciel" sur un seul composant.

---

## 3. Typographie

Déjà configurée — **à ne pas élargir**.

- **Display** : Space Grotesk (`--font-space-grotesk`) — titres, chiffres stats, labels SVG
- **Sans** : Outfit (`--font-outfit`) — corps de texte, boutons
- Chiffres : `tabular-nums` sur les compteurs stats (à ajouter)
- Guillemets FR : `« »` avec `&nbsp;` insécable (micro-typo à soigner)

À éviter : autre police, texte en italique décoratif, capitales gadgets.

---

## 4. Primitives ambient (Phase 3)

Tout dans `src/components/ui/ambient/`. À composer, pas à recréer.

| Primitive | Usage | Où l'employer |
|---|---|---|
| `<AuroraBackdrop intensity="soft\|strong">` | Conic ring rotatif + 4 orbes à la dérive + noise | Tous les heros sombres |
| `<GradientVeil variant="brand\|warm\|cool">` | Voile multi-radial animé | CTAs, overlays d'image |
| `<ParticlesLite variant="white\|brand">` | 5 couches de points qui dérivent | CTAs finaux uniquement |
| `<NoiseOverlay opacity={0.05}>` | Grain SVG, casse le banding des gradients | Partout où il y a un gradient lisse |
| `<Spotlight>` | Glow radial qui suit le curseur | Cartes hover |

**Règle de composition :** sur un hero sombre : Aurora + grid opacity 12% + NoiseOverlay. Sur un CTA final : Aurora animé + GradientVeil + Particles + grid + 2 orbes pulse + NoiseOverlay.

Respecte toujours `prefers-reduced-motion` (géré dans les primitives).

---

## 5. Features signature (Phase 3+)

### ✅ Livrées

1. **Plan IDF interactif** (`<InterventionMap>`) — SVG des communes IDF + pins pulsants + hover avec temps moyen d'intervention + pin orange "en cours" sur Clichy. C'est **le signature move** qui différencie S'Connect de tout autre artisan IDF. Sur la homepage uniquement.
2. **Avant / Après draggable** (`<BeforeAfterSlider>`) — sur les pages de détail réalisations qui ont `imageBefore` + `imageAfter`. Badge "Avant / Après" doré sur les cards liste pour signaler. 3 réalisations en démo pour l'instant.
3. **Certifications showcase** (`<CertificationsBand>`) — Qualifélec / RGE / IRVE / Décennale avec logos (si déposés dans `/public/images/certifications/`) ou fallback icône gradient par couleur.
4. **Brand chips fallback** (`<BrandChip>`) — Marquee partenaires avec HEAD-probe du logo puis chip texte si absent. Disclaimer légal inclus.

### 🟡 À scoper

- **SOS porte claquée** (géoloc + ETA Google Maps + SMS pré-rempli) — besoin d'une clé Google Maps + discussion budget
- **Configurateur de devis instantané** — 4-5 questions → fourchette de prix → prise de RDV. Haut effort, haut impact.
- **Schéma tableau électrique interactif** — SVG cliquable sur `/services/electricite/mise-aux-normes`. Pédagogique.
- **Carnet de chantier** — repurpose `/actualites` en feed d'interventions anonymisées (commune, photo, durée, prestation). SEO longue traîne.

### ❌ Rejetées (faible ROI vs effort)

- Curseur custom "arc électrique" — gadget qui ne convertit pas
- Interrupteur 3D en dark-mode toggle — trop cher à maintenir
- Texte "néon qui s'allume" — joli une fois, gênant à chaque visite

---

## 6. Imagerie

### Source
30 photos curated depuis Unsplash, optimisées en webp + jpg + blur placeholder, commitées dans `/public/images/`. Manifest typé dans `src/lib/image-manifest.ts`.

Catégories :
- `hero/` — 4 photos wide (électricien, serrurier, contrôle d'accès, portail)
- `services/` — 12 photos (3 par métier)
- `realisations/` — 8 photos de chantier
- `realisations-before/` — 3 photos "avant" pour le slider avant/après
- `zones/` — 3 photos (Paris, Clichy, IDF aérien)
- `team/` — 3 photos (technicien, équipe, véhicule)

### Quand le client livre son ZIP
Écraser les fichiers dans `/public/images/{category}/` avec les mêmes slugs. Le manifest + le code continuent de fonctionner sans modification. Regénérer les blur placeholders avec `npm run assets:fetch:force` — non, plus simple : écraser manuellement les fichiers, le build récupère automatiquement les dimensions.

### Règle critique
**Aucune image "skyline" qui n'est pas Paris / Île-de-France.** L'audit Phase 3 a attrapé un cliché NYC déguisé en Paris. Vérifier systématiquement avant de commit.

---

## 7. Prompts d'images (pour génération IA future)

Si le client ne peut pas fournir ses propres photos, voici la direction stylistique à donner à MidJourney / Flux / Imagen. Style commun en suffixe :

> `cinematic lighting, moody teal and electric blue color grade, subtle volumetric haze, shallow depth of field, photorealistic, editorial 35mm, Kodak Portra pushed, craftsman documentary aesthetic, no text, no logos`

### Prompts prioritaires

1. **Hero — artisan-ingénieur**
   > Close-up of a French electrician's hands installing a modern circuit breaker in a matte-black panel, tiny blue LED glow, faint sparks at 1/2000s, blurred Haussmann background.

2. **Serrurerie**
   > Macro shot of an A2P-certified lock cylinder being fitted into a reinforced steel door, precision tools on leather workbench, warm key-light on brushed metal, cold blue rim-light, black background with dust particles.

3. **Zone Paris (remplacer tout cliché NYC)**
   > Aerial drone shot of Paris and the Petite Couronne at blue hour, Eiffel Tower and La Défense visible, Seine reflecting lights, thousands of warm window lights across Haussmann rooftops and Clichy/Levallois/Neuilly.

4. **Métallerie**
   > Sparks-filled industrial workshop, metalworker forging a custom wrought-iron Parisian balcony railing, orange sparks arcing through cold blue ambient light, smoke volumes, dramatic chiaroscuro.

5. **CTA — geste de confiance**
   > Extreme close-up of a handshake between a worn leather work glove and a clean businesswoman's hand, in the doorway of a renovated Parisian apartment, warm sunlight from inside, blue tool bag blurred in foreground.

### Règle absolue
**Une seule esthétique sur le site.** Le style #1 (teal/electric-blue/dark/cinematic) domine. Si le client fournit des photos dans un style différent (flash direct, couleurs naturelles, etc.), on ne mélange pas : on re-grade toutes les photos dans la même LUT ou on ne les utilise pas.

---

## 8. Do / Don't

### ✅ Do
- Composer avec les primitives ambient existantes
- Utiliser `gradient-text-living` pour l'accent du titre hero de chaque page
- Thémer par métier (bleu élec / or accès / émeraude serrurerie / orange métallerie)
- Respecter `prefers-reduced-motion` partout
- Commit les images optimisées dans `/public/images/`
- `tabular-nums` sur tout compteur numérique
- Micro-typo FR : `&nbsp;` avant `:` `?` `!` `»`, guillemets français

### ❌ Don't
- Créer de nouvelles variantes de gradient "rainbow" ou mélanger 5+ couleurs
- Ajouter une 3e police
- Utiliser des icônes custom qui cassent la cohérence Lucide
- Laisser des images hotlinked Unsplash en runtime (tout passe par le manifest)
- Mélanger des photos stylisées éditoriales avec des photos flash naturelles sans regrading
- Ajouter des curseurs custom / effets de parallaxe sans raison métier
- Afficher une image skyline non-française sur une page "Zone d'intervention"
- Publier avec `01 23 45 67 89`, `contact@sconnect-france.fr`, ou toute autre placeholder

---

## 9. Stack confirmée

- **Framework :** Next.js 15 (App Router) + React 19
- **Style :** Tailwind + tailwindcss-animate + `@apply` sparingly in globals.css
- **Animations :** Framer Motion (pas GSAP pour l'instant — pas nécessaire)
- **Icons :** Lucide exclusively
- **Forms :** React Hook Form + Zod
- **Emails :** React Email + Resend
- **Data :** Supabase en prod, JSON en dev (adapter)
- **Monitoring :** Sentry (scaffolding OK)

**Non nécessaires (pour l'instant) :**
- Three.js / R3F → le Plan IDF est en SVG, moins cher et plus accessible
- GSAP / Lenis → Framer Motion + CSS smooth-scroll suffisent
- Rive → Lucide + framer-motion font le job
- Sanity / Payload → admin maison + Supabase OK

Si un jour on veut le **schéma tableau interactif 3D** ou le **SOS avec carte live**, on ajoutera R3F. Pas avant.
