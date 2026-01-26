import { Metadata } from "next";
import Link from "next/link";
import { Lock, DoorOpen, KeyRound, Shield, ChevronRight, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Serrurerie | Ouverture de Porte, Remplacement & Blindage | S'Connect",
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
    title: "Serrurerie 24h/24 | Ouverture & Blindage | S'Connect",
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
      {/* Hero */}
      <section className="bg-gradient-to-br from-dark-900 via-dark-950 to-green-950 py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-green-500/25">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-4">
              Serrurerie
            </h1>
            <p className="text-xl text-dark-300 leading-relaxed">
              Ouverture de porte, remplacement de serrure, blindage et sécurisation de vos accès en Île-de-France.
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
                href={`/services/serrurerie/${service.slug}`}
                className="group block p-8 rounded-2xl border-2 border-green-100 hover:border-green-400 bg-gradient-to-br from-green-50 to-white transition-all hover:shadow-xl"
              >
                <div className="w-14 h-14 bg-green-500 rounded-xl flex items-center justify-center mb-6">
                  <service.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-display font-bold text-xl text-dark-900 mb-3">
                  {service.name}
                </h3>
                <p className="text-dark-600 mb-4">{service.description}</p>
                <span className="inline-flex items-center gap-2 text-green-600 font-semibold group-hover:gap-3 transition-all">
                  Découvrir
                  <ChevronRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency CTA */}
      <section className="py-16 bg-green-500">
        <div className="container-custom flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-white">
            <h2 className="font-display font-bold text-2xl mb-2">Porte claquée ? Urgence serrurerie ?</h2>
            <p className="text-green-100">Intervention rapide 24h/24, 7j/7.</p>
          </div>
          <div className="flex gap-4">
            <Link href="/demande-intervention" className="btn bg-white text-green-600 hover:bg-green-50">
              Intervention urgente
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




