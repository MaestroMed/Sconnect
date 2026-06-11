import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Lightbulb,
  ChevronRight,
  Phone,
  Car,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Gauge,
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

// EDITORIALISED 2026-06-09 — building-type page. Underground parking lighting:
// 75 lux circulation, IK10 anti-vandal, IP65, presence detection + dimming on
// 24/7, BAES + smoke-vent marking NF EN 1838, ROI < 18 months, IRVE-ready.

export const metadata: Metadata = {
  title: "Relamping LED pour parking souterrain — IK10, détection 24/7, ROI < 18 mois | S Connect IDF",
  description:
    "Spécialiste relamping LED pour parkings souterrains de copropriété, bureau et commerce en Île-de-France : 75 lux circulation, luminaires IK10 anti-vandale, IP65, détection de présence + gradation 24/7, BAES et balisage de désenfumage NF EN 1838. ROI souvent inférieur à 18 mois. Pré-câblage IRVE possible. Audit gratuit.",
  keywords: [
    "relamping LED parking souterrain",
    "éclairage parking LED IK10 détection",
    "luminaire parking IP65 anti-vandale",
    "ROI relamping parking",
    "pré-câblage IRVE parking",
  ],
  alternates: { canonical: "/services/electricite/relamping/verticales/parking-souterrain" },
  openGraph: {
    title: "Relamping LED pour parking souterrain — IK10, détection 24/7, ROI < 18 mois",
    description:
      "75 lux, IK10 anti-vandale, IP65, détection + gradation 24/7, BAES. ROI souvent < 18 mois. Pré-câblage IRVE. Audit gratuit IDF.",
    images: ["/images/verticales/parking-souterrain-hero.webp"],
    type: "website",
  },
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sconnectfrance.fr";
const serviceSchema = generateServiceSchema(
  {
    name: "Relamping LED pour parking souterrain (Île-de-France)",
    description:
      "Audit, étude et installation relamping LED pour parkings souterrains de copropriété, bureau et commerce : circulations, places, rampes, locaux techniques. IK10 anti-vandale, IP65, détection de présence + gradation, BAES NF EN 1838, pré-câblage IRVE, conformité décret tertiaire 2030. Certifié Qualifélec + RGE + IRVE.",
    provider: "S Connect",
    areaServed: ["Paris", "Hauts-de-Seine", "Île-de-France"],
    priceRange: "€€€",
  },
  siteUrl,
);

export default function RelampingParkingSouterrainPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={injectSchema(serviceSchema)} />

      {/* Hero */}
      <section className="relative bg-dark-950 py-16 md:py-24 overflow-hidden">
        <Image
          src="/images/verticales/parking-souterrain-hero.webp"
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
                { label: "Parking souterrain" },
              ]}
            />
          </div>
          <div className="max-w-2xl">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-electric-500 rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-primary-500/30">
              <Car className="w-8 h-8 text-white" />
            </div>
            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-4 leading-tight [text-shadow:_0_2px_20px_rgba(0,0,0,0.6)]">
              Relamping LED pour parking souterrain
            </h1>
            <p className="text-xl md:text-2xl font-medium mb-6">
              <BulbText>IK10 · détection 24/7 · ROI &lt; 18 mois</BulbText>
            </p>
            <p className="text-lg text-white/90 leading-relaxed [text-shadow:_0_1px_8px_rgba(0,0,0,0.5)]">
              Le parking souterrain est <strong>le meilleur investissement relamping qui
              existe</strong> : allumé 24h/24, souvent encore en tubes fluo ou sodium. Le
              passage en LED IP65 + détection de présence et gradation fait chuter la facture
              de 60 à 80 % — un ROI fréquemment <strong>sous 18 mois</strong>. Et on en profite
              pour pré-câbler vos futures bornes IRVE.
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
            title="Allumé en permanence : le ROI le plus rapide du relamping"
            subtitle="Robustesse, sécurité d'évacuation et économies massives — le trio gagnant du souterrain."
          />
          <div className="grid md:grid-cols-3 gap-5">
            <div className="p-5 rounded-2xl bg-surface-elevated border border-border">
              <div className="flex items-center gap-2 mb-2">
                <Gauge className="w-5 h-5 text-primary-500" />
                <span className="font-display font-bold text-foreground">Détection 24/7 = −70 %</span>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Un parking ne se vide jamais d&apos;éclairage. La LED + détection de présence
                (plein feux au passage, veilleuse sinon) coupe 60 à 80 % de la consommation.
                C&apos;est ici que le ROI est le plus court.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-surface-elevated border border-border">
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck className="w-5 h-5 text-primary-500" />
                <span className="font-display font-bold text-foreground">IK10 · IP65</span>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Anti-vandale (IK10) et étanche à la poussière et au ruissellement (IP65). 75 lux
                en circulation selon la NF EN 12464-1, renforcé aux rampes et entrées/sorties
                pour l&apos;adaptation visuelle.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-surface-elevated border border-border">
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="w-5 h-5 text-primary-500" />
                <span className="font-display font-bold text-foreground">BAES + désenfumage</span>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Éclairage de sécurité NF EN 1838 et balisage de désenfumage obligatoires en
                souterrain. Nous les vérifions et les remettons à niveau dans le même chantier.
              </p>
            </div>
          </div>
          <p className="mt-8 text-sm text-foreground-muted text-center max-w-3xl mx-auto">
            Sources :{" "}
            <a href="https://www.afe-eclairage.fr/" target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-300 underline">AFE — éclairage des parcs de stationnement</a>,{" "}
            <a href="https://operat.ademe.fr/" target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-300 underline">ADEME — OPERAT (DEET)</a>.
          </p>
        </div>
      </section>

      {/* Méthode */}
      <section className="section-padding bg-surface-muted">
        <div className="container-custom max-w-4xl">
          <SectionTitle
            badge="Notre méthode S Connect"
            title="Relamper un parking sans le fermer"
          />
          <ul className="grid sm:grid-cols-2 gap-4">
            {[
              { title: "Travail par demi-niveaux", desc: "On balise et on relampe travée par travée, sans jamais couper l'accès ni l'éclairage de sécurité. Aucune place condamnée plus de quelques heures." },
              { title: "Devis ferme = facture finale", desc: "Audit photométrique + relevé des heures d'allumage, modèle ROI précis, devis sous 7 jours. Aucun supplément." },
              { title: "Pré-câblage IRVE inclus", desc: "Certifiés IRVE niveau 2, nous tirons les gaines pour vos futures bornes pendant le relamping — un seul chantier, pas deux." },
              { title: "Vote AG facilité (copro)", desc: "Présentation chiffrée prête pour l'assemblée générale : ROI, économie de charges, financement sur compte travaux possible." },
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
              { name: "Circulations & places", href: "/services/electricite/relamping/copropriete-parking", desc: "75 lux, IK10, IP65, détection de présence par zone + veilleuse. Tubes LED ou réglettes étanches en remplacement direct." },
              { name: "Rampes & entrées/sorties", href: "/services/electricite/relamping/copropriete-parking", desc: "Éclairement renforcé pour l'adaptation visuelle jour/nuit, anti-éblouissement à la sortie au soleil." },
              { name: "Escaliers & SAS", href: "/services/electricite/relamping/copropriete-parking", desc: "Détection présence, BAES NF EN 1838, balisage de désenfumage. Sécurité d'évacuation prioritaire." },
              { name: "Locaux techniques & IRVE", href: "/services/electricite/relamping/industriel-entrepot", desc: "Locaux TGBT, vélos, poubelles : IK10 + détection. Pré-câblage des futures bornes de recharge (certifié IRVE n.2)." },
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
            Audit photométrique, calcul ROI, pré-câblage IRVE, conformité décret tertiaire.
            Tout est détaillé sur la page pilier — avec un calculateur pour votre parking.
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
              Auditons l&apos;éclairage de votre parking
            </h2>
            <p className="text-primary-100 text-lg">
              Relevé des heures d&apos;allumage + ROI sous 7 jours. Sans fermeture, sans engagement.
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
