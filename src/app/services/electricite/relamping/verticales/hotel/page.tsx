import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Lightbulb,
  ChevronRight,
  Phone,
  Hotel,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Moon,
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

// EDITORIALISED 2026-06-09 — building-type page. Hotel lighting: warm IRC ≥ 90
// lobby/room ambiance, DALI day/night lobby scenes, 24/7 corridor detection,
// huge ROI on always-on common areas, ABF facades.

export const metadata: Metadata = {
  title: "Relamping LED pour hôtel — lobby, chambres, couloirs 24/7 | S Connect IDF",
  description:
    "Spécialiste relamping LED pour hôtels et résidences en Île-de-France : lobby chaleureux IRC ≥ 90, scénarisation DALI jour/nuit, chambres confort, couloirs en détection 24/7, façade ABF. ROI rapide sur les parties communes allumées en permanence. Audit gratuit, conformité NF EN 12464-1 et DEET 2030.",
  keywords: [
    "relamping LED hôtel",
    "éclairage lobby hôtel LED",
    "éclairage couloir hôtel détection présence",
    "scénarisation DALI hôtel",
    "DEET hôtel 2030",
  ],
  alternates: { canonical: "/services/electricite/relamping/hotel" },
  openGraph: {
    title: "Relamping LED pour hôtel — lobby, chambres, couloirs 24/7",
    description:
      "Lobby IRC ≥ 90, scènes DALI jour/nuit, couloirs en détection 24/7, ROI rapide sur les communs. Audit gratuit IDF.",
    images: ["/images/verticales/hotel-hero.webp"],
    type: "website",
  },
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sconnectfrance.fr";
const serviceSchema = generateServiceSchema(
  {
    name: "Relamping LED pour hôtel (Île-de-France)",
    description:
      "Audit, étude et installation relamping LED pour hôtels et résidences : lobby, réception, chambres, couloirs, restaurant, façade. Ambiance IRC ≥ 90, scénarisation DALI, détection 24/7, conformité NF EN 12464-1 et décret tertiaire 2030. Certifié Qualifélec + RGE.",
    provider: "S Connect",
    areaServed: ["Paris", "Hauts-de-Seine", "Île-de-France"],
    priceRange: "€€€",
  },
  siteUrl,
);

export default function RelampingHotelPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={injectSchema(serviceSchema)} />

      {/* Hero */}
      <section className="relative bg-dark-950 py-16 md:py-24 overflow-hidden">
        <Image
          src="/images/verticales/hotel-hero.webp"
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
                { label: "Hôtel" },
              ]}
            />
          </div>
          <div className="max-w-2xl">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-electric-500 rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-primary-500/30">
              <Hotel className="w-8 h-8 text-white" />
            </div>
            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-4 leading-tight [text-shadow:_0_2px_20px_rgba(0,0,0,0.6)]">
              Relamping LED pour hôtel
            </h1>
            <p className="text-xl md:text-2xl font-medium mb-6">
              <BulbText>Lobby · chambres · couloirs 24/7</BulbText>
            </p>
            <p className="text-lg text-white/90 leading-relaxed [text-shadow:_0_1px_8px_rgba(0,0,0,0.5)]">
              Un hôtel éclaire ses parties communes <strong>24 heures sur 24</strong> :
              c&apos;est un gisement d&apos;économies énorme. Le lobby raconte votre standing
              (IRC ≥ 90, scènes jour/nuit), les chambres rassurent, les couloirs et escaliers
              passent en détection de présence. On relampe étage par étage, sans déloger
              vos clients.
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
            title="Standing, confort, et des communs allumés en permanence"
            subtitle="L'hôtellerie cumule l'exigence esthétique du commerce premium et le profil 24/7 de la copropriété."
          />
          <div className="grid md:grid-cols-3 gap-5">
            <div className="p-5 rounded-2xl bg-surface-elevated border border-border">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-primary-500" />
                <span className="font-display font-bold text-foreground">Lobby IRC ≥ 90</span>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                La réception est votre première impression. Lumière chaude, IRC ≥ 90, scénarisation
                DALI jour/nuit pour passer de l&apos;accueil dynamique au lounge feutré du soir.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-surface-elevated border border-border">
              <div className="flex items-center gap-2 mb-2">
                <Moon className="w-5 h-5 text-primary-500" />
                <span className="font-display font-bold text-foreground">Couloirs en détection</span>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Couloirs et escaliers allumés 24/7 : passage en LED + détection de présence et
                gradation crépusculaire = −60 à −75 % sur ces zones. ROI souvent sous 2 ans.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-surface-elevated border border-border">
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="w-5 h-5 text-primary-500" />
                <span className="font-display font-bold text-foreground">Chambres confort</span>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Lumière chaude 2700-3000K, IRC ≥ 90, têtes de lit modulables, miroir salle de
                bain à fort IRC pour le maquillage. Le confort lumineux pèse dans les avis clients.
              </p>
            </div>
          </div>
          <p className="mt-8 text-sm text-foreground-muted text-center max-w-3xl mx-auto">
            Sources :{" "}
            <a href="https://www.afe-eclairage.fr/" target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-300 underline">AFE — éclairage hôtellerie</a>,{" "}
            <a href="https://operat.ademe.fr/" target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-300 underline">ADEME — OPERAT (DEET)</a>.
          </p>
        </div>
      </section>

      {/* Méthode */}
      <section className="section-padding bg-surface-muted">
        <div className="container-custom max-w-4xl">
          <SectionTitle
            badge="Notre méthode S Connect"
            title="Relamper un hôtel en activité, étage par étage"
          />
          <ul className="grid sm:grid-cols-2 gap-4">
            {[
              { title: "Chantier phasé, sans fermeture", desc: "On relampe par étage et par zone, en journée sur les communs, en rotation sur les chambres libres. Aucune nuitée perdue." },
              { title: "Devis ferme = facture finale", desc: "Audit lobby + couloirs + échantillon de chambres, modèle ROI, devis sous 7 jours. Aucun supplément." },
              { title: "Façade ABF maîtrisée", desc: "Sur bâtiment classé ou secteur sauvegardé, nous gérons la pré-validation ABF de l'éclairage de façade et d'enseigne." },
              { title: "ROI rapide sur les communs", desc: "Couloirs/escaliers/parking allumés 24/7 = le gisement le plus rentable. On le traite en priorité pour financer le reste." },
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
              { name: "Lobby & réception", href: "/services/electricite/relamping/commerce-restaurant", desc: "Scénarisation DALI jour/nuit, IRC ≥ 90, accentuation sur le comptoir et les espaces lounge. Première impression soignée." },
              { name: "Couloirs & escaliers", href: "/services/electricite/relamping/copropriete-parking", desc: "Détection de présence + gradation crépusculaire, BAES NF EN 1838. ROI le plus court (allumage 24/7)." },
              { name: "Chambres & salles de bain", href: "/services/electricite/relamping/bureau-tertiaire", desc: "2700-3000K confort, IRC ≥ 90, miroir fort IRC, têtes de lit modulables. Rotation sur les chambres libres." },
              { name: "Restaurant & parking", href: "/services/electricite/relamping/copropriete-parking", desc: "Salle de petit-déjeuner ambiance, parking IK10 + détection. Voir aussi nos pages restaurant et parking souterrain." },
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
              Auditons l&apos;éclairage de votre hôtel
            </h2>
            <p className="text-primary-100 text-lg">
              Rapport ROI par zone + scènes lobby sous 7 jours. Chantier phasé, sans engagement.
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
