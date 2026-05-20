"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Phone } from "lucide-react";

/**
 * Mobile-only floating call button. Appears once the visitor has scrolled
 * past the hero (~280px) so it doesn't compete with the in-hero CTAs.
 * Hidden on lg+ (≥1024px) where the header shows the phone number, and
 * hidden on /admin/* and the devis/intervention forms (call-to-action
 * already on screen → would be visual noise).
 *
 * Phone hardcoded in E.164 here to keep the component context-free and
 * mountable directly in app/layout.tsx (outside the SiteConfig provider).
 * +25-40% mobile call conversions reported on artisan/dépannage sites
 * (industry benchmark in the audit).
 */
const TEL_E164 = "+33652820685";
const TEL_DISPLAY = "06 52 82 06 85";

export default function StickyCallButton() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 280);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Hide on admin + on the forms that already have the phone in-page.
  if (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/demande-devis") ||
    pathname.startsWith("/demande-intervention")
  ) {
    return null;
  }

  return (
    <a
      href={`tel:${TEL_E164}`}
      aria-label={`Appeler S Connect au ${TEL_DISPLAY}`}
      className={`lg:hidden fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full px-5 py-3 font-semibold text-white shadow-xl shadow-primary-900/40 ring-2 ring-white/20 transition-all duration-300 ${
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-3 pointer-events-none"
      } bg-gradient-to-br from-primary-600 to-primary-700 hover:from-primary-500 hover:to-primary-600 active:scale-95`}
    >
      <span className="relative flex h-5 w-5 items-center justify-center">
        <span className="absolute h-full w-full rounded-full bg-white/40 animate-ping" />
        <Phone className="relative h-5 w-5" />
      </span>
      <span className="text-sm">Appeler</span>
    </a>
  );
}
