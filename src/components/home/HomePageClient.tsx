"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Zap,
  Wrench,
  Shield,
  Clock,
  Lock,
  KeyRound,
  Video,
  DoorOpen,
  ChevronRight,
  Phone,
  Calendar,
  ThumbsUp,
  ArrowRight,
  FileCheck,
  MapPin,
} from "lucide-react";

import ServiceCard from "@/components/ui/ServiceCard";
import StatCard from "@/components/ui/StatCard";
import EngagementCard from "@/components/ui/EngagementCard";
import TestimonialCard from "@/components/ui/TestimonialCard";
import RealizationCard from "@/components/ui/RealizationCard";
import SectionTitle from "@/components/ui/SectionTitle";
import Marquee from "@/components/ui/Marquee";
import { GradientVeil, NoiseOverlay, ParticlesLite, Spotlight } from "@/components/ui/ambient";
import CertificationsBand from "@/components/marketing/CertificationsBand";
import BrandChip from "@/components/marketing/BrandChip";
import InterventionMap from "@/components/marketing/InterventionMap";

interface HomePageClientProps {
  siteConfig: {
    siteName: string;
    phone: string;
    phoneEmergency: string;
    stats: {
      interventionsPerYear: number;
      yearsExperience: number;
      satisfactionRate: number;
    };
    zones: string[];
  };
  homepage: {
    hero_title: string;
    hero_subtitle: string;
    hero_cta_primary: string;
    hero_cta_secondary: string;
    hero_image_url: string | null;
    brands_title: string;
    brands_subtitle: string;
    cta_title: string;
    cta_subtitle: string;
    cta_button: string;
  };
  testimonials: Array<{
    name: string;
    rating: number;
    text: string;
    service: string;
    location: string;
  }>;
  realizations: Array<{
    id: string;
    title: string;
    type: string;
    location: string;
    category: string;
    image: string;
    hasCompare?: boolean;
  }>;
  brands: Array<{
    id: string;
    name: string;
    logo: string;
  }>;
}

// 4 Métiers principaux
const categories = [
  {
    title: "Électricité",
    description: "Installation, rénovation, mise aux normes et dépannage électrique pour particuliers et professionnels.",
    href: "/services/electricite",
    icon: Zap,
    color: "primary" as const,
  },
  {
    title: "Contrôle d'accès",
    description: "Interphonie, vidéophonie, badges et digicodes pour sécuriser vos locaux.",
    href: "/services/controle-acces",
    icon: KeyRound,
    color: "accent" as const,
  },
  {
    title: "Serrurerie",
    description: "Ouverture de porte, remplacement de serrure, blindage et sécurisation de vos accès.",
    href: "/services/serrurerie",
    icon: Lock,
    color: "green" as const,
  },
  {
    title: "Métallerie",
    description: "Fabrication de portails, portes et structures métalliques sur mesure.",
    href: "/services/metallerie",
    icon: Wrench,
    color: "orange" as const,
  },
];

// Services détaillés
const services = [
  {
    title: "Installation électrique",
    description: "Création de réseaux électriques complets, poses de prises, éclairages et tableaux neufs.",
    href: "/services/electricite/installation-renovation",
    icon: Zap,
  },
  {
    title: "Dépannage électrique",
    description: "Intervention rapide 24h/24 pour tous vos problèmes électriques : pannes, courts-circuits.",
    href: "/services/electricite/depannage-electrique",
    icon: Zap,
  },
  {
    title: "Interphonie & Vidéophonie",
    description: "Installation et dépannage d'interphones et vidéophones pour copropriétés et particuliers.",
    href: "/services/controle-acces/interphonie-videophonie",
    icon: Video,
  },
  {
    title: "Ouverture de porte",
    description: "Porte claquée ou bloquée ? Intervention rapide 24h/24 sans dégât dans 95% des cas.",
    href: "/services/serrurerie/ouverture-porte",
    icon: DoorOpen,
  },
  {
    title: "Blindage de porte",
    description: "Blindage de porte existante ou pose de bloc-porte blindé certifié A2P.",
    href: "/services/serrurerie/blindage-porte",
    icon: Shield,
  },
  {
    title: "Fabrication portail",
    description: "Conception et fabrication de portails sur mesure en acier, aluminium ou fer forgé.",
    href: "/services/metallerie/fabrication-portail",
    icon: Wrench,
  },
];

