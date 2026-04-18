"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { MapPin, Clock, Zap, Phone } from "lucide-react";
import Link from "next/link";
import { AuroraBackdrop, NoiseOverlay } from "@/components/ui/ambient";

// ─────────────────────────────────────────────────────────────────────────────
// Real-world geography → SVG coordinates
// ─────────────────────────────────────────────────────────────────────────────
// Lat/long projection tuned to the petite couronne (Clichy-centred) so pins
// land exactly where they should relative to each other and to Paris' outline.
//
//   x = (lng − 2.10) / 0.45 × 1000           lng 2.10..2.55 → x 0..1000
//   y = (49.00 − lat) / 0.24 × 700           lat 49.00..48.76 → y 0..700
//
// viewBox is 1000×700 (1.43:1, close to the 1.22:1 real-world aspect of this
// petite couronne window — acceptable distortion).
const project = (lat: number, lng: number): [number, number] => [
  ((lng - 2.1) / 0.45) * 1000,
  ((49 - lat) / 0.24) * 700,
];

// Simplified Paris boundary (roughly the boulevard périphérique), 14 vertices
// going clockwise from Porte de la Chapelle. Real Porte coords.
const PARIS_VERTICES: Array<[number, number]> = [
  [48.898, 2.361], // Chapelle
  [48.891, 2.39], // Aubervilliers
  [48.881, 2.412], // Pantin
  [48.869, 2.416], // Bagnolet
  [48.846, 2.413], // Vincennes
  [48.833, 2.416], // Dorée
  [48.825, 2.391], // Bercy
  [48.818, 2.338], // Orléans
  [48.822, 2.313], // Vanves
  [48.84, 2.287], // Versailles
  [48.855, 2.249], // Auteuil
  [48.878, 2.253], // Muette
  [48.891, 2.282], // Maillot
  [48.898, 2.321], // Asnières
];
const PARIS_PATH =
  "M " +
  PARIS_VERTICES.map((v) => project(v[0], v[1]).map((n) => n.toFixed(1)).join(" ")).join(" L ") +
  " Z";

