"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
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
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </SiteConfigProvider>
  );
}



