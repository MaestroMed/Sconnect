"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { SiteConfigProvider, SiteConfigData } from "@/contexts/SiteConfigContext";

const defaultConfig: SiteConfigData = {
  siteName: "S Connect France",
  siteTagline: "Électricité • Contrôle d'accès • Serrurerie • Métallerie",
  phone: "06 52 82 06 85",
  phoneEmergency: "06 52 82 06 85",
  email: "contact@sconnect-france.fr",
  address: {
    street: "35 rue des Cailloux",
    postalCode: "92110",
    city: "Clichy",
  },
  hours: {
    weekdays: "Lun-Ven: 8h-19h",
    saturday: "Samedi: 9h-17h",
    emergency: "Urgences 24/7",
  },
  social: {
    facebook: "",
    linkedin: "",
    instagram: "",
  },
  logoUrl: "",
  logoDarkUrl: "",
};

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");
  const [config, setConfig] = useState<SiteConfigData>(defaultConfig);

  useEffect(() => {
    // Lazy fetch site config — defers to idle to NOT block initial paint.
    // The default config (defined above) is already correct for first
    // paint (phone, email, address, hours match production). The fetch
    // refreshes only if the admin has overridden something. Uses
    // requestIdleCallback to avoid contention with hydration + LCP.
    const refresh = () => {
      fetch("/api/admin/site-config", { cache: "force-cache" })
        .then((res) => res.json())
        .then((data) => {
          if (data && data.siteName) {
            setConfig({
              siteName: data.siteName || defaultConfig.siteName,
              siteTagline: data.siteTagline || defaultConfig.siteTagline,
              phone: data.phone || defaultConfig.phone,
              phoneEmergency: data.phoneEmergency || defaultConfig.phoneEmergency,
              email: data.email || defaultConfig.email,
              address: data.address || defaultConfig.address,
              hours: data.hours || defaultConfig.hours,
              social: data.social || defaultConfig.social,
              logoUrl: data.logoUrl || defaultConfig.logoUrl,
              logoDarkUrl: data.logoDarkUrl || defaultConfig.logoDarkUrl,
            });
          }
        })
        .catch(() => {
          // Default config remains — no UX impact
        });
    };
    if ("requestIdleCallback" in window) {
      (window as Window & typeof globalThis).requestIdleCallback(refresh, { timeout: 2000 });
    } else {
      setTimeout(refresh, 1200);
    }
  }, []);

  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <SiteConfigProvider config={config}>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </SiteConfigProvider>
  );
}
