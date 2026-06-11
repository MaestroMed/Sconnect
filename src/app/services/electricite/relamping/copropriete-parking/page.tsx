import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Car,
  CheckCircle2,
  ChevronRight,
  Phone,
  HelpCircle,
  TrendingDown,
  Lightbulb,
  ArrowRight,
  Users,
  Sparkles,
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
import BulbText from "@/components/ui/BulbText";

export const metadata: Metadata = {
  title: "Relamping LED Copropriété & Parking | Charges divisées par 5 | S Connect",
  description:
    "Relamping LED pour copropriétés, parkings, halls et communs en Île-de-France. Détection de présence, IP65/IK10, durée de vie 80 000h. Charges d'éclairage divisées par 5. Dossier AG complet fourni.",
  keywords: [
    "relamping copropriété",
    "éclairage parking LED",
    "détection présence parking",
    "éclairage halls communs LED",
    "AG copropriété éclairage",
    "IP65 IK10 parking",
    "charges éclairage copropriété",
  ],
  alternates: { canonical: "/services/electricite/relamping/copropriete-parking" },
};

const benefits = [
  {
    icon: TrendingDown,
    title: "Charges divisées par 5",
    desc: "Un parking 24h/24 ou un hall toujours allumé consomme 8 000 à 15 000 kWh/an. Après relamping + détection : 1 500 à 3 000 kWh/an.",
  },
  {
    icon: Users,
    title: "Détection de présence",
    desc: "Allumage automatique au passage, gradation crépusculaire 10 % en veille, plein régime en circulation. Confort + économie.",
  },
  {
    icon: Sparkles,
    title: "IP65 / IK10 durables",
    desc: "Étanchéité poussière + jet d'eau, résistance aux chocs (vandalisme). Conçus pour parkings, locaux vélos, escaliers.",
  },
  {
    icon: Lightbulb,
    title: "Fin des changements d'ampoules",
    desc: "80 000 heures de durée de vie = 10 ans en parking 24h/24. Plus de visites du syndic en urgence après chaque grillage.",
  },
];

const faqs = [
  {
    question: "Faut-il un vote en AG pour un relamping en copropriété ?",
    answer:
      "Oui. Un relamping est considéré comme des travaux d'amélioration ou de mise aux normes, votés en AG à la majorité simple (art. 24) si financés par les charges courantes, ou majorité absolue (art. 25) s'il y a un emprunt collectif. Nous fournissons systématiquement un dossier AG complet : devis, économie annuelle estimée sur les charges, ROI sur 5 et 10 ans.",
  },
  {
    question: "Les parkings nécessitent-ils des LED spéciales ?",
    answer:
      "Oui, et c'est non négociable. Un parking impose IP65 (étanche poussière + projections), IK08 ou IK10 (résistance aux chocs), température de service −20 à +50 °C, IRC ≥ 70 pour la lecture des plaques d'immatriculation. Nous installons exclusivement des luminaires conformes à ces critères. Une LED de cuisine ne tiendrait pas un mois.",
  },
  {
    question: "Comment gérer la détection sans gêner les habitants ?",
    answer:
      "Nous installons des détecteurs de présence (PIR + radar) avec temporisation configurable : 60 à 120 secondes après dernière détection, puis gradation à 10 % pendant 5 minutes, puis extinction. Cela couvre largement le temps de passage en parking et évite les rallumages permanents. Les zones de stationnement véhicules restent à 10 % en permanence pour la sécurité.",
  },
  {
    question: "Quelle économie sur les charges de copropriété ?",
    answer:
      "Sur une copropriété parisienne moyenne (60 lots, hall + 4 paliers + parking 30 places), la consommation éclairage typique est 12 000 kWh/an, soit ~2 400 €/an de charges. Après relamping + détection : 2 000-3 000 kWh/an, ~500 €/an. Économie : ~1 900 €/an, soit un ROI typique de 5 à 7 ans sur la seule baisse des charges (les primes CEE éclairage ont été supprimées en février 2026).",
  },
  {
    question: "Le syndic peut-il piloter le projet sans nous ?",
    answer:
      "Oui, c'est le cas le plus courant. Nous travaillons directement avec le syndic pour l'audit, le dossier AG, l'exécution et le suivi du chantier. Les copropriétaires reçoivent le rapport synthétique pour le vote. Si vous êtes président de conseil syndical et souhaitez impliquer un AMO (assistance maîtrise d'ouvrage), nous travaillons aussi en triangulaire.",
  },
];

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sconnectfrance.fr";
const serviceSchema = generateServiceSchema(
  {
    name: "Relamping LED copropriété & parking",
    description:
      "Relamping LED pour copropriétés, parkings souterrains, halls et communs. Détection de présence, IP65/IK10. Île-de-France.",
    provider: "S Connect",
    areaServed: ["Paris", "La Défense", "Hauts-de-Seine", "Île-de-France"],
    priceRange: "€€",
  },
  siteUrl,
);
const faqSchema = generateFAQSchema(faqs);

