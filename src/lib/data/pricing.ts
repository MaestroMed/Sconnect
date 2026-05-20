/**
 * Centralised pricing reference for every transparent-pricing block.
 *
 * Why a single source: the previous version inlined the items[] array in
 * each page.tsx → modifying a tariff meant editing JSX, no audit trail,
 * no easy cross-page consistency check. Here, every tariff lives in one
 * shape, with a single disclaimer template per vertical, and pages just
 * pull what they need.
 *
 * Conventions:
 * - All `fromPrice` values are EUR TTC, base reference (no night premium).
 * - Sub-page entries are keyed by the URL slug so the page can do
 *   `getPricing("serrurerie/ouverture-porte")` without ambiguity.
 * - Add a new tariff: drop an entry, that's it. The PricingTable
 *   component renders it the same way everywhere.
 */

export interface PriceItem {
  label: string;
  fromPrice: number;
  note?: string;
  includes?: string[];
}

export interface PricingBlock {
  title: string;
  subtitle: string;
  disclaimer: string;
  items: PriceItem[];
}

const STANDARD_DISCLAIMER =
  "Tarifs TTC indicatifs en horaires ouvrés (8h-19h Lun-Ven, 9h-17h Sam). Majoration nuit (22h-6h) +50 %, dimanche/jour férié +50 %. Devis ferme et gratuit communiqué après diagnostic. Garantie décennale sur tous travaux.";

const STANDARD_SUBTITLE =
  "Fourchettes à partir de — basées sur nos chantiers récents en Île-de-France. Devis ferme gratuit après diagnostic téléphonique ou sur place.";

