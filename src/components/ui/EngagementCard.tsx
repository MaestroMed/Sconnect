"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group"
    >
      <div className="card p-8 h-full text-center hover:border-transparent hover:shadow-xl transition-all duration-300">
        <div
          className={`w-16 h-16 mx-auto bg-gradient-to-br ${colors.bg} rounded-2xl flex items-center justify-center mb-6 shadow-lg ${colors.shadow} ${colors.shadowHover} group-hover:scale-110 transition-all duration-300`}
        >
          <Icon className="w-8 h-8 text-white" />
        </div>
        <h3 className="font-display font-bold text-xl text-dark-900 mb-3">
          {title}
        </h3>
        <p className="text-dark-600 leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}

