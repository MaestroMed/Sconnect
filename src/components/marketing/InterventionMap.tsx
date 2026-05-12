"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { MapPin, Clock, Phone, ArrowRight } from "lucide-react";
import Link from "next/link";

// ─────────────────────────────────────────────────────────────────────────────
// Real-world geography → SVG coordinates (Apple-Maps-style minimal renderer).
// ─────────────────────────────────────────────────────────────────────────────
//   x = (lng − 2.10) / 0.45 × 1000           lng 2.10..2.55 → x 0..1000
//   y = (49.00 − lat) / 0.24 × 700           lat 49.00..48.76 → y 0..700
const project = (lat: number, lng: number): [number, number] => [
  ((lng - 2.1) / 0.45) * 1000,
  ((49 - lat) / 0.24) * 700,
];

// Department polygons — simplified boundaries traced from real coords.
const PARIS_VERTICES: Array<[number, number]> = [
  [48.898, 2.361], [48.891, 2.39], [48.881, 2.412], [48.869, 2.416],
  [48.846, 2.413], [48.833, 2.416], [48.825, 2.391], [48.818, 2.338],
  [48.822, 2.313], [48.84, 2.287], [48.855, 2.249], [48.878, 2.253],
  [48.891, 2.282], [48.898, 2.321],
];
const HDS_VERTICES: Array<[number, number]> = [
  [48.945, 2.328], [48.9, 2.307], [48.878, 2.284], [48.855, 2.268],
  [48.835, 2.249], [48.82, 2.273], [48.821, 2.311], [48.817, 2.32],
  [48.78, 2.316], [48.77, 2.26], [48.78, 2.205], [48.81, 2.165],
  [48.86, 2.158], [48.9, 2.165], [48.93, 2.2], [48.942, 2.23], [48.95, 2.28],
];
const SSD_VERTICES: Array<[number, number]> = [
  [48.96, 2.34], [49.01, 2.48], [49.0, 2.62], [48.94, 2.63],
  [48.88, 2.6], [48.855, 2.495], [48.86, 2.42], [48.89, 2.39],
  [48.915, 2.368], [48.94, 2.34],
];
const VDM_VERTICES: Array<[number, number]> = [
  [48.85, 2.42], [48.84, 2.5], [48.85, 2.58], [48.79, 2.6],
  [48.735, 2.555], [48.685, 2.475], [48.72, 2.38], [48.77, 2.34],
  [48.8, 2.36], [48.82, 2.4],
];

function polygonPath(vertices: Array<[number, number]>): string {
  return (
    "M " +
    vertices.map((v) => project(v[0], v[1]).map((n) => n.toFixed(1)).join(" ")).join(" L ") +
    " Z"
  );
}

const PARIS_PATH = polygonPath(PARIS_VERTICES);
const HDS_PATH = polygonPath(HDS_VERTICES);
const SSD_PATH = polygonPath(SSD_VERTICES);
const VDM_PATH = polygonPath(VDM_VERTICES);

