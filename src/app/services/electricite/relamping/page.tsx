import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Lightbulb,
  TrendingDown,
  Leaf,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  Phone,
  Building2,
  Store,
  Warehouse,
  Car,
  ClipboardCheck,
  Wrench,
  Calculator,
  HeartHandshake,
  HelpCircle,
  Sparkles,
  Clock,
} from "lucide-react";
import HeroVideo from "@/components/home/HeroVideo";
import BulbText from "@/components/ui/BulbText";
import RelampingROICalculator from "@/components/relamping/RelampingROICalculator";
import SectionTitle from "@/components/ui/SectionTitle";
import { NoiseOverlay } from "@/components/ui/ambient";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/primitives/Accordion";
import {
  generateServiceSchema,
  generateFAQSchema,
  generateVideoSchema,
  injectSchema,
} from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Relamping LED Paris & Île-de-France — Audit gratuit | S Connect",
  description:
    "Spécialiste du relamping LED en Île-de-France. Audit éclairage gratuit, étude personnalisée, installation et maintenance. Jusqu'à 80% d'économies d'énergie. Aides CEE & certifications RGE.",
  keywords: [
    "relamping LED",
    "relamping LED Paris",
    "relamping tertiaire IDF",
    "audit éclairage LED",
    "remplacement halogène LED",
    "CEE éclairage",
    "économie énergie éclairage",
    "norme NF EN 12464-1",
    "relamping bureau",
    "relamping commerce",
    "relamping copropriété",
    "relamping industriel",
  ],
  alternates: { canonical: "/services/electricite/relamping" },
  openGraph: {
    title: "Relamping LED — S Connect | Audit gratuit en Île-de-France",
    description:
      "Économisez jusqu'à 80% sur votre éclairage. Audit gratuit, étude économique, installation et maintenance LED par S Connect en Île-de-France.",
    images: ["/images/hero/relamping-lightbulb.webp"],
    type: "website",
  },
};

const useCases = [
  {
    title: "Bureau & tertiaire",
    short: "Open-spaces, plateaux, salles de réunion",
    description:
      "Conformité NF EN 12464-1, confort visuel sans fatigue, gestion DALI et détection de présence. Économies typiques : −60 à −70 %.",
    href: "/services/electricite/relamping/bureau-tertiaire",
    imageSlug: "relamping-bureau",
    icon: Building2,
    metric: "−65% conso",
    accent: "from-primary-500 to-electric-500",
  },
  {
    title: "Commerce & restaurant",
    short: "Boutiques, restaurants, hôtels",
    description:
      "Track LED orientable, IRC > 90 pour la fidélité des couleurs, ambiance modulable. Met vos produits en valeur tout en divisant la facture.",
    href: "/services/electricite/relamping/commerce-restaurant",
    imageSlug: "relamping-commerce",
    icon: Store,
    metric: "−70% conso",
    accent: "from-amber-500 to-orange-400",
  },
  {
    title: "Copropriété & parking",
    short: "Halls, paliers, parkings, communs",
    description:
      "Détection de présence, gradation crépusculaire, fin des changements d'ampoules incessants. ROI typique en 18 à 24 mois.",
    href: "/services/electricite/relamping/copropriete-parking",
    imageSlug: "relamping-copropriete",
    icon: Car,
    metric: "−75% conso",
    accent: "from-emerald-500 to-teal-400",
  },
  {
    title: "Industriel & entrepôt",
    short: "Hauts plafonds, ateliers, logistique",
    description:
      "High-bay LED 150 lm/W, durée de vie 80 000 h, résistance IP65. Réduction massive de maintenance et de chaleur dégagée.",
    href: "/services/electricite/relamping/industriel-entrepot",
    imageSlug: "relamping-industriel",
    icon: Warehouse,
    metric: "−80% conso",
    accent: "from-violet-500 to-purple-400",
  },
];

