"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Phone, MessageCircle, Zap, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface FloatingCTAProps {
  phone: string;
  phoneEmergency?: string;
  /** WhatsApp number (with country code, any separator). If omitted, falls back to `phone`. */
  whatsapp?: string;
  /** Optional city used in the WhatsApp prefilled message ("… à {city}"). */
  waCity?: string;
}

const DISMISS_KEY = "sconnect_floating_cta_collapsed";

/**
 * Sticky call-to-action.
 * - **Mobile** (< sm): full-width bottom bar visible from the first pixel,
 *   with the phone number **written out** so users don't have to guess
 *   what the icon does. One-tap dials the emergency line.
 * - **Desktop** (≥ sm): bubble in the bottom-right corner that appears
 *   after ~200px of scroll, expandable to reveal WhatsApp.
 */
export default function FloatingCTA({ phone, phoneEmergency, whatsapp, waCity }: FloatingCTAProps) {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(true);
  const reduce = useReducedMotion();

  useEffect(() => {
    const collapsed = typeof window !== "undefined" && window.localStorage.getItem(DISMISS_KEY) === "1";
    if (collapsed) setExpanded(false);

    const onScroll = () => {
      // Lowered from 360 → 200 so the desktop bubble appears earlier
      setVisible(window.scrollY > 200);
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
  const waNumber = (whatsapp || phone).replace(/\D/g, "");
  const waMessage = waCity
    ? `Bonjour, j'ai besoin d'une intervention à ${waCity}. Pouvez-vous me recontacter ?`
    : "Bonjour, je souhaite un devis ou une intervention. Pouvez-vous me recontacter ?";
  const waLink = waNumber
    ? `https://wa.me/${waNumber}?text=${encodeURIComponent(waMessage)}`
    : null;

  return (
    <>
      {/* ——— MOBILE bottom bar — always visible, phone spelled out ——— */}
      <div className="fixed inset-x-0 bottom-0 z-[80] sm:hidden print:hidden">
        <div className="relative">
          {/* Dark gradient under the bar to separate from page content */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -top-6 h-6 bg-gradient-to-t from-dark-950/80 to-transparent"
          />
          <div className="flex gap-2 bg-dark-950/95 backdrop-blur-xl border-t border-white/10 px-3 py-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))]">
            <a
              href={`tel:${tel}`}
              aria-label={`Appeler l'urgence au ${phoneEmergency || phone}`}
              className="group relative flex-1 flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-accent-500 to-amber-400 px-4 py-3 font-bold text-dark-900 shadow-lg shadow-accent-500/40 active:scale-[0.98] transition-transform"
            >
              <Phone className="h-5 w-5 shrink-0" />
              <div className="text-left leading-tight">
                <span className="block text-[10px] font-semibold uppercase tracking-widest opacity-80">
                  Urgence 24/7
                </span>
                <span className="block text-sm font-bold tabular-nums">{phoneEmergency || phone}</span>
              </div>
            </a>
            {waLink && (
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Écrire sur WhatsApp"
                className="flex items-center justify-center rounded-xl bg-green-500 px-4 text-white shadow-lg shadow-green-500/30 active:scale-[0.98] transition-transform"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* ——— DESKTOP bubble ——— */}
      {renderDesktop()}
    </>
  );

  function renderDesktop() {
    return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 40, scale: 0.9 }}
          animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 280, damping: 24 }}
          className={cn(
            "fixed z-[80] hidden sm:block",
            "bottom-6 right-6",
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
}
