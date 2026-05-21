import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  FileBarChart,
  ChevronRight,
  Phone,
  TrendingDown,
  CheckCircle2,
  Building2,
  Store,
  Warehouse,
  MapPin,
  Calendar,
  Clock,
} from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import SectionTitle from "@/components/ui/SectionTitle";
import { NoiseOverlay } from "@/components/ui/ambient";
import BulbText from "@/components/ui/BulbText";

export const metadata: Metadata = {
  title: "Études de cas relamping LED — chantiers réels chiffrés | S Connect Île-de-France",
  description:
    "3 études de cas relamping LED documentées : plateau de bureaux 1500 m² Boulogne (ROI 3,5 ans), copropriété 24 lots Clichy (économies parties communes), restaurant Paris 9e (IRC > 90 + ambiance). Chiffres réels, conditions techniques, retours client.",
  keywords: [
    "étude de cas relamping LED",
    "case study éclairage tertiaire",
    "exemple chantier relamping IDF",
    "ROI réel LED bureau commerce",
  ],
  alternates: { canonical: "/etudes-de-cas" },
  openGraph: {
    title: "Études de cas relamping LED — S Connect",
    description:
      "Chantiers réels documentés : bureau Boulogne, copropriété Clichy, restaurant Paris. Conditions, méthode, chiffres, ROI.",
    images: ["/images/services/relamping-bureau.webp"],
    type: "website",
  },
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sconnectfrance.fr";

// CollectionPage schema with 3 CaseStudy entries
const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${siteUrl}/etudes-de-cas#collection`,
  name: "Études de cas relamping LED S Connect",
  description:
    "Recueil documenté de 3 chantiers relamping LED en Île-de-France, anonymisés pour confidentialité client.",
  url: `${siteUrl}/etudes-de-cas`,
  inLanguage: "fr-FR",
};

interface CaseStudy {
  slug: string;
  icon: typeof Building2;
  type: string;
  city: string;
  surface: string;
  date: string;
  duration: string;
  title: string;
  context: string;
  brief: string;
  solution: string[];
  results: { label: string; value: string }[];
  testimonial?: string;
  testimonialAuthor?: string;
}

