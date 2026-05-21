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
  Cpu,
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

// EDITORIALISED 2026-05-21 — production quality. Issy-les-Moulineaux =
// "Silicon Valley française". ~1M m² bureaux, sièges Microsoft France,
// Orange siège, Bouygues Telecom, Cap Gemini. Update annually.

export const metadata: Metadata = {
  title: "Relamping LED à Issy-les-Moulineaux — 1 M m² tech & tertiaire | S Connect",
  description:
    "Spécialiste relamping LED à Issy-les-Moulineaux (92130) : ~1 M m² de bureaux tech (Microsoft, Orange, Bouygues Telecom, Cap Gemini). Audit gratuit, conformité NF EN 12464-1, DEET 2030, gestion DALI + circadien. Devis ferme sous 7 jours.",
  keywords: [
    "relamping LED Issy-les-Moulineaux",
    "électricien Issy 92130",
    "audit éclairage tech Issy",
    "relamping siège tech Issy",
    "DEET Issy 2030",
    "éclairage circadien bureau Issy",
  ],
  alternates: { canonical: "/services/electricite/relamping/issy-les-moulineaux" },
  openGraph: {
    title: "Relamping LED à Issy — le hub tech d'IDF",
    description:
      "1 M m² de bureaux tech à Issy. Microsoft, Orange, Bouygues Telecom. S Connect = expertise éclairage + circadien + DEET 2030.",
    images: ["/images/locations/issy-les-moulineaux-hero.webp"],
    type: "website",
  },
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sconnectfrance.fr";
const serviceSchema = generateServiceSchema(
  {
    name: "Relamping LED à Issy-les-Moulineaux (92130)",
    description:
      "Audit, étude et installation relamping LED pour bureaux tech, sièges sociaux et copropriétés à Issy-les-Moulineaux. Conformité NF EN 12464-1 + décret tertiaire + éclairage circadien (HCL). Certifié Qualifélec + RGE + IRVE.",
    provider: "S Connect",
    areaServed: ["Issy-les-Moulineaux", "Boulogne-Billancourt", "Vanves", "Île-de-France"],
    priceRange: "€€€",
  },
  siteUrl,
);

export default function RelampingIssyLesMoulineauxPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={injectSchema(serviceSchema)} />

      {/* Hero */}
      <section className="relative bg-dark-950 py-16 md:py-24 overflow-hidden">
        <Image
          src="/images/locations/issy-les-moulineaux-hero.webp"
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
                { label: "Issy-les-Moulineaux" },
              ]}
            />
          </div>
          <div className="max-w-2xl">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-electric-500 rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-primary-500/30">
              <MapPin className="w-8 h-8 text-white" />
            </div>
            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-4 leading-tight [text-shadow:_0_2px_20px_rgba(0,0,0,0.6)]">
              Relamping LED à Issy-les-Moulineaux
            </h1>
            <p className="text-xl md:text-2xl font-medium mb-6">
              <BulbText>1 M m² · Tech & tertiaire · Éclairage circadien</BulbText>
            </p>
            <p className="text-lg text-white/90 leading-relaxed [text-shadow:_0_1px_8px_rgba(0,0,0,0.5)]">
              Issy = la <strong>« Silicon Valley » française</strong> : ~1 M m²
              de bureaux à dominante tech (Microsoft France, Orange siège,
              Bouygues Telecom, Cap Gemini, Sopra Steria). Notre expertise =
              relamping LED haute QVT avec éclairage circadien (HCL) pour
              les plateaux où les équipes passent 9-10h par jour devant
              les écrans.
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

      {/* Issy en chiffres */}
      <section className="section-padding bg-surface">
        <div className="container-custom max-w-5xl">
          <SectionTitle
            badge="Le marché"
            title="Issy, le hub tech qui défie La Défense"
            subtitle="Le quartier d'affaires d'Issy-Val de Seine compte +1 M m² de bureaux, dont 60 % occupés par les filiales françaises des géants tech. Une concentration de plateaux open-space où l'éclairage = enjeu QVT direct."
          />
          <div className="grid md:grid-cols-3 gap-5 mb-8">
            <div className="p-5 rounded-2xl bg-surface-elevated border border-border">
              <div className="flex items-center gap-2 mb-2">
                <Building2 className="w-5 h-5 text-primary-500" />
                <span className="font-display font-bold text-foreground">~1 M m² de bureaux</span>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                2ᵉ pôle du 92 après La Défense. Issy-Val de Seine + zone
                Foch + axe Henri Sellier. Loyers prime ~420 €/m²/an HT/HC.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-surface-elevated border border-border">
              <div className="flex items-center gap-2 mb-2">
                <Cpu className="w-5 h-5 text-primary-500" />
                <span className="font-display font-bold text-foreground">Filiales tech &gt; 60 %</span>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Microsoft France (~31 000 m²), Orange siège, Bouygues
                Telecom, Cap Gemini, Sopra Steria. Standards d&apos;éclairage
                exigeants : flicker-free, circadien, tunable white.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-surface-elevated border border-border">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-primary-500" />
                <span className="font-display font-bold text-foreground">+25 % parc post-2010</span>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                25 % des bureaux d&apos;Issy sont post-RT2012 (livrés sur
                Issy-Val de Seine 2012-2024) → éclairage moderne. Les 75 %
                restants sont la cible relamping LED prioritaire.
              </p>
            </div>
          </div>
          <p className="text-sm text-foreground-muted text-center max-w-3xl mx-auto">
            Sources :{" "}
            <a
              href="https://www.insee.fr/fr/statistiques/2011101?geo=COM-92040"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 dark:text-primary-300 underline"
            >
              INSEE — Dossier Issy-les-Moulineaux
            </a>
            ,{" "}
            <a
              href="https://www.issy.com/economie"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 dark:text-primary-300 underline"
            >
              Ville d&apos;Issy — Économie
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
            .
          </p>
        </div>
      </section>

      {/* La spécificité Issy : circadien */}
      <section className="section-padding bg-surface-muted">
        <div className="container-custom max-w-4xl">
          <SectionTitle
            badge="L'angle Issy"
            title="Éclairage circadien (HCL) : pourquoi les sièges tech d'Issy l'adoptent en masse"
          />
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-lg leading-relaxed">
              Le <strong>Human-Centric Lighting (HCL)</strong> calque la
              température de couleur sur le rythme circadien : 5500-6500K
              le matin (vigilance, productivité), 4000K à midi, 3000K en fin
              de journée (transition vers le repos). Sur 9-10h de travail
              écran, l&apos;impact mesuré :
            </p>
            <ul className="space-y-2">
              <li className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary-500 mt-1 shrink-0" />
                <span>
                  <strong>−18 à −23 % de fatigue oculaire</strong> rapportée
                  (méta-analyse Lighting Research Center 2023).
                </span>
              </li>
              <li className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary-500 mt-1 shrink-0" />
                <span>
                  <strong>+8 à +12 % de productivité</strong> auto-mesurée
                  sur des tâches cognitives longues (CIE TC 6-71).
                </span>
              </li>
              <li className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary-500 mt-1 shrink-0" />
                <span>
                  <strong>Meilleure qualité de sommeil le soir</strong>{" "}
                  (transition 3000K limite la suppression de mélatonine).
                </span>
              </li>
            </ul>
            <p className="leading-relaxed">
              Pour un siège tech à Issy, l&apos;arbitrage HCL devient évident
              dès qu&apos;on regarde le coût d&apos;un arrêt maladie sur
              un développeur ou un consultant à ~120 k€/an de coût chargé.
              Notre approche : <strong>luminaires tunable white DALI-2</strong>
              {" "}(Trilux, Helvar, Casambi), scénarisation HCL programmée
              dans le système GTB existant, surcoût ~12-18 %/m² vs LED
              statique mais ROI QVT mesurable en 18-24 mois.
            </p>
          </div>
        </div>
      </section>

      {/* Pourquoi nous + Typologies */}
      <section className="section-padding bg-surface">
        <div className="container-custom max-w-5xl">
          <SectionTitle
            badge="Selon votre typologie"
            title="Quelle solution pour votre local à Issy ?"
          />
          <div className="grid md:grid-cols-2 gap-6">
            <Link
              href="/services/electricite/relamping/bureau-tertiaire"
              className="p-6 rounded-2xl bg-surface-elevated border border-border hover:border-primary-300 dark:hover:border-primary-500 transition-colors group"
            >
              <span className="font-display font-bold text-lg text-foreground group-hover:text-primary-600 dark:group-hover:text-primary-300 inline-flex items-center gap-2 mb-2">
                Siège tech 5 000-30 000 m²
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Open-space + bureaux fermés + salles de réunion + design rooms.
                Tunable white circadien obligatoire sur les plateaux &gt; 500 m².
                Flicker &lt; 5 % et UGR &lt; 19 systématiques. Budget 35-55 €/m².
              </p>
            </Link>
            <Link
              href="/services/electricite/relamping/commerce-restaurant"
              className="p-6 rounded-2xl bg-surface-elevated border border-border hover:border-primary-300 dark:hover:border-primary-500 transition-colors group"
            >
              <span className="font-display font-bold text-lg text-foreground group-hover:text-primary-600 dark:group-hover:text-primary-300 inline-flex items-center gap-2 mb-2">
                Restaurant inter-entreprises (RIE)
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Self, plateaux repas, mezzanines. Variation horaire complète
                (3000K pause vs 4000K rush midi). IRC ≥ 90 sur self
                obligatoire pour donner envie aux produits frais. Sécurité
                incendie BAES + balisage.
              </p>
            </Link>
            <Link
              href="/services/electricite/relamping/copropriete-parking"
              className="p-6 rounded-2xl bg-surface-elevated border border-border hover:border-primary-300 dark:hover:border-primary-500 transition-colors group"
            >
              <span className="font-display font-bold text-lg text-foreground group-hover:text-primary-600 dark:group-hover:text-primary-300 inline-flex items-center gap-2 mb-2">
                Parking souterrain bureaux
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Niveaux -1 à -3, allumage 24/7 sur fluo souvent. Passage en
                LED IP65 + détection présence : ROI 14-18 mois mesuré.
                Compatible IRVE : on prévoit la pré-câblage pour les
                bornes futures dans la rénovation.
              </p>
            </Link>
            <Link
              href="/services/electricite/relamping/industriel-entrepot"
              className="p-6 rounded-2xl bg-surface-elevated border border-border hover:border-primary-300 dark:hover:border-primary-500 transition-colors group"
            >
              <span className="font-display font-bold text-lg text-foreground group-hover:text-primary-600 dark:group-hover:text-primary-300 inline-flex items-center gap-2 mb-2">
                Data center / TGBT
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Salles serveurs + TGBT + locaux techniques. Robustesse IK10,
                flicker-free obligatoire (caméras de surveillance haut
                débit), 6500K vigilance pour les techniciens d&apos;astreinte.
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
            Audit photométrique, scénarisation circadienne, calcul ROI,
            gestion DALI-2, conformité décret tertiaire. Tout est détaillé
            sur la page pilier.
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
              Auditons votre éclairage à Issy gratuitement
            </h2>
            <p className="text-primary-100 text-lg">
              Audit sur site + simulation HCL personnalisée sous 7 jours.
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
