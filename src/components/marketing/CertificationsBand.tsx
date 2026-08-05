"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Award, Shield, Zap, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";
import { Spotlight } from "@/components/ui/ambient";

/**
 * A certification has an optional `logo` path under /public/images/certifications/.
 * If the file is missing (or the request fails), we fall back to a styled
 * icon-based card — so we can ship the component before the client sends
 * the official PNG/SVG logos.
 */
interface Certification {
  slug: string;
  name: string;
  description: string;
  icon: typeof Shield;
  /** Path under /public — optional. */
  logo?: string;
  /** Brand colour token for the icon gradient. */
  color: "primary" | "emerald" | "accent" | "orange";
}

// Pas de prop `logo` tant que les PNG officiels ne sont pas déposés dans
// /public/images/certifications/ : chaque visiteur payait 4 HEAD 404 avant de
// retomber sur l'icône. Ré-ajouter `logo: "/images/certifications/<slug>.png"`
// quand les fichiers seront livrés — le fallback icône reste en place.
const CERTIFICATIONS: Certification[] = [
  {
    slug: "qualifelec",
    name: "Qualifélec",
    description: "Qualification des entreprises d'électricité",
    icon: Award,
    color: "primary",
  },
  {
    slug: "rge",
    name: "RGE",
    description: "Reconnu Garant de l'Environnement",
    icon: Shield,
    color: "emerald",
  },
  {
    slug: "irve",
    name: "IRVE",
    description: "Installation de bornes de recharge VE",
    icon: Zap,
    color: "accent",
  },
  {
    slug: "decennale",
    name: "Garantie Décennale",
    description: "Protection de vos travaux pendant 10 ans",
    icon: CheckCircle2,
    color: "orange",
  },
];

const COLOR_MAP = {
  primary: {
    icon: "from-primary-500 to-electric-500",
    shadow: "shadow-primary-500/25",
    ring: "ring-primary-200 dark:ring-primary-500/30",
    text: "text-primary-600 dark:text-primary-300",
  },
  emerald: {
    icon: "from-emerald-500 to-teal-400",
    shadow: "shadow-emerald-500/25",
    ring: "ring-emerald-200 dark:ring-emerald-500/30",
    text: "text-emerald-600 dark:text-emerald-300",
  },
  accent: {
    icon: "from-accent-500 to-amber-400",
    shadow: "shadow-accent-500/25",
    ring: "ring-accent-200 dark:ring-accent-500/30",
    text: "text-accent-600 dark:text-accent-300",
  },
  orange: {
    icon: "from-orange-500 to-rose-500",
    shadow: "shadow-orange-500/25",
    ring: "ring-orange-200 dark:ring-orange-500/30",
    text: "text-orange-600 dark:text-orange-300",
  },
};

/**
 * CertificationCard — tries the official logo first, falls back to a
 * gradient-icon card (same layout) when the image 404s.
 */
function CertificationCard({ cert, index }: { cert: Certification; index: number }) {
  const cc = COLOR_MAP[cert.color];
  const [logoOk, setLogoOk] = useState(Boolean(cert.logo));

  // Test if the logo path exists at mount — if not, fall back immediately so
  // we never try to render <Image> and trigger a Next.js 404.
  useEffect(() => {
    if (!cert.logo) return;
    let alive = true;
    fetch(cert.logo, { method: "HEAD" })
      .then((r) => alive && setLogoOk(r.ok))
      .catch(() => alive && setLogoOk(false));
    return () => {
      alive = false;
    };
  }, [cert.logo]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      viewport={{ once: true }}
    >
      <Spotlight className="h-full rounded-2xl">
        <div className={`card p-6 h-full text-center transition-all hover:-translate-y-1 hover:shadow-xl ring-1 ${cc.ring}`}>
          {logoOk && cert.logo ? (
            <div className="relative w-20 h-20 mx-auto mb-4">
              <Image
                src={cert.logo}
                alt={`Logo ${cert.name}`}
                fill
                sizes="80px"
                className="object-contain"
                onError={() => setLogoOk(false)}
              />
            </div>
          ) : (
            <div className={`w-20 h-20 mx-auto bg-gradient-to-br ${cc.icon} rounded-2xl flex items-center justify-center mb-4 shadow-xl ${cc.shadow}`}>
              <cert.icon className="w-10 h-10 text-white" />
            </div>
          )}
          <h3 className={`font-display font-bold text-xl mb-1 ${cc.text}`}>{cert.name}</h3>
          <p className="text-foreground-muted text-sm">{cert.description}</p>
        </div>
      </Spotlight>
    </motion.div>
  );
}

interface CertificationsBandProps {
  /** Compact variant — no section padding, no heading, used as inline band. */
  compact?: boolean;
  /** Background style. Default: 'muted' (bg-surface-muted). */
  background?: "surface" | "muted";
}

export default function CertificationsBand({ compact = false, background = "muted" }: CertificationsBandProps) {
  const bg = background === "surface" ? "bg-surface" : "bg-surface-muted";

  return (
    <section className={compact ? bg : `${bg} section-padding`}>
      <div className="container-custom">
        {!compact && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4 bg-primary-100 text-primary-700 dark:bg-primary-500/15 dark:text-primary-300">
              Certifications
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-3">
              Des qualifications reconnues
            </h2>
            <p className="text-foreground-muted max-w-2xl mx-auto">
              Nos certifications attestent de notre expertise et de notre engagement
              qualité envers vous.
            </p>
          </motion.div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {CERTIFICATIONS.map((cert, i) => (
            <CertificationCard key={cert.slug} cert={cert} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
