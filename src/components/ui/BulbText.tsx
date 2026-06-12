import { Fragment } from "react";

interface BulbTextProps {
  /** Text content (string). */
  children: string;
  /** Extra Tailwind classes. The base `gradient-text-living` is applied automatically. */
  className?: string;
}

/**
 * BulbText — letters lighting up sequentially like real bulbs.
 *
 * Pure CSS implementation (no Framer Motion, no useEffect, no client-side
 * animation lib). Each letter gets a `--i` CSS variable matching its index
 * across the whole string ; globals.css then runs two animations on every
 * `.bulb-letter` :
 *   1. **bulbBurst** — one-shot, fill-forwards. 0.95 s : dim → flash → settled.
 *      Delay = i * 60 ms + 300 ms (per-letter stagger).
 *   2. **bulbBreath** — infinite. 4.2 s : settled ↔ peak ↔ settled.
 *      Delay = i * 60 ms + 1500 ms (starts after the burst has finished).
 *
 * Word-aware : the text is split on spaces. Each word is wrapped in an
 * inline-block + whitespace-nowrap container so a word never breaks mid-letter,
 * but regular spaces between words remain valid wrap points.
 *
 * No JS animation library = zero HMR module-not-found risk, zero hydration
 * skew, zero RSC/client-boundary concern. SSR-safe (works as a server component).
 */
export default function BulbText({ children, className = "" }: BulbTextProps) {
  const words = children.split(" ");

  // Running index across all letters (not reset per word) so the stagger
  // flows continuously through the whole string.
  let i = 0;

  return (
    <span className={`gradient-text-living ${className}`} style={{ display: "inline" }}>
      {/* Nom accessible : un vrai nœud texte (sr-only). `aria-label` sur un
          <span> générique est ignoré par ARIA — combiné aux lettres en
          aria-hidden, le H1 de l'accueil devenait muet pour les lecteurs
          d'écran. */}
      <span className="sr-only">{children}</span>
      {words.map((word, wi) => (
        <Fragment key={`w-${wi}`}>
          <span
            className="inline-block whitespace-nowrap"
            aria-hidden="true"
          >
            {Array.from(word).map((char) => {
              const idx = i++;
              return (
                <span
                  key={`${wi}-${idx}`}
                  className="bulb-letter"
                  style={{ "--i": idx } as React.CSSProperties}
                  aria-hidden="true"
                >
                  {char}
                </span>
              );
            })}
          </span>
          {wi < words.length - 1 && " "}
        </Fragment>
      ))}
    </span>
  );
}
