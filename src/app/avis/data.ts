// Static testimonials + ratings data shared between the RSC page (Schema.org
// JSON-LD generation) and the client component that renders the filterable
// grid. Kept in its own module so the JSON-LD can be emitted server-side with
// the CSP nonce while the interactive UI stays in a client boundary.

export const FR_MONTHS: Record<string, string> = {
  janvier: "01",
  février: "02",
  fevrier: "02",
  mars: "03",
  avril: "04",
  mai: "05",
  juin: "06",
  juillet: "07",
  août: "08",
  aout: "08",
  septembre: "09",
  octobre: "10",
  novembre: "11",
  décembre: "12",
  decembre: "12",
};

export function parseReviewDate(input: string): string {
  const [monthRaw, yearRaw] = input.toLowerCase().split(" ");
  const month = FR_MONTHS[monthRaw];
  if (!month || !yearRaw) return new Date().toISOString().slice(0, 10);
  return `${yearRaw}-${month}-15`;
}

export const stats = {
  average: 4.9,
  total: 127,
  distribution: [
    { stars: 5, count: 112, percentage: 88 },
    { stars: 4, count: 11, percentage: 9 },
    { stars: 3, count: 3, percentage: 2 },
    { stars: 2, count: 1, percentage: 1 },
    { stars: 1, count: 0, percentage: 0 },
  ],
};

export type Testimonial = {
  id: number;
  name: string;
  rating: number;
  date: string;
  text: string;
  service: string;
  location: string;
  verified: boolean;
};

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Marie L.",
    rating: 5,
    date: "Novembre 2024",
    text: "Intervention rapide et efficace pour une panne générale en soirée. L'électricien était très professionnel et a pris le temps de m'expliquer le problème. Prix correct et travail propre. Je recommande vivement !",
    service: "Dépannage",
    location: "Clichy",
    verified: true,
  },
  {
    id: 2,
    name: "Jean-Pierre D.",
    rating: 5,
    date: "Novembre 2024",
    text: "Rénovation complète de l'électricité de notre appartement de 80m². Travail impeccable, respect des délais et équipe très sympathique. Le devis était clair et sans surprise. Le chantier a été laissé propre chaque soir.",
    service: "Rénovation",
    location: "Levallois-Perret",
    verified: true,
  },
  {
    id: 3,
    name: "Sophie M.",
    rating: 5,
    date: "Octobre 2024",
    text: "Mise aux normes de notre tableau électrique réalisée avec professionnalisme. Les techniciens ont été très pédagogues, m'expliquant chaque étape. Le chantier parfaitement propre à la fin et la conformité Consuel obtenue rapidement.",
    service: "Mise aux normes",
    location: "Neuilly-sur-Seine",
    verified: true,
  },
  {
    id: 4,
    name: "Restaurant Le Gourmet",
    rating: 5,
    date: "Octobre 2024",
    text: "S Connect France gère toute notre maintenance électrique depuis 3 ans. Réactivité exemplaire et interventions toujours de qualité. Ils comprennent les contraintes d'un restaurant et interviennent souvent tôt le matin. Un vrai partenaire de confiance.",
    service: "Maintenance",
    location: "Paris 17e",
    verified: true,
  },
  {
    id: 5,
    name: "Thomas R.",
    rating: 5,
    date: "Octobre 2024",
    text: "Installation d'une borne de recharge pour ma voiture électrique. Très bon conseil sur le choix du modèle, installation soignée et mise en service rapide. Le technicien m'a bien expliqué le fonctionnement. Parfait !",
    service: "Installation",
    location: "Saint-Cloud",
    verified: true,
  },
  {
    id: 6,
    name: "Copropriété Résidence Les Tilleuls",
    rating: 5,
    date: "Septembre 2024",
    text: "Refonte complète de l'éclairage des parties communes avec passage en LED. Travaux réalisés proprement, bon relationnel avec les copropriétaires et respect du planning. Les économies d'énergie sont déjà visibles !",
    service: "Rénovation",
    location: "Clichy",
    verified: true,
  },
  {
    id: 7,
    name: "Isabelle G.",
    rating: 4,
    date: "Septembre 2024",
    text: "Bonne intervention pour l'installation de notre système domotique. Le technicien était compétent. Petit retard le premier jour mais tout a été rattrapé. Résultat conforme à nos attentes.",
    service: "Domotique",
    location: "Boulogne",
    verified: true,
  },
  {
    id: 8,
    name: "Cabinet Médical Dr. Martin",
    rating: 5,
    date: "Août 2024",
    text: "Intervention pour mise en conformité de notre cabinet médical. Travaux réalisés avec soin et discrétion pour ne pas perturber les consultations. Équipe très professionnelle, je recommande pour les locaux professionnels.",
    service: "Mise aux normes",
    location: "Paris 16e",
    verified: true,
  },
  {
    id: 9,
    name: "Laurent B.",
    rating: 5,
    date: "Août 2024",
    text: "Dépannage en urgence un dimanche soir. L'électricien est arrivé en moins d'une heure et a résolu le problème rapidement. Certes le tarif dimanche est majoré, mais c'est normal et c'était indiqué au téléphone. Très satisfait.",
    service: "Dépannage",
    location: "Asnières",
    verified: true,
  },
  {
    id: 10,
    name: "Caroline F.",
    rating: 5,
    date: "Juillet 2024",
    text: "Installation complète de notre maison neuve. De la conception à la réalisation, tout a été parfait. L'équipe a su s'adapter à nos demandes de dernière minute. Le résultat est exactement ce que nous voulions.",
    service: "Installation",
    location: "Colombes",
    verified: true,
  },
  {
    id: 11,
    name: "Boutique Mode & Style",
    rating: 5,
    date: "Juillet 2024",
    text: "Rénovation électrique de notre boutique avec création d'un éclairage valorisant nos produits. Le rendu est superbe et nos clients le remarquent. Merci à l'équipe pour leurs conseils avisés !",
    service: "Rénovation",
    location: "Paris 9e",
    verified: true,
  },
  {
    id: 12,
    name: "Philippe M.",
    rating: 4,
    date: "Juin 2024",
    text: "Bonne prestation pour la rénovation du tableau électrique. Travail conforme au devis. Petit bémol sur la communication pendant les travaux mais le résultat final est là.",
    service: "Mise aux normes",
    location: "Puteaux",
    verified: true,
  },
];

export const filterOptions = [
  "Tous",
  "Dépannage",
  "Rénovation",
  "Installation",
  "Mise aux normes",
  "Domotique",
  "Maintenance",
];
