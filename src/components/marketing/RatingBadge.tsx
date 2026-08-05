import Link from "next/link";
import { Star } from "lucide-react";

interface RatingBadgeProps {
  /** Note moyenne RÉELLE, calculée depuis les témoignages affichés sur le
   *  site — jamais de valeur par défaut en dur (afficher une note inventée
   *  = pratique commerciale trompeuse, art. L121-2 C. conso / DGCCRF). */
  rating: number;
  /** Nombre RÉEL d'avis (même source que rating). */
  reviewCount: number;
  /** Optional destination. When omitted the badge renders as a static,
   *  non-interactive trust chip (the dedicated reviews page was removed —
   *  pass a Google Business Profile URL here once available to turn it
   *  back into a link). */
  href?: string;
  /** Visual variant: "dark" on darker section, "light" on white surface. */
  variant?: "dark" | "light";
  className?: string;
}

/**
 * Trust chip displaying the aggregate rating + review count. Intended for
 * fold-1 placement (hero or just below) to give cold visitors a quick
 * credibility signal.
 *
 * Renders as a static element by default. Pass `href` (e.g. a Google
 * Business Profile review URL) to make it a link with hover lift.
 */
export default function RatingBadge({
  rating,
  reviewCount,
  href,
  variant = "light",
  className = "",
}: RatingBadgeProps) {
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.4;

  const base = `inline-flex items-center gap-3 rounded-full px-4 py-2 ${
    variant === "dark"
      ? "bg-white/8 ring-1 ring-white/15 text-white"
      : "bg-surface-elevated ring-1 ring-border text-foreground shadow-sm"
  } ${href ? "transition-all hover:-translate-y-0.5 " + (variant === "dark" ? "hover:bg-white/12" : "hover:ring-primary-300") : ""} ${className}`;

  const content = (
    <>
      <span className="flex items-center gap-0.5">
        {[0, 1, 2, 3, 4].map((i) => {
          const isFull = i < full;
          const isHalf = i === full && hasHalf;
          return (
            <span key={i} className="relative inline-flex">
              <Star
                className={`h-4 w-4 ${
                  isFull
                    ? "text-accent-400 fill-accent-400"
                    : variant === "dark"
                      ? "text-white/30"
                      : "text-slate-300 dark:text-dark-600"
                }`}
              />
              {isHalf && (
                <Star
                  aria-hidden
                  className="absolute inset-0 h-4 w-4 text-accent-400 fill-accent-400"
                  style={{ clipPath: "inset(0 50% 0 0)" }}
                />
              )}
            </span>
          );
        })}
      </span>
      <span className="font-display font-bold text-sm" style={{ fontVariantNumeric: "tabular-nums" }}>
        {rating.toFixed(1)}/5
      </span>
      <span
        className={`text-xs font-medium ${
          variant === "dark" ? "text-white/70" : "text-foreground-muted"
        }`}
      >
        · {reviewCount} avis clients
      </span>
    </>
  );

  const label = `Note moyenne ${rating.toFixed(1)} sur 5, ${reviewCount} avis clients`;

  if (href) {
    return (
      <Link href={href} aria-label={`Voir les avis clients : ${label}`} className={base}>
        {content}
      </Link>
    );
  }

  return (
    <span role="img" aria-label={label} className={base}>
      {content}
    </span>
  );
}
