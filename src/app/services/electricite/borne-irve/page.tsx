import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Zap,
  Battery,
  ShieldCheck,
  Building2,
  Home,
  TrendingDown,
  ClipboardCheck,
  CheckCircle2,
  ChevronRight,
  Phone,
  ArrowRight,
  Sparkles,
  HelpCircle,
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
import PricingTable from "@/components/marketing/PricingTable";
import { getPricing } from "@/lib/data/pricing";

export const metadata: Metadata = {
  title: "Installation borne de recharge IRVE — Paris & IDF | S Connect",
  description:
    "Installateur IRVE certifié à Clichy. Bornes de recharge véhicule électrique pour maison, copropriété, entreprise. Aides ADVENIR jusqu'à 1 660 €, certification IRVE niveau 2, garantie décennale.",
  keywords: [
    "installation borne de recharge",
    "IRVE Paris",
    "borne véhicule électrique",
    "prime ADVENIR",
    "borne copropriété",
    "wallbox installation",
    "borne recharge Tesla",
    "électricien IRVE Île-de-France",
  ],
  alternates: { canonical: "/services/electricite/borne-irve" },
  openGraph: {
    title: "Installation borne de recharge IRVE — S Connect Paris IDF",
    description:
      "Électricien certifié IRVE pour l'installation de bornes de recharge VE. Maison, copropriété, entreprise. Aides ADVENIR jusqu'à 1 660 €.",
    images: ["/images/services/electricite-installation.webp"],
    type: "website",
  },
};

const benefits = [
  {
    icon: ShieldCheck,
    title: "Installateur IRVE certifié",
    desc: "Habilitation IRVE niveau 2 (jusqu'à 22 kW) délivrée par Qualifelec. Obligatoire au-delà de 3,7 kW + condition de la prime ADVENIR.",
  },
  {
    icon: TrendingDown,
    title: "Aides ADVENIR jusqu'à 1 660 €",
    desc: "Prime CEE dédiée VE : 600 € pour une maison individuelle, jusqu'à 1 660 € en copropriété (résident) et 960 € en tertiaire par place.",
  },
  {
    icon: Battery,
    title: "Wallbox 7 à 22 kW",
    desc: "Sélection Schneider EVlink, Hager XEV, Wallbox Pulsar, Legrand Green'Up. Type 2 français, connectée RFID/4G, pilotable smartphone.",
  },
  {
    icon: ClipboardCheck,
    title: "Garantie décennale + sécurité",
    desc: "Pose conforme NF C 15-100 §771. Différentiel type B obligatoire 30 mA, protection surcharge, mise à la terre vérifiée.",
  },
];

const useCases = [
  {
    icon: Home,
    title: "Maison individuelle",
    desc: "Tableau divisionnaire dédié, wallbox murale 7 ou 11 kW, gestion délestage si abonnement insuffisant. Prime ADVENIR 600 € en parking privé.",
  },
  {
    icon: Building2,
    title: "Copropriété",
    desc: "Droit à la prise (loi 2014) : tout copropriétaire peut équiper son emplacement. Infrastructure collective ou solution individuelle. Aides jusqu'à 1 660 €.",
  },
  {
    icon: Sparkles,
    title: "Bureau & tertiaire",
    desc: "Bornes 22 kW pour parking flotte ou salariés. Supervision multi-sites, badge RFID, refacturation. Aides ADVENIR 960 € par point de charge.",
  },
];

