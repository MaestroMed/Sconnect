"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, ChevronRight, Phone, Quote } from "lucide-react";
import { AuroraBackdrop, GradientVeil, NoiseOverlay, ParticlesLite } from "@/components/ui/ambient";
import BulbText from "@/components/ui/BulbText";
import { stats, testimonials, filterOptions } from "./data";

export default function AvisClient() {
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
      <section className="section-padding bg-surface overflow-x-clip">
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
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-semibold text-foreground whitespace-nowrap">
                          {testimonial.name}
                        </p>
                        {testimonial.verified && (
                          <span className="text-xs text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-500/10 px-2 py-0.5 rounded-full whitespace-nowrap">
                            Vérifié
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-foreground-muted">
                        {testimonial.location} • {testimonial.date}
                      </p>
                    </div>
                    <span className="badge-primary text-xs whitespace-nowrap">
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