const method = [
  {
    step: "01",
    title: "Audit éclairage gratuit",
    icon: ClipboardCheck,
    desc: "Sur site, nous relevons votre parc actuel (sources, ballasts, luminances), nous mesurons les niveaux d'éclairement (lux) et identifions les gisements d'économie. Rapport remis sous 7 jours.",
  },
  {
    step: "02",
    title: "Étude technique & ROI",
    icon: Calculator,
    desc: "Simulation 3D des nouvelles luminances, dimensionnement par poste de travail (norme NF EN 12464-1), calcul des aides CEE éligibles, ROI précis sur 36 mois.",
  },
  {
    step: "03",
    title: "Installation maîtrisée",
    icon: Wrench,
    desc: "Pose en horaires décalés (soir, week-end) pour ne pas perturber l'activité. Dépose et recyclage Récylum des anciennes sources. Mise en service et calibration.",
  },
  {
    step: "04",
    title: "Suivi & garantie",
    icon: HeartHandshake,
    desc: "Garantie matériel 5 ans, garantie installation décennale. Maintenance préventive annuelle. Monitoring optionnel de la consommation réelle vs. estimation.",
  },
];

const benefits = [
  {
    icon: TrendingDown,
    title: "Jusqu'à −80% d'énergie",
    desc: "Un LED consomme 6 à 10 fois moins qu'un halogène et 3 à 4 fois moins qu'un fluo-compact à éclairage équivalent.",
  },
  {
    icon: Clock,
    title: "Durée de vie × 25",
    desc: "50 000 à 80 000 heures contre 1 000 à 2 000 pour un halogène. Fin des changements d'ampoules permanents.",
  },
  {
    icon: Leaf,
    title: "Empreinte carbone divisée",
    desc: "Moins d'énergie consommée, moins de déchets (ampoules + emballages), recyclage Récylum systématique.",
  },
  {
    icon: ShieldCheck,
    title: "Conformité réglementaire",
    desc: "Norme NF EN 12464-1 sur les lieux de travail, décret tertiaire (DEET) qui impose −40% de conso d'ici 2030.",
  },
];

const stats = [
  { value: "−80%", label: "d'économie d'énergie", sub: "vs halogène équivalent" },
  { value: "80 000h", label: "durée de vie LED", sub: "≈ 25 ans en bureau" },
  { value: "18-36 mois", label: "ROI typique", sub: "incluant les aides CEE" },
  { value: "−40%", label: "Décret tertiaire 2030", sub: "obligation légale" },
];

