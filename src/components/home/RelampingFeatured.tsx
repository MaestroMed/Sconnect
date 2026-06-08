"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Lightbulb, Calculator, ChevronRight, ArrowRight, Sparkles, TrendingDown, ShieldCheck } from "lucide-react";
import { MagneticLink } from "@/components/ui/MagneticButton";

/**
 * Featured Relamping section — sits right under the hero on the home,
 * giving the pillar topic its top-of-page weight. This is what the SEO
 * 10-year strategy calls "topical dominance signal" : every visitor
 * (and every crawler) sees that relamping is the marquee competency.
 *
 * Asymmetric layout: left = image weight (the lightbulb visual already
 * generated for the pillar), right = value-prop + 3 KPI chips + dual
 * CTA (pillar deep dive + ROI calculator).
 */
export default function RelampingFeatured() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-dark-950 via-dark-900 to-primary-950 py-20 md:py-28">
      {/* Ambient glows */}
      <div className="absolute top-1/4 -left-32 w-[36rem] h-[36rem] rounded-full blur-3xl bg-electric-500/15 animate-drift" />
      <div className="absolute bottom-0 -right-32 w-[36rem] h-[36rem] rounded-full blur-3xl bg-primary-500/15 animate-drift-reverse" />
      <div className="absolute inset-0 bg-grid opacity-[0.08]" />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-center">
          {/* Left — visual */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, margin: "-10% 0px" }}
            className="relative aspect-[4/3] lg:aspect-[5/4] rounded-3xl overflow-hidden bg-dark-900 shadow-2xl shadow-primary-900/40 ring-1 ring-white/10"
          >
            <Image
              src="/images/hero/relamping-lightbulb.webp"
              alt="Ampoule LED moderne illustrant le service de relamping S Connect"
              fill
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover"
              priority={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-950/85 via-dark-950/30 to-transparent" />
            {/* Floating badge */}
            <div className="absolute top-6 left-6 inline-flex items-center gap-2 rounded-full bg-accent-500/95 text-dark-900 px-3 py-1.5 text-xs font-bold shadow-lg">
              <Sparkles className="w-3.5 h-3.5" />
              Notre expertise pillar
            </div>
            {/* Floating KPI overlay */}
            <div className="absolute bottom-6 left-6 right-6 grid grid-cols-3 gap-2">
              {[
                { value: "−80 %", label: "consommation" },
                { value: "3,5 ans", label: "ROI moyen" },
                { value: "80 k h", label: "durée de vie" },
              ].map((k) => (
                <div
                  key={k.label}
                  className="rounded-xl bg-white/10 backdrop-blur-md border border-white/15 px-3 py-2 text-center"
                >
                  <div
                    className="font-display font-bold text-base md:text-lg text-white leading-tight"
                    style={{ fontVariantNumeric: "tabular-nums" }}
                  >
                    {k.value}
                  </div>
                  <div className="text-[10px] text-white/70 uppercase tracking-wider">
                    {k.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — value prop */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, margin: "-10% 0px" }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/15 border border-primary-500/25 text-primary-300 text-sm font-semibold mb-5 backdrop-blur-md">
              <Lightbulb className="w-4 h-4" />
              Relamping LED · IDF
            </span>

            <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-white mb-5 leading-[1.1]">
              L&apos;investissement n°1 sur votre poste éclairage,{" "}
              <span className="bg-gradient-to-r from-accent-300 via-amber-300 to-accent-400 bg-clip-text text-transparent">
                même sans prime CEE.
              </span>
            </h2>

            <p className="text-lg text-white/85 leading-relaxed mb-6">
              Les fiches CEE éclairage ont été supprimées en février 2026. Le relamping
              LED reste pourtant l&apos;investissement le plus rentable pour atteindre
              les <strong>−40 %</strong> du décret tertiaire en 2030. Audit gratuit,
              ROI calculé, leasing si besoin — la facture finale ne dépasse jamais
              le devis.
            </p>

            {/* 3 trust rows */}
            <ul className="space-y-3 mb-8">
              {[
                {
                  icon: TrendingDown,
                  title: "ROI 2,5 à 4,5 ans",
                  desc: "Sur 4 typologies (bureau, commerce, copropriété, industriel) — chiffré avant signature.",
                },
                {
                  icon: ShieldCheck,
                  title: "Conformité NF EN 12464-1",
                  desc: "Niveaux d'éclairement, UGR ≤ 19 bureau, IRC ≥ 90 commerce — mesurés à la livraison.",
                },
                {
                  icon: Sparkles,
                  title: "Méthode auditée par chantier",
                  desc: "Mesures luxmètre Konica T-10A, plan de calepinage, projection OPERAT, rapport écrit.",
                },
              ].map((r) => {
                const Icon = r.icon;
                return (
                  <li key={r.title} className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-electric-500 flex items-center justify-center shrink-0 shadow-lg shadow-primary-500/30">
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="font-display font-semibold text-white">{r.title}</div>
                      <p className="text-sm text-white/70 leading-relaxed">{r.desc}</p>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="flex flex-col sm:flex-row gap-3">
              <MagneticLink
                href="/services/electricite/relamping"
                className="btn-primary btn-lg shadow-xl shadow-primary-700/40"
              >
                Découvrir la méthode
                <ChevronRight className="w-5 h-5" />
              </MagneticLink>
              <MagneticLink
                href="/calculateur-relamping"
                className="btn btn-lg bg-transparent text-white border-2 border-white/50 hover:border-white hover:bg-white/10 transition-colors"
              >
                <Calculator className="w-5 h-5" />
                Calculer mon ROI
              </MagneticLink>
            </div>

            <p className="mt-5 text-sm text-white/60">
              Couverture :{" "}
              {[
                "Paris",
                "La Défense",
                "Clichy",
                "Boulogne",
                "Levallois",
                "Neuilly",
                "Issy",
                "Nanterre",
              ].map((c, i, arr) => (
                <span key={c}>
                  <Link
                    href={`/services/electricite/relamping/${c
                      .toLowerCase()
                      .replace("la défense", "la-defense")
                      .replace("boulogne", "boulogne-billancourt")
                      .replace("levallois", "levallois-perret")
                      .replace("neuilly", "neuilly-sur-seine")
                      .replace("issy", "issy-les-moulineaux")}`}
                    className="text-white/70 hover:text-white underline-offset-2 hover:underline"
                  >
                    {c}
                  </Link>
                  {i < arr.length - 1 && " · "}
                </span>
              ))}{" "}
              ·{" "}
              <Link href="/services/electricite/relamping" className="text-white/70 hover:text-white underline-offset-2 hover:underline inline-flex items-center gap-1">
                toutes les villes IDF
                <ArrowRight className="w-3 h-3" />
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