export const PRICING: Record<string, PricingBlock> = {
  // ─── SERRURERIE ───────────────────────────────────────────────────
  serrurerie: {
    title: "Combien coûte une intervention serrurerie ?",
    subtitle: STANDARD_SUBTITLE,
    disclaimer: STANDARD_DISCLAIMER,
    items: [
      {
        label: "Ouverture de porte simple",
        fromPrice: 89,
        note: "Porte claquée, en horaires 8h-19h",
        includes: ["Déplacement inclus IDF", "Sans dégât (méthode non destructive)", "Diagnostic offert"],
      },
      {
        label: "Ouverture porte blindée",
        fromPrice: 250,
        note: "Serrure 3 à 5 points, A2P",
        includes: ["Méthode non destructive si possible", "Si destruction : matériel de remplacement à coût"],
      },
      {
        label: "Remplacement de serrure standard",
        fromPrice: 180,
        note: "Cylindre + main d'œuvre",
        includes: ["Cylindre européen entrée de gamme", "Pose et calibrage", "Remise de 2 clés minimum"],
      },
      {
        label: "Remplacement serrure A2P**",
        fromPrice: 420,
        note: "Bricard / Vachette / Fichet certifiée",
        includes: [
          "Cylindre A2P niveau 2 (10+ minutes de résistance)",
          "Pose, calibrage",
          "5 clés brevetées + carte de propriété",
        ],
      },
      {
        label: "Blindage de porte existante",
        fromPrice: 1490,
        note: "Sur porte bois standard",
        includes: ["Tôle d'acier 15/10e", "Cornière anti-pince", "Serrure A2P** 5 points", "Garantie 5 ans"],
      },
      {
        label: "Bloc-porte blindé neuf",
        fromPrice: 3200,
        note: "Pose complète bâti + porte",
        includes: ["BP1 / BP2 certifié A2P", "Pose et finitions", "Garantie décennale"],
      },
    ],
  },

  // ─── DEPANNAGE ELECTRIQUE ─────────────────────────────────────────
  "electricite/depannage-electrique": {
    title: "Combien coûte un dépannage électrique ?",
    subtitle: STANDARD_SUBTITLE,
    disclaimer:
      "Tarifs TTC indicatifs. Majoration nuit (22h-6h) +50 %, dimanche/jour férié +50 %. Devis ferme et gratuit communiqué après diagnostic. Garantie décennale sur tous travaux. Carte Vitale, CB, espèces, virement, chèque acceptés.",
    items: [
      {
        label: "Dépannage horaires ouvrés",
        fromPrice: 90,
        note: "Lun-Ven 8h-19h, Sam 9h-17h",
        includes: ["Déplacement IDF inclus", "Diagnostic complet de la panne", "Première heure de main d'œuvre"],
      },
      {
        label: "Dépannage nuit / week-end",
        fromPrice: 140,
        note: "Hors horaires + dimanche/férié",
        includes: ["Déplacement + diagnostic", "Intervention dans les 2h", "Devis avant toute action facturable"],
      },
      {
        label: "Recherche de panne complexe",
        fromPrice: 220,
        note: "Forfait diagnostic approfondi",
        includes: ["Mesures et tests installation", "Localisation précise du défaut", "Rapport écrit avec préconisations"],
      },
      {
        label: "Remplacement disjoncteur différentiel",
        fromPrice: 180,
        note: "30 mA, type AC standard",
        includes: ["Matériel marque Schneider/Legrand", "Pose et test de fonctionnement", "Garantie pièce 2 ans"],
      },
      {
        label: "Mise aux normes tableau (T2-T4)",
        fromPrice: 980,
        note: "Tableau ≤ 13 modules",
        includes: ["Audit NF C 15-100", "Remplacement disjoncteurs vétustes", "Repérage et étiquetage des circuits"],
      },
      {
        label: "Diagnostic Consuel obligatoire",
        fromPrice: 290,
        note: "Avant raccordement Enedis",
        includes: ["Visite complète installation", "Rapport conformité NF C 15-100", "Présence Consuel le jour J"],
      },
    ],
  },

  // ─── INSTALLATION & RENOVATION ────────────────────────────────────
  "electricite/installation-renovation": {
    title: "Combien coûte une rénovation électrique ?",
    subtitle: STANDARD_SUBTITLE,
    disclaimer: STANDARD_DISCLAIMER,
    items: [
      {
        label: "Pose de prise / interrupteur",
        fromPrice: 89,
        note: "Sur câblage existant",
        includes: ["Matériel marque (Legrand/Schneider)", "Pose, raccordement, test", "Reprise enduit léger"],
      },
      {
        label: "Création d'un nouveau circuit",
        fromPrice: 290,
        note: "Disjoncteur dédié + câblage",
        includes: ["Saignée + passage du câble", "Pose disjoncteur dédié", "Test conformité"],
      },
      {
        label: "Rénovation appartement T2-T3",
        fromPrice: 4500,
        note: "Refonte complète NF C 15-100",
        includes: [
          "Nouveau tableau électrique 100 % conforme",
          "Renouvellement de l'ensemble des circuits",
          "Attestation Consuel + garantie décennale",
        ],
      },
      {
        label: "Rénovation appartement T4-T5",
        fromPrice: 7900,
        note: "Refonte complète NF C 15-100",
        includes: ["Tableau étendu (24+ modules)", "Refonte de tous les circuits", "Conformité Consuel délivrée"],
      },
      {
        label: "Câblage d'une pièce supplémentaire",
        fromPrice: 690,
        note: "Pièce neuve / extension",
        includes: ["Sortie de toit / cloison technique", "5 prises + 1 point d'éclairage typique", "Test sécurité"],
      },
      {
        label: "Audit installation électrique",
        fromPrice: 190,
        note: "Diagnostic NF C 15-100",
        includes: ["Inspection complète", "Rapport écrit avec préconisations", "Chiffrage des travaux de remise en état"],
      },
    ],
  },

  // ─── MISE AUX NORMES ──────────────────────────────────────────────
  "electricite/mise-aux-normes": {
    title: "Combien coûte une mise aux normes ?",
    subtitle: STANDARD_SUBTITLE,
    disclaimer: STANDARD_DISCLAIMER,
    items: [
      {
        label: "Audit conformité NF C 15-100",
        fromPrice: 190,
        note: "Diagnostic initial",
        includes: ["Inspection complète installation", "Rapport écrit détaillé", "Liste précise des points non-conformes"],
      },
      {
        label: "Remplacement tableau standard",
        fromPrice: 980,
        note: "Jusqu'à 13 modules",
        includes: ["Nouveau tableau Schneider/Legrand", "Différentiel 30 mA type AC", "Repérage / étiquetage"],
      },
      {
        label: "Remplacement tableau étendu",
        fromPrice: 1690,
        note: "24 à 36 modules",
        includes: ["Différentiels 30 mA AC + A si besoin", "Disjoncteurs calibrés par circuit", "Repérage exhaustif"],
      },
      {
        label: "Mise à la terre + équipotentielle",
        fromPrice: 690,
        note: "Si manquante (vieil immeuble)",
        includes: ["Piquet de terre / boucle de fond", "Liaison équipotentielle salle de bain", "Mesure résistance"],
      },
      {
        label: "Attestation Consuel + visite",
        fromPrice: 290,
        note: "Indispensable raccord Enedis",
        includes: ["Préparation du dossier", "Présence le jour de la visite", "Levée de réserves incluse"],
      },
      {
        label: "Plan de rénovation par lots",
        fromPrice: 390,
        note: "Pour copropriétés / SCI",
        includes: [
          "Audit multi-lots coordonné",
          "Document de synthèse pour AG",
          "Plan de phasage et budget global",
        ],
      },
    ],
  },

  // ─── BORNE IRVE ───────────────────────────────────────────────────
  "electricite/borne-irve": {
    title: "Combien coûte une borne IRVE installée ?",
    subtitle:
      "Fourchettes à partir de — basées sur nos installations IRVE récentes en Île-de-France. Aides ADVENIR déductibles selon configuration.",
    disclaimer:
      "Tarifs TTC indicatifs hors gros œuvre (saignée, percements murs porteurs), hors modification d'abonnement Enedis. Délai d'installation : 1 à 3 jours selon configuration. Délai prime ADVENIR : 4 à 8 semaines après mise en service. Nous instruisons l'intégralité du dossier.",
    items: [
      {
        label: "Borne 7 kW maison individuelle",
        fromPrice: 1290,
        note: "Avant prime ADVENIR 600 €",
        includes: ["Wallbox Type 2 7 kW (Schneider/Hager)", "Tableau divisionnaire dédié + diff. type B", "5 à 10 m de câble + pose murale"],
      },
      {
        label: "Borne 11 kW triphasée",
        fromPrice: 1690,
        note: "Maison avec raccordement tri",
        includes: ["Wallbox Type 2 11 kW", "Adaptation tableau si besoin", "Délestage dynamique selon abonnement"],
      },
      {
        label: "Borne 22 kW (résidentiel)",
        fromPrice: 2390,
        note: "Recharge 100 km en ~30 min",
        includes: ["Wallbox 22 kW Type 2 connectée", "Câblage tri renforcé", "Configuration app + RFID"],
      },
      {
        label: "Borne copropriété (résident)",
        fromPrice: 1890,
        note: "Avant prime ADVENIR 1 660 €",
        includes: ["Sous-compteur dédié au lot", "Câblage du TGBT à la place", "Dossier syndic + ADVENIR"],
      },
      {
        label: "Infrastructure collective IRVE",
        fromPrice: 4990,
        note: "Copropriété 5 à 20 places",
        includes: ["Étude de puissance + bus de communication", "Bornes mutualisées + supervision", "Contrat de maintenance optionnel"],
      },
      {
        label: "Borne tertiaire 22 kW",
        fromPrice: 2890,
        note: "Avant prime ADVENIR 960 €",
        includes: ["Wallbox tri + lecteur RFID", "Refacturation utilisateur", "Supervision multi-sites optionnelle"],
      },
    ],
  },

  // ─── CONTROLE D'ACCES ─────────────────────────────────────────────
  "controle-acces": {
    title: "Combien coûte un système de contrôle d'accès ?",
    subtitle:
      "Fourchettes à partir de — basées sur nos installations récentes en copropriétés, bureaux et résidences en Île-de-France.",
    disclaimer:
      "Tarifs TTC indicatifs hors gros œuvre (saignée, percements murs porteurs) et hors raccordement courant fort. Devis ferme communiqué après visite technique. Possibilité d'aides ANAH MaPrimeRénov'Copropriété sur certains équipements en immeuble collectif.",
    items: [
      {
        label: "Interphone audio simple",
        fromPrice: 290,
        note: "Particulier · 1 combiné + platine",
        includes: ["Platine de rue + combiné intérieur", "Câblage + pose", "Garantie 2 ans"],
      },
      {
        label: "Vidéophone couleur connecté",
        fromPrice: 590,
        note: "Maison individuelle",
        includes: ["Caméra HD platine + écran 7'' intérieur", "App smartphone (réponse à distance)", "Mémoire des visites"],
      },
      {
        label: "Interphonie copropriété audio",
        fromPrice: 1890,
        note: "Immeuble jusqu'à 12 lots",
        includes: ["Platine rue + un combiné par lot", "Programmation + repérage", "Mise en service syndic"],
      },
      {
        label: "Interphonie copropriété vidéo",
        fromPrice: 3990,
        note: "Immeuble jusqu'à 12 lots",
        includes: ["Platine vidéo HD + écrans couleur", "Câblage 2 fils", "Formation gardien/résidents"],
      },
      {
        label: "Système de badges RFID",
        fromPrice: 690,
        note: "Lecture + 10 badges fournis",
        includes: ["Lecteur RFID Mifare", "Centrale d'autorisation", "10 badges encodés"],
      },
      {
        label: "Digicode + clavier codé",
        fromPrice: 380,
        note: "100 codes utilisateurs",
        includes: ["Clavier vandal-proof IP54", "Relais ouverture + alarme", "Programmation des codes"],
      },
    ],
  },

  // ─── METALLERIE ───────────────────────────────────────────────────
  metallerie: {
    title: "Combien coûte un projet de métallerie ?",
    subtitle:
      "Fourchettes à partir de — basées sur nos fabrications récentes en Île-de-France. Devis ferme et plan technique après prise de cotes sur site (gratuit).",
    disclaimer:
      "Tarifs TTC indicatifs hors livraison hors petite couronne (+150 km), hors gros œuvre lié à la pose. Délais de fabrication 3 à 6 semaines selon complexité. Plan technique signé livré avec le devis ferme.",
    items: [
      {
        label: "Portail battant sur mesure (3m)",
        fromPrice: 1890,
        note: "Acier galvanisé thermolaqué",
        includes: ["Conception 3D + plan technique", "Fabrication atelier", "Pose et réglages"],
      },
      {
        label: "Portail coulissant motorisé (4m)",
        fromPrice: 3990,
        note: "Acier + moteur 24V",
        includes: ["Motorisation FAAC/Came", "2 télécommandes + photocellules", "Pose et mise en service"],
      },
      {
        label: "Porte de service métallique",
        fromPrice: 980,
        note: "Acier 15/10e, fermeture 3 points",
        includes: ["Bâti + porte sur mesure", "Serrure cylindre standard", "Finition thermolaquage"],
      },
      {
        label: "Porte coupe-feu EI60",
        fromPrice: 1690,
        note: "Norme EI60 / 60 min",
        includes: ["Certificat conformité ERP", "Pose avec contrôle d'étanchéité", "Garantie décennale"],
      },
      {
        label: "Garde-corps acier extérieur (ml)",
        fromPrice: 290,
        note: "Prix par mètre linéaire",
        includes: ["Conception conforme NF P01-012", "Acier galvanisé + thermolaqué", "Pose chevillée façade"],
      },
      {
        label: "Structure métallique sur mesure",
        fromPrice: 4500,
        note: "Verrière, mezzanine, charpente",
        includes: ["Étude charge bureau d'études", "Soudures certifiées", "Mise en place levage"],
      },
    ],
  },
};

/** Pull a pricing block by key; throws at build time if missing. */
export function getPricing(key: string): PricingBlock {
  const block = PRICING[key];
  if (!block) throw new Error(`pricing.ts: no block for "${key}"`);
  return block;
}
