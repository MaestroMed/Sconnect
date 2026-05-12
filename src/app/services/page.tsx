"use client";

import Image from "next/image";
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
  CreditCard,
  DoorOpen,
  Shield,
  FileCheck,
  AlertTriangle,
  Wrench,
} from "lucide-react";
import { AuroraBackdrop, GradientVeil, NoiseOverlay, ParticlesLite, Spotlight } from "@/components/ui/ambient";
import { image } from "@/lib/image-manifest";

const categories = [
  {
    id: "electricite",
    name: "Électricité",
    slug: "electricite",
    icon: Zap,
    color: "primary",
    imageSlug: "electricite-installation",
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
    imageSlug: "acces-interphone",
    description: "Interphonie, vidéophonie, badges et digicodes pour sécuriser vos locaux.",
    services: [
      { name: "Interphonie & Vidéophonie", slug: "interphonie-videophonie", icon: Video },
      { name: "Badges & Digicodes", slug: "badges-digicodes", icon: CreditCard },
    ],
  },
  {
    id: "serrurerie",
    name: "Serrurerie",
    slug: "serrurerie",
    icon: Lock,
    color: "emerald",
    imageSlug: "serrurerie-ouverture",
    description: "Ouverture de porte, remplacement de serrure, blindage et sécurisation de vos accès.",
    services: [
      { name: "Ouverture de Porte", slug: "ouverture-porte", icon: DoorOpen },
      { name: "Remplacement de Serrure", slug: "remplacement-serrure", icon: KeyRound },
      { name: "Blindage de Porte", slug: "blindage-porte", icon: Shield },
    ],
  },
  {
    id: "metallerie",
    name: "Métallerie",
    slug: "metallerie",
    icon: Wrench,
    color: "orange",
    imageSlug: "metallerie-portail",
    description: "Fabrication sur mesure de portails, portes et structures métalliques.",
    services: [
      { name: "Fabrication de Portails", slug: "fabrication-portail", icon: Wrench },
      { name: "Fabrication de Portes", slug: "fabrication-porte", icon: DoorOpen },
      { name: "Structures Métalliques", slug: "structure-metallique", icon: Shield },
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-dark-950 py-20 md:py-28 overflow-hidden">
        <AuroraBackdrop intensity="strong" />
        <div className="absolute inset-0 bg-grid opacity-[0.12]" />
        <NoiseOverlay opacity={0.05} />

        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4 bg-primary-500/10 text-primary-300 border border-primary-500/20 backdrop-blur-sm">
              Nos Services
            </span>
            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight">
              4 expertises pour{" "}
              <span className="gradient-text-living">votre habitat</span>
            </h1>
            <p className="text-xl text-dark-300 max-w-3xl mx-auto">
              Électricité, contrôle d&apos;accès, serrurerie et métallerie : une offre complète pour
              sécuriser, équiper et embellir vos locaux en Île-de-France.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="section-padding bg-surface">
        <div className="container-custom">
          <div className="space-y-24">
            {categories.map((category, categoryIndex) => {
              const colorMap = {
                primary: {
                  iconGrad: "from-primary-500 to-electric-500",
                  iconShadow: "shadow-primary-500/30",
                  border: "border-primary-100 dark:border-primary-500/25",
                  hoverBorder: "hover:border-primary-400",
                  light: "bg-gradient-to-br from-primary-50 to-white dark:from-primary-500/10 dark:to-surface-muted",
                  text: "text-primary-600 dark:text-primary-300",
                  btnGrad: "from-primary-600 to-electric-600",
                  veil: "cool" as const,
                },
                accent: {
                  iconGrad: "from-accent-500 to-amber-400",
                  iconShadow: "shadow-accent-500/30",
                  border: "border-accent-100 dark:border-accent-500/25",
                  hoverBorder: "hover:border-accent-400",
                  light: "bg-gradient-to-br from-accent-50 to-white dark:from-accent-500/10 dark:to-surface-muted",
                  text: "text-accent-600 dark:text-accent-300",
                  btnGrad: "from-accent-600 to-amber-500",
                  veil: "warm" as const,
                },
                emerald: {
                  iconGrad: "from-emerald-500 to-teal-400",
                  iconShadow: "shadow-emerald-500/30",
                  border: "border-emerald-100 dark:border-emerald-500/25",
                  hoverBorder: "hover:border-emerald-400",
                  light: "bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-500/10 dark:to-surface-muted",
                  text: "text-emerald-600 dark:text-emerald-300",
                  btnGrad: "from-emerald-600 to-teal-500",
                  veil: "cool" as const,
                },
                orange: {
                  iconGrad: "from-orange-500 to-rose-500",
                  iconShadow: "shadow-orange-500/30",
                  border: "border-orange-100 dark:border-orange-500/25",
                  hoverBorder: "hover:border-orange-400",
                  light: "bg-gradient-to-br from-orange-50 to-white dark:from-orange-500/10 dark:to-surface-muted",
                  text: "text-orange-600 dark:text-orange-300",
                  btnGrad: "from-orange-600 to-rose-500",
                  veil: "warm" as const,
                },
              };
              const cc = colorMap[category.color as keyof typeof colorMap] || colorMap.primary;
              const catImage = image(category.imageSlug);
              const reversed = categoryIndex % 2 === 1;

              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.05 }}
                  viewport={{ once: true, margin: "-10% 0px" }}
                  className={`grid gap-10 lg:grid-cols-[1fr_1.1fr] items-center ${reversed ? "lg:[&>div:first-child]:order-2" : ""}`}
                >
                  <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-border shadow-2xl group">
                    <Image
                      src={catImage.webp}
                      alt={catImage.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover transition-transform duration-[2s] ease-out group-hover:scale-[1.06]"
                      placeholder="blur"
                      blurDataURL={catImage.blurDataURL}
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-dark-950/70 via-dark-900/10 to-transparent" />
                    <div className={`absolute inset-0 gradient-veil-${cc.veil} opacity-40 mix-blend-overlay`} />
                    <div className="absolute top-6 left-6">
                      <div className={`w-16 h-16 bg-gradient-to-br ${cc.iconGrad} rounded-2xl flex items-center justify-center shadow-xl ${cc.iconShadow}`}>
                        <category.icon className="w-8 h-8 text-white" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-3">
                      {category.name}
                    </h2>
                    <p className="text-lg text-foreground-muted mb-8">{category.description}</p>

                    <div className="grid sm:grid-cols-1 gap-3 mb-8">
                      {category.services.map((service, serviceIndex) => (
                        <motion.div
                          key={service.slug}
                          initial={{ opacity: 0, x: reversed ? 20 : -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.35, delay: serviceIndex * 0.08 }}
                          viewport={{ once: true }}
                        >
                          <Spotlight className="rounded-xl">
                            <Link
                              href={`/services/${category.slug}/${service.slug}`}
                              className={`relative flex items-center gap-4 p-4 rounded-xl border-2 ${cc.border} ${cc.hoverBorder} ${cc.light} transition-all hover:-translate-y-0.5 hover:shadow-lg group`}
                            >
                              <div className={`w-11 h-11 rounded-lg bg-gradient-to-br ${cc.iconGrad} text-white flex items-center justify-center shrink-0 shadow-md ${cc.iconShadow} group-hover:scale-110 transition-transform`}>
                                <service.icon className="w-5 h-5" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="font-semibold text-foreground">{service.name}</div>
                              </div>
                              <ChevronRight className={`w-5 h-5 ${cc.text} shrink-0 group-hover:translate-x-1 transition-transform`} />
                            </Link>
                          </Spotlight>
                        </motion.div>
                      ))}
                    </div>

                    <Link
                      href={`/services/${category.slug}`}
                      className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r ${cc.btnGrad} text-white font-semibold hover:opacity-95 hover:-translate-y-0.5 transition-all shadow-lg ${cc.iconShadow}`}
                    >
                      Tous les services de la catégorie
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 bg-dark-950 overflow-hidden">
        <div className="absolute inset-0 animate-aurora bg-[length:200%_200%] bg-gradient-to-r from-primary-700 via-electric-500 to-primary-700" />
        <GradientVeil variant="brand" className="opacity-70" />
        <ParticlesLite variant="white" />
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div className="absolute top-0 right-0 w-[30rem] h-[30rem] bg-white/10 rounded-full blur-3xl animate-pulse-soft" />
        <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-accent-500/20 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: "2s" }} />
        <NoiseOverlay opacity={0.06} />

        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display font-bold text-3xl md:text-5xl text-white mb-6 leading-tight">
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
              <Link
                href="/demande-intervention"
                className="btn bg-accent-500 text-foreground hover:bg-accent-400 btn-lg"
              >
                Intervention urgente
              </Link>
              <a href="tel:+33652820685" className="btn glass-panel text-white hover:bg-white/15 btn-lg">
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
