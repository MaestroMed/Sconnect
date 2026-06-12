"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { SiteConfigProvider, SiteConfigData } from "@/contexts/SiteConfigContext";

/**
 * Shell client persistant : Header + main + Footer + provider de config.
 *
 * Remplace l'ancien src/app/template.tsx, qui avait deux défauts structurels :
 * 1. Un template.tsx est REMONTÉ à chaque navigation (par design Next) —
 *    Header/Footer étaient détruits/recréés à chaque changement de page.
 * 2. Il fetchait /api/admin/site-config chez CHAQUE visiteur (une invocation
 *    serverless par session pour récupérer une config quasi statique).
 *
 * Désormais la config est lue CÔTÉ SERVEUR dans le root layout (getSiteConfig,
 * fallback JSON local) et passée en prop : zéro fetch client, shell stable
 * entre navigations. Les mises à jour admin se propagent au prochain build/ISR.
 */
export default function SiteShell({
  config,
  children,
}: {
  config: SiteConfigData;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <SiteConfigProvider config={config}>
      <Header />
      {/* id="main" = cible du skip-link d'accessibilité (« Aller au contenu ») */}
      <main id="main" className="min-h-screen">{children}</main>
      <Footer />
    </SiteConfigProvider>
  );
}
