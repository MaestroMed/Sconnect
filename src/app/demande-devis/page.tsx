import { Metadata } from "next";
import { FileText, Phone, Clock, Shield } from "lucide-react";
import DemandeForm from "@/components/forms/DemandeForm";
import { AuroraBackdrop, NoiseOverlay } from "@/components/ui/ambient";

export const metadata: Metadata = {
  title: "Demande de Devis Gratuit",
  description:
    "Demandez un devis gratuit et sans engagement pour vos travaux électriques à Clichy et Île-de-France. Réponse sous 24h.",
};

const avantages = [
  {
    icon: Clock,
    title: "Réponse sous 24h",
    description: "Nous vous recontactons rapidement",
  },
  {
    icon: FileText,
    title: "Devis détaillé",
    description: "Prix transparents, sans surprise",
  },
  {
    icon: Shield,
    title: "Sans engagement",
    description: "Vous êtes libre de décider",
  },
];

export default function DemandeDevisPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-dark-950 py-16 md:py-20 overflow-hidden">
        <AuroraBackdrop intensity="soft" />
        <div className="absolute inset-0 bg-grid opacity-[0.12]" />
        <NoiseOverlay opacity={0.05} />

        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-300 text-sm font-semibold mb-6 backdrop-blur-sm">
              <FileText className="w-4 h-4" />
              Devis Gratuit
            </span>
            <h1 className="font-display font-bold text-4xl md:text-5xl text-white mb-6 leading-tight">
              Demandez votre{" "}
              <span className="gradient-text-living">devis gratuit</span>
            </h1>
            <p className="text-xl text-dark-300 leading-relaxed mb-8">
              Remplissez le formulaire ci-dessous et recevez un devis détaillé
              sous 24h. C&apos;est gratuit et sans engagement.
            </p>
            <div className="flex flex-wrap gap-6">
              {avantages.map((item) => (
                <div key={item.title} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary-500/20 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-primary-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">{item.title}</p>
                    <p className="text-white/60 text-sm">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 bg-surface-muted">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <DemandeForm type="devis" />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Card */}
              <div className="card p-6">
                <h3 className="font-display font-bold text-lg text-foreground mb-4">
                  Besoin d&apos;aide ?
                </h3>
                <p className="text-foreground-muted mb-4">
                  Notre équipe est disponible pour répondre à vos questions.
                </p>
                <a
                  href="tel:+33100000000"
                  className="flex items-center gap-3 p-4 bg-primary-50 rounded-xl hover:bg-primary-100 transition-colors"
                >
                  <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground">01 XX XX XX XX</p>
                    <p className="text-sm text-foreground-muted">Lun-Ven 8h-19h</p>
                  </div>
                </a>
              </div>

              {/* Info Card */}
              <div className="card p-6 bg-gradient-to-br from-primary-50 to-electric-50 border-primary-100">
                <h3 className="font-display font-bold text-lg text-foreground mb-4">
                  Comment ça marche ?
                </h3>
                <ol className="space-y-4">
                  {[
                    "Remplissez le formulaire avec vos informations",
                    "Décrivez votre projet et vos besoins",
                    "Nous étudions votre demande sous 24h",
                    "Vous recevez un devis détaillé par email",
                  ].map((step, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-primary-600 text-white text-sm font-bold flex items-center justify-center shrink-0">
                        {index + 1}
                      </span>
                      <span className="text-foreground">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Garantie */}
              <div className="card p-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center">
                    <Shield className="w-7 h-7 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">Garantie décennale</h4>
                    <p className="text-sm text-foreground-muted">
                      Tous nos travaux sont garantis 10 ans
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

