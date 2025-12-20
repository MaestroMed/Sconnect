import { Metadata } from "next";
import Link from "next/link";
import { DoorOpen, ChevronRight, Phone, Check, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Fabrication de Portes Métalliques | Portes Sur Mesure",
  description: "Fabrication de portes métalliques sur mesure en Île-de-France : portes d'entrée, de garage, techniques et coupe-feu. Devis gratuit.",
};

const features = [
  "Portes d'entrée blindées",
  "Portes de garage sectionnelles",
  "Portes techniques et de service",
  "Portes coupe-feu certifiées",
  "Sur mesure et standard",
  "Pose professionnelle incluse",
];

const types = [
  {
    name: "Porte d'entrée",
    description: "Portes blindées haute sécurité avec finitions personnalisables.",
  },
  {
    name: "Porte de garage",
    description: "Sectionnelles, basculantes ou enroulables, motorisées ou manuelles.",
  },
  {
    name: "Porte technique",
    description: "Portes de cave, de local technique, de chaufferie.",
  },
  {
    name: "Porte coupe-feu",
    description: "Portes certifiées EI30, EI60, EI120 pour la sécurité incendie.",
  },
];

export default function FabricationPortePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-dark-900 via-dark-950 to-orange-950 py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="container-custom relative z-10">
          <Link 
            href="/services/metallerie" 
            className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour à Métallerie
          </Link>
          <div className="max-w-3xl">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-orange-500/25">
              <DoorOpen className="w-8 h-8 text-white" />
            </div>
            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-4">
              Fabrication de Portes
            </h1>
            <p className="text-xl text-dark-300 leading-relaxed">
              Portes métalliques sur mesure pour tous vos besoins : entrée, garage, technique, coupe-feu. 
              Sécurité et qualité garanties.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-dark-900 mb-6">
                Nos prestations portes
              </h2>
              <p className="text-dark-600 mb-8 leading-relaxed">
                Nous fabriquons tous types de portes métalliques sur mesure. 
                De la porte d&apos;entrée blindée à la porte coupe-feu certifiée, 
                nous répondons à tous vos besoins de sécurité.
              </p>
              <ul className="grid grid-cols-2 gap-4">
                {features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-orange-600" />
                    </div>
                    <span className="text-dark-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-8">
              <h3 className="font-semibold text-dark-900 mb-4">Types de portes</h3>
              <div className="space-y-4">
                {types.map((type) => (
                  <div key={type.name} className="bg-white rounded-xl p-4 shadow-sm">
                    <h4 className="font-semibold text-dark-900">{type.name}</h4>
                    <p className="text-dark-600 text-sm mt-1">{type.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-orange-600">
        <div className="container-custom text-center">
          <h2 className="font-display font-bold text-2xl md:text-3xl text-white mb-4">
            Besoin d&apos;une porte sur mesure ?
          </h2>
          <p className="text-orange-100 mb-8 max-w-2xl mx-auto">
            Contactez-nous pour un devis gratuit et personnalisé selon vos besoins.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/demande-devis" className="btn-white">
              Demander un devis gratuit
              <ChevronRight className="w-5 h-5" />
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