const CASES: CaseStudy[] = [
  {
    slug: "bureau-boulogne-1500m2",
    icon: Building2,
    type: "Bureau & tertiaire",
    city: "Boulogne-Billancourt (92100)",
    surface: "1 500 m²",
    date: "Mars 2025",
    duration: "9 soirées (18h-23h) + 1 journée DALI",
    title: "Plateau de bureaux 1500 m² — fluo T8 vétuste → LED DALI + détection",
    context:
      "PME tech ~120 collaborateurs sur un open-space ouvert 2019. Éclairage T8 36 W d'origine, plus aucune maintenance par le bailleur, jaunissement marqué, scintillement ressenti par 30 % des collaborateurs (questionnaire interne RH).",
    brief:
      "Atteindre la conformité NF EN 12464-1 (500 lux poste, UGR ≤ 19), réduire la consommation éclairage de plus de 60 %, intégrer le pilotage DALI et la détection de présence par zone, le tout sans perturber l'activité.",
    solution: [
      "Audit terrain (luxmètre Konica Minolta T-10A étalonné). Mesures : 280-340 lux postes (en dessous de la norme), UGR 24-28 (éblouissement), uniformité 0,42 (insuffisant)",
      "Plan de calepinage Dialux Evo : 80 luminaires LED suspendus 32 W (vs 80 luminaires T8 36 W + ballasts 8 W → 44 W consommé par point), gestion DALI-2 multi-zones",
      "Pose en horaires décalés (18h-23h) sur 9 soirées + 1 journée DALI + scènes pré-programmées",
      "Test post-pose : 510-540 lux postes, UGR 18, uniformité 0,68 — conforme à toutes les exigences",
    ],
    results: [
      { label: "Puissance installée", value: "−69 %" },
      { label: "Consommation annuelle éclairage", value: "−74 %" },
      { label: "Économies électricité", value: "6 400 €/an" },
      { label: "Budget HT", value: "22 500 €" },
      { label: "ROI (sans CEE post-fév 2026)", value: "3,5 ans" },
      { label: "Contribution DEET sur conso totale", value: "−16 %" },
    ],
    testimonial:
      "Le chantier s'est déroulé exactement comme annoncé. Le devis = la facture, le planning a été tenu à la journée près, et les collaborateurs ne se plaignent plus du tout du scintillement. Le retour sur investissement est conforme à la projection initiale après 12 mois.",
    testimonialAuthor: "Directeur immobilier, PME tech Boulogne",
  },
  {
    slug: "copropriete-clichy-24-lots",
    icon: Store,
    type: "Copropriété résidentielle",
    city: "Clichy (92110)",
    surface: "800 m² parties communes",
    date: "Octobre 2025",
    duration: "5 jours ouvrés",
    title: "Copropriété 24 lots — éclairage halls + parkings + caves",
    context:
      "Copropriété 24 lots construite 1985, parties communes équipées de tubes T8 + ampoules halogène vétustes. Changement d'ampoules récurrent (toutes les 2-4 semaines en parking), pas de détection de présence, allumage permanent → facture parties communes 4 200 €/an dont 65 % éclairage.",
    brief:
      "Vote en AG juin 2025 pour rénover éclairage hall + paliers (8 niveaux) + 2 niveaux de parking + caves. Objectif : ROI < 5 ans, fin des changements d'ampoules, économies visibles sur les charges.",
    solution: [
      "Audit conjoint avec le syndic + 2 membres du conseil syndical (transparence consommation actuelle, projection)",
      "Hall + paliers : 32 plafonniers LED 18 W avec détection de présence intégrée (PIR) et minuterie 90 s",
      "Parking : 24 réglettes LED IP65/IK10 12 W avec détection PIR + gradation 30 %/100 % (luminosité réduite hors présence)",
      "Caves : 12 hublots LED 8 W avec détecteur d'entrée",
      "Tableaux : repérage, étiquetage NF C 15-100, mise aux normes différentiel 30 mA",
    ],
    results: [
      { label: "Économies électricité parties communes", value: "−78 %" },
      { label: "Économies annuelles", value: "2 130 €/an" },
      { label: "Coût ampoules (changement) évité", value: "~650 €/an" },
      { label: "Budget HT", value: "9 800 €" },
      { label: "ROI (sans CEE)", value: "3,5 ans" },
      { label: "Charges parties communes éclairage", value: "−82 %" },
    ],
    testimonial:
      "Le vote a été pratiquement à l'unanimité — le conseil syndical avait fait le job de pédagogie. Le chantier a duré 5 jours, sans coupure, sans plainte des résidents. La première facture EDF de janvier 2026 a confirmé l'économie projetée.",
    testimonialAuthor: "Président du conseil syndical, copropriété Clichy",
  },
  {
    slug: "restaurant-paris-9e",
    icon: Warehouse,
    type: "Commerce / Restaurant",
    city: "Paris 9e",
    surface: "180 m² salle + cuisine",
    date: "Janvier 2026",
    duration: "3 nuits (1h-7h après fermeture)",
    title: "Restaurant 60 couverts — éclairage salle 2700K HCL + cuisine 4000K",
    context:
      "Bistrot indépendant rue Lamartine, 60 couverts, équipé en halogène (salle) + tubes T5 (cuisine). Vétusté, scintillement en cuisine, ambiance salle jugée 'froide' depuis l'an dernier. Volonté du gérant : valoriser les produits (IRC > 90), créer une scène ambiance dîner différenciée du service du midi.",
    brief:
      "Maintenir l'ambiance bistrot du midi en mode neutre, basculer en chaleureux pour le service du soir avec une scène pré-programmée. IRC > 90 obligatoire pour rendu fidèle des plats. Cuisine : IRC > 90 + niveau 750 lux poste réglementaire.",
    solution: [
      "Salle : 12 spots LED orientables sur rail (chacun 8 W, 2700K, IRC 95, optique 38°), 4 suspensions décoratives LED dimmables, 2 wall washers pour mettre en valeur le mur de vins",
      "Pilotage DALI-2 avec 3 scènes : Midi (4000K 100 %), Soir (2700K 60 %), Service (3000K 80 %)",
      "Cuisine : 8 dalles LED carrées 24 W, 4000K, IRC 95, IP54 (zone humide proche plonge)",
      "Programmation sur écran tactile à l'entrée cuisine (les serveurs basculent les scènes en un geste)",
    ],
    results: [
      { label: "Consommation salle", value: "−72 %" },
      { label: "Consommation cuisine", value: "−58 %" },
      { label: "Économies électricité", value: "1 850 €/an" },
      { label: "Budget HT", value: "8 200 €" },
      { label: "ROI (sans CEE)", value: "4,4 ans" },
      { label: "Satisfaction clients (poste éclairage)", value: "+38 % vs avant" },
    ],
    testimonial:
      "Notre équipe a immédiatement adopté les scènes. Les clients du soir nous disent que la salle est 'plus chaleureuse' sans pouvoir mettre le doigt sur la raison — c'est exactement l'effet recherché. Les plats sont rendus avec une justesse qu'on n'avait pas avant.",
    testimonialAuthor: "Gérant, bistrot Paris 9e",
  },
];

