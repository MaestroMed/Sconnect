"use client";

import { cn } from "@/lib/utils";

type Variant = "brand" | "warm" | "cool";

interface GradientVeilProps {
  /** Color palette — 'brand' (default: blue/electric/violet/accent), 'warm' (amber/rose/violet), 'cool' (blue/emerald/sky). */
  variant?: Variant;
  /** Extra classes for positioning / sizing override. */
  className?: string;
  /** Extra blur in px (default 20). */
  blur?: number;
}

/**
 * Living gradient veil — multi-stop radial gradients animated via `gradientShift`.
 * Cheap (GPU-only), respects reduced-motion via globals.css.
 *
 * Place inside a `position: relative` parent and stack content above with z-10.
 */
export default function GradientVeil({ variant = "brand", className, blur }: GradientVeilProps) {
  const variantClass =
    variant === "warm" ? "gradient-veil-warm" : variant === "cool" ? "gradient-veil-cool" : "";

  return (
    <div
      aria-hidden="true"
      className={cn("gradient-veil", variantClass, className)}
      style={blur !== undefined ? { filter: `blur(${blur}px)` } : undefined}
    />
  );
}
