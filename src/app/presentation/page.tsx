"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
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
import { AuroraBackdrop, GradientVeil, NoiseOverlay, ParticlesLite } from "@/components/ui/ambient";
import CertificationsBand from "@/components/marketing/CertificationsBand";
import { image } from "@/lib/image-manifest";

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
      "Intervention rapide, respect des délais. Nous comprenons l'urgence de vos besoins.",
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
    year: "2021",
    title: "Création de S Connect France",
    description:
      "Fondation de l'entreprise en Île-de-France avec une équipe de professionnels passionnés.",
  },
  {
    year: "2022",
    title: "Expansion des services",
    description:
      "Ajout des services de contrôle d'accès et serrurerie à notre offre.",
  },
  {
    year: "2023",
    title: "Qualification IRVE",
    description:
      "Certification pour l'installation de bornes de recharge véhicules électriques.",
  },
  {
    year: "2024",
    title: "Métallerie sur mesure",
    description:
      "Lancement de notre atelier métallerie : portails, portes et structures.",
  },
  {
    year: "2025",
    title: "3000+ interventions",
    description:
      "Cap des 3000 interventions annuelles franchi, une équipe de techniciens qualifiés.",
  },
];

const reasons = [
  "Une entreprise dynamique créée en 2021",
  "4 métiers : électricité, contrôle d'accès, serrurerie, métallerie",
  "Intervention rapide, sous 2h pour les urgences",
  "Devis gratuit et détaillé, sans engagement",
  "Garantie décennale sur tous nos travaux",
  "Certification IRVE pour bornes de recharge",
  "Disponibilité 24h/24, 7j/7 pour les urgences",
  "Matériel de grandes marques (Schneider, Legrand)",
];

export default function PresentationPage() {
  const teamImg = image("team-equipe");
  return (
    <>
      {/* Hero */}
      <section className="relative bg-dark-950 py-20 md:py-28 overflow-hidden">
        <AuroraBackdrop intensity="soft" />
        <div className="absolute inset-0 bg-grid opacity-[0.12]" />
        <NoiseOverlay opacity={0.05} />

        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-300 text-sm font-semibold mb-6 backdrop-blur-sm">
                <Building2 className="w-4 h-4" />
                Notre Entreprise
              </span>
              <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight">
                Votre partenaire{" "}
                <span className="gradient-text-living">multi-services</span> de confiance
              </h1>
              <p className="text-xl text-dark-300 leading-relaxed mb-8">
                Depuis 2021, S Connect France accompagne les particuliers et
                professionnels d&apos;Île-de-France dans tous leurs projets :
                électricité, contrôle d&apos;accès, serrurerie et métallerie.
              </p>
              <div className="flex flex-wrap gap-6 text-dark-400">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary-400" />
                  <span>Depuis 2021</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-accent-400" />
                  <span>Équipe qualifiée</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-emerald-400" />
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
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 shadow-2xl group">
                <Image
                  src={teamImg.webp}
                  alt={teamImg.alt}
                  fill
                  sizes="(max-width: 1024px) 0px, 50vw"
                  className="object-cover transition-transform duration-[2s] ease-out group-hover:scale-[1.06]"
                  placeholder="blur"
                  blurDataURL={teamImg.blurDataURL}
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-dark-950/70 via-transparent to-transparent" />
                <div className="absolute inset-0 gradient-veil-cool opacity-25 mix-blend-overlay" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Notre histoire */}
      <section className="section-padding bg-surface">
        <div className="container-custom">
          <SectionTitle
            badge="Notre Histoire"
            title="Une entreprise en pleine croissance"
            subtitle="De notre création en 2021 à aujourd'hui, découvrez les étapes clés de notre développement."
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
                    <h3 className="font-display font-bold text-xl text-foreground mb-2">
                      {item.title}
                    </h3>
                    <p className="text-foreground-muted">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Nos valeurs */}
      <section className="section-padding bg-surface-muted">
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
                <h3 className="font-display font-bold text-xl text-foreground mb-3">
                  {value.title}
                </h3>
                <p className="text-foreground-muted">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications — shared showcase band */}
      <CertificationsBand background="surface" />

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
      <section className="section-padding bg-surface">
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
              <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-6">
                Basés à Clichy, nous rayonnons sur toute l&apos;Île-de-France
              </h2>
              <p className="text-lg text-foreground-muted mb-6 leading-relaxed">
                Notre siège est situé à Clichy (92110), au cœur des Hauts-de-Seine.
                Nous intervenons rapidement dans tout le département et au-delà,
                couvrant l&apos;ensemble de la région parisienne.
              </p>
              <div className="space-y-3 mb-8">
                <p className="font-semibold text-foreground">
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
                      className="px-3 py-1 bg-surface-muted rounded-full text-foreground text-sm border border-border"
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
                <a href="tel:+33652820685" className="btn-outline">
                  <Phone className="w-5 h-5" />
                  06 52 82 06 85
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl group"
            >
              <Image
                src={image("zone-clichy").webp}
                alt={image("zone-clichy").alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-[2s] ease-out group-hover:scale-[1.06]"
                placeholder="blur"
                blurDataURL={image("zone-clichy").blurDataURL}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-900/80 via-primary-900/20 to-transparent" />
              <div className="absolute inset-0 gradient-veil-cool opacity-30 mix-blend-overlay" />
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
              Prêt à travailler avec nous ?
            </h2>
            <p className="text-xl text-primary-100 mb-10 max-w-2xl mx-auto">
              Contactez-nous pour discuter de votre projet.
              Devis gratuit et sans engagement.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/demande-devis" className="btn-white btn-lg">
                Demander un devis
                <ChevronRight className="w-5 h-5" />
              </Link>
              <Link href="/contact" className="btn glass-panel text-white hover:bg-white/15 btn-lg">
                Nous contacter
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

