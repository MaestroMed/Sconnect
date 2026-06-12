"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Pause, Play } from "lucide-react";

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
 *
 * WCAG 2.2.2 (Pause, Stop, Hide): any auto-starting media that plays for more
 * than 5s must offer a pause control. The loop is infinite → we expose a
 * discreet glass button bottom-right.
 */
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

export default function HeroVideo({ videoSrc, videoSrcWebm, posterSrc, fallbackSrc }: HeroVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const v = ref.current;
    if (!v || reduce || paused) return;
    // Some browsers (Safari mobile) only autoplay after a tick.
    const p = v.play();
    if (p && typeof p.catch === "function") p.catch(() => {});
  }, [reduce, mounted, paused]);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) {
      v.play().catch(() => {});
      setPaused(false);
    } else {
      v.pause();
      setPaused(true);
    }
  };

  // Variantes responsive du poster, dérivées par convention de nommage
  // (poster.webp → poster-820.webp / poster-1366.webp). Le poster 1920px
  // (263 kB pour la home) était servi tel quel sur mobile = LCP plombé ;
  // la variante 820w fait ~24 kB.
  const posterBase = posterSrc.replace(/\.webp$/, "");
  const poster820 = `${posterBase}-820.webp`;
  const poster1366 = `${posterBase}-1366.webp`;

  // Reduced motion or pre-hydration: show only the poster (no video fetch at all).
  // NB : pas d'aria-hidden sur <picture> (élément qui ne supporte pas ARIA) —
  // l'img décorative avec alt="" suffit aux lecteurs d'écran.
  if (reduce || !mounted) {
    return (
      <picture className="pointer-events-none">
        <source media="(max-width: 820px)" srcSet={poster820} type="image/webp" />
        <source media="(max-width: 1366px)" srcSet={poster1366} type="image/webp" />
        <source srcSet={posterSrc} type="image/webp" />
        {/* LCP element on first paint (pre-hydration). fetchPriority/eager/async
            make the poster discoverable + prioritised so the browser fetches it
            immediately — fixes the "priorityHinted" LCP discovery check. */}
        {fallbackSrc && <img src={fallbackSrc} alt="" fetchPriority="high" loading="eager" decoding="async" className="absolute inset-0 w-full h-full object-cover" />}
        {!fallbackSrc && <img src={posterSrc} alt="" fetchPriority="high" loading="eager" decoding="async" className="absolute inset-0 w-full h-full object-cover" />}
      </picture>
    );
  }

  return (
    <>
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
      {/* WCAG 2.2.2 — pause control for auto-starting media > 5s.
          Discreet glass button bottom-right; hover reveals fully. */}
      <button
        type="button"
        onClick={toggle}
        aria-label={paused ? "Lancer la vidéo d'arrière-plan" : "Mettre la vidéo d'arrière-plan en pause"}
        aria-pressed={paused}
        className="absolute bottom-4 right-4 z-20 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/35 text-white/80 backdrop-blur-md ring-1 ring-white/20 opacity-50 hover:opacity-100 hover:bg-black/55 hover:text-white focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white transition-opacity"
      >
        {paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
      </button>
    </>
  );
}
