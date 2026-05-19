import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Store,
  CheckCircle2,
  ChevronRight,
  Phone,
  HelpCircle,
  TrendingDown,
  Lightbulb,
  ArrowRight,
  Palette,
  Sun,
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
  title: "Relamping LED Commerce, Boutique & Restaurant | S Connect Paris",
  description:
    "Relamping LED pour boutiques, restaurants, hôtels et concept stores en Île-de-France. IRC > 90 pour la fidélité des couleurs, scénographie modulable, économies sur 12h d'ouverture quotidienne.",
  keywords: [
    "relamping commerce",
    "éclairage boutique LED",
    "relamping restaurant",
    "IRC 90 LED",
    "scénographie LED",
    "ambiance restaurant LED",
    "track LED magasin",
  ],
  alternates: { canonical: "/services/electricite/relamping/commerce-restaurant" },
};

const benefits = [
  {
    icon: Palette,
    title: "IRC > 90 — couleurs fidèles",
    desc: "Vos produits gardent leur vraie teinte sous LED. Crucial pour la mode, la cosmétique, la maroquinerie, la gastronomie.",
  },
  {
    icon: Sun,
    title: "Scénographie modulable",
    desc: "Scènes matin / journée / soir / fermeture. Une boutique peut littéralement changer d'ambiance en un clic.",
  },
  {
    icon: TrendingDown,
    title: "−70 % sur 12h/jour",
    desc: "Un commerce ouvert 12h/jour à éclairage intensif amortit un relamping en 18-24 mois, primes CEE incluses.",
  },
  {
    icon: Lightbulb,
    title: "Track + spots LED précis",
    desc: "Faisceaux 15°/24°/36° selon le produit. Mise en valeur ciblée, ombres maîtrisées, finition pro.",
  },
];

const faqs = [
  {
    question: "Pourquoi l'IRC est-il critique en commerce ?",
    answer:
      "L'IRC (Indice de Rendu des Couleurs) mesure la fidélité des couleurs sous une source. À IRC 80 (LED standard), le rouge d'une robe devient légèrement orange, le bleu vire au gris. À IRC > 90 (LED premium), les couleurs sont restituées comme sous le soleil. C'est non négociable pour la mode, la cosmétique, la viande, le poisson, le pain.",
  },
  {
    question: "Peut-on garder l'ambiance chaude d'un restaurant en LED ?",
    answer:
      "Absolument. Nous utilisons des LED 2700 K (équivalent halogène, très chaud) voire 2200 K (filament Edison-style) pour les ambiances cosy. Avec dimming sans scintillement, l'effet est rigoureusement identique à un halogène, en consommant 6 à 10 fois moins.",
  },
  {
    question: "Le chantier peut-il se faire sans fermer la boutique ?",
    answer:
      "Oui. 80 % de nos chantiers commerce se font de nuit (22h-6h) ou en lundi (jour de fermeture courant). Une boutique de 200 m² avec 50 spots track se fait en 2 nuits. Nous gérons l'enlèvement du matériel et le nettoyage : à l'ouverture, tout est propre.",
  },
  {
    question: "Comment moduler l'ambiance selon les heures ?",
    answer:
      "Nous installons un contrôleur DALI ou Casambi (sans-fil) qui pilote les scènes via une appli mobile ou un panneau mural. Exemple : 'Matin' = 5000 K vif pour le restock, 'Journée' = 3500 K équilibré, 'Soir' = 2700 K chaleureux, 'Fermeture' = mise en veille des vitrines uniquement. Vos équipes basculent en un tap.",
  },
  {
    question: "Quel ROI pour un restaurant de 80 couverts ?",
    answer:
      "Sur un restaurant ouvert midi + soir (10h/jour), avec 40 sources halogènes + 6 suspensions, l'économie annuelle typique est de 3 500 à 5 000 €. Coût matériel + pose : 8-12 k€. Prime CEE : 35-45 % du matériel. ROI net : 16-22 mois. Et fin des changements d'ampoules hebdomadaires.",
  },
];

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sconnectfrance.fr";
const serviceSchema = generateServiceSchema(
  {
    name: "Relamping LED commerce & restaurant",
    description:
      "Relamping LED pour commerces, boutiques, restaurants et hôtels. IRC > 90, track LED, scénographie modulable. Île-de-France.",
    provider: "S Connect",
    areaServed: ["Paris", "La Défense", "Hauts-de-Seine", "Île-de-France"],
    priceRange: "€€€",
  },
  siteUrl,
);
const faqSchema = generateFAQSchema(faqs);

