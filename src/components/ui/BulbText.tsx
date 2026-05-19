"use client";

import { useEffect, useRef } from "react";
import { useAnimate, stagger, useReducedMotion } from "framer-motion";

interface BulbTextProps {
  /** Text content (string). */
  children: string;
  /** Extra Tailwind classes. The base `gradient-text-living` is applied automatically. */
  className?: string;
  /** Per-letter stagger in seconds during the burst phase. Default 0.06. */
  letterStagger?: number;
  /** Delay before the first letter starts to light. Default 0.25 s. */
  startDelay?: number;
  /** Period of the breathing loop after settle, in seconds. Default 4.2. */
  breathPeriod?: number;
}

// Shadow recipes — kept tight (no big 100 px halo) so letters stay crisp.
const SHADOW_OFF = "0 0 0px rgba(255, 248, 220, 0)";
// Burst : intense flash when the letter "ignites" — short blur radii so it
// reads as a flash, not as a fog.
const SHADOW_BURST =
  "0 0 22px rgba(255, 248, 220, 1), 0 0 44px rgba(245, 158, 11, 0.7), 0 0 80px rgba(245, 158, 11, 0.28)";
// Settled : minimal glow so the letter shape stays sharp on dark surface.
const SHADOW_SETTLED =
  "0 0 6px rgba(255, 248, 220, 0.55), 0 0 14px rgba(245, 158, 11, 0.22)";
// Breath peak : a hair brighter than settled — the bulb is "breathing".
const SHADOW_BREATH_PEAK =
  "0 0 10px rgba(255, 248, 220, 0.75), 0 0 22px rgba(245, 158, 11, 0.36)";

/**
 * BulbText — Apple-grade "letters lighting up like bulbs" animation.
 *
 * Choreography in two stages :
 *   1. **Burst & settle** (one-shot) — letters light up one by one with a
 *      stagger. Each letter goes : dim opacity 0.12 → burst (warm flash,
 *      opacity 1) → settled (sharp letter with minimal warm glow).
 *   2. **Breathing** (infinite) — once all letters have settled, the whole
 *      group pulses synchronously between the settled state and a slightly
 *      brighter "breath peak". Loop period ≈ 4 s, easeInOut for naturalness.
 *
 * The settled and breath shadows are intentionally tight (≤ 22 px) so the
 * final glyphs stay crisp on a dark hero — no fog around them.
 *
 * Respects `prefers-reduced-motion` (renders the static gradient text).
 */
export default function BulbText({
  children,
  className = "",
  letterStagger = 0.06,
  startDelay = 0.25,
  breathPeriod = 4.2,
}: BulbTextProps) {
  const reduce = useReducedMotion();
  const [scope, animate] = useAnimate();
  const cancelledRef = useRef(false);

  // Pre-split letters preserving the spaces.
  const letters = Array.from(children);

  useEffect(() => {
    if (reduce) return;
    cancelledRef.current = false;

    const run = async () => {
      try {
        // Stage 1 — burst & settle, with per-letter stagger.
        await animate(
          "[data-bulb-letter]",
          {
            opacity: [0.12, 1, 1],
            textShadow: [SHADOW_OFF, SHADOW_BURST, SHADOW_SETTLED],
          },
          {
            duration: 0.95,
            times: [0, 0.42, 1],
            delay: stagger(letterStagger, { startDelay }),
            ease: [0.22, 1, 0.36, 1],
          },
        );

        if (cancelledRef.current) return;

        // Stage 2 — synchronized breathing loop. Symmetric keyframe so the
        // transition both ways is smooth (settled → peak → settled).
        animate(
          "[data-bulb-letter]",
          {
            textShadow: [SHADOW_SETTLED, SHADOW_BREATH_PEAK, SHADOW_SETTLED],
          },
          {
            duration: breathPeriod,
            ease: "easeInOut",
            repeat: Infinity,
          },
        );
      } catch {
        // animation interrupted — silently ignore
      }
    };

    run();

    return () => {
      cancelledRef.current = true;
    };
  }, [animate, breathPeriod, letterStagger, reduce, startDelay]);

  // Reduced-motion fallback : static gradient text, no animation.
  if (reduce) {
    return (
      <span className={`gradient-text-living ${className}`}>{children}</span>
    );
  }

  return (
    <span
      ref={scope}
      className={`inline-block gradient-text-living ${className}`}
      aria-label={children}
    >
      {letters.map((char, i) => (
        <span
          key={`${char}-${i}`}
          data-bulb-letter
          className="inline-block whitespace-pre"
          aria-hidden="true"
          style={{
            opacity: 0.12,
            textShadow: SHADOW_OFF,
            willChange: "opacity, text-shadow",
          }}
        >
          {char === " " ? " " : char}
        </span>
      ))}
    </span>
  );
}
