import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { DoorOpen, ChevronRight, Phone, Check, ArrowLeft, Sparkles, HelpCircle, Flame } from "lucide-react";
import { AuroraBackdrop, NoiseOverlay } from "@/components/ui/ambient";
import { image } from "@/lib/image-manifest";
import BulbText from "@/components/ui/BulbText";
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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sconnectfrance.fr";

// Search Console 90 j : la demande sur cette page est très majoritairement
// « porte coupe-feu ERP », pas « porte métallique » —
//   quelle différence asservissement intégré / déporté  18 imp  pos 22,7
//   porte coupe feu asservie                             9 imp  pos 27,9
//   ei30 ei60                                            9 imp  pos 11,9
//   porte coupe feu reglementation erp                   7 imp  pos 27,9
//   porte coupe feu erp / non asservie                   6 imp  pos ~25
// plus l'article /actualites/porte-coupe-feu-ei30-ei60-erp à 63 imp (pos 21,6).
// L'article capte le trafic informationnel, mais la page commerciale ne
// reprenait le sujet qu'en liste à puces — rien à convertir dessus.
export const metadata: Metadata = {
  alternates: { canonical: "/services/metallerie/fabrication-porte" },
  title: "Porte coupe-feu EI30/EI60 & portes métalliques sur mesure",
  description: "Portes coupe-feu EI30, EI60, EI120 pour ERP, avec asservissement DAS intégré ou déporté conforme NF S 61-937. Également portes d'entrée blindées, de garage et techniques, fabriquées sur mesure en Île-de-France.",
  keywords: ["porte coupe-feu", "porte coupe-feu ERP", "EI30", "EI60", "porte DAS", "asservissement porte coupe-feu", "porte métallique", "fabrication porte acier", "porte sur mesure", "porte garage métallique"],
  openGraph: {
    title: "Porte coupe-feu EI30/EI60 & portes métalliques sur mesure",
    description: "Portes coupe-feu ERP avec asservissement DAS, portes d'entrée blindées, de garage et techniques. Fabrication et pose en Île-de-France.",
    images: ["/og-image.jpg"],
  },
};

const features = [
  "Portes d'entrée blindées",
  "Portes de garage sectionnelles",
  "Portes techniques et de service",
  "Portes coupe-feu certifiées",
  "Sur mesure et standard",
  "Pose professionnelle incluse",
];

const types = [
  {
    name: "Porte d'entrée",
    description: "Portes blindées haute sécurité avec finitions personnalisables.",
  },
  {
    name: "Porte de garage",
    description: "Sectionnelles, basculantes ou enroulables, motorisées ou manuelles.",
  },
  {
    name: "Porte technique",
    description: "Portes de cave, de local technique, de chaufferie.",
  },
  {
    name: "Porte coupe-feu",
    description: "Portes certifiées EI30, EI60, EI120 pour la sécurité incendie.",
  },
];

const faqs = [
  {
    question: "Asservissement intégré ou déporté : quelle différence ?",
    answer:
      "Les deux libèrent la porte au signal du CMSI, mais le matériel n'est pas au même endroit. En déporté, une ventouse électromagnétique 24 V à rupture est fixée au mur et retient une contre-plaque articulée posée sur le vantail — c'est la solution la plus économique et la plus souple, mais elle suppose un mur exploitable à côté de la porte. En intégré, le mécanisme est logé dans un pivot de linteau, en traverse haute de l'huisserie : rien n'est visible au mur, ce qui est souvent la seule option dans un couloir étroit ou quand l'architecte refuse l'appareillage apparent.",
  },
  {
    question: "Que veulent dire EI30, EI60 et EI120 ?",
    answer:
      "E désigne l'étanchéité aux flammes et aux gaz chauds, I l'isolation thermique — la face non exposée ne doit pas s'échauffer au-delà du seuil réglementaire. Le nombre est la durée en minutes pendant laquelle les deux critères sont tenus. EI30 vaut donc 30 minutes, EI60 une heure, EI120 deux heures. Le degré exigé dépend du classement de l'ERP et de la zone à recouper ; il est fixé par le règlement de sécurité, pas par le maître d'ouvrage.",
  },
  {
    question: "Comment fonctionne une porte coupe-feu asservie ?",
    answer:
      "Elle reste maintenue ouverte au quotidien, ce qui évite qu'on la cale avec un extincteur — la dérive la plus courante en exploitation. À la détection d'un départ de feu, le SSI coupe l'alimentation de la ventouse. La porte, libérée, est refermée par son ferme-porte, et le compartimentage est rétabli sans intervention humaine. Le maintien en position ouverte relève de la NF S 61-937, qui encadre les dispositifs actionnés de sécurité.",
  },
  {
    question: "Une porte coupe-feu peut-elle rester non asservie ?",
    answer:
      "Oui, à condition d'être équipée d'un ferme-porte et de rester fermée en permanence. C'est acceptable sur un local technique ou une chaufferie peu fréquentés. Dès qu'un passage régulier existe, la porte finit calée ouverte et ne protège plus rien : l'asservissement devient alors la seule solution qui tienne dans la durée.",
  },
  {
    question: "Fabriquez-vous aussi des portes d'entrée et de garage ?",
    answer:
      "Oui. Portes d'entrée blindées, portes de garage sectionnelles, basculantes ou enroulables, portes techniques de cave et de local. Toutes sont fabriquées à vos cotes en acier, avec finition thermolaquée dans la teinte RAL de votre choix.",
  },
  {
    question: "Quel délai entre le relevé et la pose ?",
    answer:
      "Comptez 4 à 6 semaines pour une porte technique ou une porte d'entrée standard. Une porte coupe-feu certifiée dépend du délai du fabricant sur le bloc-porte et de sa dimension — 6 à 10 semaines est réaliste, davantage en grande largeur. Les cotes hors normes allongent toujours le délai, jamais la pose.",
  },
  {
    question: "Intervenez-vous en site occupé ?",
    answer:
      "Oui, c'est le cas de figure habituel en ERP et en copropriété. Nous travaillons par phases pour maintenir les issues praticables, et nous pouvons intervenir en horaires décalés quand la fréquentation l'impose.",
  },
  {
    question: "Que remettez-vous à la réception ?",
    answer:
      "Le procès-verbal de classement du bloc-porte, la notice du dispositif d'asservissement et le compte rendu d'essai de refermeture. Ce sont les pièces que la commission de sécurité demande — et celles qui manquent le plus souvent sur les installations que nous reprenons.",
  },
];

