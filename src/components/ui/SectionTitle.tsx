"use client";

import { motion } from "framer-motion";

interface SectionTitleProps {
  badge?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

export default function SectionTitle({
  badge,
  title,
  subtitle,
  centered = true,
  light = false,
}: SectionTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className={`mb-12 md:mb-16 ${centered ? "text-center" : ""}`}
    >
      {badge && (
        <span
          className={`inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4 ${
            light
              ? "bg-white/10 text-white"
              : "bg-primary-100 text-primary-700 dark:bg-primary-500/15 dark:text-primary-300"
          }`}
        >
          {badge}
        </span>
      )}
      <h2
        className={`font-display font-bold text-3xl md:text-4xl lg:text-5xl mb-4 text-balance ${
          light ? "text-white" : "text-foreground"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`text-lg md:text-xl max-w-3xl leading-relaxed ${
            centered ? "mx-auto" : ""
          } ${
            // WCAG AAA: bumped from text-foreground-muted (~4.5:1) to
            // slate-700 / slate-300 (~7.6:1) so subtitles read clearly
            // even on overlaid gradients.
            light ? "text-white/85" : "text-slate-700 dark:text-slate-300"
          }`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

