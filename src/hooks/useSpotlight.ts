"use client";

import { useCallback } from "react";

/**
 * Tracks mouse position over an element and writes it to CSS variables
 * `--spotlight-x` and `--spotlight-y` consumed by `.card-spotlight::before`.
 */
export function useSpotlight() {
  const onMouseMove = useCallback((event: React.MouseEvent<HTMLElement>) => {
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    target.style.setProperty("--spotlight-x", `${x}px`);
    target.style.setProperty("--spotlight-y", `${y}px`);
  }, []);

  return { onMouseMove };
}
