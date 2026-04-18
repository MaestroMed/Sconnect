"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Phone, MessageCircle, Zap, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface FloatingCTAProps {
  phone: string;
  phoneEmergency?: string;
  whatsapp?: string;
}

const DISMISS_KEY = "sconnect_floating_cta_collapsed";

export default function FloatingCTA({ phone, phoneEmergency, whatsapp }: FloatingCTAProps) {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(true);
  const reduce = useReducedMotion();

  useEffect(() => {
    const collapsed = typeof window !== "undefined" && window.localStorage.getItem(DISMISS_KEY) === "1";
    if (collapsed) setExpanded(false);

    const onScroll = () => {
      setVisible(window.scrollY > 360);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const collapse = () => {
    setExpanded(false);
    try {
      window.localStorage.setItem(DISMISS_KEY, "1");
    } catch {
      /* ignore */
    }
  };

  const tel = (phoneEmergency || phone).replace(/\s/g, "");
  const waLink = whatsapp
    ? `https://wa.me/${whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent("Bonjour, j'aimerais un renseignement.")}`
    : null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 40, scale: 0.9 }}
          animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 280, damping: 24 }}
          className={cn(
            "fixed z-[80]",
            "bottom-4 right-4 sm:bottom-6 sm:right-6",
            "print:hidden",
          )}
        >
          {expanded ? (
            <div className="relative flex flex-col items-end gap-3">
              <button
                type="button"
                onClick={collapse}
                aria-label="Réduire le menu d'appel"
                className="absolute -top-2 -left-2 flex h-6 w-6 items-center justify-center rounded-full bg-surface-elevated shadow-md ring-1 ring-border transition hover:scale-110 hover:bg-surface-muted"
              >
                <X className="h-3 w-3 text-foreground-muted" />
              </button>

              {waLink && (
                <Link
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded-full bg-green-500 px-4 py-3 font-semibold text-white shadow-lg shadow-green-500/30 transition hover:bg-green-600 hover:shadow-xl hover:shadow-green-500/40"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span className="pr-1">WhatsApp</span>
                </Link>
              )}

              <a
                href={`tel:${tel}`}
                className="group relative flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-primary-600 to-electric-500 px-5 py-3.5 font-bold text-white shadow-xl shadow-primary-500/40 ring-2 ring-white/40 transition hover:shadow-2xl hover:shadow-primary-500/60"
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute inset-0 rounded-full",
                    !reduce && "animate-pulse-glow",
                  )}
                />
                <Phone className="relative h-5 w-5" />
                <span className="relative">Appeler l&apos;urgence</span>
                <Zap className="relative h-4 w-4 text-accent-300" />
              </a>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setExpanded(true)}
              aria-label="Afficher les options de contact"
              className={cn(
                "relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary-600 to-electric-500 text-white shadow-xl shadow-primary-500/40 ring-2 ring-white/30 transition hover:scale-110",
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "absolute inset-0 rounded-full",
                  !reduce && "animate-pulse-glow",
                )}
              />
              <Phone className="relative h-6 w-6" />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
