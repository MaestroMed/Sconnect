"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Zap,
  Award,
  Shield,
  Users,
  Clock,
  Target,
  Heart,
  CheckCircle2,
  ChevronRight,
  Phone,
  Calendar,
  Building2,
  MapPin,
} from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";

const values = [
  {
    icon: Shield,
    title: "Professionnalisme",
    description:
      "Nos électriciens sont formés aux dernières normes et techniques. Chaque intervention est réalisée dans les règles de l'art.",
  },
  {
    icon: Heart,
    title: "Transparence",
    description:
      "Devis détaillés, prix clairs, aucune surprise. Nous vous expliquons chaque étape avant de commencer.",
  },
  {
    icon: Clock,
    title: "Réactivité",
    description:
      "Intervention rapide, respect des délais. Nous comprenons l'urgence de vos besoins électriques.",
  },
  {
    icon: Target,
    title: "Excellence",
    description:
      "Matériaux de qualité, finitions soignées. Nous visons la satisfaction totale de nos clients.",
  },
];

const timeline = [
  {
    year: "2009",
    title: "Création de S Connect France",
    description:
      "Fondation de l'entreprise à Clichy avec une équipe de 2 électriciens passionnés.",
  },
  {
    year: "2012",
    title: "Certification Qualifelec",
    description:
      "Obtention de la qualification professionnelle, gage de notre expertise.",
  },
  {
    year: "2015",
    title: "Expansion régionale",
    description:
      "Extension de notre zone d'intervention à l'ensemble des Hauts-de-Seine.",
  },
  {
    year: "2018",
    title: "Certification RGE",
    description:
      "Qualification pour les travaux de rénovation énergétique, ouvrant droit aux aides de l'État.",
  },
  {
    year: "2021",
    title: "Qualification IRVE",
    description:
      "Certification pour l'installation de bornes de recharge véhicules électriques.",
  },
  {
    year: "2024",
    title: "15 ans d'excellence",
    description:
      "Plus de 25 000 interventions réalisées, une équipe de 12 techniciens qualifiés.",
  },
];

const certifications = [
  {
    name: "Qualifelec",
    description: "Qualification des entreprises d'électricité",
    icon: Award,
  },
  {
    name: "RGE",
    description: "Reconnu Garant de l'Environnement",
    icon: Shield,
  },
  {
    name: "IRVE",
    description: "Infrastructure de Recharge Véhicules Électriques",
    icon: Zap,
  },
  {
    name: "Garantie Décennale",
    description: "Protection de vos travaux pendant 10 ans",
    icon: Shield,
  },
];

const reasons = [
  "Plus de 15 ans d'expérience en électricité",
  "Équipe de 12 techniciens qualifiés et formés",
  "Intervention rapide, sous 2h pour les urgences",
  "Devis gratuit et détaillé, sans engagement",
  "Garantie décennale sur tous nos travaux",
  "Certifications Qualifelec, RGE et IRVE",
  "Disponibilité 24h/24, 7j/7 pour les urgences",
  "Matériel de grandes marques (Schneider, Legrand)",
];

