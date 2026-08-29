import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Lightbulb,
  ChevronRight,
  Phone,
  FlaskConical,
  CheckCircle2,
  ArrowRight,
  Microscope,
  Droplets,
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

// EDITORIALISED 2026-06-09 — building-type page. Lab lighting: 500-1000 lux
// benches, IRC ≥ 90 sample analysis, strict flicker-free (microscopes/cameras),
// 5000-6500K daylight, IP54 wet zones / fume hoods.

export const metadata: Metadata = {
  title: "Relamping LED pour laboratoire et recherche — paillasse 750 lux, IRC ≥ 90, flicker-free | S Connect IDF",
  description:
    "Spécialiste relamping LED pour laboratoires, salles blanches et centres de recherche en Île-de-France : paillasse 500-1000 lux, IRC ≥ 90 pour l'analyse d'échantillons, flicker-free strict (microscopes, caméras), lumière du jour 5000-6500K, IP54 zones humides et sorbonnes. Audit gratuit, conformité NF EN 12464-1 et DEET 2030.",
  keywords: [
    "relamping LED laboratoire",
    "éclairage paillasse labo LED",
    "luminaire laboratoire IRC 90 flicker-free",
    "éclairage salle blanche LED",
    "DEET laboratoire 2030",
  ],
  alternates: { canonical: "/services/electricite/relamping/verticales/laboratoire-recherche" },
  openGraph: {
    title: "Relamping LED pour laboratoire — paillasse 750 lux, IRC ≥ 90, flicker-free",
    description:
      "Paillasse 500-1000 lux, IRC ≥ 90, flicker-free strict, 5000-6500K, IP54 zones humides. Audit gratuit IDF.",
    images: ["/images/verticales/laboratoire-recherche-hero.webp"],
    type: "website",
  },
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sconnectfrance.fr";
const serviceSchema = generateServiceSchema(
  {
    name: "Relamping LED pour laboratoire et recherche (Île-de-France)",
    description:
      "Audit, étude et installation relamping LED pour laboratoires, salles blanches et centres de recherche : paillasses, sorbonnes, zones humides, bureaux d'analyse. IRC ≥ 90, flicker-free, 5000-6500K, IP54, conformité NF EN 12464-1 et décret tertiaire 2030. Garantie décennale active.",
    provider: "S Connect",
    areaServed: ["Paris", "Hauts-de-Seine", "Île-de-France"],
    priceRange: "€€€",
  },
  siteUrl,
);

export default function RelampingLaboratoirePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={injectSchema(serviceSchema)} />

      {/* Hero */}
      <section className="relative bg-dark-950 py-16 md:py-24 overflow-hidden">
        <Image
          src="/images/verticales/laboratoire-recherche-hero.webp"
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
                { label: "Laboratoire & recherche" },
              ]}
            />
          </div>
          <div className="max-w-2xl">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-electric-500 rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-primary-500/30">
              <FlaskConical className="w-8 h-8 text-white" />
            </div>
            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-4 leading-tight [text-shadow:_0_2px_20px_rgba(0,0,0,0.6)]">
              Relamping LED pour laboratoire et recherche
            </h1>
            <p className="text-xl md:text-2xl font-medium mb-6">
              <BulbText>Paillasse 750 lux · IRC ≥ 90 · flicker-free</BulbText>
            </p>
            <p className="text-lg text-white/90 leading-relaxed [text-shadow:_0_1px_8px_rgba(0,0,0,0.5)]">
              En laboratoire, la lumière est un <strong>instrument de mesure</strong> :
              elle doit révéler la vraie couleur d&apos;un échantillon (IRC ≥ 90), ne jamais
              scintiller sous une caméra ou un microscope (flicker-free strict), et reproduire
              la lumière du jour (5000-6500K). Sur les zones humides et les sorbonnes, on passe
              en IP54. On intervient sans interrompre les manips en cours.
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

      {/* Enjeux */}
      <section className="section-padding bg-surface">
        <div className="container-custom max-w-5xl">
          <SectionTitle
            badge="Les enjeux"
            title="Quand l'éclairage conditionne la qualité de la mesure"
            subtitle="Un labo n'a pas le droit à l'à-peu-près lumineux : la fiabilité des résultats en dépend."
          />
          <div className="grid md:grid-cols-3 gap-5">
            <div className="p-5 rounded-2xl bg-surface-elevated border border-border">
              <div className="flex items-center gap-2 mb-2">
                <Microscope className="w-5 h-5 text-primary-500" />
                <span className="font-display font-bold text-foreground">Flicker-free strict</span>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Sous microscope, caméra ou écran d&apos;acquisition, le moindre scintillement
                fausse l&apos;image (effet stroboscopique). On exige des sources flicker-free
                (PstLM &lt; 0,4, SVM &lt; 0,4).
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-surface-elevated border border-border">
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="w-5 h-5 text-primary-500" />
                <span className="font-display font-bold text-foreground">750 lux · 5000-6500K</span>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Paillasse d&apos;analyse : 500 à 1000 lux selon la finesse du travail, IRC ≥ 90
                pour distinguer les nuances d&apos;un échantillon, température proche de la lumière
                du jour pour ne pas biaiser la perception colorimétrique.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-surface-elevated border border-border">
              <div className="flex items-center gap-2 mb-2">
                <Droplets className="w-5 h-5 text-primary-500" />
                <span className="font-display font-bold text-foreground">IP54 zones humides</span>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Sorbonnes, paillasses humides, salles de lavage : étanchéité IP54 minimum, résistance
                aux vapeurs et aux nettoyages fréquents. Salle blanche : luminaires encastrés à joint.
              </p>
            </div>
          </div>
          <p className="mt-8 text-sm text-foreground-muted text-center max-w-3xl mx-auto">
            Sources :{" "}
            <a href="https://www.afe-eclairage.fr/" target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-300 underline">AFE — éclairage des laboratoires</a>,{" "}
            <a href="https://www.boutique.afnor.org/" target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-300 underline">AFNOR — NF EN 12464-1</a>.
          </p>
        </div>
      </section>

      {/* Méthode */}
      <section className="section-padding bg-surface-muted">
        <div className="container-custom max-w-4xl">
          <SectionTitle
            badge="Notre méthode S Connect"
            title="Relamper un labo sans casser une manip"
          />
          <ul className="grid sm:grid-cols-2 gap-4">
            {[
              { title: "Intervention coordonnée", desc: "Planning calé avec le responsable de labo, zone par zone, en respectant les expériences en cours et les protocoles d'accès." },
              { title: "Devis ferme = facture finale", desc: "Audit photométrique paillasse + zones humides, mesure flicker, devis sous 7 jours. Aucun supplément." },
              { title: "Flicker-free + IRC ≥ 90", desc: "Sources vérifiées en flicker (PstLM/SVM), IRC ≥ 90, IP54 sur zones humides. Drivers garantis 5 ans." },
              { title: "Conformité DEET 2030", desc: "Bâtiments tertiaires de recherche > 1 000 m² : relamping = action n°1 vers les −40 %. Reporting OPERAT inclus." },
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

      {/* Zones */}
      <section className="section-padding bg-surface">
        <div className="container-custom max-w-5xl">
          <SectionTitle badge="Selon la zone" title="Chaque espace, sa cible photométrique" />
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { name: "Paillasses d'analyse", href: "/services/electricite/relamping/bureau-tertiaire", desc: "500-1000 lux, IRC ≥ 90, flicker-free, 5000-6500K. Éclairement local renforcé au poste de travail de précision." },
              { name: "Salle blanche / clean room", href: "/services/electricite/relamping/industriel-entrepot", desc: "Luminaires encastrés à joint, étanches, lumière uniforme sans recoin à poussière. Compatible classes ISO." },
              { name: "Sorbonnes & zones humides", href: "/services/electricite/relamping/industriel-entrepot", desc: "IP54 minimum, résistance vapeurs et solvants, nettoyabilité. Sécurité sur les postes à risque chimique." },
              { name: "Bureaux & salles de réunion", href: "/services/electricite/relamping/bureau-tertiaire", desc: "500 lux, UGR ≤ 19, gradation. Espaces de rédaction et de revue de données reliés aux paillasses." },
            ].map((t) => (
              <Link
                key={t.name}
                href={t.href}
                className="p-6 rounded-2xl bg-surface-elevated border border-border hover:border-primary-300 dark:hover:border-primary-500 transition-colors group"
              >
                <span className="font-display font-bold text-lg text-foreground group-hover:text-primary-600 dark:group-hover:text-primary-300 inline-flex items-center gap-2 mb-2">
                  {t.name}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{t.desc}</p>
              </Link>
            ))}
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
            Audit photométrique, mesure flicker, calcul ROI, conformité décret tertiaire.
            Tout est détaillé sur la page pilier.
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

      {/* Author byline */}
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
              Auditons l&apos;éclairage de votre laboratoire
            </h2>
            <p className="text-primary-100 text-lg">
              Mesure flicker + ROI par zone sous 7 jours. Intervention coordonnée, sans engagement.
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
