import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, ChevronRight, Phone } from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import SectionTitle from "@/components/ui/SectionTitle";
import { NoiseOverlay } from "@/components/ui/ambient";
import BulbText from "@/components/ui/BulbText";

export const metadata: Metadata = {
  title: "Lexique éclairage LED — 50 termes pro à connaître | S Connect",
  description:
    "Lux, UGR, IRC, CCT, DALI, IP65, IK10, LM-80, TM-30, OPERAT… Le lexique complet des acronymes éclairage tertiaire que tout décideur, architecte ou syndic devrait maîtriser avant un relamping LED.",
  keywords: [
    "lexique éclairage",
    "glossaire LED",
    "termes techniques éclairage",
    "définition UGR IRC IP IK lumens lux",
  ],
  alternates: { canonical: "/lexique-eclairage" },
};

interface Term {
  acronym: string;
  full: string;
  category: "Photométrie" | "Norme" | "Technologie" | "Réglementation" | "Mesure" | "Composant";
  definition: string;
  /** Optional internal link to a deeper page on this topic. */
  link?: { label: string; href: string };
}

const TERMS: Term[] = [
  // Photométrie
  {
    acronym: "Lux",
    full: "Unité d'éclairement lumineux",
    category: "Photométrie",
    definition:
      "Le lux mesure la quantité de lumière reçue par unité de surface (1 lm/m²). C'est ce que mesure un luxmètre. La NF EN 12464-1 impose des minimums par poste : 500 lux poste informatique, 300 lux circulation, 200 lux zone de pause.",
  },
  {
    acronym: "Lumen (lm)",
    full: "Flux lumineux total",
    category: "Photométrie",
    definition:
      "Le lumen mesure la quantité de lumière totale émise par une source, indépendamment de la direction. C'est l'indicateur principal pour comparer deux luminaires LED — pas les watts qui ne reflètent que la conso.",
  },
  {
    acronym: "Candela (cd)",
    full: "Intensité lumineuse dans une direction",
    category: "Photométrie",
    definition:
      "Le candela mesure l'intensité lumineuse dans une direction précise. Utile pour qualifier les projecteurs et les spots où la concentration directionnelle compte.",
  },
  {
    acronym: "lm/W",
    full: "Efficacité lumineuse",
    category: "Photométrie",
    definition:
      "Quantité de lumens produits par watt consommé. Une bonne LED pro en 2026 fait 140 à 200 lm/W. Un tube fluo T8 plafonne à ~80 lm/W. Une halogène 15 lm/W. C'est le ratio qui justifie le ROI du relamping.",
  },
  {
    acronym: "K (Kelvin)",
    full: "Température de couleur (CCT)",
    category: "Photométrie",
    definition:
      "Exprime la teinte de la lumière : 2700-3000K (chaud, ambiance, hôtellerie), 4000K (neutre, bureau standard), 5000-6500K (froid, industriel, hôpital, atelier). Le choix dépend de l'usage et du moment de la journée.",
  },
  {
    acronym: "IRC (Ra)",
    full: "Indice de Rendu des Couleurs",
    category: "Photométrie",
    definition:
      "Mesure la fidélité avec laquelle un luminaire restitue les couleurs (0 à 100). IRC > 80 acceptable bureau, > 90 obligatoire pour boutique vêtements, pharmacie, hôpital, restaurant, atelier de peinture. IRC < 80 = couleurs faussées.",
  },
  {
    acronym: "TM-30",
    full: "ANSI/IES TM-30-20 fidelity & gamut",
    category: "Photométrie",
    definition:
      "Méthode plus moderne que l'IRC pour évaluer le rendu des couleurs (99 couleurs testées au lieu de 8). Cible : Rf (fidélité) > 85 et Rg (saturation) ≈ 100. Standard montant en éclairage premium.",
  },
  {
    acronym: "UGR",
    full: "Unified Glare Rating",
    category: "Photométrie",
    definition:
      "Mesure l'éblouissement perçu (≤ 19 obligatoire bureau, ≤ 22 commerce, ≤ 25 industrie). Calculé par étude photométrique (Dialux, Relux). Un UGR trop élevé = inconfort visuel + fatigue oculaire.",
  },
  {
    acronym: "Uniformité (U0)",
    full: "Rapport éclairement min/moyen",
    category: "Photométrie",
    definition:
      "U0 = Emin / Emoy. La norme impose ≥ 0,60 pour les zones de tâche, ≥ 0,40 pour les zones environnantes. Une mauvaise uniformité crée des zones d'ombre fatigantes.",
  },
  {
    acronym: "ULOR / DLOR",
    full: "Upper / Downward Light Output Ratio",
    category: "Photométrie",
    definition:
      "Part du flux lumineux dirigée vers le haut (ULOR) ou vers le bas (DLOR). Crucial pour limiter la pollution lumineuse extérieure (ULOR < 1 % en éclairage urbain).",
  },

  // Normes
  {
    acronym: "NF EN 12464-1",
    full: "Éclairage des lieux de travail intérieurs",
    category: "Norme",
    definition:
      "La norme européenne qui définit les niveaux d'éclairement, l'UGR et l'IRC minimaux pour chaque type de poste de travail. Référence obligatoire pour tout projet tertiaire en France.",
    link: { label: "Voir la pillar relamping", href: "/services/electricite/relamping" },
  },
  {
    acronym: "NF EN 12464-2",
    full: "Éclairage des lieux de travail extérieurs",
    category: "Norme",
    definition:
      "Volet extérieur de la 12464-1 : éclairage de parking extérieur, abord d'usine, zone logistique. Définit les niveaux d'éclairement, l'éblouissement et la limitation pollution lumineuse.",
  },
  {
    acronym: "NF EN 1838",
    full: "Éclairage de sécurité (BAES)",
    category: "Norme",
    definition:
      "Encadre les blocs autonomes d'éclairage de sécurité dans les ERP. Évacuation : ≥ 1 lux au sol sur axe d'évacuation. Anti-panique : ≥ 0,5 lux. Maintien : autonomie ≥ 1 h.",
  },
  {
    acronym: "NF C 15-100",
    full: "Installations électriques basse tension",
    category: "Norme",
    definition:
      "Norme française régissant TOUTES les installations électriques basse tension neuves et rénovées. Encadre les protections, les sections, les circuits dédiés, les zones humides. Amendement 6 (2026) en cours d'application.",
  },
  {
    acronym: "Décret tertiaire (DEET)",
    full: "Dispositif Éco Énergie Tertiaire",
    category: "Réglementation",
    definition:
      "Loi ELAN 2018. Impose −40 % de consommation d'énergie finale en 2030, −50 % en 2040, −60 % en 2050 sur les bâtiments tertiaires > 1 000 m². Le relamping est l'investissement n°1 pour s'y conformer.",
  },
  {
    acronym: "OPERAT",
    full: "Observatoire de la Performance Énergétique",
    category: "Réglementation",
    definition:
      "Plateforme ADEME de déclaration annuelle des consommations dans le cadre du DEET. Date limite : 30 septembre de chaque année. Sanctions en cas de non-déclaration.",
  },
  {
    acronym: "RT 2020 / RE 2020",
    full: "Réglementation Environnementale 2020",
    category: "Réglementation",
    definition:
      "Successeur de la RT 2012. S'applique aux constructions neuves depuis 2022. Encadre la consommation énergétique et l'empreinte carbone. L'éclairage en fait partie via les exposants Cep et Bbio.",
  },
  {
    acronym: "CEE",
    full: "Certificats d'Économie d'Énergie",
    category: "Réglementation",
    definition:
      "Mécanisme d'aide à l'efficacité énergétique. ⚠️ Les fiches dédiées éclairage LED (BAT-EQ-127, IND-BA-116, BAR-EQ-110) ont été supprimées par arrêté du 23 février 2026. D'autres CEE restent disponibles sur isolation, GTB, pompes à chaleur.",
    link: { label: "Lire l'article", href: "/actualites/suppression-primes-cee-eclairage-led-2026" },
  },

  // Technologie
  {
    acronym: "DALI",
    full: "Digital Addressable Lighting Interface",
    category: "Technologie",
    definition:
      "Protocole numérique de pilotage des luminaires (jusqu'à 64 luminaires par bus). Permet la gradation individuelle, le regroupement en scènes, l'intégration GTB/GTC. Standard pour tout relamping tertiaire moderne.",
  },
  {
    acronym: "DALI-2",
    full: "DALI-2 (IEC 62386 version 2)",
    category: "Technologie",
    definition:
      "Version 2 du protocole DALI, certifiée et standardisée 2014. Garantit l'interopérabilité multi-marques (Trilux + Sylvania + Philips même bus). À exiger systématiquement en 2026.",
  },
  {
    acronym: "DALI-D4i",
    full: "DALI alimentation par bus",
    category: "Technologie",
    definition:
      "Extension DALI-2 qui transporte aussi l'alimentation 24V pour les capteurs (présence, lumière du jour, température). Simplifie le câblage de gestion d'éclairage.",
  },
  {
    acronym: "PoE Lighting",
    full: "Power over Ethernet Lighting",
    category: "Technologie",
    definition:
      "Alternative émergente au DALI : luminaires alimentés et pilotés par câble Ethernet RJ45. Convergence IT + éclairage. Adopté par Cisco, Sinclair, Innovative. Cas d'usage limités encore.",
  },
  {
    acronym: "Détection PIR",
    full: "Détection passive infrarouge",
    category: "Technologie",
    definition:
      "Capteur qui détecte les mouvements via le rayonnement infrarouge des corps humains. Standard pour la détection de présence en éclairage. Économies 25-40 % typique.",
  },
  {
    acronym: "Gradation crépusculaire",
    full: "Daylight harvesting",
    category: "Technologie",
    definition:
      "Capteur de lumière du jour qui module la sortie des luminaires intérieurs pour compenser la lumière naturelle. Économies 20-30 %. Cumulable avec la détection présence pour 50-60 % d'économies.",
  },
  {
    acronym: "HCL",
    full: "Human Centric Lighting",
    category: "Technologie",
    definition:
      "Éclairage qui fait varier température (3000K matin doré → 6000K midi froid → 3000K soir) et intensité pour suivre le rythme circadien. Études : +10-15 % concentration, -30 % fatigue oculaire.",
  },
  {
    acronym: "Tunable White",
    full: "Blanc variable 2700K-6500K",
    category: "Technologie",
    definition:
      "Capacité d'un luminaire à varier sa température de couleur sur commande (sans changer l'intensité). Base technique du HCL. Tous les drivers DALI-2 modernes le gèrent.",
  },
  {
    acronym: "RGBW",
    full: "Red-Green-Blue-White multi-canal",
    category: "Technologie",
    definition:
      "Luminaire qui combine 4 canaux (rouge, vert, bleu, blanc) pour reproduire n'importe quelle couleur + un blanc de référence. Utilisé en commerce signature, événementiel, ambiance.",
  },
  {
    acronym: "Pilotage Bluetooth Mesh",
    full: "BLE Mesh lighting control",
    category: "Technologie",
    definition:
      "Alternative sans-fil au DALI : chaque luminaire est un nœud Bluetooth Mesh, piloté via app. Avantage : zéro câblage de gestion. Inconvénient : portée + interférences.",
  },

  // Composants
  {
    acronym: "Driver LED",
    full: "Alimentation à découpage LED",
    category: "Composant",
    definition:
      "Convertit le 230V AC en courant continu stabilisé pour la LED. Composant le plus critique : un mauvais driver = scintillement, durée de vie raccourcie. Préférer Tridonic, Osram, Philips, Mean Well.",
  },
  {
    acronym: "Optique",
    full: "Diffuseur, lentille, réflecteur",
    category: "Composant",
    definition:
      "Système optique qui dirige et adoucit le flux LED. Diffuseur opale (lumière douce), lentille (concentration), réflecteur (asymétrique pour rayonnage). Choix selon UGR cible et géométrie locale.",
  },
  {
    acronym: "Module LED",
    full: "Carte COB ou SMD",
    category: "Composant",
    definition:
      "Cœur lumineux du luminaire. COB (Chip On Board, source ponctuelle puissante) vs SMD (Surface Mount Devices, multiples points). COB préféré pour spots et downlights, SMD pour panneaux et tubes.",
  },
  {
    acronym: "Dissipateur thermique",
    full: "Heat sink",
    category: "Composant",
    definition:
      "Évacue la chaleur du module LED. Critique : une LED qui chauffe perd 20-30 % de durée de vie. Un bon luminaire pro reste tiède en fonctionnement continu, pas brûlant.",
  },

  // Mesure / Indices
  {
    acronym: "IP (IPxx)",
    full: "Indice de Protection",
    category: "Mesure",
    definition:
      "Code à 2 chiffres : 1er = protection corps solides (0 à 6), 2e = protection eau (0 à 9). Bureau IP20 suffit, cuisine pro IP54, parking IP65, immergé IP68. À vérifier sur fiche technique.",
  },
  {
    acronym: "IK (IKxx)",
    full: "Indice de résistance aux chocs",
    category: "Mesure",
    definition:
      "Code de 00 à 10 mesurant la résistance aux chocs mécaniques. Bureau IK02 suffit, gymnase IK08, vestiaire scolaire IK10. Norme NF EN 50102.",
  },
  {
    acronym: "Flicker (PstLM)",
    full: "Scintillement court terme",
    category: "Mesure",
    definition:
      "Mesure du scintillement perceptible (PstLM ≤ 1 acceptable, < 0,4 idéal). Norme NF EN 17037 pour le bien-être au travail. Un mauvais driver = flicker = maux de tête + fatigue oculaire.",
  },
  {
    acronym: "TLM",
    full: "Temporal Light Modulation",
    category: "Mesure",
    definition:
      "Norme cadre du flicker (NF EN 17037). Cible : SVM (Stroboscopic Visibility Measure) < 0,4. Vérifié au laboratoire LCIE Bureau Veritas pour les marques pro.",
  },
  {
    acronym: "LM-80",
    full: "IES LM-80 maintien de flux",
    category: "Mesure",
    definition:
      "Test américain mesurant la dégradation du flux LED sur 6 000-10 000 h de fonctionnement. Permet d'extrapoler à L70 (70 % du flux initial à 50 000 h) ou L80 (80 %). Critère d'éligibilité historique aux CEE.",
  },
  {
    acronym: "L70 / L80 / L90",
    full: "Maintien de flux à durée de vie",
    category: "Mesure",
    definition:
      "L70 = la LED conserve 70 % de son flux initial après X heures. Mention typique : « L80 50 000 h ». Cible 2026 : L90 60 000 h pour un produit pro.",
  },
  {
    acronym: "MacAdam (SDCM)",
    full: "Cohérence de couleur entre lots",
    category: "Mesure",
    definition:
      "Ellipses de MacAdam (SDCM 1 à 7) : mesure la dispersion de couleur entre luminaires identiques. SDCM ≤ 3 obligatoire dans le tertiaire pour éviter les nuances visibles entre dalles voisines.",
  },
  {
    acronym: "Power Factor",
    full: "Facteur de puissance",
    category: "Mesure",
    definition:
      "Ratio puissance active / apparente (cos φ). PF ≥ 0,9 obligatoire en tertiaire (norme EN 61000-3-2). Un mauvais PF = pénalités EDF sur les factures pro.",
  },
  {
    acronym: "THD",
    full: "Distorsion harmonique totale",
    category: "Mesure",
    definition:
      "Mesure la pollution harmonique injectée par les drivers LED dans le réseau électrique. THD < 15 % obligatoire en tertiaire. Sinon : risque de surchauffe câbles + pénalités énergéticien.",
  },
  {
    acronym: "Em",
    full: "Éclairement moyen maintenu",
    category: "Mesure",
    definition:
      "L'éclairement moyen (en lux) sur la zone de tâche en condition d'exploitation (après facteur de maintenance MF de 0,7-0,8 typique). C'est cette valeur que la NF EN 12464-1 impose.",
  },
  {
    acronym: "Facteur de maintenance (MF)",
    full: "Maintenance Factor",
    category: "Mesure",
    definition:
      "Coefficient (0,5 à 0,9) qui anticipe la baisse du flux dans le temps (encrassement, vieillissement LED). On dimensionne TOUJOURS l'installation neuve avec un Em incluant ce facteur.",
  },
  {
    acronym: "MacBeth ColorChecker",
    full: "Mire test rendu couleur",
    category: "Mesure",
    definition:
      "Mire de 24 patches couleur de référence pour évaluer visuellement le rendu d'un éclairage. Utilisée en complément des mesures IRC/TM-30 lors des audits qualité.",
  },

  // Borne IRVE
  {
    acronym: "IRVE",
    full: "Infrastructure de Recharge VE",
    category: "Réglementation",
    definition:
      "Certification obligatoire pour installer des bornes de recharge > 3,7 kW (arrêté 12 janvier 2017). Niveau 1 (jusqu'à 22 kW AC), niveau 2 (DC ≤ 50 kW), niveau 3 (DC > 50 kW). S Connect détient le niveau 2.",
    link: { label: "Voir notre page IRVE", href: "/services/electricite/borne-irve" },
  },
  {
    acronym: "ADVENIR",
    full: "Prime CEE véhicule électrique",
    category: "Réglementation",
    definition:
      "Prime dédiée à la mobilité électrique. 600 € maison individuelle, 1 660 € copropriété résidentielle, 960 € tertiaire par point de charge. Versée 4-8 semaines après pose. Pas affectée par la suppression CEE éclairage de février 2026.",
  },
];

