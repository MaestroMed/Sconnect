"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { SiteConfigProvider, SiteConfigData } from "@/contexts/SiteConfigContext";

const defaultConfig: SiteConfigData = {
  siteName: "S Connect France",
  siteTagline: "Électricité • Contrôle d'accès • Serrurerie • Métallerie",
  phone: "01 23 45 67 89",
  phoneEmergency: "01 23 45 67 89",
  email: "contact@sconnectfrance.fr",
  address: {
    street: "XX Rue de XXX",
    postalCode: "92110",
    city: "Clichy",
  },
  hours: {
    weekdays: "Lun-Ven: 8h-19h",
    saturday: "Samedi: 9h-17h",
    emergency: "Urgences 24h/24",
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
    // Fetch site config on mount
    fetch("/api/admin/site-config")
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
        // Keep default config on error
      });
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