const siblings = [
  { name: "Bureau & tertiaire", href: "/services/electricite/relamping/bureau-tertiaire" },
  { name: "Commerce & restaurant", href: "/services/electricite/relamping/commerce-restaurant" },
  { name: "Industriel & entrepôt", href: "/services/electricite/relamping/industriel-entrepot" },
];

export default function RelampingCoproprietePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={injectSchema(serviceSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={injectSchema(faqSchema)} />

      <section className="relative bg-dark-950 py-16 md:py-24 overflow-hidden">
        <Image
          src="/images/services/relamping-copropriete.webp"
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
                { label: "Copropriété & parking" },
              ]}
            />
          </div>
          <div className="max-w-2xl">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-400 rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-emerald-500/30">
              <Car className="w-8 h-8 text-white" />
            </div>
            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-4 leading-tight [text-shadow:_0_2px_20px_rgba(0,0,0,0.6)]">
              Relamping LED copropriété & parking
            </h1>
            <p className="text-xl md:text-2xl font-medium mb-6">
              <BulbText>Charges ÷ 5 · Détection présence · Dossier AG géré</BulbText>
            </p>
            <p className="text-lg text-white/90 leading-relaxed [text-shadow:_0_1px_8px_rgba(0,0,0,0.5)]">
              Halls, paliers, parkings, locaux vélos, escaliers. Nous accompagnons votre syndic du
              dossier AG à la mise en service, en passant par la simulation économique et le suivi
              CEE. Charges d&apos;éclairage divisées par 5 dès la première année.
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

      <section className="section-padding bg-surface">
        <div className="container-custom">
          <SectionTitle badge="Bénéfices ciblés" title="Pourquoi relamper en copropriété maintenant" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b) => {
              const Icon = b.icon;
              return (
                <div key={b.title} className="p-6 rounded-2xl bg-surface-elevated border border-border">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-400 flex items-center justify-center text-white mb-4 shadow-lg">
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

      <section className="section-padding bg-surface-muted">
        <div className="container-custom max-w-4xl">
          <SectionTitle badge="Ce que nous traitons" title="Tous les communs de l'immeuble" />
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: "Hall d'entrée & paliers", desc: "Détection PIR + gradation crépusculaire. Allumage progressif sans heurt." },
              { title: "Parking souterrain", desc: "Luminaires IP65 IK10, détection radar 24h/24, gradation veille 10 % entre passages." },
              { title: "Escaliers & cages", desc: "Conformes décret incendie (éclairage de secours), minuterie intelligente." },
              { title: "Locaux vélos / poubelles / techniques", desc: "Étanchéité renforcée, détection automatique, économie d'usage." },
            ].map((c) => (
              <div key={c.title} className="p-6 rounded-2xl bg-surface border border-border">
                <h3 className="font-display font-bold text-lg text-foreground mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  {c.title}
                </h3>
                <p className="text-foreground-muted text-sm leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-surface">
        <div className="container-custom max-w-4xl">
          <SectionTitle badge="FAQ" title="Copropriété — questions de syndic" />
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem key={faq.question} value={`faq-${i}`}>
                <AccordionTrigger>
                  <span className="flex items-center gap-3 text-left">
                    <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-300">
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
                className="group p-4 rounded-xl bg-surface border border-border hover:border-emerald-300 dark:hover:border-emerald-500 transition-colors text-center"
              >
                <span className="text-foreground font-semibold group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition-colors inline-flex items-center gap-1.5">
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

      <section className="relative py-20 bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 overflow-hidden">
        <NoiseOverlay opacity={0.05} />
        <div className="container-custom relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-white">
            <h2 className="font-display font-bold text-2xl md:text-3xl mb-2">
              Allégeons les charges de votre copropriété.
            </h2>
            <p className="text-emerald-50 text-lg">
              Audit gratuit avec dossier AG clé en main sous 7 jours.
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
