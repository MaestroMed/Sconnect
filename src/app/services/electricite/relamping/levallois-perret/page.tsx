import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Lightbulb,
  ChevronRight,
  Phone,
  MapPin,
  CheckCircle2,
  ArrowRight,
  Building2,
  TrendingUp,
  Award,
} from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";
import { NoiseOverlay } from "@/components/ui/ambient";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import {
  generateServiceSchema,
  injectSchema,
} from "@/lib/structured-data";
import BulbText from "@/components/ui/BulbText";
import AuthorByline from "@/components/seo/AuthorByline";

// EDITORIALISED 2026-05-21 — production quality with real Levallois-Perret
// market data : densité, sièges sociaux, parc bureaux 600k m².
// Update annually on the market figures.

export const metadata: Metadata = {
  title: "Relamping LED à Levallois-Perret — 600 k m² de sièges sociaux à éclairer | S Connect",
  description:
    "Spécialiste relamping LED à Levallois-Perret (92300) : 600 000 m² de bureaux et sièges sociaux concernés par le DEET 2030. Audit gratuit, conformité NF EN 12464-1, intervention en moins de 25 min depuis Clichy. Devis ferme sous 7 jours.",
  keywords: [
    "relamping LED Levallois-Perret",
    "électricien Levallois 92300",
    "audit éclairage bureau Levallois",
    "relamping siège social 92",
    "DEET Levallois-Perret",
    "éclairage tertiaire 92300",
  ],
  alternates: { canonical: "/services/electricite/relamping/levallois-perret" },
  openGraph: {
    title: "Relamping LED à Levallois-Perret — voisin de palier",
    description:
      "Levallois = 600 k m² de bureaux ultra-denses. S Connect, basé à Clichy juste à côté, intervient en moins de 25 minutes. Audit gratuit, ROI mesuré.",
    images: ["/images/locations/levallois-perret-hero.webp"],
    type: "website",
  },
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sconnectfrance.fr";
const serviceSchema = generateServiceSchema(
  {
    name: "Relamping LED à Levallois-Perret (92300)",
    description:
      "Audit, étude et installation relamping LED pour bureaux, sièges sociaux, copropriétés et commerces premium à Levallois-Perret et couronne. Conformité NF EN 12464-1 et décret tertiaire (DEET) couverts. Artisan certifié Qualifélec + RGE + IRVE basé à 4 km à Clichy.",
    provider: "S Connect",
    areaServed: ["Levallois-Perret", "Clichy", "Neuilly-sur-Seine", "Asnières-sur-Seine", "Île-de-France"],
    priceRange: "€€€",
  },
  siteUrl,
);

export default function RelampingLevalloisPerretPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={injectSchema(serviceSchema)} />

      {/* Hero */}
      <section className="relative bg-dark-950 py-16 md:py-24 overflow-hidden">
        <Image
          src="/images/locations/levallois-perret-hero.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-55"
          aria-hidden="true"
          priority
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
                { label: "Relamping LED", href: "/services/electricite/relamping" },
                { label: "Levallois-Perret" },
              ]}
            />
          </div>
          <div className="max-w-2xl">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-electric-500 rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-primary-500/30">
              <MapPin className="w-8 h-8 text-white" />
            </div>
            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-4 leading-tight [text-shadow:_0_2px_20px_rgba(0,0,0,0.6)]">
              Relamping LED à Levallois-Perret
            </h1>
            <p className="text-xl md:text-2xl font-medium mb-6">
              <BulbText>600 000 m² · Sièges sociaux · Intervention 25 min</BulbText>
            </p>
            <p className="text-lg text-white/90 leading-relaxed [text-shadow:_0_1px_8px_rgba(0,0,0,0.5)]">
              Levallois-Perret est le terrain le plus dense d&apos;Île-de-France :
              600 000 m² de bureaux, sièges sociaux <strong>Sodexo, Mediawan, Daher,
              CMA-CGM</strong>, et 80 % du parc construit avant 2010. C&apos;est
              aussi notre voisinage immédiat : Clichy → Levallois en moins de 25 min.
              Audit gratuit, devis ferme sous 7 jours.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/demande-devis" className="btn-primary btn-lg shadow-xl shadow-primary-700/30">
                Audit gratuit
                <ChevronRight className="w-5 h-5" />
              </Link>
              <a href="tel:+33652820685" className="btn glass-panel text-white hover:bg-white/15 btn-lg">
                <Phone className="w-5 h-5" />
                06 52 82 06 85
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Levallois en chiffres */}
      <section className="section-padding bg-surface">
        <div className="container-custom max-w-5xl">
          <SectionTitle
            badge="Le marché"
            title="Levallois, l'un des tissus tertiaires les plus denses d'Europe"
            subtitle="64 000 habitants sur 4,4 km² (~14 700 hab/km², 3e densité de France), un parc bureaux à très forte concentration de sièges sociaux, et un pont de Levallois qui relie directement Clichy."
          />
          <div className="grid md:grid-cols-3 gap-5 mb-8">
            <div className="p-5 rounded-2xl bg-surface-elevated border border-border">
              <div className="flex items-center gap-2 mb-2">
                <Building2 className="w-5 h-5 text-primary-500" />
                <span className="font-display font-bold text-foreground">~600 000 m² de bureaux</span>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Le 2ᵉ pôle tertiaire du 92 après La Défense. Sièges sociaux
                Sodexo, Mediawan, Daher, CMA-CGM, France Télévisions
                (départ en 2026). Loyer moyen ~410 €/m²/an HT/HC.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-surface-elevated border border-border">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-primary-500" />
                <span className="font-display font-bold text-foreground">80 % parc pré-2010</span>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Construits avant les exigences RT2012, donc avec un éclairage
                ancien (T8/T5 fluorescent, halogène, mercure). Cible
                naturelle pour le relamping LED — gros gisement d&apos;économies.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-surface-elevated border border-border">
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-5 h-5 text-primary-500" />
                <span className="font-display font-bold text-foreground">25 min depuis Clichy</span>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Notre atelier 35 rue des Cailloux à Clichy → Levallois via le
                pont. Audit sur site sous 48h, intervention SAV sous 24h.
                L&apos;avantage du voisin de palier.
              </p>
            </div>
          </div>
          <p className="text-sm text-foreground-muted text-center max-w-3xl mx-auto">
            Sources :{" "}
            <a
              href="https://www.insee.fr/fr/statistiques/2011101?geo=COM-92044"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 dark:text-primary-300 underline"
            >
              INSEE — Dossier complet Levallois-Perret
            </a>
            ,{" "}
            <a
              href="https://www.bnppre.fr/etudes-marche/marche-bureaux-paris-region.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 dark:text-primary-300 underline"
            >
              BNP Paribas RE — Marché bureaux IDF
            </a>
            ,{" "}
            <a
              href="https://operat.ademe.fr/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 dark:text-primary-300 underline"
            >
              ADEME — Plateforme OPERAT (DEET)
            </a>
            .
          </p>
        </div>
      </section>

      {/* Pourquoi nous à Levallois */}
      <section className="section-padding bg-surface-muted">
        <div className="container-custom max-w-4xl">
          <SectionTitle
            badge="Pourquoi S Connect à Levallois-Perret"
            title="Le voisinage = la rapidité d'exécution"
          />
          <ul className="grid sm:grid-cols-2 gap-4">
            {[
              {
                title: "Audit sur site sous 48h",
                desc: "Nous traversons le pont de Levallois en 8 min. Pas de demi-journée perdue à se déplacer, pas de marge logistique facturée.",
              },
              {
                title: "Devis ferme = facture finale",
                desc: "Mesures luxmètre étalonné, étude photométrique, modèle ROI sous 7 jours. Aucun supplément après mise en service.",
              },
              {
                title: "Spécialiste plateau ouvert",
                desc: "Open-space siège social : 500 lux soutenus, UGR < 19 contre l'éblouissement, IRC > 80. Conforme NF EN 12464-1.",
              },
              {
                title: "Intervention nuit/weekend",
                desc: "Zéro impact sur l'occupation. Coordination avec le PSE ou le FM en place. Sécurité incendie maintenue (BAES, balisage).",
              },
              {
                title: "Couverture décret tertiaire",
                desc: "Relamping LED = −65 à −75 % sur le poste éclairage, soit −10 à −18 % sur la facture totale. Sur la trajectoire DEET 2030.",
              },
              {
                title: "Multi-marques pro",
                desc: "Trilux, Philips, Sylvania, Hager, Schneider. Spécification du luminaire qui convient à votre siège, pas de captivité.",
              },
            ].map((b) => (
              <li key={b.title} className="p-5 rounded-2xl bg-surface-elevated border border-border">
                <h3 className="font-display font-bold text-foreground mb-1 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary-500" />
                  {b.title}
                </h3>
                <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">{b.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Typologies Levallois */}
      <section className="section-padding bg-surface">
        <div className="container-custom max-w-5xl">
          <SectionTitle
            badge="Selon votre typologie"
            title="Spécificités relamping par configuration"
          />
          <div className="grid md:grid-cols-2 gap-6">
            <Link
              href="/services/electricite/relamping/bureau-tertiaire"
              className="p-6 rounded-2xl bg-surface-elevated border border-border hover:border-primary-300 dark:hover:border-primary-500 transition-colors group"
            >
              <span className="font-display font-bold text-lg text-foreground group-hover:text-primary-600 dark:group-hover:text-primary-300 inline-flex items-center gap-2 mb-2">
                Siège social 5 000-30 000 m²
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Mix plateaux open + bureaux fermés + salles de réunion +
                cafétéria. Approche zonale, gestion DALI obligatoire,
                tunable white sur salles de comité (3000K vs 5000K selon
                usage). Budget typique 25-45 €/m².
              </p>
            </Link>
            <Link
              href="/services/electricite/relamping/copropriete-parking"
              className="p-6 rounded-2xl bg-surface-elevated border border-border hover:border-primary-300 dark:hover:border-primary-500 transition-colors group"
            >
              <span className="font-display font-bold text-lg text-foreground group-hover:text-primary-600 dark:group-hover:text-primary-300 inline-flex items-center gap-2 mb-2">
                Copropriété haut de gamme
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Halls premium, paliers, escaliers, parkings souterrains.
                Détection présence + gradation crépusculaire. Pack
                charges-d&apos;exploitation possible — pas d&apos;appel de
                fonds.
              </p>
            </Link>
            <Link
              href="/services/electricite/relamping/commerce-restaurant"
              className="p-6 rounded-2xl bg-surface-elevated border border-border hover:border-primary-300 dark:hover:border-primary-500 transition-colors group"
            >
              <span className="font-display font-bold text-lg text-foreground group-hover:text-primary-600 dark:group-hover:text-primary-300 inline-flex items-center gap-2 mb-2">
                Commerces rue Aristide Briand
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Mode, restauration, services premium. Éclairage d&apos;accentuation
                IRC ≥ 90 sur vitrine, éclairage général 500-1000 lux selon
                typologie. Continuité d&apos;exploitation : intervention de nuit.
              </p>
            </Link>
            <Link
              href="/services/electricite/relamping/industriel-entrepot"
              className="p-6 rounded-2xl bg-surface-elevated border border-border hover:border-primary-300 dark:hover:border-primary-500 transition-colors group"
            >
              <span className="font-display font-bold text-lg text-foreground group-hover:text-primary-600 dark:group-hover:text-primary-300 inline-flex items-center gap-2 mb-2">
                Locaux techniques bureaux
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Locaux serveurs, locaux poubelles, locaux ménages.
                Robustesse IK10, détection présence, anti-papillonnement à
                l&apos;allumage. ROI souvent &lt; 18 mois sur ces zones
                allumées 24/7.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Cross-link pillar */}
      <section className="section-padding bg-surface-muted">
        <div className="container-custom max-w-3xl text-center">
          <Lightbulb className="w-12 h-12 text-primary-500 mx-auto mb-4" />
          <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-3">
            Notre méthode relamping complète
          </h2>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
            Audit photométrique, calcul ROI, gestion DALI, conformité décret
            tertiaire. Tout est détaillé sur la page pilier — avec un
            calculateur que vous pouvez utiliser sur votre siège avant
            de nous appeler.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/services/electricite/relamping" className="btn-outline">
              Voir la page pilier Relamping LED
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/calculateur-relamping" className="btn-outline">
              Calculer mon ROI
            </Link>
          </div>
        </div>
      </section>

      {/* Author byline — E-E-A-T signal avant le CTA */}
      <section className="bg-surface py-10 md:py-14">
        <div className="container-custom max-w-3xl">
          <AuthorByline variant="card" />
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 bg-gradient-to-r from-primary-700 via-primary-600 to-electric-600 overflow-hidden">
        <NoiseOverlay opacity={0.05} />
        <div className="container-custom relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-white">
            <h2 className="font-display font-bold text-2xl md:text-3xl mb-2">
              Auditons votre éclairage à Levallois gratuitement
            </h2>
            <p className="text-primary-100 text-lg">
              Audit sur site sous 48h. Rapport DEET 2030 + ROI sous 7 jours.
              Sans engagement.
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
