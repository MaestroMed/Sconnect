"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Zap,
  KeyRound,
  Lock,
  ArrowRight,
  ChevronRight,
  Phone,
  Video,
  Camera,
  CreditCard,
  DoorOpen,
  Shield,
  FileCheck,
  AlertTriangle,
} from "lucide-react";

const categories = [
  {
    id: "electricite",
    name: "Électricité",
    slug: "electricite",
    icon: Zap,
    color: "primary",
    description: "Installation, rénovation, mise aux normes et dépannage électrique pour particuliers et professionnels.",
    services: [
      { name: "Installation & Rénovation", slug: "installation-renovation", icon: Zap },
      { name: "Mise aux Normes", slug: "mise-aux-normes", icon: FileCheck },
      { name: "Dépannage Électrique", slug: "depannage-electrique", icon: AlertTriangle },
    ],
  },
  {
    id: "controle-acces",
    name: "Contrôle d'accès",
    slug: "controle-acces",
    icon: KeyRound,
    color: "accent",
    description: "Interphonie, vidéophonie, badges, digicodes et vidéosurveillance pour sécuriser vos locaux.",
    services: [
      { name: "Interphonie & Vidéophonie", slug: "interphonie-videophonie", icon: Video },
      { name: "Badges & Digicodes", slug: "badges-digicodes", icon: CreditCard },
      { name: "Vidéosurveillance", slug: "videosurveillance", icon: Camera },
    ],
  },
  {
    id: "serrurerie",
    name: "Serrurerie",
    slug: "serrurerie",
    icon: Lock,
    color: "green",
    description: "Ouverture de porte, remplacement de serrure, blindage et sécurisation de vos accès.",
    services: [
      { name: "Ouverture de Porte", slug: "ouverture-porte", icon: DoorOpen },
      { name: "Remplacement de Serrure", slug: "remplacement-serrure", icon: KeyRound },
      { name: "Blindage de Porte", slug: "blindage-porte", icon: Shield },
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-dark-900 via-dark-950 to-primary-950 py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-electric-500/20 rounded-full blur-3xl" />

        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4 bg-primary-500/10 text-primary-400 border border-primary-500/20">
              Nos Services
            </span>
            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-6">
              3 expertises pour{" "}
              <span className="gradient-text">votre sécurité</span>
            </h1>
            <p className="text-xl text-dark-300 max-w-3xl mx-auto">
              Électricité, contrôle d&apos;accès et serrurerie : une offre complète pour
              sécuriser, équiper et dépanner vos locaux en Île-de-France.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="space-y-16">
            {categories.map((category, categoryIndex) => {
              const colorMap = {
                primary: {
                  bg: "bg-primary-500",
                  light: "bg-primary-50",
                  border: "border-primary-200",
                  text: "text-primary-600",
                  hover: "hover:border-primary-400",
                },
                accent: {
                  bg: "bg-accent-500",
                  light: "bg-accent-50",
                  border: "border-accent-200",
                  text: "text-accent-600",
                  hover: "hover:border-accent-400",
                },
                green: {
                  bg: "bg-green-500",
                  light: "bg-green-50",
                  border: "border-green-200",
                  text: "text-green-600",
                  hover: "hover:border-green-400",
                },
              };
              const colorClasses = colorMap[category.color as keyof typeof colorMap] || colorMap.primary;

              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center gap-8 mb-8">
                    <div className={`w-20 h-20 ${colorClasses.bg} rounded-2xl flex items-center justify-center`}>
                      <category.icon className="w-10 h-10 text-white" />
                    </div>
                    <div className="flex-1">
                      <h2 className="font-display font-bold text-3xl text-dark-900 mb-2">
                        {category.name}
                      </h2>
                      <p className="text-lg text-dark-600">{category.description}</p>
                    </div>
                    <Link
                      href={`/services/${category.slug}`}
                      className={`btn ${colorClasses.bg} text-white hover:opacity-90`}
                    >
                      Tous les services
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    {category.services.map((service, serviceIndex) => (
                      <motion.div
                        key={service.slug}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: serviceIndex * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <Link
                          href={`/services/${category.slug}/${service.slug}`}
                          className={`block p-6 rounded-xl border-2 ${colorClasses.border} ${colorClasses.hover} ${colorClasses.light} transition-all hover:shadow-lg group`}
                        >
                          <div className={`w-12 h-12 rounded-xl ${colorClasses.bg} text-white flex items-center justify-center mb-4`}>
                            <service.icon className="w-6 h-6" />
                          </div>
                          <h3 className="font-semibold text-lg text-dark-900 mb-2">
                            {service.name}
                          </h3>
                          <span className={`inline-flex items-center gap-1 text-sm font-medium ${colorClasses.text}`}>
                            En savoir plus
                            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </span>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-primary-700 via-primary-600 to-electric-600">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-6">
              Besoin d&apos;un devis ou d&apos;une intervention ?
            </h2>
            <p className="text-xl text-primary-100 mb-10 max-w-2xl mx-auto">
              Contactez-nous pour un devis gratuit ou une intervention rapide.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/demande-devis" className="btn-white btn-lg">
                Demander un devis
                <ChevronRight className="w-5 h-5" />
              </Link>
              <a href="tel:+33100000000" className="btn bg-white/10 text-white hover:bg-white/20 btn-lg border border-white/20">
                <Phone className="w-5 h-5" />
                01 XX XX XX XX
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