const engagements = [
  {
    title: "Sécurité & Conformité",
    description: "Toutes nos installations respectent les normes en vigueur. Nous garantissons votre sécurité avec des équipements certifiés.",
    icon: Shield,
    color: "primary" as const,
  },
  {
    title: "Réactivité & Disponibilité",
    description: "Intervention sous 2h pour les urgences. Nos équipes sont disponibles 24h/24 pour répondre à vos besoins.",
    icon: Clock,
    color: "accent" as const,
  },
  {
    title: "Transparence & Prix Justes",
    description: "Devis détaillés et gratuits, sans surprise. Nous vous expliquons chaque intervention avant de commencer.",
    icon: FileCheck,
    color: "green" as const,
  },
];

export default function HomePageClient({
  siteConfig,
  homepage,
  testimonials,
  realizations,
  brands,
}: HomePageClientProps) {
  const stats = [
    { value: siteConfig.stats.interventionsPerYear, suffix: "+", label: "Interventions par an", icon: Wrench },
    { value: siteConfig.stats.yearsExperience, suffix: " ans", label: "D'expérience", icon: Calendar },
    { value: siteConfig.stats.satisfactionRate, suffix: "%", label: "Clients satisfaits", icon: ThumbsUp },
  ];

  const displayedTestimonials = testimonials.slice(0, 4);
  const displayedRealizations = realizations.slice(0, 6);

  return (
    <>
      {/* Hero Section — full-bleed interactive IDF map background */}
      <section className="relative min-h-[100vh] flex items-center bg-dark-950 overflow-hidden">
        {/* Map fills the entire hero */}
        <InterventionMap variant="hero" />

        {/* Readability overlays:
            1. Strong gradient from left (dark) → center (transparent) so the
               text column remains legible while the pin cluster stays visible
               on the right.
            2. Subtle top + bottom fade for framing. */}
        <div className="absolute inset-0 bg-gradient-to-r from-dark-950 via-dark-950/75 to-transparent md:via-dark-950/60 lg:via-dark-950/45" />
        <div className="absolute inset-0 bg-gradient-to-b from-dark-950/30 via-transparent to-dark-950/70" />
        <NoiseOverlay opacity={0.035} />

        <div className="container-custom relative z-10 py-20 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/15 border border-primary-500/25 text-primary-300 text-sm font-semibold mb-6 backdrop-blur-md">
              <Zap className="w-4 h-4" />
              Électricité • Contrôle d&apos;accès • Serrurerie • Métallerie
            </span>

            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white mb-6 leading-[1.05] [text-shadow:_0_2px_20px_rgba(0,0,0,0.5)]">
              {homepage.hero_title.split(",")[0]},{" "}
              <span className="gradient-text-living">
                {homepage.hero_title.split(",")[1] || "c'est préserver votre bien-être"}
              </span>
            </h1>

            <p className="text-xl text-white/85 mb-8 leading-relaxed max-w-xl [text-shadow:_0_1px_10px_rgba(0,0,0,0.5)]">
              {homepage.hero_subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link href="/demande-devis" className="btn-primary btn-lg">
                {homepage.hero_cta_primary}
                <ChevronRight className="w-5 h-5" />
              </Link>
              <Link
                href="/demande-intervention"
                className="btn bg-accent-500 text-dark-900 hover:bg-accent-400 btn-lg shadow-lg shadow-accent-500/25 hover:shadow-xl"
              >
                <DoorOpen className="w-5 h-5" />
                {homepage.hero_cta_secondary}
              </Link>
            </div>

            {/* Certif badges — glass panels remain crisp over the map */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="glass-panel flex items-center gap-2 px-4 py-2 rounded-xl">
                <Shield className="w-5 h-5 text-green-400" />
                <div className="text-left">
                  <span className="text-xs text-green-300 block">Garantie</span>
                  <span className="text-sm font-semibold text-white">Décennale</span>
                </div>
              </div>
              <div className="glass-panel flex items-center gap-2 px-4 py-2 rounded-xl">
                <Zap className="w-5 h-5 text-electric-400" />
                <div className="text-left">
                  <span className="text-xs text-electric-300 block">Certifié</span>
                  <span className="text-sm font-semibold text-white">IRVE</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-white/70">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-accent-400" />
                <span className="text-sm">Intervention 24h/24</span>
              </div>
              <div className="flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-green-400" />
                <span className="text-sm">Devis gratuit</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Map caption — bottom-right, small, honest (no fake data) */}
        <div className="absolute bottom-8 right-8 hidden md:flex items-center gap-2 text-xs text-white/50 font-medium pointer-events-none">
          <MapPin className="w-3.5 h-3.5" />
          <span>Île-de-France · {18}+ communes couvertes · intervention sous 40 min</span>
        </div>

        <div className="absolute bottom-0 left-0 right-0 text-surface pointer-events-none">
          <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 100V60C240 20 480 0 720 0C960 0 1200 20 1440 60V100H0Z" fill="currentColor" />
          </svg>
        </div>
      </section>

      {/* 4 Métiers Section */}
      <section className="section-padding bg-surface">
        <div className="container-custom">
          <SectionTitle
            badge="Nos Métiers"
            title="4 expertises pour votre habitat"
            subtitle="Électricité, contrôle d'accès, serrurerie et métallerie : une offre complète pour sécuriser et équiper vos locaux."
          />

          <div className="grid grid-cols-1 md:grid-cols-6 md:auto-rows-[minmax(220px,auto)] gap-4 md:gap-6">
            {categories.map((category, index) => {
              // Bento spans: first tile is larger, others fill the rest
              const spanClass =
                index === 0
                  ? "md:col-span-3 md:row-span-2"
                  : index === 1
                    ? "md:col-span-3"
                    : "md:col-span-2";
              const colorClasses =
                category.color === "primary"
                  ? "border-primary-200 hover:border-primary-400 bg-gradient-to-br from-primary-50 to-surface dark:border-primary-500/30 dark:hover:border-primary-400 dark:from-primary-500/10 dark:to-surface-muted"
                  : category.color === "accent"
                    ? "border-accent-200 hover:border-accent-400 bg-gradient-to-br from-accent-50 to-surface dark:border-accent-500/30 dark:hover:border-accent-400 dark:from-accent-500/10 dark:to-surface-muted"
                    : category.color === "orange"
                      ? "border-orange-200 hover:border-orange-400 bg-gradient-to-br from-orange-50 to-surface dark:border-orange-500/30 dark:hover:border-orange-400 dark:from-orange-500/10 dark:to-surface-muted"
                      : "border-green-200 hover:border-green-400 bg-gradient-to-br from-green-50 to-surface dark:border-green-500/30 dark:hover:border-green-400 dark:from-green-500/10 dark:to-surface-muted";
              const iconBg =
                category.color === "primary"
                  ? "bg-primary-500"
                  : category.color === "accent"
                    ? "bg-accent-500"
                    : category.color === "orange"
                      ? "bg-orange-500"
                      : "bg-green-500";
              const accentText =
                category.color === "primary"
                  ? "text-primary-600 dark:text-primary-300"
                  : category.color === "accent"
                    ? "text-accent-600 dark:text-accent-300"
                    : category.color === "orange"
                      ? "text-orange-600 dark:text-orange-300"
                      : "text-green-600 dark:text-green-300";

              return (
                <motion.div
                  key={category.href}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: true, margin: "-10% 0px" }}
                  whileHover={{ y: -4 }}
                  className={spanClass}
                >
                  <Spotlight className="h-full rounded-2xl">
                    <Link
                      href={category.href}
                      className={`relative overflow-hidden block p-6 md:p-8 rounded-2xl border-2 transition-all hover:shadow-xl group h-full ${colorClasses}`}
                    >
                      {/* Decorative orb accent — bigger on feature tile */}
                      <div
                        aria-hidden="true"
                        className={`pointer-events-none absolute -right-20 -bottom-20 rounded-full blur-3xl transition-opacity duration-500 group-hover:opacity-100 ${
                          category.color === "primary"
                            ? "bg-primary-500/20"
                            : category.color === "accent"
                              ? "bg-accent-500/20"
                              : category.color === "orange"
                                ? "bg-orange-500/20"
                                : "bg-green-500/20"
                        } ${index === 0 ? "h-72 w-72 opacity-70" : "h-48 w-48 opacity-40"}`}
                      />
                      <div className="relative z-10 flex h-full flex-col">
                        <div
                          className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 shadow-lg text-white magnetic group-hover:scale-110 group-hover:rotate-3 ${iconBg}`}
                        >
                          <category.icon className="w-7 h-7" />
                        </div>
                        <h3
                          className={`font-display font-bold ${
                            index === 0 ? "text-2xl md:text-3xl" : "text-xl"
                          } text-foreground mb-2`}
                        >
                          {category.title}
                        </h3>
                        <p
                          className={`text-foreground-muted mb-4 ${
                            index === 0 ? "text-base md:text-lg max-w-md" : "text-sm"
                          }`}
                        >
                          {category.description}
                        </p>
                        <span
                          className={`mt-auto inline-flex items-center gap-2 font-semibold text-sm ${accentText}`}
                        >
                          Découvrir
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </Link>
                  </Spotlight>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding bg-surface-muted">
        <div className="container-custom">
          <SectionTitle
            badge="Nos Services"
            title="Des solutions complètes"
            subtitle="De l'installation au dépannage, nous intervenons sur tous types de travaux pour les particuliers et les professionnels."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {services.map((service, index) => (
              <ServiceCard key={service.href} {...service} index={index} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <Link href="/services" className="btn-outline btn-lg">
              Voir tous nos services
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-dark-900 via-dark-950 to-primary-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-600/20 rounded-full blur-3xl animate-pulse-soft" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-electric-500/20 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/3 right-0 w-80 h-80 bg-violet-500/15 rounded-full blur-3xl animate-orb-float" />
        <NoiseOverlay opacity={0.04} />

        <div className="container-custom relative z-10">
          <SectionTitle
            badge="Nos Chiffres"
            title="La confiance de milliers de clients"
            subtitle="Des résultats qui parlent d'eux-mêmes"
            light
          />

          <div className="grid md:grid-cols-3 gap-12">
            {stats.map((stat, index) => (
              <div key={stat.label} className="text-center">
                <StatCard {...stat} index={index} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Band — showcased prominently after stats */}
      <CertificationsBand background="surface" />

      {/* Engagements Section */}
      <section className="relative section-padding bg-surface-muted overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-primary-50/30 to-transparent dark:via-primary-950/30" />
        <div className="container-custom relative z-10">
          <SectionTitle
            badge="Nos Engagements"
            title="Pourquoi nous faire confiance ?"
            subtitle="Notre réputation est bâtie sur des valeurs solides et un engagement sans faille envers nos clients."
          />

          <div className="grid md:grid-cols-3 gap-8">
            {engagements.map((engagement, index) => (
              <EngagementCard key={engagement.title} {...engagement} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Realizations Section */}
      <section className="section-padding bg-surface-muted">
        <div className="container-custom">
          <SectionTitle
            badge="Nos Réalisations"
            title="Découvrez nos derniers chantiers"
            subtitle="Un aperçu de notre savoir-faire à travers des projets variés pour particuliers et professionnels."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {displayedRealizations.map((realization, index) => (
              <RealizationCard key={realization.id} {...realization} hasCompare={realization.hasCompare} index={index} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <Link href="/realisations" className="btn-outline btn-lg">
              Voir toutes nos réalisations
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative section-padding bg-gradient-to-br from-primary-50 to-electric-50 dark:from-dark-900 dark:to-primary-950 overflow-hidden">
        <div className="pointer-events-none absolute -top-40 right-[-10%] w-[30rem] h-[30rem] bg-primary-400/20 dark:bg-primary-500/15 rounded-full blur-3xl animate-orb-float" />
        <div className="pointer-events-none absolute bottom-0 left-[-10%] w-[28rem] h-[28rem] bg-electric-400/20 dark:bg-violet-500/15 rounded-full blur-3xl animate-drift" />
        <div className="container-custom relative z-10">
          <SectionTitle
            badge="Avis Clients"
            title="Ils nous font confiance"
            subtitle="Découvrez les témoignages de nos clients satisfaits."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayedTestimonials.map((testimonial, index) => (
              <TestimonialCard key={testimonial.name} {...testimonial} index={index} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <Link href="/avis" className="btn-primary">
              Voir tous les avis
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Ils nous font confiance Section */}
      <section className="py-16 bg-surface border-t border-b border-border">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h3 className="font-display font-bold text-2xl text-foreground mb-2">
              {homepage.brands_title}
            </h3>
            <p className="text-foreground-muted font-medium">
              {homepage.brands_subtitle}
            </p>
          </motion.div>

          <Marquee speed={45} className="py-4">
            {brands.map((brand) => (
              <BrandChip key={brand.id} name={brand.name} logo={brand.logo} />
            ))}
          </Marquee>

          <p className="mt-6 text-center text-xs text-foreground-muted max-w-2xl mx-auto">
            Marques et produits installés par nos équipes. Les noms et logos restent la propriété de leurs détenteurs respectifs.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mt-8 text-center"
          >
            <Link
              href="/marques"
              className="text-primary-600 font-semibold hover:text-primary-700 transition-colors inline-flex items-center gap-2"
            >
              Découvrir nos partenaires
              <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* InterventionMap promoted to the hero above — no standalone section needed. */}

      {/* Final CTA */}
      <section className="relative overflow-hidden py-24 md:py-32 bg-dark-950">
        {/* Layered animated backdrop */}
        <div
          aria-hidden="true"
          className="absolute inset-0 animate-aurora bg-[length:200%_200%] bg-gradient-to-r from-primary-700 via-electric-500 to-primary-700"
        />
        <div className="absolute inset-0">
          <GradientVeil variant="brand" />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-70 mix-blend-overlay animate-gradient-shift bg-[length:200%_200%]"
          style={{
            background:
              "conic-gradient(from 0deg at 50% 50%, rgba(245,158,11,0.25), transparent 20%, transparent 50%, rgba(14,165,233,0.3), transparent 80%, rgba(139,92,246,0.25))",
          }}
        />
        <ParticlesLite variant="white" />
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-white/10 rounded-full blur-3xl animate-pulse-soft" />
        <div className="absolute bottom-0 left-0 w-[40rem] h-[40rem] bg-accent-500/25 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: "2s" }} />
        <NoiseOverlay opacity={0.07} />

        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-white mb-6">
              {homepage.cta_title}
            </h2>
            <p className="text-xl text-primary-100 mb-10 max-w-2xl mx-auto">
              {homepage.cta_subtitle}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/demande-devis" className="btn-white btn-lg">
                {homepage.cta_button}
                <ChevronRight className="w-5 h-5" />
              </Link>
              <a href={`tel:${siteConfig.phone.replace(/\s/g, '')}`} className="btn bg-white/10 text-white hover:bg-white/20 btn-lg border border-white/20">
                <Phone className="w-5 h-5" />
                {siteConfig.phone}
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}





