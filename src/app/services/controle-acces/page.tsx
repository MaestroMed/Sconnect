import { Metadata } from "next";
import Link from "next/link";
import { KeyRound, Video, CreditCard, ChevronRight, Phone } from "lucide-react";
import CategoryLandingHero from "@/components/services/CategoryLandingHero";
import { NoiseOverlay } from "@/components/ui/ambient";

export const metadata: Metadata = {
  title: "Contrôle d'Accès | Interphonie, Badges & Digicodes | S'Connect",
  description: "Installation professionnelle de systèmes de contrôle d'accès en Île-de-France : interphonie, vidéophonie, badges et digicodes pour immeubles, entreprises et particuliers. Devis gratuit.",
  keywords: [
    "contrôle accès",
    "interphonie",
    "vidéophonie",
    "badges",
    "digicodes",
    "contrôle accès Île-de-France",
    "interphone Paris",
    "installation interphone",
    "système accès",
    "sécurité immeuble",
  ],
  openGraph: {
    title: "Contrôle d'Accès | Interphonie & Badges | S'Connect",
    description: "Installation de systèmes de contrôle d'accès : interphonie, badges, digicodes. Intervention rapide en Île-de-France.",
    images: ["/og-image.jpg"],
    type: "website",
  },
};

const services = [
  {
    name: "Interphonie & Vidéophonie",
    slug: "interphonie-videophonie",
    icon: Video,
    description: "Installation et dépannage d'interphones et vidéophones pour particuliers, copropriétés et entreprises.",
  },
  {
    name: "Badges & Digicodes",
    slug: "badges-digicodes",
    icon: CreditCard,
    description: "Installation de systèmes de contrôle d'accès par badges, digicodes et lecteurs biométriques.",
  },
];

export default function ControleAccesPage() {
  return (
    <>
      <CategoryLandingHero
        category="acces"
        title="Contrôle d'accès"
        subtitle="Interphonie, badges, digicodes"
        description="Interphonie, vidéophonie, badges et digicodes pour sécuriser vos locaux en Île-de-France."
        icon="keyRound"
        imageSlug="acces-interphone"
        breadcrumbLabel="Contrôle d'accès"
      />

      {/* Services */}
      <section className="section-padding bg-surface">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/controle-acces/${service.slug}`}
                className="group block p-8 rounded-2xl border-2 border-accent-100 hover:border-accent-400 bg-gradient-to-br from-accent-50 to-white dark:border-accent-500/25 dark:hover:border-accent-400 dark:from-accent-500/10 dark:to-surface-muted transition-all hover:shadow-xl hover:-translate-y-1"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-accent-500 to-amber-400 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-accent-500/25 group-hover:scale-110 group-hover:rotate-3 transition-transform">
                  <service.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-display font-bold text-xl text-foreground mb-3">
                  {service.name}
                </h3>
                <p className="text-foreground-muted mb-4">{service.description}</p>
                <span className="inline-flex items-center gap-2 text-accent-600 dark:text-accent-300 font-semibold group-hover:gap-3 transition-all">
                  Découvrir
                  <ChevronRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 bg-gradient-to-r from-amber-600 via-accent-500 to-amber-500 overflow-hidden">
        <NoiseOverlay opacity={0.05} />
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse-soft" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: "2s" }} />
        <div className="container-custom relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-white">
            <h2 className="font-display font-bold text-2xl md:text-3xl mb-2">Sécurisez vos accès</h2>
            <p className="text-amber-50 text-lg">Installation sur mesure et devis gratuit.</p>
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




