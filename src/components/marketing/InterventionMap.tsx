"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { MapPin, Clock, Zap, Phone } from "lucide-react";
import Link from "next/link";
import { AuroraBackdrop, NoiseOverlay } from "@/components/ui/ambient";

/**
 * Commune data for the interactive IDF map.
 * Coordinates are in a 1000×700 viewBox, roughly matching a simplified
 * western-IDF silhouette centred on Paris. Not geo-accurate to the pixel
 * but recognisable and balanced for visual composition.
 */
interface Commune {
  name: string;
  cp: string;
  x: number;
  y: number;
  /** Average intervention time in minutes from Clichy HQ. */
  avgMin: number;
  /** Last intervention hint, displayed on hover. */
  last?: string;
  /** Visual weight — 'hq' is the Clichy headquarters (larger, orange ring). */
  tier?: "hq" | "primary" | "secondary";
}

const COMMUNES: Commune[] = [
  // HQ — Clichy
  { name: "Clichy", cp: "92110", x: 480, y: 280, avgMin: 0, last: "Siège", tier: "hq" },
  // Petite couronne — primary coverage
  { name: "Levallois-Perret", cp: "92300", x: 470, y: 310, avgMin: 12, last: "Il y a 2h", tier: "primary" },
  { name: "Neuilly-sur-Seine", cp: "92200", x: 445, y: 340, avgMin: 15, last: "Hier 22h14", tier: "primary" },
  { name: "Asnières-sur-Seine", cp: "92600", x: 440, y: 255, avgMin: 14, last: "Hier 18h40", tier: "primary" },
  { name: "La Défense", cp: "92800", x: 410, y: 330, avgMin: 22, last: "Hier 11h30", tier: "primary" },
  { name: "Courbevoie", cp: "92400", x: 420, y: 305, avgMin: 18, last: "Aujourd'hui 09h15", tier: "primary" },
  { name: "Puteaux", cp: "92800", x: 400, y: 345, avgMin: 24, last: "Hier 14h05", tier: "primary" },
  { name: "Saint-Ouen", cp: "93400", x: 525, y: 245, avgMin: 20, last: "Aujourd'hui 08h05", tier: "primary" },
  { name: "Colombes", cp: "92700", x: 400, y: 235, avgMin: 25, last: "Avant-hier", tier: "primary" },
  // Paris + secondary
  { name: "Paris 17e", cp: "75017", x: 540, y: 345, avgMin: 25, last: "Hier 19h20", tier: "primary" },
  { name: "Paris 8e", cp: "75008", x: 565, y: 385, avgMin: 30, last: "Avant-hier", tier: "primary" },
  { name: "Paris 16e", cp: "75016", x: 485, y: 410, avgMin: 32, last: "Cette semaine", tier: "secondary" },
  { name: "Boulogne-Billancourt", cp: "92100", x: 430, y: 430, avgMin: 35, last: "Cette semaine", tier: "secondary" },
  { name: "Issy-les-Moulineaux", cp: "92130", x: 460, y: 470, avgMin: 38, last: "Cette semaine", tier: "secondary" },
  { name: "Suresnes", cp: "92150", x: 395, y: 390, avgMin: 28, last: "Hier", tier: "secondary" },
  { name: "Saint-Cloud", cp: "92210", x: 375, y: 420, avgMin: 32, last: "Cette semaine", tier: "secondary" },
  { name: "Nanterre", cp: "92000", x: 380, y: 290, avgMin: 26, last: "Hier 16h55", tier: "primary" },
  { name: "Saint-Denis", cp: "93200", x: 555, y: 215, avgMin: 28, last: "Cette semaine", tier: "secondary" },
];

/**
 * A winding Seine-like path through the viewBox — stylised, not geographic.
 */
const SEINE_PATH =
  "M 80 550 C 180 510, 280 500, 370 470 S 470 420, 520 400 S 620 380, 690 330 S 780 260, 900 230";

