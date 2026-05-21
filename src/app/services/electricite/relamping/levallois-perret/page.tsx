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
} from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";
import { NoiseOverlay } from "@/components/ui/ambient";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import {
  generateServiceSchema,
  injectSchema,
} from "@/lib/structured-data";
import BulbText from "@/components/ui/BulbText";

// Auto-generated from seo-backlog.json item "location-levallois" on 2026-05-20.
// Review before going live: validate the local stats, swap the hero image
// if a city-specific one exists in /public/images/locations/.

export const metadata: Metadata = {
  title: "Relamping LED à Levallois-Perret — sociétés, agences, plateaux tertiaires | S Connect",
  description:
    "Spécialiste relamping LED à Levallois-Perret (92300) : audit gratuit, étude personnalisée, installation, conformité NF EN 12464-1, accompagnement décret tertiaire. Devis sous 7 jours.",
  keywords: [
    "relamping LED Levallois-Perret",
    "électricien Levallois", "éclairage entreprise 92300",
  ],
  alternates: { canonical: "/services/electricite/relamping/levallois-perret" },
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sconnectfrance.fr";
const serviceSchema = generateServiceSchema(
  {
    name: "Relamping LED à Levallois-Perret",
    description:
      "Audit, étude et installation relamping LED pour bureaux, commerces, copropriétés et industriels à Levallois-Perret et alentours. Conformité NF EN 12464-1 et décret tertiaire (DEET) couverts.",
    provider: "S Connect",
    areaServed: ["Levallois-Perret", "Île-de-France"],
    priceRange: "€€€",
  },
  siteUrl,
);

export default function RelampingLevalloisPerretPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={injectSchema(serviceSchema)} />

      {/* Hero */}
      <section className="relative bg-dark-950 py-16 md:py-24 overflow-hidden">
        <Image
          src="/images/locations/levallois-perret-hero.webp"
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
                { label: "Levallois-Perret" },
              ]}
            />
          </div>
          <div className="max-w-2xl">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-electric-500 rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-primary-500/30">
              <MapPin className="w-8 h-8 text-white" />
            </div>
            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-4 leading-tight [text-shadow:_0_2px_20px_rgba(0,0,0,0.6)]">
              Relamping LED à {"Levallois-Perret"}
            </h1>
            <p className="text-xl md:text-2xl font-medium mb-6">
              <BulbText>Audit gratuit · ROI mesuré · Conforme NF EN 12464-1</BulbText>
            </p>
            <p className="text-lg text-white/90 leading-relaxed [text-shadow:_0_1px_8px_rgba(0,0,0,0.5)]">
              S Connect intervient sur tout Levallois-Perret et la couronne immédiate. Bureaux,
              copropriétés, commerces, industriels : nous mesurons avant de chiffrer,
              et la facture finale = le devis.
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

      {/* Pourquoi nous pour Levallois-Perret */}
      <section className="section-padding bg-surface">
        <div className="container-custom max-w-4xl">
          <SectionTitle
            badge="Pourquoi S Connect à Levallois-Perret"
            title="L'expertise éclairage locale, sans intermédiaire"
            subtitle="Basés à Clichy, nous intervenons sur Levallois-Perret en moins de 40 min. Notre équipe sait calibrer un éclairage pour chaque typologie de local de la ville."
          />
          <ul className="grid sm:grid-cols-2 gap-4">
            {[
              { title: "Audit gratuit sous 7 jours", desc: "Visite, mesures luxmètre étalonné, rapport chiffré avec ROI. Sans engagement." },
              { title: "Devis ferme = facture finale", desc: "Aucun supplément après diagnostic. Délais et coûts garantis par écrit." },
              { title: "Conformité NF EN 12464-1", desc: "Niveaux d'éclairement réglementaires par poste de travail vérifiés à la livraison." },
              { title: "Couverture décret tertiaire", desc: "Le relamping reste l'investissement n°1 pour atteindre les −40 % du DEET en 2030." },
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

      {/* Sub-clusters typologies */}
      <section className="section-padding bg-surface-muted">
        <div className="container-custom max-w-5xl">
          <SectionTitle
            badge="Selon votre typologie"
            title="Quelle solution pour votre local à Levallois-Perret ?"
          />
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { name: "Bureau & tertiaire", href: "/services/electricite/relamping/bureau-tertiaire" },
              { name: "Commerce & restaurant", href: "/services/electricite/relamping/commerce-restaurant" },
              { name: "Copropriété & parking", href: "/services/electricite/relamping/copropriete-parking" },
              { name: "Industriel & entrepôt", href: "/services/electricite/relamping/industriel-entrepot" },
            ].map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className="p-6 rounded-2xl bg-surface border border-border hover:border-primary-300 dark:hover:border-primary-500 transition-colors group"
              >
                <span className="font-display font-bold text-lg text-foreground group-hover:text-primary-600 dark:group-hover:text-primary-300 inline-flex items-center gap-2">
                  {t.name}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
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
            Notre méthode relamping complète
          </h2>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
            Audit, calcul ROI, gestion DALI, conformité décret tertiaire : tout est
            détaillé sur notre page pilier dédiée.
          </p>
          <Link href="/services/electricite/relamping" className="btn-outline">
            Voir la page pilier Relamping LED
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 bg-gradient-to-r from-primary-700 via-primary-600 to-electric-600 overflow-hidden">
        <NoiseOverlay opacity={0.05} />
        <div className="container-custom relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-white">
            <h2 className="font-display font-bold text-2xl md:text-3xl mb-2">
              Auditons votre éclairage à {"Levallois-Perret"} gratuitement
            </h2>
            <p className="text-primary-100 text-lg">
              Rapport chiffré + ROI sous 7 jours. Sans engagement.
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
