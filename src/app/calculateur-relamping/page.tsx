import type { Metadata } from "next";
import Link from "next/link";
import { Calculator, ArrowRight, ChevronRight, Phone, Lightbulb } from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import SectionTitle from "@/components/ui/SectionTitle";
import { NoiseOverlay } from "@/components/ui/ambient";
import RelampingROICalculator from "@/components/relamping/RelampingROICalculator";
import BulbText from "@/components/ui/BulbText";
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
  title: "Calculateur relamping LED gratuit — économies, prime, ROI | S Connect",
  description:
    "Estimez en 30 secondes les économies, le coût et le ROI de votre projet relamping LED. 4 typologies (bureau, commerce, copropriété, industriel), calcul des aides post-CEE 2026. Devis ferme sur demande.",
  keywords: [
    "calculateur relamping LED",
    "simulateur économies LED",
    "ROI relamping calcul",
    "coût relamping bureau commerce parking",
    "estimateur projet LED",
  ],
  alternates: { canonical: "/calculateur-relamping" },
  openGraph: {
    title: "Calculateur relamping LED gratuit — économies & ROI",
    description:
      "Estimez en 30 secondes : économies annuelles, coût matériel + pose, ROI. 4 typologies + aides post-CEE 2026.",
    images: ["/images/hero/relamping-lightbulb.webp"],
    type: "website",
  },
};

const faqs = [
  {
    question: "Le calcul est-il vraiment fiable ?",
    answer:
      "Le calculateur applique nos ratios réels d'audits 2026 sur 4 typologies (puissance W/m² existante, économies typiques 65-80 %, prix unitaire matériel + pose). C'est un ordre de grandeur ± 15 % — utile pour décider d'engager un audit. Le devis ferme communiqué après audit gratuit est, lui, sans surprise : le devis = la facture.",
  },
  {
    question: "Et la prime CEE est-elle déduite ?",
    answer:
      "Non : les fiches CEE éclairage BAT-EQ-127 (tertiaire), IND-BA-116 (industrie) et BAR-EQ-110 (résidentiel) ont été supprimées par arrêté du 23 février 2026. Le calculateur estime le ROI sans CEE. Voir notre article dédié : « Suppression des primes CEE éclairage LED en 2026 ».",
  },
  {
    question: "Quelles sont les hypothèses derrière le calcul ?",
    answer:
      "Puissance existante moyenne : bureau 28 W/m², commerce 25 W/m², copropriété 5 W/m², industriel 10 W/m². Économies LED : 65 à 80 % selon typologie (gestion DALI incluse). Prix matériel + pose 2026 : 8 à 70 €/m² selon typologie. Tarif électricité par défaut 0,2516 €/kWh HT (tarif bleu pro mai 2026, ajustable).",
  },
  {
    question: "Le calcul fonctionne aussi pour la borne IRVE ou la mise aux normes ?",
    answer:
      "Non — ce calculateur est dédié au relamping LED. Pour les bornes IRVE (avec prime ADVENIR jusqu'à 1 660 €), consultez notre page dédiée /services/electricite/borne-irve qui détaille les prix par configuration. Pour la mise aux normes électriques, le calculateur n'est pas adapté car le périmètre dépend trop du diagnostic initial — demandez un audit gratuit.",
  },
  {
    question: "Combien dure un projet relamping après le calcul ?",
    answer:
      "Audit + devis ferme : 7 jours ouvrés. Commande du matériel : 2 à 4 semaines de délai fournisseur. Pose : 1 à 5 jours pour un bureau de 600 m², 1 à 2 semaines pour un entrepôt de 5 000 m², majoritairement en horaires décalés (soir/week-end) sans perturber l'activité.",
  },
];

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sconnectfrance.fr";
const serviceSchema = generateServiceSchema(
  {
    name: "Calculateur relamping LED — estimation gratuite",
    description:
      "Estimation gratuite en 30 secondes : économies annuelles, coût d'installation et ROI pour un projet relamping LED en Île-de-France. 4 typologies couvertes (bureau, commerce, copropriété, industriel).",
    provider: "S Connect",
    areaServed: ["Paris", "Clichy", "Hauts-de-Seine", "Île-de-France"],
    priceRange: "Gratuit",
  },
  siteUrl,
);
const faqSchema = generateFAQSchema(faqs);

