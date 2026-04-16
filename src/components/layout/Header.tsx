"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  Zap,
  AlertTriangle,
} from "lucide-react";
import { useSiteConfig } from "@/contexts/SiteConfigContext";
import ThemeToggle from "@/components/theme/ThemeToggle";
import AvailabilityBadge from "@/components/ui/AvailabilityBadge";
import DesktopNav from "@/components/layout/DesktopNav";
import MobileNav from "@/components/layout/MobileNav";

const services = [
  {
    name: "Électricité",
    href: "/services/electricite",
    description: "Installation, rénovation et dépannage électrique",
    color: "primary",
  },
  {
    name: "Contrôle d'accès",
    href: "/services/controle-acces",
    description: "Interphonie, badges et digicodes",
    color: "accent",
  },
  {
    name: "Serrurerie",
    href: "/services/serrurerie",
    description: "Ouverture, remplacement et blindage",
    color: "green",
  },
  {
    name: "Métallerie",
    href: "/services/metallerie",
    description: "Portails, portes et structures métalliques",
    color: "orange",
  },
];

const navigation = [
  { name: "Accueil", href: "/" },
  { name: "Présentation", href: "/presentation" },
  { name: "Services", href: "/services", hasDropdown: true },
  { name: "Réalisations", href: "/realisations" },
  { name: "Actualités", href: "/actualites" },
  { name: "Avis Clients", href: "/avis" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const siteConfig = useSiteConfig();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top Bar */}
      <div className="bg-dark-900 dark:bg-dark-950 text-white py-2 hidden md:block border-b border-dark-800/60">
        <div className="container-custom flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <AvailabilityBadge variant="dark" schedule={siteConfig.schedule} />
            <span className="flex items-center gap-2 text-white/70">
              <AlertTriangle className="w-4 h-4 text-accent-400" />
              Urgences 24h/24
            </span>
          </div>
          <a
            href={`tel:${siteConfig.phone.replace(/\s/g, '')}`}
            className="flex items-center gap-2 hover:text-accent-400 transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span className="font-semibold">{siteConfig.phone}</span>
          </a>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-surface/80 dark:bg-dark-950/80 backdrop-blur-xl shadow-lg shadow-dark-900/10 dark:shadow-black/40 border-b border-border"
            : "bg-surface dark:bg-dark-950"
        }`}
      >
        <nav className="container-custom">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              {siteConfig.logoUrl ? (
                <Image
                  src={siteConfig.logoUrl}
                  alt={siteConfig.siteName}
                  width={120}
                  height={48}
                  className="h-12 w-auto object-contain"
                  priority
                />
              ) : (
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-electric-500 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/25 group-hover:shadow-xl group-hover:shadow-primary-500/30 transition-all duration-300">
                    <Zap className="w-7 h-7 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent-400 rounded-full animate-pulse" />
                </div>
              )}
              <div className="flex flex-col">
                <span className="font-display font-bold text-xl text-foreground">
                  S Connect
                </span>
                <span className="text-xs text-primary-600 dark:text-primary-400 font-medium tracking-wide">
                  FRANCE
                </span>
              </div>
            </Link>

            {/* Desktop Navigation (Radix) */}
            <div className="hidden lg:flex">
              <DesktopNav navigation={navigation} services={services} />
            </div>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <ThemeToggle />
              <Link href="/demande-devis" className="btn-outline btn-sm">
                Devis gratuit
              </Link>
              <Link href="/demande-intervention" className="btn-accent btn-sm">
                <AlertTriangle className="w-4 h-4" />
                Urgence
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center gap-1">
              <ThemeToggle />
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

