"use client";

import Script from "next/script";
import { useEffect } from "react";
import { initScrollTracking, initTimeTracking } from "@/lib/analytics";

export default function GoogleAnalytics() {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
  const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

  useEffect(() => {
    // Initialiser le tracking de scroll et temps uniquement si analytics acceptés
    const consent = localStorage.getItem("cookie-consent");
    if (consent) {
      try {
        const prefs = JSON.parse(consent);
        if (prefs.analytics) {
          const cleanupScroll = initScrollTracking();
          const cleanupTime = initTimeTracking();

          return () => {
            if (cleanupScroll) cleanupScroll();
            if (cleanupTime) cleanupTime();
          };
        }
      } catch (e) {
        console.error("Erreur init tracking:", e);
      }
    }
  }, []);

  // Ne charger que si les IDs sont définis
  if (!GA_ID && !GTM_ID) {
    return null;
  }

  return (
    <>
      {/* Google Analytics 4 */}
      {GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}', {
                page_path: window.location.pathname,
                anonymize_ip: true,
                cookie_flags: 'SameSite=None;Secure'
              });
            `}
          </Script>
        </>
      )}

      {/* Google Tag Manager */}
      {GTM_ID && (
        <>
          <Script id="google-tag-manager" strategy="afterInteractive">
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');
            `}
          </Script>
          {/* GTM NoScript fallback */}
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        </>
      )}
    </>
  );
}
