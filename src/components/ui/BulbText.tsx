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
 *
 * ---------------------------------------------------------------------------
 * TEXTE RENDU UNE SEULE FOIS — ne pas réintroduire de copie `sr-only`.
 *
 * La version précédente rendait la chaîne DEUX fois : un `<span class="sr-only">`
 * pour les lecteurs d'écran, plus les lettres décoratives en `aria-hidden`.
 * Or `sr-only` (Tailwind) masque *visuellement* — `position:absolute` + `clip` —
 * mais laisse le texte dans le DOM. Googlebot lisait donc les deux copies et
 * recopiait le doublon dans l'extrait de résultat. Constaté en SERP sur la home :
 *
 *   « Préserver votre habitat à Clichy et en Île-de-France, c'est notre métier
 *     d'artisan. c'est notre métier d'artisan. »
 *
 * BulbText étant monté dans ~48 pages (H1 et H2), le défaut était sitewide.
 *
 * Accessibilité conservée, en deux couches :
 *   1. `role="text"` + `aria-label` — VoiceOver/Safari annoncent la phrase d'un
 *      seul tenant au lieu d'égrener les lettres.
 *   2. Les lettres restent de vrais nœuds texte (plus d'`aria-hidden`) : les AT
 *      qui ignorent `role="text"` (NVDA, JAWS) retombent dessus et lisent le
 *      contenu normalement. Le découpage par MOT — chaque mot dans son propre
 *      conteneur `inline-block whitespace-nowrap` — garde l'unité de lecture au
 *      niveau du mot, pas de la lettre.
 * ---------------------------------------------------------------------------
 */
export default function BulbText({ children, className = "" }: BulbTextProps) {
  const words = children.split(" ");

  // Running index across all letters (not reset per word) so the stagger
  // flows continuously through the whole string.
  let i = 0;

  return (
    <span
      className={`gradient-text-living ${className}`}
      style={{ display: "inline" }}
      role="text"
      aria-label={children}
    >
      {words.map((word, wi) => (
        <Fragment key={`w-${wi}`}>
          <span className="inline-block whitespace-nowrap">
            {Array.from(word).map((char) => {
              const idx = i++;
              return (
                <span
                  key={`${wi}-${idx}`}
                  className="bulb-letter"
                  style={{ "--i": idx } as React.CSSProperties}
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
