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
  Store,
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

// EDITORIALISED 2026-05-21 — production quality. Asnières = commune
// limitrophe Clichy (à 5 min), tissu mixte PME + commerces + résidentiel
// haut de gamme. ~250 k m² bureaux. Update annually.

export const metadata: Metadata = {
  title: "Relamping LED à Asnières-sur-Seine — PME, commerces, copropriétés | S Connect",
  description:
    "Spécialiste relamping LED à Asnières-sur-Seine (92600) : tissu mixte PME + commerces + copropriétés à 5 min de notre atelier de Clichy. Audit gratuit, conformité NF EN 12464-1 et DEET 2030. Devis ferme sous 7 jours.",
  keywords: [
    "relamping LED Asnières-sur-Seine",
    "électricien Asnières 92600",
    "audit éclairage PME Asnières",
    "relamping commerce Asnières",
    "DEET Asnières 2030",
    "éclairage copropriété Asnières",
  ],
  alternates: { canonical: "/services/electricite/relamping/asnieres-sur-seine" },
  openGraph: {
    title: "Relamping LED à Asnières — le voisin de palier S Connect",
    description:
      "Asnières est à 5 min de notre atelier de Clichy. Audit sous 48h, SAV 24h. Tissu PME, commerces, copropriétés — nous connaissons votre quartier.",
    images: ["/images/locations/asnieres-sur-seine-hero.webp"],
    type: "website",
  },
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sconnectfrance.fr";
const serviceSchema = generateServiceSchema(
  {
    name: "Relamping LED à Asnières-sur-Seine (92600)",
    description:
      "Audit, étude et installation relamping LED pour PME, commerces, copropriétés et locaux administratifs à Asnières-sur-Seine. Conformité NF EN 12464-1 et décret tertiaire. Certifié Qualifélec + RGE + IRVE.",
    provider: "S Connect",
    areaServed: ["Asnières-sur-Seine", "Clichy", "Bois-Colombes", "Gennevilliers", "Île-de-France"],
    priceRange: "€€€",
  },
  siteUrl,
);

export default function RelampingAsnieresSurSeinePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={injectSchema(serviceSchema)} />

      {/* Hero */}
      <section className="relative bg-dark-950 py-16 md:py-24 overflow-hidden">
        <Image
          src="/images/locations/asnieres-sur-seine-hero.webp"
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
                { label: "Asnières-sur-Seine" },
              ]}
            />
          </div>
          <div className="max-w-2xl">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-electric-500 rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-primary-500/30">
              <MapPin className="w-8 h-8 text-white" />
            </div>
            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-4 leading-tight [text-shadow:_0_2px_20px_rgba(0,0,0,0.6)]">
              Relamping LED à Asnières-sur-Seine
            </h1>
            <p className="text-xl md:text-2xl font-medium mb-6">
              <BulbText>Voisin direct · PME · Commerces · Copros</BulbText>
            </p>
            <p className="text-lg text-white/90 leading-relaxed [text-shadow:_0_1px_8px_rgba(0,0,0,0.5)]">
              Asnières est notre <strong>commune limitrophe</strong> : 5 minutes
              du 35 rue des Cailloux. Tissu unique : PME industrielles et
              tertiaires, commerces de proximité (centre-ville + axe Charles
              de Gaulle), copropriétés résidentielles haut de gamme bord de
              Seine. Audit gratuit sous 48h, SAV sous 24h.
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

      {/* Asnières en chiffres */}
      <section className="section-padding bg-surface">
        <div className="container-custom max-w-5xl">
          <SectionTitle
            badge="Le marché"
            title="Asnières, le tissu PME et résidentiel premium du 92 nord"
            subtitle="Pas de tours, pas de sièges sociaux du CAC 40 — mais un écosystème équilibré PME + commerces + résidentiel haut de gamme à proximité immédiate de Paris et de La Défense."
          />
          <div className="grid md:grid-cols-3 gap-5 mb-8">
            <div className="p-5 rounded-2xl bg-surface-elevated border border-border">
              <div className="flex items-center gap-2 mb-2">
                <Building2 className="w-5 h-5 text-primary-500" />
                <span className="font-display font-bold text-foreground">~250 000 m² bureaux</span>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Tertiaire PME et indépendants. Zones d&apos;activité (ZI
                Béteux, Quartier Aulagnier). Loyers ~210-260 €/m²/an
                HT/HC — accessibles pour les PME en croissance.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-surface-elevated border border-border">
              <div className="flex items-center gap-2 mb-2">
                <Store className="w-5 h-5 text-primary-500" />
                <span className="font-display font-bold text-foreground">Tissu commerçant dense</span>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Rue de la Sablière, centre-ville, Place des Bourguignons.
                Boulangeries, restaurants, agences, pharmacies. ROI
                éclairage 2-4 ans sur l&apos;ensemble du tissu commerçant.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-surface-elevated border border-border">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-primary-500" />
                <span className="font-display font-bold text-foreground">86 000 habitants</span>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                3ᵉ commune du 92 par la population. Tissu résidentiel
                dense : copropriétés haussmanniennes et années 70/80
                en grande majorité. Halls, paliers, parkings = gisement
                relamping prioritaire.
              </p>
            </div>
          </div>
          <p className="text-sm text-foreground-muted text-center max-w-3xl mx-auto">
            Sources :{" "}
            <a
              href="https://www.insee.fr/fr/statistiques/2011101?geo=COM-92004"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 dark:text-primary-300 underline"
            >
              INSEE — Dossier Asnières-sur-Seine
            </a>
            ,{" "}
            <a
              href="https://www.asnieres-sur-seine.fr/economie-emploi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 dark:text-primary-300 underline"
            >
              Ville d&apos;Asnières — Économie
            </a>
            ,{" "}
            <a
              href="https://operat.ademe.fr/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 dark:text-primary-300 underline"
            >
              ADEME — OPERAT (DEET)
            </a>
            .
          </p>
        </div>
      </section>

      {/* Pourquoi nous à Asnières */}
      <section className="section-padding bg-surface-muted">
        <div className="container-custom max-w-4xl">
          <SectionTitle
            badge="Pourquoi S Connect à Asnières"
            title="Le voisin de palier qui connaît votre quartier"
          />
          <ul className="grid sm:grid-cols-2 gap-4">
            {[
              {
                title: "5 minutes de chez vous",
                desc: "Clichy → Asnières via le Pont de l'Île de la Jatte en 8 min. Audit sous 24h sur les dossiers urgents.",
              },
              {
                title: "Échelle PME maîtrisée",
                desc: "Locaux 50-1 000 m². ROI rapide, conformité NF EN 12464-1 sans la complexité grand tertiaire. Budget 22-32 €/m².",
              },
              {
                title: "Spécialiste commerce de quartier",
                desc: "Boulangerie, restaurant, pharmacie, agence. Éclairage d'accentuation + ambiance. IRC ≥ 90 sur vitrines. Intervention nuit pour CA préservé.",
              },
              {
                title: "Copropriété haussmannienne",
                desc: "Halls, paliers, parkings souterrains. Vote AG ciblé, présentation chiffrée que vous pouvez utiliser directement.",
              },
              {
                title: "Devis ferme = facture finale",
                desc: "Engagement contractuel. Aucun supplément après mise en service. Mesures luxmètre étalonné.",
              },
              {
                title: "Couverture DEET (PME > 1 000 m²)",
                desc: "Les sièges sociaux PME > 1 000 m² sont également concernés par le DEET. ROI 2-3 ans typique en relamping seul.",
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
                Bureau PME / agence
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                50-1 000 m² typiques. Approche agile, ROI rapide,
                conforme NF EN 12464-1 sans surdimensionnement.
                Budget 22-32 €/m². Devis sous 7 jours.
              </p>
            </Link>
            <Link
              href="/services/electricite/relamping/commerce-restaurant"
              className="p-6 rounded-2xl bg-surface-elevated border border-border hover:border-primary-300 dark:hover:border-primary-500 transition-colors group"
            >
              <span className="font-display font-bold text-lg text-foreground group-hover:text-primary-600 dark:group-hover:text-primary-300 inline-flex items-center gap-2 mb-2">
                Commerce centre-ville
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Boulangerie, restaurant, agence bancaire, pharmacie.
                Éclairage d&apos;accentuation IRC ≥ 90 sur vitrine,
                3000K-4000K selon ambiance. ROI 2-3 ans.
              </p>
            </Link>
            <Link
              href="/services/electricite/relamping/copropriete-parking"
              className="p-6 rounded-2xl bg-surface-elevated border border-border hover:border-primary-300 dark:hover:border-primary-500 transition-colors group"
            >
              <span className="font-display font-bold text-lg text-foreground group-hover:text-primary-600 dark:group-hover:text-primary-300 inline-flex items-center gap-2 mb-2">
                Copropriété résidentielle
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Halls, paliers, escaliers, parkings souterrains.
                Détection présence + gradation crépusculaire. Pack
                charges-d&apos;exploitation possible — pas d&apos;appel
                de fonds. Vote AG ciblé.
              </p>
            </Link>
            <Link
              href="/services/electricite/relamping/industriel-entrepot"
              className="p-6 rounded-2xl bg-surface-elevated border border-border hover:border-primary-300 dark:hover:border-primary-500 transition-colors group"
            >
              <span className="font-display font-bold text-lg text-foreground group-hover:text-primary-600 dark:group-hover:text-primary-300 inline-flex items-center gap-2 mb-2">
                Entrepôt / atelier ZA Béteux
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Locaux activité 200-3 000 m². LED IP65 anti-poussière,
                détection présence sur zones allées, conformité NF EN
                12464-1 (300 lux atelier, 500 lux poste précision).
                IRVE possible en pré-câblage.
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
            Audit photométrique, calcul ROI, conformité NF EN 12464-1
            et DEET 2030. Tout détaillé sur la page pilier.
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
              Auditons votre éclairage à Asnières gratuitement
            </h2>
            <p className="text-primary-100 text-lg">
              Audit sous 48h. Rapport ROI sous 7 jours. Sans engagement.
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
