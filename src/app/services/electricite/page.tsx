import { Metadata } from "next";
import Link from "next/link";
import { Zap, FileCheck, AlertTriangle, ChevronRight, Phone } from "lucide-react";

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
      {/* Hero */}
      <section className="bg-gradient-to-br from-dark-900 via-dark-950 to-primary-950 py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-electric-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-primary-500/25">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-4">
              Électricité
            </h1>
            <p className="text-xl text-dark-300 leading-relaxed">
              Installation, rénovation, mise aux normes et dépannage électrique pour particuliers et professionnels en Île-de-France.
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/electricite/${service.slug}`}
                className="group block p-8 rounded-2xl border-2 border-primary-100 hover:border-primary-400 bg-gradient-to-br from-primary-50 to-white transition-all hover:shadow-xl"
              >
                <div className="w-14 h-14 bg-primary-500 rounded-xl flex items-center justify-center mb-6">
                  <service.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-display font-bold text-xl text-dark-900 mb-3">
                  {service.name}
                </h3>
                <p className="text-dark-600 mb-4">{service.description}</p>
                <span className="inline-flex items-center gap-2 text-primary-600 font-semibold group-hover:gap-3 transition-all">
                  Découvrir
                  <ChevronRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary-600">
        <div className="container-custom flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-white">
            <h2 className="font-display font-bold text-2xl mb-2">Besoin d&apos;un électricien ?</h2>
            <p className="text-primary-100">Intervention rapide et devis gratuit.</p>
          </div>
          <div className="flex gap-4">
            <Link href="/demande-devis" className="btn-white">
              Demander un devis
            </Link>
            <a href="tel:+33100000000" className="btn bg-white/10 text-white hover:bg-white/20 border border-white/20">
              <Phone className="w-5 h-5" />
              01 XX XX XX XX
            </a>
          </div>
        </div>
      </section>
    </>
  );
}




