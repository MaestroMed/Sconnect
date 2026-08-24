import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Wrench, ChevronRight, Phone, Check, ArrowLeft, Sparkles, HelpCircle, ShieldCheck } from "lucide-react";
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

// Search Console, 90 j : cette page est la PREMIERE du site en impressions
// (296 sur 2 040, soit 14,5 % de toute la visibilite) — et la seule du top 10
// a 0 clic, en position moyenne 73,7. Les requetes qui la declenchent portent
// toutes l'intention « fabricant » :
//   fabricant de portails (101 imp, pos 60,2) · fabricant portail (90, 91,0)
//   fabricant portail sur mesure (31, 80,6) · fabricants portails (30, 71,4)
//   fabricants de portails coulissants (15, 56,7) · constructeur portail (6, 82,2)
// Le title et le H1 disaient « Fabrication de portails » — le nom du service,
// pas le mot que les gens tapent. Ils cherchent QUI fabrique, pas l'acte.
export const metadata: Metadata = {
  alternates: { canonical: "/services/metallerie/fabrication-portail" },
  title: "Fabricant de portails sur mesure en Île-de-France",
  description: "Fabricant de portails sur mesure en Île-de-France : coulissants, battants, acier, aluminium ou fer forgé. Fabrication en atelier, motorisation conforme NF EN 13241 et EN 12453, pose par nos équipes. Devis gratuit.",
  keywords: ["fabricant de portails", "fabricant portail sur mesure", "portail sur mesure", "portail coulissant", "portail battant", "portail motorisé", "portail acier", "portail fer forgé", "constructeur portail"],
  openGraph: {
    title: "Fabricant de portails sur mesure en Île-de-France",
    description: "Conception, fabrication en atelier et pose de portails sur mesure. Acier, aluminium, fer forgé. Motorisation aux normes.",
    images: ["/og-image.jpg"],
  },
};

const features = [
  "Portails coulissants et battants",
  "Motorisation intégrée",
  "Acier, aluminium, fer forgé",
  "Design personnalisé",
  "Finition thermolaquée",
  "Garantie 10 ans",
];

const types = [
  {
    name: "Portail coulissant",
    description: "Idéal pour les entrées avec peu d'espace. Motorisation fluide et silencieuse.",
  },
  {
    name: "Portail battant",
    description: "Le classique revisité. Ouverture manuelle ou motorisée vers l'intérieur ou l'extérieur.",
  },
  {
    name: "Portail ajouré",
    description: "Design moderne avec barreaux ou motifs décoratifs. Élégance et visibilité.",
  },
  {
    name: "Portail plein",
    description: "Intimité totale. Idéal pour se protéger des regards et du vent.",
  },
];

const faqs = [
  {
    question: "Fabriquez-vous vraiment les portails, ou les revendez-vous ?",
    answer:
      "Nous les fabriquons. Le débit, la soudure, l'assemblage et le montage à blanc se font dans notre atelier, à partir de vos cotes relevées sur site. C'est ce qui permet d'ajuster une largeur atypique, un dévers de terrain ou un motif particulier — trois choses qu'un portail de catalogue ne sait pas faire.",
  },
  {
    question: "Quel délai entre la prise de cotes et la pose ?",
    answer:
      "Comptez 4 à 6 semaines pour un portail acier ou aluminium standard, 6 à 9 semaines pour du fer forgé ouvragé ou une grande largeur nécessitant un renfort. Le thermolaquage représente à lui seul 5 à 10 jours du délai. Une motorisation posée en même temps n'allonge pas le chantier.",
  },
  {
    question: "Acier, aluminium ou fer forgé : lequel choisir ?",
    answer:
      "L'acier thermolaqué est le meilleur rapport résistance/prix et accepte toutes les formes — c'est le choix par défaut en grande largeur. L'aluminium ne rouille pas et reste léger, ce qui ménage la motorisation et les gonds, mais il coûte plus cher et fléchit davantage au-delà de 4 m. Le fer forgé est un choix esthétique : plus lourd, plus cher, demande une reprise de peinture tous les 8 à 10 ans.",
  },
  {
    question: "Coulissant ou battant ?",
    answer:
      "Le coulissant si vous manquez de recul devant l'entrée ou si le terrain est en pente — il ne balaie aucun espace. Il demande en revanche un dégagement latéral égal à la largeur du passage, et un rail au sol ou une conception autoportante. Le battant coûte moins cher et se pose plus vite, mais il lui faut du plat et du recul.",
  },
  {
    question: "Un portail motorisé doit-il respecter des normes ?",
    answer:
      "Oui, et elles sont contraignantes. La NF EN 13241 encadre le produit et impose le marquage CE depuis 2005, au titre de la directive Machines 2006/42/CE. La NF EN 12453 limite l'effort exercé sur un obstacle à 400 N en dynamique et 150 N en statique, et la NF EN 12445 définit les méthodes de mesure. En pratique, cela impose cellules photoélectriques, bords sensibles et feu de signalisation. Un installateur qui ne mesure pas les efforts après pose ne peut pas attester la conformité.",
  },
  {
    question: "Intervenez-vous en copropriété ?",
    answer:
      "Oui, c'est même une grande partie de notre activité portail. Nous remettons un dossier exploitable en assemblée générale : relevé de l'existant, chiffrage détaillé, planning et contraintes d'accès pendant les travaux. Nous savons travailler en site occupé, avec maintien du passage véhicules.",
  },
  {
    question: "Que couvre la garantie ?",
    answer:
      "Dix ans sur la structure métallique et les soudures. La motorisation suit la garantie constructeur, généralement deux à cinq ans selon la marque. Le thermolaquage est garanti contre l'écaillage et la corrosion perforante selon le label du poudreur.",
  },
  {
    question: "Quelle zone couvrez-vous ?",
    answer:
      "Toute l'Île-de-France depuis Clichy (92110). Nous nous déplaçons pour le relevé de cotes sans engagement, et la pose est assurée par nos propres équipes — nous ne sous-traitons pas l'installation.",
  },
];

