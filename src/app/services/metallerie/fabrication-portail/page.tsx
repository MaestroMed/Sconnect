import { Metadata } from "next";
import Link from "next/link";
import { Wrench, ChevronRight, Phone, Check, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Fabrication de Portails Sur Mesure | Portails Coulissants & Battants | S'Connect",
  description: "Fabrication et installation de portails sur mesure en Île-de-France : portails coulissants, battants, motorisés en acier, aluminium ou fer forgé. Conception, fabrication, pose. Devis gratuit.",
  keywords: ["fabrication portail", "portail sur mesure", "portail coulissant", "portail battant", "portail motorisé", "portail acier", "portail fer forgé"],
  openGraph: {
    title: "Fabrication de Portails Sur Mesure | S'Connect",
    description: "Conception et fabrication de portails personnalisés. Métallerie en Île-de-France.",
    images: ["/og-image.jpg"],
  },
};

const features = [
  "Portails coulissants et battants",
  "Motorisation intégrée",
  "Acier, aluminium, fer forgé",
  "Design personnalisé",
  "Finition thermolaquée",
  "Garantie 10 ans",
];

const types = [
  {
    name: "Portail coulissant",
    description: "Idéal pour les entrées avec peu d'espace. Motorisation fluide et silencieuse.",
  },
  {
    name: "Portail battant",
    description: "Le classique revisité. Ouverture manuelle ou motorisée vers l'intérieur ou l'extérieur.",
  },
  {
    name: "Portail ajouré",
    description: "Design moderne avec barreaux ou motifs décoratifs. Élégance et visibilité.",
  },
  {
    name: "Portail plein",
    description: "Intimité totale. Idéal pour se protéger des regards et du vent.",
  },
];

export default function FabricationPortailPage() {
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
              <Wrench className="w-8 h-8 text-white" />
            </div>
            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-4">
              Fabrication de Portails
            </h1>
            <p className="text-xl text-dark-300 leading-relaxed">
              Des portails sur mesure conçus et fabriqués selon vos envies. 
              Qualité artisanale et installation professionnelle en Île-de-France.
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
                Nos prestations portails
              </h2>
              <p className="text-dark-600 mb-8 leading-relaxed">
                Nous concevons et fabriquons des portails sur mesure adaptés à votre habitat et à votre style. 
                Du design à l&apos;installation, nous vous accompagnons à chaque étape.
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
              <h3 className="font-semibold text-dark-900 mb-4">Types de portails</h3>
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

      {/* Process */}
      <section className="section-padding bg-dark-50">
        <div className="container-custom">
          <h2 className="font-display font-bold text-3xl text-dark-900 mb-12 text-center">
            Notre processus
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: "1", title: "Consultation", description: "Visite sur site et prise de mesures" },
              { step: "2", title: "Conception", description: "Design personnalisé selon vos goûts" },
              { step: "3", title: "Fabrication", description: "Réalisation dans notre atelier" },
              { step: "4", title: "Installation", description: "Pose par nos équipes qualifiées" },
            ].map((item) => (
              <div key={item.step} className="relative">
                <div className="bg-white rounded-xl p-6 shadow-sm h-full">
                  <div className="w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-dark-900 mb-2">{item.title}</h3>
                  <p className="text-dark-600 text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-orange-600">
        <div className="container-custom text-center">
          <h2 className="font-display font-bold text-2xl md:text-3xl text-white mb-4">
            Votre projet de portail sur mesure
          </h2>
          <p className="text-orange-100 mb-8 max-w-2xl mx-auto">
            Contactez-nous pour un devis gratuit. Nous nous déplaçons pour prendre les mesures et vous conseiller.
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