// Real Seine through IDF — cubic bezier through actual waypoints (upstream SE
// at Alfortville → through the iconic Paris loops → exits NW at Argenteuil).
const SEINE_WAYPOINTS: Array<[number, number]> = [
  [48.788, 2.426], // Alfortville (entry SE)
  [48.835, 2.381], // Bercy
  [48.843, 2.37], // Austerlitz
  [48.855, 2.35], // Cité
  [48.86, 2.33], // Louvre
  [48.862, 2.294], // Trocadéro
  [48.839, 2.238], // Pont de Sèvres
  [48.885, 2.21], // Nanterre (loop)
  [48.94, 2.283], // Gennevilliers top of loop
  [48.942, 2.253], // Argenteuil (exit NW)
];
function smoothPath(points: Array<[number, number]>): string {
  // Render as a single smooth polyline using quadratic beziers between midpoints.
  const pts = points.map(([lat, lng]) => project(lat, lng));
  if (pts.length < 2) return "";
  let d = `M ${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
  for (let i = 1; i < pts.length - 1; i++) {
    const [x0, y0] = pts[i];
    const [x1, y1] = pts[i + 1];
    const mx = (x0 + x1) / 2;
    const my = (y0 + y1) / 2;
    d += ` Q ${x0.toFixed(1)} ${y0.toFixed(1)} ${mx.toFixed(1)} ${my.toFixed(1)}`;
  }
  const last = pts[pts.length - 1];
  d += ` T ${last[0].toFixed(1)} ${last[1].toFixed(1)}`;
  return d;
}
const SEINE_PATH = smoothPath(SEINE_WAYPOINTS);

// ─────────────────────────────────────────────────────────────────────────────
// Communes with REAL GPS coordinates.
// ─────────────────────────────────────────────────────────────────────────────
interface Commune {
  name: string;
  cp: string;
  lat: number;
  lng: number;
  avgMin: number;
  tier: "hq" | "primary" | "secondary";
}

const COMMUNES_RAW: Commune[] = [
  // HQ
  { name: "Clichy", cp: "92110", lat: 48.9019, lng: 2.3058, avgMin: 0, tier: "hq" },
  // Petite couronne primary
  { name: "Levallois-Perret", cp: "92300", lat: 48.8933, lng: 2.288, avgMin: 12, tier: "primary" },
  { name: "Neuilly-sur-Seine", cp: "92200", lat: 48.8848, lng: 2.2692, avgMin: 15, tier: "primary" },
  { name: "Asnières", cp: "92600", lat: 48.9167, lng: 2.2883, avgMin: 14, tier: "primary" },
  { name: "La Défense", cp: "92800", lat: 48.8921, lng: 2.2386, avgMin: 22, tier: "primary" },
  { name: "Courbevoie", cp: "92400", lat: 48.8951, lng: 2.2553, avgMin: 18, tier: "primary" },
  { name: "Puteaux", cp: "92800", lat: 48.8842, lng: 2.2393, avgMin: 24, tier: "primary" },
  { name: "Saint-Ouen", cp: "93400", lat: 48.9073, lng: 2.3345, avgMin: 20, tier: "primary" },
  { name: "Colombes", cp: "92700", lat: 48.9236, lng: 2.2544, avgMin: 25, tier: "primary" },
  { name: "Nanterre", cp: "92000", lat: 48.8923, lng: 2.2072, avgMin: 26, tier: "primary" },
  { name: "Paris 17e", cp: "75017", lat: 48.8872, lng: 2.3099, avgMin: 25, tier: "primary" },
  { name: "Paris 8e", cp: "75008", lat: 48.8721, lng: 2.3153, avgMin: 30, tier: "primary" },
  { name: "Saint-Denis", cp: "93200", lat: 48.9356, lng: 2.3539, avgMin: 28, tier: "secondary" },
  { name: "Paris 16e", cp: "75016", lat: 48.862, lng: 2.2762, avgMin: 32, tier: "secondary" },
  { name: "Boulogne", cp: "92100", lat: 48.8351, lng: 2.2402, avgMin: 35, tier: "secondary" },
  { name: "Issy", cp: "92130", lat: 48.824, lng: 2.2735, avgMin: 38, tier: "secondary" },
  { name: "Suresnes", cp: "92150", lat: 48.8691, lng: 2.2293, avgMin: 28, tier: "secondary" },
  { name: "Saint-Cloud", cp: "92210", lat: 48.8402, lng: 2.2169, avgMin: 32, tier: "secondary" },
];

type CommuneWithXY = Commune & { x: number; y: number };

const COMMUNES: CommuneWithXY[] = COMMUNES_RAW.map((c) => {
  const [x, y] = project(c.lat, c.lng);
  return { ...c, x, y };
});

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────
interface InterventionMapProps {
  /**
   * 'hero'    — full-bleed map, fills its parent, no internal heading/side.
   *             The parent is expected to be position:relative and provide
   *             its own overlay + content layer above.
   * 'section' — legacy boxed layout with heading + side panel + CTAs.
   */
  variant?: "hero" | "section";
}

export default function InterventionMap({ variant = "hero" }: InterventionMapProps) {
  const [hovered, setHovered] = useState<string | null>(null);
  const reduce = useReducedMotion();
  const hq = COMMUNES.find((c) => c.tier === "hq")!;
  const otherCommunes = useMemo(() => COMMUNES.filter((c) => c.tier !== "hq"), []);

  const Svg = (
    <svg
      viewBox="0 0 1000 700"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Carte interactive des communes d'intervention en Île-de-France"
      preserveAspectRatio={variant === "hero" ? "xMidYMid slice" : "xMidYMid meet"}
      className="w-full h-full"
    >
      <defs>
        {/* Pin glows */}
        <radialGradient id="pinGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(96, 165, 250, 0.7)" />
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
        {/* Coverage halo */}
        <radialGradient id="coverageHalo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(59, 130, 246, 0.22)" />
          <stop offset="55%" stopColor="rgba(59, 130, 246, 0.07)" />
          <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
        </radialGradient>
        {/* Paris subtle fill */}
        <radialGradient id="parisFill" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="rgba(139, 92, 246, 0.12)" />
          <stop offset="100%" stopColor="rgba(139, 92, 246, 0.02)" />
        </radialGradient>
        {/* Seine gradient */}
        <linearGradient id="seine" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(14, 165, 233, 0.4)" />
          <stop offset="50%" stopColor="rgba(56, 189, 248, 0.9)" />
          <stop offset="100%" stopColor="rgba(14, 165, 233, 0.4)" />
        </linearGradient>
        {/* Trace gradient */}
        <linearGradient id="trace" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(96, 165, 250, 0.5)" />
          <stop offset="100%" stopColor="rgba(96, 165, 250, 0.05)" />
        </linearGradient>
        <linearGradient id="traceHot" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(251, 191, 36, 1)" />
          <stop offset="100%" stopColor="rgba(251, 191, 36, 0.1)" />
        </linearGradient>
        <filter id="packetGlow" x="-200%" y="-200%" width="500%" height="500%">
          <feGaussianBlur stdDeviation="2.5" result="glow" />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="labelShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="1" stdDeviation="2.5" floodColor="rgba(0,0,0,0.9)" />
        </filter>
      </defs>

      {/* Coverage halo centred on HQ — background layer */}
      <circle cx={hq.x} cy={hq.y} r="380" fill="url(#coverageHalo)" />

      {/* Paris boundary (boulevard périphérique) — real vertices, visible but subtle */}
      <path d={PARIS_PATH} fill="url(#parisFill)" />
      <path
        d={PARIS_PATH}
        fill="none"
        stroke="rgba(167, 139, 250, 0.45)"
        strokeWidth="1.5"
        strokeDasharray="4 3"
      />

      {/* Seine — outer glow pass */}
      <path
        d={SEINE_PATH}
        stroke="rgba(56, 189, 248, 0.28)"
        strokeWidth="36"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="blur(10px)"
      />
      <motion.path
        d={SEINE_PATH}
        stroke="url(#seine)"
        strokeWidth="8"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2.2, ease: "easeInOut" }}
      />
      {!reduce && (
        <path
          d={SEINE_PATH}
          stroke="rgba(255, 255, 255, 0.45)"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="6 42"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="-480"
            dur="9s"
            repeatCount="indefinite"
          />
        </path>
      )}

      {/* Circuit traces HQ → others — thin, subtle, non-animated loop */}
      {otherCommunes.map((c, i) => {
        const isHovered = hovered === c.name;
        const traceId = `trace-${c.name.replace(/[^a-z0-9]/gi, "")}`;
        return (
          <g key={`line-g-${c.name}`}>
            <motion.path
              id={traceId}
              d={`M ${hq.x.toFixed(1)} ${hq.y.toFixed(1)} L ${c.x.toFixed(1)} ${c.y.toFixed(1)}`}
              stroke={isHovered ? "url(#traceHot)" : "url(#trace)"}
              strokeWidth={isHovered ? 2 : 1}
              strokeDasharray={isHovered ? "0" : "3 6"}
              fill="none"
              initial={reduce ? { pathLength: 1, opacity: 0.25 } : { pathLength: 0, opacity: 0 }}
              whileInView={{
                pathLength: 1,
                opacity: isHovered ? 0.95 : c.tier === "primary" ? 0.35 : 0.2,
              }}
              viewport={{ once: true }}
              transition={{
                pathLength: { duration: 0.8, delay: 0.4 + i * 0.03, ease: "easeOut" },
                opacity: { duration: 0.3 },
              }}
            />
            {/* Packet only on hover (no more fake live rotation) */}
            {!reduce && isHovered && (
              <circle r="4" fill="#fbbf24" filter="url(#packetGlow)" opacity="0.95">
                <animateMotion dur="0.9s" repeatCount="indefinite" rotate="auto">
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
        const baseRadius = isHQ ? 11 : c.tier === "primary" ? 6 : 4.5;
        // Show label always for HQ + primary; on hover only for secondary
        const showLabel = isHQ || c.tier === "primary" || isHovered;

        return (
          <g
            key={c.name}
            onMouseEnter={() => setHovered(c.name)}
            onMouseLeave={() => setHovered((h) => (h === c.name ? null : h))}
            onFocus={() => setHovered(c.name)}
            onBlur={() => setHovered((h) => (h === c.name ? null : h))}
            tabIndex={0}
            role="button"
            aria-label={`${c.name} — intervention moyenne ${c.avgMin === 0 ? "0 (siège)" : c.avgMin} minutes`}
            className="cursor-pointer outline-none"
          >
            {/* HQ outer soft aura */}
            {isHQ && (
              <circle cx={c.x} cy={c.y} r="34" fill="url(#pinGlowHQOuter)" opacity="0.8">
                {!reduce && (
                  <>
                    <animate attributeName="r" values="34;46;34" dur="2.6s" repeatCount="indefinite" />
                    <animate
                      attributeName="opacity"
                      values="0.8;0.35;0.8"
                      dur="2.6s"
                      repeatCount="indefinite"
                    />
                  </>
                )}
              </circle>
            )}
            {/* Pulsing glow ring */}
            <circle
              cx={c.x}
              cy={c.y}
              r={isHQ ? 22 : 14}
              fill={isHQ ? "url(#pinGlowHQ)" : "url(#pinGlow)"}
              opacity={isHQ ? 0.95 : 0.6}
            >
              {!reduce && (
                <>
                  <animate
                    attributeName="r"
                    values={isHQ ? "22;30;22" : "14;22;14"}
                    dur={isHQ ? "1.8s" : `${2.6 + Math.abs((c.x % 9)) * 0.1}s`}
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values={isHQ ? "0.95;0.35;0.95" : "0.55;0.15;0.55"}
                    dur={isHQ ? "1.8s" : `${2.6 + Math.abs((c.x % 9)) * 0.1}s`}
                    repeatCount="indefinite"
                  />
                </>
              )}
            </circle>
            {/* Hover ripple */}
            {!reduce && isHovered && !isHQ && (
              <circle
                key={`ripple-${c.name}`}
                cx={c.x}
                cy={c.y}
                r={baseRadius}
                fill="none"
                stroke="rgba(251, 191, 36, 0.9)"
                strokeWidth="2"
              >
                <animate attributeName="r" from={String(baseRadius)} to="38" dur="0.9s" repeatCount="1" />
                <animate attributeName="opacity" from="1" to="0" dur="0.9s" repeatCount="1" />
              </circle>
            )}
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
            {/* HQ inner bright core */}
            {isHQ && (
              <circle cx={c.x} cy={c.y} r="4" fill="#fef3c7">
                {!reduce && (
                  <animate attributeName="opacity" values="1;0.4;1" dur="1.8s" repeatCount="indefinite" />
                )}
              </circle>
            )}
            {/* Label */}
            {showLabel && (
              <g className="pointer-events-none">
                <text
                  x={c.x + (isHQ ? 24 : 12)}
                  y={c.y - 4}
                  fill={isHQ ? "#fef3c7" : "white"}
                  fontSize={isHQ ? 15 : 12}
                  fontWeight="700"
                  style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
                  filter="url(#labelShadow)"
                >
                  {c.name}
                </text>
                {(isHQ || isHovered) && (
                  <text
                    x={c.x + (isHQ ? 24 : 12)}
                    y={c.y + 11}
                    fill="rgba(255,255,255,0.75)"
                    fontSize="10.5"
                    fontWeight="500"
                    filter="url(#labelShadow)"
                  >
                    {isHQ ? "Siège · 24/7" : `≈ ${c.avgMin} min`}
                  </text>
                )}
              </g>
            )}
          </g>
        );
      })}
    </svg>
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // HERO variant — fills parent, no chrome. Parent handles text overlay.
  // ═══════════════════════════════════════════════════════════════════════════
  if (variant === "hero") {
    return (
      <div className="absolute inset-0 w-full h-full" aria-hidden={false}>
        {Svg}
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION variant — legacy boxed layout (kept for future reuse)
  // ═══════════════════════════════════════════════════════════════════════════
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
            Chaque commune à <span className="gradient-text-living">moins de 40 min</span>
          </h2>
          <p className="text-lg text-dark-300 leading-relaxed">
            Basés à Clichy (92), nos équipes rayonnent sur Paris et toute la petite couronne.
            Survolez une commune pour voir notre temps moyen d&apos;intervention.
          </p>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:items-center">
          <div className="relative rounded-3xl overflow-hidden glass-panel p-4 md:p-6 aspect-[10/7]">
            {Svg}
          </div>

          <div className="space-y-4">
            <div className="glass-panel rounded-2xl p-6">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <div className="font-display font-bold text-2xl text-white">{COMMUNES.length}+</div>
                  <div className="text-white/60 text-xs mt-0.5">Communes couvertes</div>
                </div>
                <div>
                  <div className="font-display font-bold text-2xl text-white">&lt; 40 min</div>
                  <div className="text-white/60 text-xs mt-0.5">Intervention max</div>
                </div>
                <div>
                  <div className="font-display font-bold text-2xl text-white">24/7</div>
                  <div className="text-white/60 text-xs mt-0.5">Urgences</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Link href="/demande-intervention" className="btn-primary btn-lg justify-center">
                <Zap className="w-5 h-5" />
                Demander une intervention
              </Link>
              <a
                href="tel:+33100000000"
                className="btn glass-panel text-white hover:bg-white/15 btn-lg justify-center"
              >
                <Phone className="w-5 h-5" />
                Urgence — appeler maintenant
              </a>
            </div>

            <p className="text-white/50 text-xs flex items-center gap-1.5">
              <Clock className="w-3 h-3" />
              Temps d&apos;intervention indicatifs, hors heures de pointe.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
