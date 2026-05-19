"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useMemo } from "react";

interface BulbTextProps {
  /** Text content (string). Use ` ` for nbsp inside. */
  children: string;
  /** Extra Tailwind classes. The base `gradient-text-living` is applied automatically. */
  className?: string;
  /** Per-letter stagger in seconds. Default 0.06 (smooth without dragging). */
  stagger?: number;
  /** Initial delay before the first letter lights. Default 0.25. */
  delay?: number;
  /** If true (default), the burst replays each time the element scrolls into view.
   *  If false, animation plays only on mount (use for above-the-fold hero text). */
  replayOnView?: boolean;
}

/**
 * BulbText — Apple-grade "letters lighting up like bulbs" animation.
 *
 * Each letter starts very dim (~12 % opacity, no glow). It animates in with a
 * stagger : a fast warm-amber flash burst (peak text-shadow halo + opacity 1),
 * then settles to a softer steady glow. Layered on top of the existing
 * gradient-text-living glass texture so the type still feels like backlit
 * frosted glass once all letters are lit.
 *
 * Respects prefers-reduced-motion : falls back to the static gradient text.
 *
 * Usage in a heading :
 *   <h1>La lumière qui <BulbText>divise par 5</BulbText> votre facture.</h1>
 */
export default function BulbText({
  children,
  className = "",
  stagger = 0.06,
  delay = 0.25,
  replayOnView = false,
}: BulbTextProps) {
  const reduce = useReducedMotion();

  // Pre-split letters (preserve layout via nbsp on spaces).
  const letters = useMemo(() => Array.from(children), [children]);

  // Reduced-motion fallback — no animation, just the static gradient.
  if (reduce) {
    return (
      <span className={`gradient-text-living ${className}`}>{children}</span>
    );
  }

  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const letter: Variants = {
    hidden: {
      opacity: 0.12,
      textShadow: "0 0 0px rgba(254, 243, 199, 0)",
      y: 0,
    },
    visible: {
      opacity: [0.12, 1, 1],
      // Three-keyframe stack : dim → bright burst → settled steady glow.
      textShadow: [
        "0 0 0px rgba(254, 243, 199, 0)",
        "0 0 30px rgba(255, 248, 220, 1), 0 0 64px rgba(245, 158, 11, 0.75), 0 0 110px rgba(245, 158, 11, 0.35)",
        "0 0 14px rgba(255, 248, 220, 0.65), 0 0 32px rgba(245, 158, 11, 0.32), 0 0 64px rgba(245, 158, 11, 0.12)",
      ],
      transition: {
        duration: 0.95,
        times: [0, 0.42, 1],
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const motionProps = replayOnView
    ? {
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: false, margin: "-20% 0px -20% 0px" },
      }
    : {
        initial: "hidden",
        animate: "visible",
      };

  return (
    <motion.span
      className={`inline-block gradient-text-living ${className}`}
      variants={container}
      aria-label={children}
      {...motionProps}
    >
      {letters.map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          className="inline-block whitespace-pre"
          variants={letter}
          aria-hidden="true"
          style={{ willChange: "opacity, text-shadow" }}
        >
          {char === " " ? " " : char}
        </motion.span>
      ))}
    </motion.span>
  );
}
