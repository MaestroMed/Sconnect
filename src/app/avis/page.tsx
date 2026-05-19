"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, ChevronRight, Phone, Quote, Filter, TrendingUp } from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";
import { AuroraBackdrop, GradientVeil, NoiseOverlay, ParticlesLite } from "@/components/ui/ambient";
import BulbText from "@/components/ui/BulbText";

const stats = {
  average: 4.9,
  total: 127,
  distribution: [
    { stars: 5, count: 112, percentage: 88 },
    { stars: 4, count: 11, percentage: 9 },
    { stars: 3, count: 3, percentage: 2 },
    { stars: 2, count: 1, percentage: 1 },
    { stars: 1, count: 0, percentage: 0 },
  ],
};

const testimonials = [
  {
    id: 1,
    name: "Marie L.",
    rating: 5,
    date: "Novembre 2024",
    text: "Intervention rapide et efficace pour une panne générale en soirée. L'électricien était très professionnel et a pris le temps de m'expliquer le problème. Prix correct et travail propre. Je recommande vivement !",
    service: "Dépannage",
    location: "Clichy",
    verified: true,
  },
  {
    id: 2,
    name: "Jean-Pierre D.",
    rating: 5,
    date: "Novembre 2024",
    text: "Rénovation complète de l'électricité de notre appartement de 80m². Travail impeccable, respect des délais et équipe très sympathique. Le devis était clair et sans surprise. Le chantier a été laissé propre chaque soir.",
    service: "Rénovation",
    location: "Levallois-Perret",
    verified: true,
  },
  {
    id: 3,
    name: "Sophie M.",
    rating: 5,
    date: "Octobre 2024",
    text: "Mise aux normes de notre tableau électrique réalisée avec professionnalisme. Les techniciens ont été très pédagogues, m'expliquant chaque étape. Le chantier parfaitement propre à la fin et la conformité Consuel obtenue rapidement.",
    service: "Mise aux normes",
    location: "Neuilly-sur-Seine",
    verified: true,
  },
  {
    id: 4,
    name: "Restaurant Le Gourmet",
    rating: 5,
    date: "Octobre 2024",
    text: "S Connect France gère toute notre maintenance électrique depuis 3 ans. Réactivité exemplaire et interventions toujours de qualité. Ils comprennent les contraintes d'un restaurant et interviennent souvent tôt le matin. Un vrai partenaire de confiance.",
    service: "Maintenance",
    location: "Paris 17e",
    verified: true,
  },
  {
    id: 5,
    name: "Thomas R.",
    rating: 5,
    date: "Octobre 2024",
    text: "Installation d'une borne de recharge pour ma voiture électrique. Très bon conseil sur le choix du modèle, installation soignée et mise en service rapide. Le technicien m'a bien expliqué le fonctionnement. Parfait !",
    service: "Installation",
    location: "Saint-Cloud",
    verified: true,
  },
  {
    id: 6,
    name: "Copropriété Résidence Les Tilleuls",
    rating: 5,
    date: "Septembre 2024",
    text: "Refonte complète de l'éclairage des parties communes avec passage en LED. Travaux réalisés proprement, bon relationnel avec les copropriétaires et respect du planning. Les économies d'énergie sont déjà visibles !",
    service: "Rénovation",
    location: "Clichy",
    verified: true,
  },
  {
    id: 7,
    name: "Isabelle G.",
    rating: 4,
    date: "Septembre 2024",
    text: "Bonne intervention pour l'installation de notre système domotique. Le technicien était compétent. Petit retard le premier jour mais tout a été rattrapé. Résultat conforme à nos attentes.",
    service: "Domotique",
    location: "Boulogne",
    verified: true,
  },
  {
    id: 8,
    name: "Cabinet Médical Dr. Martin",
    rating: 5,
    date: "Août 2024",
    text: "Intervention pour mise en conformité de notre cabinet médical. Travaux réalisés avec soin et discrétion pour ne pas perturber les consultations. Équipe très professionnelle, je recommande pour les locaux professionnels.",
    service: "Mise aux normes",
    location: "Paris 16e",
    verified: true,
  },
  {
    id: 9,
    name: "Laurent B.",
    rating: 5,
    date: "Août 2024",
    text: "Dépannage en urgence un dimanche soir. L'électricien est arrivé en moins d'une heure et a résolu le problème rapidement. Certes le tarif dimanche est majoré, mais c'est normal et c'était indiqué au téléphone. Très satisfait.",
    service: "Dépannage",
    location: "Asnières",
    verified: true,
  },
  {
    id: 10,
    name: "Caroline F.",
    rating: 5,
    date: "Juillet 2024",
    text: "Installation complète de notre maison neuve. De la conception à la réalisation, tout a été parfait. L'équipe a su s'adapter à nos demandes de dernière minute. Le résultat est exactement ce que nous voulions.",
    service: "Installation",
    location: "Colombes",
    verified: true,
  },
  {
    id: 11,
    name: "Boutique Mode & Style",
    rating: 5,
    date: "Juillet 2024",
    text: "Rénovation électrique de notre boutique avec création d'un éclairage valorisant nos produits. Le rendu est superbe et nos clients le remarquent. Merci à l'équipe pour leurs conseils avisés !",
    service: "Rénovation",
    location: "Paris 9e",
    verified: true,
  },
  {
    id: 12,
    name: "Philippe M.",
    rating: 4,
    date: "Juin 2024",
    text: "Bonne prestation pour la rénovation du tableau électrique. Travail conforme au devis. Petit bémol sur la communication pendant les travaux mais le résultat final est là.",
    service: "Mise aux normes",
    location: "Puteaux",
    verified: true,
  },
];

