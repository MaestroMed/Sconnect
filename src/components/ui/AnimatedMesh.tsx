"use client";

import { cn } from "@/lib/utils";

interface AnimatedMeshProps {
  className?: string;
  variant?: "dark" | "light";
}

/**
 * Animated mesh gradient background.
 * Three blurred blobs orbit slowly — cheap, GPU-accelerated, respects reduced motion via globals.css.
 */
export default function AnimatedMesh({ className, variant = "dark" }: AnimatedMeshProps) {
  const blobs =
    variant === "dark"
      ? [
          "bg-primary-600/30",
          "bg-electric-500/25",
          "bg-accent-500/15",
        ]
      : [
          "bg-primary-400/30",
          "bg-electric-300/25",
          "bg-accent-300/20",
        ];

  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <div
        className={cn(
          "mesh-blob h-[60vw] w-[60vw] max-h-[700px] max-w-[700px] animate-mesh-1",
          "-left-[10%] -top-[10%]",
          blobs[0],
        )}
      />
      <div
        className={cn(
          "mesh-blob h-[55vw] w-[55vw] max-h-[650px] max-w-[650px] animate-mesh-2",
          "right-[-15%] top-[20%]",
          blobs[1],
        )}
      />
      <div
        className={cn(
          "mesh-blob h-[50vw] w-[50vw] max-h-[600px] max-w-[600px] animate-mesh-3",
          "bottom-[-10%] left-[25%]",
          blobs[2],
        )}
      />
    </div>
  );
}
