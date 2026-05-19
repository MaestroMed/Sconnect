"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Building2,
  Store,
  Car,
  Warehouse,
  TrendingDown,
  Sparkles,
  Clock,
  ChevronRight,
  Calculator as CalcIcon,
  type LucideIcon,
} from "lucide-react";

type TypoKey = "bureau" | "commerce" | "copropriete" | "industriel";

interface TypoConfig {
  key: TypoKey;
  label: string;
  short: string;
  icon: LucideIcon;
  accent: string; // gradient classes for the icon background
  /** Power draw per m² of the OLD lighting park (W/m²). */
  currentWPerSqm: number;
  /** Reduction in conso after relamping (%). */
  reductionPercent: number;
  /** Material + install cost per m² of building (€ HT). */
  costPerSqm: number;
  /** Share of total cost covered by CEE prime (%). */
  ceePercent: number;
  /** Surface bounds suggested for the slider. */
  defaultSurface: number;
  minSurface: number;
  maxSurface: number;
  /** Default usage. */
  defaultHoursPerDay: number;
  defaultDaysPerWeek: number;
  /** Default tariff €/kWh (HT). */
  defaultTariff: number;
}

const TYPOS: TypoConfig[] = [
  {
    key: "bureau",
    label: "Bureau & tertiaire",
    short: "Open-space, plateaux, salles de réunion",
    icon: Building2,
    accent: "from-primary-500 to-electric-500",
    currentWPerSqm: 28, // old fluo T5/T8 with ballast losses, dense 4-tube fixtures
    reductionPercent: 65,
    costPerSqm: 50,
    ceePercent: 40,
    defaultSurface: 600,
    minSurface: 100,
    maxSurface: 5000,
    defaultHoursPerDay: 10,
    defaultDaysPerWeek: 5,
    defaultTariff: 0.28,
  },
  {
    key: "commerce",
    label: "Commerce & restaurant",
    short: "Boutiques, restaurants, hôtels",
    icon: Store,
    accent: "from-amber-500 to-orange-400",
    currentWPerSqm: 25,
    reductionPercent: 70,
    costPerSqm: 70,
    ceePercent: 40,
    defaultSurface: 200,
    minSurface: 50,
    maxSurface: 2000,
    defaultHoursPerDay: 12,
    defaultDaysPerWeek: 7,
    defaultTariff: 0.28,
  },
  {
    key: "copropriete",
    label: "Copropriété & parking",
    short: "Halls, parkings, communs",
    icon: Car,
    accent: "from-emerald-500 to-teal-400",
    currentWPerSqm: 5,
    reductionPercent: 75,
    costPerSqm: 8,
    ceePercent: 45,
    defaultSurface: 1500,
    minSurface: 200,
    maxSurface: 10000,
    defaultHoursPerDay: 18,
    defaultDaysPerWeek: 7,
    defaultTariff: 0.23,
  },
  {
    key: "industriel",
    label: "Industriel & entrepôt",
    short: "Entrepôts, ateliers, hangars",
    icon: Warehouse,
    accent: "from-violet-500 to-purple-400",
    currentWPerSqm: 10,
    reductionPercent: 80,
    costPerSqm: 11,
    ceePercent: 50,
    defaultSurface: 5000,
    minSurface: 500,
    maxSurface: 30000,
    defaultHoursPerDay: 16,
    defaultDaysPerWeek: 6,
    defaultTariff: 0.21,
  },
];

const fmt = (n: number) =>
  new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(Math.max(0, Math.round(n)));

const fmtEuro = (n: number) => fmt(n) + " €";
const fmtKwh = (n: number) => fmt(n) + " kWh/an";
const fmtMonths = (n: number) => {
  const months = Math.max(0, Math.round(n));
  if (months < 24) return `${months} mois`;
  const years = Math.floor(months / 12);
  const rem = months % 12;
  return rem === 0 ? `${years} ans` : `${years} ans ${rem} mois`;
};

