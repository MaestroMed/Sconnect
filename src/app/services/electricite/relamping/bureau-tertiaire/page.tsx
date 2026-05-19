import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Building2,
  CheckCircle2,
  ChevronRight,
  Phone,
  HelpCircle,
  TrendingDown,
  Lightbulb,
  ArrowRight,
  ShieldCheck,
  Activity,
} from "lucide-react";
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
  injectSchema,
} from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Relamping LED Bureau & Tertiaire — Conforme NF EN 12464-1 | S Connect",
  description:
    "Spécialiste relamping LED pour bureaux, open-spaces et plateaux tertiaires en Île-de-France. Conformité NF EN 12464-1, gestion DALI, détection présence, économies jusqu'à 70%. Décret tertiaire couvert.",
  keywords: [
    "relamping bureau",
    "relamping tertiaire",
    "éclairage bureau LED",
    "norme NF EN 12464-1",
    "DALI bureau",
    "décret tertiaire éclairage",
    "open-space LED",
  ],
  alternates: { canonical: "/services/electricite/relamping/bureau-tertiaire" },
};

const benefits = [
  {
    icon: Activity,
    title: "Conformité NF EN 12464-1",
    desc: "300 à 500 lux selon poste (lecture, écran, salle de réunion). Uniformité ≥ 0,6. UGR ≤ 19 anti-éblouissement.",
  },
  {
    icon: TrendingDown,
    title: "−60 à −70 % de conso",
    desc: "Sur un parc fluo T5/T8 vieillissant. Encore plus si halogènes ou downlights anciens.",
  },
  {
    icon: ShieldCheck,
    title: "Décret tertiaire 2030",
    desc: "Couverture massive de l'objectif −40 % imposé par le DEET pour les bâtiments > 1000 m².",
  },
  {
    icon: Lightbulb,
    title: "Gestion DALI + présence",
    desc: "Gradation crépusculaire, scènes par zone, détection automatique. Optimisation continue.",
  },
];

const faqs = [
  {
    question: "Quel niveau d'éclairement faut-il pour un bureau ?",
    answer:
      "La norme NF EN 12464-1 impose 500 lux sur les zones de tâche (postes informatiques, lecture), 300 lux dans les circulations, et 200 lux dans les zones de pause. Pour les salles de réunion à usage vidéoconférence, prévoir 750-1000 lux verticaux sur les visages. Nous calibrons chaque zone précisément en phase d'étude.",
  },
  {
    question: "Pourquoi du DALI plutôt que du simple ON/OFF ?",
    answer:
      "Le protocole DALI (Digital Addressable Lighting Interface) permet de gérer chaque luminaire individuellement : gradation 0-100 %, regroupement en scènes, intégration GTC/GTB. C'est la base de l'éclairage tertiaire moderne et la condition d'éligibilité aux meilleures primes CEE (fiche BAT-EQ-130).",
  },
  {
    question: "Combien de temps pour un relamping d'open-space 500 m² ?",
    answer:
      "En pose horaires décalés (18h-23h ou week-end), comptez 3 à 5 soirées pour un open-space de 500 m² avec environ 80 luminaires DALI + détecteurs de présence. Aucune coupure pendant les heures d'activité. La calibration DALI se fait sur 1 journée supplémentaire avec un référent technique côté client.",
  },
  {
    question: "Les LED clignotent-elles à la fréquence du secteur ?",
    answer:
      "Les LED bas de gamme oui (50 Hz, fatigue oculaire). Les drivers professionnels que nous installons sont sans scintillement (flicker-free, < 1 % à 100 Hz). Important pour les postes écran et les locaux fréquentés par des personnes photosensibles. C'est une exigence systématique de notre cahier des charges.",
  },
  {
    question: "Le relamping améliore-t-il vraiment la productivité ?",
    answer:
      "Plusieurs études (CIE, HEAD) montrent qu'un éclairage adapté (température 4000 K matin / 3000 K après-midi, intensité variable) réduit la fatigue oculaire de 30-40 % et améliore la concentration de 10-15 %. Les solutions human-centric lighting (HCL) que nous proposons sur demande exploitent cette dimension.",
  },
];

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sconnectfrance.fr";
const serviceSchema = generateServiceSchema(
  {
    name: "Relamping LED bureau & tertiaire",
    description:
      "Audit et relamping LED pour bureaux, open-spaces et plateaux tertiaires. Conformité NF EN 12464-1, gestion DALI, conformité décret tertiaire DEET.",
    provider: "S Connect",
    areaServed: ["Paris", "La Défense", "Hauts-de-Seine", "Île-de-France"],
    priceRange: "€€€",
  },
  siteUrl,
);
const faqSchema = generateFAQSchema(faqs);

const siblings = [
  { name: "Commerce & restaurant", href: "/services/electricite/relamping/commerce-restaurant" },
  { name: "Copropriété & parking", href: "/services/electricite/relamping/copropriete-parking" },
  { name: "Industriel & entrepôt", href: "/services/electricite/relamping/industriel-entrepot" },
];

