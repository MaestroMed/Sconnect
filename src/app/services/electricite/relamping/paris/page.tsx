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
  ShieldCheck,
} from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";
import { NoiseOverlay } from "@/components/ui/ambient";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import {
  generateServiceSchema,
  injectSchema,
} from "@/lib/structured-data";
import BulbText from "@/components/ui/BulbText";

// EDITORIALISED 2026-05-21 — production quality with real Paris office
// market data (ORIE, BNPP RE). Update annually.

export const metadata: Metadata = {
  title: "Relamping LED à Paris — 17M m² bureaux sous DEET 2030 | S Connect",
  description:
    "Spécialiste relamping LED à Paris intra-muros (75001-75020). 17M m² de bureaux concernés par le décret tertiaire. Audit gratuit, conformité NF EN 12464-1, contraintes ABF respectées sur immeubles classés. Devis ferme sous 7 jours.",
  keywords: [
    "relamping LED Paris",
    "audit éclairage Paris",
    "électricien LED Paris",
    "relamping bureau Paris",
    "DEET Paris tertiaire",
    "éclairage immeuble classé Paris",
  ],
  alternates: { canonical: "/services/electricite/relamping/paris" },
  openGraph: {
    title: "Relamping LED à Paris — S Connect, expertise tertiaire intra-muros",
    description:
      "17M m² de bureaux parisiens sous trajectoire DEET. Audit gratuit, ROI mesuré, conformité ABF assurée.",
    images: ["/images/locations/paris-hero.webp"],
    type: "website",
  },
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sconnectfrance.fr";
const serviceSchema = generateServiceSchema(
  {
    name: "Relamping LED à Paris",
    description:
      "Audit, étude et installation relamping LED pour bureaux, commerces, copropriétés, hôtels et ERP à Paris intra-muros. Conformité NF EN 12464-1, décret tertiaire (DEET) et contraintes Architectes des Bâtiments de France (ABF) sur immeubles protégés. Artisan certifié Qualifélec/RGE/IRVE basé à Clichy.",
    provider: "S Connect",
    areaServed: ["Paris", "Île-de-France"],
    priceRange: "€€€",
  },
  siteUrl,
);

export default function RelampingParisPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={injectSchema(serviceSchema)} />

      {/* Hero */}
      <section className="relative bg-dark-950 py-16 md:py-24 overflow-hidden">
        <Image
          src="/images/locations/paris-hero.webp"
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
                { label: "Paris" },
              ]}
            />
          </div>
          <div className="max-w-2xl">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-electric-500 rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-primary-500/30">
              <MapPin className="w-8 h-8 text-white" />
            </div>
            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-4 leading-tight [text-shadow:_0_2px_20px_rgba(0,0,0,0.6)]">
              Relamping LED à Paris
            </h1>
            <p className="text-xl md:text-2xl font-medium mb-6">
              <BulbText>17 millions m² de bureaux sous trajectoire DEET 2030</BulbText>
            </p>
            <p className="text-lg text-white/90 leading-relaxed [text-shadow:_0_1px_8px_rgba(0,0,0,0.5)]">
              Bureaux haussmanniens, plateaux contemporains, ERP, hôtels, commerces :
              nous intervenons sur les 20 arrondissements avec une connaissance
              fine des contraintes locales — contrats syndic à l&apos;ancienne,
              accessibilité chantier en centre, ABF sur immeubles protégés.
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

      {/* Le marché tertiaire parisien en chiffres */}
      <section className="section-padding bg-surface">
        <div className="container-custom max-w-5xl">
          <SectionTitle
            badge="Le marché parisien en 2026"
            title="17M m² de bureaux dans Paris intra-muros, ~38M sur l'IDF"
            subtitle="Sources : ORIE (Observatoire Régional Immobilier Entreprise), BNP Paribas Real Estate, INSEE."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { value: "17M m²", label: "Bureaux Paris intra-muros" },
              { value: "9.4M m²", label: "Sous décret tertiaire (>1000m²)" },
              { value: "~1.1M", label: "Salariés tertiaires Paris" },
              { value: "0.4-0.6%", label: "Taux vacance bureaux 2026" },
            ].map((s) => (
              <div key={s.label} className="p-5 rounded-2xl bg-surface-elevated border border-border text-center">
                <div
                  className="font-display font-bold text-2xl md:text-3xl text-primary-700 dark:text-primary-300"
                  style={{ fontVariantNumeric: "tabular-nums" }}
                >
                  {s.value}
                </div>
                <div className="text-sm text-foreground-muted mt-1">{s.label}</div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-foreground-muted text-center max-w-3xl mx-auto">
            ~55 % du parc parisien de bureaux est assujetti au DEET. Sur ces 9.4 M m²,
            l&apos;éclairage représente entre 15 et 22 % de la consommation totale —
            soit le levier d&apos;efficacité énergétique le plus rapide à actionner
            pour atteindre la trajectoire −40 % en 2030.
          </p>
        </div>
      </section>

      {/* 3 spécificités Paris */}
      <section className="section-padding bg-surface-muted">
        <div className="container-custom max-w-4xl">
          <SectionTitle
            badge="Les particularités de Paris"
            title="3 contraintes spécifiques que nous savons gérer"
          />
          <div className="space-y-5">
            {[
              {
                icon: ShieldCheck,
                title: "Contraintes ABF sur immeubles protégés",
                desc:
                  "~30 % des immeubles parisiens sont en secteur sauvegardé ou aux abords d'un monument historique. Les Architectes des Bâtiments de France (ABF) ont un droit de regard sur l'éclairage extérieur et même sur certains équipements visibles depuis l'espace public (cours intérieures, vitrines). Nous travaillons avec un cabinet de patrimoine partenaire pour les pré-validations.",
              },
              {
                icon: Building2,
                title: "Bâtiments haussmanniens — câblage d'époque",
                desc:
                  "Les immeubles tertiaires reconvertis dans les arrondissements centraux ont souvent un câblage des années 1970-80, avec des sections insuffisantes pour les nouveaux usages (bornes IRVE, datacenters, climatisation). Notre méthode intègre un audit du tableau et un calcul de puissance disponible avant tout dimensionnement éclairage.",
              },
              {
                icon: TrendingUp,
                title: "Logistique chantier en centre — zones piétonnes",
                desc:
                  "Livraison camion difficile dans les arrondissements centraux (Marais, île Saint-Louis, Le Carreau). Nous découpons les chantiers en lots transportables et travaillons soit en horaires nuit (1h-6h pour les commerces), soit en stockage intermédiaire (rue dégagée à 50m) avec navette manuelle.",
              },
            ].map((c) => {
              const Icon = c.icon;
              return (
                <div key={c.title} className="flex items-start gap-4 p-5 rounded-2xl bg-surface border border-border">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-electric-500 flex items-center justify-center shrink-0 shadow-lg">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-foreground mb-2">{c.title}</h3>
                    <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">{c.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Arrondissements clés */}
      <section className="section-padding bg-surface">
        <div className="container-custom max-w-4xl">
          <SectionTitle
            badge="Couverture parisienne"
            title="20 arrondissements, des profils différents"
            subtitle="Nos interventions varient selon la typologie dominante du quartier. Voici les 6 plus actifs sur le relamping en 2026."
          />
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { arr: "Paris 8e", desc: "Tertiaire haut de gamme Champs-Élysées / Triangle d'Or. Bureaux corporate, hôtels 5*, boutiques de luxe." },
              { arr: "Paris 9e", desc: "Sièges sociaux, banques, agences créatives. Mix haussmannien réhabilité + immeubles 1990s." },
              { arr: "Paris 12e", desc: "Bercy Village, ZAC Bercy-Charenton, plateaux modernes. Forte demande sur relamping tertiaire récent." },
              { arr: "Paris 13e", desc: "Quartier Tolbiac/BNF, tertiaire tech et publication. Bureaux ouverts 2000s souvent encore en T8 vétuste." },
              { arr: "Paris 15e", desc: "Beaugrenelle, sièges corporate, mix entreprise/résidentiel. Copropriétés mixtes complexes." },
              { arr: "Paris 17e", desc: "Batignolles + Palais de Justice. Quartier neuf 2010-2020 avec normes éclairage déjà partiellement modernes." },
            ].map((a) => (
              <div key={a.arr} className="p-4 rounded-2xl bg-surface-elevated border border-border">
                <h3 className="font-display font-bold text-foreground mb-1">{a.arr}</h3>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Selon typologie */}
      <section className="section-padding bg-surface-muted">
        <div className="container-custom max-w-5xl">
          <SectionTitle
            badge="Selon votre typologie"
            title="Quelle solution pour votre local à Paris ?"
          />
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { name: "Bureau & tertiaire", href: "/services/electricite/relamping/bureau-tertiaire", desc: "Open-space, salle de réunion, coworking — typique tertiaire 8e, 9e, 12e, 17e" },
              { name: "Commerce & restaurant", href: "/services/electricite/relamping/commerce-restaurant", desc: "Boutique luxe Triangle d'Or, restaurant Marais — IRC > 90 valorisation produit" },
              { name: "Copropriété & parking", href: "/services/electricite/relamping/copropriete-parking", desc: "Haussmanniens 6e/7e/16e, parkings souterrains — économies parties communes" },
              { name: "ERP — hôtel, école, gymnase", href: "/services/electricite/relamping/verticales/hotel", desc: "Hôtellerie premium Right Bank, ERP scolaires — éclairage modulable" },
            ].map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className="p-5 rounded-2xl bg-surface border border-border hover:border-primary-300 dark:hover:border-primary-500 transition-colors group block"
              >
                <h3 className="font-display font-bold text-lg text-foreground group-hover:text-primary-600 dark:group-hover:text-primary-300 inline-flex items-center gap-2 mb-2">
                  {t.name}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </h3>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{t.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Cross-link pillar */}
      <section className="section-padding bg-surface">
        <div className="container-custom max-w-3xl text-center">
          <Lightbulb className="w-12 h-12 text-primary-500 mx-auto mb-4" />
          <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-3">
            Notre méthode relamping complète
          </h2>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
            Audit, calcul ROI, gestion DALI, conformité décret tertiaire et ABF :
            la page pilier détaille tout. Plus le calculateur ROI interactif et
            les 3 études de cas documentés.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 flex-wrap">
            <Link href="/services/electricite/relamping" className="btn-primary btn-lg">
              Page pilier Relamping
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/calculateur-relamping" className="btn-outline btn-lg">
              Calculer mon ROI
            </Link>
            <Link href="/etudes-de-cas" className="btn-outline btn-lg">
              Études de cas
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 bg-gradient-to-r from-primary-700 via-primary-600 to-electric-600 overflow-hidden">
        <NoiseOverlay opacity={0.05} />
        <div className="container-custom relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-white">
            <h2 className="font-display font-bold text-2xl md:text-3xl mb-2">
              Auditons votre éclairage à Paris gratuitement
            </h2>
            <p className="text-primary-100 text-lg">
              Rapport chiffré + ROI sous 7 jours. Pré-validation ABF si nécessaire.
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
