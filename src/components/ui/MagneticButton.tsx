"use client";

import { useRef, useState, useEffect } from "react";
import Link, { LinkProps } from "next/link";
import { useReducedMotion } from "framer-motion";

interface MagneticBaseProps {
  /** Pixel range the element drifts towards the cursor before snapping back. */
  strength?: number;
  className?: string;
  children: React.ReactNode;
}

/**
 * Magnetic hover effect — the wrapped element gently drifts towards the
 * cursor (max `strength` px), then springs back on leave. Inspired by
 * the macOS dock and Linear/Stripe marquee CTAs.
 *
 * - Disabled under `prefers-reduced-motion`
 * - Disabled on touch / coarse pointers (no hover concept)
 * - Pure CSS transform → composited, no layout thrash
 *
 * Two variants exported: MagneticLink (Next.js Link) and MagneticAnchor
 * (plain <a>, e.g. for tel: / mailto:). For native buttons, wrap them in
 * a div that uses the same hook → kept minimal here to avoid type
 * gymnastics.
 */
function useMagnetic<T extends HTMLElement>(strength: number) {
  const ref = useRef<T | null>(null);
  const [{ x, y }, setOffset] = useState({ x: 0, y: 0 });
  const reduce = useReducedMotion();
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setActive(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  }, []);

  const enabled = !reduce && active;

  const onMouseMove = (e: React.MouseEvent<T>) => {
    if (!enabled) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setOffset({ x: dx * strength, y: dy * strength });
  };

  const onMouseLeave = () => setOffset({ x: 0, y: 0 });

  const style: React.CSSProperties | undefined = enabled
    ? {
        transform: `translate3d(${x}px, ${y}px, 0)`,
        transition: "transform 280ms cubic-bezier(0.22, 1, 0.36, 1)",
      }
    : undefined;

  return { ref, onMouseMove, onMouseLeave, style };
}

type MagneticLinkProps = MagneticBaseProps & LinkProps;

export function MagneticLink({ strength = 8, className, children, ...linkProps }: MagneticLinkProps) {
  const { ref, onMouseMove, onMouseLeave, style } = useMagnetic<HTMLAnchorElement>(strength);
  return (
    <Link
      {...linkProps}
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={className}
      style={style}
    >
      {children}
    </Link>
  );
}

type MagneticAnchorProps = MagneticBaseProps & React.AnchorHTMLAttributes<HTMLAnchorElement>;

export function MagneticAnchor({ strength = 8, className, children, ...anchorProps }: MagneticAnchorProps) {
  const { ref, onMouseMove, onMouseLeave, style } = useMagnetic<HTMLAnchorElement>(strength);
  return (
    <a
      {...anchorProps}
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={className}
      style={style}
    >
      {children}
    </a>
  );
}
