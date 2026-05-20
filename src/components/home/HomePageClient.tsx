"use client";

import Link from "next/link";
import Image from "next/image";
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
} from "lucide-react";

import StatCard from "@/components/ui/StatCard";
import EngagementCard from "@/components/ui/EngagementCard";
import TestimonialCard from "@/components/ui/TestimonialCard";
import RealizationCard from "@/components/ui/RealizationCard";
import SectionTitle from "@/components/ui/SectionTitle";
import Marquee from "@/components/ui/Marquee";
import { NoiseOverlay, ParticlesLite } from "@/components/ui/ambient";
import CertificationsBand from "@/components/marketing/CertificationsBand";
import BrandChip from "@/components/marketing/BrandChip";
import InterventionMap from "@/components/marketing/InterventionMap";
import HeroVideo from "@/components/home/HeroVideo";
import BulbText from "@/components/ui/BulbText";

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

// 4 Métiers principaux — bento with hero category imagery
const categories = [
  {
    title: "Électricité",
    description: "Installation, rénovation, mise aux normes et dépannage électrique.",
    href: "/services/electricite",
    icon: Zap,
    imageSlug: "hero-electricien",
    accent: "from-primary-500 to-electric-500",
    chip: "Relamping LED · −80%",
  },
  {
    title: "Contrôle d'accès",
    description: "Interphonie, vidéophonie, badges et digicodes pour sécuriser vos locaux.",
    href: "/services/controle-acces",
    icon: KeyRound,
    imageSlug: "hero-controle-acces",
    accent: "from-accent-500 to-amber-400",
    chip: "Sécurité 24/7",
  },
  {
    title: "Serrurerie",
    description: "Ouverture, remplacement, blindage et sécurisation de vos accès.",
    href: "/services/serrurerie",
    icon: Lock,
    imageSlug: "hero-serrurier",
    accent: "from-emerald-500 to-teal-400",
    chip: "Urgence 24/7",
  },
  {
    title: "Métallerie",
    description: "Fabrication de portails, portes et structures métalliques sur mesure.",
    href: "/services/metallerie",
    icon: Wrench,
    imageSlug: "hero-portail",
    accent: "from-orange-500 to-rose-500",
    chip: "Sur mesure",
  },
];