const grouped = TERMS.reduce<Record<string, Term[]>>((acc, t) => {
  acc[t.category] = acc[t.category] || [];
  acc[t.category].push(t);
  return acc;
}, {});

// Schema.org DefinedTermSet
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sconnectfrance.fr";
const definedTermSetSchema = {
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  "@id": `${siteUrl}/lexique-eclairage#termset`,
  name: "Lexique éclairage LED",
  description:
    "Glossaire pro de l'éclairage LED tertiaire : 50 termes (photométrie, normes, technologie, composants, mesure) avec définitions, traductions et liens internes.",
  hasDefinedTerm: TERMS.map((t) => ({
    "@type": "DefinedTerm",
    name: t.acronym,
    alternateName: t.full,
    description: t.definition,
    inDefinedTermSet: `${siteUrl}/lexique-eclairage#termset`,
  })),
};

export default function LexiquePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSetSchema) }}
      />

      {/* Hero */}
      <section className="relative bg-dark-950 py-16 md:py-24 overflow-hidden">
        <NoiseOverlay opacity={0.04} />
        <div className="container-custom relative z-10">
          <div className="mb-6">
            <Breadcrumbs light items={[{ label: "Lexique éclairage" }]} />
          </div>
          <div className="max-w-3xl">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-electric-500 rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-primary-500/30">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-4 leading-tight [text-shadow:_0_2px_20px_rgba(0,0,0,0.6)]">
              Lexique éclairage LED
            </h1>
            <p className="text-xl md:text-2xl font-medium mb-6">
              <BulbText>50 termes pro à connaître avant un relamping</BulbText>
            </p>
            <p className="text-lg text-white/90 leading-relaxed [text-shadow:_0_1px_8px_rgba(0,0,0,0.5)]">
              UGR, IRC, DALI, IK10, OPERAT, L80, SDCM… Les acronymes qui reviennent
              systématiquement dans nos devis et nos audits, expliqués sans jargon.
              Pour décideurs, architectes, syndics et bureaux d&apos;études.
            </p>
          </div>
        </div>
      </section>

      {/* Table of contents */}
      <section className="bg-surface-muted py-8">
        <div className="container-custom max-w-4xl">
          <p className="text-sm font-semibold text-foreground mb-3">Par catégorie :</p>
          <div className="flex flex-wrap gap-2">
            {Object.keys(grouped).map((cat) => (
              <a
                key={cat}
                href={`#${cat.toLowerCase().replace(/[\s/]/g, "-")}`}
                className="px-3 py-1.5 rounded-full bg-surface-elevated border border-border text-sm text-foreground hover:border-primary-300 dark:hover:border-primary-500 transition-colors"
              >
                {cat} <span className="text-foreground-muted">({grouped[cat].length})</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Terms */}
      <section className="section-padding bg-surface">
        <div className="container-custom max-w-4xl">
          {Object.entries(grouped).map(([cat, items]) => (
            <div key={cat} id={cat.toLowerCase().replace(/[\s/]/g, "-")} className="mb-16 scroll-mt-24">
              <SectionTitle badge={cat} title={`${items.length} termes ${cat.toLowerCase()}`} centered={false} />
              <dl className="space-y-6">
                {items.map((t) => (
                  <div
                    key={t.acronym}
                    className="p-5 rounded-2xl bg-surface-elevated border border-border"
                  >
                    <dt className="flex flex-wrap items-baseline gap-3 mb-2">
                      <span className="font-display font-bold text-xl text-foreground">{t.acronym}</span>
                      <span className="text-sm text-slate-700 dark:text-slate-300 italic">{t.full}</span>
                    </dt>
                    <dd className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      {t.definition}
                    </dd>
                    {t.link && (
                      <Link
                        href={t.link.href}
                        className="inline-flex items-center gap-1.5 mt-3 text-sm font-semibold text-primary-600 dark:text-primary-300 hover:underline"
                      >
                        {t.link.label}
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    )}
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-16 bg-gradient-to-r from-primary-700 via-primary-600 to-electric-600 overflow-hidden">
        <NoiseOverlay opacity={0.05} />
        <div className="container-custom relative z-10 text-center max-w-2xl mx-auto">
          <h2 className="font-display font-bold text-2xl md:text-3xl text-white mb-3">
            Un terme manquant ? Un doute sur votre projet ?
          </h2>
          <p className="text-primary-100 text-lg mb-6">
            On vous explique tout en 15 min au téléphone, gratuitement.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Link href="/demande-devis" className="btn-white btn-lg">
              Audit gratuit
            </Link>
            <a href="tel:+33652820685" className="btn bg-transparent text-white border-2 border-white hover:bg-white hover:text-primary-700 btn-lg transition-colors">
              <Phone className="w-5 h-5" />
              06 52 82 06 85
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
