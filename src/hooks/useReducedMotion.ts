"use client";

import { useEffect, useState } from "react";

/**
 * Returns true when the user has `prefers-reduced-motion: reduce` set.
 * Use to gate expensive visual effects (particles, parallax, multi-layer veils).
 *
 * SSR-safe: returns `false` until mounted.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return reduced;
}
