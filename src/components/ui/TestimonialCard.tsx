"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  rating: number;
  text: string;
  service: string;
  location?: string;
  index?: number;
}

export default function TestimonialCard({
  name,
  rating,
  text,
  service,
  location,
  index = 0,
}: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="card p-6 md:p-8 h-full flex flex-col"
    >
      <div className="flex items-start justify-between mb-4">
        <Quote className="w-10 h-10 text-primary-200" />
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-5 h-5 ${
                i < rating
                  ? "text-accent-400 fill-accent-400"
                  : "text-dark-200"
              }`}
            />
          ))}
        </div>
      </div>
      <p className="text-dark-700 leading-relaxed flex-grow mb-6">{text}</p>
      <div className="pt-4 border-t border-dark-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-dark-900">{name}</p>
            {location && (
              <p className="text-sm text-dark-500">{location}</p>
            )}
          </div>
          <span className="badge-primary">{service}</span>
        </div>
      </div>
    </motion.div>
  );
}

