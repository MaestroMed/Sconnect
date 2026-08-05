import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Wrench, ChevronRight, Phone, Check, ArrowLeft, Sparkles } from "lucide-react";
import { AuroraBackdrop, NoiseOverlay } from "@/components/ui/ambient";
import { image } from "@/lib/image-manifest";
import BulbText from "@/components/ui/BulbText";

export const metadata: Metadata = {
  alternates: { canonical: "/services/metallerie/fabrication-portail" },
  title: "Fabrication de Portails Sur Mesure | Portails Coulissants & Battants | S Connect France",
  description: "Fabrication et installation de portails sur mesure en Île-de-France : portails coulissants, battants, motorisés en acier, aluminium ou fer forgé. Conception, fabrication, pose. Devis gratuit.",
  keywords: ["fabrication portail", "portail sur mesure", "portail coulissant", "portail battant", "portail motorisé", "portail acier", "portail fer forgé"],
  openGraph: {
    title: "Fabrication de Portails Sur Mesure | S Connect France",
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
  const hero = image("metallerie-portail");
  return (
    <>
      {/* Hero */}
      <section className="relative bg-dark-950 py-16 md:py-24 overflow-hidden">
        <AuroraBackdrop intensity="soft" />
        <div className="absolute inset-0 bg-grid opacity-[0.12]" />
        <div className="absolute top-1/4 -left-32 w-[30rem] h-[30rem] rounded-full blur-3xl animate-drift bg-orange-500/30" />
        <div className="absolute bottom-0 -right-32 w-[30rem] h-[30rem] rounded-full blur-3xl animate-drift-reverse bg-rose-500/25" />
        <NoiseOverlay opacity={0.05} />

        <div className="container-custom relative z-10">
          <Link
            href="/services/metallerie"
            className="inline-flex items-center gap-2 text-orange-300 hover:text-orange-200 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour à Métallerie
          </Link>
          <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] items-center">
            <div className="max-w-2xl">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-rose-500 rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-orange-500/30">
                <Wrench className="w-8 h-8 text-white" />
              </div>
              <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-4 leading-tight">
                Fabrication de Portails
              </h1>
              <p className="text-xl md:text-2xl font-medium mb-6">
              <BulbText>Sur mesure, Île-de-France</BulbText>
            </p>
              <p className="text-lg text-dark-300 leading-relaxed">
                Des portails sur mesure conçus et fabriqués selon vos envies.
                Qualité artisanale et installation professionnelle.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/demande-devis" className="btn-primary">
                  Devis gratuit
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                <Image
                  src={hero.webp}
                  alt={hero.alt}
                  fill
                  sizes="(max-width: 1024px) 0px, 42vw"
                  className="object-cover"
                  placeholder="blur"
                  blurDataURL={hero.blurDataURL}
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-dark-950/80 via-transparent to-transparent" />
                <div className="absolute inset-0 gradient-veil-warm opacity-30 mix-blend-overlay" />
                <div className="absolute top-4 right-4 glass-panel rounded-xl px-4 py-2.5 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-white" />
                  <span className="text-sm font-semibold text-white">Garantie 10 ans</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding bg-surface">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-6">
                Nos prestations portails
              </h2>
              <p className="text-foreground-muted mb-8 leading-relaxed">
                Nous concevons et fabriquons des portails sur mesure adaptés à votre habitat et à votre style. 
                Du design à l&apos;installation, nous vous accompagnons à chaque étape.
              </p>
              <ul className="grid grid-cols-2 gap-4">
                {features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-orange-600" />
                    </div>
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-8">
              <h3 className="font-semibold text-foreground mb-4">Types de portails</h3>
              <div className="space-y-4">
                {types.map((type) => (
                  <div key={type.name} className="bg-surface rounded-xl p-4 shadow-sm">
                    <h4 className="font-semibold text-foreground">{type.name}</h4>
                    <p className="text-foreground-muted text-sm mt-1">{type.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section-padding bg-surface-muted">
        <div className="container-custom">
          <h2 className="font-display font-bold text-3xl text-foreground mb-12 text-center">
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
                <div className="bg-surface rounded-xl p-6 shadow-sm h-full">
                  <div className="w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-foreground-muted text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 bg-gradient-to-r from-orange-700 via-orange-600 to-rose-600 overflow-hidden">
        <NoiseOverlay opacity={0.05} />
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse-soft" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: "2s" }} />
        <div className="container-custom relative z-10 text-center">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-4">
            Votre projet de portail sur mesure
          </h2>
          <p className="text-orange-50 mb-8 max-w-2xl mx-auto text-lg">
            Contactez-nous pour un devis gratuit. Nous nous déplaçons pour prendre les mesures et vous conseiller.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/demande-devis" className="btn-white btn-lg">
              Demander un devis gratuit
              <ChevronRight className="w-5 h-5" />
            </Link>
            <a href="tel:+33652820685" className="btn glass-panel text-white hover:bg-white/15 btn-lg">
              <Phone className="w-5 h-5" />
              06 52 82 06 85
            </a>
          </div>
        </div>
      </section>
    </>
  );
}





