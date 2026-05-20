"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ChevronRight,
  Phone,
  CheckCircle2,
  MapPin,
  HelpCircle,
  Zap,
  FileCheck,
  AlertTriangle,
  Wifi,
  Settings,
  Video,
  CreditCard,
  Camera,
  DoorOpen,
  KeyRound,
  Shield,
  Lock,
  Wrench,
  Clock,
  Sparkles,
} from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import BulbText from "@/components/ui/BulbText";
import {
  generateServiceSchema,
  generateFAQSchema,
  injectSchema,
} from "@/lib/structured-data";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/primitives/Accordion";
import { AuroraBackdrop, GradientVeil, NoiseOverlay, Spotlight } from "@/components/ui/ambient";
import { imageOrNull } from "@/lib/image-manifest";

const iconMap = {
  zap: Zap,
  fileCheck: FileCheck,
  alertTriangle: AlertTriangle,
  wifi: Wifi,
  settings: Settings,
  video: Video,
  creditCard: CreditCard,
  camera: Camera,
  doorOpen: DoorOpen,
  keyRound: KeyRound,
  shield: Shield,
  lock: Lock,
  wrench: Wrench,
  sparkles: Sparkles,
} as const;

export type ServiceIconName = keyof typeof iconMap;

/**
 * Category colour schemes — one per métier. Drives hero icon gradient,
 * accent chips, CTA background, ambient orb hues.
 */
const CATEGORY_THEME = {
  electricite: {
    iconGradient: "from-primary-500 to-electric-500",
    iconShadow: "shadow-primary-500/30",
    chipBg: "bg-primary-100 dark:bg-primary-500/15",
    chipText: "text-primary-700 dark:text-primary-300",
    checkColor: "text-primary-500",
    ctaGradient: "from-primary-700 via-primary-600 to-electric-600",
    ctaText: "text-primary-100",
    orb1: "bg-primary-500/30",
    orb2: "bg-electric-500/25",
    veilVariant: "brand" as const,
  },
  acces: {
    iconGradient: "from-accent-500 to-amber-400",
    iconShadow: "shadow-accent-500/30",
    chipBg: "bg-accent-100 dark:bg-accent-500/15",
    chipText: "text-accent-700 dark:text-accent-300",
    checkColor: "text-accent-500",
    ctaGradient: "from-amber-600 via-accent-500 to-amber-500",
    ctaText: "text-amber-50",
    orb1: "bg-accent-500/30",
    orb2: "bg-amber-400/25",
    veilVariant: "warm" as const,
  },
  serrurerie: {
    iconGradient: "from-emerald-500 to-teal-400",
    iconShadow: "shadow-emerald-500/30",
    chipBg: "bg-emerald-100 dark:bg-emerald-500/15",
    chipText: "text-emerald-700 dark:text-emerald-300",
    checkColor: "text-emerald-500",
    ctaGradient: "from-emerald-700 via-emerald-600 to-teal-600",
    ctaText: "text-emerald-100",
    orb1: "bg-emerald-500/30",
    orb2: "bg-teal-400/25",
    veilVariant: "cool" as const,
  },
  metallerie: {
    iconGradient: "from-orange-500 to-rose-500",
    iconShadow: "shadow-orange-500/30",
    chipBg: "bg-orange-100 dark:bg-orange-500/15",
    chipText: "text-orange-700 dark:text-orange-300",
    checkColor: "text-orange-500",
    ctaGradient: "from-orange-700 via-orange-600 to-rose-600",
    ctaText: "text-orange-100",
    orb1: "bg-orange-500/30",
    orb2: "bg-rose-500/25",
    veilVariant: "warm" as const,
  },
};

export type ServiceCategory = keyof typeof CATEGORY_THEME;

interface FAQ {
  question: string;
  answer: string;
}

interface ServicePageTemplateProps {
  title: string;
  subtitle: string;
  description: string;
  iconName: ServiceIconName;
  /** Category for consistent theming — default 'electricite'. */
  category?: ServiceCategory;
  /** Manifest slug for hero imagery — optional. */
  imageSlug?: string;
  prestations: {
    title: string;
    items: string[];
  }[];
  faqs: FAQ[];
  zones?: string[];
  parentCategory?: { label: string; href: string };
  /** Optional content slot rendered between the FAQ and the closing CTA.
   *  Use for transparent pricing tables, before/after sliders, etc. */
  extraContent?: React.ReactNode;
}

