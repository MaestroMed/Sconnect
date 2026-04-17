"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, Sparkles, Zap, KeyRound, Lock, Wrench } from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { AuroraBackdrop, NoiseOverlay } from "@/components/ui/ambient";
import { image as getImage } from "@/lib/image-manifest";

const iconMap = {
  zap: Zap,
  keyRound: KeyRound,
  lock: Lock,
  wrench: Wrench,
} as const;

type IconKey = keyof typeof iconMap;

type Category = "electricite" | "acces" | "serrurerie" | "metallerie";

const THEME = {
  electricite: {
    iconGradient: "from-primary-500 to-electric-500",
    iconShadow: "shadow-primary-500/30",
    orb1: "bg-primary-500/30",
    orb2: "bg-electric-500/25",
    veil: "cool" as const,
    chip: "Devis gratuit",
  },
  acces: {
    iconGradient: "from-accent-500 to-amber-400",
    iconShadow: "shadow-accent-500/30",
    orb1: "bg-accent-500/30",
    orb2: "bg-amber-400/25",
    veil: "warm" as const,
    chip: "Sécurité 24/7",
  },
  serrurerie: {
    iconGradient: "from-emerald-500 to-teal-400",
    iconShadow: "shadow-emerald-500/30",
    orb1: "bg-emerald-500/30",
    orb2: "bg-teal-400/25",
    veil: "cool" as const,
    chip: "Urgence 24/7",
  },
  metallerie: {
    iconGradient: "from-orange-500 to-rose-500",
    iconShadow: "shadow-orange-500/30",
    orb1: "bg-orange-500/30",
    orb2: "bg-rose-500/25",
    veil: "warm" as const,
    chip: "Sur mesure",
  },
} as const;

interface CategoryLandingHeroProps {
  category: Category;
  title: string;
  subtitle: string;
  description: string;
  icon: IconKey;
  imageSlug: string;
  breadcrumbLabel: string;
}

export default function CategoryLandingHero({
  category,
  title,
  subtitle,
  description,
  icon,
  imageSlug,
  breadcrumbLabel,
}: CategoryLandingHeroProps) {
  const theme = THEME[category];
  const heroImage = getImage(imageSlug);
  const Icon = iconMap[icon];

  return (
    <section className="relative bg-dark-950 py-16 md:py-24 overflow-hidden">
      <AuroraBackdrop intensity="soft" />
      <div className="absolute inset-0 bg-grid opacity-[0.12]" />
      <div className={`absolute top-1/4 -left-32 w-[30rem] h-[30rem] rounded-full blur-3xl animate-drift ${theme.orb1}`} />
      <div className={`absolute bottom-0 -right-32 w-[30rem] h-[30rem] rounded-full blur-3xl animate-drift-reverse ${theme.orb2}`} />
      <NoiseOverlay opacity={0.05} />

      <div className="container-custom relative z-10">
        <div className="mb-6">
          <Breadcrumbs items={[{ label: "Services", href: "/services" }, { label: breadcrumbLabel }]} light />
        </div>
        <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <div className={`w-16 h-16 bg-gradient-to-br ${theme.iconGradient} rounded-2xl flex items-center justify-center mb-6 shadow-xl ${theme.iconShadow}`}>
              <Icon className="w-8 h-8 text-white" />
            </div>
            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-4 leading-tight">
              {title}
            </h1>
            <p className="text-xl md:text-2xl font-medium mb-6 gradient-text-living">
              {subtitle}
            </p>
            <p className="text-lg text-dark-300 leading-relaxed">
              {description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/demande-devis" className="btn-primary">
                Devis gratuit
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative hidden lg:block"
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
              <Image
                src={heroImage.webp}
                alt={heroImage.alt}
                fill
                sizes="(max-width: 1024px) 0px, 42vw"
                className="object-cover"
                placeholder="blur"
                blurDataURL={heroImage.blurDataURL}
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-dark-950/80 via-transparent to-transparent" />
              <div className={`absolute inset-0 gradient-veil-${theme.veil} opacity-30 mix-blend-overlay`} />
              <div className="absolute top-4 right-4 glass-panel rounded-xl px-4 py-2.5 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-white" />
                <span className="text-sm font-semibold text-white">{theme.chip}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
