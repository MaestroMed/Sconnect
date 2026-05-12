"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

interface HeroVideoProps {
  /** Path to looping mp4 (Apple-style cinematic hero). */
  videoSrc: string;
  /** Poster shown while the video buffers / on reduced-motion. */
  posterSrc: string;
  /** Static jpg fallback if mp4 fails (very old browsers, network errors). */
  fallbackSrc?: string;
}

/**
 * Full-bleed background video for the homepage hero. Auto-plays muted on loop
 * once the file is buffered. Falls back to the poster on `prefers-reduced-motion`
 * or if autoplay is blocked (the browser will pause, the poster remains visible).
 *
 * No SEO content goes in here — the heading + copy live in the parent section
 * and overlay the video. The element is `aria-hidden` to keep AT focus on the
 * meaningful text.
 */
export default function HeroVideo({ videoSrc, posterSrc, fallbackSrc }: HeroVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const v = ref.current;
    if (!v || reduce) return;
    // Some browsers (Safari mobile) only autoplay after a tick.
    const p = v.play();
    if (p && typeof p.catch === "function") p.catch(() => {});
  }, [reduce]);

  if (reduce) {
    return (
      <picture aria-hidden="true" className="pointer-events-none">
        <source srcSet={posterSrc} type="image/webp" />
        {fallbackSrc && <img src={fallbackSrc} alt="" className="absolute inset-0 w-full h-full object-cover" />}
        {!fallbackSrc && <img src={posterSrc} alt="" className="absolute inset-0 w-full h-full object-cover" />}
      </picture>
    );
  }

  return (
    <video
      ref={ref}
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      poster={posterSrc}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full object-cover"
    >
      <source src={videoSrc} type="video/mp4" />
    </video>
  );
}
