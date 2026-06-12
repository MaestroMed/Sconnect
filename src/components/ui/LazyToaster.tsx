"use client";

import dynamic from "next/dynamic";

/**
 * Toaster sonner chargé en différé (hors du bundle initial).
 *
 * Monté dans le root layout, l'import direct de sonner ajoutait ~9 kB gz au
 * First Load JS de TOUTES les pages, pour des toasts utilisés uniquement
 * après une interaction (soumission de formulaire, actions admin). Le chunk
 * se charge après l'hydratation — bien avant le premier toast possible.
 */
const Toaster = dynamic(() => import("sonner").then((m) => m.Toaster), {
  ssr: false,
});

export default function LazyToaster() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        className:
          "!bg-surface-elevated !text-foreground !border !border-border !shadow-xl",
      }}
      closeButton
      richColors
    />
  );
}
