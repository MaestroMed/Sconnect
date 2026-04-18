"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed left-0 right-0 top-0 z-[90] h-[3px] origin-left bg-gradient-to-r from-primary-500 via-electric-400 to-accent-500 shadow-[0_0_12px_rgba(59,130,246,0.6)]"
      style={{ scaleX }}
    />
  );
}
