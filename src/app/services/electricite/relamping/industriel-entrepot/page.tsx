import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Warehouse,
  CheckCircle2,
  ChevronRight,
  Phone,
  HelpCircle,
  TrendingDown,
  Lightbulb,
  ArrowRight,
  Zap,
  Thermometer,
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
  title: "Relamping LED Industriel & Entrepôt | High-bay & ICPE | S Connect",
  description:
    "Relamping LED pour entrepôts logistiques, ateliers et sites industriels en Île-de-France. High-bay 150 lm/W, IP65, ATEX disponible. Économies massives + réduction de la chaleur dégagée.",
  keywords: [
    "relamping industriel",
    "high-bay LED",
    "éclairage entrepôt LED",
    "atelier LED",
    "ICPE éclairage",
    "ATEX LED",
    "logistique éclairage",
    "IP66 industriel",
  ],
  alternates: { canonical: "/services/electricite/relamping/industriel-entrepot" },
};

const benefits = [
  {
    icon: TrendingDown,
    title: "−75 à −80 % de conso",
    desc: "Sur un parc iodures métalliques 400 W → high-bay LED 150 W. Économie typique : 600-1 000 kWh/an par luminaire.",
  },
  {
    icon: Zap,
    title: "Allumage instantané",
    desc: "Plus de temps de chauffe (5-10 min sur HID). Allumage immédiat = compatibilité détection présence = économie supplémentaire.",
  },
  {
    icon: Thermometer,
    title: "Chaleur dégagée ÷ 4",
    desc: "Moins de chaleur émise par les luminaires = moins de climatisation en été. Bénéfice double sur les sites climatisés.",
  },
  {
    icon: Lightbulb,
    title: "Robustesse IP65 / IK08+",
    desc: "Conçus pour environnements industriels poussiéreux, humides, vibrants. Versions ATEX zones 1/21 et 2/22 disponibles.",
  },
];

const faqs = [
  {
    question: "Quelle technologie remplace un projecteur iodure 400 W ?",
    answer:
      "Un projecteur high-bay LED de 150 à 180 W avec optique adaptée (60°, 90° ou 120° selon hauteur de pose) délivre les mêmes lumens (~18 000-22 000 lm) pour 60 % de puissance en moins. Avec gestion de présence + gradation, on peut encore gagner 30-40 % de conso effective. ROI typique sur un site logistique : 12-18 mois.",
  },
  {
    question: "Les LED tiennent-elles en environnement industriel ?",
    answer:
      "Les LED professionnelles industrielles sont garanties IP65 (étanche poussière + jet d'eau), IK08 ou IK10 (résistance aux chocs), température de service −30 à +50 °C. Les versions stockage froid (entrepôt frigo) descendent à −40 °C. Les versions ATEX sont certifiées pour zones explosives 1/21 (gaz) et 2/22 (poussières). Aucune restriction d'usage.",
  },
  {
    question: "Comment éclairer un entrepôt à 12 m de hauteur ?",
    answer:
      "À 12 m de hauteur, un high-bay LED de 200 W avec optique 90° couvre environ 100 m² au sol avec 300 lux uniformes. Pour un entrepôt de 5000 m², comptez 50 luminaires LED contre 80-100 luminaires iodures métalliques avant relamping. Économie d'investissement matériel ET d'énergie sur la durée.",
  },
  {
    question: "Le relamping est-il éligible aux CEE en industriel ?",
    answer:
      "Oui, via la fiche IND-UT-130 (Système de luminaires à modules LED pour l'industrie). La prime CEE est calculée selon la puissance installée, les heures de fonctionnement et l'économie kWh cumac sur la durée de vie. Sur un entrepôt logistique 24/24, la prime peut couvrir 30-50 % du coût matériel + pose. Nous gérons tout le dossier.",
  },
  {
    question: "Peut-on relamper un site ICPE en production ?",
    answer:
      "Oui, 95 % de nos chantiers industriels se font en production. Nous opérons par zones, en horaires décalés ou pendant les arrêts maintenance planifiés. Pour les zones ATEX, nous coordonnons avec votre HSE et utilisons des permis feu si nécessaire. Aucune coupure de production prolongée — uniquement des coupures locales sur les circuits éclairage de chaque zone.",
  },
];

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sconnectfrance.fr";
const serviceSchema = generateServiceSchema(
  {
    name: "Relamping LED industriel & entrepôt",
    description:
      "Relamping LED pour entrepôts logistiques, ateliers et sites industriels. High-bay LED, IP65, ATEX. Île-de-France.",
    provider: "S Connect",
    areaServed: ["Paris", "Île-de-France"],
    priceRange: "€€€€",
  },
  siteUrl,
);
const faqSchema = generateFAQSchema(faqs);

