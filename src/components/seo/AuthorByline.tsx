import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, Award } from "lucide-react";

interface AuthorBylineProps {
  /** "compact" = inline single-line, "card" = full card with bio + credentials. */
  variant?: "compact" | "card";
  className?: string;
}

/**
 * Author byline — Mehdi Belkacem, fondateur S Connect. Signals E-E-A-T
 * authorship on pages where the location-specific or service-specific
 * expertise needs a human face. Linked to /auteur/mehdi-belkacem so
 * Google can tie the page to the Person schema declared there.
 *
 * Usage:
 *   <AuthorByline variant="compact" />  // single line above the H1
 *   <AuthorByline variant="card" />     // full bio card before the CTA
 */
export default function AuthorByline({ variant = "compact", className = "" }: AuthorBylineProps) {
  if (variant === "compact") {
    return (
      <Link
        href="/auteur/mehdi-belkacem"
        className={`inline-flex items-center gap-2 text-sm text-foreground-muted hover:text-primary-600 dark:hover:text-primary-300 transition-colors group ${className}`}
      >
        <Image
          src="/images/team/team-technicien.webp"
          alt=""
          width={28}
          height={28}
          className="h-7 w-7 rounded-full object-cover ring-2 ring-border group-hover:ring-primary-300 transition-all"
        />
        <span>
          Validé par{" "}
          <span className="font-semibold text-foreground group-hover:text-primary-700 dark:group-hover:text-primary-300 transition-colors">
            Mehdi Belkacem
          </span>
          {" — fondateur S Connect"}
        </span>
      </Link>
    );
  }

  return (
    <aside className={`rounded-2xl border border-border bg-surface-elevated p-5 md:p-6 ${className}`}>
      <div className="flex items-start gap-4">
        <Link
          href="/auteur/mehdi-belkacem"
          className="shrink-0"
          aria-label="Mehdi Belkacem — page auteur"
        >
          <Image
            src="/images/team/team-technicien.webp"
            alt="Mehdi Belkacem, fondateur S Connect"
            width={72}
            height={72}
            className="h-16 w-16 md:h-18 md:w-18 rounded-2xl object-cover ring-2 ring-primary-200 dark:ring-primary-500/30"
          />
        </Link>
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary-700 dark:text-primary-300 mb-1">
            Page validée par
          </p>
          <Link
            href="/auteur/mehdi-belkacem"
            className="font-display font-bold text-foreground text-lg hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
          >
            Mehdi Belkacem
          </Link>
          <p className="text-sm text-foreground-muted mt-0.5">
            Fondateur S Connect France · Électricien certifié Qualifélec, RGE, IRVE niveau 2 ·
            12 ans d&apos;expérience terrain en Île-de-France
          </p>
          <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-foreground-muted">
            <span className="inline-flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              Garantie décennale active
            </span>
            <span className="inline-flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-primary-500" />
              Qualifélec mention Éclairage
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