// Seine — single static path, no glow, no animation. Just a quiet anchor.
const SEINE_WAYPOINTS: Array<[number, number]> = [
  [48.788, 2.426], [48.835, 2.381], [48.843, 2.37], [48.855, 2.35],
  [48.86, 2.33], [48.862, 2.294], [48.839, 2.238], [48.885, 2.21],
  [48.94, 2.283], [48.942, 2.253],
];
function smoothPath(points: Array<[number, number]>): string {
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
// Communes — real GPS coords. Tier drives visual weight only.
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
  { name: "Clichy", cp: "92110", lat: 48.9019, lng: 2.3058, avgMin: 0, tier: "hq" },
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
// Component — Apple-Maps-minimalist style. Light card, soft pastel fills,
// no animated traces, no fake live data. The map is a quiet credential,
// not a dashboard.
// ─────────────────────────────────────────────────────────────────────────────
interface InterventionMapProps {
  variant?: "section";
}

export default function InterventionMap({ variant = "section" }: InterventionMapProps) {
  const [hovered, setHovered] = useState<string | null>(null);
  const reduce = useReducedMotion();
  const hq = COMMUNES.find((c) => c.tier === "hq")!;
  const others = useMemo(() => COMMUNES.filter((c) => c.tier !== "hq"), []);

  return (
    <section className="relative bg-surface-muted py-20 md:py-28">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="mb-10 max-w-2xl"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 dark:bg-primary-500/10 border border-primary-200 dark:border-primary-500/20 text-primary-700 dark:text-primary-300 text-sm font-semibold mb-6">
            <MapPin className="w-4 h-4" />
            Zone d&apos;intervention
          </span>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-5 leading-tight">
            Chaque commune à{" "}
            <span className="gradient-text-living">moins de 40 min</span>
          </h2>
          <p className="text-lg text-foreground-muted leading-relaxed">
            Basés à Clichy (92), nos équipes rayonnent sur Paris et toute la
            petite couronne. Survolez une commune pour voir notre temps moyen
            d&apos;intervention.
          </p>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:items-center">
          {/* Map card — light, clean, Apple-Maps-inspired */}
          <div className="relative rounded-3xl overflow-hidden bg-surface dark:bg-dark-900 border border-border shadow-lg shadow-dark-900/5">
            <div className="relative aspect-[10/7]">
              <svg
                viewBox="0 0 1000 700"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Carte interactive des communes d'intervention en Île-de-France"
                preserveAspectRatio="xMidYMid meet"
                className="w-full h-full"
              >
                <defs>
                  <radialGradient id="hqGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="rgba(245, 158, 11, 0.20)" />
                    <stop offset="100%" stopColor="rgba(245, 158, 11, 0)" />
                  </radialGradient>
                </defs>

                {/* Departments — flat pastel fills with solid hairline strokes */}
                <g aria-hidden="true">
                  <path d={SSD_PATH} className="fill-slate-200/40 stroke-slate-400/40 dark:fill-slate-700/30 dark:stroke-slate-500/30" strokeWidth="0.8" />
                  <path d={VDM_PATH} className="fill-slate-200/40 stroke-slate-400/40 dark:fill-slate-700/30 dark:stroke-slate-500/30" strokeWidth="0.8" />
                  <path d={HDS_PATH} className="fill-primary-100/60 stroke-primary-400/50 dark:fill-primary-500/10 dark:stroke-primary-400/40" strokeWidth="1" />
                  <path d={PARIS_PATH} className="fill-violet-100/50 stroke-violet-400/50 dark:fill-violet-500/10 dark:stroke-violet-400/40" strokeWidth="1" />
                </g>

                {/* Department labels — small caps, muted */}
                {(() => {
                  const labels: Array<{ text: string; pos: [number, number] }> = [
                    { text: "PARIS · 75", pos: project(48.859, 2.345) },
                    { text: "HAUTS-DE-SEINE · 92", pos: project(48.86, 2.2) },
                    { text: "93", pos: project(48.93, 2.48) },
                    { text: "94", pos: project(48.78, 2.48) },
                  ];
                  return labels.map((l) => (
                    <text
                      key={l.text}
                      x={l.pos[0]}
                      y={l.pos[1]}
                      className="fill-foreground-muted/70"
                      fontSize="9"
                      fontWeight="600"
                      textAnchor="middle"
                      letterSpacing="1.5"
                      style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
                    >
                      {l.text}
                    </text>
                  ));
                })()}

                {/* Seine — thin solid line, no glow, no animation */}
                <path
                  d={SEINE_PATH}
                  className="stroke-sky-400/50 dark:stroke-sky-500/40"
                  strokeWidth="2.5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* HQ — amber pin with soft pulsing aura + always-visible label */}
                <g aria-label={`Siège ${hq.name}`}>
                  <circle cx={hq.x} cy={hq.y} r="28" fill="url(#hqGlow)">
                    {!reduce && (
                      <>
                        <animate attributeName="r" values="28;36;28" dur="2.6s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.9;0.5;0.9" dur="2.6s" repeatCount="indefinite" />
                      </>
                    )}
                  </circle>
                  <circle cx={hq.x} cy={hq.y} r="8" fill="#f59e0b" stroke="white" strokeWidth="2" />
                  <circle cx={hq.x} cy={hq.y} r="3" fill="#fef3c7" />
                  <g className="pointer-events-none">
                    <text
                      x={hq.x + 14}
                      y={hq.y - 4}
                      className="fill-foreground"
                      fontSize="13"
                      fontWeight="700"
                      style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
                    >
                      {hq.name}
                    </text>
                    <text
                      x={hq.x + 14}
                      y={hq.y + 10}
                      className="fill-foreground-muted"
                      fontSize="10"
                      fontWeight="500"
                    >
                      Siège · 24/7
                    </text>
                  </g>
                </g>

                {/* Other communes — small dots; on hover reveal a floating label */}
                {others.map((c) => {
                  const isHovered = hovered === c.name;
                  const radius = c.tier === "primary" ? 5 : 4;
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
                      <circle
                        cx={c.x}
                        cy={c.y}
                        r={isHovered ? radius + 3 : radius}
                        className={
                          isHovered
                            ? "fill-primary-600 stroke-white"
                            : "fill-primary-500 stroke-white dark:stroke-dark-950"
                        }
                        strokeWidth="2"
                        style={{ transition: "r 180ms cubic-bezier(0.22, 1, 0.36, 1)" }}
                      />
                      {isHovered && (
                        <g className="pointer-events-none">
                          <rect
                            x={c.x + 10}
                            y={c.y - 22}
                            rx="6"
                            ry="6"
                            width={c.name.length * 7 + 60}
                            height="32"
                            className="fill-foreground"
                            opacity="0.95"
                          />
                          <text
                            x={c.x + 18}
                            y={c.y - 8}
                            className="fill-surface"
                            fontSize="11"
                            fontWeight="700"
                            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
                          >
                            {c.name}
                          </text>
                          <text
                            x={c.x + 18}
                            y={c.y + 4}
                            className="fill-surface"
                            fontSize="10"
                            opacity="0.75"
                          >
                            ≈ {c.avgMin} min
                          </text>
                        </g>
                      )}
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Side panel — stats + CTAs */}
          <div className="space-y-4">
            <div className="bg-surface dark:bg-dark-900 border border-border rounded-2xl p-6 shadow-sm">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <div className="font-display font-bold text-3xl text-foreground tabular-nums">
                    {COMMUNES.length}
                    <span className="text-primary-600 dark:text-primary-400">+</span>
                  </div>
                  <div className="text-foreground-muted text-xs mt-1">Communes couvertes</div>
                </div>
                <div>
                  <div className="font-display font-bold text-3xl text-foreground tabular-nums">
                    &lt;<span className="text-primary-600 dark:text-primary-400">40</span>
                  </div>
                  <div className="text-foreground-muted text-xs mt-1">Minutes max</div>
                </div>
                <div>
                  <div className="font-display font-bold text-3xl text-foreground tabular-nums">
                    24<span className="text-primary-600 dark:text-primary-400">/7</span>
                  </div>
                  <div className="text-foreground-muted text-xs mt-1">Urgences</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Link href="/demande-intervention" className="btn-primary btn-lg justify-center">
                Demander une intervention
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="tel:+33652820685"
                className="btn-outline btn-lg justify-center"
              >
                <Phone className="w-5 h-5" />
                06 52 82 06 85
              </a>
            </div>

            <p className="text-foreground-muted text-xs flex items-center gap-1.5 pt-2">
              <Clock className="w-3 h-3" />
              Temps d&apos;intervention indicatifs, hors heures de pointe.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
