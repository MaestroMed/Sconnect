"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CookieBanner from "@/components/layout/CookieBanner";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import ScrollProgress from "@/components/ui/ScrollProgress";
import ScrollToTop from "@/components/ui/ScrollToTop";
import FloatingCTA from "@/components/ui/FloatingCTA";
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
      <ScrollProgress />
      <Header />
      <main id="main" className="min-h-screen">
        {children}
      </main>
      <Footer />
      {/* Bottom spacer on mobile so the sticky FloatingCTA bar never covers the last line of the footer. */}
      <div aria-hidden="true" className="h-[78px] sm:h-0" />
      <CookieBanner />
      <FloatingCTA
        phone={siteConfig.phone}
        phoneEmergency={siteConfig.phoneEmergency}
      />
      <ScrollToTop />
    </SiteConfigProvider>
  );
}
