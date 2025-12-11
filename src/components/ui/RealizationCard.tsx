"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, ArrowUpRight } from "lucide-react";

interface RealizationCardProps {
  id: string;
  title: string;
  type: string;
  location: string;
  category: string;
  image: string;
  index?: number;
}

const categoryColors: Record<string, string> = {
  Installation: "bg-primary-500",
  Rénovation: "bg-electric-500",
  Dépannage: "bg-accent-500",
  Domotique: "bg-emerald-500",
  "Mise aux normes": "bg-purple-500",
};

export default function RealizationCard({
  id,
  title,
  type,
  location,
  category,
  image,
  index = 0,
}: RealizationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      viewport={{ once: true }}
    >
      <Link href={`/realisations/${id}`} className="block group">
        <div className="card overflow-hidden">
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-dark-900/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
            <div className="absolute top-4 left-4">
              <span
                className={`${
                  categoryColors[category] || "bg-dark-600"
                } text-white text-sm font-semibold px-3 py-1 rounded-full`}
              >
                {category}
              </span>
            </div>
            <div className="absolute bottom-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
              <ArrowUpRight className="w-5 h-5 text-primary-600" />
            </div>
          </div>
          <div className="p-5">
            <h3 className="font-display font-bold text-lg text-dark-900 mb-2 group-hover:text-primary-600 transition-colors">
              {title}
            </h3>
            <div className="flex items-center justify-between text-sm text-dark-500">
              <span>{type}</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {location}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

