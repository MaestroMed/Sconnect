"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  icon: LucideIcon;
  index?: number;
}

export default function StatCard({
  value,
  suffix = "",
  prefix = "",
  label,
  icon: Icon,
  index = 0,
}: StatCardProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!isInView) return;

    if (reduce) {
      setCount(value);
      return;
    }

    // requestAnimationFrame-based counter: immune to interval throttling,
    // always lands exactly on `value` even if tab was backgrounded mid-animation.
    const duration = 1800;
    const start = performance.now();
    let raf = 0;

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const tick = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(elapsed / duration, 1);
      const current = Math.round(value * easeOutCubic(t));
      setCount(current);
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setCount(value); // safety: ensure final landing
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isInView, value, reduce]);

  return (
    <motion.div
      ref={ref}
      initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.9 }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true }}
      className="text-center group"
    >
      <div className="relative inline-flex items-center justify-center mb-4">
        <div className="absolute w-20 h-20 bg-primary-500/10 rounded-full group-hover:scale-125 transition-transform duration-500" />
        <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-electric-500 rounded-2xl flex items-center justify-center shadow-lg shadow-primary-500/25 group-hover:shadow-xl group-hover:shadow-primary-500/35 transition-all duration-300">
          <Icon className="w-8 h-8 text-white" />
        </div>
      </div>
      <div className="font-display font-bold text-4xl md:text-5xl text-white mb-2">
        {prefix}
        {count.toLocaleString("fr-FR")}
        {suffix}
      </div>
      <p className="text-dark-300 font-medium">{label}</p>
    </motion.div>
  );
}

