import { Commune } from "./communes";
import {
  popText,
  distanceText,
  interventionPhrase,
  parcText,
  ciblePrincipale,
  deptText,
} from "./descriptors";

export type Metier = "electricite" | "serrurerie" | "controle-acces" | "metallerie";
export type Intent = "urgence" | "projet";

export interface LocalService {
  key: string; // slug d'URL + nom de dossier de route
  metier: Metier;
  intent: Intent;
  nom: string; // libellé affiché du service, ex. "Relamping LED"
  nomMetier: string; // le professionnel, ex. "serrurier", "électricien"
  schemaType: string; // type schema.org
  image: string; // image RÉUTILISÉE (même URL sur toutes les communes → cache crawl)
  accroche: string;
  prestations: string[];
  points: string[]; // expertise technique réelle
  relatedKeys: string[];
  ctaLabel: string;
  infoDelai: string;
  infoPrix: string;
  /** Page /services/** équivalente (le pilier commercial). ANTI-CANNIBALISATION :
   *  le hub /[service] est un ANNUAIRE de communes qui renvoie vers cette page
   *  pour le contenu commercial — les deux ne doivent pas viser la même requête. */
  servicePage: string;
  /** Communes dont la requête « service + ville » est déjà couverte par une
   *  page artisanale /services/** (cluster relamping) : la page usine pose un
   *  canonical vers elle et tous les liens internes (hub, communes voisines,
   *  autres services) pointent directement sur la page artisanale. */
  handcrafted?: Record<string, string>;
  /** Alt text UNIQUE par page (jamais la même chaîne d'une commune à l'autre). */
  imageAlt: (c: Commune) => string;
  /** Paragraphe d'intro différencié par les données réelles de la commune. */
  intro: (c: Commune) => string;
  /** FAQ mêlant réponses métier + données locales (distance, temps, parc). */
  faq: (c: Commune) => { q: string; a: string }[];
}

/** URL locale d'un couple service × commune, en tenant compte des pages
 *  artisanales : si la ville a sa page /services/**, c'est ELLE qu'on lie. */
export const localHref = (s: LocalService, slug: string) =>
  s.handcrafted?.[slug] ?? `/${s.key}/${slug}`;

const IMG = "/images/services";

