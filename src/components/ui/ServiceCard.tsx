"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, LucideIcon } from "lucide-react";

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
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Link href={href} className="block group">
        <div className="card-hover p-8 h-full">
          <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-electric-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-primary-500/20 group-hover:shadow-xl group-hover:shadow-primary-500/30 group-hover:scale-110 transition-all duration-300">
            <Icon className="w-7 h-7 text-white" />
          </div>
          <h3 className="font-display font-bold text-xl text-dark-900 mb-3 group-hover:text-primary-600 transition-colors">
            {title}
          </h3>
          <p className="text-dark-600 mb-4 leading-relaxed">{description}</p>
          <div className="flex items-center gap-2 text-primary-600 font-semibold">
            <span>Découvrir</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

