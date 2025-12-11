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
  Camera,
} from "lucide-react";

import ServiceCard from "@/components/ui/ServiceCard";
import StatCard from "@/components/ui/StatCard";
import EngagementCard from "@/components/ui/EngagementCard";
import TestimonialCard from "@/components/ui/TestimonialCard";
import RealizationCard from "@/components/ui/RealizationCard";
import SectionTitle from "@/components/ui/SectionTitle";

// 3 Métiers principaux
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
    description: "Interphonie, vidéophonie, badges, digicodes et vidéosurveillance pour sécuriser vos locaux.",
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
    title: "Vidéosurveillance",
    description: "Caméras HD, enregistreurs et accès à distance pour protéger vos biens.",
    href: "/services/controle-acces/videosurveillance",
    icon: Camera,
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
];

const stats = [
  { value: 2500, suffix: "+", label: "Interventions par an", icon: Wrench },
  { value: 15, suffix: " ans", label: "D'expérience", icon: Calendar },
  { value: 98, suffix: "%", label: "Clients satisfaits", icon: ThumbsUp },
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

const testimonials = [
  {
    name: "Marie L.",
    rating: 5,
    text: "Intervention rapide et efficace pour une panne générale en soirée. L'électricien était très professionnel et a pris le temps de m'expliquer le problème. Je recommande vivement !",
    service: "Dépannage électrique",
    location: "Clichy",
  },
  {
    name: "Sophie M.",
    rating: 5,
    text: "Porte claquée un dimanche soir, intervention en moins d'une heure ! Le serrurier a ouvert sans aucun dégât et m'a même conseillé sur la sécurité de ma serrure. Très pro.",
    service: "Ouverture de porte",
    location: "Neuilly-sur-Seine",
  },
  {
    name: "Restaurant Le Gourmet",
    rating: 5,
    text: "S Connect France a installé notre système de vidéosurveillance et de contrôle d'accès. Installation propre, formation complète de l'équipe. Un vrai partenaire de confiance.",
    service: "Vidéosurveillance",
    location: "Paris 17e",
  },
  {
    name: "Thomas R.",
    rating: 5,
    text: "Blindage de ma porte d'entrée après une tentative d'effraction. Travail de qualité, porte comme neuve avec une sécurité renforcée. Je me sens enfin en sécurité.",
    service: "Blindage de porte",
    location: "Asnières",
  },
];

const realizations = [
  {
    id: "1",
    title: "Rénovation complète appartement haussmannien",
    type: "Appartement",
    location: "Paris 8e",
    category: "Rénovation électrique",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
  },
  {
    id: "2",
    title: "Système de contrôle d'accès entreprise",
    type: "Bureaux",
    location: "La Défense",
    category: "Contrôle d'accès",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=800&h=600&fit=crop",
  },
  {
    id: "3",
    title: "Blindage porte d'entrée villa",
    type: "Maison",
    location: "Neuilly-sur-Seine",
    category: "Serrurerie",
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=600&fit=crop",
  },
  {
    id: "4",
    title: "Installation tableau électrique triphasé",
    type: "Local commercial",
    location: "Clichy",
    category: "Électricité",
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&h=600&fit=crop",
  },
  {
    id: "5",
    title: "Interphonie copropriété 24 lots",
    type: "Copropriété",
    location: "Levallois-Perret",
    category: "Contrôle d'accès",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
  },
  {
    id: "6",
    title: "Vidéosurveillance commerce",
    type: "Commerce",
    location: "Asnières",
    category: "Vidéosurveillance",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop",
  },
];

const brands = [
  { name: "Schneider Electric" },
  { name: "Legrand" },
  { name: "Fichet" },
  { name: "Vachette" },
  { name: "Aiphone" },
  { name: "Hikvision" },
];

export default function Home() {
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
                Électricité • Contrôle d&apos;accès • Serrurerie
              </span>

              <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight">
                Votre expert{" "}
                <span className="gradient-text">multi-services</span>{" "}
                en Île-de-France
              </h1>

              <p className="text-xl text-dark-300 mb-8 leading-relaxed">
                Plus de 15 ans d&apos;expertise en électricité, contrôle d&apos;accès et serrurerie.
                Intervention rapide 24h/24, travail soigné et tarifs transparents.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <Link href="/demande-devis" className="btn-primary btn-lg">
                  Demander un devis gratuit
                  <ChevronRight className="w-5 h-5" />
                </Link>
                <Link href="/demande-intervention" className="btn bg-accent-500 text-dark-900 hover:bg-accent-400 btn-lg shadow-lg shadow-accent-500/25 hover:shadow-xl">
                  <DoorOpen className="w-5 h-5" />
                  Urgence 24h/24
                </Link>
              </div>

              <div className="flex flex-wrap items-center gap-6 text-dark-400">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary-500" />
                  <span className="text-sm">Garantie décennale</span>
                </div>
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
                    src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&h=800&fit=crop"
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
                      <p className="font-bold text-dark-900">2500+</p>
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

      {/* 3 Métiers Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionTitle
            badge="Nos Métiers"
            title="3 expertises pour votre sécurité"
            subtitle="Électricité, contrôle d'accès et serrurerie : une offre complète pour sécuriser et équiper vos locaux."
          />

          <div className="grid md:grid-cols-3 gap-8">
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
                  className={`block p-8 rounded-2xl border-2 transition-all hover:shadow-xl group ${
                    category.color === "primary"
                      ? "border-primary-200 hover:border-primary-400 bg-gradient-to-br from-primary-50 to-white"
                      : category.color === "accent"
                      ? "border-accent-200 hover:border-accent-400 bg-gradient-to-br from-accent-50 to-white"
                      : "border-green-200 hover:border-green-400 bg-gradient-to-br from-green-50 to-white"
                  }`}
                >
                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${
                      category.color === "primary"
                        ? "bg-primary-500 text-white"
                        : category.color === "accent"
                        ? "bg-accent-500 text-white"
                        : "bg-green-500 text-white"
                    }`}
                  >
                    <category.icon className="w-8 h-8" />
                  </div>
                  <h3 className="font-display font-bold text-2xl text-dark-900 mb-3">
                    {category.title}
                  </h3>
                  <p className="text-dark-600 mb-4">{category.description}</p>
                  <span
                    className={`inline-flex items-center gap-2 font-semibold ${
                      category.color === "primary"
                        ? "text-primary-600"
                        : category.color === "accent"
                        ? "text-accent-600"
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
            {realizations.map((realization, index) => (
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
            {testimonials.map((testimonial, index) => (
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

      {/* Brands Section */}
      <section className="py-16 bg-white border-t border-b border-dark-100">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <p className="text-dark-500 font-medium">
              Nous travaillons avec les meilleures marques
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-16">
            {brands.map((brand, index) => (
              <motion.div
                key={brand.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="w-28 h-12 relative grayscale hover:grayscale-0 opacity-50 hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                  <span className="text-xl font-bold text-dark-400 group-hover:text-primary-600 transition-colors">
                    {brand.name.split(" ")[0]}
                  </span>
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
                <a href="tel:+33100000000" className="btn-outline">
                  <Phone className="w-5 h-5" />
                  01 XX XX XX XX
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
                    {["Clichy", "Levallois", "Neuilly", "Paris", "La Défense", "Asnières"].map(
                      (city) => (
                        <span
                          key={city}
                          className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm"
                        >
                          {city}
                        </span>
                      )
                    )}
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
              Prêt à démarrer votre projet ?
            </h2>
            <p className="text-xl text-primary-100 mb-10 max-w-2xl mx-auto">
              Contactez-nous dès maintenant pour un devis gratuit et personnalisé.
              Notre équipe vous répond sous 24h.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/demande-devis" className="btn-white btn-lg">
                Demander un devis gratuit
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
