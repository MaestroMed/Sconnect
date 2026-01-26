import { Metadata } from "next";
import Link from "next/link";
import { Shield, ChevronRight, Phone, Check, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Structures Métalliques | Garde-corps, Escaliers, Verrières | S'Connect",
  description: "Conception et réalisation de structures métalliques en Île-de-France : garde-corps, escaliers métalliques, verrières, pergolas, charpentes. Fabrication sur mesure. Devis gratuit.",
  keywords: ["structure métallique", "garde-corps", "escalier métallique", "verrière", "pergola", "charpente métallique", "ferronnerie art"],
  openGraph: {
    title: "Structures Métalliques Sur Mesure | S'Connect",
    description: "Garde-corps, escaliers, verrières et structures métalliques personnalisées en Île-de-France.",
    images: ["/og-image.jpg"],
  },
};

const features = [
  "Garde-corps et rampes",
  "Escaliers métalliques",
  "Verrières intérieures",
  "Pergolas et abris",
  "Charpentes métalliques",
  "Mezzanines",
];

const types = [
  {
    name: "Garde-corps",
    description: "En acier, inox ou aluminium. Design moderne ou classique, conformes aux normes.",
  },
  {
    name: "Escaliers",
    description: "Droits, hélicoïdaux ou à limon central. Structure apparente ou habillée.",
  },
  {
    name: "Verrières",
    description: "Style atelier pour séparer vos espaces tout en laissant passer la lumière.",
  },
  {
    name: "Pergolas",
    description: "Structures extérieures pour terrasses et jardins. Fixes ou bioclimatiques.",
  },
];

export default function StructureMetalliquePage() {
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
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-4">
              Structures Métalliques
            </h1>
            <p className="text-xl text-dark-300 leading-relaxed">
              Conception et réalisation de structures métalliques sur mesure : garde-corps, escaliers, 
              verrières et bien plus. Un savoir-faire artisanal au service de vos projets.
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
                Nos réalisations structurelles
              </h2>
              <p className="text-dark-600 mb-8 leading-relaxed">
                De la conception à la pose, nous réalisons tous types de structures métalliques. 
                Chaque projet est unique et fabriqué sur mesure dans notre atelier.
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
              <h3 className="font-semibold text-dark-900 mb-4">Types de structures</h3>
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
            Un projet de structure métallique ?
          </h2>
          <p className="text-orange-100 mb-8 max-w-2xl mx-auto">
            Contactez-nous pour discuter de votre projet et obtenir un devis personnalisé.
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





