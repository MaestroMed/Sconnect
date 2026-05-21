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

// EDITORIALISED 2026-05-21 — production quality with real Boulogne-Billancourt
// office market data (ORIE, BNPP RE). Boulogne = #1 destination IDF pour
// nouvelles installations bureaux (12.6% des préférences).

export const metadata: Metadata = {
  title: "Relamping LED à Boulogne-Billancourt — 700k m² bureaux, #1 IDF | S Connect",
  description:
    "Spécialiste relamping LED à Boulogne-Billancourt (92100) — première destination IDF pour les nouvelles installations bureaux (12,6 %). 700 000 m² de tertiaire sur le Trapèze, Île Seguin, Pont de Sèvres. Audit gratuit, conformité NF EN 12464-1, DEET 2030. Devis ferme sous 7 jours.",
  keywords: [
    "relamping LED Boulogne-Billancourt",
    "électricien LED 92100",
    "audit éclairage Boulogne",
    "relamping bureau Trapèze",
    "éclairage tertiaire Île Seguin",
    "DEET Boulogne",
  ],
  alternates: { canonical: "/services/electricite/relamping/boulogne-billancourt" },
  openGraph: {
    title: "Relamping LED Boulogne-Billancourt — S Connect, expertise tertiaire 92100",
    description:
      "700k m² de bureaux sur la première destination IDF des nouvelles implantations. Audit gratuit, ROI mesuré, conformité décret tertiaire.",
    images: ["/images/locations/boulogne-billancourt-hero.webp"],
    type: "website",
  },
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sconnectfrance.fr";
const serviceSchema = generateServiceSchema(
  {
    name: "Relamping LED à Boulogne-Billancourt (92100)",
    description:
      "Audit, étude et installation relamping LED pour bureaux, sièges sociaux, commerces et copropriétés à Boulogne-Billancourt. Première destination IDF pour les nouvelles implantations tertiaires. Conformité NF EN 12464-1 et trajectoire décret tertiaire (DEET) couvertes. Artisan certifié Qualifélec/RGE/IRVE basé Clichy à 15 min.",
    provider: "S Connect",
    areaServed: ["Boulogne-Billancourt", "Issy-les-Moulineaux", "Sèvres", "Saint-Cloud", "Île-de-France"],
    priceRange: "€€€",
  },
  siteUrl,
);

export default function RelampingBoulognePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={injectSchema(serviceSchema)} />

      {/* Hero */}
      <section className="relative bg-dark-950 py-16 md:py-24 overflow-hidden">
        <Image
          src="/images/locations/boulogne-billancourt-hero.webp"
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
                { label: "Boulogne-Billancourt" },
              ]}
            />
          </div>
          <div className="max-w-2xl">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-electric-500 rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-primary-500/30">
              <MapPin className="w-8 h-8 text-white" />
            </div>
            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-4 leading-tight [text-shadow:_0_2px_20px_rgba(0,0,0,0.6)]">
              Relamping LED à Boulogne-Billancourt
            </h1>
            <p className="text-xl md:text-2xl font-medium mb-6">
              <BulbText>1ʳᵉ destination IDF des nouvelles implantations tertiaires</BulbText>
            </p>
            <p className="text-lg text-white/90 leading-relaxed [text-shadow:_0_1px_8px_rgba(0,0,0,0.5)]">
              700 000 m² de bureaux sur le Trapèze, l&apos;Île Seguin et le Pont de Sèvres.
              Sièges sociaux (Bouygues, Renault, France 24, Carrefour), plateaux
              corporate modernes, mais aussi parc 1980s-90s en pleine bascule
              relamping pour le DEET 2030.
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

      {/* Le marché tertiaire boulonnais en chiffres */}
      <section className="section-padding bg-surface">
        <div className="container-custom max-w-5xl">
          <SectionTitle
            badge="Boulogne-Billancourt en 2026"
            title="Le 1ᵉʳ marché tertiaire IDF hors Paris intra-muros"
            subtitle="Sources : ORIE, BNP Paribas Real Estate (« Bureaux en Île-de-France : Montreuil, Clichy et St-Ouen prisés »), INSEE."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { value: "700k m²", label: "Bureaux totaux 92100" },
              { value: "12.6 %", label: "Destination préférée IDF" },
              { value: "~120k", label: "Habitants Boulogne" },
              { value: "~80k", label: "Salariés tertiaires actifs" },
            ].map((s) => (
              <div key={s.label} className="p-5 rounded-2xl bg-surface-elevated border border-border text-center">
                <div
                  className="font-display font-bold text-2xl md:text-3xl text-primary-700 dark:text-primary-300"
                  style={{ fontVariantNumeric: "tabular-nums" }}
                >
                  {s.value}
                </div>
                <div className="text-sm text-foreground-muted mt-1">{s.label}</div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-foreground-muted text-center max-w-3xl mx-auto">
            Boulogne-Billancourt arrive en tête des préférences d&apos;installation
            tertiaire en Île-de-France (12,6 %), devant Neuilly (9,4 %), La Défense
            (9,3 %) et Levallois (8,4 %). Le parc bureau est mixte : sièges récents
            (Trapèze, Île Seguin) côtoient immeubles 1980s-90s en pleine mutation
            écoénergétique.
          </p>
        </div>
      </section>

      {/* 3 zones clés */}
      <section className="section-padding bg-surface-muted">
        <div className="container-custom max-w-5xl">
          <SectionTitle
            badge="3 zones tertiaires clés"
            title="Trapèze, Île Seguin, Pont de Sèvres"
          />
          <div className="grid md:grid-cols-3 gap-5">
            <div className="p-5 rounded-2xl bg-surface border border-border">
              <div className="flex items-center gap-2 mb-2">
                <Building2 className="w-5 h-5 text-primary-500" />
                <span className="font-display font-bold text-foreground">Le Trapèze</span>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                ZAC Renault redéveloppée, ~300 000 m² de bureaux contemporains
                (Bouygues Construction, Bureau Veritas, etc.). Cible relamping :
                immeubles 2008-2015 avec premier parc LED 1ʳᵉ génération à
                renouveler.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-surface border border-border">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-primary-500" />
                <span className="font-display font-bold text-foreground">Île Seguin</span>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                La Seine Musicale, R4, projets culturels et tertiaires émergents.
                Bureaux haut de gamme avec demande forte sur gestion DALI-2 et
                HCL pour les espaces créatifs et plateaux de coworking premium.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-surface border border-border">
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-5 h-5 text-primary-500" />
                <span className="font-display font-bold text-foreground">Pont de Sèvres</span>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Tours d&apos;époque (1970-1990), parc renouvellement éclairage massif
                à venir. Trajectoire DEET serrée — plusieurs bailleurs ont déjà
                engagé leur plan pluriannuel pour 2027-2029.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pourquoi nous à Boulogne */}
      <section className="section-padding bg-surface">
        <div className="container-custom max-w-4xl">
          <SectionTitle
            badge="Pourquoi S Connect à Boulogne"
            title="L'expertise éclairage tertiaire de la rive sud"
          />
          <ul className="grid sm:grid-cols-2 gap-4">
            {[
              { title: "Intervention < 25 min", desc: "Depuis Clichy, accès Boulogne via la N13 ou A86 — quasi tous les chantiers démarrés sous 25 min en horaires ouvrés." },
              { title: "Habitude des grands volumes", desc: "Plateaux 1000-3000 m² courants à Boulogne — notre méthode DALI multi-zones (testée sur 80+ chantiers IDF) gère ces surfaces nativement." },
              { title: "Bureau d'études partenaire", desc: "Pour les projets > 500 m², nous travaillons avec un bureau d'études photométriques (Dialux Evo) pour valider l'éclairement par zone avant pose." },
              { title: "Démarche RSE document", desc: "Nous fournissons les bilans énergétiques avant/après pour vos rapports RSE et déclarations OPERAT annuelles." },
              { title: "Stock matériel local Hager", desc: "Hager Sales Office Boulogne à 10 min — délais matériel réduits sur les commandes Hager (tableaux, différentiels)." },
              { title: "Devis ferme = facture finale", desc: "Aucun supplément après diagnostic. Délais et coûts garantis par écrit." },
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

      {/* Selon typologie */}
      <section className="section-padding bg-surface-muted">
        <div className="container-custom max-w-5xl">
          <SectionTitle
            badge="Selon votre typologie"
            title="Quelle solution pour votre local à Boulogne ?"
          />
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { name: "Bureau & tertiaire", href: "/services/electricite/relamping/bureau-tertiaire", desc: "Plateaux Trapèze / Île Seguin — gestion DALI-2 multi-zones" },
              { name: "Commerce & restaurant", href: "/services/electricite/relamping/commerce-restaurant", desc: "Boulogne centre, ZA Marcel Sembat — IRC > 90 + scènes DALI" },
              { name: "Copropriété & parking", href: "/services/electricite/relamping/copropriete-parking", desc: "Copros 1970-90 du Pont de Sèvres — détection présence + IP65 parking" },
              { name: "Industriel & entrepôt", href: "/services/electricite/relamping/industriel-entrepot", desc: "ZA Boulogne-Sud, locaux d'activité Île Seguin — IP65/IK10" },
            ].map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className="p-5 rounded-2xl bg-surface border border-border hover:border-primary-300 dark:hover:border-primary-500 transition-colors group block"
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

      {/* Cross-link pillar */}
      <section className="section-padding bg-surface">
        <div className="container-custom max-w-3xl text-center">
          <Lightbulb className="w-12 h-12 text-primary-500 mx-auto mb-4" />
          <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-3">
            Étude de cas Boulogne — 1 500 m² documentés
          </h2>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
            Un de nos chantiers boulonnais est documenté en détail dans la page
            études de cas : plateau de bureaux 1 500 m², fluo T8 → LED DALI + détection,
            ROI 3,5 ans, contribution DEET −16 %.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 flex-wrap">
            <Link href="/etudes-de-cas#bureau-boulogne-1500m2" className="btn-primary btn-lg">
              Voir l&apos;étude de cas Boulogne
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/calculateur-relamping" className="btn-outline btn-lg">
              Calculer mon ROI
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 bg-gradient-to-r from-primary-700 via-primary-600 to-electric-600 overflow-hidden">
        <NoiseOverlay opacity={0.05} />
        <div className="container-custom relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-white">
            <h2 className="font-display font-bold text-2xl md:text-3xl mb-2">
              Auditons votre éclairage à Boulogne gratuitement
            </h2>
            <p className="text-primary-100 text-lg">
              Rapport chiffré + ROI sous 7 jours. Visite sur site offerte.
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
