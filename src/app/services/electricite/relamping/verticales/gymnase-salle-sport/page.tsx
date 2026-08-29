import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Lightbulb,
  ChevronRight,
  Phone,
  Dumbbell,
  CheckCircle2,
  ArrowRight,
  Zap,
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
import AuthorByline from "@/components/seo/AuthorByline";

// EDITORIALISED 2026-06-09 — building-type page. Sports hall lighting:
// 300-750 lux by competition level, IK10 ball-proof, high uniformity U0≥0.7,
// instant strike (no fluo warm-up), anti-glare vertical.

export const metadata: Metadata = {
  title: "Relamping LED pour gymnase et salle de sport — IK10, 300-750 lux, allumage instantané | S Connect IDF",
  description:
    "Spécialiste relamping LED pour gymnases, salles de sport et complexes sportifs en Île-de-France : 300 à 750 lux selon le niveau de compétition, luminaires IK10 anti-ballon, uniformité U0 ≥ 0,7, allumage instantané, anti-éblouissement. Audit gratuit, conformité NF EN 12464-1 et DEET 2030.",
  keywords: [
    "relamping LED gymnase",
    "éclairage salle de sport LED IK10",
    "éclairage terrain sport anti-ballon",
    "luminaire gymnase haute baie LED",
    "DEET équipement sportif 2030",
  ],
  alternates: { canonical: "/services/electricite/relamping/verticales/gymnase-salle-sport" },
  openGraph: {
    title: "Relamping LED pour gymnase — IK10, 300-750 lux, allumage instantané",
    description:
      "300-750 lux selon compétition, IK10 anti-ballon, U0 ≥ 0,7, allumage instantané, anti-éblouissement. Audit gratuit IDF.",
    images: ["/images/verticales/gymnase-salle-sport-hero.webp"],
    type: "website",
  },
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sconnectfrance.fr";
const serviceSchema = generateServiceSchema(
  {
    name: "Relamping LED pour gymnase et salle de sport (Île-de-France)",
    description:
      "Audit, étude et installation relamping LED pour gymnases, salles de sport et complexes sportifs : aire de jeu, gradins, vestiaires, circulations. Luminaires IK10 anti-ballon, allumage instantané, uniformité élevée, conformité NF EN 12464-1 et décret tertiaire 2030. Garantie décennale active.",
    provider: "S Connect",
    areaServed: ["Paris", "Hauts-de-Seine", "Île-de-France"],
    priceRange: "€€€",
  },
  siteUrl,
);

export default function RelampingGymnasePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={injectSchema(serviceSchema)} />

      {/* Hero */}
      <section className="relative bg-dark-950 py-16 md:py-24 overflow-hidden">
        <Image
          src="/images/verticales/gymnase-salle-sport-hero.webp"
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
                { label: "Gymnase & salle de sport" },
              ]}
            />
          </div>
          <div className="max-w-2xl">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-electric-500 rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-primary-500/30">
              <Dumbbell className="w-8 h-8 text-white" />
            </div>
            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-4 leading-tight [text-shadow:_0_2px_20px_rgba(0,0,0,0.6)]">
              Relamping LED pour gymnase et salle de sport
            </h1>
            <p className="text-xl md:text-2xl font-medium mb-6">
              <BulbText>IK10 anti-ballon · 300-750 lux · instantané</BulbText>
            </p>
            <p className="text-lg text-white/90 leading-relaxed [text-shadow:_0_1px_8px_rgba(0,0,0,0.5)]">
              Un gymnase a trois ennemis : <strong>le ballon, l&apos;éblouissement et le
              préchauffage</strong>. Les luminaires doivent résister aux impacts (IK10),
              offrir une lumière verticale sans éblouir le joueur qui lève la tête, et
              s&apos;allumer instantanément (fini les tubes au sodium qui chauffent 10 minutes).
              Avec une uniformité élevée, indispensable au suivi du ballon.
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
            title="Éclairer un terrain : robustesse et précision visuelle"
            subtitle="Le niveau d'éclairement dépend du niveau de pratique — de l'EPS scolaire à la compétition régionale."
          />
          <div className="grid md:grid-cols-3 gap-5">
            <div className="p-5 rounded-2xl bg-surface-elevated border border-border">
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck className="w-5 h-5 text-primary-500" />
                <span className="font-display font-bold text-foreground">IK10 anti-ballon</span>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Les luminaires encaissent les chocs de ballons (basket, hand, volley). IK10 +
                grille de protection sur les zones exposées. Une casse = un terrain hors service.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-surface-elevated border border-border">
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="w-5 h-5 text-primary-500" />
                <span className="font-display font-bold text-foreground">300-750 lux · U0 ≥ 0,7</span>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                300 lux en EPS scolaire, 500-750 lux en compétition. Uniformité U0 ≥ 0,7 et
                faible éblouissement vertical pour suivre le ballon en l&apos;air sans gêne.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-surface-elevated border border-border">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-5 h-5 text-primary-500" />
                <span className="font-display font-bold text-foreground">Allumage instantané</span>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                La LED s&apos;allume à 100 % immédiatement — fini les 5-10 minutes de préchauffage
                des lampes à décharge, et fini le rallumage interdit après extinction. Idéal pour
                un planning d&apos;occupation serré.
              </p>
            </div>
          </div>
          <p className="mt-8 text-sm text-foreground-muted text-center max-w-3xl mx-auto">
            Sources :{" "}
            <a href="https://www.afe-eclairage.fr/" target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-300 underline">AFE — éclairage des installations sportives</a>,{" "}
            <a href="https://www.boutique.afnor.org/" target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-300 underline">AFNOR — NF EN 12193 / 12464-1</a>.
          </p>
        </div>
      </section>

      {/* Méthode */}
      <section className="section-padding bg-surface-muted">
        <div className="container-custom max-w-4xl">
          <SectionTitle
            badge="Notre méthode S Connect"
            title="Relamper un équipement sportif sans le bloquer"
          />
          <ul className="grid sm:grid-cols-2 gap-4">
            {[
              { title: "Nacelle + planning club", desc: "Intervention en hauteur (nacelle/échafaudage) calée sur les créneaux libres du planning associatif et scolaire." },
              { title: "Devis ferme = facture finale", desc: "Étude photométrique de l'aire de jeu, calcul d'uniformité, devis sous 7 jours. Aucun supplément." },
              { title: "IK10 + allumage instantané", desc: "Luminaires haute baie IK10, drivers garantis 5 ans, allumage 100 % immédiat. Économies massives vs sodium/iodures." },
              { title: "Marchés publics + DEET", desc: "Réponse marchés publics pour les collectivités. Sur > 1 000 m², trajectoire DEET 2030 sécurisée." },
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
              { name: "Aire de jeu principale", href: "/services/electricite/relamping/industriel-entrepot", desc: "300-750 lux selon niveau, U0 ≥ 0,7, IK10, anti-éblouissement vertical. Haute baie LED en remplacement du sodium." },
              { name: "Gradins & tribunes", href: "/services/electricite/relamping/commerce-restaurant", desc: "Éclairement spectateur + circulation, BAES NF EN 1838. Confort et sécurité d'évacuation." },
              { name: "Vestiaires & douches", href: "/services/electricite/relamping/copropriete-parking", desc: "IP65 zones humides, détection présence, 200-300 lux. Robustesse et économies sur l'allumage intermittent." },
              { name: "Circulations & locaux", href: "/services/electricite/relamping/copropriete-parking", desc: "Halls, couloirs, locaux de rangement : détection présence, BAES, IK adapté aux zones de passage." },
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
            Audit photométrique, calcul d&apos;uniformité, ROI, conformité décret tertiaire.
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
              Auditons l&apos;éclairage de votre gymnase
            </h2>
            <p className="text-primary-100 text-lg">
              Étude d&apos;uniformité + ROI sous 7 jours. Intervention sur créneaux libres, sans engagement.
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
