import Link from "next/link";
import { Star } from "lucide-react";

interface RatingBadgeProps {
  /** Numeric rating, e.g. 4.9 */
  rating?: number;
  /** Total review count, e.g. 127 */
  reviewCount?: number;
  /** Where the badge links to. Default /avis, can be swapped for a Google
   *  Business Profile URL once Mehdi gives it (env var or prop). */
  href?: string;
  /** Visual variant: "dark" on darker section, "light" on white surface. */
  variant?: "dark" | "light";
  className?: string;
}

/**
 * Trust badge displaying the aggregate rating + review count, linking to
 * the avis page. Intended for fold-1 placement (hero or just below) to
 * give cold visitors a quick credibility signal.
 *
 * Default values mirror the /avis stats. When the GBP URL becomes
 * available, swap `href` to it and add "sur Google" wording.
 */
export default function RatingBadge({
  rating = 4.9,
  reviewCount = 127,
  href = "/avis",
  variant = "light",
  className = "",
}: RatingBadgeProps) {
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.4;

  return (
    <Link
      href={href}
      aria-label={`Voir les avis clients : note moyenne ${rating} sur 5, ${reviewCount} avis vérifiés`}
      className={`inline-flex items-center gap-3 rounded-full px-4 py-2 transition-all hover:-translate-y-0.5 ${
        variant === "dark"
          ? "bg-white/8 ring-1 ring-white/15 hover:bg-white/12 text-white"
          : "bg-surface-elevated ring-1 ring-border hover:ring-primary-300 text-foreground shadow-sm"
      } ${className}`}
    >
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
        · {reviewCount} avis vérifiés
      </span>
    </Link>
  );
}