const faqs = [
  {
    question: "Suis-je obligé de prendre un installateur IRVE certifié ?",
    answer:
      "Oui pour toute borne au-dessus de 3,7 kW (arrêté du 12 janvier 2017). C'est aussi la condition pour bénéficier de la prime ADVENIR. S Connect détient l'habilitation IRVE niveau 2 délivrée par Qualifelec, valable pour les bornes jusqu'à 22 kW.",
  },
  {
    question: "Combien coûte une borne de recharge installée à domicile ?",
    answer:
      "Pour une maison individuelle, comptez 1 290 à 2 200 € TTC pose + matériel (wallbox 7 kW Type 2 + tableau divisionnaire + différentiel type B + 5 à 15 mètres de câble). En copropriété, prévoir 1 800 à 3 500 € selon la distance au TGBT et l'infrastructure collective éventuelle. Aides ADVENIR à déduire.",
  },
  {
    question: "Comment fonctionne la prime ADVENIR ?",
    answer:
      "ADVENIR est une prime CEE dédiée à la mobilité électrique. Nous instruisons le dossier à votre place : devis avec mention « éligible ADVENIR », photo après pose, attestation de mise en service. La prime est versée 4 à 8 semaines après pose. Montants 2026 : 600 € en maison individuelle, 1 660 € en copropriété résidentielle (parking privatif), 960 € en tertiaire par point de charge.",
  },
  {
    question: "Mon installation électrique supporte-t-elle une borne 7 kW ?",
    answer:
      "Avec un abonnement Enedis standard 9 kVA monophasé, oui — à condition d'avoir un délestage actif (la borne ralentit si vous mettez en marche four + lave-vaisselle simultanément). Pour 11 ou 22 kW, il faut un raccordement triphasé (souvent une demande Enedis 12 kVA tri à environ 50 € de modification + 5 mois). Nous étudions ça en phase d'audit gratuit.",
  },
  {
    question: "Et si j'habite en copropriété ?",
    answer:
      "Vous avez un « droit à la prise » depuis la loi du 17 août 2015 : votre demande au syndic ne peut être refusée sans motif sérieux. Nous proposons soit une solution individuelle (compteur dédié + sous-comptage personnel), soit une infrastructure collective IRVE en accord avec le syndic. La prime ADVENIR atteint 1 660 € par place de parking résident dans ce cas.",
  },
  {
    question: "Quelle est la durée de vie d'une wallbox ?",
    answer:
      "Les wallbox professionnelles (Schneider, Hager, Wallbox, Legrand) ont une durée de vie typique de 10 à 15 ans, avec une garantie constructeur de 2 à 5 ans selon les modèles. Nous proposons un contrat de maintenance annuelle (test différentiel, contrôle visuel des connexions, mise à jour firmware) à partir de 90 € TTC par an.",
  },
];

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sconnectfrance.fr";
const serviceSchema = generateServiceSchema(
  {
    name: "Installation de borne de recharge IRVE",
    description:
      "Installation et maintenance de bornes de recharge pour véhicule électrique par un électricien certifié IRVE niveau 2. Maison, copropriété, entreprise. Aides ADVENIR gérées.",
    provider: "S Connect",
    areaServed: ["Paris", "Clichy", "Hauts-de-Seine", "Île-de-France"],
    priceRange: "€€",
  },
  siteUrl,
);
const faqSchema = generateFAQSchema(faqs);

