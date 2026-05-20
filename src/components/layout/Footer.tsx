"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Facebook,
  Linkedin,
  Instagram,
  ChevronRight,
  Shield,
  Award,
  AlertTriangle,
} from "lucide-react";
import { useSiteConfig } from "@/contexts/SiteConfigContext";
import AvailabilityBadge from "@/components/ui/AvailabilityBadge";
import NewsletterForm from "@/components/marketing/NewsletterForm";

const services = [
  { name: "Électricité", href: "/services/electricite" },
  { name: "Relamping LED", href: "/services/electricite/relamping" },
  { name: "Contrôle d'accès", href: "/services/controle-acces" },
  { name: "Serrurerie", href: "/services/serrurerie" },
  { name: "Métallerie", href: "/services/metallerie" },
];

const quickLinks = [
  { name: "Accueil", href: "/" },
  { name: "Présentation", href: "/presentation" },
  { name: "Réalisations", href: "/realisations" },
  { name: "Actualités", href: "/actualites" },
  { name: "Avis Clients", href: "/avis" },
  { name: "Nos Marques", href: "/marques" },
  { name: "Contact", href: "/contact" },
];

const legalLinks = [
  { name: "Mentions légales", href: "/mentions-legales" },
  { name: "Politique de confidentialité", href: "/politique-confidentialite" },
  { name: "Politique cookies", href: "/cookies" },
  { name: "Conditions générales", href: "/conditions-generales" },
];

export default function Footer() {
  const siteConfig = useSiteConfig();
  
  return (
    <footer className="bg-dark-900 text-white">
      {/* Main Footer — universal CTA strip removed so it doesn't double up
          with the page-specific CTAs that live at the bottom of each service
          page. Pages without a CTA already redirect via the in-content links. */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6" aria-label="S Connect France — accueil">
              <Image
                src="/images/logo_only_white.svg"
                alt=""
                width={48}
                height={48}
                className="h-12 w-12"
              />
              <div className="flex flex-col">
                <span className="font-display font-bold text-xl">S Connect</span>
                <span className="text-xs text-primary-400 font-medium tracking-wide">
                  FRANCE
                </span>
              </div>
            </Link>
            <p className="text-dark-300 mb-6 leading-relaxed">
              Expert en électricité, contrôle d&apos;accès, serrurerie et métallerie depuis 2021. 
              Intervention rapide, travail soigné et prix transparents en Île-de-France.
            </p>
            {/* Certifications */}
            <div className="flex flex-wrap gap-3 mb-6">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/30 rounded-lg">
                <Shield className="w-4 h-4 text-green-400" />
                <span className="text-xs text-green-300 font-medium">Garantie Décennale</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-electric-500/10 border border-electric-500/30 rounded-lg">
                <Award className="w-4 h-4 text-electric-400" />
                <span className="text-xs text-electric-300 font-medium">IRVE</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {siteConfig.social.facebook && (
                <a
                  href={siteConfig.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-dark-800 flex items-center justify-center hover:bg-primary-600 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              )}
              {siteConfig.social.linkedin && (
                <a
                  href={siteConfig.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-dark-800 flex items-center justify-center hover:bg-primary-600 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
              {siteConfig.social.instagram && (
                <a
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-dark-800 flex items-center justify-center hover:bg-primary-600 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-display font-bold text-lg mb-6">Nos Services</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.href}>
                  <Link
                    href={service.href}
                    className="text-dark-300 hover:text-white hover:pl-2 transition-all duration-200 flex items-center gap-2"
                  >
                    <ChevronRight className="w-4 h-4 text-primary-500" />
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-bold text-lg mb-6">Liens Rapides</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-dark-300 hover:text-white hover:pl-2 transition-all duration-200 flex items-center gap-2"
                  >
                    <ChevronRight className="w-4 h-4 text-primary-500" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display font-bold text-lg mb-6">Contact</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href={`tel:${siteConfig.phone.replace(/\s/g, '').replace(/^0/, '+33')}`}
                  className="flex items-start gap-3 text-dark-300 hover:text-white transition-colors"
                >
                  <Phone className="w-5 h-5 text-primary-500 mt-0.5 shrink-0" />
                  <div>
                    <span className="block font-semibold text-white">
                      {siteConfig.phone}
                    </span>
                    <span className="text-sm">{siteConfig.hours.emergency}</span>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-start gap-3 text-dark-300 hover:text-white transition-colors"
                >
                  <Mail className="w-5 h-5 text-primary-500 mt-0.5 shrink-0" />
                  <span>{siteConfig.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-dark-300">
                <MapPin className="w-5 h-5 text-primary-500 mt-0.5 shrink-0" />
                <span>
                  {siteConfig.address.street}
                  <br />
                  {siteConfig.address.postalCode} {siteConfig.address.city}
                </span>
              </li>
              <li className="flex items-start gap-3 text-dark-300">
                <Clock className="w-5 h-5 text-primary-500 mt-0.5 shrink-0" />
                <div>
                  <span className="block">{siteConfig.hours.weekdays}</span>
                  <span>{siteConfig.hours.saturday}</span>
                </div>
              </li>
              <li>
                <AvailabilityBadge variant="dark" schedule={siteConfig.schedule} />
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-12 pt-8 border-t border-dark-800">
          <div className="grid md:grid-cols-[1fr_minmax(280px,420px)] gap-6 items-center">
            <div>
              <h3 className="font-display font-bold text-xl mb-1">
                Restez informé
              </h3>
              <p className="text-sm text-dark-300">
                Conseils, normes électriques, retours de chantier — un email par mois maximum.
              </p>
            </div>
            <NewsletterForm source="footer" />
          </div>
        </div>

        {/* Certifications */}
        <div className="mt-12 pt-8 border-t border-dark-800">
          <div className="flex flex-wrap items-center justify-center gap-8">
            <div className="flex items-center gap-2 text-dark-400">
              <Shield className="w-6 h-6 text-primary-500" />
              <span className="text-sm">Qualifélec</span>
            </div>
            <div className="flex items-center gap-2 text-dark-400">
              <Award className="w-6 h-6 text-accent-500" />
              <span className="text-sm">RGE</span>
            </div>
            <div className="flex items-center gap-2 text-dark-400">
              <Shield className="w-6 h-6 text-green-500" />
              <span className="text-sm">Garantie décennale</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-dark-800">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-dark-400">
            <p>
              © {new Date().getFullYear()} S Connect France. Tous droits réservés.
            </p>
            <ul className="flex flex-wrap items-center gap-6">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* Mentions légales obligatoires (loi LCEN + Code commerce). */}
          <p className="mt-4 text-xs text-dark-500 text-center md:text-left">
            S CONNECT FRANCE — SAS au capital de 20&nbsp;000&nbsp;€ ·
            SIRET&nbsp;899&nbsp;667&nbsp;596&nbsp;00014 ·
            RCS Nanterre&nbsp;899&nbsp;667&nbsp;596 ·
            TVA&nbsp;FR13899667596 ·
            APE 4321A ·
            Siège&nbsp;: 35&nbsp;rue des Cailloux, 92110 Clichy
          </p>
        </div>
      </div>
    </footer>
  );
}

