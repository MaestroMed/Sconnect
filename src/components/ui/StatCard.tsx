"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  icon: LucideIcon;
  index?: number;
}

/**
 * Static stat readout. Previous version animated count-up from 0 → value over
 * 1.8s, which during scroll exposed intermediate frames like "57% clients
 * satisfaits" or "2 ans d'expérience" — a brand-damaging artifact for a trust
 * signal block. SSR + JS-off fallback also showed "0% satisfaits". The
 * solution is to render the final number directly: it's correct on first
 * paint, indexable by Googlebot, and visually punctuated by a fade + scale
 * intro that's just as alive but never wrong.
 *
 * `font-variant-numeric: tabular-nums` keeps the width stable in case we
 * reintroduce a counter in the future.
 */
export default function StatCard({
  value,
  suffix = "",
  prefix = "",
  label,
  icon: Icon,
  index = 0,
}: StatCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.92 }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      className="text-center group"
    >
      <div className="relative inline-flex items-center justify-center mb-4">
        <div className="absolute w-20 h-20 bg-primary-500/10 rounded-full group-hover:scale-125 transition-transform duration-500" />
        <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-electric-500 rounded-2xl flex items-center justify-center shadow-lg shadow-primary-500/25 group-hover:shadow-xl group-hover:shadow-primary-500/35 transition-all duration-300">
          <Icon className="w-8 h-8 text-white" />
        </div>
      </div>
      <div
        className="font-display font-bold text-4xl md:text-5xl text-white mb-2"
        style={{ fontVariantNumeric: "tabular-nums" }}
      >
        {prefix}
        {value.toLocaleString("fr-FR")}
        {suffix}
      </div>
      <p className="text-dark-300 font-medium">{label}</p>
    </motion.div>
  );
}

