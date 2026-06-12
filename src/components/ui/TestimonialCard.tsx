"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Star, Quote } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  rating: number;
  text: string;
  service: string;
  location?: string;
  index?: number;
}

export default function TestimonialCard({
  name,
  rating,
  text,
  service,
  location,
  index = 0,
}: TestimonialCardProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 30 }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: "-10% 0px" }}
      whileHover={reduce ? undefined : { y: -4 }}
      className="group relative rounded-2xl border border-border bg-surface-elevated/80 p-6 md:p-8 h-full flex flex-col backdrop-blur-sm shadow-lg shadow-dark-900/5 dark:shadow-black/30 transition-all duration-300 hover:shadow-xl hover:border-primary-200 dark:hover:border-primary-700"
    >
      <div className="flex items-start justify-between mb-4">
        <Quote className="w-10 h-10 text-primary-200 dark:text-primary-500/40" />
        {/* Note en étoiles : alternative textuelle pour les lecteurs d'écran,
            les icônes étant purement décoratives. */}
        <div className="flex gap-1" role="img" aria-label={`Note : ${rating} sur 5`}>
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              aria-hidden="true"
              className={`w-5 h-5 ${
                i < rating
                  ? "text-accent-400 fill-accent-400"
                  : "text-border"
              }`}
            />
          ))}
        </div>
      </div>
      <p className="text-foreground leading-relaxed flex-grow mb-6">{text}</p>
      <div className="pt-4 border-t border-border">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div className="min-w-0">
            <p className="font-semibold text-foreground whitespace-nowrap">{name}</p>
            {location && (
              <p className="text-sm text-foreground-muted">{location}</p>
            )}
          </div>
          <span className="badge-primary whitespace-nowrap">{service}</span>
        </div>
      </div>
    </motion.div>
  );
}