const siblings = [
  { name: "Bureau & tertiaire", href: "/services/electricite/relamping/bureau-tertiaire" },
  { name: "Copropriété & parking", href: "/services/electricite/relamping/copropriete-parking" },
  { name: "Industriel & entrepôt", href: "/services/electricite/relamping/industriel-entrepot" },
];

export default function RelampingCommercePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={injectSchema(serviceSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={injectSchema(faqSchema)} />

      <section className="relative bg-dark-950 py-16 md:py-24 overflow-hidden">
        <Image
          src="/images/services/relamping-commerce.webp"
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
                { label: "Commerce & restaurant" },
              ]}
            />
          </div>
          <div className="max-w-2xl">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-400 rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-amber-500/30">
              <Store className="w-8 h-8 text-white" />
            </div>
            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-4 leading-tight [text-shadow:_0_2px_20px_rgba(0,0,0,0.6)]">
              Relamping LED commerce & restaurant
            </h1>
            <p className="text-xl md:text-2xl font-medium mb-6">
              <BulbText>IRC &gt; 90 · Scénographie modulable · Chantier de nuit</BulbText>
            </p>
            <p className="text-lg text-white/90 leading-relaxed [text-shadow:_0_1px_8px_rgba(0,0,0,0.5)]">
              Boutiques de mode, restaurants gastronomiques, hôtels, concept stores. Nous
              transformons votre éclairage en outil de vente — fidélité des couleurs, ambiance
              modulable, économies sur 12h d&apos;ouverture quotidienne.
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
          <SectionTitle badge="Bénéfices ciblés" title="Pourquoi relamper un commerce" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b) => {
              const Icon = b.icon;
              return (
                <div key={b.title} className="p-6 rounded-2xl bg-surface-elevated border border-border">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-400 flex items-center justify-center text-white mb-4 shadow-lg">
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
          <SectionTitle badge="Ce que nous traitons" title="Du concept store au gastronomique" />
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: "Boutique mode & accessoires", desc: "Track LED orientable, IRC 95+, scénographie produit par track-line." },
              { title: "Restaurant & bar", desc: "Suspensions filament-style 2700 K, dimming sans scintillement, scènes matin/midi/soir." },
              { title: "Hôtel — lobby et couloirs", desc: "Éclairage circadien (HCL), détection de présence sur paliers, gestion centralisée." },
              { title: "Concept store & galerie", desc: "Track DMX/DALI, spots à faisceaux variables 15-60°, scénographie évolutive." },
            ].map((c) => (
              <div key={c.title} className="p-6 rounded-2xl bg-surface border border-border">
                <h3 className="font-display font-bold text-lg text-foreground mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-amber-500" />
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
          <SectionTitle badge="FAQ" title="Commerce & restaurant — les questions clés" />
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem key={faq.question} value={`faq-${i}`}>
                <AccordionTrigger>
                  <span className="flex items-center gap-3 text-left">
                    <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-500/15 text-amber-700 dark:text-amber-300">
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
                className="group p-4 rounded-xl bg-surface border border-border hover:border-amber-300 dark:hover:border-amber-500 transition-colors text-center"
              >
                <span className="text-foreground font-semibold group-hover:text-amber-600 dark:group-hover:text-amber-300 transition-colors inline-flex items-center gap-1.5">
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

      <section className="relative py-20 bg-gradient-to-r from-amber-600 via-orange-500 to-amber-500 overflow-hidden">
        <NoiseOverlay opacity={0.05} />
        <div className="container-custom relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-white">
            <h2 className="font-display font-bold text-2xl md:text-3xl mb-2">
              Mettons en lumière vos produits.
            </h2>
            <p className="text-amber-50 text-lg">Audit boutique gratuit, ROI précis sous 7 jours.</p>
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
