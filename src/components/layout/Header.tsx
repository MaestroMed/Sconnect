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
  Clock,
  AlertTriangle,
} from "lucide-react";
import { useSiteConfig } from "@/contexts/SiteConfigContext";

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
      <div className="bg-dark-900 text-white py-2 hidden md:block">
        <div className="container-custom flex justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-accent-400" />
              Lun-Ven: 8h-19h | Sam: 9h-17h
            </span>
            <span className="flex items-center gap-2">
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
            ? "bg-white/80 backdrop-blur-xl shadow-lg shadow-dark-900/10 border-b border-white/20"
            : "bg-white"
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
                <>
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-electric-500 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/25 group-hover:shadow-xl group-hover:shadow-primary-500/30 transition-all duration-300">
                      <Zap className="w-7 h-7 text-white" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent-400 rounded-full animate-pulse" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-display font-bold text-xl text-dark-900">
                      S Connect
                    </span>
                    <span className="text-xs text-primary-600 font-medium tracking-wide">
                      FRANCE
                    </span>
                  </div>
                </>
              )}
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navigation.map((item) => (
                <div key={item.name} className="relative group">
                  {item.hasDropdown ? (
                    <button
                      onMouseEnter={() => setIsServicesOpen(true)}
                      onMouseLeave={() => setIsServicesOpen(false)}
                      className={`flex items-center gap-1 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                        pathname.startsWith("/services")
                          ? "text-primary-600 bg-primary-50"
                          : "text-dark-700 hover:text-primary-600 hover:bg-primary-50"
                      }`}
                    >
                      {item.name}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          isServicesOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                        pathname === item.href
                          ? "text-primary-600 bg-primary-50"
                          : "text-dark-700 hover:text-primary-600 hover:bg-primary-50"
                      }`}
                    >
                      {item.name}
                    </Link>
                  )}

                  {/* Services Dropdown */}
                  {item.hasDropdown && (
                    <AnimatePresence>
                      {isServicesOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          onMouseEnter={() => setIsServicesOpen(true)}
                          onMouseLeave={() => setIsServicesOpen(false)}
                          className="absolute top-full left-0 pt-2"
                        >
                          <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl shadow-dark-900/15 border border-white/50 p-4 w-80">
                            <div className="space-y-1">
                              {services.map((service) => (
                                <Link
                                  key={service.href}
                                  href={service.href}
                                  className="block p-3 rounded-xl hover:bg-primary-50 transition-colors group/item"
                                >
                                  <div className="font-semibold text-dark-900 group-hover/item:text-primary-600 transition-colors">
                                    {service.name}
                                  </div>
                                  <div className="text-sm text-dark-500">
                                    {service.description}
                                  </div>
                                </Link>
                              ))}
                            </div>
                            <div className="mt-4 pt-4 border-t border-dark-100">
                              <Link
                                href="/services"
                                className="flex items-center justify-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors"
                              >
                                Tous nos services
                                <ChevronDown className="w-4 h-4 -rotate-90" />
                              </Link>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <Link href="/demande-devis" className="btn-outline btn-sm">
                Devis gratuit
              </Link>
              <Link href="/demande-intervention" className="btn-accent btn-sm">
                <AlertTriangle className="w-4 h-4" />
                Urgence
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-dark-100 transition-colors"
              aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
            >
              {isOpen ? (
                <X className="w-6 h-6 text-dark-700" />
              ) : (
                <Menu className="w-6 h-6 text-dark-700" />
              )}
            </button>
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
              className="lg:hidden border-t border-dark-100 bg-white"
            >
              <div className="container-custom py-4 space-y-2">
                {navigation.map((item) => (
                  <div key={item.name}>
                    {item.hasDropdown ? (
                      <>
                        <button
                          onClick={() =>
                            setIsServicesOpen(!isServicesOpen)
                          }
                          className="flex items-center justify-between w-full px-4 py-3 rounded-lg font-medium text-dark-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
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
                                  className="block px-4 py-2 rounded-lg text-dark-600 hover:bg-primary-50 hover:text-primary-600 transition-colors"
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
                            ? "text-primary-600 bg-primary-50"
                            : "text-dark-700 hover:bg-primary-50 hover:text-primary-600"
                        }`}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}

                <div className="pt-4 mt-4 border-t border-dark-100 space-y-3">
                  <a
                    href={`tel:${siteConfig.phone.replace(/\s/g, '')}`}
                    className="flex items-center justify-center gap-2 text-dark-700 font-semibold"
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

