"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

/**
 * Suivi des trois conversions qui comptent : clic téléphone, clic e-mail,
 * envoi de formulaire.
 *
 * `lib/analytics.ts` déclarait déjà ces événements, mais n'était importé nulle
 * part — aucune conversion n'était donc mesurée. Ce composant le branche.
 *
 * Le suivi passe par un écouteur délégué posé sur `document`, pas par des
 * handlers ajoutés composant par composant : n'importe quel `tel:` ou
 * `mailto:` ajouté plus tard est mesuré sans qu'on ait à y penser.
 *
 * Chaque événement porte un paramètre `source` qui dit *d'où* vient le clic
 * (header, footer, barre collante, section…). Sans lui on sait qu'on a reçu
 * dix appels, mais pas quel emplacement les a produits.
 */

/** Remonte les ancêtres pour nommer l'emplacement, du plus précis au plus vague. */
function resolveSource(start: Element | null): string {
  for (let node: Element | null = start; node; node = node.parentElement) {
    const explicit = node.getAttribute("data-analytics-source");
    if (explicit) return explicit;

    const tag = node.tagName.toLowerCase();
    if (tag === "header") return "header";
    if (tag === "footer") return "footer";
    if (tag === "nav") return "nav";

    // `className` n'est une chaîne que sur les éléments HTML — sur un SVG
    // c'est un SVGAnimatedString, d'où le contrôle de type.
    const cls = typeof node.className === "string" ? node.className : "";
    if (/\b(sticky|fixed)\b/.test(cls)) return "sticky";

    if (tag === "section" && node.id) return node.id;
  }
  return "page";
}

export default function ConversionTracking() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const link = target.closest("a[href]");
      if (!link) return;

      const href = link.getAttribute("href") ?? "";
      const source = resolveSource(link);

      if (href.startsWith("tel:")) {
        trackEvent("phone_click", { source, label: href.slice(4) });
      } else if (href.startsWith("mailto:")) {
        trackEvent("email_click", { source, label: href.slice(7) });
      }
    };

    const onSubmit = (event: Event) => {
      const form = event.target;
      if (!(form instanceof HTMLFormElement)) return;

      trackEvent("form_submit", {
        source: resolveSource(form),
        label: form.getAttribute("name") || form.id || "sans-nom",
      });
    };

    // En phase de capture : l'événement est compté même si un handler en aval
    // appelle stopPropagation ou remplace la navigation.
    document.addEventListener("click", onClick, true);
    document.addEventListener("submit", onSubmit, true);

    return () => {
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("submit", onSubmit, true);
    };
  }, []);

  return null;
}