const filterOptions = ["Tous", "Dépannage", "Rénovation", "Installation", "Mise aux normes", "Domotique", "Maintenance"];

export default function AvisPage() {
  const [activeFilter, setActiveFilter] = useState("Tous");
  const [visibleCount, setVisibleCount] = useState(6);

  const filteredTestimonials =
    activeFilter === "Tous"
      ? testimonials
      : testimonials.filter((t) => t.service === activeFilter);

  const visibleTestimonials = filteredTestimonials.slice(0, visibleCount);

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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-300 text-sm font-semibold mb-6 backdrop-blur-sm">
                <Star className="w-4 h-4 fill-primary-300" />
                Avis Clients
              </span>
              <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight">
                Ce que disent{" "}
                <BulbText>nos clients</BulbText>
              </h1>
              <p className="text-xl text-dark-300 leading-relaxed">
                La satisfaction de nos clients est notre meilleure publicité.
                Découvrez leurs témoignages authentiques.
              </p>
            </motion.div>

            {/* Stats Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-surface-elevated rounded-3xl p-8 shadow-2xl border border-border"
            >
              <div className="flex items-center gap-6 mb-6">
                <div className="text-center">
                  <div className="font-display font-bold text-5xl text-foreground">
                    {stats.average}
                  </div>
                  <div className="flex gap-1 mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-accent-400 fill-accent-400"
                      />
                    ))}
                  </div>
                </div>
                <div className="h-16 w-px bg-border" />
                <div>
                  <div className="font-bold text-2xl text-foreground">
                    {stats.total} avis
                  </div>
                  <div className="text-foreground-muted">clients vérifiés</div>
                </div>
              </div>

              <div className="space-y-3">
                {stats.distribution.map((item) => (
                  <div key={item.stars} className="flex items-center gap-3">
                    <div className="flex items-center gap-1 w-16">
                      <span className="text-sm text-foreground-muted">{item.stars}</span>
                      <Star className="w-4 h-4 text-accent-400 fill-accent-400" />
                    </div>
                    <div className="flex-1 h-2 bg-surface-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${item.percentage}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-full bg-gradient-to-r from-primary-500 to-electric-500 rounded-full"
                      />
                    </div>
                    <span className="text-sm text-foreground-muted w-12 text-right">
                      {item.count}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-surface">
        <div className="container-custom">
          {/* Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {filterOptions.map((filter) => (
              <button
                key={filter}
                onClick={() => {
                  setActiveFilter(filter);
                  setVisibleCount(6);
                }}
                className={`px-5 py-2.5 rounded-full font-medium transition-all duration-300 ${
                  activeFilter === filter
                    ? "bg-primary-600 text-white shadow-lg shadow-primary-500/25"
                    : "bg-surface-muted text-foreground-muted hover:bg-surface-elevated border border-border"
                }`}
              >
                {filter}
              </button>
            ))}
          </motion.div>

          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleTestimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="card p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <Quote className="w-10 h-10 text-primary-200 dark:text-primary-500/40" />
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < testimonial.rating
                            ? "text-accent-400 fill-accent-400"
                            : "text-border"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-foreground leading-relaxed mb-6">
                  {testimonial.text}
                </p>
                <div className="pt-4 border-t border-border">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-foreground">
                          {testimonial.name}
                        </p>
                        {testimonial.verified && (
                          <span className="text-xs text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-500/10 px-2 py-0.5 rounded-full">
                            Vérifié
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-foreground-muted">
                        {testimonial.location} • {testimonial.date}
                      </p>
                    </div>
                    <span className="badge-primary text-xs">
                      {testimonial.service}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Load More */}
          {visibleCount < filteredTestimonials.length && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-12 text-center"
            >
              <button
                onClick={() => setVisibleCount((prev) => prev + 6)}
                className="btn-outline"
              >
                Voir plus d&apos;avis
                <ChevronRight className="w-5 h-5" />
              </button>
            </motion.div>
          )}

          {filteredTestimonials.length === 0 && (
            <p className="text-center text-foreground-muted py-12">
              Aucun avis dans cette catégorie pour le moment.
            </p>
          )}
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
              Rejoignez nos clients satisfaits
            </h2>
            <p className="text-xl text-primary-100 mb-10 max-w-2xl mx-auto">
              Demandez votre devis gratuit et découvrez pourquoi nos clients
              nous recommandent.
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

