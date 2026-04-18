"use client";

import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

interface ParticlesLiteProps {
  className?: string;
  variant?: "white" | "brand";
  /** Drift animation speed multiplier: 'slow' (default), 'fast'. */
  speed?: "slow" | "fast";
}

/**
 * CSS-only dot-field — 5 radial-gradient layers, gently drifting.
 * Paired with `.particles-lite` utility in globals.css.
 *
 * Freezes motion under `prefers-reduced-motion`.
 */
export default function ParticlesLite({ className, variant = "white", speed = "slow" }: ParticlesLiteProps) {
  const reduced = useReducedMotion();
  return (
    <div
      aria-hidden="true"
      className={cn(
        "particles-lite",
        variant === "brand" && "particles-lite-dark",
        !reduced && (speed === "slow" ? "animate-drift" : "animate-drift-reverse"),
        className,
      )}
    />
  );
}
