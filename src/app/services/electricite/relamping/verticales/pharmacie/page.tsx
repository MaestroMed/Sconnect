import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Lightbulb,
  ChevronRight,
  Phone,
  Cross,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Eye,
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

// EDITORIALISED 2026-06-09 — building-type page. Pharmacy lighting: IRC ≥ 90
// for product rendering + prescription reading, 500-750 lux counter, trust
// ambiance, 6-day continuity.

export const metadata: Metadata = {
  title: "Relamping LED pour pharmacie — IRC ≥ 90, comptoir 750 lux, confiance | S Connect IDF",
  description:
    "Spécialiste relamping LED pour pharmacies et parapharmacies en Île-de-France : 500 lux officine, 750 lux comptoir, IRC ≥ 90 pour la lecture des ordonnances et le rendu des produits, ambiance de confiance. Intervention sans fermeture. Audit gratuit, conformité NF EN 12464-1 et DEET 2030.",
  keywords: [
    "relamping LED pharmacie",
    "éclairage officine LED",
    "éclairage comptoir pharmacie IRC 90",
    "rénovation éclairage parapharmacie",
    "DEET pharmacie 2030",
  ],
  alternates: { canonical: "/services/electricite/relamping/verticales/pharmacie" },
  openGraph: {
    title: "Relamping LED pour pharmacie — IRC ≥ 90, comptoir 750 lux",
    description:
      "500 lux officine, 750 lux comptoir, IRC ≥ 90 pour ordonnances et rendu produit, ambiance de confiance. Audit gratuit IDF.",
    images: ["/images/verticales/pharmacie-hero.webp"],
    type: "website",
  },
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sconnectfrance.fr";
const serviceSchema = generateServiceSchema(
  {
    name: "Relamping LED pour pharmacie (Île-de-France)",
    description:
      "Audit, étude et installation relamping LED pour pharmacies et parapharmacies : officine, comptoir, vitrine, back-office préparatoire. IRC ≥ 90, conformité NF EN 12464-1 et décret tertiaire 2030. Certifié Qualifélec + RGE.",
    provider: "S Connect",
    areaServed: ["Paris", "Hauts-de-Seine", "Île-de-France"],
    priceRange: "€€€",
  },
  siteUrl,
);

export default function RelampingPharmaciePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={injectSchema(serviceSchema)} />

      {/* Hero */}
      <section className="relative bg-dark-950 py-16 md:py-24 overflow-hidden">
        <Image
          src="/images/verticales/pharmacie-hero.webp"
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
                { label: "Pharmacie" },
              ]}
            />
          </div>
          <div className="max-w-2xl">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-electric-500 rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-primary-500/30">
              <Cross className="w-8 h-8 text-white" />
            </div>
            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-4 leading-tight [text-shadow:_0_2px_20px_rgba(0,0,0,0.6)]">
              Relamping LED pour pharmacie
            </h1>
            <p className="text-xl md:text-2xl font-medium mb-6">
              <BulbText>IRC ≥ 90 · comptoir 750 lux · confiance</BulbText>
            </p>
            <p className="text-lg text-white/90 leading-relaxed [text-shadow:_0_1px_8px_rgba(0,0,0,0.5)]">
              En officine, la lumière a une fonction <strong>clinique</strong> : lire une
              ordonnance sans erreur, distinguer une couleur de comprimé, rendre fidèlement
              un produit cosmétique. C&apos;est une cible IRC ≥ 90 non négociable — et une
              ambiance lumineuse qui inspire confiance. Intervention sans fermer l&apos;officine.
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
            title="L'éclairage d'une officine : précision et confiance"
            subtitle="Trois exigences propres au métier de pharmacien, là où une simple boutique se contenterait de 300 lux."
          />
          <div className="grid md:grid-cols-3 gap-5">
            <div className="p-5 rounded-2xl bg-surface-elevated border border-border">
              <div className="flex items-center gap-2 mb-2">
                <Eye className="w-5 h-5 text-primary-500" />
                <span className="font-display font-bold text-foreground">Comptoir 750 lux</span>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Lecture des ordonnances, vérification des dosages, conseil : le poste de
                délivrance demande 500 à 750 lux soutenus, sans éblouissement (UGR ≤ 19) ni
                ombre portée sur le plan de travail.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-surface-elevated border border-border">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-primary-500" />
                <span className="font-display font-bold text-foreground">IRC ≥ 90 rendu produit</span>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Dermo-cosmétique, compléments, parapharmacie : un IRC ≥ 90 (idéalement 95 sur les
                linéaires beauté) restitue les teintes réelles. Un IRC 80 fait paraître les
                produits ternes et nuit aux ventes additionnelles.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-surface-elevated border border-border">
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="w-5 h-5 text-primary-500" />
                <span className="font-display font-bold text-foreground">Ambiance 4000K santé</span>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Une température neutre (4000K) + flicker-free crée une atmosphère propre,
                rassurante, sans fatigue visuelle pour l&apos;équipe sur 8-10h de présence.
                Tunable white possible sur l&apos;espace conseil.
              </p>
            </div>
          </div>
          <p className="mt-8 text-sm text-foreground-muted text-center max-w-3xl mx-auto">
            Sources :{" "}
            <a href="https://www.afe-eclairage.fr/" target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-300 underline">AFE — éclairage des commerces de santé</a>,{" "}
            <a href="https://www.boutique.afnor.org/" target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-300 underline">AFNOR — NF EN 12464-1</a>.
          </p>
        </div>
      </section>

      {/* Méthode */}
      <section className="section-padding bg-surface-muted">
        <div className="container-custom max-w-4xl">
          <SectionTitle
            badge="Notre méthode S Connect"
            title="Relamper une pharmacie sans fermer"
          />
          <ul className="grid sm:grid-cols-2 gap-4">
            {[
              { title: "Intervention soir / dimanche", desc: "On relampe après fermeture ou le dimanche, par zones, sans interrompre la délivrance ni la chaîne du froid des réfrigérateurs à vaccins." },
              { title: "Devis ferme = facture finale", desc: "Audit photométrique du comptoir et des linéaires, modèle ROI, devis sous 7 jours. Aucun supplément." },
              { title: "IRC ≥ 90 systématique", desc: "Sources sélectionnées IRC ≥ 90 (95 sur la beauté), flicker-free. Drivers Tridonic / Osram garantis 5 ans." },
              { title: "Conformité DEET 2030", desc: "Pour les officines > 1 000 m², relamping = action n°1 sur la trajectoire −40 %. Reporting OPERAT inclus." },
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
              { name: "Comptoir & espace conseil", href: "/services/electricite/relamping/commerce-restaurant", desc: "500-750 lux, IRC ≥ 90, UGR ≤ 19, aucune ombre portée. Tunable white possible pour l'espace conseil confidentiel." },
              { name: "Linéaires & parapharmacie", href: "/services/electricite/relamping/commerce-restaurant", desc: "Éclairage d'accentuation IRC ≥ 95 sur la dermo-cosmétique, 3500-4000K, mise en valeur des facings." },
              { name: "Vitrine & croix", href: "/services/electricite/relamping/commerce-restaurant", desc: "Accentuation visible depuis la rue, croix lumineuse, conformité d'enseigne (ABF si secteur classé)." },
              { name: "Back-office & préparatoire", href: "/services/electricite/relamping/bureau-tertiaire", desc: "Préparation magistrale, stock, réserve : 500 lux IRC ≥ 80, détection présence pour les économies." },
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
            Audit photométrique, calcul ROI, conformité NF EN 12464-1 et décret tertiaire.
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
              Auditons l&apos;éclairage de votre officine
            </h2>
            <p className="text-primary-100 text-lg">
              Rapport ROI + cible IRC par zone sous 7 jours. Sans fermeture, sans engagement.
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
