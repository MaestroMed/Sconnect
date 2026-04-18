"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronRight, type LucideIcon } from "lucide-react";
import { useSpotlight } from "@/hooks/useSpotlight";

interface ServiceCardProps {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  index?: number;
}

export default function ServiceCard({
  title,
  description,
  href,
  icon: Icon,
  index = 0,
}: ServiceCardProps) {
  const spotlight = useSpotlight();
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 30 }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: "-10% 0px" }}
      whileHover={reduce ? undefined : { y: -4 }}
    >
      <Link href={href} className="block group">
        <div
          className="card-hover card-spotlight p-8 h-full"
          onMouseMove={spotlight.onMouseMove}
        >
          <div className="relative z-10">
            <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-electric-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-primary-500/20 group-hover:shadow-xl group-hover:shadow-primary-500/30 group-hover:scale-110 transition-all duration-300">
              <Icon className="w-7 h-7 text-white" />
            </div>
            <h3 className="font-display font-bold text-xl text-foreground mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-300 transition-colors">
              {title}
            </h3>
            <p className="text-foreground-muted mb-4 leading-relaxed">{description}</p>
            <div className="flex items-center gap-2 text-primary-600 dark:text-primary-300 font-semibold">
              <span>Découvrir</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