export default function InterventionMap() {
  const [hovered, setHovered] = useState<string | null>(null);
  const reduce = useReducedMotion();
  const hq = COMMUNES.find((c) => c.tier === "hq")!;

  return (
    <section className="relative overflow-hidden bg-dark-950 py-20 md:py-28">
      <AuroraBackdrop intensity="soft" />
      <div className="absolute inset-0 bg-grid opacity-[0.12]" />
      <NoiseOverlay opacity={0.05} />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="mb-10 max-w-2xl"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-300 text-sm font-semibold mb-6 backdrop-blur-sm">
            <MapPin className="w-4 h-4" />
            Zone d&apos;intervention
          </span>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-5 leading-tight">
            Chaque commune à{" "}
            <span className="gradient-text-living">moins de 40 min</span>
          </h2>
          <p className="text-lg text-dark-300 leading-relaxed">
            Basés à Clichy (92), nos équipes rayonnent sur Paris et toute la petite couronne.
            Survolez une commune pour voir notre temps moyen d&apos;intervention.
          </p>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:items-center">
          {/* ——— SVG Map ——— */}
          <div className="relative rounded-3xl overflow-hidden glass-panel p-4 md:p-6">
            <svg
              viewBox="0 0 1000 700"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="Carte interactive des communes d'intervention"
              className="w-full h-auto"
            >
              <defs>
                {/* Radial pin glow */}
                <radialGradient id="pinGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(96, 165, 250, 0.55)" />
                  <stop offset="100%" stopColor="rgba(96, 165, 250, 0)" />
                </radialGradient>
                <radialGradient id="pinGlowHQ" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(245, 158, 11, 0.85)" />
                  <stop offset="100%" stopColor="rgba(245, 158, 11, 0)" />
                </radialGradient>
                {/* Coverage halo — drawn once, very big, under everything */}
                <radialGradient id="coverageHalo" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(59, 130, 246, 0.18)" />
                  <stop offset="60%" stopColor="rgba(59, 130, 246, 0.06)" />
                  <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
                </radialGradient>
                {/* Seine gradient */}
                <linearGradient id="seine" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(14, 165, 233, 0.25)" />
                  <stop offset="50%" stopColor="rgba(14, 165, 233, 0.55)" />
                  <stop offset="100%" stopColor="rgba(14, 165, 233, 0.25)" />
                </linearGradient>
                {/* Circuit trace gradient — between HQ and each commune */}
                <linearGradient id="trace" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(96, 165, 250, 0.7)" />
                  <stop offset="100%" stopColor="rgba(96, 165, 250, 0.05)" />
                </linearGradient>
              </defs>

              {/* Coverage halo centred on HQ */}
              <circle cx={hq.x} cy={hq.y} r="380" fill="url(#coverageHalo)" />

              {/* Seine river */}
              <motion.path
                d={SEINE_PATH}
                stroke="url(#seine)"
                strokeWidth="10"
                fill="none"
                strokeLinecap="round"
                initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2.2, ease: "easeInOut" }}
              />
              {/* River glow */}
              <path
                d={SEINE_PATH}
                stroke="rgba(14, 165, 233, 0.15)"
                strokeWidth="24"
                fill="none"
                strokeLinecap="round"
                filter="blur(8px)"
              />

              {/* Circuit traces from HQ to every other commune */}
              {COMMUNES.filter((c) => c.tier !== "hq").map((c, i) => {
                const active = hovered === c.name;
                return (
                  <motion.line
                    key={`line-${c.name}`}
                    x1={hq.x}
                    y1={hq.y}
                    x2={c.x}
                    y2={c.y}
                    stroke={active ? "rgba(245, 158, 11, 0.9)" : "url(#trace)"}
                    strokeWidth={active ? 2 : 1}
                    strokeDasharray={active ? "0" : "4 6"}
                    initial={reduce ? { pathLength: 1, opacity: 0.4 } : { pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: active ? 0.95 : 0.4 }}
                    viewport={{ once: true }}
                    transition={{
                      pathLength: { duration: 0.9, delay: 0.3 + i * 0.04, ease: "easeOut" },
                      opacity: { duration: 0.3 },
                    }}
                  />
                );
              })}

              {/* Pins */}
              {COMMUNES.map((c) => {
                const isHQ = c.tier === "hq";
                const isHovered = hovered === c.name;
                const baseRadius = isHQ ? 10 : c.tier === "primary" ? 6 : 5;
                const ringRadius = isHQ ? 22 : 14;

                return (
                  <g
                    key={c.name}
                    onMouseEnter={() => setHovered(c.name)}
                    onMouseLeave={() => setHovered((h) => (h === c.name ? null : h))}
                    onFocus={() => setHovered(c.name)}
                    onBlur={() => setHovered((h) => (h === c.name ? null : h))}
                    tabIndex={0}
                    role="button"
                    aria-label={`${c.name} — intervention moyenne ${c.avgMin} minutes`}
                    className="cursor-pointer outline-none focus-visible:[&>circle:last-of-type]:stroke-accent-400"
                  >
                    {/* Outer pulsing ring */}
                    <circle
                      cx={c.x}
                      cy={c.y}
                      r={ringRadius}
                      fill={isHQ ? "url(#pinGlowHQ)" : "url(#pinGlow)"}
                      opacity={isHQ ? 0.95 : 0.6}
                    >
                      {!reduce && (
                        <animate
                          attributeName="r"
                          values={`${ringRadius};${ringRadius + 8};${ringRadius}`}
                          dur={isHQ ? "2s" : `${2.8 + (c.x % 7) * 0.1}s`}
                          repeatCount="indefinite"
                        />
                      )}
                      {!reduce && (
                        <animate
                          attributeName="opacity"
                          values={isHQ ? "0.95;0.35;0.95" : "0.55;0.15;0.55"}
                          dur={isHQ ? "2s" : `${2.8 + (c.x % 7) * 0.1}s`}
                          repeatCount="indefinite"
                        />
                      )}
                    </circle>
                    {/* Pin dot */}
                    <circle
                      cx={c.x}
                      cy={c.y}
                      r={baseRadius}
                      fill={isHQ ? "#f59e0b" : isHovered ? "#fbbf24" : "#60a5fa"}
                      stroke="white"
                      strokeWidth={isHQ ? 2.5 : isHovered ? 2 : 1.5}
                      className="transition-all duration-200"
                    />
                    {/* Commune label on hover (or always for HQ) */}
                    {(isHQ || isHovered) && (
                      <g className="pointer-events-none">
                        <text
                          x={c.x + ringRadius + 6}
                          y={c.y - 4}
                          fill="white"
                          fontSize="14"
                          fontWeight="700"
                          style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
                          filter="url(#label-shadow)"
                        >
                          {c.name}
                        </text>
                        <text
                          x={c.x + ringRadius + 6}
                          y={c.y + 12}
                          fill="rgba(255,255,255,0.7)"
                          fontSize="11"
                          fontWeight="500"
                        >
                          {isHQ ? "Siège — 24h/24" : `≈ ${c.avgMin} min • ${c.last}`}
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}

              {/* Label text shadow filter */}
              <defs>
                <filter id="label-shadow" x="-10%" y="-10%" width="120%" height="120%">
                  <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="rgba(0,0,0,0.8)" />
                </filter>
              </defs>
            </svg>

            {/* Hover tooltip — absolute panel in bottom-left */}
            {hovered && hovered !== hq.name && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute bottom-6 left-6 right-6 md:right-auto md:max-w-xs glass-panel rounded-xl p-4"
              >
                {(() => {
                  const c = COMMUNES.find((x) => x.name === hovered);
                  if (!c) return null;
                  return (
                    <>
                      <div className="flex items-center gap-2 mb-1">
                        <MapPin className="w-4 h-4 text-accent-400" />
                        <span className="text-sm font-bold text-white">{c.name}</span>
                        <span className="text-xs text-white/50">· {c.cp}</span>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-white/80">
                        <span className="inline-flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-primary-300" />
                          <span>Temps moyen : <strong className="text-white">{c.avgMin} min</strong></span>
                        </span>
                      </div>
                      {c.last && (
                        <div className="mt-1 text-xs text-white/60">
                          Dernière intervention : {c.last}
                        </div>
                      )}
                    </>
                  );
                })()}
              </motion.div>
            )}
          </div>

          {/* ——— Side stats + CTA ——— */}
          <div className="space-y-4">
            <div className="glass-panel rounded-2xl p-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-500 to-amber-400 flex items-center justify-center shadow-lg shadow-accent-500/30 shrink-0">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-white font-display font-bold text-xl">Intervention en cours</div>
                  <div className="text-white/60 text-sm">Équipe mobilisée à Clichy à l&apos;instant</div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10">
                <div>
                  <div className="font-display font-bold text-2xl text-white">{COMMUNES.length}+</div>
                  <div className="text-white/60 text-xs mt-0.5">Communes couvertes</div>
                </div>
                <div>
                  <div className="font-display font-bold text-2xl text-white">&lt; 40 min</div>
                  <div className="text-white/60 text-xs mt-0.5">Temps d&apos;intervention max</div>
                </div>
                <div>
                  <div className="font-display font-bold text-2xl text-white">24/7</div>
                  <div className="text-white/60 text-xs mt-0.5">Urgences disponibles</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Link href="/demande-intervention" className="btn-primary btn-lg justify-center">
                <Zap className="w-5 h-5" />
                Demander une intervention
              </Link>
              <a href="tel:+33100000000" className="btn glass-panel text-white hover:bg-white/15 btn-lg justify-center">
                <Phone className="w-5 h-5" />
                Urgence — appeler maintenant
              </a>
            </div>

            <p className="text-white/50 text-xs">
              Temps d&apos;intervention indicatifs, calculés à partir de nos 3 dernières années
              d&apos;activité. Hors heures de pointe, jours fériés et week-ends chargés.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