export default function RelampingBureauPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={injectSchema(serviceSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={injectSchema(faqSchema)} />

      {/* Hero — 16:9 wide image */}
      <section className="relative bg-dark-950 py-16 md:py-24 overflow-hidden">
        <Image
          src="/images/services/relamping-bureau.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-55"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-950 from-0% via-dark-950/70 via-50% to-dark-950/30 to-100%" />
        <NoiseOverlay opacity={0.04} />
        <div className="container-custom relative z-10">
          <div className="mb-6">
            <Breadcrumbs
              light
              items={[
                { label: "Services", href: "/services" },
                { label: "Électricité", href: "/services/electricite" },
                { label: "Relamping LED", href: "/services/electricite/relamping" },
                { label: "Bureau & tertiaire" },
              ]}
            />
          </div>
          <div className="max-w-2xl">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-electric-500 rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-primary-500/30">
              <Building2 className="w-8 h-8 text-white" />
            </div>
            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-4 leading-tight [text-shadow:_0_2px_20px_rgba(0,0,0,0.6)]">
              Relamping LED bureau & tertiaire
            </h1>
            <p className="text-xl md:text-2xl font-medium mb-6 gradient-text-living">
              Conformité NF EN 12464-1 · Gestion DALI · Décret tertiaire
            </p>
            <p className="text-lg text-white/90 leading-relaxed [text-shadow:_0_1px_8px_rgba(0,0,0,0.5)]">
              Open-spaces, plateaux de bureau, salles de réunion, espaces de coworking. Nous
              calibrons chaque poste de travail au niveau d&apos;éclairement réglementaire, avec
              une gestion DALI qui s&apos;adapte à l&apos;occupation réelle.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/demande-devis" className="btn-primary btn-lg">
                Audit gratuit
                <ChevronRight className="w-5 h-5" />
              </Link>
              <a
                href="tel:+33652820685"
                className="btn glass-panel text-white hover:bg-white/15 btn-lg"
              >
                <Phone className="w-5 h-5" />
                06 52 82 06 85
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Bénéfices */}
      <section className="section-padding bg-surface">
        <div className="container-custom">
          <SectionTitle
            badge="Bénéfices ciblés"
            title="Pourquoi relamper un bureau aujourd'hui"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b) => {
              const Icon = b.icon;
              return (
                <div key={b.title} className="p-6 rounded-2xl bg-surface-elevated border border-border">
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

      {/* Cas type */}
      <section className="section-padding bg-surface-muted">
        <div className="container-custom max-w-4xl">
          <SectionTitle
            badge="Ce que nous traitons"
            title="Tous les espaces tertiaires, tous les niveaux d'exigence"
          />
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: "Open-space & plateau", desc: "Calibration par poste de travail, gestion DALI groupée, détection de présence par zone." },
              { title: "Salles de réunion", desc: "Scènes pré-programmées (présentation, vidéo, créativité), gradation manuelle via panneau tactile." },
              { title: "Circulations & accueil", desc: "Détection automatique + gradation crépusculaire, mise en valeur des espaces signature." },
              { title: "Bureaux individuels & cabines", desc: "Pilotage personnalisé par bureau, IRC > 90 pour le confort visuel longue durée." },
            ].map((c) => (
              <div key={c.title} className="p-6 rounded-2xl bg-surface border border-border">
                <h3 className="font-display font-bold text-lg text-foreground mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary-500" />
                  {c.title}
                </h3>
                <p className="text-foreground-muted text-sm leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-surface">
        <div className="container-custom max-w-4xl">
          <SectionTitle badge="FAQ" title="Bureau & tertiaire — les questions clés" />
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

      {/* Cross-links to siblings + pillar */}
      <section className="py-16 bg-surface-muted border-t border-border">
        <div className="container-custom">
          <h3 className="font-display font-bold text-2xl text-foreground mb-6 text-center">
            Autres environnements
          </h3>
          <div className="grid sm:grid-cols-3 gap-4 mb-8 max-w-3xl mx-auto">
            {siblings.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="group p-4 rounded-xl bg-surface border border-border hover:border-primary-300 dark:hover:border-primary-500 transition-colors text-center"
              >
                <span className="text-foreground font-semibold group-hover:text-primary-600 dark:group-hover:text-primary-300 transition-colors inline-flex items-center gap-1.5">
                  {s.name}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
          <div className="text-center">
            <Link href="/services/electricite/relamping" className="btn-outline">
              <Lightbulb className="w-4 h-4" />
              Voir la page pilier Relamping
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 bg-gradient-to-r from-primary-700 via-primary-600 to-electric-600 overflow-hidden">
        <NoiseOverlay opacity={0.05} />
        <div className="container-custom relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-white">
            <h2 className="font-display font-bold text-2xl md:text-3xl mb-2">
              Auditons votre bureau gratuitement.
            </h2>
            <p className="text-primary-100 text-lg">
              Rapport chiffré, ROI, aides CEE, sous 7 jours.
            </p>
          </div>
          <div className="flex gap-4">
            <Link href="/demande-devis" className="btn-white btn-lg">
              Demander un audit
              <ChevronRight className="w-5 h-5" />
            </Link>
            <a href="tel:+33652820685" className="btn glass-panel text-white hover:bg-white/15 btn-lg">
              <Phone className="w-5 h-5" />
              06 52 82 06 85
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
