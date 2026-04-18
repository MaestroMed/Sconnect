"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

interface BrandChipProps {
  name: string;
  logo?: string | null;
}

/**
 * Displays a brand logo as an <Image> if the file exists on /public, otherwise
 * a styled text chip fallback. Prevents broken-image icons in the Marquee
 * when the client hasn't uploaded logos yet.
 */
export default function BrandChip({ name, logo }: BrandChipProps) {
  const [logoOk, setLogoOk] = useState(Boolean(logo && logo.startsWith("/")));

  useEffect(() => {
    if (!logo || !logo.startsWith("/")) {
      setLogoOk(false);
      return;
    }
    let alive = true;
    fetch(logo, { method: "HEAD" })
      .then((r) => alive && setLogoOk(r.ok))
      .catch(() => alive && setLogoOk(false));
    return () => {
      alive = false;
    };
  }, [logo]);

  return (
    <div className="group shrink-0">
      <div className="w-36 h-16 relative flex items-center justify-center rounded-xl border border-border/60 bg-surface-muted/50 transition-all duration-500 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 hover:border-primary-200 hover:-translate-y-0.5 hover:shadow-sm dark:hover:border-primary-500/40">
        {logoOk && logo ? (
          <Image src={logo} alt={name} fill sizes="144px" className="object-contain p-3" />
        ) : (
          <span className="px-3 text-sm font-display font-semibold text-foreground-muted group-hover:text-primary-600 dark:group-hover:text-primary-300 transition-colors tracking-wide text-center leading-tight">
            {name}
          </span>
        )}
      </div>
    </div>
  );
}