const faqs = [
  {
    question: "Qu'est-ce que le relamping LED exactement ?",
    answer:
      "Le relamping désigne le remplacement d'un parc d'éclairage existant (halogène, fluo-compact, tubes fluorescents) par des sources LED modernes plus performantes. C'est une opération qui peut concerner uniquement les sources (relamping simple) ou inclure aussi les luminaires et la gestion (rénovation d'éclairage). S Connect réalise les deux selon l'analyse de votre installation.",
  },
  {
    question: "Quelles économies puis-je attendre d'un relamping LED ?",
    answer:
      "Les économies dépendent de votre parc actuel. Sur un parc majoritairement halogène, comptez −70 à −80 % de consommation électrique liée à l'éclairage. Sur un parc déjà fluo-compact, l'économie tourne autour de −40 à −50 %. À cela s'ajoutent les économies de maintenance (les LED durent 25 fois plus longtemps que les halogènes).",
  },
  {
    question: "Quel est le ROI d'un projet de relamping ?",
    answer:
      "Le retour sur investissement typique se situe entre 18 et 36 mois pour les projets professionnels, incluant les aides CEE (Certificats d'Économie d'Énergie). Pour un parc à forte consommation (commerce ouvert 12h/jour, parking 24h/24, industriel), le ROI tombe souvent sous 18 mois. Nous remettons une étude ROI personnalisée après chaque audit.",
  },
  {
    question: "Le relamping LED est-il éligible aux aides CEE ?",
    answer:
      "Oui. Les fiches CEE BAT-EQ-127 (luminaires LED en tertiaire), BAT-EQ-130 (système de gestion d'éclairage) et IND-UT-130 (industriel) couvrent une part significative du coût matériel et installation. S Connect gère le dossier CEE de A à Z : audit éligible, dépôt, suivi, encaissement de la prime. Vous ne percevez la facture qu'après déduction de la prime.",
  },
  {
    question: "Combien de temps dure un chantier de relamping ?",
    answer:
      "Pour 100 points lumineux en site occupé, comptez 1 à 3 jours d'intervention selon la complexité (hauteur, accessibilité, gestion intégrée ou non). Nous travaillons en horaires décalés (soir, week-end) pour ne pas perturber votre activité. Aucune coupure de courant prolongée : le chantier se fait par zones.",
  },
  {
    question: "Quelles certifications avez-vous pour le relamping ?",
    answer:
      "S Connect est certifié Qualifélec (mention Éclairage), RGE Quali'Eco (pour les chantiers éligibles aux aides), partenaire CEE pour les fiches BAT-EQ-127 et IND-UT-130. Tous nos chantiers bénéficient de notre garantie décennale et de la garantie constructeur sur le matériel (5 ans minimum sur les sources et drivers).",
  },
  {
    question: "Que devient l'ancien matériel d'éclairage ?",
    answer:
      "Les sources lumineuses (halogènes, fluos, tubes) contiennent des composants à recycler obligatoirement. Nous les collectons sur site et les confions à l'éco-organisme Récylum (filière agréée). Un bordereau de suivi de déchets vous est remis. Aucun rejet en déchetterie classique ni au tout-venant.",
  },
  {
    question: "Peut-on relamper un site occupé sans interrompre l'activité ?",
    answer:
      "Oui, c'est même 90 % de nos chantiers. Nous opérons par zones, en horaires non-perturbants (avant ouverture, après fermeture, week-end). Pour les commerces et restaurants, l'intervention se fait souvent de nuit ou en lundi. Pour les bureaux, en soirée et week-end. Pour les parkings, sans couper l'éclairage des autres bays.",
  },
  {
    question: "Quelle est la durée de vie réelle d'une LED professionnelle ?",
    answer:
      "Les LED professionnelles que nous installons sont garanties 50 000 à 80 000 heures (L80B10 — 80 % du flux maintenu sur 80 % du parc). En bureau (10h/jour, 5j/7), cela correspond à 20-25 ans d'usage. En parking 24h/24, environ 10 ans. À comparer aux 1 000-2 000 heures d'un halogène ou 8 000-15 000 d'un fluo-compact.",
  },
  {
    question: "Le relamping respecte-t-il le décret tertiaire (DEET) ?",
    answer:
      "Oui. Le décret tertiaire impose −40 % de consommation d'énergie d'ici 2030 (−50 % en 2040, −60 % en 2050) pour les bâtiments tertiaires > 1000 m². L'éclairage représente 15 à 30 % de la conso d'un tertiaire. Un relamping LED couplé à de la gestion (détection, gradation) couvre à lui seul une part substantielle de l'objectif DEET.",
  },
];

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sconnectfrance.fr";
const serviceSchema = generateServiceSchema(
  {
    name: "Relamping LED — Audit & installation éclairage économe",
    description:
      "Audit éclairage gratuit, étude économique, installation et maintenance LED pour tertiaire, commerce, copropriété et industriel en Île-de-France.",
    provider: "S Connect",
    areaServed: [
      "Clichy",
      "Levallois-Perret",
      "Neuilly-sur-Seine",
      "Asnières",
      "Paris",
      "La Défense",
      "Hauts-de-Seine",
      "Île-de-France",
    ],
    priceRange: "€€€",
  },
  siteUrl,
);
const faqSchema = generateFAQSchema(faqs);

