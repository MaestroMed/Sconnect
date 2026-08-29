"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, Phone, Award, Shield, Zap, CheckCircle2 } from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";
import { AuroraBackdrop, GradientVeil, NoiseOverlay, ParticlesLite } from "@/components/ui/ambient";
import BulbText from "@/components/ui/BulbText";

const brands = [
  {
    name: "Schneider Electric",
    category: "Tableaux & Appareillage",
    description:
      "Leader mondial de la gestion de l'énergie. Nous utilisons leurs tableaux électriques, disjoncteurs et solutions de distribution pour des installations fiables et performantes.",
    features: ["Tableaux Rési9", "Disjoncteurs iC60", "Prises Odace"],
  },
  {
    name: "Legrand",
    category: "Appareillage & Domotique",
    description:
      "Spécialiste français de l'appareillage électrique. Leurs gammes d'interrupteurs, prises et solutions connectées équipent la majorité de nos chantiers.",
    features: ["Gamme Céliane", "Prises Mosaic", "Domotique Netatmo"],
  },
  {
    name: "Hager",
    category: "Protection & Distribution",
    description:
      "Expert en solutions de distribution électrique. Nous apprécions la qualité de leurs coffrets et systèmes de protection pour les installations résidentielles et tertiaires.",
    features: ["Coffrets Gamma", "Interrupteurs différentiels", "GTL"],
  },
  {
    name: "ABB",
    category: "Automatisation & Protection",
    description:
      "Groupe suisse-suédois spécialisé dans les technologies d'électrification. Leurs contacteurs et protections sont reconnus pour leur fiabilité industrielle.",
    features: ["Contacteurs", "Variateurs", "Disjoncteurs moteur"],
  },
  {
    name: "Siemens",
    category: "Solutions Industrielles",
    description:
      "Géant allemand de l'électrotechnique. Nous utilisons leurs solutions pour les projets tertiaires et industriels nécessitant une robustesse maximale.",
    features: ["Automates", "Variateurs Sinamics", "Systèmes KNX"],
  },
  {
    name: "Philips",
    category: "Éclairage",
    description:
      "Pionnier de l'éclairage LED. Nous recommandons leurs solutions pour leur efficacité énergétique et la qualité de leur lumière.",
    features: ["LED professionnelles", "Hue (domotique)", "Éclairage public"],
  },
  {
    name: "Delta Dore",
    category: "Domotique",
    description:
      "Entreprise française spécialisée dans la domotique et la gestion de l'énergie. Solutions intuitives et made in France.",
    features: ["Tydom", "Thermostats connectés", "Alarmes"],
  },
  {
    name: "Somfy",
    category: "Automatismes",
    description:
      "Leader mondial de l'automatisation des ouvertures. Leurs moteurs pour volets et stores sont une référence de qualité.",
    features: ["Moteurs volets", "Tahoma", "Protections solaires"],
  },
];

// « Qualifelec » et « RGE » retirés le 24/08/2026 — absents des annuaires
// officiels pour le SIRET 899 667 596 00014. Détail en commentaire dans
// src/components/marketing/CertificationsBand.tsx.
const certifications = [
  {
    name: "IRVE",
    description: "Qualification pour l'installation de bornes de recharge",
    icon: Zap,
  },
];