export default function PresentationPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-dark-900 via-dark-950 to-primary-950 py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-electric-500/20 rounded-full blur-3xl" />

        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-semibold mb-6">
                <Building2 className="w-4 h-4" />
                Notre Entreprise
              </span>
              <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-6">
                Votre partenaire{" "}
                <span className="gradient-text">électricité</span> de confiance
              </h1>
              <p className="text-xl text-dark-300 leading-relaxed mb-8">
                Depuis 2009, S Connect France accompagne les particuliers et
                professionnels d&apos;Île-de-France dans tous leurs projets
                électriques. Notre engagement : qualité, sécurité et satisfaction.
              </p>
              <div className="flex flex-wrap gap-6 text-dark-400">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary-500" />
                  <span>Depuis 2009</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-accent-500" />
                  <span>12 techniciens</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-green-500" />
                  <span>Clichy (92)</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=800&h=600&fit=crop"
                  alt="Équipe S Connect France"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Notre histoire */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionTitle
            badge="Notre Histoire"
            title="15 ans au service de votre électricité"
            subtitle="De notre création à aujourd'hui, découvrez les étapes clés de notre développement."
          />

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 via-electric-500 to-primary-500" />

            <div className="space-y-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`relative flex items-center gap-8 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 -ml-2 bg-primary-500 rounded-full border-4 border-white shadow-lg z-10" />

                  {/* Content */}
                  <div
                    className={`ml-12 md:ml-0 md:w-1/2 ${
                      index % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"
                    }`}
                  >
                    <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 font-bold rounded-full text-sm mb-2">
                      {item.year}
                    </span>
                    <h3 className="font-display font-bold text-xl text-dark-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-dark-600">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Nos valeurs */}
      <section className="section-padding bg-dark-50">
        <div className="container-custom">
          <SectionTitle
            badge="Nos Valeurs"
            title="Ce qui nous anime au quotidien"
            subtitle="Quatre piliers fondamentaux guident chacune de nos interventions."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card p-6 text-center"
              >
                <div className="w-14 h-14 mx-auto bg-gradient-to-br from-primary-500 to-electric-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-primary-500/25">
                  <value.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-display font-bold text-xl text-dark-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-dark-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionTitle
            badge="Certifications"
            title="Des qualifications reconnues"
            subtitle="Nos certifications attestent de notre expertise et de notre engagement qualité."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card p-6 text-center border-2 border-primary-100 hover:border-primary-300 transition-colors"
              >
                <div className="w-16 h-16 mx-auto bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <cert.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="font-display font-bold text-lg text-dark-900 mb-1">
                  {cert.name}
                </h3>
                <p className="text-sm text-dark-500">{cert.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pourquoi nous choisir */}
      <section className="section-padding bg-gradient-to-br from-primary-600 to-electric-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div className="container-custom relative z-10">
          <SectionTitle
            badge="Pourquoi nous ?"
            title="8 bonnes raisons de nous faire confiance"
            light
          />

          <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {reasons.map((reason, index) => (
              <motion.div
                key={reason}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-4"
              >
                <CheckCircle2 className="w-6 h-6 text-accent-400 shrink-0" />
                <span className="text-white font-medium">{reason}</span>
              </motion.div>
            ))}
          </div>
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
                Basés à Clichy, nous rayonnons sur toute l&apos;Île-de-France
              </h2>
              <p className="text-lg text-dark-600 mb-6 leading-relaxed">
                Notre siège est situé à Clichy (92110), au cœur des Hauts-de-Seine.
                Nous intervenons rapidement dans tout le département et au-delà,
                couvrant l&apos;ensemble de la région parisienne.
              </p>
              <div className="space-y-3 mb-8">
                <p className="font-semibold text-dark-900">
                  Secteurs d&apos;intervention prioritaires :
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Clichy",
                    "Levallois-Perret",
                    "Neuilly-sur-Seine",
                    "Asnières-sur-Seine",
                    "Courbevoie",
                    "La Défense",
                    "Puteaux",
                    "Nanterre",
                    "Paris",
                    "Saint-Ouen",
                  ].map((city) => (
                    <span
                      key={city}
                      className="px-3 py-1 bg-dark-100 rounded-full text-dark-700 text-sm"
                    >
                      {city}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact" className="btn-primary">
                  Nous contacter
                  <ChevronRight className="w-5 h-5" />
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
              className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl"
            >
              <Image
                src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=800&fit=crop"
                alt="Paris et Île-de-France"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-900/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <p className="text-white text-xl font-display font-bold">
                  Intervention rapide en Île-de-France
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-dark-900">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-6">
              Prêt à travailler avec nous ?
            </h2>
            <p className="text-xl text-dark-300 mb-10 max-w-2xl mx-auto">
              Contactez-nous pour discuter de votre projet électrique.
              Devis gratuit et sans engagement.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/demande-devis" className="btn-primary btn-lg">
                Demander un devis
                <ChevronRight className="w-5 h-5" />
              </Link>
              <Link href="/contact" className="btn-outline btn-lg text-white border-white hover:bg-white hover:text-dark-900">
                Nous contacter
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

