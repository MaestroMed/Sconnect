import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Lightbulb,
  ChevronRight,
  Phone,
  Store,
  CheckCircle2,
  ArrowRight,
  Clock,
  Car,
  Sparkles,
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

// EDITORIALISED 2026-06-09 — building-type page (not a location). Lighting
// specifics for malls / galeries marchandes: continuity of operation,
// accent IRC ≥ 90 on storefronts, IK10 parking, DALI zoning.

export const metadata: Metadata = {
  title: "Relamping LED en centre commercial — galeries, enseignes, parking | S Connect IDF",
  description:
    "Spécialiste relamping LED pour centres commerciaux et galeries marchandes en Île-de-France : allées 200-300 lux, accentuation IRC ≥ 90 sur vitrines, parking IK10, pilotage DALI par zone, intervention de nuit sans fermeture. Audit gratuit, conformité NF EN 12464-1 et DEET 2030.",
  keywords: [
    "relamping LED centre commercial",
    "éclairage galerie marchande LED",
    "DALI centre commercial",
    "éclairage parking centre commercial IK10",
    "rénovation éclairage galerie marchande IDF",
    "DEET centre commercial 2030",
  ],
  alternates: { canonical: "/services/electricite/relamping/verticales/centre-commercial" },
  openGraph: {
    title: "Relamping LED en centre commercial — galeries, enseignes, parking",
    description:
      "Allées 200-300 lux, vitrines IRC ≥ 90, parking IK10, DALI par zone, intervention de nuit sans fermeture. Audit gratuit IDF.",
    images: ["/images/verticales/centre-commercial-hero.webp"],
    type: "website",
  },
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sconnectfrance.fr";
const serviceSchema = generateServiceSchema(
  {
    name: "Relamping LED en centre commercial (Île-de-France)",
    description:
      "Audit, étude et installation relamping LED pour centres commerciaux et galeries marchandes : galeries, halls, food court, enseignes, parkings souterrains. Pilotage DALI par zone, continuité d'exploitation, conformité NF EN 12464-1 et décret tertiaire 2030. Garantie décennale active.",
    provider: "S Connect",
    areaServed: ["Paris", "Hauts-de-Seine", "Île-de-France"],
    priceRange: "€€€",
  },
  siteUrl,
);

export default function RelampingCentreCommercialPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={injectSchema(serviceSchema)} />

      {/* Hero */}
      <section className="relative bg-dark-950 py-16 md:py-24 overflow-hidden">
        <Image
          src="/images/verticales/centre-commercial-hero.webp"
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
                { label: "Centre commercial" },
              ]}
            />
          </div>
          <div className="max-w-2xl">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-electric-500 rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-primary-500/30">
              <Store className="w-8 h-8 text-white" />
            </div>
            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-4 leading-tight [text-shadow:_0_2px_20px_rgba(0,0,0,0.6)]">
              Relamping LED en centre commercial
            </h1>
            <p className="text-xl md:text-2xl font-medium mb-6">
              <BulbText>Galeries · enseignes · parking · sans fermeture</BulbText>
            </p>
            <p className="text-lg text-white/90 leading-relaxed [text-shadow:_0_1px_8px_rgba(0,0,0,0.5)]">
              Un centre commercial éclaire 12 à 16 heures par jour, 7 jours sur 7 :
              c&apos;est le bâtiment au <strong>ROI relamping le plus rapide</strong>. Galeries,
              halls, food court, vitrines d&apos;enseignes, parkings souterrains — chaque zone
              a sa cible photométrique. Nous intervenons <strong>de nuit, sans fermer</strong>,
              avec un balisage de sécurité conforme.
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

      {/* Enjeux éclairage */}
      <section className="section-padding bg-surface">
        <div className="container-custom max-w-5xl">
          <SectionTitle
            badge="Les enjeux"
            title="L'éclairage d'un centre commercial : 3 contraintes simultanées"
            subtitle="Attirer en vitrine, guider dans les allées, sécuriser les parkings — sans jamais couper l'exploitation."
          />
          <div className="grid md:grid-cols-3 gap-5">
            <div className="p-5 rounded-2xl bg-surface-elevated border border-border">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-primary-500" />
                <span className="font-display font-bold text-foreground">Vitrines IRC ≥ 90</span>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                L&apos;éclairage d&apos;accentuation des enseignes restitue les matières (textile,
                alimentaire, cosmétique). 750-1000 lux + IRC ≥ 90, sinon les produits paraissent
                ternes et le taux de transformation chute.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-surface-elevated border border-border">
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="w-5 h-5 text-primary-500" />
                <span className="font-display font-bold text-foreground">Allées 200-300 lux</span>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Galeries et halls : NF EN 12464-1 impose un éclairement confortable, UGR ≤ 22, avec
                variation circadienne possible (plus chaud le soir). Pilotage DALI par zone pour
                moduler selon l&apos;affluence.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-surface-elevated border border-border">
              <div className="flex items-center gap-2 mb-2">
                <Car className="w-5 h-5 text-primary-500" />
                <span className="font-display font-bold text-foreground">Parking IK10 · 24/7</span>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Souterrains allumés en permanence : LED IP65 + IK10 anti-vandale, détection de
                présence et gradation. C&apos;est ici que le ROI est le plus court — souvent
                moins de 18 mois.
              </p>
            </div>
          </div>
          <p className="mt-8 text-sm text-foreground-muted text-center max-w-3xl mx-auto">
            Sources :{" "}
            <a href="https://www.afe-eclairage.fr/" target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-300 underline">AFE — recommandations commerce</a>,{" "}
            <a href="https://operat.ademe.fr/" target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-300 underline">ADEME — OPERAT (DEET)</a>.
          </p>
        </div>
      </section>

      {/* Notre méthode */}
      <section className="section-padding bg-surface-muted">
        <div className="container-custom max-w-4xl">
          <SectionTitle
            badge="Notre méthode S Connect"
            title="Relamper un centre commercial sans perturber l'exploitation"
          />
          <ul className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: Clock, title: "Intervention de nuit, par zones", desc: "Aucune fermeture. On relampe galerie par galerie après l'heure de fermeture, balisage temporaire NF EN 1838 maintenu." },
              { title: "Devis ferme = facture finale", desc: "Audit photométrique, modèle ROI par zone, devis sous 7 jours. Aucun supplément après mise en service." },
              { title: "Pilotage DALI-2 multi-zones", desc: "Galeries, food court, parking, enseignes communes : chaque zone a son scénario horaire + détection présence sur le parking." },
              { title: "Continuité sécurité incendie", desc: "BAES + balisage de désenfumage vérifiés et maintenus pendant tout le chantier. Coordination avec la sécurité 24/7." },
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
          <SectionTitle
            badge="Selon la zone"
            title="Chaque espace, sa cible photométrique"
          />
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { name: "Galeries & halls de circulation", href: "/services/electricite/relamping/commerce-restaurant", desc: "200-300 lux, UGR ≤ 22, variation circadienne. DALI par zone pour moduler selon l'affluence et l'heure." },
              { name: "Vitrines & enseignes communes", href: "/services/electricite/relamping/commerce-restaurant", desc: "750-1000 lux d'accentuation, IRC ≥ 90 pour le rendu produit. 3000-4000K selon le positionnement de l'enseigne." },
              { name: "Parking souterrain", href: "/services/electricite/relamping/copropriete-parking", desc: "75 lux circulation, IK10 anti-vandale, IP65, détection présence + gradation. ROI souvent < 18 mois (allumage 24/7)." },
              { name: "Food court & locaux techniques", href: "/services/electricite/relamping/industriel-entrepot", desc: "Self 500 lux IRC ≥ 90, locaux techniques IK10. Scénarisation pause/rush sur le food court." },
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
            Audit photométrique, calcul ROI, gestion DALI, conformité décret tertiaire. Tout est
            détaillé sur la page pilier — avec un calculateur ROI pour votre surface.
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
              Auditons l&apos;éclairage de votre centre commercial
            </h2>
            <p className="text-primary-100 text-lg">
              Audit de nuit + rapport ROI par zone sous 7 jours. Sans fermeture, sans engagement.
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
