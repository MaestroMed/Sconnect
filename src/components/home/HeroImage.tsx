"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Clock, Users } from "lucide-react";
import { useTilt } from "@/hooks/useTilt";

interface HeroImageProps {
  src: string;
  interventionsPerYear: number;
}

export default function HeroImage({ src, interventionsPerYear }: HeroImageProps) {
  const tilt = useTilt({ max: 7 });
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, x: 50 }}
      animate={reduce ? { opacity: 1 } : { opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="relative hidden lg:block"
    >
      <div
        ref={tilt.ref}
        onMouseMove={tilt.onMouseMove}
        onMouseLeave={tilt.onMouseLeave}
        className="tilt-root relative w-full aspect-square max-w-lg mx-auto"
      >
        <div className="tilt-inner relative h-full w-full">
          <div className="absolute inset-0 rounded-3xl overflow-hidden border-4 border-dark-800 shadow-2xl">
            <Image
              src={src}
              alt="Technicien professionnel au travail"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-900/50 to-transparent" />
          </div>

          {/* Glare highlight (only when tilt engaged) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 mix-blend-overlay transition-opacity duration-300 data-[active=true]:opacity-100"
            data-active={tilt.isActive}
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.35), transparent 45%, transparent 55%, rgba(59,130,246,0.25))",
            }}
          />

          <motion.div
            animate={reduce ? undefined : { y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            style={{ transform: "translateZ(40px)" }}
            className="absolute -top-4 -right-4 bg-white rounded-2xl p-4 shadow-xl"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-accent-600" />
              </div>
              <div>
                <p className="font-bold text-dark-900">24h/24</p>
                <p className="text-sm text-dark-500">Urgences</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            animate={reduce ? undefined : { y: [0, 10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            style={{ transform: "translateZ(40px)" }}
            className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-xl"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <p className="font-bold text-dark-900">{interventionsPerYear}+</p>
                <p className="text-sm text-dark-500">Clients/an</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
