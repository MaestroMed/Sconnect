"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Zap,
  Wrench,
  Shield,
  Clock,
  Home as HomeIcon,
  Building2,
  Lock,
  KeyRound,
  Video,
  DoorOpen,
  ChevronRight,
  Phone,
  Users,
  Calendar,
  ThumbsUp,
  ArrowRight,
  FileCheck,
} from "lucide-react";

import ServiceCard from "@/components/ui/ServiceCard";
import StatCard from "@/components/ui/StatCard";
import EngagementCard from "@/components/ui/EngagementCard";
import TestimonialCard from "@/components/ui/TestimonialCard";
import RealizationCard from "@/components/ui/RealizationCard";
import SectionTitle from "@/components/ui/SectionTitle";

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
  const displayedZones = siteConfig.zones.slice(0, 6);

  // Hero image avec fallback
  const heroImage = homepage.hero_image_url || "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&h=800&fit=crop";

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-dark-950 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-electric-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-500/10 rounded-full blur-3xl" />

        <div className="container-custom relative z-10 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-semibold mb-6">
                <Zap className="w-4 h-4" />
                Électricité • Contrôle d&apos;accès • Serrurerie • Métallerie
              </span>

              <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight">
                {homepage.hero_title.split(",")[0]},{" "}
                <span className="gradient-text">{homepage.hero_title.split(",")[1] || "c'est préserver votre bien-être"}</span>
              </h1>

              <p className="text-xl text-dark-300 mb-8 leading-relaxed">
                {homepage.hero_subtitle}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <Link href="/demande-devis" className="btn-primary btn-lg">
                  {homepage.hero_cta_primary}
                  <ChevronRight className="w-5 h-5" />
                </Link>
                <Link href="/demande-intervention" className="btn bg-accent-500 text-dark-900 hover:bg-accent-400 btn-lg shadow-lg shadow-accent-500/25 hover:shadow-xl">
                  <DoorOpen className="w-5 h-5" />
                  {homepage.hero_cta_secondary}
                </Link>
              </div>

              {/* Badges Certifications */}
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="glass-badge flex items-center gap-2 px-4 py-2 rounded-xl bg-green-500/10 border border-green-500/30">
                  <Shield className="w-5 h-5 text-green-400" />
                  <div className="text-left">
                    <span className="text-xs text-green-300 block">Garantie</span>
                    <span className="text-sm font-semibold text-white">Décennale</span>
                  </div>
                </div>
                <div className="glass-badge flex items-center gap-2 px-4 py-2 rounded-xl bg-electric-500/10 border border-electric-500/30">
                  <Zap className="w-5 h-5 text-electric-400" />
                  <div className="text-left">
                    <span className="text-xs text-electric-300 block">Certifié</span>
                    <span className="text-sm font-semibold text-white">IRVE</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-6 text-dark-400">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-accent-500" />
                  <span className="text-sm">Intervention 24h/24</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileCheck className="w-5 h-5 text-green-500" />
                  <span className="text-sm">Devis gratuit</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative w-full aspect-square max-w-lg mx-auto">
                <div className="absolute inset-0 rounded-3xl overflow-hidden border-4 border-dark-800 shadow-2xl">
                  <Image
                    src={heroImage}
                    alt="Technicien professionnel au travail"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900/50 to-transparent" />
                </div>

                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-4 -right-4 bg-white rounded-2xl p-4 shadow-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center">
                      <Clock className="w-6 h-6 text-accent-600" />
                    </div>
                    <div>
                      <p className="font-bold text-dark-900">24h/24</p>
                      <p className="text-sm text-dark-500">Urgences</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                  className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                      <Users className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <p className="font-bold text-dark-900">{siteConfig.stats.interventionsPerYear}+</p>
                      <p className="text-sm text-dark-500">Clients/an</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 100V60C240 20 480 0 720 0C960 0 1200 20 1440 60V100H0Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* 4 Métiers Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionTitle
            badge="Nos Métiers"
            title="4 expertises pour votre habitat"
            subtitle="Électricité, contrôle d'accès, serrurerie et métallerie : une offre complète pour sécuriser et équiper vos locaux."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.href}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link
                  href={category.href}
                  className={`block p-6 rounded-2xl border-2 transition-all hover:shadow-xl group h-full ${
                    category.color === "primary"
                      ? "border-primary-200 hover:border-primary-400 bg-gradient-to-br from-primary-50 to-white"
                      : category.color === "accent"
                      ? "border-accent-200 hover:border-accent-400 bg-gradient-to-br from-accent-50 to-white"
                      : category.color === "orange"
                      ? "border-orange-200 hover:border-orange-400 bg-gradient-to-br from-orange-50 to-white"
                      : "border-green-200 hover:border-green-400 bg-gradient-to-br from-green-50 to-white"
                  }`}
                >
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${
                      category.color === "primary"
                        ? "bg-primary-500 text-white"
                        : category.color === "accent"
                        ? "bg-accent-500 text-white"
                        : category.color === "orange"
                        ? "bg-orange-500 text-white"
                        : "bg-green-500 text-white"
                    }`}
                  >
                    <category.icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-display font-bold text-xl text-dark-900 mb-2">
                    {category.title}
                  </h3>
                  <p className="text-dark-600 text-sm mb-4">{category.description}</p>
                  <span
                    className={`inline-flex items-center gap-2 font-semibold text-sm ${
                      category.color === "primary"
                        ? "text-primary-600"
                        : category.color === "accent"
                        ? "text-accent-600"
                        : category.color === "orange"
                        ? "text-orange-600"
                        : "text-green-600"
                    }`}
                  >
                    Découvrir
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding bg-dark-50">
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
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-electric-500/10 rounded-full blur-3xl" />

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

      {/* Engagements Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
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
      <section className="section-padding bg-dark-50">
        <div className="container-custom">
          <SectionTitle
            badge="Nos Réalisations"
            title="Découvrez nos derniers chantiers"
            subtitle="Un aperçu de notre savoir-faire à travers des projets variés pour particuliers et professionnels."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {displayedRealizations.map((realization, index) => (
              <RealizationCard key={realization.id} {...realization} index={index} />
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
      <section className="section-padding bg-gradient-to-br from-primary-50 to-electric-50">
        <div className="container-custom">
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
      <section className="py-16 bg-white border-t border-b border-dark-100">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h3 className="font-display font-bold text-2xl text-dark-900 mb-2">
              {homepage.brands_title}
            </h3>
            <p className="text-dark-500 font-medium">
              {homepage.brands_subtitle}
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-16">
            {brands.map((brand, index) => (
              <motion.div
                key={brand.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="w-28 h-12 relative grayscale hover:grayscale-0 opacity-50 hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                  {brand.logo && brand.logo.startsWith('/') ? (
                    <Image src={brand.logo} alt={brand.name} fill className="object-contain" />
                  ) : (
                    <span className="text-xl font-bold text-dark-400 group-hover:text-primary-600 transition-colors">
                      {brand.name.split(" ")[0]}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

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

      {/* Zone d'intervention */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4 bg-primary-100 text-primary-700">
                Zone d&apos;intervention
              </span>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-dark-900 mb-6">
                Nous intervenons à Clichy et dans toute l&apos;Île-de-France
              </h2>
              <p className="text-lg text-dark-600 mb-8 leading-relaxed">
                Basés à Clichy (92110), nous intervenons rapidement dans les Hauts-de-Seine
                et toute la région parisienne. Particuliers ou professionnels, nous nous
                déplaçons pour tous vos besoins en électricité, contrôle d&apos;accès et serrurerie.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {[
                  { icon: HomeIcon, text: "Appartements & Maisons" },
                  { icon: Building2, text: "Commerces & Bureaux" },
                  { icon: Users, text: "Copropriétés" },
                  { icon: Building2, text: "Collectivités" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-3 text-dark-700">
                    <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-primary-600" />
                    </div>
                    <span className="font-medium">{item.text}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/demande-devis" className="btn-primary">
                  Demander un devis
                </Link>
                <a href={`tel:${siteConfig.phone.replace(/\s/g, '')}`} className="btn-outline">
                  <Phone className="w-5 h-5" />
                  {siteConfig.phone}
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=800&fit=crop"
                  alt="Paris et Île-de-France"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="flex flex-wrap gap-2">
                    {displayedZones.map((city) => (
                      <span
                        key={city}
                        className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm"
                      >
                        {city}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-primary-700 via-primary-600 to-electric-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl" />

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

