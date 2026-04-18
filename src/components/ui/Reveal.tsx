"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Direction = "up" | "down" | "left" | "right" | "fade";

interface RevealProps {
  children: ReactNode;
  className?: string;
  direction?: Direction;
  distance?: number;
  delay?: number;
  duration?: number;
  once?: boolean;
  as?: keyof typeof motion;
}

const getOffset = (direction: Direction, distance: number) => {
  switch (direction) {
    case "up":
      return { y: distance };
    case "down":
      return { y: -distance };
    case "left":
      return { x: distance };
    case "right":
      return { x: -distance };
    case "fade":
    default:
      return {};
  }
};

export default function Reveal({
  children,
  className,
  direction = "up",
  distance = 24,
  delay = 0,
  duration = 0.6,
  once = true,
}: RevealProps) {
  const reduce = useReducedMotion();

  const variants: Variants = {
    hidden: reduce ? { opacity: 1 } : { opacity: 0, ...getOffset(direction, distance) },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration, delay, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      // amount: 0.05 fires as soon as 5% of the element is visible, so fast
      // scrolls don't leave elements stuck at opacity 0. once: default true.
      viewport={{ once, amount: 0.05, margin: "0px 0px -5% 0px" }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}
