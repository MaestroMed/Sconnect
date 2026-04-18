"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { MapPin, Clock, Zap, Phone, Radio } from "lucide-react";
import Link from "next/link";
import { AuroraBackdrop, NoiseOverlay } from "@/components/ui/ambient";

/**
 * Commune data for the interactive IDF map.
 * Coordinates are in a 1000×700 viewBox, roughly matching a simplified
 * western-IDF silhouette centred on Paris.
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
  /** Visual weight — 'hq' is the Clichy headquarters. */
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

/** Stylised Seine through the viewBox. */
const SEINE_PATH =
  "M 80 550 C 180 510, 280 500, 370 470 S 470 420, 520 400 S 620 380, 690 330 S 780 260, 900 230";

interface InterventionMapProps {
  /**
   * 'section' renders title + side panel + CTAs (original full layout).
   * 'hero'    renders just the map + floating corner badges (for hero placement).
   */
  variant?: "section" | "hero";
}

export default function InterventionMap({ variant = "section" }: InterventionMapProps) {
  const [hovered, setHovered] = useState<string | null>(null);
  const [livePing, setLivePing] = useState(0);
  const reduce = useReducedMotion();
  const hq = COMMUNES.find((c) => c.tier === "hq")!;
  const otherCommunes = useMemo(() => COMMUNES.filter((c) => c.tier !== "hq"), []);

  // Rotate through communes for the "data packet" highlight — emulates a
  // live dispatch feed. Disabled under reduced-motion.
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => {
      setLivePing((i) => (i + 1) % otherCommunes.length);
    }, 2400);
    return () => clearInterval(id);
  }, [reduce, otherCommunes.length]);

  const liveCommune = otherCommunes[livePing];

  const Svg = (
    <svg
      viewBox="0 0 1000 700"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Carte interactive des communes d'intervention"
      className="w-full h-auto"
    >
      <defs>
        {/* Pin glows */}
        <radialGradient id="pinGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(96, 165, 250, 0.65)" />
          <stop offset="100%" stopColor="rgba(96, 165, 250, 0)" />
        </radialGradient>
        <radialGradient id="pinGlowHQ" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(245, 158, 11, 0.95)" />
          <stop offset="100%" stopColor="rgba(245, 158, 11, 0)" />
        </radialGradient>
        <radialGradient id="pinGlowHQOuter" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(251, 191, 36, 0.5)" />
          <stop offset="100%" stopColor="rgba(245, 158, 11, 0)" />
        </radialGradient>
        {/* Coverage halo — drawn once, very big, under everything */}
        <radialGradient id="coverageHalo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(59, 130, 246, 0.22)" />
          <stop offset="55%" stopColor="rgba(59, 130, 246, 0.07)" />
          <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
        </radialGradient>
        {/* Seine — flowing gradient (animated via stop colors for "currentness") */}
        <linearGradient id="seine" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(14, 165, 233, 0.35)" />
          <stop offset="50%" stopColor="rgba(56, 189, 248, 0.85)" />
          <stop offset="100%" stopColor="rgba(14, 165, 233, 0.35)" />
        </linearGradient>
        {/* Circuit trace gradient */}
        <linearGradient id="trace" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(96, 165, 250, 0.8)" />
          <stop offset="100%" stopColor="rgba(96, 165, 250, 0.08)" />
        </linearGradient>
        <linearGradient id="traceHot" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(251, 191, 36, 1)" />
          <stop offset="100%" stopColor="rgba(251, 191, 36, 0.1)" />
        </linearGradient>
        {/* Data packet glow filter */}
        <filter id="packetGlow" x="-200%" y="-200%" width="500%" height="500%">
          <feGaussianBlur stdDeviation="2" result="glow" />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="labelShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="rgba(0,0,0,0.85)" />
        </filter>
      </defs>

      {/* Coverage halo centred on HQ */}
      <circle cx={hq.x} cy={hq.y} r="400" fill="url(#coverageHalo)" />

      {/* Seine river — outer glow pass */}
      <path
        d={SEINE_PATH}
        stroke="rgba(56, 189, 248, 0.25)"
        strokeWidth="32"
        fill="none"
        strokeLinecap="round"
        filter="blur(10px)"
      />
      <motion.path
        d={SEINE_PATH}
        stroke="url(#seine)"
        strokeWidth="12"
        fill="none"
        strokeLinecap="round"
        initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2.2, ease: "easeInOut" }}
      />
      {/* Seine flow animation — dashed highlight that crawls */}
      {!reduce && (
        <path
          d={SEINE_PATH}
          stroke="rgba(255, 255, 255, 0.4)"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="8 40"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="-480"
            dur="7s"
            repeatCount="indefinite"
          />
        </path>
      )}

      {/* Circuit traces from HQ to every other commune */}
      {otherCommunes.map((c, i) => {
        const isHovered = hovered === c.name;
        const isLive = !reduce && liveCommune?.name === c.name;
        const traceId = `trace-${c.name}`;
        return (
          <g key={`line-g-${c.name}`}>
            <motion.path
              id={traceId}
              d={`M ${hq.x} ${hq.y} L ${c.x} ${c.y}`}
              stroke={isHovered || isLive ? "url(#traceHot)" : "url(#trace)"}
              strokeWidth={isHovered || isLive ? 2 : 1}
              strokeDasharray={isHovered || isLive ? "0" : "4 6"}
              fill="none"
              initial={reduce ? { pathLength: 1, opacity: 0.4 } : { pathLength: 0, opacity: 0 }}
              whileInView={{
                pathLength: 1,
                opacity: isHovered ? 0.95 : isLive ? 0.85 : 0.4,
              }}
              viewport={{ once: true }}
              transition={{
                pathLength: { duration: 0.9, delay: 0.3 + i * 0.04, ease: "easeOut" },
                opacity: { duration: 0.3 },
              }}
            />
            {/* Data packet moving along the trace — always-on for primary, triggered packet on hover */}
            {!reduce && (isHovered || isLive) && (
              <circle
                r={isHovered ? 4 : 3}
                fill={isHovered ? "#fbbf24" : "#60a5fa"}
                filter="url(#packetGlow)"
                opacity="0.95"
              >
                <animateMotion
                  dur={isHovered ? "0.9s" : "1.6s"}
                  repeatCount="indefinite"
                  rotate="auto"
                >
                  <mpath href={`#${traceId}`} />
                </animateMotion>
              </circle>
            )}
          </g>
        );
      })}

      {/* Pins */}
      {COMMUNES.map((c) => {
        const isHQ = c.tier === "hq";
        const isHovered = hovered === c.name;
        const isLive = !reduce && !isHQ && liveCommune?.name === c.name;
        const baseRadius = isHQ ? 11 : c.tier === "primary" ? 6 : 5;
        const showLabel = isHQ || isHovered || (c.tier === "primary" && isLive);

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
            className="cursor-pointer outline-none"
          >
            {/* HQ outer soft aura */}
            {isHQ && (
              <circle cx={c.x} cy={c.y} r="38" fill="url(#pinGlowHQOuter)" opacity="0.75">
                {!reduce && (
                  <animate
                    attributeName="r"
                    values="38;48;38"
                    dur="2.6s"
                    repeatCount="indefinite"
                  />
                )}
                {!reduce && (
                  <animate
                    attributeName="opacity"
                    values="0.75;0.35;0.75"
                    dur="2.6s"
                    repeatCount="indefinite"
                  />
                )}
              </circle>
            )}
            {/* Pulsing ring */}
            <circle
              cx={c.x}
              cy={c.y}
              r={isHQ ? 22 : 14}
              fill={isHQ ? "url(#pinGlowHQ)" : "url(#pinGlow)"}
              opacity={isHQ ? 0.95 : 0.6}
            >
              {!reduce && (
                <animate
                  attributeName="r"
                  values={isHQ ? "22;30;22" : "14;22;14"}
                  dur={isHQ ? "1.8s" : `${2.6 + (c.x % 9) * 0.1}s`}
                  repeatCount="indefinite"
                />
              )}
              {!reduce && (
                <animate
                  attributeName="opacity"
                  values={isHQ ? "0.95;0.35;0.95" : "0.55;0.15;0.55"}
                  dur={isHQ ? "1.8s" : `${2.6 + (c.x % 9) * 0.1}s`}
                  repeatCount="indefinite"
                />
              )}
            </circle>
            {/* Ripple on hover (single shot re-triggered by key change) */}
            {isHovered && !isHQ && !reduce && (
              <circle
                key={`ripple-${c.name}-${livePing}`}
                cx={c.x}
                cy={c.y}
                r={baseRadius}
                fill="none"
                stroke="rgba(251, 191, 36, 0.9)"
                strokeWidth="2"
              >
                <animate attributeName="r" from={baseRadius} to="38" dur="0.9s" repeatCount="1" />
                <animate attributeName="opacity" from="1" to="0" dur="0.9s" repeatCount="1" />
                <animate
                  attributeName="stroke-width"
                  from="2.5"
                  to="0.5"
                  dur="0.9s"
                  repeatCount="1"
                />
              </circle>
            )}
            {/* Pin dot */}
            <circle
              cx={c.x}
              cy={c.y}
              r={baseRadius}
              fill={isHQ ? "#f59e0b" : isHovered || isLive ? "#fbbf24" : "#60a5fa"}
              stroke="white"
              strokeWidth={isHQ ? 2.5 : isHovered ? 2 : 1.5}
              className="transition-all duration-200"
            />
            {/* HQ inner bright core */}
            {isHQ && (
              <circle cx={c.x} cy={c.y} r="4" fill="#fef3c7">
                {!reduce && (
                  <animate
                    attributeName="opacity"
                    values="1;0.4;1"
                    dur="1.8s"
                    repeatCount="indefinite"
                  />
                )}
              </circle>
            )}
            {/* Label */}
            {showLabel && (
              <g className="pointer-events-none">
                <text
                  x={c.x + (isHQ ? 26 : 16)}
                  y={c.y - 3}
                  fill={isHQ ? "#fef3c7" : "white"}
                  fontSize={isHQ ? 15 : 13}
                  fontWeight="700"
                  style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
                  filter="url(#labelShadow)"
                >
                  {c.name}
                </text>
                <text
                  x={c.x + (isHQ ? 26 : 16)}
                  y={c.y + 12}
                  fill="rgba(255,255,255,0.75)"
                  fontSize="10.5"
                  fontWeight="500"
                  filter="url(#labelShadow)"
                >
                  {isHQ ? "Siège — 24/7" : `≈ ${c.avgMin} min • ${c.last}`}
                </text>
              </g>
            )}
          </g>
        );
      })}
    </svg>
  );

  // —————————————————————————————————————————————
  // HERO VARIANT — compact, overlay badges, no internal heading / side
  // —————————————————————————————————————————————
  if (variant === "hero") {
    return (
      <div className="relative w-full">
        <div className="relative rounded-3xl overflow-hidden glass-panel border border-white/10 shadow-2xl">
          {/* Map canvas with its own local ambient to avoid flat backgrounds */}
          <div className="relative bg-gradient-to-br from-dark-900 via-dark-950 to-primary-950">
            <div className="absolute inset-0 bg-grid opacity-[0.08]" />
            <div className="relative z-10 p-2 md:p-3">{Svg}</div>
          </div>

          {/* Live badge — top-left */}
          <div className="absolute top-4 left-4 flex items-center gap-2 glass-panel rounded-full px-3 py-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-500" />
            </span>
            <Radio className="w-3 h-3 text-accent-300" />
            <span className="text-xs font-semibold text-white tracking-wide">LIVE · 24/7</span>
          </div>

          {/* Commune count — top-right */}
          <div className="absolute top-4 right-4 glass-panel rounded-xl px-3 py-2 text-right">
            <div className="text-[10px] uppercase tracking-widest text-white/60">Communes</div>
            <div className="font-display font-bold text-white text-lg leading-none mt-0.5">
              {COMMUNES.length}+
            </div>
          </div>

          {/* Live commune ticker — bottom */}
          {liveCommune && (
            <motion.div
              key={liveCommune.name}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-4 left-4 right-4 glass-panel rounded-xl px-4 py-2.5 flex items-center gap-3"
            >
              <Zap className="w-4 h-4 text-accent-300 shrink-0" />
              <div className="min-w-0">
                <div className="text-[10px] uppercase tracking-widest text-accent-300/80">
                  Équipe en route
                </div>
                <div className="text-sm font-semibold text-white truncate">
                  {liveCommune.name}{" "}
                  <span className="text-white/60 font-normal">· ≈ {liveCommune.avgMin} min</span>
                </div>
              </div>
              <div className="ml-auto hidden sm:flex items-center gap-1 text-[11px] text-white/60">
                <Clock className="w-3 h-3" />
                {new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    );
  }

  // —————————————————————————————————————————————
  // SECTION VARIANT — legacy full layout (kept for future reuse)
  // —————————————————————————————————————————————
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
          <div className="relative rounded-3xl overflow-hidden glass-panel p-4 md:p-6">{Svg}</div>

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
          </div>
        </div>
      </div>
    </section>
  );
}