const serviceSchema = generateServiceSchema(
  {
    name: "Fabrication de portails sur mesure",
    description:
      "Conception, fabrication en atelier et pose de portails sur mesure en acier, aluminium ou fer forgé. Portails coulissants et battants, motorisation conforme NF EN 13241 et NF EN 12453.",
    provider: "S Connect France",
    areaServed: ["Île-de-France", "Hauts-de-Seine", "Paris", "Seine-Saint-Denis", "Val-de-Marne", "Yvelines", "Val-d'Oise"],
  },
  siteUrl,
);

const faqSchema = generateFAQSchema(faqs);

// Communes ou la demande portail est deja mesuree en Search Console
// (/portail-metallique/chatenay-malabry sort a 84 impressions a lui seul).
const COMMUNES_PORTAIL = [
  { nom: "Châtenay-Malabry", slug: "chatenay-malabry" },
  { nom: "Argenteuil", slug: "argenteuil" },
  { nom: "Nanterre", slug: "nanterre" },
  { nom: "Colombes", slug: "colombes" },
  { nom: "Courbevoie", slug: "courbevoie" },
  { nom: "Asnières-sur-Seine", slug: "asnieres-sur-seine" },
  { nom: "Boulogne-Billancourt", slug: "boulogne-billancourt" },
  { nom: "Saint-Denis", slug: "saint-denis" },
];

