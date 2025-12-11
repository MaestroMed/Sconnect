import { Metadata } from "next";
import { AlertTriangle, Phone, Clock, Zap } from "lucide-react";
import DemandeForm from "@/components/forms/DemandeForm";

export const metadata: Metadata = {
  title: "Demande d'Intervention Urgente",
  description:
    "Demande d'intervention électrique urgente à Clichy et Île-de-France. Électricien disponible 24h/24, 7j/7. Intervention sous 2h.",
};

const urgenceInfo = [
  {
    icon: Clock,
    title: "Intervention sous 2h",
    description: "En zone de couverture",
  },
  {
    icon: Zap,
    title: "24h/24, 7j/7",
    description: "Y compris jours fériés",
  },
  {
    icon: Phone,
    title: "Rappel immédiat",
    description: "Un technicien vous rappelle",
  },
];

export default function DemandeInterventionPage() {
  return (
    <>
      {/* Hero - Plus impactant pour urgence */}
      <section className="bg-gradient-to-br from-accent-600 via-accent-500 to-orange-500 py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-red-500/20 rounded-full blur-3xl" />

        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-semibold mb-6">
              <AlertTriangle className="w-4 h-4" />
              Intervention Urgente
            </span>
            <h1 className="font-display font-bold text-4xl md:text-5xl text-white mb-6">
              Besoin d&apos;un électricien{" "}
              <span className="underline decoration-white/50 decoration-4 underline-offset-4">
                en urgence
              </span> ?
            </h1>
            <p className="text-xl text-white/90 leading-relaxed mb-8">
              Panne, court-circuit, disjoncteur qui saute ? Nos électriciens interviennent
              rapidement 24h/24, 7j/7 pour rétablir votre électricité.
            </p>

            {/* Appel direct */}
            <div className="mb-8 p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
              <p className="text-white/90 mb-3">
                Pour une intervention immédiate, appelez-nous :
              </p>
              <a
                href="tel:+33100000000"
                className="inline-flex items-center gap-3 text-3xl md:text-4xl font-display font-bold text-white hover:text-white/90 transition-colors"
              >
                <Phone className="w-8 h-8" />
                01 XX XX XX XX
              </a>
            </div>

            <div className="flex flex-wrap gap-6">
              {urgenceInfo.map((item) => (
                <div key={item.title} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">{item.title}</p>
                    <p className="text-white/70 text-sm">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 bg-dark-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <div className="mb-6 p-4 bg-accent-50 border border-accent-200 rounded-xl">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-accent-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-accent-800">
                      Demande d&apos;intervention urgente
                    </p>
                    <p className="text-sm text-accent-700">
                      Pour une réponse plus rapide, appelez-nous directement au{" "}
                      <a href="tel:+33100000000" className="font-bold underline">
                        01 XX XX XX XX
                      </a>
                    </p>
                  </div>
                </div>
              </div>
              <DemandeForm type="intervention" />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Urgence Card */}
              <div className="card p-6 bg-gradient-to-br from-accent-500 to-orange-500 text-white">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                    <Phone className="w-7 h-7" />
                  </div>
                  <div>
                    <p className="font-bold text-lg">Ligne urgence</p>
                    <p className="text-white/80">24h/24, 7j/7</p>
                  </div>
                </div>
                <a
                  href="tel:+33100000000"
                  className="block text-center py-4 bg-white text-accent-600 rounded-xl font-bold text-xl hover:bg-white/90 transition-colors"
                >
                  01 XX XX XX XX
                </a>
              </div>

              {/* Types d'urgences */}
              <div className="card p-6">
                <h3 className="font-display font-bold text-lg text-dark-900 mb-4">
                  Nous intervenons pour :
                </h3>
                <ul className="space-y-3">
                  {[
                    "Panne générale de courant",
                    "Disjoncteur qui saute",
                    "Court-circuit",
                    "Odeur de brûlé électrique",
                    "Étincelles aux prises",
                    "Prise ou interrupteur défaillant",
                    "Fils dénudés ou endommagés",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-dark-700">
                      <Zap className="w-4 h-4 text-accent-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tarifs */}
              <div className="card p-6 border-2 border-primary-100">
                <h3 className="font-display font-bold text-lg text-dark-900 mb-4">
                  Tarifs transparents
                </h3>
                <div className="space-y-3 text-sm text-dark-600">
                  <p>
                    <strong className="text-dark-900">Déplacement :</strong> à partir de 80€
                  </p>
                  <p>
                    <strong className="text-dark-900">Nuit & Week-end :</strong> majoration applicable
                  </p>
                  <p>
                    <strong className="text-dark-900">Diagnostic :</strong> inclus dans le déplacement
                  </p>
                  <p className="pt-3 border-t border-dark-100">
                    Le devis de réparation vous est présenté avant toute intervention.
                    Vous êtes libre d&apos;accepter ou non.
                  </p>
                </div>
              </div>

              {/* Paiement */}
              <div className="card p-6 bg-dark-50">
                <h3 className="font-display font-bold text-lg text-dark-900 mb-3">
                  Moyens de paiement
                </h3>
                <p className="text-dark-600 text-sm">
                  Le règlement se fait par chèque ou via un lien de paiement
                  carte bancaire sécurisé envoyé après l&apos;intervention.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

