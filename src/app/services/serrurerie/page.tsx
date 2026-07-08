import { Metadata } from "next";
import Link from "next/link";
import { Lock, DoorOpen, KeyRound, Shield, ChevronRight, Phone } from "lucide-react";
import CategoryLandingHero from "@/components/services/CategoryLandingHero";
import { NoiseOverlay } from "@/components/ui/ambient";
import PricingTable from "@/components/marketing/PricingTable";
import { getPricing } from "@/lib/data/pricing";
import { generateServiceSchema, injectSchema } from "@/lib/structured-data";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sconnectfrance.fr";
const serrurerieSchema = generateServiceSchema(
  {
    name: "Serrurerie — ouverture de porte 24h/24, remplacement de serrure, blindage",
    description:
      "Serrurier en Île-de-France disponible 24h/24 et 7j/7. Ouverture de porte claquée ou fermée à clé, remplacement de serrure et cylindre, blindage de porte certifié A2P, sécurisation des accès.",
    provider: "S Connect",
    areaServed: ["Paris", "Clichy", "Hauts-de-Seine", "Île-de-France"],
    priceRange: "€€",
  },
  siteUrl,
);

export const metadata: Metadata = {
  title: "Serrurerie | Ouverture de Porte, Remplacement & Blindage | S Connect France",
  description: "Services de serrurerie professionnelle en Île-de-France : ouverture de porte 24h/24, remplacement de serrure, blindage de porte. Intervention rapide, devis gratuit. Serrurier certifié.",
  keywords: [
    "serrurier",
    "ouverture porte",
    "serrurerie Île-de-France",
    "serrurier Paris",
    "remplacement serrure",
    "blindage porte",
    "serrurier 24h",
    "porte claquée",
    "clé cassée",
    "serrure bloquée",
  ],
  openGraph: {
    title: "Serrurerie 24h/24 | Ouverture & Blindage | S Connect France",
    description: "Intervention rapide en serrurerie : ouverture de porte, remplacement de serrure, blindage. Disponible 24h/24.",
    images: ["/og-image.jpg"],
    type: "website",
  },
};

const services = [
  {
    name: "Ouverture de Porte",
    slug: "ouverture-porte",
    icon: DoorOpen,
    description: "Ouverture de porte claquée, fermée à clé ou bloquée. Intervention rapide 24h/24, 7j/7.",
  },
  {
    name: "Remplacement de Serrure",
    slug: "remplacement-serrure",
    icon: KeyRound,
    description: "Changement de serrure, cylindre et verrou. Serrures haute sécurité certifiées A2P.",
  },
  {
    name: "Blindage de Porte",
    slug: "blindage-porte",
    icon: Shield,
    description: "Blindage de porte existante ou pose de bloc-porte blindé. Sécurisation certifiée A2P BP.",
  },
];

export default function SerrureriePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={injectSchema(serrurerieSchema)}
      />
      <CategoryLandingHero
        category="serrurerie"
        title="Serrurerie"
        subtitle="Ouverture, blindage, sécurisation"
        description="Ouverture de porte, remplacement de serrure, blindage et sécurisation de vos accès en Île-de-France."
        icon="lock"
        imageSlug="serrurerie-ouverture"
        breadcrumbLabel="Serrurerie"
      />

      {/* Services */}
      <section className="section-padding bg-surface">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/serrurerie/${service.slug}`}
                className="group block p-8 rounded-2xl border-2 border-emerald-100 hover:border-emerald-400 bg-gradient-to-br from-emerald-50 to-white dark:border-emerald-500/25 dark:hover:border-emerald-400 dark:from-emerald-500/10 dark:to-surface-muted transition-all hover:shadow-xl hover:-translate-y-1"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-400 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/25 group-hover:scale-110 group-hover:rotate-3 transition-transform">
                  <service.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-display font-bold text-xl text-foreground mb-3">
                  {service.name}
                </h3>
                <p className="text-foreground-muted mb-4">{service.description}</p>
                <span className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-300 font-semibold group-hover:gap-3 transition-all">
                  Découvrir
                  <ChevronRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing — centralized data, single source of truth */}
      <PricingTable variant="muted" {...getPricing("serrurerie")} />

      {/* Emergency CTA */}
      <section className="relative py-20 bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-600 overflow-hidden">
        <NoiseOverlay opacity={0.05} />
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse-soft" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: "2s" }} />
        <div className="container-custom relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-white">
            <h2 className="font-display font-bold text-2xl md:text-3xl mb-2">Porte claquée ? Urgence serrurerie ?</h2>
            <p className="text-emerald-100 text-lg">Intervention rapide 24h/24, 7j/7.</p>
          </div>
          <div className="flex gap-4">
            <Link href="/demande-intervention" className="btn-white btn-lg">
              Intervention urgente
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