const siblings = [
  { name: "Bureau & tertiaire", href: "/services/electricite/relamping/bureau-tertiaire" },
  { name: "Commerce & restaurant", href: "/services/electricite/relamping/commerce-restaurant" },
  { name: "Copropriété & parking", href: "/services/electricite/relamping/copropriete-parking" },
];

export default function RelampingIndustrielPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={injectSchema(serviceSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={injectSchema(faqSchema)} />

      <section className="relative bg-dark-950 py-16 md:py-24 overflow-hidden">
        <Image
          src="/images/services/relamping-industriel.webp"
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
                { label: "Industriel & entrepôt" },
              ]}
            />
          </div>
          <div className="max-w-2xl">
            <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-400 rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-violet-500/30">
              <Warehouse className="w-8 h-8 text-white" />
            </div>
            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-4 leading-tight [text-shadow:_0_2px_20px_rgba(0,0,0,0.6)]">
              Relamping LED industriel & entrepôt
            </h1>
            <p className="text-xl md:text-2xl font-medium mb-6 gradient-text-living">
              High-bay 150 lm/W · IP65 · ATEX disponible
            </p>
            <p className="text-lg text-white/90 leading-relaxed [text-shadow:_0_1px_8px_rgba(0,0,0,0.5)]">
              Entrepôts logistiques, ateliers de production, hangars, zones de stockage froid. Nous
              remplaçons vos iodures métalliques 400 W par des high-bay LED 150 W : économies
              massives, chaleur dégagée divisée par 4, et compatibilité ICPE/ATEX.
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
          <SectionTitle badge="Bénéfices ciblés" title="Pourquoi relamper un site industriel" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b) => {
              const Icon = b.icon;
              return (
                <div key={b.title} className="p-6 rounded-2xl bg-surface-elevated border border-border">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-400 flex items-center justify-center text-white mb-4 shadow-lg">
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
          <SectionTitle badge="Ce que nous traitons" title="Du hangar au site ATEX" />
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: "Entrepôt logistique", desc: "High-bay 150-200 W, optique 90-120°, détection radar par allée, gestion centralisée." },
              { title: "Atelier de production", desc: "Éclairage zonal poste par poste, IRC > 80, IP65 anti-poussière fine." },
              { title: "Stockage froid (frigo)", desc: "LED basse température −40 °C, allumage instantané, économie majeure vs HID." },
              { title: "Zone ATEX 1/21 ou 2/22", desc: "Luminaires certifiés ATEX gaz ou poussières, coordination HSE complète." },
            ].map((c) => (
              <div key={c.title} className="p-6 rounded-2xl bg-surface border border-border">
                <h3 className="font-display font-bold text-lg text-foreground mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-violet-500" />
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
          <SectionTitle badge="FAQ" title="Industriel — questions techniques" />
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem key={faq.question} value={`faq-${i}`}>
                <AccordionTrigger>
                  <span className="flex items-center gap-3 text-left">
                    <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-100 dark:bg-violet-500/15 text-violet-700 dark:text-violet-300">
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
                className="group p-4 rounded-xl bg-surface border border-border hover:border-violet-300 dark:hover:border-violet-500 transition-colors text-center"
              >
                <span className="text-foreground font-semibold group-hover:text-violet-600 dark:group-hover:text-violet-300 transition-colors inline-flex items-center gap-1.5">
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

      <section className="relative py-20 bg-gradient-to-r from-violet-700 via-violet-600 to-purple-600 overflow-hidden">
        <NoiseOverlay opacity={0.05} />
        <div className="container-custom relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-white">
            <h2 className="font-display font-bold text-2xl md:text-3xl mb-2">
              Auditons votre site industriel.
            </h2>
            <p className="text-violet-100 text-lg">
              ROI précis, plan de pose ICPE-compatible, sous 7 jours.
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
