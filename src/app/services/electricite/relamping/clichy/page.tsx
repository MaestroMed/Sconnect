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

// EDITORIALISED 2026-05-21 — production quality, with real INSEE + market
// data on Clichy's tertiary tissue. Updates to the city stats should be
// reflected here every 12 months.

export const metadata: Metadata = {
  title: "Relamping LED à Clichy (92110) — l'expertise locale S Connect | Audit gratuit IDF",
  description:
    "Spécialiste relamping LED à Clichy (92110), basé 35 rue des Cailloux. Audit gratuit, étude personnalisée, installation NF EN 12464-1, accompagnement décret tertiaire. Bac d'Asnières, The Factory, Loft — nous connaissons le tissu tertiaire local. Devis ferme sous 7 jours.",
  keywords: [
    "relamping LED Clichy",
    "électricien LED Clichy 92110",
    "audit éclairage Clichy",
    "relamping tertiaire Clichy",
    "éclairage bureau Clichy",
    "DEET Clichy",
  ],
  alternates: { canonical: "/services/electricite/relamping/clichy" },
  openGraph: {
    title: "Relamping LED à Clichy — S Connect, votre artisan local 92110",
    description:
      "Audit gratuit, ROI mesuré, conforme NF EN 12464-1. Spécialiste de l'éclairage tertiaire pour les bureaux, commerces et copropriétés clichois.",
    images: ["/images/locations/clichy-hero.webp"],
    type: "website",
  },
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sconnectfrance.fr";
const serviceSchema = generateServiceSchema(
  {
    name: "Relamping LED à Clichy (92110)",
    description:
      "Audit, étude et installation relamping LED pour bureaux, commerces, copropriétés et industriels à Clichy (Hauts-de-Seine) et alentours. Conformité NF EN 12464-1 et décret tertiaire (DEET) couverts. Artisan certifié Qualifélec + RGE + IRVE basé 35 rue des Cailloux.",
    provider: "S Connect",
    areaServed: ["Clichy", "Levallois-Perret", "Asnières-sur-Seine", "Saint-Ouen", "Île-de-France"],
    priceRange: "€€€",
  },
  siteUrl,
);

export default function RelampingClichyPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={injectSchema(serviceSchema)} />

      {/* Hero */}
      <section className="relative bg-dark-950 py-16 md:py-24 overflow-hidden">
        <Image
          src="/images/locations/clichy-hero.webp"
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
                { label: "Clichy" },
              ]}
            />
          </div>
          <div className="max-w-2xl">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-electric-500 rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-primary-500/30">
              <MapPin className="w-8 h-8 text-white" />
            </div>
            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-4 leading-tight [text-shadow:_0_2px_20px_rgba(0,0,0,0.6)]">
              Relamping LED à Clichy
            </h1>
            <p className="text-xl md:text-2xl font-medium mb-6">
              <BulbText>Notre siège · Notre terrain · Notre expertise locale</BulbText>
            </p>
            <p className="text-lg text-white/90 leading-relaxed [text-shadow:_0_1px_8px_rgba(0,0,0,0.5)]">
              Basés <strong>35 rue des Cailloux à Clichy (92110)</strong>, nous intervenons
              chaque semaine sur le tissu tertiaire local : Bac d&apos;Asnières,
              The Factory, Loft, copropriétés des quartiers Berges-de-Seine,
              Bac d&apos;Asnières et République. Audit gratuit, devis sous 7 jours,
              facture finale = devis.
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

      {/* Pourquoi Clichy est notre terrain */}
      <section className="section-padding bg-surface">
        <div className="container-custom max-w-5xl">
          <SectionTitle
            badge="Le tissu tertiaire local"
            title="Clichy en 2026 : ~66 000 m² de bureaux neufs en cours, +12 400 m² livrés"
            subtitle="Bac d'Asnières, The Factory, Loft, les Berges-de-Seine. Clichy bascule depuis 5 ans dans une dynamique tertiaire premium qu'on accompagne au quotidien."
          />
          <div className="grid md:grid-cols-3 gap-5">
            <div className="p-5 rounded-2xl bg-surface-elevated border border-border">
              <div className="flex items-center gap-2 mb-2">
                <Building2 className="w-5 h-5 text-primary-500" />
                <span className="font-display font-bold text-foreground">Bac d&apos;Asnières</span>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Éco-quartier en cours. À terme : ~66 000 m² de nouveaux bureaux,
                plus logements et équipements publics. Cible tertiaire jeune
                (tech, conseil, créatifs).
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-surface-elevated border border-border">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-primary-500" />
                <span className="font-display font-bold text-foreground">The Factory</span>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                12 400 m² de bureaux neufs livrés. Architecture industrielle
                réinventée, plateaux open-space haut de gamme.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-surface-elevated border border-border">
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-5 h-5 text-primary-500" />
                <span className="font-display font-bold text-foreground">Loft</span>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                5 300 m² de bureaux flexibles. Coworking, agences, startups.
                Demande forte sur l&apos;éclairage modulable HCL.
              </p>
            </div>
          </div>
          <p className="mt-8 text-sm text-foreground-muted text-center max-w-3xl mx-auto">
            Sources : <a href="https://www.bnppre.fr/actualites/marche-immobilier/clichy-une-attractivite-renforcee-par-le-renouvellement-de-l-offre-tertiaire.html" target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-300 underline">BNP Paribas Real Estate — Clichy attractivité tertiaire</a>, <a href="https://www.batiactu.com/edito/immobilier-bureaux-montreuil-clichy-et-st-ouen-plus-55503.php" target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-300 underline">Batiactu — Bureaux IDF Clichy prisés</a>, <a href="https://www.insee.fr/fr/statistiques/2011101?geo=COM-92024" target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-300 underline">INSEE — Dossier complet Clichy</a>.
          </p>
        </div>
      </section>

      {/* Pourquoi nous à Clichy */}
      <section className="section-padding bg-surface-muted">
        <div className="container-custom max-w-4xl">
          <SectionTitle
            badge="Pourquoi S Connect à Clichy"
            title="L'avantage d'être votre voisin de palier"
          />
          <ul className="grid sm:grid-cols-2 gap-4">
            {[
              {
                title: "Intervention < 40 min",
                desc:
                  "Depuis 35 rue des Cailloux, nous sommes sur site Bac d'Asnières en 8 min, Berges-de-Seine en 12 min, République en 15 min. Le déplacement n'est jamais un argument pour reporter une intervention urgente.",
              },
              {
                title: "Connaissance des copropriétés",
                desc:
                  "Nous travaillons avec une douzaine de syndics du 92110 (Foncia, Citya, Nexity, syndics indépendants locaux). Les procédures AG / mise au vote, on connaît.",
              },
              {
                title: "Devis ferme = facture finale",
                desc:
                  "Aucun supplément après diagnostic. Délais et coûts garantis par écrit. C'est notre engagement n°1 et le moteur de notre réputation locale.",
              },
              {
                title: "Conformité NF EN 12464-1",
                desc:
                  "Niveaux d'éclairement réglementaires par poste de travail vérifiés à la livraison avec luxmètre Konica Minolta T-10A étalonné.",
              },
              {
                title: "Trajectoire DEET 2030 documentée",
                desc:
                  "Nous fournissons le calcul d'impact OPERAT avant/après pour défendre l'investissement en interne. Le décret tertiaire reste obligatoire même sans CEE.",
              },
              {
                title: "Stock matériel partenaires locaux",
                desc:
                  "Trilux, Sylvania, Philips, Hager via Sonepar et Rexel à Clichy. Délais réduits de 30 % sur les commandes urgentes vs Paris.",
              },
            ].map((b) => (
              <li key={b.title} className="p-5 rounded-2xl bg-surface border border-border">
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

      {/* Selon typologie */}
      <section className="section-padding bg-surface">
        <div className="container-custom max-w-5xl">
          <SectionTitle
            badge="Selon votre typologie"
            title="Quelle solution pour votre local à Clichy ?"
          />
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { name: "Bureau & tertiaire", href: "/services/electricite/relamping/bureau-tertiaire", desc: "Open-space, salle de réunion, coworking — typique Bac d'Asnières / The Factory" },
              { name: "Commerce & restaurant", href: "/services/electricite/relamping/commerce-restaurant", desc: "Boutique rue Klock, restaurant rue Martre — IRC > 90 pour valoriser produit" },
              { name: "Copropriété & parking", href: "/services/electricite/relamping/copropriete-parking", desc: "Halls, paliers, parkings — économies parties communes immédiates" },
              { name: "Industriel & entrepôt", href: "/services/electricite/relamping/industriel-entrepot", desc: "Locaux d'activité ZA Clichy — IP65, IK10, économies 80 %" },
            ].map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className="p-5 rounded-2xl bg-surface-elevated border border-border hover:border-primary-300 dark:hover:border-primary-500 transition-colors group block"
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

      {/* Communes voisines */}
      <section className="section-padding bg-surface-muted">
        <div className="container-custom max-w-3xl text-center">
          <SectionTitle
            badge="Couverture"
            title="Clichy + couronne immédiate"
            subtitle="Nous intervenons aussi sur les communes voisines en moins de 30 min depuis notre atelier."
          />
          <div className="flex flex-wrap justify-center gap-2">
            {[
              { name: "Levallois-Perret", href: "/services/electricite/relamping/levallois-perret" },
              { name: "Asnières-sur-Seine", href: "/services/electricite/relamping/asnieres-sur-seine" },
              { name: "Saint-Ouen", href: null },
              { name: "Neuilly-sur-Seine", href: "/services/electricite/relamping/neuilly-sur-seine" },
              { name: "Paris 17e", href: null },
              { name: "Paris 18e", href: null },
              { name: "La Défense", href: "/services/electricite/relamping/la-defense" },
              { name: "Boulogne-Billancourt", href: "/services/electricite/relamping/boulogne-billancourt" },
            ].map((c) =>
              c.href ? (
                <Link
                  key={c.name}
                  href={c.href}
                  className="px-4 py-2 rounded-full bg-surface border border-border hover:border-primary-300 dark:hover:border-primary-500 transition-colors text-sm text-foreground hover:text-primary-600 dark:hover:text-primary-300"
                >
                  {c.name}
                </Link>
              ) : (
                <span
                  key={c.name}
                  className="px-4 py-2 rounded-full bg-surface border border-border text-sm text-foreground-muted"
                >
                  {c.name}
                </span>
              ),
            )}
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
            Audit, calcul ROI, gestion DALI, conformité décret tertiaire : tout est
            détaillé sur notre page pilier dédiée. Y compris le calculateur ROI
            interactif et l&apos;impact de la suppression des CEE éclairage de février 2026.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Link href="/services/electricite/relamping" className="btn-primary btn-lg">
              Page pilier Relamping LED
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/calculateur-relamping" className="btn-outline btn-lg">
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
              Auditons votre éclairage à Clichy gratuitement
            </h2>
            <p className="text-primary-100 text-lg">
              Rapport chiffré + ROI sous 7 jours. Visite sur site offerte. Sans engagement.
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