export default function BorneIrvePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={injectSchema(serviceSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={injectSchema(faqSchema)} />

      {/* Hero */}
      <section className="relative bg-dark-950 py-16 md:py-24 overflow-hidden">
        <Image
          src="/images/services/electricite-installation.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-55"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-950 from-0% via-dark-950/75 via-50% to-dark-950/35 to-100%" />
        <NoiseOverlay opacity={0.04} />
        <div className="container-custom relative z-10">
          <div className="mb-6">
            <Breadcrumbs
              light
              items={[
                { label: "Services", href: "/services" },
                { label: "Électricité", href: "/services/electricite" },
                { label: "Borne de recharge IRVE" },
              ]}
            />
          </div>
          <div className="max-w-2xl">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-electric-500 rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-primary-500/30">
              <Battery className="w-8 h-8 text-white" />
            </div>
            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-4 leading-tight [text-shadow:_0_2px_20px_rgba(0,0,0,0.6)]">
              Installation borne de recharge VE
            </h1>
            <p className="text-xl md:text-2xl font-medium mb-6">
              <BulbText>IRVE certifié · Aides ADVENIR · Garantie décennale</BulbText>
            </p>
            <p className="text-lg text-white/90 leading-relaxed [text-shadow:_0_1px_8px_rgba(0,0,0,0.5)]">
              Maison, copropriété ou bureau. Nous installons votre borne 7 à 22 kW, gérons
              le dossier ADVENIR de A à Z et délivrons une installation conforme NF C 15-100 §771.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/demande-devis" className="btn-primary btn-lg shadow-xl shadow-primary-700/30">
                Devis gratuit
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
            badge="Pourquoi nous"
            title="Une installation IRVE conforme, primée, durable"
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
                  <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">{b.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Cas d'usage */}
      <section className="section-padding bg-surface-muted">
        <div className="container-custom max-w-5xl">
          <SectionTitle
            badge="Cas d'usage"
            title="Trois configurations, trois approches"
            subtitle="Chaque environnement a ses contraintes techniques et ses aides spécifiques. Nous concevons la solution adaptée."
          />
          <div className="grid md:grid-cols-3 gap-6">
            {useCases.map((c) => {
              const Icon = c.icon;
              return (
                <div key={c.title} className="p-6 rounded-2xl bg-surface border border-border">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-electric-500 flex items-center justify-center text-white mb-4 shadow-lg">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-foreground mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary-500" />
                    {c.title}
                  </h3>
                  <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">{c.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Méthode */}
      <section className="section-padding bg-surface">
        <div className="container-custom max-w-4xl">
          <SectionTitle
            badge="Notre méthode"
            title="De l'audit au branchement, en 4 étapes"
          />
          <ol className="space-y-4">
            {[
              {
                step: "1",
                title: "Audit gratuit sur place ou téléphonique",
                desc: "Étude du tableau électrique, mesure des sections de câble, distance au futur emplacement, calcul de puissance disponible.",
              },
              {
                step: "2",
                title: "Devis ferme + dossier ADVENIR",
                desc: "Choix de la wallbox (puissance, marque, smart), devis détaillé matériel + pose, instruction du dossier ADVENIR.",
              },
              {
                step: "3",
                title: "Installation en une journée",
                desc: "Pose du tableau divisionnaire dédié, différentiel type B 30 mA, câblage jusqu'à la borne, fixation murale, test de fonctionnement.",
              },
              {
                step: "4",
                title: "Mise en service + déclaration Consuel si besoin",
                desc: "Test de charge sur votre véhicule, configuration de l'app, remise des documents (attestation conformité, certificat IRVE, garanties).",
              },
            ].map((s) => (
              <li key={s.step} className="flex gap-5 p-5 rounded-2xl bg-surface-elevated border border-border">
                <div className="shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-electric-500 flex items-center justify-center text-white font-display font-bold text-lg shadow-lg">
                  {s.step}
                </div>
                <div>
                  <h3 className="font-display font-bold text-foreground mb-1">{s.title}</h3>
                  <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Pricing — centralized data */}
      <PricingTable variant="muted" {...getPricing("electricite/borne-irve")} />

      {/* FAQ */}
      <section className="section-padding bg-surface">
        <div className="container-custom max-w-4xl">
          <SectionTitle badge="FAQ" title="Les questions qu'on nous pose" />
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

      {/* Sibling links */}
      <section className="py-16 bg-surface-muted border-t border-border">
        <div className="container-custom">
          <h3 className="font-display font-bold text-2xl text-foreground mb-6 text-center">
            Autres services électricité
          </h3>
          <div className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {[
              { name: "Installation & rénovation", href: "/services/electricite/installation-renovation" },
              { name: "Mise aux normes", href: "/services/electricite/mise-aux-normes" },
              { name: "Relamping LED", href: "/services/electricite/relamping" },
            ].map((s) => (
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
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 bg-gradient-to-r from-primary-700 via-primary-600 to-electric-600 overflow-hidden">
        <NoiseOverlay opacity={0.05} />
        <div className="container-custom relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-white">
            <h2 className="font-display font-bold text-2xl md:text-3xl mb-2">
              Roulez à l&apos;électrique sereinement.
            </h2>
            <p className="text-primary-100 text-lg">
              Audit gratuit + dossier ADVENIR géré + pose en 1 jour.
            </p>
          </div>
          <div className="flex gap-4">
            <Link href="/demande-devis" className="btn-white btn-lg">
              Demander un audit
              <ChevronRight className="w-5 h-5" />
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
