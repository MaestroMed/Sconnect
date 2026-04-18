"use client";

import { cn } from "@/lib/utils";

interface NoiseOverlayProps {
  className?: string;
  /** Opacity 0-1, default 0.06. */
  opacity?: number;
  /** Blend mode, default 'overlay'. */
  blend?: "overlay" | "soft-light" | "multiply" | "screen";
}

/**
 * Fine-grain SVG noise overlay — masks banding in smooth gradients, adds
 * photographic texture. Zero JS, single DOM node.
 */
export default function NoiseOverlay({ className, opacity = 0.06, blend = "overlay" }: NoiseOverlayProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("noise-grain", className)}
      style={{ opacity, mixBlendMode: blend }}
    />
  );
}
