import { Metadata } from "next";
import Link from "next/link";
import { Wrench, ChevronRight, Phone, DoorOpen, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Métallerie | Fabrication Portails, Portes & Structures",
  description: "Services de métallerie en Île-de-France : fabrication de portails sur mesure, portes métalliques et structures en acier. Devis gratuit.",
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
      {/* Hero */}
      <section className="bg-gradient-to-br from-dark-900 via-dark-950 to-orange-950 py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-orange-500/25">
              <Wrench className="w-8 h-8 text-white" />
            </div>
            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-4">
              Métallerie
            </h1>
            <p className="text-xl text-dark-300 leading-relaxed">
              Fabrication sur mesure de portails, portes et structures métalliques. 
              Un savoir-faire artisanal au service de vos projets en Île-de-France.
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
                href={`/services/metallerie/${service.slug}`}
                className="group block p-8 rounded-2xl border-2 border-orange-100 hover:border-orange-400 bg-gradient-to-br from-orange-50 to-white transition-all hover:shadow-xl"
              >
                <div className="w-14 h-14 bg-orange-500 rounded-xl flex items-center justify-center mb-6">
                  <service.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-display font-bold text-xl text-dark-900 mb-3">
                  {service.name}
                </h3>
                <p className="text-dark-600 mb-4">{service.description}</p>
                <span className="inline-flex items-center gap-2 text-orange-600 font-semibold group-hover:gap-3 transition-all">
                  Découvrir
                  <ChevronRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Avantages */}
      <section className="section-padding bg-dark-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-3xl md:text-4xl text-dark-900 mb-4">
              Pourquoi choisir notre métallerie ?
            </h2>
            <p className="text-dark-600 max-w-2xl mx-auto">
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
              <div key={item.title} className="text-center p-6 bg-white rounded-xl shadow-sm">
                <h3 className="font-semibold text-dark-900 mb-2">{item.title}</h3>
                <p className="text-dark-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-orange-600">
        <div className="container-custom flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-white">
            <h2 className="font-display font-bold text-2xl mb-2">Un projet de métallerie ?</h2>
            <p className="text-orange-100">Devis gratuit et personnalisé sous 48h.</p>
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

