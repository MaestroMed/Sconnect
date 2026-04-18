import { Metadata } from "next";
import Link from "next/link";
import { Zap, FileCheck, AlertTriangle, ChevronRight, Phone } from "lucide-react";
import CategoryLandingHero from "@/components/services/CategoryLandingHero";
import { NoiseOverlay } from "@/components/ui/ambient";

export const metadata: Metadata = {
  title: "Électricité | Installation, Rénovation & Dépannage",
  description: "Services d'électricité à Clichy et Île-de-France : installation, rénovation, mise aux normes et dépannage 24h/24. Devis gratuit.",
};

const services = [
  {
    name: "Installation & Rénovation",
    slug: "installation-renovation",
    icon: Zap,
    description: "Création de réseaux électriques complets, poses de prises, éclairages et tableaux neufs pour habitations et locaux professionnels.",
  },
  {
    name: "Mise aux Normes",
    slug: "mise-aux-normes",
    icon: FileCheck,
    description: "Mise en conformité de vos installations selon la norme NF C 15-100. Diagnostics et remise à niveau de votre sécurité électrique.",
  },
  {
    name: "Dépannage Électrique",
    slug: "depannage-electrique",
    icon: AlertTriangle,
    description: "Intervention rapide 24h/24, 7j/7 pour tous vos problèmes électriques : pannes, courts-circuits, disjoncteurs.",
  },
];

export default function ElectricitePage() {
  return (
    <>
      <CategoryLandingHero
        category="electricite"
        title="Électricité"
        subtitle="Installation, rénovation, dépannage"
        description="Installation, rénovation, mise aux normes et dépannage électrique pour particuliers et professionnels en Île-de-France."
        icon="zap"
        imageSlug="electricite-installation"
        breadcrumbLabel="Électricité"
      />

      {/* Services */}
      <section className="section-padding bg-surface">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-8">
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
            <a href="tel:+33100000000" className="btn glass-panel text-white hover:bg-white/15 btn-lg">
              <Phone className="w-5 h-5" />
              01 XX XX XX XX
            </a>
          </div>
        </div>
      </section>
    </>
  );
}




