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
  Layers,
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

// EDITORIALISED 2026-05-21 — production quality. Courbevoie = adjacent
// La Défense, mix tours bureaux (CB16, CB21, T1) + résidentiel haut de
// gamme + faubourg historique. ~700 k m² bureaux totaux. Update annually.

export const metadata: Metadata = {
  title: "Relamping LED à Courbevoie — adjacent La Défense, 700 k m² bureaux | S Connect",
  description:
    "Spécialiste relamping LED à Courbevoie (92400) : adjacent à La Défense, ~700 k m² de bureaux (tours CB16, CB21, T1 partagées), faubourg historique. Audit gratuit, conformité NF EN 12464-1, DEET 2030, DALI. Devis ferme sous 7 jours.",
  keywords: [
    "relamping LED Courbevoie",
    "électricien Courbevoie 92400",
    "audit éclairage La Défense Courbevoie",
    "relamping tour CB16 CB21 T1",
    "DEET Courbevoie 2030",
    "éclairage faubourg Courbevoie",
  ],
  alternates: { canonical: "/services/electricite/relamping/courbevoie" },
  openGraph: {
    title: "Relamping LED à Courbevoie — la moitié sud de La Défense",
    description:
      "700 k m² de bureaux à Courbevoie dont la moitié des tours de La Défense (CB16, CB21, T1). S Connect, voisin direct, audite sous 48h.",
    images: ["/images/locations/courbevoie-hero.webp"],
    type: "website",
  },
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sconnectfrance.fr";
const serviceSchema = generateServiceSchema(
  {
    name: "Relamping LED à Courbevoie (92400)",
    description:
      "Audit, étude et installation relamping LED pour bureaux tertiaires, tours de La Défense côté Courbevoie, copropriétés et commerces. Conformité NF EN 12464-1 et décret tertiaire (DEET). Certifié Qualifélec + RGE + IRVE.",
    provider: "S Connect",
    areaServed: ["Courbevoie", "La Défense", "Puteaux", "Levallois-Perret", "Île-de-France"],
    priceRange: "€€€",
  },
  siteUrl,
);

export default function RelampingCourbevoiePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={injectSchema(serviceSchema)} />

      {/* Hero */}
      <section className="relative bg-dark-950 py-16 md:py-24 overflow-hidden">
        <Image
          src="/images/locations/courbevoie-hero.webp"
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
                { label: "Courbevoie" },
              ]}
            />
          </div>
          <div className="max-w-2xl">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-electric-500 rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-primary-500/30">
              <MapPin className="w-8 h-8 text-white" />
            </div>
            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-4 leading-tight [text-shadow:_0_2px_20px_rgba(0,0,0,0.6)]">
              Relamping LED à Courbevoie
            </h1>
            <p className="text-xl md:text-2xl font-medium mb-6">
              <BulbText>Adjacent La Défense · 700 k m² · DEET 2030</BulbText>
            </p>
            <p className="text-lg text-white/90 leading-relaxed [text-shadow:_0_1px_8px_rgba(0,0,0,0.5)]">
              Courbevoie = la moitié sud de La Défense + un faubourg
              historique. <strong>700 k m² de bureaux</strong> dont
              les tours CB16, CB21 et T1 côté Courbevoie, complétés
              par les bureaux Quartier Faubourg et le tissu PME local.
              Notre couverture : tertiaire grand format + copropriétés
              + commerces de proximité.
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

      {/* Courbevoie en chiffres */}
      <section className="section-padding bg-surface">
        <div className="container-custom max-w-5xl">
          <SectionTitle
            badge="Le marché"
            title="Courbevoie, deux mondes en un quartier"
            subtitle="Le partage Courbevoie / Puteaux fait de La Défense ne se voit pas sur la carte mentale : pour les sièges de tour CB16, CB21 et T1, votre adresse postale est Courbevoie. Et le faubourg historique reste un tissu PME et commerces vivant."
          />
          <div className="grid md:grid-cols-3 gap-5 mb-8">
            <div className="p-5 rounded-2xl bg-surface-elevated border border-border">
              <div className="flex items-center gap-2 mb-2">
                <Building2 className="w-5 h-5 text-primary-500" />
                <span className="font-display font-bold text-foreground">~700 000 m² bureaux</span>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                ~50 % en tours côté Défense (CB16, CB21, T1, Granite,
                Engie), ~50 % en faubourg + axe Bécon-les-Bruyères.
                Mix unique tour premium / bureaux PME.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-surface-elevated border border-border">
              <div className="flex items-center gap-2 mb-2">
                <Layers className="w-5 h-5 text-primary-500" />
                <span className="font-display font-bold text-foreground">Tours pré-2010 dominantes</span>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                CB16 (1974), CB21 (1974), T1 (2008) : les tours
                Courbevoie sont parmi les plus anciennes de La Défense.
                Donc l&apos;éclairage est un terrain prioritaire pour
                la trajectoire DEET 2030.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-surface-elevated border border-border">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-primary-500" />
                <span className="font-display font-bold text-foreground">15 min depuis Clichy</span>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Clichy → Courbevoie via Asnières en 15 min. Audit sous
                48h, SAV sous 24h, intervention nuit/weekend sur les
                tours sans surcoût exorbitant.
              </p>
            </div>
          </div>
          <p className="text-sm text-foreground-muted text-center max-w-3xl mx-auto">
            Sources :{" "}
            <a
              href="https://www.insee.fr/fr/statistiques/2011101?geo=COM-92026"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 dark:text-primary-300 underline"
            >
              INSEE — Dossier Courbevoie
            </a>
            ,{" "}
            <a
              href="https://www.parisladefense.com/fr/le-quartier-en-chiffres"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 dark:text-primary-300 underline"
            >
              Paris La Défense — Le quartier en chiffres
            </a>
            ,{" "}
            <a
              href="https://www.bnppre.fr/etudes-marche/marche-bureaux-paris-region.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 dark:text-primary-300 underline"
            >
              BNP Paribas RE — Marché bureaux 92
            </a>
            .
          </p>
        </div>
      </section>

      {/* Pourquoi nous à Courbevoie */}
      <section className="section-padding bg-surface-muted">
        <div className="container-custom max-w-4xl">
          <SectionTitle
            badge="Pourquoi S Connect à Courbevoie"
            title="L'expertise tour + l'agilité PME"
          />
          <ul className="grid sm:grid-cols-2 gap-4">
            {[
              {
                title: "Tour 1974 = défi technique",
                desc: "Hauteurs sous plafond mixtes (2.6 à 3.2m), gaines techniques saturées, faux plafond en cassettes anciennes. Notre savoir-faire : luminaires encastrables 600x600 LED tunable white compatibles cassettes existantes (zéro modif structure).",
              },
              {
                title: "Devis ferme = facture finale",
                desc: "Engagement contractuel. Mesures, étude, modèle ROI sous 7 jours.",
              },
              {
                title: "DEET 2030 sur tour",
                desc: "Trajectoire −40 % cohérente : relamping = +60 % du gisement éclairage. ROI 3-5 ans.",
              },
              {
                title: "Multi-marques pro",
                desc: "Trilux, Philips, Sylvania, Hager, Schneider, ABB. Pas de captivité.",
              },
              {
                title: "Voisinage immédiat",
                desc: "Clichy → Courbevoie en 15 min. Audit sous 48h, SAV 24h.",
              },
              {
                title: "Garanties pro",
                desc: "Décennale active, Qualifélec mention Éclairage, RGE, IRVE niveau 2.",
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

      {/* Typologies */}
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
                Tour CB16 / CB21 / T1
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Plateaux 1 000-2 500 m² par étage. Approche zonale, DALI-2
                obligatoire, scénarisation jour/nuit, intervention nuit/weekend.
                Budget 28-45 €/m² selon le standing de la tour.
              </p>
            </Link>
            <Link
              href="/services/electricite/relamping/bureau-tertiaire"
              className="p-6 rounded-2xl bg-surface-elevated border border-border hover:border-primary-300 dark:hover:border-primary-500 transition-colors group"
            >
              <span className="font-display font-bold text-lg text-foreground group-hover:text-primary-600 dark:group-hover:text-primary-300 inline-flex items-center gap-2 mb-2">
                Bureau PME faubourg
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                100-1 000 m² typiques. Approche agile, ROI rapide, conforme
                NF EN 12464-1 sans la complexité d&apos;un grand tertiaire.
                Budget 25-35 €/m². Devis sous 7 jours.
              </p>
            </Link>
            <Link
              href="/services/electricite/relamping/copropriete-parking"
              className="p-6 rounded-2xl bg-surface-elevated border border-border hover:border-primary-300 dark:hover:border-primary-500 transition-colors group"
            >
              <span className="font-display font-bold text-lg text-foreground group-hover:text-primary-600 dark:group-hover:text-primary-300 inline-flex items-center gap-2 mb-2">
                Copropriété + parking souterrain
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Halls, escaliers, parkings -1 à -3. Détection présence +
                LED IP65 anti-vandale. ROI 14-18 mois sur parking. Vote AG
                ciblé, présentation chiffrée que vous pouvez utiliser
                directement.
              </p>
            </Link>
            <Link
              href="/services/electricite/relamping/commerce-restaurant"
              className="p-6 rounded-2xl bg-surface-elevated border border-border hover:border-primary-300 dark:hover:border-primary-500 transition-colors group"
            >
              <span className="font-display font-bold text-lg text-foreground group-hover:text-primary-600 dark:group-hover:text-primary-300 inline-flex items-center gap-2 mb-2">
                Commerce / restaurant proximité
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Boulangerie, restaurant, agence bancaire de quartier.
                Éclairage d&apos;accentuation + ambiance. IRC ≥ 90 sur
                vitrine. Intervention nuit pour zéro impact CA.
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
            Audit photométrique, calcul ROI, gestion DALI-2, conformité
            décret tertiaire. Tout est détaillé sur la page pilier.
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
              Auditons votre éclairage à Courbevoie gratuitement
            </h2>
            <p className="text-primary-100 text-lg">
              Audit sous 48h + ROI DEET 2030 sous 7 jours. Sans engagement.
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
