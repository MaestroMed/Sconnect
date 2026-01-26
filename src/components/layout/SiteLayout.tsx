"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CookieBanner from "@/components/layout/CookieBanner";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import { SiteConfigProvider, SiteConfigData } from "@/contexts/SiteConfigContext";

interface SiteLayoutProps {
  children: React.ReactNode;
  siteConfig: SiteConfigData;
}

export default function SiteLayout({ children, siteConfig }: SiteLayoutProps) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <SiteConfigProvider config={siteConfig}>
      <GoogleAnalytics />
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <CookieBanner />
    </SiteConfigProvider>
  );
}





