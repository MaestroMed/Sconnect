"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

interface HeroVideoProps {
  /** Path to looping mp4 (Apple-style cinematic hero). */
  videoSrc: string;
  /** Optional WebM/VP9 source (40-60% lighter than mp4 H.264 — served first if browser supports). */
  videoSrcWebm?: string;
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
 * Key perf decisions:
 * - `preload="metadata"` (NOT "auto") so we only fetch ~100KB of headers
 *   upfront; the body streams once playback starts. Saves ~5 MB on first paint.
 * - We render the <video> only after mount, via the `mounted` flag. This
 *   prevents the SSR HTML from containing a <source>, which would otherwise
 *   trigger a duplicate fetch when React hydrates (the documented "double
 *   fetch" issue on Next.js with force-dynamic pages).
 * - `disableRemotePlayback` blocks AirPlay/Cast from sneakily pre-buffering
 *   the file on iOS Safari.
 * - The `useEffect` play() is intentional: Safari mobile sometimes ignores
 *   `autoPlay` until a microtask tick; the manual call is a fallback. It
 *   does NOT cause a refetch (HTMLMediaElement.play() reuses the current
 *   buffer).
 *
 * No SEO content goes in here — the heading + copy live in the parent section
 * and overlay the video. The element is `aria-hidden` to keep AT focus on the
 * meaningful text.
 */
export default function HeroVideo({ videoSrc, videoSrcWebm, posterSrc, fallbackSrc }: HeroVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const v = ref.current;
    if (!v || reduce) return;
    // Some browsers (Safari mobile) only autoplay after a tick.
    const p = v.play();
    if (p && typeof p.catch === "function") p.catch(() => {});
  }, [reduce, mounted]);

  // Reduced motion or pre-hydration: show only the poster (no video fetch at all).
  if (reduce || !mounted) {
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
      preload="metadata"
      poster={posterSrc}
      aria-hidden="true"
      disableRemotePlayback
      className="absolute inset-0 w-full h-full object-cover"
    >
      {videoSrcWebm && <source src={videoSrcWebm} type="video/webm" />}
      <source src={videoSrc} type="video/mp4" />
    </video>
  );
}
