"use client";

import { useCallback, useRef } from "react";

/**
 * Tracks mouse position over an element and writes `--mx` / `--my` CSS vars
 * in pixels (relative to the element's top-left). rAF-throttled so it's cheap
 * to attach to large sections.
 *
 * Used by `.spotlight` utility and any component needing follow-cursor gradients.
 */
export function useMouseProxy() {
  const rafRef = useRef<number | null>(null);

  const onMouseMove = useCallback((event: React.MouseEvent<HTMLElement>) => {
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      target.style.setProperty("--mx", `${x}px`);
      target.style.setProperty("--my", `${y}px`);
    });
  }, []);

  const onMouseLeave = useCallback((event: React.MouseEvent<HTMLElement>) => {
    const target = event.currentTarget;
    target.style.removeProperty("--mx");
    target.style.removeProperty("--my");
  }, []);

  return { onMouseMove, onMouseLeave };
}
