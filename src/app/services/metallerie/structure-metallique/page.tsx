import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Shield, ChevronRight, Phone, Check, ArrowLeft, Sparkles, HelpCircle } from "lucide-react";
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

// « garde corps sur mesure » pèse 720 recherches/mois (Semrush FR, KD 29) —
// de loin le plus gros volume de cette page, et il était noyé en 3e position
// du title derrière « Structures Métalliques », qui ne se cherche pas.
// L'article /actualites/garde-corps-norme-nf-p01-012 sort déjà à 16 imp,
// pos 27,9 : la demande normative existe, la page commerciale ne la servait pas.
export const metadata: Metadata = {
  alternates: { canonical: "/services/metallerie/structure-metallique" },
  title: "Garde-corps sur mesure, escaliers et verrières métalliques",
  description: "Garde-corps métalliques sur mesure conformes NF P01-012 et NF P01-013, escaliers, verrières d'atelier et pergolas. Fabrication en atelier et pose en Île-de-France. Devis gratuit.",
  keywords: ["garde-corps sur mesure", "garde-corps métallique", "NF P01-012", "escalier métallique", "verrière atelier", "pergola métallique", "structure métallique", "charpente métallique"],
  openGraph: {
    title: "Garde-corps sur mesure, escaliers et verrières métalliques",
    description: "Garde-corps conformes NF P01-012, escaliers, verrières et pergolas. Fabrication sur mesure en Île-de-France.",
    images: ["/og-image.jpg"],
  },
};

const features = [
  "Garde-corps et rampes",
  "Escaliers métalliques",
  "Verrières intérieures",
  "Pergolas et abris",
  "Charpentes métalliques",
  "Mezzanines",
];

const types = [
  {
    name: "Garde-corps",
    description: "En acier, inox ou aluminium. Design moderne ou classique, conformes aux normes.",
  },
  {
    name: "Escaliers",
    description: "Droits, hélicoïdaux ou à limon central. Structure apparente ou habillée.",
  },
  {
    name: "Verrières",
    description: "Style atelier pour séparer vos espaces tout en laissant passer la lumière.",
  },
  {
    name: "Pergolas",
    description: "Structures extérieures pour terrasses et jardins. Fixes ou bioclimatiques.",
  },
];

const faqs = [
  {
    question: "Quelle norme s'applique à un garde-corps ?",
    answer:
      "La NF P01-012 fixe la géométrie : 1 m de hauteur minimale, écartement des barreaux inférieur ou égal à 11 cm, et zone basse pleine sur 45 cm pour empêcher l'escalade par un enfant. La NF P01-013 traite de la résistance, qui dépend de l'affluence attendue — les efforts admissibles sont plus élevés en ERP qu'en logement. Un garde-corps conforme à l'une sans l'autre n'est pas conforme.",
  },
  {
    question: "Pourquoi 11 cm entre les barreaux ?",
    answer:
      "C'est le seuil au-delà duquel la tête d'un jeune enfant peut passer. C'est aussi le point de non-conformité le plus fréquent sur les garde-corps anciens que nous reprenons : l'écartement paraît anodin à l'œil, il ne l'est pas. Sur une réhabilitation, c'est souvent ce seul critère qui impose le remplacement.",
  },
  {
    question: "Barreaudage vertical ou horizontal ?",
    answer:
      "Vertical dans l'immense majorité des cas. Un barreaudage horizontal forme une échelle et n'est admis qu'en l'absence de risque de chute d'enfant, ce qui exclut de fait le logement et la plupart des ERP. Si le projet architectural impose l'horizontale, on passe généralement par un remplissage verre ou tôle perforée.",
  },
  {
    question: "Fabriquez-vous des verrières d'atelier ?",
    answer:
      "Oui, en profil acier fin, à vos cotes. Nous traitons la verrière intérieure de séparation comme la verrière de toiture. Le vitrage est feuilleté et sa composition dépend de la position — un vitrage de toiture ou au-dessus d'une circulation obéit à des exigences plus strictes qu'une cloison.",
  },
  {
    question: "Quel délai pour un escalier métallique ?",
    answer:
      "6 à 10 semaines selon la complexité. Un escalier droit à limon central va vite ; un quart tournant avec palier intermédiaire demande une étude et un montage à blanc en atelier avant thermolaquage. Le relevé de cotes se fait après gros œuvre, jamais sur plan seul — les tolérances de chantier se paient au montage.",
  },
  {
    question: "Travaillez-vous pour des professionnels du bâtiment ?",
    answer:
      "Oui. Entreprises générales, promoteurs, syndics et bureaux d'études. Nous remettons les plans d'exécution et les notes de calcul quand le marché les exige, et nous nous calons sur le planning du lot gros œuvre.",
  },
];

