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

// EDITORIALISED 2026-05-21 — production quality. Puteaux = cœur Défense
// côté 92 (Total, Mozart, T1) + résidentiel haut de gamme côté Seine.
// ~600 k m² bureaux. Update annually.

export const metadata: Metadata = {
  title: "Relamping LED à Puteaux — cœur La Défense + résidentiel haut de gamme | S Connect",
  description:
    "Spécialiste relamping LED à Puteaux (92800) : cœur de La Défense côté 92 (tours Total, Mozart, T1), résidentiel haut de gamme bord de Seine. ~600 k m² bureaux. Audit gratuit, conformité NF EN 12464-1 et DEET 2030. Devis ferme sous 7 jours.",
  keywords: [
    "relamping LED Puteaux",
    "électricien Puteaux 92800",
    "audit éclairage tour La Défense Puteaux",
    "tour Total Mozart relamping",
    "DEET Puteaux 2030",
    "éclairage tertiaire Puteaux",
  ],
  alternates: { canonical: "/services/electricite/relamping/puteaux" },
  openGraph: {
    title: "Relamping LED à Puteaux — le cœur de La Défense",
    description:
      "Cœur La Défense côté 92 : tours Total, Mozart, T1. S Connect, voisin direct, audite sous 48h. ~600 k m² éligibles DEET 2030.",
    images: ["/images/locations/puteaux-hero.webp"],
    type: "website",
  },
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sconnectfrance.fr";
const serviceSchema = generateServiceSchema(
  {
    name: "Relamping LED à Puteaux (92800)",
    description:
      "Audit, étude et installation relamping LED pour bureaux tertiaires (tours de La Défense côté Puteaux : Total, Mozart, T1, Engie), copropriétés haut de gamme et commerces. Conformité NF EN 12464-1 et décret tertiaire. Certifié Qualifélec + RGE + IRVE.",
    provider: "S Connect",
    areaServed: ["Puteaux", "Courbevoie", "La Défense", "Suresnes", "Île-de-France"],
    priceRange: "€€€",
  },
  siteUrl,
);

export default function RelampingPuteauxPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={injectSchema(serviceSchema)} />

      {/* Hero */}
      <section className="relative bg-dark-950 py-16 md:py-24 overflow-hidden">
        <Image
          src="/images/locations/puteaux-hero.webp"
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
                { label: "Puteaux" },
              ]}
            />
          </div>
          <div className="max-w-2xl">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-electric-500 rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-primary-500/30">
              <MapPin className="w-8 h-8 text-white" />
            </div>
            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-4 leading-tight [text-shadow:_0_2px_20px_rgba(0,0,0,0.6)]">
              Relamping LED à Puteaux
            </h1>
            <p className="text-xl md:text-2xl font-medium mb-6">
              <BulbText>Cœur La Défense · 600 k m² · Bord de Seine</BulbText>
            </p>
            <p className="text-lg text-white/90 leading-relaxed [text-shadow:_0_1px_8px_rgba(0,0,0,0.5)]">
              Puteaux est le <strong>cœur de La Défense côté 92</strong> : Tour
              Total, Tour Mozart, Tour T1 partagée avec Courbevoie, tours
              Engie. Côté Seine, un résidentiel haut de gamme qui complète le
              tissu. ~600 k m² de bureaux + copropriétés premium —
              tous concernés par le DEET 2030.
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

      {/* Puteaux en chiffres */}
      <section className="section-padding bg-surface">
        <div className="container-custom max-w-5xl">
          <SectionTitle
            badge="Le marché"
            title="Puteaux, deux quartiers d'éclairage différents"
            subtitle="Tertiaire grand format côté Défense, et tissu résidentiel haut de gamme côté Seine. Une commune où la valeur immobilière dépend directement de la qualité de l'éclairage commun (halls, paliers, parkings)."
          />
          <div className="grid md:grid-cols-3 gap-5 mb-8">
            <div className="p-5 rounded-2xl bg-surface-elevated border border-border">
              <div className="flex items-center gap-2 mb-2">
                <Building2 className="w-5 h-5 text-primary-500" />
                <span className="font-display font-bold text-foreground">~600 000 m² bureaux</span>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Tour Total (152 m, 2008), Tour Mozart (78 m), Tour T1
                partagée (185 m, 2008), Tours Engie. Loyers ~530-630 €/m²/an
                HT/HC en haut des tours, 380-440 € en mid-rise.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-surface-elevated border border-border">
              <div className="flex items-center gap-2 mb-2">
                <Layers className="w-5 h-5 text-primary-500" />
                <span className="font-display font-bold text-foreground">Tours mixtes 70s / 2000s</span>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Cohabitation tours pré-2010 (Mozart, ancien Total) et
                tours post-2010 (Total, T1, Engie). Approche différenciée
                selon la génération : relamping massif sur pré-2010,
                optimisation DALI sur post-2010.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-surface-elevated border border-border">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-primary-500" />
                <span className="font-display font-bold text-foreground">Copros haut de gamme</span>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Quartier Bergères, Place du Théâtre, bord de Seine.
                Copropriétés premium où les charges éclairage communes
                pèsent — relamping = arbitrage évident sur ROI 3-5 ans.
              </p>
            </div>
          </div>
          <p className="text-sm text-foreground-muted text-center max-w-3xl mx-auto">
            Sources :{" "}
            <a
              href="https://www.insee.fr/fr/statistiques/2011101?geo=COM-92062"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 dark:text-primary-300 underline"
            >
              INSEE — Dossier Puteaux
            </a>
            ,{" "}
            <a
              href="https://www.parisladefense.com/fr/le-quartier-en-chiffres"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 dark:text-primary-300 underline"
            >
              Paris La Défense — Chiffres
            </a>
            ,{" "}
            <a
              href="https://www.bnppre.fr/etudes-marche/marche-bureaux-paris-region.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 dark:text-primary-300 underline"
            >
              BNP Paribas RE — Bureaux 92
            </a>
            .
          </p>
        </div>
      </section>

      {/* Pourquoi nous à Puteaux */}
      <section className="section-padding bg-surface-muted">
        <div className="container-custom max-w-4xl">
          <SectionTitle
            badge="Pourquoi S Connect à Puteaux"
            title="Le mariage tour grand format / copropriété premium"
          />
          <ul className="grid sm:grid-cols-2 gap-4">
            {[
              {
                title: "Expertise tour Défense",
                desc: "Plateaux 1 000-2 500 m² par étage. DALI-2 obligatoire, scénarisation jour/nuit, intervention nuit/weekend sans surcoût exorbitant.",
              },
              {
                title: "Expertise copropriété premium",
                desc: "Halls dorés, paliers, parkings -1 à -3. Détection présence + LED IP65 anti-vandale. Vote AG ciblé, présentation chiffrée que vous pouvez utiliser.",
              },
              {
                title: "Devis ferme = facture finale",
                desc: "Engagement contractuel. Mesures, étude, modèle ROI sous 7 jours.",
              },
              {
                title: "Couverture DEET 2030",
                desc: "Trajectoire −40 % cohérente. Relamping = +60 % du gisement éclairage. ROI 3-5 ans sur tour, 2-3 ans sur parking.",
              },
              {
                title: "Multi-marques pro",
                desc: "Trilux, Philips, Sylvania, Hager, Schneider, ABB. Spécification du luminaire qui convient à votre tour, pas captivité.",
              },
              {
                title: "Voisinage immédiat",
                desc: "Clichy → Puteaux via Asnières en 20 min. Audit sous 48h, SAV 24h.",
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
                Tour Total / Mozart / T1 / Engie
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Plateaux open-space + bureaux fermés + salles de comité.
                Tunable white circadien sur grands plateaux, IRC ≥ 90 sur
                salles de comité direction. Budget 32-50 €/m² selon le
                niveau de standing du locataire.
              </p>
            </Link>
            <Link
              href="/services/electricite/relamping/copropriete-parking"
              className="p-6 rounded-2xl bg-surface-elevated border border-border hover:border-primary-300 dark:hover:border-primary-500 transition-colors group"
            >
              <span className="font-display font-bold text-lg text-foreground group-hover:text-primary-600 dark:group-hover:text-primary-300 inline-flex items-center gap-2 mb-2">
                Copro premium Bergères / Théâtre
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Halls, paliers, escaliers, parkings souterrains.
                Préservation des luminaires d&apos;époque (appliques
                bronze, lustres) + ajout LED discrètes. Détection
                présence + gradation crépusculaire. ROI 3-5 ans.
              </p>
            </Link>
            <Link
              href="/services/electricite/relamping/commerce-restaurant"
              className="p-6 rounded-2xl bg-surface-elevated border border-border hover:border-primary-300 dark:hover:border-primary-500 transition-colors group"
            >
              <span className="font-display font-bold text-lg text-foreground group-hover:text-primary-600 dark:group-hover:text-primary-300 inline-flex items-center gap-2 mb-2">
                Centre commercial Les 4 Temps
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Galeries marchandes, halls, allées. Continuité
                d&apos;exploitation = intervention de nuit obligatoire,
                balisage temporaire NF EN 1838. Coordination avec
                la sécurité 24/7.
              </p>
            </Link>
            <Link
              href="/services/electricite/relamping/industriel-entrepot"
              className="p-6 rounded-2xl bg-surface-elevated border border-border hover:border-primary-300 dark:hover:border-primary-500 transition-colors group"
            >
              <span className="font-display font-bold text-lg text-foreground group-hover:text-primary-600 dark:group-hover:text-primary-300 inline-flex items-center gap-2 mb-2">
                Locaux techniques + IRVE
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Sous-sols techniques + parkings souterrains avec ajout
                de bornes IRVE. Robustesse IK10, pré-câblage IRVE
                inclus dans rénovation. Certifié IRVE niveau 2 — pas
                besoin d&apos;un 2ᵉ prestataire.
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
            décret tertiaire. Tout détaillé sur la page pilier.
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
              Auditons votre éclairage à Puteaux gratuitement
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
