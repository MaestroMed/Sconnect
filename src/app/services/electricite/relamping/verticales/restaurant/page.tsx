import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Lightbulb,
  ChevronRight,
  Phone,
  UtensilsCrossed,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Flame,
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

// EDITORIALISED 2026-06-09 — building-type page. Restaurant lighting: warm
// 2700-3000K IRC ≥ 90 dining ambiance, DALI day/night scenes, IP54 pro
// kitchen, night intervention.

export const metadata: Metadata = {
  title: "Relamping LED pour restaurant — ambiance 2700K, IRC ≥ 90, scènes DALI | S Connect IDF",
  description:
    "Spécialiste relamping LED pour restaurants, brasseries et hôtels-restaurants en Île-de-France : ambiance chaude 2700-3000K, IRC ≥ 90 pour le rendu des plats, scénarisation DALI déjeuner/dîner, cuisine pro 500 lux IP54. Intervention de nuit. Audit gratuit, conformité NF EN 12464-1 et DEET 2030.",
  keywords: [
    "relamping LED restaurant",
    "éclairage restaurant LED ambiance",
    "scénarisation DALI restaurant",
    "éclairage cuisine professionnelle LED IP54",
    "DEET restaurant 2030",
  ],
  alternates: { canonical: "/services/electricite/relamping/verticales/restaurant" },
  openGraph: {
    title: "Relamping LED pour restaurant — ambiance 2700K, IRC ≥ 90",
    description:
      "Ambiance chaude IRC ≥ 90, scènes DALI déjeuner/dîner, cuisine pro IP54. Intervention de nuit. Audit gratuit IDF.",
    images: ["/images/verticales/restaurant-hero.webp"],
    type: "website",
  },
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sconnectfrance.fr";
const serviceSchema = generateServiceSchema(
  {
    name: "Relamping LED pour restaurant (Île-de-France)",
    description:
      "Audit, étude et installation relamping LED pour restaurants et brasseries : salle, terrasse, bar, cuisine professionnelle. Ambiance 2700-3000K IRC ≥ 90, scénarisation DALI, conformité NF EN 12464-1 et décret tertiaire 2030. Certifié Qualifélec + RGE.",
    provider: "S Connect",
    areaServed: ["Paris", "Hauts-de-Seine", "Île-de-France"],
    priceRange: "€€€",
  },
  siteUrl,
);

export default function RelampingRestaurantPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={injectSchema(serviceSchema)} />

      {/* Hero */}
      <section className="relative bg-dark-950 py-16 md:py-24 overflow-hidden">
        <Image
          src="/images/verticales/restaurant-hero.webp"
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
                { label: "Restaurant" },
              ]}
            />
          </div>
          <div className="max-w-2xl">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-electric-500 rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-primary-500/30">
              <UtensilsCrossed className="w-8 h-8 text-white" />
            </div>
            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-4 leading-tight [text-shadow:_0_2px_20px_rgba(0,0,0,0.6)]">
              Relamping LED pour restaurant
            </h1>
            <p className="text-xl md:text-2xl font-medium mb-6">
              <BulbText>Ambiance 2700K · IRC ≥ 90 · scènes DALI</BulbText>
            </p>
            <p className="text-lg text-white/90 leading-relaxed [text-shadow:_0_1px_8px_rgba(0,0,0,0.5)]">
              Dans un restaurant, la lumière <strong>fait le plat et l&apos;ambiance</strong>.
              Une teinte chaude IRC ≥ 90 sublime les couleurs des assiettes et la peau des
              convives ; une scénarisation DALI passe du déjeuner d&apos;affaires au dîner
              intime d&apos;un geste. En cuisine, c&apos;est l&apos;inverse : 500 lux nets,
              IP54, flicker-free. Intervention de nuit.
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
            title="Salle et cuisine : deux mondes lumineux opposés"
            subtitle="L'émotion en salle, la précision en cuisine — un relamping réussi sert les deux."
          />
          <div className="grid md:grid-cols-3 gap-5">
            <div className="p-5 rounded-2xl bg-surface-elevated border border-border">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-primary-500" />
                <span className="font-display font-bold text-foreground">Salle 2700-3000K IRC ≥ 90</span>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Une lumière chaude et fidèle met en valeur les plats et flatte les visages.
                IRC ≥ 90 obligatoire pour ne pas griser les assiettes — la première photo postée
                par un client en dépend.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-surface-elevated border border-border">
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="w-5 h-5 text-primary-500" />
                <span className="font-display font-bold text-foreground">Scènes DALI jour/soir</span>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Déjeuner d&apos;affaires lumineux, dîner tamisé, service du bar : la gradation
                DALI bascule de scène en un geste, sans jamais devoir changer d&apos;ampoules.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-surface-elevated border border-border">
              <div className="flex items-center gap-2 mb-2">
                <Flame className="w-5 h-5 text-primary-500" />
                <span className="font-display font-bold text-foreground">Cuisine 500 lux IP54</span>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Plan de travail, piano, plonge : 500 lux nets, étanchéité IP54 (vapeur, graisse),
                flicker-free pour la sécurité, IK adapté. Nettoyabilité et hygiène en priorité.
              </p>
            </div>
          </div>
          <p className="mt-8 text-sm text-foreground-muted text-center max-w-3xl mx-auto">
            Sources :{" "}
            <a href="https://www.afe-eclairage.fr/" target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-300 underline">AFE — éclairage CHR</a>,{" "}
            <a href="https://www.boutique.afnor.org/" target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-300 underline">AFNOR — NF EN 12464-1</a>.
          </p>
        </div>
      </section>

      {/* Méthode */}
      <section className="section-padding bg-surface-muted">
        <div className="container-custom max-w-4xl">
          <SectionTitle
            badge="Notre méthode S Connect"
            title="Relamper un restaurant sans manquer un service"
          />
          <ul className="grid sm:grid-cols-2 gap-4">
            {[
              { title: "Intervention de nuit / lundi", desc: "On relampe après le dernier service ou le jour de fermeture. Aucun couvert manqué, cuisine remise en service au matin." },
              { title: "Devis ferme = facture finale", desc: "Audit ambiance + cuisine, scénarios DALI proposés, devis sous 7 jours. Aucun supplément après mise en service." },
              { title: "Scénarisation incluse", desc: "Nous programmons vos scènes (midi, soir, bar, ménage) et formons votre équipe à les piloter depuis un simple interrupteur ou une tablette." },
              { title: "IRC ≥ 90 + flicker-free", desc: "Rendu fidèle des plats en salle, sécurité en cuisine. Drivers garantis 5 ans, sources L80 50 000 h." },
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
              { name: "Salle & banquettes", href: "/services/electricite/relamping/commerce-restaurant", desc: "200-300 lux modulables, 2700-3000K, IRC ≥ 90, gradation DALI. Accentuation sur les tables, pas d'éblouissement." },
              { name: "Bar & cave", href: "/services/electricite/relamping/commerce-restaurant", desc: "Accentuation des bouteilles et du back-bar, IRC ≥ 90, ambiance plus contrastée. Lecture des étiquettes facilitée." },
              { name: "Cuisine professionnelle", href: "/services/electricite/relamping/industriel-entrepot", desc: "500 lux, IP54, flicker-free, nettoyabilité. Zones piano, plonge, préparation froide distinctes." },
              { name: "Terrasse & devanture", href: "/services/electricite/relamping/commerce-restaurant", desc: "Éclairage extérieur chaleureux, conformité d'enseigne et ABF si secteur classé. Détection au-delà des heures de service." },
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
            Audit photométrique, scénarisation DALI, calcul ROI, conformité décret tertiaire.
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
              Auditons l&apos;éclairage de votre restaurant
            </h2>
            <p className="text-primary-100 text-lg">
              Scènes DALI proposées + ROI sous 7 jours. Intervention de nuit, sans engagement.
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