export default function MarquesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-dark-950 py-20 md:py-28 overflow-hidden">
        <AuroraBackdrop intensity="soft" />
        <div className="absolute inset-0 bg-grid opacity-[0.12]" />
        <NoiseOverlay opacity={0.05} />

        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-300 text-sm font-semibold mb-6 backdrop-blur-sm">
                <Award className="w-4 h-4" />
                Nos Partenaires
              </span>
              <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight">
                Des marques de{" "}
                <BulbText>référence</BulbText>
              </h1>
              <p className="text-xl text-dark-300 leading-relaxed">
                Nous travaillons exclusivement avec les plus grandes marques
                du secteur électrique pour vous garantir qualité, fiabilité
                et durabilité.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Brands Grid */}
      <section className="section-padding bg-surface">
        <div className="container-custom">
          <SectionTitle
            badge="Nos Marques"
            title="Des partenaires de confiance"
            subtitle="Chaque marque est sélectionnée pour son expertise et la qualité de ses produits."
          />

          <div className="grid md:grid-cols-2 gap-8">
            {brands.map((brand, index) => (
              <motion.div
                key={brand.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card p-8 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-display font-bold text-2xl text-foreground">
                      {brand.name}
                    </h3>
                    <span className="text-sm text-primary-600 font-medium">
                      {brand.category}
                    </span>
                  </div>
                  <div className="w-16 h-16 bg-surface-muted rounded-xl flex items-center justify-center">
                    <span className="text-xl font-bold text-foreground-muted">
                      {brand.name.charAt(0)}
                    </span>
                  </div>
                </div>
                <p className="text-foreground-muted mb-6 leading-relaxed">
                  {brand.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {brand.features.map((feature) => (
                    <span
                      key={feature}
                      className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm font-medium"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pourquoi ces marques */}
      <section className="section-padding bg-surface-muted">
        <div className="container-custom">
          <SectionTitle
            badge="Notre Engagement"
            title="Pourquoi nous choisissons ces marques"
            subtitle="La qualité du matériel est essentielle pour des installations durables et sûres."
          />

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Qualité garantie",
                description:
                  "Tous les produits que nous installons bénéficient des certifications européennes et d'une garantie fabricant.",
                icon: Shield,
              },
              {
                title: "Disponibilité des pièces",
                description:
                  "En cas de besoin, les pièces de rechange sont disponibles rapidement grâce au réseau de distribution de ces marques.",
                icon: CheckCircle2,
              },
              {
                title: "Innovation continue",
                description:
                  "Ces fabricants investissent dans la R&D pour proposer des produits toujours plus performants et économes en énergie.",
                icon: Zap,
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card p-8 text-center"
              >
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary-500 to-electric-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-primary-500/25">
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-display font-bold text-xl text-foreground mb-3">
                  {item.title}
                </h3>
                <p className="text-foreground-muted">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="section-padding bg-surface">
        <div className="container-custom">
          <SectionTitle
            badge="Certifications"
            title="Des qualifications reconnues"
            subtitle="Au-delà des marques, nos certifications attestent de notre expertise."
          />

          <div className="grid md:grid-cols-3 gap-8">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card p-8 text-center border-2 border-primary-100 hover:border-primary-300 transition-colors"
              >
                <div className="w-20 h-20 mx-auto bg-primary-100 rounded-full flex items-center justify-center mb-6">
                  <cert.icon className="w-10 h-10 text-primary-600" />
                </div>
                <h3 className="font-display font-bold text-xl text-foreground mb-2">
                  {cert.name}
                </h3>
                <p className="text-foreground-muted">{cert.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 bg-dark-950 overflow-hidden">
        <div className="absolute inset-0 animate-aurora bg-[length:200%_200%] bg-gradient-to-r from-primary-700 via-electric-500 to-primary-700" />
        <GradientVeil variant="brand" className="opacity-60" />
        <ParticlesLite variant="white" />
        <div className="absolute inset-0 bg-grid opacity-10" />
        <NoiseOverlay opacity={0.06} />
        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-white mb-6 leading-tight">
              Un projet électrique ?
            </h2>
            <p className="text-xl text-primary-100 mb-10 max-w-2xl mx-auto">
              Bénéficiez de notre expertise et de matériel de qualité pour
              votre installation.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/demande-devis" className="btn-white btn-lg">
                Demander un devis
                <ChevronRight className="w-5 h-5" />
              </Link>
              <a
                href="tel:+33652820685"
                className="btn glass-panel text-white hover:bg-white/15 btn-lg"
              >
                <Phone className="w-5 h-5" />
                06 52 82 06 85
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