export const SERVICES: LocalService[] = [
  {
    key: "relamping-led",
    servicePage: "/services/electricite/relamping",
    handcrafted: {
      "paris": "/services/electricite/relamping/paris",
      "boulogne-billancourt": "/services/electricite/relamping/boulogne-billancourt",
      "clichy": "/services/electricite/relamping/clichy",
      "courbevoie": "/services/electricite/relamping/courbevoie",
      "issy-les-moulineaux": "/services/electricite/relamping/issy-les-moulineaux",
      "levallois-perret": "/services/electricite/relamping/levallois-perret",
      "nanterre": "/services/electricite/relamping/nanterre",
      "neuilly-sur-seine": "/services/electricite/relamping/neuilly-sur-seine",
      "puteaux": "/services/electricite/relamping/puteaux",
      "saint-denis": "/services/electricite/relamping/saint-denis",
      "asnieres-sur-seine": "/services/electricite/relamping/asnieres-sur-seine",
    },
    metier: "electricite",
    intent: "projet",
    nom: "Relamping LED",
    nomMetier: "spécialiste du relamping LED",
    schemaType: "Electrician",
    image: `${IMG}/relamping-bureau.webp`,
    accroche: "Divisez par 3 à 6 votre facture d'éclairage — audit gratuit, ROI chiffré.",
    prestations: [
      "Audit éclairage sur site + étude photométrique (Dialux)",
      "Remplacement des sources vétustes par des luminaires LED pro (IRC ≥ 80/90, UGR ≤ 19)",
      "Gestion intelligente : détection de présence, gradation, DALI",
      "Mise en conformité décret tertiaire (DEET 2030) et éclairage de sécurité (BAES)",
      "Recyclage des anciennes sources + attestation",
    ],
    points: [
      "ROI porté par la seule économie d'énergie (les primes CEE éclairage sont supprimées depuis février 2026)",
      "−60 à −80 % de consommation sur le poste éclairage",
      "Chantier en horaires décalés, zéro coupure d'activité",
    ],
    relatedKeys: ["electricien", "mise-aux-normes-electrique", "borne-recharge-irve"],
    ctaLabel: "Demander un audit relamping gratuit",
    infoDelai: "Audit sous 7 jours, chantier planifié selon le parc",
    infoPrix: "Devis gratuit — ROI généralement 2 à 4 ans",
    imageAlt: (c) => `Relamping LED de bureaux et copropriétés à ${c.nom} (${c.cp}) par S Connect`,
    intro: (c) =>
      `À ${c.nom}, ${parcText(c)} : autant de bâtiments dont l'éclairage pèse lourd sur les charges et la consommation. S Connect intervient sur toute la commune (${c.cp}, ${deptText(c)}) pour auditer votre parc, chiffrer le retour sur investissement et remplacer vos sources vétustes (halogène, fluo, tubes T5/T8) par de la LED professionnelle. Basés ${distanceText(c)}, nous ciblons en priorité ${ciblePrincipale(c)}.`,
    faq: (c) => [
      {
        q: `Le relamping LED est-il rentable à ${c.nom} sans les primes CEE ?`,
        a: `Oui. Depuis la suppression des fiches CEE éclairage en février 2026, le ROI repose sur l'économie d'énergie — elle suffit : 2 à 4 ans en tertiaire, souvent moins en usage intensif (parking, commerce ouvert 7j/7). On chiffre tout à l'euro près dans l'audit gratuit.`,
      },
      {
        q: `Intervenez-vous vite à ${c.nom} ?`,
        a: `Notre atelier est à Clichy, ${distanceText(c)} : pour un audit ou une visite technique à ${c.nom}, comptez ${interventionPhrase(c)}. Le chantier lui-même se planifie en horaires décalés pour ne pas perturber votre activité.`,
      },
      {
        q: `Gérez-vous la conformité décret tertiaire à ${c.nom} ?`,
        a: `Oui. Pour les bâtiments de plus de 1 000 m², le relamping + gestion (détection, gradation) est le levier n°1 de la trajectoire DEET 2030. On fournit les données injectables dans la déclaration OPERAT.`,
      },
    ],
  },
  {
    key: "electricien",
    servicePage: "/services/electricite",
    metier: "electricite",
    intent: "urgence",
    nom: "Électricien",
    nomMetier: "électricien",
    schemaType: "Electrician",
    image: `${IMG}/electricite-installation.webp`,
    accroche: "Dépannage, installation et rénovation électrique — urgences 24h/24.",
    prestations: [
      "Dépannage électrique urgent (panne, court-circuit, disjoncteur qui saute)",
      "Installation et rénovation complète (tableau, circuits, prises, éclairage)",
      "Recherche de panne et remise en sécurité",
      "Certificat de conformité Consuel pour les gros chantiers",
    ],
    points: [
      "Interventions conformes NF C 15-100",
      "Devis annoncé = facture finale, pas de surprise",
      "Électricien qualifié, RC pro et décennale",
    ],
    relatedKeys: ["mise-aux-normes-electrique", "relamping-led", "borne-recharge-irve"],
    ctaLabel: "Appeler un électricien",
    infoDelai: "Urgences 24h/24, RDV standard sous 24-48 h",
    infoPrix: "Devis gratuit, tarif annoncé avant intervention",
    imageAlt: (c) => `Électricien à ${c.nom} (${c.cp}) — dépannage et installation par S Connect`,
    intro: (c) =>
      `Besoin d'un électricien à ${c.nom} ? Panne, tableau vétuste, mise en sécurité, rénovation : S Connect intervient sur toute la commune (${popText(c)}, ${deptText(c)}) pour les particuliers comme pour ${ciblePrincipale(c)}. Basés ${distanceText(c)}, nous assurons ${interventionPhrase(c)} pour les urgences, et un devis clair et ferme pour les projets.`,
    faq: (c) => [
      {
        q: `Combien de temps pour une intervention électrique à ${c.nom} ?`,
        a: `Depuis notre atelier de Clichy, ${distanceText(c)}, on vise ${interventionPhrase(c)} sur une urgence électrique à ${c.nom}. Appelez-nous, on vous donne un créneau ferme.`,
      },
      {
        q: `Mon disjoncteur saute sans arrêt à ${c.nom}, que faire ?`,
        a: `C'est souvent une surcharge, un défaut d'isolement ou un appareil défectueux. On fait un diagnostic (mégohmmètre si besoin) et on remet en sécurité. Ne rebranchez pas en boucle : un défaut d'isolement peut être dangereux.`,
      },
      {
        q: `Faites-vous les mises aux normes à ${c.nom} ?`,
        a: `Oui, tableau, mise à la terre, différentiels 30 mA, conformité NF C 15-100 et attestation Consuel pour les chantiers qui l'exigent.`,
      },
    ],
  },
  {
    key: "mise-aux-normes-electrique",
    servicePage: "/services/electricite/mise-aux-normes",
    metier: "electricite",
    intent: "projet",
    nom: "Mise aux normes électrique",
    nomMetier: "électricien certifié",
    schemaType: "Electrician",
    image: `${IMG}/electricite-depannage.webp`,
    accroche: "Tableau, terre, différentiels 30 mA — conformité NF C 15-100.",
    prestations: [
      "Diagnostic de l'installation existante (tableau, terre, différentiels)",
      "Remplacement de tableau vétuste (fusibles, absence de différentiel)",
      "Mise à la terre et liaisons équipotentielles",
      "Attestation de conformité Consuel",
    ],
    points: [
      "Priorité au bloquant sécurité (terre, différentiel 30 mA)",
      "Pré-équipement IRVE anticipé si rénovation de parking",
      "Devis distinguant sécurité et confort/évolutivité",
    ],
    relatedKeys: ["electricien", "borne-recharge-irve", "relamping-led"],
    ctaLabel: "Demander un diagnostic",
    infoDelai: "Diagnostic sur site sous 48-72 h",
    infoPrix: "Diagnostic ~120-200 €, devis détaillé après visite",
    imageAlt: (c) => `Mise aux normes électriques NF C 15-100 à ${c.nom} (${c.cp}) — S Connect`,
    intro: (c) =>
      `Vente, location, sinistre ou disjoncteurs capricieux : la mise aux normes électriques d'un bien à ${c.nom} (${deptText(c)}) sécurise les personnes et valorise le logement. S Connect diagnostique votre installation, priorise le bloquant sécurité (terre, différentiel 30 mA, tableau) et vous remet un devis clair. Atelier ${distanceText(c)}.`,
    faq: (c) => [
      {
        q: `La norme NF C 15-100 est-elle rétroactive à ${c.nom} ?`,
        a: `Non : une installation conforme à sa date n'est pas à refaire à chaque évolution. Mais des travaux importants, un diagnostic révélant un risque, ou une vente/location peuvent l'imposer sur les parties concernées.`,
      },
      {
        q: `Combien coûte une mise aux normes à ${c.nom} ?`,
        a: `Un diagnostic tourne autour de 120-200 €. La mise en conformité va de quelques centaines d'euros (différentiel, terre) à 3 000-8 000 € pour un appartement ancien complet. On chiffre après visite sur place.`,
      },
    ],
  },
  {
    key: "borne-recharge-irve",
    servicePage: "/services/electricite/borne-irve",
    metier: "electricite",
    intent: "projet",
    nom: "Borne de recharge IRVE",
    nomMetier: "installateur IRVE",
    schemaType: "Electrician",
    image: `${IMG}/electricite-borne-irve.webp`,
    accroche: "Installation de bornes de recharge — prime ADVENIR, maison & copropriété.",
    prestations: [
      "Installation de borne de recharge (maison, copropriété, tertiaire)",
      "Étude de puissance et raccordement sécurisé (différentiel type A/F)",
      "Dossier prime ADVENIR géré de A à Z",
      "Droit à la prise en copropriété",
    ],
    points: [
      "Installateur qualifié IRVE (obligatoire au-delà de 3,7 kW)",
      "Prime ADVENIR toujours active (mobilité électrique)",
      "Conforme NF C 15-100 et sécurité incendie",
    ],
    relatedKeys: ["electricien", "mise-aux-normes-electrique", "controle-acces"],
    ctaLabel: "Étudier mon projet de borne",
    infoDelai: "Étude sous 7 jours, pose en 1 journée en général",
    infoPrix: "Devis gratuit — prime ADVENIR déduite",
    imageAlt: (c) => `Installation de borne de recharge voiture électrique à ${c.nom} (${c.cp}) — S Connect`,
    intro: (c) =>
      `Vous roulez à l'électrique à ${c.nom} ? S Connect installe votre borne de recharge (maison, parking de copropriété, flotte d'entreprise) sur toute la commune (${deptText(c)}). Installateur qualifié IRVE, on gère l'étude de puissance, le raccordement sécurisé et le dossier de prime ADVENIR. Atelier ${distanceText(c)}.`,
    faq: (c) => [
      {
        q: `Puis-je installer une borne en copropriété à ${c.nom} ?`,
        a: `Oui, grâce au « droit à la prise » : tout résident peut demander l'installation à ses frais sur sa place. On accompagne aussi le syndic pour une solution collective. Dossier ADVENIR inclus.`,
      },
      {
        q: `La prime ADVENIR existe-t-elle encore en 2026 à ${c.nom} ?`,
        a: `Oui — contrairement aux CEE éclairage, ADVENIR (dédiée à la recharge) reste active. Montants selon le cas (maison, copropriété résidentielle, tertiaire par point de charge). On instruit le dossier à votre place.`,
      },
    ],
  },
  {
    key: "serrurier",
    servicePage: "/services/serrurerie",
    metier: "serrurerie",
    intent: "urgence",
    nom: "Serrurier",
    nomMetier: "serrurier",
    schemaType: "Locksmith",
    image: `${IMG}/serrurerie-ouverture.webp`,
    accroche: "Ouverture de porte, dépannage serrure — intervention rapide, tarif annoncé.",
    prestations: [
      "Ouverture de porte claquée ou verrouillée (sans dégât si possible)",
      "Dépannage et remplacement de serrure toutes marques",
      "Mise en sécurité après effraction",
      "Blindage et renforcement de porte",
    ],
    points: [
      "Tarif annoncé au téléphone = facture finale",
      "Techniques non destructives en priorité",
      "Serrurier de proximité, pas de démarchage abusif",
    ],
    relatedKeys: ["ouverture-porte", "changement-serrure", "blindage-porte"],
    ctaLabel: "Appeler un serrurier",
    infoDelai: "Urgences 24h/24",
    infoPrix: "Tarif annoncé avant déplacement, devis gratuit",
    imageAlt: (c) => `Serrurier à ${c.nom} (${c.cp}) — ouverture de porte et dépannage par S Connect`,
    intro: (c) =>
      `Porte claquée, serrure bloquée, cambriolage à ${c.nom} ? S Connect, serrurier de proximité (atelier ${distanceText(c)}), intervient sur toute la commune (${popText(c)}, ${deptText(c)}). On privilégie l'ouverture non destructive, on annonce le tarif avant de se déplacer, et on sécurise votre porte le jour même si besoin.`,
    faq: (c) => [
      {
        q: `En combien de temps un serrurier arrive-t-il à ${c.nom} ?`,
        a: `Depuis Clichy, ${distanceText(c)}, on vise ${interventionPhrase(c)} sur une urgence à ${c.nom}. On vous confirme le créneau et le tarif au téléphone avant de partir.`,
      },
      {
        q: `Combien coûte une ouverture de porte à ${c.nom} ?`,
        a: `Ça dépend du type de porte et de serrure (claquée vs verrouillée, blindée ou non). On annonce toujours le prix au téléphone, sans surprise sur la facture — méfiez-vous des serruriers qui refusent de chiffrer avant.`,
      },
      {
        q: `Ma porte est-elle réparable sans tout changer à ${c.nom} ?`,
        a: `Souvent oui : une porte claquée s'ouvre sans dégât, une serrure grippée se répare. On ne remplace que si c'est nécessaire, et on vous l'explique.`,
      },
    ],
  },
  {
    key: "ouverture-porte",
    servicePage: "/services/serrurerie/ouverture-porte",
    metier: "serrurerie",
    intent: "urgence",
    nom: "Ouverture de porte",
    nomMetier: "serrurier",
    schemaType: "Locksmith",
    image: `${IMG}/serrurerie-ouverture.webp`,
    accroche: "Porte claquée ou verrouillée ? Ouverture rapide, sans dégât si possible.",
    prestations: [
      "Ouverture de porte claquée (technique non destructive)",
      "Ouverture de porte verrouillée à double tour",
      "Ouverture de porte blindée",
      "Remplacement de serrure si nécessaire après ouverture",
    ],
    points: [
      "Non destructif en priorité (pas de perçage inutile)",
      "Tarif annoncé avant déplacement",
      "Disponible en urgence",
    ],
    relatedKeys: ["serrurier", "changement-serrure", "blindage-porte"],
    ctaLabel: "Faire ouvrir ma porte",
    infoDelai: "Urgences 24h/24",
    infoPrix: "Tarif annoncé au téléphone",
    imageAlt: (c) => `Ouverture de porte claquée à ${c.nom} (${c.cp}) — serrurier S Connect`,
    intro: (c) =>
      `Enfermé dehors à ${c.nom} ? Porte claquée, clé perdue, serrure bloquée : S Connect ouvre votre porte, en privilégiant les techniques non destructives (pas de perçage inutile). Atelier ${distanceText(c)}, ${interventionPhrase(c)} sur la commune (${deptText(c)}). Tarif annoncé avant de partir.`,
    faq: (c) => [
      {
        q: `Une porte claquée s'ouvre-t-elle sans dégât à ${c.nom} ?`,
        a: `Dans la grande majorité des cas oui : une porte simplement claquée (pas verrouillée) s'ouvre par radiographie/carte sans abîmer la serrure. Pour une porte verrouillée ou blindée, la technique diffère mais reste la moins destructive possible.`,
      },
      {
        q: `Quel délai pour ouvrir ma porte à ${c.nom} ?`,
        a: `Depuis Clichy, ${distanceText(c)}, comptez ${interventionPhrase(c)}. On confirme le créneau et le prix par téléphone.`,
      },
    ],
  },
  {
    key: "blindage-porte",
    servicePage: "/services/serrurerie/blindage-porte",
    metier: "serrurerie",
    intent: "projet",
    nom: "Blindage de porte",
    nomMetier: "spécialiste du blindage",
    schemaType: "Locksmith",
    image: `${IMG}/serrurerie-blindage.webp`,
    accroche: "Blindage de porte certifié A2P — protégez votre logement efficacement.",
    prestations: [
      "Blindage de porte existante (tôle acier + serrure multipoints)",
      "Bloc-porte blindé certifié A2P",
      "Serrure A2P 3 à 7 points + cylindre certifié + protecteur",
      "Renforcement des gâches et du bâti",
    ],
    points: [
      "Certification A2P BP1/BP2/BP3 selon le niveau de risque",
      "Cylindre A2P étoiles + protecteur anti-arrachement",
      "Conseil assurance (niveau A2P souvent exigé)",
    ],
    relatedKeys: ["changement-serrure", "serrurier", "controle-acces"],
    ctaLabel: "Demander un devis blindage",
    infoDelai: "Devis sous 48 h, pose en 1 journée",
    infoPrix: "Devis gratuit selon niveau A2P",
    imageAlt: (c) => `Blindage de porte certifié A2P à ${c.nom} (${c.cp}) — S Connect`,
    intro: (c) =>
      `À ${c.nom} (${deptText(c)}), sécuriser sa porte d'entrée passe par un blindage certifié A2P — la porte, la serrure multipoints, le cylindre et l'ancrage forment une chaîne : le maillon faible décide du niveau réel. S Connect (atelier ${distanceText(c)}) conseille le bon niveau (BP1/BP2/BP3) selon le risque et les exigences de votre assurance.`,
    faq: (c) => [
      {
        q: `Quel niveau de blindage à ${c.nom} ?`,
        a: `En zone urbaine dense, l'A2P BP2 (résistance ~10 min) est le bon compromis ; BP3 pour un bien exposé. Vérifiez surtout l'exigence de votre contrat d'assurance — beaucoup imposent un niveau A2P pour couvrir le vol.`,
      },
      {
        q: `Blindage complet ou simple serrure renforcée à ${c.nom} ?`,
        a: `Si la porte est saine, une serrure A2P bien posée + protecteur de cylindre suffit souvent. Si la porte est ancienne/fragile, le blindage (tôle + serrure + gâches) se justifie. On tranche après diagnostic sur place.`,
      },
    ],
  },
  {
    key: "changement-serrure",
    servicePage: "/services/serrurerie/remplacement-serrure",
    metier: "serrurerie",
    intent: "projet",
    nom: "Changement de serrure",
    nomMetier: "serrurier",
    schemaType: "Locksmith",
    image: `${IMG}/serrurerie-serrure.webp`,
    accroche: "Remplacement de serrure toutes marques — A2P, multipoints, cylindre.",
    prestations: [
      "Remplacement de serrure toutes marques (Fichet, Picard, Vachette…)",
      "Passage en serrure multipoints A2P",
      "Changement de cylindre après perte de clé ou déménagement",
      "Reproduction et organigramme de clés",
    ],
    points: [
      "Cylindre A2P étoiles anti-crochetage/perçage/bumping",
      "Marques certifiées, pas de serrure no-name",
      "Conseil selon usage et budget",
    ],
    relatedKeys: ["serrurier", "blindage-porte", "ouverture-porte"],
    ctaLabel: "Changer ma serrure",
    infoDelai: "Souvent le jour même",
    infoPrix: "Devis annoncé, matériel certifié",
    imageAlt: (c) => `Changement de serrure certifiée A2P à ${c.nom} (${c.cp}) — S Connect`,
    intro: (c) =>
      `Emménagement, perte de clé, serrure usée à ${c.nom} ? S Connect remplace votre serrure toutes marques et vous conseille le bon niveau A2P (cylindre certifié anti-crochetage, multipoints si besoin). Atelier ${distanceText(c)}, intervention souvent le jour même sur la commune (${deptText(c)}).`,
    faq: (c) => [
      {
        q: `Faut-il changer toute la serrure ou juste le cylindre à ${c.nom} ?`,
        a: `Après une perte de clé ou un déménagement, changer le cylindre (le barillet) suffit souvent et coûte moins cher. Si la mécanique est usée ou peu sûre, on remplace la serrure complète. On vous conseille selon le cas.`,
      },
      {
        q: `Quelle marque de serrure choisir à ${c.nom} ?`,
        a: `On pose des marques certifiées A2P (Fichet, Picard, Vachette…) avec cylindre A2P étoiles. On évite les serrures no-name : le cylindre est la cible n°1 d'un cambrioleur.`,
      },
    ],
  },
  {
    key: "interphonie",
    servicePage: "/services/controle-acces/interphonie-videophonie",
    metier: "controle-acces",
    intent: "projet",
    nom: "Interphonie & vidéophonie",
    nomMetier: "installateur d'interphonie",
    schemaType: "HomeAndConstructionBusiness",
    image: `${IMG}/acces-interphone.webp`,
    accroche: "Interphone et vidéophone connectés pour copropriétés et maisons.",
    prestations: [
      "Installation et remplacement d'interphone / vidéophone",
      "Systèmes connectés (appel renvoyé sur smartphone)",
      "Platines de rue IP pour copropriétés",
      "Réutilisation du câblage 2 fils existant quand c'est possible",
    ],
    points: [
      "Solutions filaires IP fiables (pas de portée à gérer)",
      "Conformité RGPD (caméra à l'appel, conservation limitée)",
      "Déploiement phasé sans couper l'accès",
    ],
    relatedKeys: ["controle-acces", "serrurier", "electricien"],
    ctaLabel: "Étudier mon interphone",
    infoDelai: "Audit gratuit, pose selon la copropriété",
    infoPrix: "Devis gratuit — dossier AG fourni",
    imageAlt: (c) => `Installation d'interphone et vidéophone connecté à ${c.nom} (${c.cp}) — S Connect`,
    intro: (c) =>
      `À ${c.nom} (${deptText(c)}), avec ${parcText(c)}, l'interphonie connectée transforme le confort et la sécurité des accès. S Connect installe et remplace interphones et vidéophones (appel renvoyé sur smartphone, platines IP) pour ${ciblePrincipale(c)}, en réutilisant le câblage existant quand c'est possible. Atelier ${distanceText(c)}.`,
    faq: (c) => [
      {
        q: `Peut-on garder le câblage existant à ${c.nom} ?`,
        a: `Souvent oui : un convertisseur en tête de colonne permet de réutiliser le bus 2 fils existant, ce qui évite de retirer les colonnes. Un audit le confirme au cas par cas.`,
      },
      {
        q: `La vidéophonie est-elle conforme RGPD à ${c.nom} ?`,
        a: `Oui si elle est bien conçue : caméra déclenchée à l'appel, conservation limitée, information des résidents. La reconnaissance faciale et la vidéo permanente sont, elles, très encadrées par la CNIL.`,
      },
    ],
  },
  {
    key: "controle-acces",
    servicePage: "/services/controle-acces",
    metier: "controle-acces",
    intent: "projet",
    nom: "Contrôle d'accès (badges & digicodes)",
    nomMetier: "installateur de contrôle d'accès",
    schemaType: "HomeAndConstructionBusiness",
    image: `${IMG}/acces-badge.webp`,
    accroche: "Badges, digicodes, gâches électriques — sécurisez vos accès.",
    prestations: [
      "Installation de badges RFID et digicodes",
      "Gâches et ventouses électriques",
      "Gestion des accès multi-portes (entreprises, copropriétés)",
      "Motorisation de portail couplée au contrôle d'accès",
    ],
    points: [
      "Solutions évolutives (ajout de badges, révocation)",
      "Sécurisation des communs de copropriété",
      "Intégration avec interphonie et vidéosurveillance",
    ],
    relatedKeys: ["interphonie", "portail-metallique", "serrurier"],
    ctaLabel: "Sécuriser mes accès",
    infoDelai: "Audit gratuit sur site",
    infoPrix: "Devis gratuit selon nombre d'accès",
    imageAlt: (c) => `Contrôle d'accès badges et digicodes à ${c.nom} (${c.cp}) — S Connect`,
    intro: (c) =>
      `Sécuriser les accès d'un immeuble, d'un local ou d'une entreprise à ${c.nom} (${deptText(c)}) : badges RFID, digicodes, gâches électriques, gestion multi-portes. S Connect conçoit des solutions évolutives pour ${ciblePrincipale(c)}, couplées à l'interphonie et à la motorisation de portail si besoin. Atelier ${distanceText(c)}.`,
    faq: (c) => [
      {
        q: `Peut-on gérer plusieurs portes à ${c.nom} ?`,
        a: `Oui, un système multi-portes centralise les droits d'accès (badges, horaires), avec ajout et révocation à la volée — idéal pour une copropriété ou une entreprise.`,
      },
      {
        q: `Le contrôle d'accès s'intègre-t-il à l'interphone à ${c.nom} ?`,
        a: `Oui, on couple badges/digicodes, interphonie et motorisation de portail dans un ensemble cohérent, pensé dès la conception.`,
      },
    ],
  },
  {
    key: "portail-metallique",
    servicePage: "/services/metallerie/fabrication-portail",
    metier: "metallerie",
    intent: "projet",
    nom: "Portail & motorisation",
    nomMetier: "métallier",
    schemaType: "HomeAndConstructionBusiness",
    image: `${IMG}/metallerie-portail.webp`,
    accroche: "Portail sur mesure et motorisation — battant, coulissant, sécurisé.",
    prestations: [
      "Fabrication de portail métallique sur mesure",
      "Motorisation (à bras, à vérins, enterrée, coulissante)",
      "Dispositifs de sécurité obligatoires (cellules, détection d'obstacle)",
      "Couplage avec contrôle d'accès (télécommande, badge, digicode)",
    ],
    points: [
      "Motorisation adaptée au poids et au dégagement (norme EN 13241)",
      "Sécurité anti-écrasement systématique",
      "Fabrication atelier, finition pro",
    ],
    relatedKeys: ["controle-acces", "garde-corps", "interphonie"],
    ctaLabel: "Demander un devis portail",
    infoDelai: "Étude + fabrication sur mesure",
    infoPrix: "Devis gratuit selon dimensions",
    imageAlt: (c) => `Fabrication et motorisation de portail sur mesure à ${c.nom} (${c.cp}) — S Connect`,
    intro: (c) =>
      `Un portail sur mesure à ${c.nom} (${deptText(c)}) : S Connect, métallier, fabrique et motorise votre portail (battant ou coulissant) selon votre entrée, votre dégagement et le poids des vantaux. On installe systématiquement les sécurités anti-écrasement obligatoires et on couple au contrôle d'accès si vous le souhaitez. Atelier ${distanceText(c)}.`,
    faq: (c) => [
      {
        q: `Quelle motorisation de portail à ${c.nom} ?`,
        a: `S'il manque de recul devant le portail, on part sur du coulissant. Sinon, battant à bras (piliers larges) ou à vérins (vantaux lourds). On choisit selon votre configuration exacte.`,
      },
      {
        q: `Les sécurités sont-elles obligatoires à ${c.nom} ?`,
        a: `Oui. Un portail motorisé est une machine : cellules photoélectriques, détection d'obstacle et déverrouillage manuel sont obligatoires. On ne livre jamais sans.`,
      },
    ],
  },
  {
    key: "garde-corps",
    servicePage: "/services/metallerie/structure-metallique",
    metier: "metallerie",
    intent: "projet",
    nom: "Garde-corps & métallerie",
    nomMetier: "métallier",
    schemaType: "HomeAndConstructionBusiness",
    image: `${IMG}/metallerie-garde-corps.webp`,
    accroche: "Garde-corps, rampes, ouvrages métalliques sur mesure aux normes.",
    prestations: [
      "Garde-corps métallique sur mesure (acier, inox, verre)",
      "Rampes d'escalier et mains courantes",
      "Grilles de défense et barreaudage",
      "Petits ouvrages et structures métalliques",
    ],
    points: [
      "Conforme NF P01-012 (hauteur 1 m, écartement ≤ 11 cm)",
      "Résistance calculée selon l'usage (habitation, ERP)",
      "Fabrication sur mesure, finition soignée",
    ],
    relatedKeys: ["portail-metallique", "controle-acces", "blindage-porte"],
    ctaLabel: "Demander un devis métallerie",
    infoDelai: "Métré + fabrication sur mesure",
    infoPrix: "Devis gratuit après métré",
    imageAlt: (c) => `Garde-corps et ouvrages métalliques sur mesure à ${c.nom} (${c.cp}) — S Connect`,
    intro: (c) =>
      `Garde-corps, rampe, grille ou ouvrage métallique sur mesure à ${c.nom} (${deptText(c)}) : S Connect, métallier, fabrique en atelier (${distanceText(c)}) et pose des ouvrages conformes à la norme NF P01-012 (hauteur, écartement, résistance calculée selon l'usage). Acier, inox ou verre selon votre projet et votre budget.`,
    faq: (c) => [
      {
        q: `Un garde-corps doit-il respecter une norme à ${c.nom} ?`,
        a: `Oui : NF P01-012 impose 1 m de hauteur, un écartement des barreaux ≤ 11 cm et une zone basse pleine. La résistance (NF P01-013) dépend de l'affluence — plus élevée en ERP qu'en habitation.`,
      },
      {
        q: `Acier, inox ou verre à ${c.nom} ?`,
        a: `L'acier pour la robustesse et le prix, l'inox pour l'extérieur sans entretien, le verre (feuilleté) pour l'esthétique. On conseille selon l'exposition et le style recherché.`,
      },
    ],
  },
];

export const SERVICE_BY_KEY = new Map(SERVICES.map((s) => [s.key, s]));
export const getService = (key: string) => SERVICE_BY_KEY.get(key);
export function requireService(key: string): LocalService {
  const s = SERVICE_BY_KEY.get(key);
  if (!s) throw new Error(`Service local inconnu: ${key}`);
  return s;
}
export const SERVICE_KEYS = SERVICES.map((s) => s.key);
