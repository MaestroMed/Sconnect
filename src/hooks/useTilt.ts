"use client";

import { useCallback, useRef, useState } from "react";

interface UseTiltOptions {
  max?: number;
  scale?: number;
  perspective?: number;
}

/**
 * Lightweight 3D tilt-on-hover. Writes CSS vars onto a wrapped ref
 * so consumers apply `transform: perspective(…) rotateX(…) rotateY(…)`.
 * Disabled automatically when the pointer is coarse (touch devices).
 */
export function useTilt({ max = 8, scale = 1.02, perspective = 1000 }: UseTiltOptions = {}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isActive, setIsActive] = useState(false);

  const onMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el) return;
      if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) return;
      const rect = el.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      el.style.setProperty("--tilt-x", `${(-y * max).toFixed(2)}deg`);
      el.style.setProperty("--tilt-y", `${(x * max).toFixed(2)}deg`);
      el.style.setProperty("--tilt-scale", String(scale));
      el.style.setProperty("--tilt-perspective", `${perspective}px`);
      if (!isActive) setIsActive(true);
    },
    [max, scale, perspective, isActive],
  );

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--tilt-x", "0deg");
    el.style.setProperty("--tilt-y", "0deg");
    el.style.setProperty("--tilt-scale", "1");
    setIsActive(false);
  }, []);

  return { ref, onMouseMove, onMouseLeave, isActive };
}