export default function FabricationPortailPage() {
  const hero = image("metallerie-portail");
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
          {/* Fil d'Ariane : la page n'en avait pas, alors que le composant émet
              le BreadcrumbList JSON-LD et que la Search Console compte déjà
              7 fils d'Ariane valides ailleurs sur le site. */}
          <Breadcrumbs
            light
            className="mb-6"
            items={[
              { label: "Services", href: "/services" },
              { label: "Métallerie", href: "/services/metallerie" },
              { label: "Fabrication de portails" },
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
                <Wrench className="w-8 h-8 text-white" />
              </div>
              <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-4 leading-tight">
                Fabricant de portails
              </h1>
              <p className="text-xl md:text-2xl font-medium mb-6">
              <BulbText>Sur mesure, en atelier, Île-de-France</BulbText>
            </p>
              <p className="text-lg text-dark-300 leading-relaxed">
                Nous ne revendons pas des portails de catalogue : nous les
                fabriquons, à vos cotes relevées sur site. Acier, aluminium ou
                fer forgé, coulissant ou battant, motorisation posée aux normes
                NF&nbsp;EN&nbsp;13241 et EN&nbsp;12453.
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
                  <span className="text-sm font-semibold text-white">Garantie 10 ans</span>
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
                Nos prestations portails
              </h2>
              <p className="text-foreground-muted mb-8 leading-relaxed">
                Nous concevons et fabriquons des portails sur mesure adaptés à votre habitat et à votre style. 
                Du design à l&apos;installation, nous vous accompagnons à chaque étape.
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
              <h3 className="font-semibold text-foreground mb-4">Types de portails</h3>
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

      {/* Process */}
      <section className="section-padding bg-surface-muted">
        <div className="container-custom">
          <h2 className="font-display font-bold text-3xl text-foreground mb-12 text-center">
            Notre processus
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: "1", title: "Consultation", description: "Visite sur site et prise de mesures" },
              { step: "2", title: "Conception", description: "Design personnalisé selon vos goûts" },
              { step: "3", title: "Fabrication", description: "Réalisation dans notre atelier" },
              { step: "4", title: "Installation", description: "Pose par nos équipes qualifiées" },
            ].map((item) => (
              <div key={item.step} className="relative">
                <div className="bg-surface rounded-xl p-6 shadow-sm h-full">
                  <div className="w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-foreground-muted text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Normes ───
          Le contenu normatif est ce qui marche le mieux sur ce site : les pages
          EI30/EI60, UGR et NF EN 12464-1 sortent en positions 11 à 12, contre
          37,3 de moyenne. Le portail motorisé a exactement le même profil —
          une obligation réglementaire mal connue, que l'acheteur cherche. */}
      <section className="section-padding bg-surface">
        <div className="container-custom max-w-4xl">
          <div className="flex items-start gap-4 mb-8">
            <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-700">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <div>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-3">
                Ce qu&apos;un portail motorisé doit respecter
              </h2>
              <p className="text-foreground-muted leading-relaxed">
                Un portail motorisé est une machine au sens réglementaire. Le
                marquage CE est obligatoire depuis 2005 et engage celui qui met
                l&apos;ensemble en service — c&apos;est-à-dire l&apos;installateur,
                pas seulement le fabricant du moteur.
              </p>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                norme: "NF EN 13241",
                titre: "Le produit",
                texte:
                  "Norme produit des portes et portails. Impose le marquage CE au titre de la directive Machines 2006/42/CE : résistance au vent, sécurité mécanique, protection contre le pincement, l'écrasement et le cisaillement.",
              },
              {
                norme: "NF EN 12453",
                titre: "Les efforts",
                texte:
                  "Limite la force exercée sur un obstacle à 400 N en dynamique et 150 N en statique. En pratique : cellules photoélectriques, bords sensibles et feu de signalisation deviennent obligatoires.",
              },
              {
                norme: "NF EN 12445",
                titre: "La mesure",
                texte:
                  "Définit les méthodes d'essai qui vérifient les valeurs ci-dessus. Sans mesure d'effort après pose, personne ne peut attester la conformité de l'installation — seulement l'affirmer.",
              },
            ].map((n) => (
              <div key={n.norme} className="rounded-2xl border border-border bg-surface-muted p-6">
                <span className="font-mono text-xs tracking-wider text-orange-700 dark:text-orange-400">
                  {n.norme}
                </span>
                <h3 className="font-display font-bold text-lg text-foreground mt-1 mb-2">
                  {n.titre}
                </h3>
                <p className="text-sm text-foreground-muted leading-relaxed">{n.texte}</p>
              </div>
            ))}
          </div>

          <p className="text-foreground-muted leading-relaxed mt-8">
            Nous mesurons les efforts à la réception du chantier et remettons le
            relevé avec la déclaration CE. C&apos;est la pièce qu&apos;un syndic
            ou un assureur demande après un incident — et celle qui manque le
            plus souvent sur les installations que nous reprenons.
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
            Ce qu&apos;on nous demande le plus souvent au moment du relevé de cotes.
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

      {/* ─── Communes ───
          La page n'envoyait aucun lien vers les pages ville portail, alors que
          /portail-metallique/chatenay-malabry capte déjà 84 impressions seule. */}
      <section className="section-padding bg-surface">
        <div className="container-custom max-w-4xl">
          <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-3">
            Nos portails, commune par commune
          </h2>
          <p className="text-foreground-muted mb-8">
            Contraintes de terrain, accès chantier et délais d&apos;intervention
            depuis notre atelier de Clichy.
          </p>
          <div className="flex flex-wrap gap-3">
            {COMMUNES_PORTAIL.map((c) => (
              <Link
                key={c.slug}
                href={`/portail-metallique/${c.slug}`}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-muted px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-orange-400 hover:text-orange-700 dark:hover:text-orange-300"
              >
                Portail à {c.nom}
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            ))}
            <Link
              href="/portail-metallique"
              className="inline-flex items-center gap-2 rounded-full bg-orange-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-orange-700"
            >
              Toutes les communes
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 bg-gradient-to-r from-orange-700 via-orange-600 to-rose-600 overflow-hidden">
        <NoiseOverlay opacity={0.05} />
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse-soft" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: "2s" }} />
        <div className="container-custom relative z-10 text-center">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-4">
            Votre projet de portail sur mesure
          </h2>
          <p className="text-orange-50 mb-8 max-w-2xl mx-auto text-lg">
            Contactez-nous pour un devis gratuit. Nous nous déplaçons pour prendre les mesures et vous conseiller.
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