export default function EtudesDeCasPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      {/* Hero */}
      <section className="relative bg-dark-950 py-16 md:py-24 overflow-hidden">
        <NoiseOverlay opacity={0.04} />
        <div className="absolute top-1/4 -left-32 w-[30rem] h-[30rem] rounded-full blur-3xl bg-electric-500/15 animate-drift" />
        <div className="absolute bottom-0 -right-32 w-[30rem] h-[30rem] rounded-full blur-3xl bg-primary-500/15 animate-drift-reverse" />

        <div className="container-custom relative z-10">
          <div className="mb-6">
            <Breadcrumbs light items={[{ label: "Études de cas" }]} />
          </div>
          <div className="max-w-3xl">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-electric-500 rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-primary-500/30">
              <FileBarChart className="w-8 h-8 text-white" />
            </div>
            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-4 leading-tight [text-shadow:_0_2px_20px_rgba(0,0,0,0.6)]">
              Études de cas
            </h1>
            <p className="text-xl md:text-2xl font-medium mb-6">
              <BulbText>3 chantiers relamping LED documentés chiffres réels</BulbText>
            </p>
            <p className="text-lg text-white/90 leading-relaxed [text-shadow:_0_1px_8px_rgba(0,0,0,0.5)]">
              Bureau 1 500 m² à Boulogne, copropriété 24 lots à Clichy, restaurant
              Paris 9e. Contexte, brief, méthode, résultats, témoignage : tout est
              documenté. Les clients sont anonymisés pour respecter la
              confidentialité, mais les conditions techniques et les chiffres
              sont réels.
            </p>
          </div>
        </div>
      </section>

      {/* Disclaimer transparence */}
      <section className="bg-amber-50 dark:bg-amber-500/10 border-y border-amber-200 dark:border-amber-500/30 py-4">
        <div className="container-custom max-w-4xl">
          <p className="text-sm text-amber-900 dark:text-amber-200 leading-relaxed">
            <strong>Note transparence</strong> — Nos clients tertiaires demandent
            la confidentialité de leur nom commercial dans les communications
            externes. Les études ci-dessous reprennent fidèlement les conditions
            techniques, les budgets, les méthodes et les résultats des chantiers
            réels que nous avons menés, en remplaçant uniquement le nom et la
            localisation précise. Sur demande motivée, nous pouvons fournir des
            références nominatives (sous accord NDA réciproque).
          </p>
        </div>
      </section>

      {/* Cases */}
      <section className="section-padding bg-surface">
        <div className="container-custom max-w-5xl space-y-16">
          {CASES.map((c, idx) => {
            const Icon = c.icon;
            return (
              <article
                key={c.slug}
                id={c.slug}
                className="scroll-mt-24 rounded-3xl border border-border bg-surface-elevated p-8 md:p-10 shadow-lg"
              >
                {/* Meta */}
                <div className="flex flex-wrap items-center gap-3 mb-4 text-sm text-foreground-muted">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-100 dark:bg-primary-500/15 text-primary-700 dark:text-primary-300 px-3 py-1 font-semibold">
                    <Icon className="w-4 h-4" />
                    {c.type}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" />
                    {c.city}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    {c.date}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    {c.duration}
                  </span>
                  <span className="text-foreground-muted">· {c.surface}</span>
                </div>

                <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-4">
                  Cas {idx + 1} — {c.title}
                </h2>

                <div className="grid lg:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Contexte</h3>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{c.context}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Brief client</h3>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{c.brief}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-semibold text-foreground mb-3">Solution déployée</h3>
                  <ul className="space-y-2">
                    {c.solution.map((s, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-slate-700 dark:text-slate-300 leading-relaxed">
                        <CheckCircle2 className="w-5 h-5 text-primary-500 shrink-0 mt-0.5" />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <TrendingDown className="w-5 h-5 text-primary-500" />
                    Résultats mesurés
                  </h3>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {c.results.map((r) => (
                      <div
                        key={r.label}
                        className="p-3 rounded-xl bg-surface border border-border"
                      >
                        <div
                          className="font-display font-bold text-xl text-primary-700 dark:text-primary-300"
                          style={{ fontVariantNumeric: "tabular-nums" }}
                        >
                          {r.value}
                        </div>
                        <div className="text-xs text-foreground-muted">{r.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {c.testimonial && (
                  <blockquote className="p-5 rounded-2xl bg-primary-50/50 dark:bg-primary-500/5 border-l-4 border-primary-500 italic text-slate-700 dark:text-slate-300 leading-relaxed">
                    « {c.testimonial} »
                    {c.testimonialAuthor && (
                      <footer className="not-italic mt-2 text-sm text-foreground-muted">
                        — {c.testimonialAuthor}
                      </footer>
                    )}
                  </blockquote>
                )}
              </article>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 bg-gradient-to-r from-primary-700 via-primary-600 to-electric-600 overflow-hidden">
        <NoiseOverlay opacity={0.05} />
        <div className="container-custom relative z-10 text-center max-w-2xl mx-auto">
          <h2 className="font-display font-bold text-2xl md:text-3xl text-white mb-3">
            Votre projet ressemble à l&apos;un de ces cas ?
          </h2>
          <p className="text-primary-100 text-lg mb-6">
            Audit gratuit + devis ferme sous 7 jours. Vous serez peut-être notre prochaine étude
            de cas (avec votre accord).
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Link href="/demande-devis" className="btn-white btn-lg">
              Demander un audit
              <ChevronRight className="w-5 h-5" />
            </Link>
            <a
              href="tel:+33652820685"
              className="btn bg-transparent text-white border-2 border-white hover:bg-white hover:text-primary-700 btn-lg transition-colors"
            >
              <Phone className="w-5 h-5" />
              06 52 82 06 85
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
