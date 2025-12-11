import { Metadata } from "next";
import Link from "next/link";
import { KeyRound, Video, CreditCard, Camera, ChevronRight, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Contrôle d'accès | Interphonie, Badges & Vidéosurveillance",
  description: "Installation de systèmes de contrôle d'accès à Clichy et Île-de-France : interphonie, vidéophonie, badges, digicodes et vidéosurveillance. Devis gratuit.",
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
  {
    name: "Vidéosurveillance",
    slug: "videosurveillance",
    icon: Camera,
    description: "Installation de caméras de surveillance IP, enregistreurs et systèmes de vidéoprotection.",
  },
];

export default function ControleAccesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-dark-900 via-dark-950 to-accent-950 py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <div className="w-16 h-16 bg-gradient-to-br from-accent-500 to-accent-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-accent-500/25">
              <KeyRound className="w-8 h-8 text-white" />
            </div>
            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-4">
              Contrôle d&apos;accès
            </h1>
            <p className="text-xl text-dark-300 leading-relaxed">
              Interphonie, vidéophonie, badges, digicodes et vidéosurveillance pour sécuriser vos locaux en Île-de-France.
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
                href={`/services/controle-acces/${service.slug}`}
                className="group block p-8 rounded-2xl border-2 border-accent-100 hover:border-accent-400 bg-gradient-to-br from-accent-50 to-white transition-all hover:shadow-xl"
              >
                <div className="w-14 h-14 bg-accent-500 rounded-xl flex items-center justify-center mb-6">
                  <service.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-display font-bold text-xl text-dark-900 mb-3">
                  {service.name}
                </h3>
                <p className="text-dark-600 mb-4">{service.description}</p>
                <span className="inline-flex items-center gap-2 text-accent-600 font-semibold group-hover:gap-3 transition-all">
                  Découvrir
                  <ChevronRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-accent-500">
        <div className="container-custom flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-white">
            <h2 className="font-display font-bold text-2xl mb-2">Sécurisez vos accès</h2>
            <p className="text-accent-100">Installation sur mesure et devis gratuit.</p>
          </div>
          <div className="flex gap-4">
            <Link href="/demande-devis" className="btn bg-white text-accent-600 hover:bg-accent-50">
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




