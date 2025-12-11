"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Filter, Phone } from "lucide-react";
import RealizationCard from "@/components/ui/RealizationCard";
import SectionTitle from "@/components/ui/SectionTitle";

const categories = [
  "Tous",
  "Installation",
  "Rénovation",
  "Dépannage",
  "Domotique",
  "Mise aux normes",
];

const realizations = [
  {
    id: "1",
    title: "Rénovation complète appartement haussmannien",
    type: "Appartement",
    location: "Paris 8e",
    category: "Rénovation",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
    description: "Réfection totale de l'installation électrique d'un appartement de 120m² avec mise aux normes et création de 45 points lumineux.",
  },
  {
    id: "2",
    title: "Installation tableau électrique triphasé",
    type: "Local commercial",
    location: "Clichy",
    category: "Installation",
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&h=600&fit=crop",
    description: "Installation complète d'un tableau triphasé 60A pour un restaurant avec circuits spécialisés cuisine professionnelle.",
  },
  {
    id: "3",
    title: "Domotique villa avec scénarios lumineux",
    type: "Maison",
    location: "Neuilly-sur-Seine",
    category: "Domotique",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=800&h=600&fit=crop",
    description: "Installation d'un système domotique complet : éclairage connecté, volets automatisés et thermostat intelligent.",
  },
  {
    id: "4",
    title: "Mise aux normes copropriété 12 lots",
    type: "Copropriété",
    location: "Levallois-Perret",
    category: "Mise aux normes",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
    description: "Mise en conformité des parties communes : éclairage de sécurité, tableau général et colonnes montantes.",
  },
  {
    id: "5",
    title: "Installation électrique bureaux 200m²",
    type: "Bureaux",
    location: "La Défense",
    category: "Installation",
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=600&fit=crop",
    description: "Aménagement électrique complet pour un open space : 80 prises réseau, éclairage LED et climatisation.",
  },
  {
    id: "6",
    title: "Câblage fibre et réseau restaurant",
    type: "Restaurant",
    location: "Paris 17e",
    category: "Domotique",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop",
    description: "Installation fibre optique, câblage RJ45 pour caisse et TPE, réseau wifi pro et système de réservation.",
  },
  {
    id: "7",
    title: "Dépannage urgence boulangerie",
    type: "Commerce",
    location: "Asnières",
    category: "Dépannage",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&h=600&fit=crop",
    description: "Intervention en urgence à 5h du matin pour panne générale. Remplacement du disjoncteur principal et remise en service en 2h.",
  },
  {
    id: "8",
    title: "Rénovation électrique pavillon années 70",
    type: "Maison",
    location: "Colombes",
    category: "Rénovation",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
    description: "Refonte complète de l'installation vétuste : nouveau tableau 4 rangées, protection différentielle 30mA et mise à la terre.",
  },
  {
    id: "9",
    title: "Installation borne de recharge Tesla",
    type: "Maison",
    location: "Saint-Cloud",
    category: "Installation",
    image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&h=600&fit=crop",
    description: "Installation d'une borne Wall Connector Tesla 22kW avec adaptation du tableau et ligne dédiée 10mm².",
  },
  {
    id: "10",
    title: "Mise aux normes appartement location",
    type: "Appartement",
    location: "Clichy",
    category: "Mise aux normes",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
    description: "Mise en conformité avant location : remplacement du tableau, ajout différentiel et reprise des circuits défectueux.",
  },
  {
    id: "11",
    title: "Dépannage court-circuit immeuble",
    type: "Copropriété",
    location: "Boulogne",
    category: "Dépannage",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",
    description: "Recherche et réparation d'un court-circuit dans les parties communes. Intervention dimanche soir, remise en service 1h30.",
  },
  {
    id: "12",
    title: "Installation vidéosurveillance boutique",
    type: "Commerce",
    location: "Paris 9e",
    category: "Domotique",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
    description: "Installation de 6 caméras IP HD, enregistreur NVR et application smartphone pour surveillance à distance.",
  },
];

export default function RealisationsPage() {
  const [activeCategory, setActiveCategory] = useState("Tous");

  const filteredRealizations =
    activeCategory === "Tous"
      ? realizations
      : realizations.filter((r) => r.category === activeCategory);

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-dark-900 via-dark-950 to-primary-950 py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-electric-500/20 rounded-full blur-3xl" />

        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-semibold mb-6">
                <Filter className="w-4 h-4" />
                Nos Réalisations
              </span>
              <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-6">
                Découvrez nos{" "}
                <span className="gradient-text">derniers chantiers</span>
              </h1>
              <p className="text-xl text-dark-300 leading-relaxed">
                Un aperçu de notre savoir-faire à travers des projets variés :
                installations neuves, rénovations, dépannages et solutions connectées.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Filters & Grid */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          {/* Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2.5 rounded-full font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-primary-600 text-white shadow-lg shadow-primary-500/25"
                    : "bg-dark-100 text-dark-600 hover:bg-dark-200"
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>

          {/* Grid */}
          <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <AnimatePresence mode="popLayout">
              {filteredRealizations.map((realization, index) => (
                <motion.div
                  key={realization.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <RealizationCard {...realization} index={index} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredRealizations.length === 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-dark-500 py-12"
            >
              Aucune réalisation dans cette catégorie pour le moment.
            </motion.p>
          )}
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
              Vous avez un projet similaire ?
            </h2>
            <p className="text-xl text-primary-100 mb-10 max-w-2xl mx-auto">
              Contactez-nous pour discuter de votre projet. Nous vous proposerons
              une solution adaptée à vos besoins et votre budget.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/demande-devis" className="btn-white btn-lg">
                Demander un devis
                <ChevronRight className="w-5 h-5" />
              </Link>
              <a
                href="tel:+33100000000"
                className="btn bg-white/10 text-white hover:bg-white/20 btn-lg border border-white/20"
              >
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