const serviceSchema = generateServiceSchema(
  {
    name: "Fabrication et pose de portes métalliques et portes coupe-feu",
    description:
      "Portes coupe-feu EI30, EI60 et EI120 pour ERP avec asservissement DAS intégré ou déporté conforme NF S 61-937, portes d'entrée blindées, portes de garage et portes techniques sur mesure en acier.",
    provider: "S Connect France",
    areaServed: ["Île-de-France", "Hauts-de-Seine", "Paris", "Seine-Saint-Denis", "Val-de-Marne", "Yvelines", "Val-d'Oise"],
  },
  siteUrl,
);

const faqSchema = generateFAQSchema(faqs);

export default function FabricationPortePage() {
  const hero = image("metallerie-garde-corps");
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={injectSchema(serviceSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={injectSchema(faqSchema)} />
      {/* Hero */}
      <section className="relative bg-dark-950 py-16 md:py-24 overflow-hidden">
        <AuroraBackdrop intensity="soft" />
        <div className="absolute inset-0 bg-grid opacity-[0.12]" />
        <div className="absolute top-1/4 -left-32 w-[30rem] h-[30rem] rounded-full blur-3xl animate-drift bg-orange-500/30" />
        <div className="absolute bottom-0 -right-32 w-[30rem] h-[30rem] rounded-full blur-3xl animate-drift-reverse bg-rose-500/25" />
        <NoiseOverlay opacity={0.05} />

        <div className="container-custom relative z-10">
          <Breadcrumbs
            light
            className="mb-6"
            items={[
              { label: "Services", href: "/services" },
              { label: "Métallerie", href: "/services/metallerie" },
              { label: "Fabrication de portes" },
            ]}
          />
          <Link
            href="/services/metallerie"
            className="inline-flex items-center gap-2 text-orange-300 hover:text-orange-200 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour à Métallerie
          </Link>
          <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] items-center">
            <div className="max-w-2xl">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-rose-500 rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-orange-500/30">
                <DoorOpen className="w-8 h-8 text-white" />
              </div>
              <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-4 leading-tight">
                Portes coupe-feu &amp; portes métalliques
              </h1>
              <p className="text-xl md:text-2xl font-medium mb-6">
              <BulbText>EI30, EI60, EI120 · asservissement DAS · sur mesure</BulbText>
            </p>
              <p className="text-lg text-dark-300 leading-relaxed">
                Portes métalliques sur mesure pour tous vos besoins : entrée, garage, technique, coupe-feu.
                Sécurité et qualité garanties.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/demande-devis" className="btn-primary">
                  Devis gratuit
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                <Image
                  src={hero.webp}
                  alt={hero.alt}
                  fill
                  sizes="(max-width: 1024px) 0px, 42vw"
                  className="object-cover"
                  placeholder="blur"
                  blurDataURL={hero.blurDataURL}
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-dark-950/80 via-transparent to-transparent" />
                <div className="absolute inset-0 gradient-veil-warm opacity-30 mix-blend-overlay" />
                <div className="absolute top-4 right-4 glass-panel rounded-xl px-4 py-2.5 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-white" />
                  <span className="text-sm font-semibold text-white">Pose pro incluse</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding bg-surface">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-6">
                Nos prestations portes
              </h2>
              <p className="text-foreground-muted mb-8 leading-relaxed">
                Nous fabriquons tous types de portes métalliques sur mesure. 
                De la porte d&apos;entrée blindée à la porte coupe-feu certifiée, 
                nous répondons à tous vos besoins de sécurité.
              </p>
              <ul className="grid grid-cols-2 gap-4">
                {features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-orange-600" />
                    </div>
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-8">
              <h3 className="font-semibold text-foreground mb-4">Types de portes</h3>
              <div className="space-y-4">
                {types.map((type) => (
                  <div key={type.name} className="bg-surface rounded-xl p-4 shadow-sm">
                    <h4 className="font-semibold text-foreground">{type.name}</h4>
                    <p className="text-foreground-muted text-sm mt-1">{type.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Coupe-feu ERP ───
          C'est là qu'est la demande mesurée (≈112 impressions sur le cluster
          coupe-feu, contre presque rien sur « porte métallique »), et le sujet
          n'existait ici que sous forme d'une puce dans une liste. */}
      <section className="section-padding bg-surface">
        <div className="container-custom max-w-4xl">
          <div className="flex items-start gap-4 mb-8">
            <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-700">
              <Flame className="h-5 w-5" />
            </span>
            <div>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-3">
                Portes coupe-feu en ERP
              </h2>
              <p className="text-foreground-muted leading-relaxed">
                Une porte coupe-feu n&apos;isole que si elle est fermée au moment
                du sinistre. Tout le sujet tient dans cette phrase : le classement
                du vantail ne vaut rien si la porte est calée ouverte, et
                l&apos;asservissement est ce qui règle le problème sans compter sur
                la discipline des occupants.
              </p>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                code: "EI30 · EI60 · EI120",
                titre: "Le classement",
                texte:
                  "E pour l'étanchéité aux flammes et aux gaz chauds, I pour l'isolation thermique, le nombre pour la durée en minutes. Le degré exigé découle du classement de l'ERP et de la zone à recouper — il est imposé, pas choisi.",
              },
              {
                code: "NF S 61-937",
                titre: "Le maintien ouvert",
                texte:
                  "Norme des dispositifs actionnés de sécurité. À la détection, le SSI coupe l'alimentation de la ventouse ; la porte libérée est refermée par son ferme-porte et le compartimentage se rétablit seul.",
              },
              {
                code: "Intégré ou déporté",
                titre: "L'asservissement",
                texte:
                  "Déporté : ventouse 24 V au mur et contre-plaque sur le vantail — économique, souple, mais il faut un mur exploitable. Intégré : mécanisme logé dans le pivot de linteau, rien d'apparent — la solution des couloirs étroits.",
              },
            ].map((n) => (
              <div key={n.code} className="rounded-2xl border border-border bg-surface-muted p-6">
                <span className="font-mono text-xs tracking-wider text-orange-700 dark:text-orange-400">
                  {n.code}
                </span>
                <h3 className="font-display font-bold text-lg text-foreground mt-1 mb-2">
                  {n.titre}
                </h3>
                <p className="text-sm text-foreground-muted leading-relaxed">{n.texte}</p>
              </div>
            ))}
          </div>

          <p className="text-foreground-muted leading-relaxed mt-8">
            Nous posons le bloc-porte et son asservissement, nous essayons la
            refermeture à la réception, et nous remettons le procès-verbal de
            classement avec le compte rendu d&apos;essai. Pour le détail
            réglementaire, voir notre article{" "}
            <Link href="/actualites/porte-coupe-feu-ei30-ei60-erp" className="text-orange-700 dark:text-orange-300 underline underline-offset-2">
              porte coupe-feu en ERP : EI30, EI60 ou EI90 ?
            </Link>
          </p>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="section-padding bg-surface-muted">
        <div className="container-custom max-w-4xl">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-3">
            Questions fréquentes
          </h2>
          <p className="text-foreground-muted mb-10">
            Ce qu&apos;on nous demande le plus souvent avant un chantier de portes.
          </p>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem key={faq.question} value={`faq-${i}`}>
                <AccordionTrigger>
                  <span className="flex items-center gap-3 text-left">
                    <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-700 dark:bg-orange-500/15 dark:text-orange-300">
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

      {/* CTA */}
      <section className="relative py-20 bg-gradient-to-r from-orange-700 via-orange-600 to-rose-600 overflow-hidden">
        <NoiseOverlay opacity={0.05} />
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse-soft" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: "2s" }} />
        <div className="container-custom relative z-10 text-center">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-4">
            Besoin d&apos;une porte sur mesure ?
          </h2>
          <p className="text-orange-50 mb-8 max-w-2xl mx-auto text-lg">
            Contactez-nous pour un devis gratuit et personnalisé selon vos besoins.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/demande-devis" className="btn-white btn-lg">
              Demander un devis gratuit
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





