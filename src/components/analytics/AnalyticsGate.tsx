"use client";

import { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

/**
 * Gates Vercel Analytics + Speed Insights behind the cookie-consent
 * preference. RGPD-strict: even though both are advertised as
 * "privacy-friendly" (no cookies, IP truncation), they remain third-party
 * traceurs that the CNIL can challenge — better wait for explicit consent.
 *
 * The cookie banner writes `{ necessary, analytics, marketing }` into
 * `cookie-consent` in localStorage. We listen for the custom event
 * `cookie-consent:updated` (dispatched by the banner on save) so the
 * gate flips immediately without a full reload.
 *
 * Mounted in app/layout.tsx in lieu of importing Analytics/SpeedInsights
 * directly.
 */
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

  if (!allowed) return null;

  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  );
}
