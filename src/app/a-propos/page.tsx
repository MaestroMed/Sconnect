import { permanentRedirect } from "next/navigation";

/**
 * /a-propos est une URL attendue par les visiteurs et certains liens entrants,
 * mais le contenu « à propos » vit sur /presentation (fiche entreprise +
 * fondateur + histoire + zone). Plutôt que de dupliquer (thin content /
 * cannibalisation), on redirige en 308 permanent vers la page canonique.
 */
export default function AProposPage() {
  permanentRedirect("/presentation");
}
