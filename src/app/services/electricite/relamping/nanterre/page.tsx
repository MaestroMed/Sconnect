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
  Landmark,
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

// EDITORIALISED 2026-05-21 — production quality. Nanterre = préfecture 92
// + Université Paris Nanterre + tertiaire arrière-cour de La Défense.
// ~600 k m² bureaux, 95 000 habitants. Update annually.

export const metadata: Metadata = {
  title: "Relamping LED à Nanterre — administration, tertiaire & université | S Connect",
  description:
    "Spécialiste relamping LED à Nanterre (92000) : préfecture des Hauts-de-Seine, ~600 k m² de bureaux, Université Paris Nanterre. Audit gratuit, conformité NF EN 12464-1 (norme renforcée écoles 500 lux), DEET 2030. Devis ferme sous 7 jours.",
  keywords: [
    "relamping LED Nanterre",
    "électricien Nanterre 92000",
    "audit éclairage tertiaire Nanterre",
    "relamping université Nanterre",
    "éclairage administration 92",
    "DEET Nanterre",
  ],
  alternates: { canonical: "/services/electricite/relamping/nanterre" },
  openGraph: {
    title: "Relamping LED à Nanterre — administration, tertiaire & uni",
    description:
      "Préfecture 92, ~600 k m² bureaux, Université Paris Nanterre. S Connect maîtrise les chantiers à forte contrainte normative.",
    images: ["/images/locations/nanterre-hero.webp"],
    type: "website",
  },
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sconnectfrance.fr";
const serviceSchema = generateServiceSchema(
  {
    name: "Relamping LED à Nanterre (92000)",
    description:
      "Audit, étude et installation relamping LED pour bureaux administratifs, université et copropriétés à Nanterre. Conformité NF EN 12464-1 (incl. exigences salles de classe), décret tertiaire (DEET), DALI. Certifié IRVE niveau 2.",
    provider: "S Connect",
    areaServed: ["Nanterre", "Rueil-Malmaison", "Suresnes", "Île-de-France"],
    priceRange: "€€€",
  },
  siteUrl,
);

export default function RelampingNanterrePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={injectSchema(serviceSchema)} />

      {/* Hero */}
      <section className="relative bg-dark-950 py-16 md:py-24 overflow-hidden">
        <Image
          src="/images/locations/nanterre-hero.webp"
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
                { label: "Nanterre" },
              ]}
            />
          </div>
          <div className="max-w-2xl">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-electric-500 rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-primary-500/30">
              <MapPin className="w-8 h-8 text-white" />
            </div>
            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-4 leading-tight [text-shadow:_0_2px_20px_rgba(0,0,0,0.6)]">
              Relamping LED à Nanterre
            </h1>
            <p className="text-xl md:text-2xl font-medium mb-6">
              <BulbText>Préfecture · 600 k m² · Université · DEET 2030</BulbText>
            </p>
            <p className="text-lg text-white/90 leading-relaxed [text-shadow:_0_1px_8px_rgba(0,0,0,0.5)]">
              Nanterre = ville mixte au tissu unique : <strong>préfecture des
              Hauts-de-Seine</strong>, ~600 k m² de bureaux tertiaires
              (Caisse d&apos;Épargne, Crédit Mutuel, Vinci), Université
              Paris Nanterre (~30 000 étudiants), et résidentiel dense.
              Notre savoir-faire : éclairage normé par usage (bureau,
              amphithéâtre, salle de TD, accueil public).
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

      {/* Nanterre en chiffres */}
      <section className="section-padding bg-surface">
        <div className="container-custom max-w-5xl">
          <SectionTitle
            badge="Le marché"
            title="Nanterre, l'arrière-cour stratégique de La Défense"
            subtitle="Quatre fonctions urbaines superposées rendent Nanterre unique : administration départementale, tertiaire bancaire, université de référence, et résidentiel en pleine mutation."
          />
          <div className="grid md:grid-cols-3 gap-5 mb-8">
            <div className="p-5 rounded-2xl bg-surface-elevated border border-border">
              <div className="flex items-center gap-2 mb-2">
                <Building2 className="w-5 h-5 text-primary-500" />
                <span className="font-display font-bold text-foreground">~600 000 m² bureaux</span>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Quartier des Terrasses, Préfecture, Université. Loyers
                tertiaires ~280-340 €/m²/an HT/HC (moitié de La Défense
                adjacente). Tissu Caisse d&apos;Épargne, Vinci, Crédit
                Mutuel.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-surface-elevated border border-border">
              <div className="flex items-center gap-2 mb-2">
                <Landmark className="w-5 h-5 text-primary-500" />
                <span className="font-display font-bold text-foreground">Préfecture + Conseil dépt.</span>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                ERP de catégorie 1 et 2 → exigences renforcées en
                éclairage de sécurité (BAES + balisage NF EN 1838),
                accueil public, salles de réunion publiques. Conformité
                accessibilité PMR au cœur du projet.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-surface-elevated border border-border">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-primary-500" />
                <span className="font-display font-bold text-foreground">Université 30 000 étud.</span>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Université Paris Nanterre : amphithéâtres, salles de TD,
                bibliothèques, laboratoires. NF EN 12464-1 impose 500 lux
                en salles de cours, 1000 lux en TP scientifique, IRC ≥ 80
                + UGR &lt; 19.
              </p>
            </div>
          </div>
          <p className="text-sm text-foreground-muted text-center max-w-3xl mx-auto">
            Sources :{" "}
            <a
              href="https://www.insee.fr/fr/statistiques/2011101?geo=COM-92050"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 dark:text-primary-300 underline"
            >
              INSEE — Dossier Nanterre
            </a>
            ,{" "}
            <a
              href="https://www.parisladefense.com/fr/le-quartier-en-chiffres"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 dark:text-primary-300 underline"
            >
              Paris La Défense — Nanterre intégré
            </a>
            ,{" "}
            <a
              href="https://www.afe-eclairage.fr/docs/nf-en-12464-1-resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 dark:text-primary-300 underline"
            >
              AFE — Résumé NF EN 12464-1
            </a>
            .
          </p>
        </div>
      </section>

      {/* Pourquoi nous à Nanterre */}
      <section className="section-padding bg-surface-muted">
        <div className="container-custom max-w-4xl">
          <SectionTitle
            badge="Pourquoi S Connect à Nanterre"
            title="L'expertise normative pour les contraintes ERP"
          />
          <ul className="grid sm:grid-cols-2 gap-4">
            {[
              {
                title: "Maîtrise NF EN 12464-1 par usage",
                desc: "Bureau 500 lux, accueil 300 lux, salle de réunion 500 lux dimmable, amphi 500 lux UGR < 19. Cahier des charges normatif clé en main.",
              },
              {
                title: "ERP catégorie 1-2",
                desc: "Coordination SDIS pour la mise à jour du dossier sécurité, BAES NF EN 1838, balisage de désenfumage. SAV maintenance contractualisable.",
              },
              {
                title: "Couverture décret tertiaire",
                desc: "Relamping LED = −65 à −75 % poste éclairage. ROI 3-5 ans sur les bureaux Nanterre. Sur la trajectoire DEET 2030.",
              },
              {
                title: "Devis ferme = facture finale",
                desc: "Notre engagement contractuel. Mesures luxmètre étalonné, étude photométrique, modèle ROI sous 7 jours.",
              },
              {
                title: "Intervention agile",
                desc: "Clichy → Nanterre via la N192 ou A14 en 30 min. Audit sous 48h, SAV sous 24h.",
              },
              {
                title: "Garanties pro",
                desc: "Décennale active, IRVE niveau 2. Dossiers admin sécurisés pour acheteurs publics.",
              },
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

      {/* Typologies Nanterre */}
      <section className="section-padding bg-surface">
        <div className="container-custom max-w-5xl">
          <SectionTitle
            badge="Selon votre typologie"
            title="Spécificités relamping par configuration"
          />
          <div className="grid md:grid-cols-2 gap-6">
            <Link
              href="/services/electricite/relamping/bureau-tertiaire"
              className="p-6 rounded-2xl bg-surface-elevated border border-border hover:border-primary-300 dark:hover:border-primary-500 transition-colors group"
            >
              <span className="font-display font-bold text-lg text-foreground group-hover:text-primary-600 dark:group-hover:text-primary-300 inline-flex items-center gap-2 mb-2">
                Bureau administratif / siège bancaire
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Open-space + accueil public + salles de réunion. NF EN 12464-1
                niveau 500 lux + UGR &lt; 19. Budget 28-45 €/m². Conformité
                accessibilité (1 000 lux sur poste d&apos;accueil PMR).
              </p>
            </Link>
            <Link
              href="/services/electricite/relamping/bureau-tertiaire"
              className="p-6 rounded-2xl bg-surface-elevated border border-border hover:border-primary-300 dark:hover:border-primary-500 transition-colors group"
            >
              <span className="font-display font-bold text-lg text-foreground group-hover:text-primary-600 dark:group-hover:text-primary-300 inline-flex items-center gap-2 mb-2">
                Université / établissement public
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Amphithéâtres, salles de TD, bibliothèques, labos.
                500 lux + IRC ≥ 80 + flicker-free obligatoire pour la
                lecture longue. Marchés publics : nous traitons les CCAP
                et les BPU.
              </p>
            </Link>
            <Link
              href="/services/electricite/relamping/copropriete-parking"
              className="p-6 rounded-2xl bg-surface-elevated border border-border hover:border-primary-300 dark:hover:border-primary-500 transition-colors group"
            >
              <span className="font-display font-bold text-lg text-foreground group-hover:text-primary-600 dark:group-hover:text-primary-300 inline-flex items-center gap-2 mb-2">
                Copropriété quartier des Terrasses
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Halls, paliers, escaliers, parkings souterrains. Détection
                présence + gradation crépusculaire. Validation conseil
                syndical + AG. ROI 3-5 ans.
              </p>
            </Link>
            <Link
              href="/services/electricite/relamping/industriel-entrepot"
              className="p-6 rounded-2xl bg-surface-elevated border border-border hover:border-primary-300 dark:hover:border-primary-500 transition-colors group"
            >
              <span className="font-display font-bold text-lg text-foreground group-hover:text-primary-600 dark:group-hover:text-primary-300 inline-flex items-center gap-2 mb-2">
                Local technique / logistique
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Locaux serveurs, archives, locaux d&apos;archivage, garages
                administratifs. Robustesse IK10, allumage 24/7 ou
                détection présence selon usage. ROI &lt; 18 mois sur
                les zones à allumage permanent.
              </p>
            </Link>
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
            Audit photométrique, calcul ROI, gestion DALI, conformité NF EN
            12464-1 et DEET 2030. Réponse marchés publics + privés.
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
              Auditons votre éclairage à Nanterre gratuitement
            </h2>
            <p className="text-primary-100 text-lg">
              Audit sous 48h + rapport DEET 2030 sous 7 jours. Sans engagement.
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