const serviceSchema = generateServiceSchema(
  {
    name: "Fabrication de garde-corps, escaliers et structures métalliques",
    description:
      "Garde-corps métalliques sur mesure conformes NF P01-012 et NF P01-013, escaliers, verrières d'atelier, pergolas et charpentes légères. Fabrication en atelier et pose en Île-de-France.",
    provider: "S Connect France",
    areaServed: ["Île-de-France", "Hauts-de-Seine", "Paris", "Seine-Saint-Denis", "Val-de-Marne", "Yvelines", "Val-d'Oise"],
  },
  siteUrl,
);

const faqSchema = generateFAQSchema(faqs);

export default function StructureMetalliquePage() {
  const hero = image("metallerie-structure");
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
              { label: "Garde-corps & structures" },
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
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-4 leading-tight">
                Garde-corps &amp; structures métalliques
              </h1>
              <p className="text-xl md:text-2xl font-medium mb-6">
              <BulbText>Conformes NF P01-012, fabriqués en atelier</BulbText>
            </p>
              <p className="text-lg text-dark-300 leading-relaxed">
                Conception et réalisation de structures métalliques sur mesure : garde-corps, escaliers,
                verrières et bien plus. Un savoir-faire artisanal au service de vos projets.
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
                  <span className="text-sm font-semibold text-white">Sur mesure</span>
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
                Nos réalisations structurelles
              </h2>
              <p className="text-foreground-muted mb-8 leading-relaxed">
                De la conception à la pose, nous réalisons tous types de structures métalliques. 
                Chaque projet est unique et fabriqué sur mesure dans notre atelier.
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
              <h3 className="font-semibold text-foreground mb-4">Types de structures</h3>
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

      {/* ─── FAQ ───
          La page n'avait ni schema ni FAQ. Le contenu normatif est ce qui
          performe le mieux sur ce site (EI30, UGR, NF EN 12464-1 en positions
          11-12 contre 37,3 de moyenne) — le garde-corps a le même profil. */}
      <section className="section-padding bg-surface-muted">
        <div className="container-custom max-w-4xl">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-3">
            Questions fréquentes
          </h2>
          <p className="text-foreground-muted mb-10">
            Ce qui revient à chaque étude de garde-corps ou d&apos;escalier.
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
          <p className="text-foreground-muted leading-relaxed mt-8">
            Pour le détail de la norme, voir notre article{" "}
            <Link href="/actualites/garde-corps-norme-nf-p01-012" className="text-orange-700 dark:text-orange-300 underline underline-offset-2">
              garde-corps : ce qu&apos;impose la NF P01-012
            </Link>
            , ou nos{" "}
            <Link href="/garde-corps" className="text-orange-700 dark:text-orange-300 underline underline-offset-2">
              interventions garde-corps commune par commune
            </Link>.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 bg-gradient-to-r from-orange-700 via-orange-600 to-rose-600 overflow-hidden">
        <NoiseOverlay opacity={0.05} />
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse-soft" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: "2s" }} />
        <div className="container-custom relative z-10 text-center">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-4">
            Un projet de structure métallique ?
          </h2>
          <p className="text-orange-50 mb-8 max-w-2xl mx-auto text-lg">
            Contactez-nous pour discuter de votre projet et obtenir un devis personnalisé.
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





