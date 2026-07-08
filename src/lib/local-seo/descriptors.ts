import { Commune, deptNom } from "./communes";

// Helpers de formulation : transforment la donnée RÉELLE de chaque commune en
// phrases variées. C'est ce qui rend chaque page unique (population, distance,
// temps d'intervention, profil de parc réels) plutôt qu'un template à ville
// interchangeable.

const nf = new Intl.NumberFormat("fr-FR");

export const popText = (c: Commune) => `${nf.format(c.population)} habitants`;

export const distanceText = (c: Commune) =>
  c.distanceKm <= 1
    ? "juste à côté de notre atelier de Clichy"
    : `à ${String(c.distanceKm).replace(".", ",")} km de notre atelier de Clichy`;

export function interventionPhrase(c: Commune): string {
  return `une intervention estimée en ${c.interventionMin} minutes`;
}

export const deptText = (c: Commune) => `${deptNom(c.dept)} (${c.dept})`;

// Profil du parc immobilier → angle de contenu différent selon la commune.
export function parcText(c: Commune): string {
  switch (c.profile) {
    case "tertiaire-dense":
      return "un tissu très dense de bureaux, commerces et immeubles de standing";
    case "tertiaire":
      return "de nombreux bureaux, sièges d'entreprises et copropriétés récentes";
    case "mixte":
      return "un parc mixte : logements collectifs, commerces de proximité et locaux d'activité";
    case "residentiel":
    default:
      return "un habitat à dominante résidentielle (pavillons, petites copropriétés et commerces de centre-ville)";
  }
}

// Cible principale selon le profil (pour orienter le discours métier).
export function ciblePrincipale(c: Commune): string {
  switch (c.profile) {
    case "tertiaire-dense":
    case "tertiaire":
      return "les entreprises, syndics et gestionnaires de bureaux";
    case "mixte":
      return "les copropriétés, commerçants et particuliers";
    case "residentiel":
    default:
      return "les particuliers et petites copropriétés";
  }
}

export function tierText(c: Commune): string {
  switch (c.tier) {
    case "A":
      return "l'une des grandes villes d'Île-de-France";
    case "B":
      return "une commune importante du secteur";
    case "C":
      return "une commune à taille humaine";
    default:
      return "une commune de proximité";
  }
}

export const nearbyText = (c: Commune) =>
  c.nearby.map((n) => n.nom).join(", ");
