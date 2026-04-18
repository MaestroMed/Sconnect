"use client";

import { motion, useReducedMotion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { useSpotlight } from "@/hooks/useSpotlight";

interface EngagementCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color: "primary" | "accent" | "green";
  index?: number;
}

const colorClasses = {
  primary: {
    bg: "from-primary-500 to-primary-600",
    shadow: "shadow-primary-500/25",
    shadowHover: "group-hover:shadow-primary-500/40",
  },
  accent: {
    bg: "from-accent-500 to-accent-600",
    shadow: "shadow-accent-500/25",
    shadowHover: "group-hover:shadow-accent-500/40",
  },
  green: {
    bg: "from-emerald-500 to-emerald-600",
    shadow: "shadow-emerald-500/25",
    shadowHover: "group-hover:shadow-emerald-500/40",
  },
};

export default function EngagementCard({
  title,
  description,
  icon: Icon,
  color,
  index = 0,
}: EngagementCardProps) {
  const colors = colorClasses[color];
  const reduce = useReducedMotion();
  const spotlight = useSpotlight();

  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 30 }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: "-10% 0px" }}
      whileHover={reduce ? undefined : { y: -4 }}
      className="group"
    >
      <div
        className="card card-spotlight p-8 h-full text-center hover:shadow-xl transition-all duration-300"
        onMouseMove={spotlight.onMouseMove}
      >
        <div className="relative z-10">
          <div
            className={`w-16 h-16 mx-auto bg-gradient-to-br ${colors.bg} rounded-2xl flex items-center justify-center mb-6 shadow-lg ${colors.shadow} ${colors.shadowHover} group-hover:scale-110 transition-all duration-300`}
          >
            <Icon className="w-8 h-8 text-white" />
          </div>
          <h3 className="font-display font-bold text-xl text-foreground mb-3">
            {title}
          </h3>
          <p className="text-foreground-muted leading-relaxed">{description}</p>
        </div>
      </div>
    </motion.div>
  );
}

