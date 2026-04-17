"use client";

import { cn } from "@/lib/utils";

interface AuroraBackdropProps {
  className?: string;
  /** Intensity — 'soft' (default), 'strong'. */
  intensity?: "soft" | "strong";
  /** Disable the conic rotation (falls back to static gradient). */
  still?: boolean;
}

/**
 * Full-section aurora: rotating conic ring + drifting orbs + subtle noise.
 * Always absolutely positioned inside its parent (parent must be `relative`).
 */
export default function AuroraBackdrop({ className, intensity = "soft", still = false }: AuroraBackdropProps) {
  const opacity = intensity === "strong" ? "opacity-[0.75]" : "opacity-60";

  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      {/* Rotating conic aurora */}
      <div
        className={cn(
          "aurora-ring",
          opacity,
          !still && "aurora-ring-animate",
        )}
      />
      {/* Drifting orbs — layered, differing speeds */}
      <div className="orb orb-soft h-[55vw] w-[55vw] max-h-[620px] max-w-[620px] -left-[10%] -top-[15%] bg-primary-500/40 animate-drift" />
      <div className="orb h-[45vw] w-[45vw] max-h-[520px] max-w-[520px] right-[-8%] top-[10%] bg-electric-500/35 animate-drift-reverse" />
      <div className="orb orb-soft h-[60vw] w-[60vw] max-h-[700px] max-w-[700px] left-[20%] bottom-[-20%] bg-violet-500/30 animate-orb-float" />
      <div className="orb h-[35vw] w-[35vw] max-h-[400px] max-w-[400px] right-[10%] bottom-[-5%] bg-accent-500/20 animate-drift" />

      {/* Noise */}
      <div className="noise-grain" />
    </div>
  );
}
