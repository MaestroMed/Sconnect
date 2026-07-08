import { Metadata } from "next";
import Link from "next/link";
import { Wrench, ChevronRight, Phone, DoorOpen, Shield } from "lucide-react";
import CategoryLandingHero from "@/components/services/CategoryLandingHero";
import { NoiseOverlay } from "@/components/ui/ambient";
import PricingTable from "@/components/marketing/PricingTable";
import { getPricing } from "@/lib/data/pricing";
import { generateServiceSchema, injectSchema } from "@/lib/structured-data";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sconnectfrance.fr";
const metallerieSchema = generateServiceSchema(
  {
    name: "Métallerie sur mesure — portails, portes, structures métalliques",
    description:
      "Atelier métallerie en Île-de-France : conception et fabrication sur mesure de portails (battants, coulissants, motorisés), portes métalliques, garde-corps, escaliers, verrières et structures en acier. Pose incluse.",
    provider: "S Connect",
    areaServed: ["Paris", "Clichy", "Hauts-de-Seine", "Île-de-France"],
    priceRange: "€€€",
  },
  siteUrl,
);

export const metadata: Metadata = {
  title: "Métallerie | Fabrication Portails, Portes & Structures Métalliques | S Connect France",
  description: "Métallerie professionnelle en Île-de-France : fabrication sur mesure de portails, portes métalliques, garde-corps et structures en acier. Devis gratuit, pose incluse.",
  keywords: [
    "métallerie",
    "fabrication portail",
    "porte métallique",
    "structure acier",
    "garde-corps",
    "métallerie Île-de-France",
    "portail sur mesure",
    "ferronnerie",
    "menuiserie métallique",
    "soudure acier",
  ],
  openGraph: {
    title: "Métallerie | Portails & Structures sur Mesure | S Connect France",
    description: "Fabrication et pose de portails, portes métalliques et structures en acier. Travail sur mesure en Île-de-France.",
    images: ["/og-image.jpg"],
    type: "website",
  },
};

const services = [
  {
    name: "Fabrication de Portails",
    slug: "fabrication-portail",
    icon: Wrench,
    description: "Conception et fabrication de portails sur mesure en acier, aluminium ou fer forgé. Portails coulissants, battants, motorisés.",
  },
  {
    name: "Fabrication de Portes",
    slug: "fabrication-porte",
    icon: DoorOpen,
    description: "Portes métalliques sur mesure : portes d'entrée, portes de garage, portes de cave, portes techniques et coupe-feu.",
  },
  {
    name: "Structures Métalliques",
    slug: "structure-metallique",
    icon: Shield,
    description: "Conception et réalisation de structures métalliques : garde-corps, escaliers, verrières, pergolas et charpentes.",
  },
];

export default function MetalleriePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={injectSchema(metallerieSchema)}
      />
      <CategoryLandingHero
        category="metallerie"
        title="Métallerie"
        subtitle="Sur mesure, savoir-faire artisanal"
        description="Fabrication sur mesure de portails, portes et structures métalliques. Un savoir-faire artisanal au service de vos projets en Île-de-France."
        icon="wrench"
        imageSlug="metallerie-portail"
        breadcrumbLabel="Métallerie"
      />

      {/* Services */}
      <section className="section-padding bg-surface">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/metallerie/${service.slug}`}
                className="group block p-8 rounded-2xl border-2 border-orange-100 hover:border-orange-400 bg-gradient-to-br from-orange-50 to-white dark:border-orange-500/25 dark:hover:border-orange-400 dark:from-orange-500/10 dark:to-surface-muted transition-all hover:shadow-xl hover:-translate-y-1"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-rose-500 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-orange-500/25 group-hover:scale-110 group-hover:rotate-3 transition-transform">
                  <service.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-display font-bold text-xl text-foreground mb-3">
                  {service.name}
                </h3>
                <p className="text-foreground-muted mb-4">{service.description}</p>
                <span className="inline-flex items-center gap-2 text-orange-600 dark:text-orange-300 font-semibold group-hover:gap-3 transition-all">
                  Découvrir
                  <ChevronRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Avantages */}
      <section className="section-padding bg-surface-muted">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4">
              Pourquoi choisir notre métallerie ?
            </h2>
            <p className="text-foreground-muted max-w-2xl mx-auto">
              Un savoir-faire artisanal combiné aux techniques modernes pour des réalisations sur mesure et durables.
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { title: "Sur mesure", description: "Chaque projet est unique et adapté à vos besoins" },
              { title: "Qualité", description: "Matériaux premium et finitions soignées" },
              { title: "Durabilité", description: "Des ouvrages conçus pour durer des décennies" },
              { title: "Installation", description: "Pose professionnelle par nos équipes" },
            ].map((item) => (
              <div key={item.title} className="text-center p-6 bg-surface rounded-xl shadow-sm">
                <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-foreground-muted text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing — centralized data */}
      <PricingTable variant="muted" {...getPricing("metallerie")} />

      {/* CTA */}
      <section className="relative py-20 bg-gradient-to-r from-orange-700 via-orange-600 to-rose-600 overflow-hidden">
        <NoiseOverlay opacity={0.05} />
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse-soft" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: "2s" }} />
        <div className="container-custom relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-white">
            <h2 className="font-display font-bold text-2xl md:text-3xl mb-2">Un projet de métallerie ?</h2>
            <p className="text-orange-50 text-lg">Devis gratuit et personnalisé sous 48h.</p>
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