// Services détaillés — image-backed bento
const services = [
  {
    title: "Installation électrique",
    description: "Réseaux électriques complets, prises, éclairages, tableaux neufs.",
    href: "/services/electricite/installation-renovation",
    icon: Zap,
    imageSlug: "electricite-installation",
  },
  {
    title: "Dépannage électrique",
    description: "Intervention rapide 24h/24 : pannes, courts-circuits.",
    href: "/services/electricite/depannage-electrique",
    icon: Zap,
    imageSlug: "electricite-depannage",
  },
  {
    title: "Interphonie & Vidéophonie",
    description: "Interphones et vidéophones pour copropriétés et particuliers.",
    href: "/services/controle-acces/interphonie-videophonie",
    icon: Video,
    imageSlug: "acces-interphone",
  },
  {
    title: "Ouverture de porte",
    description: "Porte claquée ou bloquée ? Sans dégât dans 95% des cas.",
    href: "/services/serrurerie/ouverture-porte",
    icon: DoorOpen,
    imageSlug: "serrurerie-ouverture",
  },
  {
    title: "Blindage de porte",
    description: "Blindage existant ou pose de bloc-porte blindé certifié A2P.",
    href: "/services/serrurerie/blindage-porte",
    icon: Shield,
    imageSlug: "serrurerie-blindage",
  },
  {
    title: "Fabrication portail",
    description: "Portails sur mesure en acier, aluminium ou fer forgé.",
    href: "/services/metallerie/fabrication-portail",
    icon: Wrench,
    imageSlug: "metallerie-portail",
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
      {/* Hero Section — full-bleed cinematic video (Apple-like).
          Heavy gradients were drowning the Seedance video. New approach: a
          localised left-column scrim that protects the headline + a soft
          bottom fade for the curve transition. The subject (Paris rooftops
          → warm window) breathes fully on the right two-thirds. Text
          readability is held by stronger text-shadow on the headings, not
          a global blue blanket. */}
      <section className="relative min-h-[100vh] flex items-center bg-dark-950 overflow-hidden">
        <HeroVideo
          videoSrc="/videos/hero-paris-window.mp4"
          videoSrcWebm="/videos/hero-paris-window.webm"
          posterSrc="/images/hero/hero-cinema-paris.webp"
          fallbackSrc="/images/hero/hero-cinema-paris.jpg"
        />

        {/* Left-column scrim — protects the text without covering the video
            subject. Strong on the very left edge, fully transparent by mid-frame. */}
        <div className="absolute inset-0 bg-gradient-to-r from-dark-950/85 from-0% via-dark-950/35 via-25% to-transparent to-55%" />
        {/* Bottom fade — just enough to land cleanly into the curve SVG. */}
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-dark-950/75 to-transparent" />
        <NoiseOverlay opacity={0.025} />

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

            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white mb-6 leading-[1.05] [text-shadow:_0_2px_28px_rgba(0,0,0,0.85),_0_1px_4px_rgba(0,0,0,0.7)]">
              {homepage.hero_title.split(",")[0]},{" "}
              <BulbText>
                {homepage.hero_title.split(",")[1] || "c'est préserver votre bien-être"}
              </BulbText>
            </h1>

            <p className="text-xl text-white/95 mb-8 leading-relaxed max-w-xl [text-shadow:_0_2px_16px_rgba(0,0,0,0.8),_0_1px_3px_rgba(0,0,0,0.6)]">
              {homepage.hero_subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              {/* Primary funnel — saturated brand blue. Largest visual weight
                  so the eye lands here first on cold visits. */}
              <Link href="/demande-devis" className="btn-primary btn-lg shadow-xl shadow-primary-700/40">
                {homepage.hero_cta_primary}
                <ChevronRight className="w-5 h-5" />
              </Link>
              {/* Secondary urgency — outline accent, smaller chromatic
                  footprint so it doesn't compete with the devis funnel.
                  Still unmistakably actionable thanks to the door icon
                  and the warm border. */}
              <Link
                href="/demande-intervention"
                className="btn btn-lg bg-transparent text-white border-2 border-accent-400/80 hover:border-accent-300 hover:bg-accent-500/15 transition-colors"
              >
                <DoorOpen className="w-5 h-5 text-accent-300" />
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

        <div className="absolute bottom-0 left-0 right-0 text-surface pointer-events-none">
          <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 100V60C240 20 480 0 720 0C960 0 1200 20 1440 60V100H0Z" fill="currentColor" />
          </svg>
        </div>
      </section>

      {/* 4 Métiers — Apple bento with full-bleed hero category images.
          Checker pattern (4-2 / 2-4) so each métier breathes asymmetrically;
          on mobile they stack as full-width cards. */}
      <section className="section-padding bg-surface">
        <div className="container-custom">
          <SectionTitle
            badge="Nos Métiers"
            title="4 expertises pour votre habitat"
            subtitle="Électricité, contrôle d'accès, serrurerie et métallerie : une offre complète pour sécuriser et équiper vos locaux."
          />

          {/* Bento checker — large + small per row. Geometry trick: a
              col-span-4 large card needs aspect [4/3], a col-span-2 small
              needs aspect [2/3] → they compute to the SAME HEIGHT
              (0.667w*0.75 == 0.333w*1.5 == 0.5w). Killing the empty
              white slot that the previous uniform aspect-5/6 produced. */}
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 md:gap-6">
            {categories.map((category, index) => {
              const isLarge = index === 0 || index === 3;
              const span = isLarge ? "lg:col-span-4" : "lg:col-span-2";
              const aspect = isLarge ? "lg:aspect-[4/3]" : "lg:aspect-[2/3]";
              const Icon = category.icon;
              return (
                <motion.div
                  key={category.href}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: true, margin: "-10% 0px" }}
                  whileHover={{ y: -4 }}
                  className={span}
                >
                  <Link
                    href={category.href}
                    className={`relative block aspect-[4/5] ${aspect} rounded-3xl overflow-hidden group bg-dark-900 shadow-lg shadow-dark-900/10 hover:shadow-2xl transition-shadow`}
                  >
                    <Image
                      src={`/images/hero/${category.imageSlug}.webp`}
                      alt={category.title}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      priority={index < 2}
                    />
                    {/* Top-to-bottom scrim — almost solid at the bottom (text zone),
                        clear at the top (image hero). */}
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-950 from-0% via-dark-950/60 via-40% to-transparent to-70%" />
                    {/* Chip — top-left */}
                    <span className="absolute top-5 left-5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white text-xs font-semibold">
                      {category.chip}
                    </span>
                    {/* Content — bottom */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-gradient-to-br ${category.accent} shadow-lg`}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-display font-bold text-2xl md:text-3xl text-white mb-2 [text-shadow:_0_2px_16px_rgba(0,0,0,0.7)]">
                        {category.title}
                      </h3>
                      <p className="text-white/85 text-sm md:text-base mb-4 max-w-md leading-relaxed [text-shadow:_0_1px_8px_rgba(0,0,0,0.6)]">
                        {category.description}
                      </p>
                      <span className="inline-flex items-center gap-2 font-semibold text-sm text-white group-hover:gap-3 transition-all">
                        Découvrir
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Section — image-backed cards. Each card uses its matching
          product macro shot as background, with a vertical scrim for readability. */}
      <section className="section-padding bg-surface-muted">
        <div className="container-custom">
          <SectionTitle
            badge="Nos Services"
            title="Des solutions complètes"
            subtitle="De l'installation au dépannage, nous intervenons sur tous types de travaux pour les particuliers et les professionnels."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.href}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: true, margin: "-10% 0px" }}
                  whileHover={{ y: -4 }}
                >
                  <Link
                    href={service.href}
                    className="relative block aspect-[4/3] rounded-2xl overflow-hidden group bg-dark-900 shadow-md shadow-dark-900/10 hover:shadow-xl transition-shadow"
                  >
                    <Image
                      src={`/images/services/${service.imageSlug}.webp`}
                      alt={service.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                    />
                    {/* Scrim — top transparent, bottom solid for text */}
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-950/95 from-0% via-dark-950/45 via-50% to-dark-950/10 to-100%" />
                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6">
                      <div className="w-10 h-10 rounded-lg bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-center mb-3">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="font-display font-bold text-lg md:text-xl text-white mb-2 [text-shadow:_0_2px_12px_rgba(0,0,0,0.7)]">
                        {service.title}
                      </h3>
                      <p className="text-white/80 text-sm leading-relaxed [text-shadow:_0_1px_6px_rgba(0,0,0,0.6)]">
                        {service.description}
                      </p>
                      <span className="mt-3 inline-flex items-center gap-1.5 text-white/90 text-sm font-semibold group-hover:gap-2.5 transition-all">
                        Voir le service
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
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

      {/* Team — bento with portrait + technician + vehicle. Adds human warmth
          before the realisations gallery. */}
      <section className="section-padding bg-surface">
        <div className="container-custom">
          <SectionTitle
            badge="Au cœur du métier"
            title="L'humain derrière l'expertise"
            subtitle="Trois techniciens spécialisés, une équipe soudée, des véhicules toujours prêts."
          />

          <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 md:gap-6">
            {/* team-equipe — large feature (4:5 portrait, lg:col-span-3) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, margin: "-10% 0px" }}
              className="lg:col-span-3"
            >
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-dark-900 group">
                <Image
                  src="/images/team/team-equipe.webp"
                  alt="L'équipe S Connect — électricien, serrurier, métallier"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950 from-0% via-dark-950/45 via-45% to-transparent to-75%" />
                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10">
                  <span className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white text-xs font-semibold inline-flex w-fit mb-4">
                    Équipe complète
                  </span>
                  <h3 className="font-display font-bold text-2xl md:text-4xl text-white mb-3 [text-shadow:_0_2px_16px_rgba(0,0,0,0.7)]">
                    Trois métiers, une seule équipe
                  </h3>
                  <p className="text-white/85 text-base md:text-lg leading-relaxed max-w-md [text-shadow:_0_1px_8px_rgba(0,0,0,0.6)]">
                    Électricien, serrurier, métallier — formés A2P, certifiés IRVE, basés à Clichy.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Right column — 2 stacked smaller tiles (lg:col-span-3).
                On lg we use grid-rows-2 so each tile gets exactly half the
                height of the big portrait on the left → no more empty space. */}
            <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 lg:grid-rows-2 gap-4 md:gap-6">
              {/* team-technicien */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true, margin: "-10% 0px" }}
              >
                <div className="relative aspect-[5/3] lg:aspect-auto lg:h-full lg:min-h-[14rem] rounded-3xl overflow-hidden bg-dark-900 group">
                  <Image
                    src="/images/team/team-technicien.webp"
                    alt="Technicien S Connect en intervention"
                    fill
                    sizes="(min-width: 1024px) 50vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-950/95 via-dark-950/30 to-transparent" />
                  <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-7">
                    <h4 className="font-display font-bold text-lg md:text-2xl text-white mb-1 [text-shadow:_0_2px_12px_rgba(0,0,0,0.7)]">
                      Le savoir-faire
                    </h4>
                    <p className="text-white/80 text-sm md:text-base [text-shadow:_0_1px_6px_rgba(0,0,0,0.6)]">
                      Plus de {siteConfig.stats.yearsExperience} ans d&apos;expérience en intervention.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* team-vehicule */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true, margin: "-10% 0px" }}
              >
                <div className="relative aspect-[5/3] lg:aspect-auto lg:h-full lg:min-h-[14rem] rounded-3xl overflow-hidden bg-dark-900 group">
                  <Image
                    src="/images/team/team-vehicule.webp"
                    alt="Véhicule d'intervention S Connect dans une rue parisienne"
                    fill
                    sizes="(min-width: 1024px) 50vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-950/95 via-dark-950/30 to-transparent" />
                  <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-7">
                    <h4 className="font-display font-bold text-lg md:text-2xl text-white mb-1 [text-shadow:_0_2px_12px_rgba(0,0,0,0.7)]">
                      Toujours prêts
                    </h4>
                    <p className="text-white/80 text-sm md:text-base [text-shadow:_0_1px_6px_rgba(0,0,0,0.6)]">
                      Intervention sous 40 min sur toute la petite couronne.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
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

      {/* Notre rayonnement — interactive IDF coverage map. Promoted out of the
          hero so it gets its own respect (and so the hero can be cinematic).
          The map keeps its hover/department/pin interactions. */}
      <InterventionMap variant="section" />

      {/* Final CTA — Paris aerial backdrop instead of pure gradient, so the
          page opens and closes on the same cinematic visual language. */}
      <section className="relative overflow-hidden py-24 md:py-32 bg-dark-950">
        <Image
          src="/images/hero/hero-cinema-paris.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-90"
          aria-hidden="true"
        />
        {/* Brand-tinted scrim so the CTA stays unmistakably blue/electric. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-br from-primary-700/85 via-primary-900/75 to-electric-600/70 mix-blend-multiply"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark-950/30 via-transparent to-dark-950/60" />
        <ParticlesLite variant="white" />
        <NoiseOverlay opacity={0.05} />

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
              {/* Primary — solid white on brand-blue scrim → maximum
                  contrast for the bottom-funnel conversion. */}
              <Link href="/demande-devis" className="btn-white btn-lg shadow-xl shadow-black/20">
                {homepage.cta_button}
                <ChevronRight className="w-5 h-5" />
              </Link>
              {/* Secondary — solid outline white at 100% opacity (not the
                  previous bg-white/10 ghost which was unreadable on photo).
                  Still calls clearly. E.164 format for international dial. */}
              <a
                href={`tel:${siteConfig.phone.replace(/\s/g, '').replace(/^0/, '+33')}`}
                className="btn btn-lg bg-transparent text-white border-2 border-white hover:bg-white hover:text-primary-700 transition-colors"
              >
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





