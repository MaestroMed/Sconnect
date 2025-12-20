"use client";

import { createContext, useContext, ReactNode } from "react";

export interface SiteConfigData {
  siteName: string;
  siteTagline: string;
  phone: string;
  phoneEmergency: string;
  email: string;
  address: {
    street: string;
    postalCode: string;
    city: string;
  };
  hours: {
    weekdays: string;
    saturday: string;
    emergency: string;
  };
  social: {
    facebook: string;
    linkedin: string;
    instagram: string;
  };
}

const SiteConfigContext = createContext<SiteConfigData | null>(null);

interface SiteConfigProviderProps {
  children: ReactNode;
  config: SiteConfigData;
}

export function SiteConfigProvider({ children, config }: SiteConfigProviderProps) {
  return (
    <SiteConfigContext.Provider value={config}>
      {children}
    </SiteConfigContext.Provider>
  );
}

export function useSiteConfig() {
  const context = useContext(SiteConfigContext);
  if (!context) {
    // Return default values if not in provider (useful for static pages)
    return {
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
    };
  }
  return context;
}