export default function CalculateurRelampingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={injectSchema(serviceSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={injectSchema(faqSchema)} />

      {/* Hero */}
      <section className="relative bg-dark-950 py-16 md:py-24 overflow-hidden">
        <NoiseOverlay opacity={0.04} />
        <div className="absolute top-1/4 -left-32 w-[30rem] h-[30rem] rounded-full blur-3xl animate-drift bg-electric-500/20" />
        <div className="absolute bottom-0 -right-32 w-[30rem] h-[30rem] rounded-full blur-3xl animate-drift-reverse bg-primary-500/20" />

        <div className="container-custom relative z-10">
          <div className="mb-6">
            <Breadcrumbs
              light
              items={[
                { label: "Calculateur relamping" },
              ]}
            />
          </div>
          <div className="max-w-3xl">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-electric-500 rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-primary-500/30">
              <Calculator className="w-8 h-8 text-white" />
            </div>
            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-4 leading-tight [text-shadow:_0_2px_20px_rgba(0,0,0,0.6)]">
              Calculateur relamping LED
            </h1>
            <p className="text-xl md:text-2xl font-medium mb-6">
              <BulbText>Économies, coût et ROI estimés en 30 secondes</BulbText>
            </p>
            <p className="text-lg text-white/90 leading-relaxed [text-shadow:_0_1px_8px_rgba(0,0,0,0.5)]">
              4 typologies (bureau, commerce, copropriété, industriel), ratios issus de
              nos audits 2026 réels en Île-de-France. Précision ± 15 % suffisante
              pour décider d&apos;engager un audit gratuit.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator */}
      <RelampingROICalculator />

      {/* Use cases */}
      <section className="section-padding bg-surface">
        <div className="container-custom max-w-4xl">
          <SectionTitle
            badge="Pour qui ce calcul"
            title="Conçu pour 4 profils de décideur"
            subtitle="Chaque typologie a ses ratios propres : ce qu'on installe en bureau ne s'applique pas tel quel en parking."
          />
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                title: "Directeur immobilier / responsable tertiaire",
                desc: "Bureaux > 500 m² avec horaires intensifs. Cible : conformité décret tertiaire 2030, ROI < 4 ans, gestion DALI.",
                href: "/services/electricite/relamping/bureau-tertiaire",
              },
              {
                title: "Gérant de commerce ou restaurant",
                desc: "Boutique 50-300 m². Cible : valorisation produit (IRC > 90), ambiance, économies sur poste éclairage qui pèse souvent 50 % de la facture élec.",
                href: "/services/electricite/relamping/commerce-restaurant",
              },
              {
                title: "Syndic / conseil syndical",
                desc: "Halls, paliers, parkings de copropriété. Cible : détection de présence, fin des changements d'ampoules récurrents, économies parties communes.",
                href: "/services/electricite/relamping/copropriete-parking",
              },
              {
                title: "Responsable industriel / logistique",
                desc: "Entrepôt 1 000 m²+, atelier, plateforme. Cible : IK10 anti-chocs, IP65 anti-poussière, économies massives (80 %+ vs sodium HF).",
                href: "/services/electricite/relamping/industriel-entrepot",
              },
            ].map((c) => (
              <Link
                key={c.href}
                href={c.href}
                className="p-5 rounded-2xl bg-surface-elevated border border-border hover:border-primary-300 dark:hover:border-primary-500 transition-colors group"
              >
                <h3 className="font-display font-bold text-foreground mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-300 transition-colors inline-flex items-center gap-2">
                  {c.title}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </h3>
                <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">{c.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-surface-muted">
        <div className="container-custom max-w-4xl">
          <SectionTitle badge="FAQ" title="Questions fréquentes sur le calcul" />
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem key={faq.question} value={`faq-${i}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>
                  <p className="leading-relaxed">{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Cross-links */}
      <section className="section-padding bg-surface">
        <div className="container-custom max-w-3xl text-center">
          <Lightbulb className="w-12 h-12 text-primary-500 mx-auto mb-4" />
          <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-3">
            Le calcul est OK ? Passons à l&apos;audit gratuit.
          </h2>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
            Le calculateur donne un ordre de grandeur. L&apos;audit gratuit sur place — mesures
            luxmètre, plan de calepinage, devis ferme sous 7 jours — confirme les chiffres
            et engage l&apos;intervention.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Link href="/demande-devis" className="btn-primary btn-lg shadow-xl shadow-primary-700/30">
              Audit gratuit
              <ChevronRight className="w-5 h-5" />
            </Link>
            <a href="tel:+33652820685" className="btn-outline btn-lg">
              <Phone className="w-5 h-5" />
              06 52 82 06 85
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