// VideoObject schema for the hero lightbulb animation. Google indexes this
// and can surface the video as a rich result alongside the page.
const videoSchema = generateVideoSchema({
  name: "Animation relamping LED — ampoule qui s'allume",
  description:
    "Visualisation Seedance d'une ampoule LED moderne s'allumant progressivement. Illustration du service de relamping LED proposé par S Connect en Île-de-France.",
  thumbnailUrl: "/images/hero/relamping-lightbulb.webp",
  uploadDate: "2026-05-12",
  duration: "PT5S",
  contentUrl: `${siteUrl}/videos/relamping-lightbulb.mp4`,
  baseUrl: siteUrl,
});

export default function RelampingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={injectSchema(serviceSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={injectSchema(faqSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={injectSchema(videoSchema)} />

      {/* ─── Hero — full-bleed lightbulb video with progressive illumination ─── */}
      <section className="relative min-h-[90vh] flex items-center bg-dark-950 overflow-hidden">
        <HeroVideo
          videoSrc="/videos/relamping-lightbulb.mp4"
          videoSrcWebm="/videos/relamping-lightbulb.webm"
          posterSrc="/images/hero/relamping-lightbulb.webp"
          fallbackSrc="/images/hero/relamping-lightbulb.jpg"
        />
        {/* Left scrim — protect headline */}
        <div className="absolute inset-0 bg-gradient-to-r from-dark-950/85 from-0% via-dark-950/35 via-25% to-transparent to-55%" />
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-dark-950/75 to-transparent" />
        <NoiseOverlay opacity={0.025} />

        <div className="container-custom relative z-10 py-20 w-full">
          <div className="mb-6">
            <Breadcrumbs
              light
              items={[
                { label: "Services", href: "/services" },
                { label: "Électricité", href: "/services/electricite" },
                { label: "Relamping LED" },
              ]}
            />
          </div>

          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-200 text-sm font-semibold mb-6 backdrop-blur-md">
              <Lightbulb className="w-4 h-4" />
              Spécialiste relamping LED · IDF
            </span>

            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white mb-6 leading-[1.05] [text-shadow:_0_2px_28px_rgba(0,0,0,0.85),_0_1px_4px_rgba(0,0,0,0.7)]">
              La lumière qui <BulbText>divise par 5</BulbText> votre facture.
            </h1>

            <p className="text-xl text-white/95 mb-8 leading-relaxed max-w-xl [text-shadow:_0_2px_16px_rgba(0,0,0,0.8)]">
              Audit éclairage gratuit, étude économique, installation LED et maintenance. Jusqu&apos;à
              80&nbsp;% d&apos;économies, prime CEE incluse, conformité décret tertiaire.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link href="/demande-devis" className="btn-primary btn-lg">
                Audit gratuit
                <ChevronRight className="w-5 h-5" />
              </Link>
              <a
                href="tel:+33652820685"
                className="btn glass-panel text-white hover:bg-white/15 btn-lg border border-white/20"
              >
                <Phone className="w-5 h-5" />
                06 52 82 06 85
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <div className="glass-panel flex items-center gap-2 px-4 py-2 rounded-xl">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span className="text-sm font-semibold text-white">Aides CEE gérées</span>
              </div>
              <div className="glass-panel flex items-center gap-2 px-4 py-2 rounded-xl">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <span className="text-sm font-semibold text-white">Qualifélec Éclairage</span>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 text-surface pointer-events-none">
          <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 100V60C240 20 480 0 720 0C960 0 1200 20 1440 60V100H0Z" fill="currentColor" />
          </svg>
        </div>
      </section>

      {/* ─── Bénéfices ─── */}
      <section className="section-padding bg-surface">
        <div className="container-custom">
          <SectionTitle
            badge="Pourquoi le relamping LED"
            title="4 raisons concrètes de basculer maintenant"
            subtitle="L'éclairage représente 15 à 30 % de la consommation d'un bâtiment tertiaire. Le moderniser, c'est l'action la plus rentable que vous pouvez engager cette année."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b) => {
              const Icon = b.icon;
              return (
                <div
                  key={b.title}
                  className="relative p-6 rounded-2xl bg-surface-elevated border border-border hover:shadow-lg transition-shadow"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-electric-500 flex items-center justify-center text-white mb-4 shadow-lg">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-foreground mb-2">{b.title}</h3>
                  <p className="text-foreground-muted text-sm leading-relaxed">{b.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Stats band ─── */}
      <section className="relative py-16 md:py-20 bg-dark-950 overflow-hidden">
        <Image
          src="/images/hero/relamping-lightbulb.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-30"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-dark-950/95 via-dark-950/85 to-primary-950/80" />
        <NoiseOverlay opacity={0.04} />
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-display font-bold text-4xl md:text-5xl gradient-text-living mb-2 tabular-nums">
                  {s.value}
                </div>
                <div className="text-white font-semibold text-sm md:text-base">{s.label}</div>
                <div className="text-white/60 text-xs mt-1">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Use cases — bento cluster links ─── */}
      <section className="section-padding bg-surface-muted">
        <div className="container-custom">
          <SectionTitle
            badge="Cas d'usage"
            title="4 environnements, 4 stratégies LED"
            subtitle="Chaque type de bâtiment a ses contraintes propres : confort visuel, niveaux d'éclairement réglementaires, gestion. Nous adaptons la solution au contexte."
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {useCases.map((uc) => {
              const Icon = uc.icon;
              return (
                <Link
                  key={uc.href}
                  href={uc.href}
                  className="group relative block aspect-[16/10] rounded-3xl overflow-hidden bg-dark-900 shadow-md hover:shadow-2xl transition-shadow"
                >
                  <Image
                    src={`/images/services/${uc.imageSlug}.webp`}
                    alt={uc.title}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-950 from-0% via-dark-950/55 via-45% to-transparent to-75%" />
                  <span className="absolute top-5 left-5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white text-xs font-semibold">
                    {uc.metric}
                  </span>
                  <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-gradient-to-br ${uc.accent} shadow-lg`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-display font-bold text-2xl md:text-3xl text-white mb-2 [text-shadow:_0_2px_16px_rgba(0,0,0,0.7)]">
                      {uc.title}
                    </h3>
                    <p className="text-white/85 text-sm md:text-base mb-4 max-w-md leading-relaxed [text-shadow:_0_1px_8px_rgba(0,0,0,0.6)]">
                      {uc.description}
                    </p>
                    <span className="inline-flex items-center gap-2 font-semibold text-sm text-white group-hover:gap-3 transition-all">
                      Voir le détail
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Méthode en 4 étapes ─── */}
      <section className="section-padding bg-surface">
        <div className="container-custom">
          <SectionTitle
            badge="Notre méthode"
            title="De l'audit à la mise en service, en 4 étapes claires"
            subtitle="Aucune surprise. Un interlocuteur dédié, un planning ferme, une estimation chiffrée dès la première visite."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {method.map((m) => {
              const Icon = m.icon;
              return (
                <div
                  key={m.step}
                  className="relative p-6 rounded-2xl bg-surface-elevated border border-border"
                >
                  <span className="absolute top-4 right-5 font-display font-bold text-5xl text-primary-100 dark:text-primary-900/50 leading-none select-none">
                    {m.step}
                  </span>
                  <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-electric-500 flex items-center justify-center text-white mb-4 shadow-lg">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-foreground mb-2 relative">
                    {m.title}
                  </h3>
                  <p className="text-foreground-muted text-sm leading-relaxed">{m.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Calculateur ROI interactif ─── */}
      <RelampingROICalculator />

      {/* ─── Aides CEE callout ─── */}
      <section className="section-padding bg-gradient-to-br from-emerald-50 via-surface to-primary-50 dark:from-emerald-500/10 dark:via-surface-muted dark:to-primary-500/10">
        <div className="container-custom">
          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-700 dark:bg-emerald-500/15 dark:border-emerald-500/30 dark:text-emerald-300 text-sm font-semibold mb-6">
                <Sparkles className="w-4 h-4" />
                Aides CEE 2026
              </span>
              <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-6 leading-tight">
                Jusqu&apos;à <span className="text-emerald-600 dark:text-emerald-400">60 %</span>{" "}
                du coût matériel financé par les CEE.
              </h2>
              <p className="text-lg text-foreground-muted mb-6 leading-relaxed">
                Les Certificats d&apos;Économie d&apos;Énergie (CEE) financent directement votre
                projet de relamping. <strong>S&apos;Connect gère le dossier complet</strong> :
                éligibilité, simulation, dépôt, suivi, encaissement de la prime. Vous ne payez que
                le reste à charge.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Fiches CEE BAT-EQ-127 (tertiaire), BAT-EQ-130 (gestion), IND-UT-130 (industriel)",
                  "Prime calculée selon kWh cumac économisés sur la durée de vie",
                  "Versement direct sur votre compte après mise en service",
                  "Cumulable avec l'amortissement comptable et le sur-amortissement énergétique",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-foreground-muted leading-relaxed"
                  >
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/demande-devis" className="btn-primary btn-lg">
                Demander une simulation CEE
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-dark-900 shadow-2xl">
              <Image
                src="/images/services/relamping-bureau.webp"
                alt="Bureau retrofité en LED, gestion DALI"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-950/90 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <div className="font-display font-bold text-2xl text-white mb-1 [text-shadow:_0_2px_12px_rgba(0,0,0,0.7)]">
                  Exemple : open-space 600 m²
                </div>
                <div className="text-white/80 text-sm [text-shadow:_0_1px_6px_rgba(0,0,0,0.6)]">
                  Coût total : 28 000 € · Prime CEE : 14 200 € · Reste à charge : 13 800 € · ROI :
                  24 mois
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="section-padding bg-surface-muted">
        <div className="container-custom max-w-4xl">
          <SectionTitle
            badge="FAQ"
            title="Tout ce que vous voulez savoir sur le relamping"
            subtitle="Les questions qu'on nous pose le plus souvent en audit. Une question manque ? Appelez-nous."
          />
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem key={faq.question} value={`faq-${i}`}>
                <AccordionTrigger>
                  <span className="flex items-center gap-3 text-left">
                    <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-100 dark:bg-primary-500/15 text-primary-700 dark:text-primary-300">
                      <HelpCircle className="h-4 w-4" />
                    </span>
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="pl-11 leading-relaxed">{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ─── Final CTA ─── */}
      <section className="relative overflow-hidden py-24 md:py-32 bg-dark-950">
        <Image
          src="/images/hero/relamping-lightbulb.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-80"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary-700/85 via-primary-900/75 to-electric-600/70 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-dark-950/30 via-transparent to-dark-950/60" />
        <NoiseOverlay opacity={0.05} />

        <div className="container-custom relative z-10 text-center">
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-white mb-6 [text-shadow:_0_2px_20px_rgba(0,0,0,0.6)]">
            Combien votre éclairage vous coûte vraiment ?
          </h2>
          <p className="text-xl text-primary-100 mb-10 max-w-2xl mx-auto [text-shadow:_0_1px_10px_rgba(0,0,0,0.5)]">
            Audit gratuit sur site sous 7 jours. Rapport chiffré avec ROI, aides CEE éligibles et
            recommandations.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/demande-devis" className="btn-white btn-lg">
              Demander mon audit gratuit
              <ChevronRight className="w-5 h-5" />
            </Link>
            <a
              href="tel:+33652820685"
              className="btn bg-accent-500 text-dark-900 hover:bg-accent-400 btn-lg shadow-lg shadow-accent-500/25"
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
