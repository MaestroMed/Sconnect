"use client";

import type { ReactNode } from "react";
import { useMouseProxy } from "@/hooks/useMouseProxy";
import { cn } from "@/lib/utils";

interface SpotlightProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "article";
}

/**
 * Wrapper that enables the `.spotlight::before` radial glow to follow the cursor
 * across its children. rAF-throttled, SSR-safe, reduced-motion-aware via CSS.
 */
export default function Spotlight({ children, className, as = "div" }: SpotlightProps) {
  const { onMouseMove, onMouseLeave } = useMouseProxy();
  const Comp = as;

  return (
    <Comp
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={cn("spotlight", className)}
    >
      {children}
    </Comp>
  );
}
