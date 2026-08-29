import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Zap,
  FileCheck,
  AlertTriangle,
  ChevronRight,
  Phone,
  Battery,
  Lightbulb,
  ArrowRight,
} from "lucide-react";
import CategoryLandingHero from "@/components/services/CategoryLandingHero";
import { NoiseOverlay } from "@/components/ui/ambient";
import { generateServiceSchema, injectSchema } from "@/lib/structured-data";

export const metadata: Metadata = {
  alternates: { canonical: "/services/electricite" },
  title: "Électricité Paris & IDF | Installation, Rénovation, Relamping | S Connect",
  description:
    "Services d'électricité à Clichy et Île-de-France : installation, rénovation, mise aux normes, dépannage 24h/24 et relamping LED. Audit gratuit. Certifications RGE & Qualifélec.",
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sconnectfrance.fr";
const electriciteSchema = generateServiceSchema(
  {
    name: "Électricité — installation, rénovation, mise aux normes, dépannage, relamping LED",
    description:
      "Artisan électricien à Clichy et en Île-de-France. Installation et rénovation d'installations basse tension, mise aux normes NF C 15-100, dépannage 24h/24, relamping LED et bornes IRVE. Garantie décennale active.",
    provider: "S Connect",
    areaServed: ["Paris", "Clichy", "Hauts-de-Seine", "Île-de-France"],
    priceRange: "€€",
  },
  siteUrl,
);

const services = [
  {
    name: "Installation & Rénovation",
    slug: "installation-renovation",
    icon: Zap,
    description:
      "Création de réseaux électriques complets, poses de prises, éclairages et tableaux neufs pour habitations et locaux professionnels.",
  },
  {
    name: "Mise aux Normes",
    slug: "mise-aux-normes",
    icon: FileCheck,
    description:
      "Mise en conformité de vos installations selon la norme NF C 15-100. Diagnostics et remise à niveau de votre sécurité électrique.",
  },
  {
    name: "Dépannage Électrique",
    slug: "depannage-electrique",
    icon: AlertTriangle,
    description:
      "Intervention rapide 24h/24, 7j/7 pour tous vos problèmes électriques : pannes, courts-circuits, disjoncteurs.",
  },
  {
    name: "Borne de recharge IRVE",
    slug: "borne-irve",
    icon: Battery,
    description:
      "Installateur IRVE certifié niveau 2. Bornes 7 à 22 kW pour maison, copropriété ou tertiaire. Aides ADVENIR jusqu'à 1 660 € gérées de A à Z.",
  },
];

export default function ElectricitePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={injectSchema(electriciteSchema)}
      />
      <CategoryLandingHero
        category="electricite"
        title="Électricité"
        subtitle="Installation, rénovation, relamping, dépannage"
        description="Installation, rénovation, mise aux normes, dépannage électrique et relamping LED pour particuliers et professionnels en Île-de-France."
        icon="zap"
        imageSlug="electricite-installation"
        breadcrumbLabel="Électricité"
      />

      {/* ─── Relamping LED — featured callout, top of category page ─── */}
      <section className="relative py-16 md:py-20 bg-dark-950 overflow-hidden">
        <Image
          src="/images/hero/relamping-lightbulb.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-50"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-950 from-0% via-dark-950/70 via-50% to-dark-950/20 to-100%" />
        <NoiseOverlay opacity={0.04} />
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-200 text-sm font-semibold mb-6 backdrop-blur-md">
              <Lightbulb className="w-4 h-4" />
              Nouveau · Relamping LED
            </span>
            <h2 className="font-display font-bold text-3xl md:text-5xl text-white mb-4 leading-tight [text-shadow:_0_2px_20px_rgba(0,0,0,0.6)]">
              Divisez par 5 votre facture d&apos;éclairage.
            </h2>
            <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed max-w-2xl [text-shadow:_0_1px_8px_rgba(0,0,0,0.5)]">
              Audit éclairage gratuit, étude économique avec ROI précis, installation LED clé en
              main et plan de financement (leasing, éco-PTZ Pro). Pour bureaux, commerces,
              copropriétés et sites industriels en Île-de-France.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/services/electricite/relamping"
                className="btn-primary btn-lg"
              >
                Découvrir le relamping
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/demande-devis"
                className="btn glass-panel text-white hover:bg-white/15 btn-lg"
              >
                Audit gratuit
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-6 text-white/70 text-sm">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                Financement accompagné
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                Conformité décret tertiaire
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                Qualifélec Éclairage
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section-padding bg-surface">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/electricite/${service.slug}`}
                className="group block p-8 rounded-2xl border-2 border-primary-100 hover:border-primary-400 bg-gradient-to-br from-primary-50 to-white dark:border-primary-500/25 dark:hover:border-primary-400 dark:from-primary-500/10 dark:to-surface-muted transition-all hover:shadow-xl hover:-translate-y-1"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-electric-500 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-primary-500/25 group-hover:scale-110 group-hover:rotate-3 transition-transform">
                  <service.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-display font-bold text-xl text-foreground mb-3">
                  {service.name}
                </h3>
                <p className="text-foreground-muted mb-4">{service.description}</p>
                <span className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-300 font-semibold group-hover:gap-3 transition-all">
                  Découvrir
                  <ChevronRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 bg-gradient-to-r from-primary-700 via-primary-600 to-electric-600 overflow-hidden">
        <NoiseOverlay opacity={0.05} />
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse-soft" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: "2s" }} />
        <div className="container-custom relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-white">
            <h2 className="font-display font-bold text-2xl md:text-3xl mb-2">Besoin d&apos;un électricien ?</h2>
            <p className="text-primary-100 text-lg">Intervention rapide et devis gratuit.</p>
          </div>
          <div className="flex gap-4">
            <Link href="/demande-devis" className="btn-white btn-lg">
              Demander un devis
              <ChevronRight className="w-5 h-5" />
            </Link>
            <a href="tel:+33652820685" className="btn glass-panel text-white hover:bg-white/15 btn-lg">
              <Phone className="w-5 h-5" />
              06 52 82 06 85
            </a>
          </div>
        </div>
      </section>
    </>
  );
}




