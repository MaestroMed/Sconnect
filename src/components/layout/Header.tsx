"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Phone, AlertTriangle, Calculator } from "lucide-react";
import { useSiteConfig } from "@/contexts/SiteConfigContext";
import ThemeToggle from "@/components/theme/ThemeToggle";
import AvailabilityBadge from "@/components/ui/AvailabilityBadge";
import DesktopNav from "@/components/layout/DesktopNav";
import MobileNav from "@/components/layout/MobileNav";

const services = [
  {
    name: "Électricité",
    href: "/services/electricite",
    description: "Installation, rénovation, relamping LED, IRVE, dépannage 24/7",
    color: "primary",
  },
  {
    name: "Contrôle d'accès",
    href: "/services/controle-acces",
    description: "Interphonie, vidéophonie, badges et digicodes",
    color: "accent",
  },
  {
    name: "Serrurerie",
    href: "/services/serrurerie",
    description: "Ouverture, remplacement et blindage A2P",
    color: "green",
  },
  {
    name: "Métallerie",
    href: "/services/metallerie",
    description: "Portails sur mesure, portes coupe-feu, structures",
    color: "orange",
  },
];

const navigation = [
  { name: "Accueil", href: "/" },
  { name: "Présentation", href: "/presentation" },
  { name: "Services", href: "/services", hasDropdown: true },
  { name: "Réalisations", href: "/realisations" },
  { name: "Actualités", href: "/actualites" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hideHeader, setHideHeader] = useState(false);
  const lastScrollY = useRef(0);
  const siteConfig = useSiteConfig();
  const pathname = usePathname();
  // On the home, the hero is dark-themed → we keep the header transparent
  // until scroll. On every other route, the page background is neutral
  // light so the header gets its glass treatment immediately.
  const isHomeHero = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setIsScrolled(currentY > 8);
      // Auto-hide on scroll down (past 240px), reveal on scroll up.
      // Only on desktop (sticky behavior keeps the mobile UX simple).
      if (window.innerWidth >= 1024 && currentY > 240) {
        if (currentY > lastScrollY.current + 4) setHideHeader(true);
        else if (currentY < lastScrollY.current - 4) setHideHeader(false);
      } else {
        setHideHeader(false);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top Bar — discreet, hidden on mobile, collapses on scroll */}
      <div
        className={`bg-dark-900 dark:bg-dark-950 text-white hidden md:block border-b border-dark-800/60 transition-all duration-300 overflow-hidden ${
          isScrolled ? "max-h-0 opacity-0" : "max-h-10 py-2"
        }`}
        aria-hidden={isScrolled}
      >
        <div className="container-custom flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <AvailabilityBadge variant="dark" schedule={siteConfig.schedule} />
            <span className="flex items-center gap-2 text-white/70">
              <AlertTriangle className="w-4 h-4 text-accent-400" />
              Urgences 24/7
            </span>
          </div>
          <a
            href={`tel:${siteConfig.phone.replace(/\s/g, "").replace(/^0/, "+33")}`}
            className="flex items-center gap-2 hover:text-accent-400 transition-colors"
            // Top bar masquée au scroll (aria-hidden) : retirer aussi le lien
            // du parcours clavier, sinon le focus atterrit dans un élément
            // invisible.
            tabIndex={isScrolled ? -1 : undefined}
          >
            <Phone className="w-4 h-4" />
            <span className="font-semibold">{siteConfig.phone}</span>
          </a>
        </div>
      </div>

      {/* Main Header — sticky with auto-hide + glass adaptive */}
      <header
        className={`sticky top-0 z-50 transition-all duration-500 will-change-transform ${
          hideHeader ? "-translate-y-full" : "translate-y-0"
        } ${
          isScrolled
            ? "bg-surface/85 dark:bg-dark-950/85 backdrop-blur-xl shadow-lg shadow-dark-900/10 dark:shadow-black/40 border-b border-border"
            : isHomeHero
              ? "bg-transparent"
              : "bg-surface dark:bg-dark-950 border-b border-border/50"
        }`}
      >
        <nav className="container-custom">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-3 group shrink-0"
              aria-label="S Connect France — accueil"
            >
              {siteConfig.logoUrl ? (
                <Image
                  src={siteConfig.logoUrl}
                  alt=""
                  width={120}
                  height={48}
                  className="h-11 w-auto object-contain"
                  priority
                />
              ) : (
                <>
                  <Image
                    src="/images/logo_only.svg"
                    alt=""
                    width={48}
                    height={48}
                    className="h-11 w-11 block dark:hidden transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                    priority
                  />
                  <Image
                    src="/images/logo_only_white.svg"
                    alt=""
                    width={48}
                    height={48}
                    className="h-11 w-11 hidden dark:block transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                    priority
                  />
                </>
              )}
              <div className="flex flex-col">
                <span
                  className={`font-display font-bold text-xl tracking-[0.02em] transition-colors ${
                    isHomeHero && !isScrolled ? "text-white" : "text-foreground"
                  }`}
                >
                  SCONNECT
                </span>
                <span
                  className={`text-[10px] font-semibold tracking-[0.3em] -mt-0.5 transition-colors ${
                    isHomeHero && !isScrolled
                      ? "text-primary-200"
                      : "text-primary-600 dark:text-primary-400"
                  }`}
                >
                  FRANCE
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div
              className={`hidden lg:flex items-center transition-colors ${
                isHomeHero && !isScrolled ? "[&_*]:text-white/90" : ""
              }`}
            >
              <DesktopNav navigation={navigation} services={services} />
            </div>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-2.5 shrink-0">
              <ThemeToggle
                variant={isHomeHero && !isScrolled ? "ghost" : "default"}
              />
              <Link
                href="/calculateur-relamping"
                className={`btn-sm gap-1.5 transition-colors hidden xl:inline-flex ${
                  isHomeHero && !isScrolled
                    ? "bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20"
                    : "bg-surface-muted text-foreground hover:bg-primary-50 dark:hover:bg-primary-500/10 border border-border hover:border-primary-300"
                } rounded-lg px-3 py-2 font-medium`}
                title="Calculateur ROI relamping en 30 s"
              >
                <Calculator className="w-3.5 h-3.5" />
                ROI
              </Link>
              <Link href="/demande-devis" className="btn-primary btn-sm shadow-md shadow-primary-700/20">
                Devis gratuit
              </Link>
              <Link href="/demande-intervention" className="btn-accent btn-sm">
                <AlertTriangle className="w-4 h-4" />
                Urgence
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center gap-1">
              <ThemeToggle
                variant={isHomeHero && !isScrolled ? "ghost" : "default"}
              />
              <MobileNav
                navigation={navigation}
                services={services}
                phone={siteConfig.phone}
                schedule={siteConfig.schedule}
              />
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
