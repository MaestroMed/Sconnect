"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

/**
 * Charge Google Analytics 4 derrière le consentement cookies.
 *
 * Auparavant ce composant montait Vercel Analytics + Speed Insights. Les deux
 * ont été retirés : la mesure passe désormais par GA4 sur l'ensemble des sites,
 * ce qui évite la facturation Vercel et permet de comparer les sites entre eux.
 *
 * Le gating reste strict côté RGPD : gtag n'est chargé qu'après un consentement
 * explicite. Tant qu'il ne l'est pas, `trackEvent` (lib/analytics) teste
 * `window.gtag` et ne fait rien — aucun appel réseau n'a lieu.
 *
 * La bannière écrit `{ necessary, analytics, marketing }` dans `cookie-consent`
 * (localStorage) et émet `cookie-consent:updated` à l'enregistrement, ce qui
 * bascule ce composant sans rechargement.
 *
 * Monté dans app/layout.tsx.
 */
const GA_ID = process.env.NEXT_PUBLIC_GA4_ID;

export default function AnalyticsGate() {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const read = () => {
      try {
        const raw = localStorage.getItem("cookie-consent");
        if (!raw) return setAllowed(false);
        const parsed = JSON.parse(raw) as { analytics?: boolean };
        setAllowed(Boolean(parsed.analytics));
      } catch {
        setAllowed(false);
      }
    };
    read();
    // Custom event from the cookie banner whenever the user saves
    const onUpdate = () => read();
    window.addEventListener("cookie-consent:updated", onUpdate);
    // Cross-tab sync via storage event
    const onStorage = (e: StorageEvent) => {
      if (e.key === "cookie-consent") read();
    };
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener("cookie-consent:updated", onUpdate);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  if (!allowed || !GA_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-config" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  );
}
