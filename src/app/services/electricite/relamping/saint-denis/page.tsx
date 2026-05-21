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
  Truck,
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

// EDITORIALISED 2026-05-21 — production quality. Saint-Denis = grande
// mutation industrielle → tertiaire/logistique. Stade de France, ZAC
// Pleyel (JO 2024 + Grand Paris). ~800k m² bureaux. Update annually.

export const metadata: Metadata = {
  title: "Relamping LED à Saint-Denis (93) — entrepôts, bureaux Pleyel, ERP | S Connect",
  description:
    "Spécialiste relamping LED à Saint-Denis (93200) : ZAC Pleyel post-JO 2024, entrepôts logistiques, sièges tertiaires (SFR, Bouygues, SNCF). ~800 000 m² bureaux. Audit gratuit, conformité NF EN 12464-1 et DEET 2030. Devis ferme sous 7 jours.",
  keywords: [
    "relamping LED Saint-Denis",
    "électricien Saint-Denis 93",
    "audit éclairage entrepôt 93",
    "relamping ZAC Pleyel",
    "DEET Saint-Denis 2030",
    "éclairage logistique 93",
  ],
  alternates: { canonical: "/services/electricite/relamping/saint-denis" },
  openGraph: {
    title: "Relamping LED à Saint-Denis — la grande mutation 93",
    description:
      "ZAC Pleyel post-JO 2024 + tissu logistique massif. Saint-Denis vit la plus grande transformation tertiaire d'IDF. Audit S Connect sous 48h.",
    images: ["/images/locations/saint-denis-hero.webp"],
    type: "website",
  },
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sconnectfrance.fr";
const serviceSchema = generateServiceSchema(
  {
    name: "Relamping LED à Saint-Denis (93200)",
    description:
      "Audit, étude et installation relamping LED pour entrepôts logistiques, bureaux tertiaires neufs Pleyel, ERP Stade de France et copropriétés à Saint-Denis. Conformité NF EN 12464-1 et décret tertiaire (DEET). Certifié Qualifélec + RGE + IRVE.",
    provider: "S Connect",
    areaServed: ["Saint-Denis", "Aubervilliers", "Pantin", "Île-de-France"],
    priceRange: "€€€",
  },
  siteUrl,
);

export default function RelampingSaintDenisPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={injectSchema(serviceSchema)} />

      {/* Hero */}
      <section className="relative bg-dark-950 py-16 md:py-24 overflow-hidden">
        <Image
          src="/images/locations/saint-denis-hero.webp"
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
                { label: "Saint-Denis" },
              ]}
            />
          </div>
          <div className="max-w-2xl">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-electric-500 rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-primary-500/30">
              <MapPin className="w-8 h-8 text-white" />
            </div>
            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-4 leading-tight [text-shadow:_0_2px_20px_rgba(0,0,0,0.6)]">
              Relamping LED à Saint-Denis
            </h1>
            <p className="text-xl md:text-2xl font-medium mb-6">
              <BulbText>ZAC Pleyel · Logistique · Stade de France</BulbText>
            </p>
            <p className="text-lg text-white/90 leading-relaxed [text-shadow:_0_1px_8px_rgba(0,0,0,0.5)]">
              Saint-Denis = la plus grande mutation tertiaire d&apos;IDF :
              <strong> ZAC Pleyel post-JO 2024</strong> (~620 000 m²
              nouveaux bureaux), Stade de France et son ERP catégorie 1, et
              un tissu logistique massif (~800 000 m² entrepôts répartis sur
              la Plaine Saint-Denis). Notre savoir-faire : éclairage haute
              puissance entrepôt + tertiaire neuf + ERP.
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

      {/* Saint-Denis en chiffres */}
      <section className="section-padding bg-surface">
        <div className="container-custom max-w-5xl">
          <SectionTitle
            badge="Le marché"
            title="Saint-Denis, le grand chantier tertiaire d'IDF nord"
            subtitle="JO 2024 + Grand Paris ont totalement reconfiguré le 93 sud. Saint-Denis concentre les sièges SFR, Bouygues Construction, SNCF Réseau, et a livré 620 000 m² nouveaux bureaux Pleyel. Le tissu logistique reste majeur."
          />
          <div className="grid md:grid-cols-3 gap-5 mb-8">
            <div className="p-5 rounded-2xl bg-surface-elevated border border-border">
              <div className="flex items-center gap-2 mb-2">
                <Building2 className="w-5 h-5 text-primary-500" />
                <span className="font-display font-bold text-foreground">ZAC Pleyel 620 k m²</span>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Le plus grand chantier tertiaire neuf du Grand Paris 2020-2025.
                Sièges SFR, Bouygues Construction, SNCF Réseau, services tech
                de Bouygues Telecom. Bâtiments post-RT2012 mais déjà
                concernés par DEET (sur la base de référence post-livraison).
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-surface-elevated border border-border">
              <div className="flex items-center gap-2 mb-2">
                <Truck className="w-5 h-5 text-primary-500" />
                <span className="font-display font-bold text-foreground">~800 k m² logistique</span>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Plaine Saint-Denis, ZAC Pleyel sud, axe A86. Entrepôts
                logistique BtoB et BtoC, last-mile delivery, ateliers
                logistiques urbains. Cible relamping LED massive
                (passage halo / fluo / mercure → LED IP65 haut flux).
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-surface-elevated border border-border">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-primary-500" />
                <span className="font-display font-bold text-foreground">Stade de France + V. Olympique</span>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                ERP catégorie 1 (Stade de France, U Arena, Centre Aquatique
                Olympique). BAES NF EN 1838, balisage de désenfumage,
                continuité d&apos;exploitation événementielle. Marchés
                publics gestion : SDIS 93 + SIM (Société immobilière des
                marchés couverts).
              </p>
            </div>
          </div>
          <p className="text-sm text-foreground-muted text-center max-w-3xl mx-auto">
            Sources :{" "}
            <a
              href="https://www.insee.fr/fr/statistiques/2011101?geo=COM-93066"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 dark:text-primary-300 underline"
            >
              INSEE — Dossier Saint-Denis
            </a>
            ,{" "}
            <a
              href="https://www.plaineco.fr/economie-plaine-saint-denis"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 dark:text-primary-300 underline"
            >
              Plaine Commune — Économie
            </a>
            ,{" "}
            <a
              href="https://www.grandparisamenagement.fr/operations/zac-pleyel"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 dark:text-primary-300 underline"
            >
              Grand Paris Aménagement — ZAC Pleyel
            </a>
            .
          </p>
        </div>
      </section>

      {/* Pourquoi nous à Saint-Denis */}
      <section className="section-padding bg-surface-muted">
        <div className="container-custom max-w-4xl">
          <SectionTitle
            badge="Pourquoi S Connect à Saint-Denis"
            title="L'expertise entrepôt + tertiaire neuf + ERP grand format"
          />
          <ul className="grid sm:grid-cols-2 gap-4">
            {[
              {
                title: "Expertise entrepôt LED haut flux",
                desc: "Hauteurs sous plafond 6-12m, LED 200W+ haute baie, optiques étroites/larges selon allées. IP65 anti-poussière, IK10 si zone de manutention.",
              },
              {
                title: "Tertiaire neuf post-2010",
                desc: "Bureaux Pleyel : optimisation DALI déjà câblée. Notre rôle = relamping ciblé + paramétrage scénarios + reporting DEET conforme OPERAT.",
              },
              {
                title: "ERP catégorie 1-2",
                desc: "Coordination SDIS 93 pour mise à jour dossier sécurité, BAES NF EN 1838, balisage de désenfumage, continuité d'exploitation événementielle.",
              },
              {
                title: "Réponse marchés publics",
                desc: "CCAP, BPU, RC : nous traitons les marchés publics avec rigueur. Décennale, attestations Qualifélec/RGE à jour, RIB fournisseur certifié.",
              },
              {
                title: "Couverture DEET 2030",
                desc: "Relamping LED = ROI 18-36 mois sur entrepôt logistique (allumage 12-16h/j). Trajectoire DEET sécurisée.",
              },
              {
                title: "Voisinage proche",
                desc: "Clichy → Saint-Denis via le périph nord en 22 min. Audit sous 48h, SAV 24h.",
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
              href="/services/electricite/relamping/industriel-entrepot"
              className="p-6 rounded-2xl bg-surface-elevated border border-border hover:border-primary-300 dark:hover:border-primary-500 transition-colors group"
            >
              <span className="font-display font-bold text-lg text-foreground group-hover:text-primary-600 dark:group-hover:text-primary-300 inline-flex items-center gap-2 mb-2">
                Entrepôt logistique 5 000-50 000 m²
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                LED haut flux 200-400 W, optiques étroites pour allées
                hautes, larges pour zones préparation. 200-300 lux selon
                zone, IP65, IK10. ROI 18-30 mois. Devis sous 14 jours
                pour gros volumes.
              </p>
            </Link>
            <Link
              href="/services/electricite/relamping/bureau-tertiaire"
              className="p-6 rounded-2xl bg-surface-elevated border border-border hover:border-primary-300 dark:hover:border-primary-500 transition-colors group"
            >
              <span className="font-display font-bold text-lg text-foreground group-hover:text-primary-600 dark:group-hover:text-primary-300 inline-flex items-center gap-2 mb-2">
                Siège Pleyel (SFR, Bouygues, SNCF)
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Bureaux neufs post-2020. Optimisation DALI existante,
                scénarios circadien, reporting DEET sur OPERAT.
                Budget 18-28 €/m² (déjà LED, juste paramétrage + capteurs).
              </p>
            </Link>
            <Link
              href="/services/electricite/relamping/commerce-restaurant"
              className="p-6 rounded-2xl bg-surface-elevated border border-border hover:border-primary-300 dark:hover:border-primary-500 transition-colors group"
            >
              <span className="font-display font-bold text-lg text-foreground group-hover:text-primary-600 dark:group-hover:text-primary-300 inline-flex items-center gap-2 mb-2">
                ERP catégorie 1-2 (stade, arena)
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Halls d&apos;entrée public, couloirs de circulation, gradins.
                BAES + balisage NF EN 1838 obligatoire. Continuité
                événementielle = intervention en jours non-jeu. SDIS 93
                coordination systématique.
              </p>
            </Link>
            <Link
              href="/services/electricite/relamping/copropriete-parking"
              className="p-6 rounded-2xl bg-surface-elevated border border-border hover:border-primary-300 dark:hover:border-primary-500 transition-colors group"
            >
              <span className="font-display font-bold text-lg text-foreground group-hover:text-primary-600 dark:group-hover:text-primary-300 inline-flex items-center gap-2 mb-2">
                Copropriété quartier Basilique
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Halls, paliers, parkings souterrains. Détection présence +
                gradation crépusculaire. ROI 3-5 ans. ABF si proximité
                Basilique Saint-Denis (axe Maréchal de Lattre).
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
            Audit photométrique, calcul ROI, gestion DALI, conformité NF EN
            12464-1 et DEET 2030. Réponse marchés publics et privés.
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
              Auditons votre éclairage à Saint-Denis gratuitement
            </h2>
            <p className="text-primary-100 text-lg">
              Audit sous 48h. Rapport DEET 2030 + ROI sous 7 jours. Sans engagement.
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
