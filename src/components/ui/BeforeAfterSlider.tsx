"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface BeforeAfterSliderProps {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt?: string;
  afterAlt?: string;
  aspect?: "square" | "video" | "4/3";
  className?: string;
}

const ASPECT_CLASS = {
  square: "aspect-square",
  video: "aspect-video",
  "4/3": "aspect-[4/3]",
} as const;

/**
 * Drag-to-compare before/after image slider.
 * - Pointer + touch via setPointerCapture
 * - Keyboard: slider role with ArrowLeft/ArrowRight (1% / 5% w/ shift)
 * - Announces percentage via aria-valuenow for screen readers
 */
export default function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt = "Avant",
  afterAlt = "Après",
  aspect = "video",
  className,
}: BeforeAfterSliderProps) {
  const [percent, setPercent] = useState(50);
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const raw = ((clientX - rect.left) / rect.width) * 100;
    setPercent(Math.max(0, Math.min(100, raw)));
  }, []);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setDragging(true);
    (e.target as Element).setPointerCapture?.(e.pointerId);
    updateFromClientX(e.clientX);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    updateFromClientX(e.clientX);
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setDragging(false);
    (e.target as Element).releasePointerCapture?.(e.pointerId);
  };

  // Keyboard control when the handle has focus
  useEffect(() => {
    const handle = handleRef.current;
    if (!handle) return;
    const onKey = (e: KeyboardEvent) => {
      let delta = 0;
      if (e.key === "ArrowLeft") delta = e.shiftKey ? -5 : -1;
      else if (e.key === "ArrowRight") delta = e.shiftKey ? 5 : 1;
      else if (e.key === "Home") {
        setPercent(0);
        e.preventDefault();
        return;
      } else if (e.key === "End") {
        setPercent(100);
        e.preventDefault();
        return;
      }
      if (delta !== 0) {
        setPercent((p) => Math.max(0, Math.min(100, p + delta)));
        e.preventDefault();
      }
    };
    handle.addEventListener("keydown", onKey);
    return () => handle.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full overflow-hidden rounded-2xl select-none cursor-ew-resize touch-none",
        ASPECT_CLASS[aspect],
        className,
      )}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      {/* AFTER image (base layer) */}
      <Image
        src={afterSrc}
        alt={afterAlt}
        fill
        sizes="(min-width: 1024px) 800px, 100vw"
        className="object-cover pointer-events-none"
      />
      {/* AFTER label */}
      <span className="absolute bottom-4 right-4 z-20 rounded-full bg-primary-600/90 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
        Après
      </span>

      {/* BEFORE image clipped on the right side */}
      <div
        aria-hidden="true"
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ clipPath: `inset(0 ${100 - percent}% 0 0)` }}
      >
        <Image
          src={beforeSrc}
          alt={beforeAlt}
          fill
          sizes="(min-width: 1024px) 800px, 100vw"
          className="object-cover"
        />
      </div>
      {/* BEFORE label (only fully visible when handle isn't covering it) */}
      <span
        className="absolute bottom-4 left-4 z-20 rounded-full bg-dark-900/90 px-3 py-1 text-xs font-semibold text-white backdrop-blur transition-opacity"
        style={{ opacity: percent > 20 ? 1 : 0 }}
      >
        Avant
      </span>

      {/* Divider + handle */}
      <div
        ref={handleRef}
        role="slider"
        aria-label="Comparateur avant / après"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(percent)}
        aria-valuetext={`${Math.round(percent)} pour cent`}
        tabIndex={0}
        className="absolute top-0 bottom-0 z-10 w-1 bg-white shadow-[0_0_0_1px_rgba(15,23,42,0.15)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
        style={{ left: `calc(${percent}% - 2px)` }}
      >
        <div
          className={cn(
            "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
            "flex items-center justify-center h-10 w-10 rounded-full bg-white shadow-xl ring-2 ring-primary-500",
            dragging && "scale-110",
          )}
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5 text-primary-600" fill="currentColor">
            <path d="M9 6l-6 6 6 6V6zM15 6l6 6-6 6V6z" />
          </svg>
        </div>
      </div>
    </div>
  );
}
