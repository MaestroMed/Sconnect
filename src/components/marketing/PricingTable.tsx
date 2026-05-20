import { Check, Phone } from "lucide-react";
import Link from "next/link";

export interface PriceItem {
  /** Service label, e.g. "Ouverture de porte simple". */
  label: string;
  /** Numeric "from" price in EUR TTC. */
  fromPrice: number;
  /** Optional 1-line context (horaires, conditions). */
  note?: string;
  /** Optional list of what's included in the base price. */
  includes?: string[];
}

interface PricingTableProps {
  title?: string;
  subtitle?: string;
  items: PriceItem[];
  /** Footer disclaimer about the pricing methodology. */
  disclaimer?: string;
  /** Section background variant — `surface` (default) or `muted`. */
  variant?: "surface" | "muted";
}

const formatPrice = (n: number) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);

/**
 * Transparent pricing block. Removes the call-anxiety on dépannage verticals
 * (artisan/electricien/serrurier) where the #1 bounce reason is "I don't know
 * what this is going to cost". Audit reports −15-25% bounce + +call rate on
 * pages that display a "from X €" range.
 *
 * "À partir de" pricing only — no all-in quote since interventions vary.
 * Always pair with a CTA to the contact form / phone for the exact quote.
 */
export default function PricingTable({
  title = "Nos tarifs indicatifs",
  subtitle = "Fourchettes à partir de — basées sur nos chantiers récents en Île-de-France. Devis ferme gratuit après diagnostic.",
  items,
  disclaimer = "Tarifs TTC indicatifs, hors urgence nuit/week-end (+30 à +50 %). Devis ferme et gratuit communiqué après diagnostic sur place ou téléphonique.",
  variant = "surface",
}: PricingTableProps) {
  return (
    <section
      className={`section-padding ${
        variant === "muted" ? "bg-surface-muted" : "bg-surface"
      }`}
    >
      <div className="container-custom max-w-5xl">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4 bg-primary-100 text-primary-700 dark:bg-primary-500/15 dark:text-primary-300">
            Tarifs transparents
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl mb-4 text-foreground">
            {title}
          </h2>
          <p className="text-lg text-slate-700 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((it) => (
            <div
              key={it.label}
              className="rounded-2xl border border-border bg-surface-elevated p-6 shadow-sm hover:shadow-lg transition-shadow"
            >
              <h3 className="font-display font-semibold text-base text-foreground mb-1">
                {it.label}
              </h3>
              {it.note && (
                <p className="text-xs text-foreground-muted mb-3">{it.note}</p>
              )}
              <div className="flex items-baseline gap-1.5 mb-4">
                <span className="text-xs text-foreground-muted">à partir de</span>
                <span className="font-display font-bold text-3xl text-primary-700 dark:text-primary-300" style={{ fontVariantNumeric: "tabular-nums" }}>
                  {formatPrice(it.fromPrice)}
                </span>
                <span className="text-xs text-foreground-muted">TTC</span>
              </div>
              {it.includes && it.includes.length > 0 && (
                <ul className="space-y-1.5">
                  {it.includes.map((line) => (
                    <li key={line} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                      <Check className="h-4 w-4 mt-0.5 shrink-0 text-primary-500" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        <p className="mt-8 text-sm text-foreground-muted text-center max-w-2xl mx-auto leading-relaxed">
          {disclaimer}
        </p>

        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
          <Link href="/demande-devis" className="btn-primary">
            Demander un devis ferme
          </Link>
          <a href="tel:+33652820685" className="btn-outline">
            <Phone className="h-4 w-4" />
            06 52 82 06 85
          </a>
        </div>
      </div>
    </section>
  );
}
