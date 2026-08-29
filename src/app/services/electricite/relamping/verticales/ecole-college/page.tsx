import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Lightbulb,
  ChevronRight,
  Phone,
  GraduationCap,
  CheckCircle2,
  ArrowRight,
  BookOpen,
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

// EDITORIALISED 2026-06-09 — building-type page. School lighting: 300-500 lux
// classrooms, UGR ≤ 19, flicker-free for reading/screens, HCL benefits for
// concentration, public procurement, BAES.

export const metadata: Metadata = {
  title: "Relamping LED pour école et collège — salles 300-500 lux, flicker-free, HCL | S Connect IDF",
  description:
    "Spécialiste relamping LED pour écoles, collèges et lycées en Île-de-France : salles de classe 300-500 lux, UGR ≤ 19, flicker-free pour la lecture et les écrans, éclairage circadien (HCL) bénéfique à la concentration, amphis, gymnase, cantine. Marchés publics. Audit gratuit, conformité NF EN 12464-1 et DEET 2030.",
  keywords: [
    "relamping LED école",
    "éclairage salle de classe LED",
    "éclairage scolaire flicker-free",
    "HCL école concentration",
    "marché public éclairage scolaire",
    "DEET établissement scolaire 2030",
  ],
  alternates: { canonical: "/services/electricite/relamping/verticales/ecole-college" },
  openGraph: {
    title: "Relamping LED pour école et collège — 300-500 lux, flicker-free",
    description:
      "Salles 300-500 lux, UGR ≤ 19, flicker-free, HCL pour la concentration. Marchés publics. Audit gratuit IDF.",
    images: ["/images/verticales/ecole-college-hero.webp"],
    type: "website",
  },
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sconnectfrance.fr";
const serviceSchema = generateServiceSchema(
  {
    name: "Relamping LED pour école et collège (Île-de-France)",
    description:
      "Audit, étude et installation relamping LED pour établissements scolaires : salles de classe, amphithéâtres, CDI, gymnase, cantine, circulations. UGR ≤ 19, flicker-free, conformité NF EN 12464-1 et décret tertiaire 2030. Réponse marchés publics. Garantie décennale active.",
    provider: "S Connect",
    areaServed: ["Paris", "Hauts-de-Seine", "Île-de-France"],
    priceRange: "€€€",
  },
  siteUrl,
);

export default function RelampingEcoleCollegePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={injectSchema(serviceSchema)} />

      {/* Hero */}
      <section className="relative bg-dark-950 py-16 md:py-24 overflow-hidden">
        <Image
          src="/images/verticales/ecole-college-hero.webp"
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
                { label: "École & collège" },
              ]}
            />
          </div>
          <div className="max-w-2xl">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-electric-500 rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-primary-500/30">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-4 leading-tight [text-shadow:_0_2px_20px_rgba(0,0,0,0.6)]">
              Relamping LED pour école et collège
            </h1>
            <p className="text-xl md:text-2xl font-medium mb-6">
              <BulbText>300-500 lux · flicker-free · concentration</BulbText>
            </p>
            <p className="text-lg text-white/90 leading-relaxed [text-shadow:_0_1px_8px_rgba(0,0,0,0.5)]">
              Dans une salle de classe, la lumière agit sur la <strong>concentration et la
              fatigue</strong>. La norme impose 300 à 500 lux, UGR ≤ 19 et un éclairage
              flicker-free indispensable face aux écrans. L&apos;éclairage circadien (HCL)
              va plus loin : plus tonique le matin, plus doux l&apos;après-midi. Nous
              intervenons pendant les vacances scolaires et traitons les marchés publics.
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
            title="La lumière, un outil pédagogique"
            subtitle="Confort visuel des élèves, sécurité ERP, et un budget de collectivité à respecter."
          />
          <div className="grid md:grid-cols-3 gap-5">
            <div className="p-5 rounded-2xl bg-surface-elevated border border-border">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="w-5 h-5 text-primary-500" />
                <span className="font-display font-bold text-foreground">Classes 300-500 lux</span>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                NF EN 12464-1 : 300 lux au primaire, 500 lux au secondaire et en TP. UGR ≤ 19
                contre l&apos;éblouissement au tableau et sur les écrans, uniformité U0 ≥ 0,6.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-surface-elevated border border-border">
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="w-5 h-5 text-primary-500" />
                <span className="font-display font-bold text-foreground">Flicker-free + HCL</span>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Le scintillement fatigue et déconcentre. Sources flicker-free obligatoires.
                L&apos;éclairage circadien (tunable white) soutient la vigilance le matin et
                apaise l&apos;après-midi — gains de concentration documentés.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-surface-elevated border border-border">
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck className="w-5 h-5 text-primary-500" />
                <span className="font-display font-bold text-foreground">ERP + marché public</span>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Établissement recevant du public : BAES + balisage NF EN 1838 à jour. Pour les
                collectivités, nous répondons aux marchés publics (CCAP, BPU) avec attestation
                de garantie décennale à jour.
              </p>
            </div>
          </div>
          <p className="mt-8 text-sm text-foreground-muted text-center max-w-3xl mx-auto">
            Sources :{" "}
            <a href="https://www.afe-eclairage.fr/" target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-300 underline">AFE — éclairage scolaire</a>,{" "}
            <a href="https://www.boutique.afnor.org/" target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-300 underline">AFNOR — NF EN 12464-1</a>.
          </p>
        </div>
      </section>

      {/* Méthode */}
      <section className="section-padding bg-surface-muted">
        <div className="container-custom max-w-4xl">
          <SectionTitle
            badge="Notre méthode S Connect"
            title="Relamper un établissement scolaire sereinement"
          />
          <ul className="grid sm:grid-cols-2 gap-4">
            {[
              { title: "Chantier pendant les vacances", desc: "Relamping concentré sur les congés scolaires pour ne pas perturber les cours. Planning calé sur le calendrier de l'établissement." },
              { title: "Réponse marchés publics", desc: "CCAP, BPU, mémoire technique : nous traitons les marchés publics des collectivités avec rigueur et pièces à jour." },
              { title: "UGR ≤ 19 + flicker-free", desc: "Confort visuel garanti par étude photométrique. Sources flicker-free, IRC ≥ 80, drivers garantis 5 ans." },
              { title: "Conformité DEET 2030", desc: "Sur les bâtiments > 1 000 m², le relamping est l'action n°1 vers les −40 %. Reporting OPERAT inclus." },
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
              { name: "Salles de classe & TP", href: "/services/electricite/relamping/bureau-tertiaire", desc: "300-500 lux, UGR ≤ 19, flicker-free, tunable white (HCL) possible. 1000 lux en TP scientifique." },
              { name: "Amphithéâtre & CDI", href: "/services/electricite/relamping/bureau-tertiaire", desc: "500 lux, IRC ≥ 80 pour la lecture longue, gradation pour les projections. Confort sur de longues plages." },
              { name: "Gymnase & cour", href: "/services/electricite/relamping/industriel-entrepot", desc: "Gymnase 300 lux IK10 anti-ballon (voir page dédiée), éclairage extérieur de cour et préau en détection." },
              { name: "Cantine & circulations", href: "/services/electricite/relamping/copropriete-parking", desc: "Réfectoire 200-300 lux IRC ≥ 80, couloirs et escaliers en détection présence. BAES à jour." },
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
            Audit photométrique, calcul ROI, conformité NF EN 12464-1 et décret tertiaire,
            réponse marchés publics. Tout est détaillé sur la page pilier.
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
              Auditons l&apos;éclairage de votre établissement
            </h2>
            <p className="text-primary-100 text-lg">
              Rapport ROI + conformité par zone sous 7 jours. Chantier sur les vacances, sans engagement.
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
