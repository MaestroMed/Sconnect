# Patchs de l'audit complet — 5 août 2026

Poussés via l'API GitHub car le push git de la session distante était HS.
Les commits déjà présents sur la branche (SETUP.sql sécurisé, migration 001,
suppressions des SQL legacy et composants morts) sont des VRAIS fichiers ;
ces patchs portent le reste des 68 fichiers modifiés de l'audit.

## Application (racine du repo, branche claude/audit-vitrine-website-rtQby à jour)

    git apply --check patches/audit-2026-08-05/part-*.patch
    git apply patches/audit-2026-08-05/part-*.patch
    npm install && npm audit fix
    npm run build && npx vitest run
    git rm -r patches/audit-2026-08-05
    git add -A && git commit -m "fix: audit complet — application des patchs (SEO canonicals, a11y formulaires, perf LCP, contenu)"

## Contenu (résumé)
- SEO : canonicals explicites sur 15 pages /services/**, canonicals devis/intervention/légales, titres dédoublonnés, noindex→follow, maillage voisines indexables, redirect /a-propos, autodiscovery RSS, ping Google retiré, générateurs JSON-LD d'avis supprimés.
- A11y/UX : DemandeForm lisible en dark mode + focus/autocomplete/CGV, /contact refait sur FormField, « Gérer les cookies » au footer, reduced-motion respecté.
- Perf : initial={false} sur les heros (LCP −0,5-0,9 s), animations plafonnées, sizes RealizationCard, cache assets 7 j + TTL images 31 j, chargeur GA legacy supprimé (NEXT_PUBLIC_GA4_ID seul).
- Contenu : témoignage factice retiré, RatingBadge sur avis réels, marque unifiée, chemins morts corrigés, .env.example à jour.
- Sécurité : upload par magic bytes + whitelist dossier, CSP sans unsafe-eval en prod.

## Reste à faire côté humain
1. Ré-exécuter supabase/SETUP.sql dans Supabase (fix RLS critique).
2. Faire valider les CGV par un juriste.
3. Trancher la cannibalisation hubs racine vs /services/**.
4. Fournir les logos manquants (6 marques, 4 certifications).
