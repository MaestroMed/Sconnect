"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Phone,
  Zap,
  ChevronDown,
  AlertTriangle,
} from "lucide-react";
import { useSiteConfig } from "@/contexts/SiteConfigContext";
import ThemeToggle from "@/components/theme/ThemeToggle";
import AvailabilityBadge from "@/components/ui/AvailabilityBadge";
import DesktopNav from "@/components/layout/DesktopNav";

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
  { name: "Avis Clients", href: "/avis" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const pathname = usePathname();
  const siteConfig = useSiteConfig();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setIsServicesOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Top Bar */}
      <div className="bg-dark-900 dark:bg-dark-950 text-white py-2 hidden md:block border-b border-dark-800/60">
        <div className="container-custom flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <AvailabilityBadge variant="dark" />
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
                <img 
                  src={siteConfig.logoUrl} 
                  alt={siteConfig.siteName}
                  className="h-12 w-auto object-contain"
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
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg hover:bg-surface-muted transition-colors"
                aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
                aria-expanded={isOpen}
              >
                {isOpen ? (
                  <X className="w-6 h-6 text-foreground" />
                ) : (
                  <Menu className="w-6 h-6 text-foreground" />
                )}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden border-t border-border bg-surface"
            >
              <div className="container-custom py-4 space-y-2">
                <div className="flex justify-center py-2">
                  <AvailabilityBadge />
                </div>
                {navigation.map((item) => (
                  <div key={item.name}>
                    {item.hasDropdown ? (
                      <>
                        <button
                          onClick={() =>
                            setIsServicesOpen(!isServicesOpen)
                          }
                          className="flex items-center justify-between w-full px-4 py-3 rounded-lg font-medium text-foreground hover:bg-primary-50 dark:hover:bg-primary-500/10 hover:text-primary-600 transition-colors"
                        >
                          {item.name}
                          <ChevronDown
                            className={`w-5 h-5 transition-transform duration-200 ${
                              isServicesOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        <AnimatePresence>
                          {isServicesOpen && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="ml-4 space-y-1"
                            >
                              {services.map((service) => (
                                <Link
                                  key={service.href}
                                  href={service.href}
                                  className="block px-4 py-2 rounded-lg text-foreground-muted hover:bg-primary-50 dark:hover:bg-primary-500/10 hover:text-primary-600 transition-colors"
                                >
                                  {service.name}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        className={`block px-4 py-3 rounded-lg font-medium transition-colors ${
                          pathname === item.href
                            ? "text-primary-600 bg-primary-50 dark:text-primary-300 dark:bg-primary-500/10"
                            : "text-foreground hover:bg-primary-50 dark:hover:bg-primary-500/10 hover:text-primary-600"
                        }`}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}

                <div className="pt-4 mt-4 border-t border-border space-y-3">
                  <a
                    href={`tel:${siteConfig.phone.replace(/\s/g, '')}`}
                    className="flex items-center justify-center gap-2 text-foreground font-semibold"
                  >
                    <Phone className="w-5 h-5 text-primary-600" />
                    {siteConfig.phone}
                  </a>
                  <div className="grid grid-cols-2 gap-3">
                    <Link
                      href="/demande-devis"
                      className="btn-outline text-center"
                    >
                      Devis gratuit
                    </Link>
                    <Link
                      href="/demande-intervention"
                      className="btn-accent text-center"
                    >
                      Urgence
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}