export default function RelampingROICalculator() {
  const [typoKey, setTypoKey] = useState<TypoKey>("bureau");
  const typo = TYPOS.find((t) => t.key === typoKey)!;

  const [surface, setSurface] = useState(typo.defaultSurface);
  const [hours, setHours] = useState(typo.defaultHoursPerDay);
  const [days, setDays] = useState(typo.defaultDaysPerWeek);
  const [tariff, setTariff] = useState(typo.defaultTariff);

  // Snap inputs back to defaults when typology changes.
  const handleTypoChange = (k: TypoKey) => {
    const t = TYPOS.find((x) => x.key === k)!;
    setTypoKey(k);
    setSurface(t.defaultSurface);
    setHours(t.defaultHoursPerDay);
    setDays(t.defaultDaysPerWeek);
    setTariff(t.defaultTariff);
  };

  const result = useMemo(() => {
    const annualHours = hours * days * 52;
    const currentKwh = (surface * typo.currentWPerSqm * annualHours) / 1000;
    const futureKwh = currentKwh * (1 - typo.reductionPercent / 100);
    const savedKwh = currentKwh - futureKwh;
    const savedEuroPerYear = savedKwh * tariff;
    const totalCostHT = surface * typo.costPerSqm;
    const ceePrime = totalCostHT * (typo.ceePercent / 100);
    const remainingCost = totalCostHT - ceePrime;
    const roiMonths = savedEuroPerYear > 0 ? (remainingCost / savedEuroPerYear) * 12 : 0;
    const saving10Years = savedEuroPerYear * 10 - remainingCost;
    return {
      annualHours,
      currentKwh,
      futureKwh,
      savedKwh,
      savedEuroPerYear,
      totalCostHT,
      ceePrime,
      remainingCost,
      roiMonths,
      saving10Years,
    };
  }, [typo, surface, hours, days, tariff]);

  return (
    <section
      id="calculateur-roi"
      className="section-padding bg-gradient-to-b from-surface-muted via-surface to-surface-muted"
    >
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 border border-primary-200 text-primary-700 dark:bg-primary-500/15 dark:border-primary-500/30 dark:text-primary-300 text-sm font-semibold mb-6">
            <CalcIcon className="w-4 h-4" />
            Calculateur ROI · estimation rapide
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-5 leading-tight">
            Combien votre éclairage vous coûte vraiment ?
          </h2>
          <p className="text-lg text-foreground-muted leading-relaxed">
            Choisissez votre typologie, ajustez les paramètres. Le calcul utilise
            les ratios réels de nos chantiers 2024-2026 — c&apos;est l&apos;estimation
            qu&apos;on vous remettrait à 5 % près après un audit sur site.
          </p>
        </div>

        <div className="rounded-3xl bg-surface-elevated border border-border shadow-xl shadow-dark-900/5 overflow-hidden">
          {/* ─── STEP 1 — typology cards ──────────────────────────────────── */}
          <div className="p-6 md:p-8 border-b border-border">
            <div className="text-sm font-semibold text-foreground-muted mb-4 uppercase tracking-wider">
              1. Votre environnement
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {TYPOS.map((t) => {
                const Icon = t.icon;
                const selected = t.key === typoKey;
                return (
                  <button
                    key={t.key}
                    type="button"
                    onClick={() => handleTypoChange(t.key)}
                    className={`relative text-left p-4 rounded-2xl border-2 transition-all ${
                      selected
                        ? "border-primary-500 bg-primary-50 dark:bg-primary-500/10 shadow-md"
                        : "border-border bg-surface hover:border-primary-300 dark:hover:border-primary-500/50"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-xl bg-gradient-to-br ${t.accent} flex items-center justify-center mb-3 shadow`}
                    >
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="font-display font-bold text-sm text-foreground mb-1">
                      {t.label}
                    </div>
                    <div className="text-xs text-foreground-muted leading-snug">{t.short}</div>
                    {selected && (
                      <span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-primary-500" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ─── STEP 2 — inputs ──────────────────────────────────────────── */}
          <div className="p-6 md:p-8 border-b border-border bg-surface">
            <div className="text-sm font-semibold text-foreground-muted mb-6 uppercase tracking-wider">
              2. Vos paramètres
            </div>
            <div className="grid md:grid-cols-2 gap-x-10 gap-y-6">
              {/* Surface */}
              <div>
                <div className="flex items-baseline justify-between mb-2">
                  <label htmlFor="surface" className="text-sm font-semibold text-foreground">
                    Surface du site
                  </label>
                  <span className="font-display font-bold text-2xl text-primary-600 dark:text-primary-300 tabular-nums">
                    {fmt(surface)} m²
                  </span>
                </div>
                <input
                  id="surface"
                  type="range"
                  min={typo.minSurface}
                  max={typo.maxSurface}
                  step={typo.minSurface < 500 ? 50 : 100}
                  value={surface}
                  onChange={(e) => setSurface(Number(e.target.value))}
                  className="w-full accent-primary-500"
                />
                <div className="flex justify-between text-xs text-foreground-muted mt-1">
                  <span>{fmt(typo.minSurface)} m²</span>
                  <span>{fmt(typo.maxSurface)} m²</span>
                </div>
              </div>

              {/* Heures par jour */}
              <div>
                <div className="flex items-baseline justify-between mb-2">
                  <label htmlFor="hours" className="text-sm font-semibold text-foreground">
                    Heures d&apos;éclairage par jour
                  </label>
                  <span className="font-display font-bold text-2xl text-primary-600 dark:text-primary-300 tabular-nums">
                    {hours} h
                  </span>
                </div>
                <input
                  id="hours"
                  type="range"
                  min={4}
                  max={24}
                  step={1}
                  value={hours}
                  onChange={(e) => setHours(Number(e.target.value))}
                  className="w-full accent-primary-500"
                />
                <div className="flex justify-between text-xs text-foreground-muted mt-1">
                  <span>4 h</span>
                  <span>24 h (24/7)</span>
                </div>
              </div>

              {/* Jours par semaine */}
              <div>
                <div className="flex items-baseline justify-between mb-2">
                  <label htmlFor="days" className="text-sm font-semibold text-foreground">
                    Jours par semaine
                  </label>
                  <span className="font-display font-bold text-2xl text-primary-600 dark:text-primary-300 tabular-nums">
                    {days} j
                  </span>
                </div>
                <input
                  id="days"
                  type="range"
                  min={1}
                  max={7}
                  step={1}
                  value={days}
                  onChange={(e) => setDays(Number(e.target.value))}
                  className="w-full accent-primary-500"
                />
                <div className="flex justify-between text-xs text-foreground-muted mt-1">
                  <span>1 j</span>
                  <span>7 j</span>
                </div>
              </div>

              {/* Tarif électricité */}
              <div>
                <div className="flex items-baseline justify-between mb-2">
                  <label htmlFor="tariff" className="text-sm font-semibold text-foreground">
                    Tarif électricité
                  </label>
                  <span className="font-display font-bold text-2xl text-primary-600 dark:text-primary-300 tabular-nums">
                    {tariff.toFixed(2)} €/kWh
                  </span>
                </div>
                <input
                  id="tariff"
                  type="range"
                  min={0.15}
                  max={0.4}
                  step={0.01}
                  value={tariff}
                  onChange={(e) => setTariff(Number(e.target.value))}
                  className="w-full accent-primary-500"
                />
                <div className="flex justify-between text-xs text-foreground-muted mt-1">
                  <span>0,15 € (HTA gros)</span>
                  <span>0,40 € (HTB petit)</span>
                </div>
              </div>
            </div>
          </div>

          {/* ─── STEP 3 — results ─────────────────────────────────────────── */}
          <div className="p-6 md:p-8 bg-gradient-to-br from-primary-950 via-dark-950 to-electric-950 text-white">
            <div className="text-sm font-semibold text-primary-200 mb-6 uppercase tracking-wider">
              3. Estimation de votre projet
            </div>

            {/* Big headline KPIs */}
            <div className="grid md:grid-cols-3 gap-4 md:gap-6 mb-8">
              <div className="rounded-2xl bg-white/5 border border-white/10 p-5 backdrop-blur">
                <div className="flex items-center gap-2 text-emerald-300 text-xs font-semibold mb-2 uppercase tracking-wider">
                  <TrendingDown className="w-4 h-4" />
                  Économie annuelle
                </div>
                <div className="font-display font-bold text-3xl md:text-4xl text-white tabular-nums leading-none">
                  {fmtEuro(result.savedEuroPerYear)}
                </div>
                <div className="text-white/60 text-xs mt-2">
                  Soit {fmt(result.savedKwh)} kWh d&apos;électricité évités chaque année.
                </div>
              </div>

              <div className="rounded-2xl bg-white/5 border border-white/10 p-5 backdrop-blur">
                <div className="flex items-center gap-2 text-amber-300 text-xs font-semibold mb-2 uppercase tracking-wider">
                  <Sparkles className="w-4 h-4" />
                  Prime CEE estimée
                </div>
                <div className="font-display font-bold text-3xl md:text-4xl text-white tabular-nums leading-none">
                  {fmtEuro(result.ceePrime)}
                </div>
                <div className="text-white/60 text-xs mt-2">
                  ≈ {typo.ceePercent}% du coût matériel + pose financé par les CEE.
                </div>
              </div>

              <div className="rounded-2xl bg-white/5 border border-white/10 p-5 backdrop-blur">
                <div className="flex items-center gap-2 text-electric-300 text-xs font-semibold mb-2 uppercase tracking-wider">
                  <Clock className="w-4 h-4" />
                  Retour sur investissement
                </div>
                <div className="font-display font-bold text-3xl md:text-4xl text-white tabular-nums leading-none">
                  {fmtMonths(result.roiMonths)}
                </div>
                <div className="text-white/60 text-xs mt-2">
                  Après déduction de la prime CEE, l&apos;économie annuelle amortit le reste à charge.
                </div>
              </div>
            </div>

            {/* Detailed breakdown table */}
            <div className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden mb-6">
              <table className="w-full text-sm">
                <tbody className="divide-y divide-white/10">
                  <tr>
                    <td className="px-5 py-3 text-white/70">Consommation actuelle estimée</td>
                    <td className="px-5 py-3 text-right font-display font-bold text-white tabular-nums">
                      {fmtKwh(result.currentKwh)}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-5 py-3 text-white/70">
                      Consommation après relamping (−{typo.reductionPercent} %)
                    </td>
                    <td className="px-5 py-3 text-right font-display font-bold text-white tabular-nums">
                      {fmtKwh(result.futureKwh)}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-5 py-3 text-white/70">Coût matériel + pose HT</td>
                    <td className="px-5 py-3 text-right font-display font-bold text-white tabular-nums">
                      {fmtEuro(result.totalCostHT)}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-5 py-3 text-emerald-200">− Prime CEE déduite</td>
                    <td className="px-5 py-3 text-right font-display font-bold text-emerald-300 tabular-nums">
                      −{fmtEuro(result.ceePrime)}
                    </td>
                  </tr>
                  <tr className="bg-white/5">
                    <td className="px-5 py-3 text-white font-semibold">Reste à charge HT</td>
                    <td className="px-5 py-3 text-right font-display font-bold text-white text-lg tabular-nums">
                      {fmtEuro(result.remainingCost)}
                    </td>
                  </tr>
                  <tr className="bg-emerald-500/10">
                    <td className="px-5 py-3 text-emerald-100 font-semibold">
                      Économie nette cumulée sur 10 ans
                    </td>
                    <td className="px-5 py-3 text-right font-display font-bold text-emerald-200 text-lg tabular-nums">
                      {fmtEuro(result.saving10Years)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-white/60 text-xs mb-6 leading-relaxed">
              Estimation basée sur les ratios moyens de nos chantiers en Île-de-France (matériel
              Trilux / Sylvania / Philips OEM, drivers Tridonic, fiches CEE BAT-EQ-127 +
              BAT-EQ-130 + IND-UT-130). La marge typique entre cette estimation et le devis final
              après audit est de ± 5 %. Cours CEE pris à 0,0085 €/kWh cumac (mai 2026).
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/demande-devis" className="btn-white btn-lg">
                Demander un audit pour confirmer
                <ChevronRight className="w-5 h-5" />
              </Link>
              <a
                href="tel:+33652820685"
                className="btn glass-panel text-white hover:bg-white/15 btn-lg border border-white/20"
              >
                06 52 82 06 85
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
