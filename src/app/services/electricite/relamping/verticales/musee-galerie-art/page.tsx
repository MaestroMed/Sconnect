import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Lightbulb,
  ChevronRight,
  Phone,
  Palette,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Landmark,
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

// EDITORIALISED 2026-06-09 — building-type page. Museum/gallery lighting:
// IRC ≥ 95 artwork rendering, 3000K accent, UV/IR filtered for conservation,
// low lux on sensitive works, orientable DALI track spots, ABF on listed.

export const metadata: Metadata = {
  title: "Relamping LED pour musée et galerie d'art — IRC ≥ 95, conservation, spots orientables | S Connect IDF",
  description:
    "Spécialiste relamping LED pour musées, galeries d'art et espaces d'exposition en Île-de-France : IRC ≥ 95 pour le rendu des œuvres, accentuation 3000K, rayonnement UV/IR filtré pour la conservation, éclairement maîtrisé sur les œuvres sensibles, spots track DALI orientables. ABF si bâtiment classé. Audit gratuit, conformité NF EN 12464-1.",
  keywords: [
    "relamping LED musée",
    "éclairage galerie d'art LED IRC 95",
    "éclairage muséographique conservation UV",
    "spot track DALI musée",
    "ABF éclairage musée classé",
  ],
  alternates: { canonical: "/services/electricite/relamping/musee-galerie-art" },
  openGraph: {
    title: "Relamping LED pour musée et galerie d'art — IRC ≥ 95, conservation",
    description:
      "IRC ≥ 95, accent 3000K, UV/IR filtré (conservation), spots DALI orientables, ABF si classé. Audit gratuit IDF.",
    images: ["/images/verticales/musee-galerie-art-hero.webp"],
    type: "website",
  },
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sconnectfrance.fr";
const serviceSchema = generateServiceSchema(
  {
    name: "Relamping LED pour musée et galerie d'art (Île-de-France)",
    description:
      "Audit, étude et installation relamping LED pour musées, galeries d'art et espaces d'exposition : cimaises, vitrines, circulations, réserves. IRC ≥ 95, rayonnement UV/IR maîtrisé, spots track DALI orientables, accompagnement ABF, conformité NF EN 12464-1. Certifié Qualifélec + RGE.",
    provider: "S Connect",
    areaServed: ["Paris", "Hauts-de-Seine", "Île-de-France"],
    priceRange: "€€€",
  },
  siteUrl,
);

export default function RelampingMuseeGaleriePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={injectSchema(serviceSchema)} />

      {/* Hero */}
      <section className="relative bg-dark-950 py-16 md:py-24 overflow-hidden">
        <Image
          src="/images/verticales/musee-galerie-art-hero.webp"
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
                { label: "Musée & galerie d'art" },
              ]}
            />
          </div>
          <div className="max-w-2xl">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-electric-500 rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-primary-500/30">
              <Palette className="w-8 h-8 text-white" />
            </div>
            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-4 leading-tight [text-shadow:_0_2px_20px_rgba(0,0,0,0.6)]">
              Relamping LED pour musée et galerie d&apos;art
            </h1>
            <p className="text-xl md:text-2xl font-medium mb-6">
              <BulbText>IRC ≥ 95 · conservation · spots orientables</BulbText>
            </p>
            <p className="text-lg text-white/90 leading-relaxed [text-shadow:_0_1px_8px_rgba(0,0,0,0.5)]">
              Éclairer une œuvre, c&apos;est un double engagement : la <strong>révéler</strong>
              fidèlement (IRC ≥ 95, accent 3000K dirigé) et la <strong>protéger</strong>
              (rayonnement UV/IR filtré, éclairement maîtrisé sur les pièces sensibles). La LED
              moderne y excelle — froide en rayonnement, riche en rendu. Spots track DALI
              orientables, et accompagnement ABF si votre bâtiment est classé.
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
            title="Révéler l'œuvre sans l'abîmer"
            subtitle="Le seul secteur où l'on cherche parfois à éclairer moins — pour préserver des pièces fragiles."
          />
          <div className="grid md:grid-cols-3 gap-5">
            <div className="p-5 rounded-2xl bg-surface-elevated border border-border">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-primary-500" />
                <span className="font-display font-bold text-foreground">IRC ≥ 95 fidélité</span>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Le rendu des couleurs est l&apos;exigence absolue : IRC ≥ 95 (idéalement TM-30
                Rf &gt; 90) pour restituer les pigments d&apos;une toile, les nuances d&apos;une
                sculpture, sans dérive chromatique.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-surface-elevated border border-border">
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="w-5 h-5 text-primary-500" />
                <span className="font-display font-bold text-foreground">Conservation UV/IR</span>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                La LED n&apos;émet quasiment pas d&apos;UV ni d&apos;IR : un avantage décisif sur
                l&apos;halogène pour la conservation. Éclairement plafonné (50-150 lux) sur les
                œuvres photosensibles (aquarelles, textiles, papier).
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-surface-elevated border border-border">
              <div className="flex items-center gap-2 mb-2">
                <Landmark className="w-5 h-5 text-primary-500" />
                <span className="font-display font-bold text-foreground">ABF si classé</span>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Beaucoup de musées occupent des bâtiments classés. Toute intervention visible
                (façade, halls patrimoniaux) passe par l&apos;Architecte des Bâtiments de France :
                nous gérons la pré-validation.
              </p>
            </div>
          </div>
          <p className="mt-8 text-sm text-foreground-muted text-center max-w-3xl mx-auto">
            Sources :{" "}
            <a href="https://www.afe-eclairage.fr/" target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-300 underline">AFE — éclairage muséographique</a>,{" "}
            <a href="https://www.culture.gouv.fr/" target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-300 underline">Ministère de la Culture — conservation</a>.
          </p>
        </div>
      </section>

      {/* Méthode */}
      <section className="section-padding bg-surface-muted">
        <div className="container-custom max-w-4xl">
          <SectionTitle
            badge="Notre méthode S Connect"
            title="Relamper un espace d'exposition avec précaution"
          />
          <ul className="grid sm:grid-cols-2 gap-4">
            {[
              { title: "Intervention hors public", desc: "Relamping de nuit ou en fermeture d'exposition, manipulation prudente autour des œuvres, coordination avec le régisseur." },
              { title: "Devis ferme = facture finale", desc: "Étude d'éclairage par cimaise, calcul d'éclairement et de rendu, devis sous 7 jours. Aucun supplément." },
              { title: "IRC ≥ 95 + UV/IR maîtrisé", desc: "Spots track orientables DALI, sources IRC ≥ 95, rayonnement UV/IR négligeable. Drivers garantis 5 ans." },
              { title: "Accompagnement ABF", desc: "Sur bâtiment classé : pré-validation ABF de l'éclairage de façade et des halls patrimoniaux, luminaires à antériorité ABF." },
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
              { name: "Cimaises & accrochages", href: "/services/electricite/relamping/commerce-restaurant", desc: "Spots track DALI orientables, IRC ≥ 95, 3000K, accentuation réglable œuvre par œuvre. Éclairement plafonné sur le sensible." },
              { name: "Vitrines & objets fragiles", href: "/services/electricite/relamping/commerce-restaurant", desc: "Éclairage interne LED froid (UV/IR négligeable), 50-150 lux, fibres optiques possibles pour les pièces les plus délicates." },
              { name: "Circulations & accueil", href: "/services/electricite/relamping/bureau-tertiaire", desc: "Transition douce d'éclairement entre salles, billetterie, vestiaire. Confort visiteur, BAES NF EN 1838." },
              { name: "Réserves & ateliers", href: "/services/electricite/relamping/bureau-tertiaire", desc: "Stockage et restauration : IRC ≥ 90, détection présence pour limiter l'exposition, 500 lux en atelier de restauration." },
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
            Audit photométrique, rendu des couleurs, ROI, accompagnement ABF. Tout est
            détaillé sur la page pilier.
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
              Auditons l&apos;éclairage de votre musée ou galerie
            </h2>
            <p className="text-primary-100 text-lg">
              Étude par cimaise + ROI sous 7 jours. Intervention hors public, sans engagement.
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
