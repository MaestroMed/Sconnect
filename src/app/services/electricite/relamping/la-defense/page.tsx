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

// EDITORIALISED 2026-05-21 — production quality with real La Défense market
// data (Paris La Défense Aménagement Public, BNPP RE 2026, INSEE 92).
// La Défense = #1 quartier d'affaires d'Europe : 3.6M m² bureaux, 180k salariés,
// 95% CAC 40 représentés. Enjeu DEET 2030 majeur sur tours pré-2010.
// Update annually on the surface/effectifs/livraisons figures.

export const metadata: Metadata = {
  title: "Relamping LED à La Défense — 3,6 M m² de bureaux sous DEET 2030 | S Connect",
  description:
    "Spécialiste relamping LED à La Défense (Puteaux 92800, Courbevoie 92400). 3,6 M m² de bureaux concernés par le décret tertiaire. Audit gratuit, conformité NF EN 12464-1, DALI sur plateaux > 5 000 m². Devis ferme sous 7 jours. L'agilité d'un artisan local face à la rigueur du tertiaire grand format.",
  keywords: [
    "relamping LED La Défense",
    "audit éclairage tertiaire La Défense",
    "relamping tour bureau Défense",
    "éclairage tour CB16 CB21",
    "DEET La Défense 2030",
    "DALI plateau bureau Défense",
  ],
  alternates: { canonical: "/services/electricite/relamping/la-defense" },
  openGraph: {
    title: "Relamping LED à La Défense — l'artisan local pour le grand tertiaire",
    description:
      "3,6 M m² de bureaux à éclairer correctement d'ici 2030. S Connect, basé à 7 km de la Grande Arche, intervient sur les plateaux grand format avec la réactivité que les FM mainstream n'offrent plus.",
    images: ["/images/locations/la-defense-hero.webp"],
    type: "website",
  },
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sconnectfrance.fr";
const serviceSchema = generateServiceSchema(
  {
    name: "Relamping LED à La Défense (Puteaux, Courbevoie)",
    description:
      "Audit, étude et installation relamping LED pour le tertiaire grand format à La Défense : tours de bureaux, plateaux > 5 000 m², centres de conférence, halls d'entrée premium. Conformité NF EN 12464-1, gestion DALI, accompagnement DEET 2030. Artisan certifié Qualifélec + RGE + IRVE basé à Clichy, ~40 min de la Grande Arche.",
    provider: "S Connect",
    areaServed: ["La Défense", "Puteaux", "Courbevoie", "Nanterre", "Île-de-France"],
    priceRange: "€€€",
  },
  siteUrl,
);

export default function RelampingLaDfensePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={injectSchema(serviceSchema)} />

      {/* Hero */}
      <section className="relative bg-dark-950 py-16 md:py-24 overflow-hidden">
        <Image
          src="/images/locations/la-defense-hero.webp"
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
                { label: "La Défense" },
              ]}
            />
          </div>
          <div className="max-w-2xl">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-electric-500 rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-primary-500/30">
              <MapPin className="w-8 h-8 text-white" />
            </div>
            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-4 leading-tight [text-shadow:_0_2px_20px_rgba(0,0,0,0.6)]">
              Relamping LED à La Défense
            </h1>
            <p className="text-xl md:text-2xl font-medium mb-6">
              <BulbText>3,6 M m² · 180 000 salariés · 2030 approche</BulbText>
            </p>
            <p className="text-lg text-white/90 leading-relaxed [text-shadow:_0_1px_8px_rgba(0,0,0,0.5)]">
              <strong>1ᵉʳ quartier d&apos;affaires d&apos;Europe</strong> et un décret
              tertiaire qui exige −40 % de consommation d&apos;ici 2030 sur 100 %
              des tours. Nous accompagnons les directions immobilières et les
              syndics de copropriété de tour (Tour First, Tour T1, CB16, CB21,
              Engie, Total…) avec l&apos;agilité d&apos;un artisan local et la
              rigueur du grand tertiaire.
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

      {/* La Défense en chiffres */}
      <section className="section-padding bg-surface">
        <div className="container-custom max-w-5xl">
          <SectionTitle
            badge="Le marché"
            title="La Défense, le terrain d'application le plus exigeant d'IDF"
            subtitle="Plus grand quartier tertiaire d'Europe, 71 tours, 95 % des entreprises du CAC 40 représentées. Et 80 % des immeubles ont été construits avant 2010 — donc avant les exigences RT2012 sur l'éclairage."
          />
          <div className="grid md:grid-cols-3 gap-5 mb-8">
            <div className="p-5 rounded-2xl bg-surface-elevated border border-border">
              <div className="flex items-center gap-2 mb-2">
                <Building2 className="w-5 h-5 text-primary-500" />
                <span className="font-display font-bold text-foreground">3,6 M m² de bureaux</span>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Soit ~24 fois la Tour Eiffel en surface utile. Tous les ans, La
                Défense livre 50 000 à 100 000 m² supplémentaires.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-surface-elevated border border-border">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-primary-500" />
                <span className="font-display font-bold text-foreground">180 000 salariés</span>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Volume d&apos;occupants où l&apos;éclairage influence directement
                la productivité, l&apos;absentéisme et la fatigue oculaire. Enjeu
                QVT mesurable.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-surface-elevated border border-border">
              <div className="flex items-center gap-2 mb-2">
                <Layers className="w-5 h-5 text-primary-500" />
                <span className="font-display font-bold text-foreground">71 tours · 600+ immeubles</span>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Tours emblématiques (Total, First, T1, CB16, CB21, Engie, Trinity)
                + immeubles classiques. 80 % construits avant 2010 = relamping LED
                inévitable.
              </p>
            </div>
          </div>
          <p className="text-sm text-foreground-muted text-center max-w-3xl mx-auto">
            Sources :{" "}
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
              href="https://www.bnppre.fr/etudes-marche/marche-bureaux-paris-la-defense.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 dark:text-primary-300 underline"
            >
              BNP Paribas RE — Marché bureaux La Défense
            </a>
            ,{" "}
            <a
              href="https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000049671143"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 dark:text-primary-300 underline"
            >
              Légifrance — décret tertiaire (DEET)
            </a>
            .
          </p>
        </div>
      </section>

      {/* L'enjeu DEET sur La Défense */}
      <section className="section-padding bg-surface-muted">
        <div className="container-custom max-w-4xl">
          <SectionTitle
            badge="Le mur 2030"
            title="Pourquoi le DEET met les tours de La Défense sous pression"
          />
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-lg leading-relaxed">
              Le <strong>décret tertiaire (DEET)</strong> impose à tout bâtiment
              de plus de 1 000 m² d&apos;atteindre <strong>−40 % de
              consommation d&apos;énergie finale en 2030</strong>, −50 % en 2040,
              −60 % en 2050, par rapport à une année de référence post-2010.
            </p>
            <p className="leading-relaxed">
              Sur les tours de La Défense, l&apos;éclairage représente entre{" "}
              <strong>15 et 25 % de la consommation totale</strong> (CIBSE TM65,
              audits S Connect). Le passage en LED + gestion DALI sur les
              plateaux apporte typiquement <strong>−65 à −75 % sur le poste
              éclairage</strong> — soit −10 à −18 % sur la facture totale du
              bâtiment. C&apos;est l&apos;intervention au meilleur ROI mesuré
              pour cocher le DEET sans toucher au CVC ni aux façades (dont les
              chantiers coûtent 20 à 50× plus cher).
            </p>
            <p className="leading-relaxed">
              Trois échéances clés à ne pas rater :
            </p>
            <ul className="space-y-2">
              <li className="flex gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-500 mt-1 shrink-0" />
                <span>
                  <strong>30 septembre 2026</strong> : déclaration de la
                  consommation 2025 sur OPERAT (ADEME). Les premiers contrôles
                  ciblent les tours &gt; 50 000 m².
                </span>
              </li>
              <li className="flex gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-500 mt-1 shrink-0" />
                <span>
                  <strong>2030</strong> : −40 % vs année de référence. Les
                  bailleurs commencent à exiger ce niveau dans les baux verts
                  (clause annexe environnementale).
                </span>
              </li>
              <li className="flex gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-500 mt-1 shrink-0" />
                <span>
                  <strong>2040 et 2050</strong> : −50 % et −60 %. Sans relamping
                  LED avant ces dates, atteindre les paliers devient
                  techniquement impossible sans rénovation lourde.
                </span>
              </li>
            </ul>
            <p className="leading-relaxed">
              Pour les directions immobilières des tours pré-2010 (la majorité
              du parc), le relamping LED reste{" "}
              <strong>l&apos;arbitrage évident</strong> avant 2030. Notre
              méthode : audit photométrique sur 3 plateaux échantillons, modèle
              ROI par scénario, déploiement nuit/weekend pour zéro impact sur
              l&apos;occupation.
            </p>
          </div>
        </div>
      </section>

      {/* L'agilité S Connect vs FM mainstream */}
      <section className="section-padding bg-surface">
        <div className="container-custom max-w-5xl">
          <SectionTitle
            badge="Pourquoi nous, pas un FM grand groupe"
            title="L'agilité d'un artisan local sur le terrain du grand tertiaire"
          />
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-surface-elevated border border-border">
              <h3 className="font-display font-bold text-foreground text-xl mb-3">
                Réactivité &lt; 48h
              </h3>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                Pas de bureau d&apos;études internes à mobiliser, pas de
                sous-traitant à briefer. Vous nous appelez le mardi, nous sommes
                sur place le jeudi pour mesurer. Les FM grand format
                (Bouygues E&amp;S, Sodexo, Engie Solutions) ont une excellence
                process — mais 6 à 12 semaines de latence pour un audit
                photométrique. Nous : 48h.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-surface-elevated border border-border">
              <h3 className="font-display font-bold text-foreground text-xl mb-3">
                Devis ferme = facture finale
              </h3>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                Pas d&apos;avenant après mise en service. Pas de coût caché.
                Nous mesurons avant de chiffrer, et la facture finale est
                contractuelle. La transparence d&apos;un artisan, pas
                l&apos;opacité d&apos;un bordereau FM.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-surface-elevated border border-border">
              <h3 className="font-display font-bold text-foreground text-xl mb-3">
                Multi-marques, pas de captivité
              </h3>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                Trilux, Philips, Sylvania, Hager, Schneider, ABB. Nous
                spécifions le luminaire qui convient à votre tour, pas celui
                qui maximise notre marge fournisseur. Catalogue à vous, choix
                final à vous.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-surface-elevated border border-border">
              <h3 className="font-display font-bold text-foreground text-xl mb-3">
                Mehdi Belkacem sur le terrain
              </h3>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                Vous ne parlez pas à un commercial, vous parlez au fondateur.
                Garantie décennale active, Qualifélec mention Éclairage,
                12 ans d&apos;expérience sur les chantiers tertiaires IDF.
                Pas d&apos;intermédiaire, pas de glissement de scope.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Typologies La Défense */}
      <section className="section-padding bg-surface-muted">
        <div className="container-custom max-w-5xl">
          <SectionTitle
            badge="Selon votre typologie"
            title="Spécificités relamping par configuration"
          />
          <div className="grid md:grid-cols-2 gap-6">
            <Link
              href="/services/electricite/relamping/bureau-tertiaire"
              className="p-6 rounded-2xl bg-surface border border-border hover:border-primary-300 dark:hover:border-primary-500 transition-colors group"
            >
              <span className="font-display font-bold text-lg text-foreground group-hover:text-primary-600 dark:group-hover:text-primary-300 inline-flex items-center gap-2 mb-2">
                Tour de bureaux &gt; 10 000 m²
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Approche par plateau : audit 3 étages échantillons, déploiement
                phasé, gestion DALI obligatoire pour la détection présence
                + gradation lumière du jour. UGR &lt; 19 sur les open-space.
              </p>
            </Link>
            <Link
              href="/services/electricite/relamping/copropriete-parking"
              className="p-6 rounded-2xl bg-surface border border-border hover:border-primary-300 dark:hover:border-primary-500 transition-colors group"
            >
              <span className="font-display font-bold text-lg text-foreground group-hover:text-primary-600 dark:group-hover:text-primary-300 inline-flex items-center gap-2 mb-2">
                Copropriété de tour
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Halls, paliers, escaliers de secours, parkings souterrains.
                Plus de 60 % de la consommation éclairage commune typiquement.
                Vote AG ciblé, ROI 3-5 ans, financement via charges
                d&apos;exploitation possible.
              </p>
            </Link>
            <Link
              href="/services/electricite/relamping/commerce-restaurant"
              className="p-6 rounded-2xl bg-surface border border-border hover:border-primary-300 dark:hover:border-primary-500 transition-colors group"
            >
              <span className="font-display font-bold text-lg text-foreground group-hover:text-primary-600 dark:group-hover:text-primary-300 inline-flex items-center gap-2 mb-2">
                Centre commercial Les 4 Temps
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Galeries marchandes, allées centrales, halls. Continuité
                d&apos;exploitation pendant chantier = intervention de nuit
                obligatoire, balisage temporaire conforme NF EN 1838.
              </p>
            </Link>
            <Link
              href="/services/electricite/relamping/industriel-entrepot"
              className="p-6 rounded-2xl bg-surface border border-border hover:border-primary-300 dark:hover:border-primary-500 transition-colors group"
            >
              <span className="font-display font-bold text-lg text-foreground group-hover:text-primary-600 dark:group-hover:text-primary-300 inline-flex items-center gap-2 mb-2">
                Locaux techniques + parkings
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Sous-sols techniques, parkings souterrains 2-4 niveaux,
                couloirs de service. IK10 anti-vandale + détection présence
                obligatoire pour passer en LED basse conso 24/7.
              </p>
            </Link>
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
            Audit photométrique, calcul ROI, gestion DALI, conformité décret
            tertiaire. Tout est détaillé sur notre page pilier — avec un
            calculateur ROI interactif que vous pouvez utiliser sur votre tour
            avant de nous appeler.
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
              Auditons votre éclairage à La Défense gratuitement
            </h2>
            <p className="text-primary-100 text-lg">
              Audit sur 3 plateaux échantillons + rapport DEET 2030 sous 7 jours.
              Sans engagement, sans obligation de signer.
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