export default function ServicePageTemplate({
  title,
  subtitle,
  description,
  iconName,
  category = "electricite",
  imageSlug,
  prestations,
  faqs,
  zones = [
    "Clichy",
    "Levallois-Perret",
    "Neuilly-sur-Seine",
    "Asnières",
    "Paris",
    "La Défense",
    "Hauts-de-Seine",
    "Île-de-France",
  ],
  parentCategory,
  extraContent,
}: ServicePageTemplateProps) {
  const Icon = iconMap[iconName];
  const theme = CATEGORY_THEME[category];
  const heroImage = imageSlug ? imageOrNull(imageSlug) : null;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sconnectfrance.fr";

  const breadcrumbItems = [
    { label: "Services", href: "/services" },
    ...(parentCategory ? [parentCategory] : []),
    { label: title },
  ];

  const serviceSchema = generateServiceSchema(
    {
      name: title,
      description,
      provider: "S'Connect",
      areaServed: zones,
      priceRange: "€€",
    },
    siteUrl,
  );

  const faqSchema = faqs.length > 0 ? generateFAQSchema(faqs) : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={injectSchema(serviceSchema)} />
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={injectSchema(faqSchema)} />
      )}

      {/* Hero — category-themed ambient + optional image on the right */}
      <section className="relative bg-dark-950 py-16 md:py-24 overflow-hidden">
        <AuroraBackdrop intensity="soft" />
        <div className="absolute inset-0 bg-grid opacity-[0.12]" />
        <div className={`absolute top-1/4 -left-32 w-[30rem] h-[30rem] rounded-full blur-3xl animate-drift ${theme.orb1}`} />
        <div className={`absolute bottom-0 -right-32 w-[30rem] h-[30rem] rounded-full blur-3xl animate-drift-reverse ${theme.orb2}`} />
        <NoiseOverlay opacity={0.05} />

        <div className="container-custom relative z-10">
          <div className="mb-6">
            <Breadcrumbs items={breadcrumbItems} light />
          </div>
          <div className={`grid gap-10 items-center ${heroImage ? "lg:grid-cols-[1.15fr_1fr]" : "lg:grid-cols-1"}`}>
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
              <p className="text-xl md:text-2xl font-medium mb-6">
                <BulbText>{subtitle}</BulbText>
              </p>
              <p className="text-lg text-dark-300 leading-relaxed">
                {description}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/demande-devis" className="btn-primary">
                  Devis gratuit
                  <ChevronRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/demande-intervention"
                  className="btn glass-panel text-white hover:bg-white/15"
                >
                  <Clock className="w-4 h-4" />
                  Intervention
                </Link>
              </div>
            </motion.div>

            {heroImage && (
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
                  <div className={`absolute inset-0 gradient-veil-${theme.veilVariant === "cool" ? "cool" : "warm"} opacity-30 mix-blend-overlay`} />
                  {/* floating glass chip top-right */}
                  <div className="absolute top-4 right-4 glass-panel rounded-xl px-4 py-2.5 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-white" />
                    <span className="text-sm font-semibold text-white">Devis gratuit</span>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Prestations */}
      <section className="section-padding bg-surface">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4 ${theme.chipBg} ${theme.chipText}`}>
              Nos Prestations
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground">
              Ce que nous proposons
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {prestations.map((group, index) => (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Spotlight className="h-full rounded-2xl">
                  <div className="card p-7 h-full transition-all hover:-translate-y-1 hover:shadow-xl">
                    <h3 className="font-display font-bold text-xl text-foreground mb-4">
                      {group.title}
                    </h3>
                    <ul className="space-y-3">
                      {group.items.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-foreground-muted">
                          <CheckCircle2 className={`w-5 h-5 ${theme.checkColor} shrink-0 mt-0.5`} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Spotlight>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-surface-muted relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-primary-50/20 to-transparent dark:via-primary-950/20" />
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4 ${theme.chipBg} ${theme.chipText}`}>
              FAQ
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground">
              Questions fréquentes
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, index) => (
                <motion.div
                  key={faq.question}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <AccordionItem value={`faq-${index}`}>
                    <AccordionTrigger>
                      <span className="flex items-center gap-3">
                        <span className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${theme.chipBg} ${theme.chipText}`}>
                          <HelpCircle className="h-4 w-4" />
                        </span>
                        {faq.question}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="pl-11">{faq.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Zone d'intervention */}
      <section className="py-16 bg-surface border-t border-border">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="card p-8 bg-gradient-to-br from-primary-50 to-electric-50 dark:from-primary-500/10 dark:to-electric-500/10 border-primary-100 dark:border-primary-500/30"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${theme.iconGradient} flex items-center justify-center shadow-lg ${theme.iconShadow}`}>
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-display font-bold text-xl text-foreground mb-1">
                  Zone d&apos;intervention
                </h3>
                <p className="text-foreground-muted">
                  Nous intervenons rapidement sur les secteurs suivants :
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {zones.map((zone, i) => (
                <motion.span
                  key={zone}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.04 * i, duration: 0.3 }}
                  className="px-4 py-2 bg-surface-elevated rounded-full text-foreground font-medium shadow-sm border border-border"
                >
                  {zone}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Extra content slot (e.g. transparent pricing) */}
      {extraContent}

      {/* CTA — category-themed */}
      <section className={`relative py-20 bg-gradient-to-r ${theme.ctaGradient} overflow-hidden`}>
        <GradientVeil variant={theme.veilVariant} className="opacity-40 mix-blend-overlay" />
        <NoiseOverlay opacity={0.05} />
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse-soft" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: "2s" }} />

        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-6">
              Prêt à démarrer votre projet ?
            </h2>
            <p className={`text-xl ${theme.ctaText} mb-10 max-w-2xl mx-auto`}>
              Contactez-nous pour un devis gratuit et personnalisé.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/demande-devis" className="btn-white btn-lg">
                Demander un devis
                <ChevronRight className="w-5 h-5" />
              </Link>
              <Link
                href="/demande-intervention"
                className="btn bg-accent-500 text-foreground hover:bg-accent-400 btn-lg"
              >
                Intervention urgente
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
