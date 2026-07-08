import type { Metadata } from "next";
import { Outfit, Space_Grotesk } from "next/font/google";
import LazyToaster from "@/components/ui/LazyToaster";
import AnalyticsGate from "@/components/analytics/AnalyticsGate";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import MetaThemeColor from "@/components/theme/MetaThemeColor";
import CookieBanner from "@/components/layout/CookieBanner";
import StickyCallButton from "@/components/layout/StickyCallButton";
import SiteShell from "@/components/layout/SiteShell";
import { getSiteConfig } from "@/lib/data-adapter";
import type { SiteConfigData } from "@/contexts/SiteConfigContext";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://sconnectfrance.fr"),
  title: {
    default: "S'Connect | Électricité, Contrôle d'Accès & Serrurerie en Île-de-France",
    template: "%s | S'Connect",
  },
  description:
    "Expert en électricité, relamping LED, contrôle d'accès, serrurerie et métallerie en Île-de-France. Audit gratuit, intervention 24h/24, devis transparent, financement accompagné. Particuliers et professionnels.",
  keywords: [
    "électricien Île-de-France",
    "relamping LED",
    "audit éclairage LED",
    "CEE éclairage",
    "décret tertiaire",
    "contrôle d'accès",
    "serrurerie",
    "métallerie",
    "installation électrique",
    "dépannage électrique 24/7",
    "interphonie",
    "vidéosurveillance",
    "ouverture de porte",
    "blindage porte",
    "fabrication portail",
    "garde-corps métallique",
    "électricien Paris",
    "électricien Clichy 92",
    "électricien 93",
    "électricien 94",
    "digicode",
    "badge accès",
  ],
  authors: [{ name: "S Connect France" }],
  creator: "S'Connect",
  publisher: "S'Connect",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://sconnectfrance.fr",
    siteName: "S'Connect",
    title: "S'Connect | Électricité, Contrôle d'Accès & Serrurerie",
    description:
      "Expert en installation électrique, systèmes de contrôle d'accès et serrurerie en Île-de-France. Intervention rapide, devis gratuit.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "S'Connect - Électricité, Contrôle d'Accès, Serrurerie",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "S'Connect | Électricité, Contrôle d'Accès & Serrurerie",
    description: "Expert en électricité, contrôle d'accès et serrurerie en Île-de-France",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // PAS de canonical ici : `alternates` défini dans le root layout est hérité
  // tel quel par toute page qui ne le redéfinit pas — ~20 pages se déclaraient
  // canoniques de la homepage (signal "doublon de la home" envoyé à Google).
  // Le canonical est posé page par page (buildMetadata) ; la home l'a dans
  // src/app/page.tsx.
  verification: {
    ...(process.env.GOOGLE_SITE_VERIFICATION
      ? { google: process.env.GOOGLE_SITE_VERIFICATION }
      : {}),
    ...(process.env.BING_SITE_VERIFICATION
      ? { other: { "msvalidate.01": process.env.BING_SITE_VERIFICATION } }
      : {}),
  },
  category: "business",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sconnectfrance.fr";

  // Config du site lue CÔTÉ SERVEUR (Supabase si dispo, sinon JSON local) et
  // passée au shell client — remplace le fetch /api/admin/site-config que
  // l'ancien template.tsx déclenchait chez chaque visiteur.
  const cfg = await getSiteConfig();
  const shellConfig: SiteConfigData = {
    siteName: cfg.siteName || "S Connect France",
    siteTagline: cfg.siteTagline || "Électricité • Contrôle d'accès • Serrurerie • Métallerie",
    phone: cfg.phone || "06 52 82 06 85",
    phoneEmergency: cfg.phoneEmergency || cfg.phone || "06 52 82 06 85",
    email: cfg.email || "contact@sconnectfrance.fr",
    address: cfg.address || { street: "35 rue des Cailloux", postalCode: "92110", city: "Clichy" },
    hours: cfg.hours || { weekdays: "Lun-Ven: 8h-19h", saturday: "Samedi: 9h-17h", emergency: "Urgences 24/7" },
    schedule: (cfg as { schedule?: SiteConfigData["schedule"] }).schedule,
    social: cfg.social || { facebook: "", linkedin: "", instagram: "" },
    logoUrl: (cfg as { logoUrl?: string }).logoUrl || "",
    logoDarkUrl: (cfg as { logoDarkUrl?: string }).logoDarkUrl || "",
  };

  return (
    <html lang="fr" className={`${outfit.variable} ${spaceGrotesk.variable}`} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0ea5e9" />
        
        {/* Pas de preconnect Google Fonts : next/font self-host les polices,
            ces handshakes étaient payés pour rien à chaque visite. */}

        {/* Schema.org Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": `${siteUrl}/#organization`,
              name: "S Connect France",
              legalName: "S Connect France",
              alternateName: "S'Connect",
              foundingDate: "2021",
              founder: {
                "@type": "Person",
                "@id": `${siteUrl}/auteur/mehdi-belkacem#person`,
                name: "Mehdi Belkacem",
                jobTitle: "Fondateur",
              },
              employee: {
                "@type": "Person",
                name: "Selim Sebbana",
                jobTitle: "Président",
              },
              url: siteUrl,
              logo: {
                "@type": "ImageObject",
                url: `${siteUrl}/logo.png`,
                width: 512,
                height: 512,
              },
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  telephone: "+33-6-52-82-06-85",
                  contactType: "customer service",
                  availableLanguage: ["French"],
                  areaServed: "FR",
                },
                {
                  "@type": "ContactPoint",
                  telephone: "+33-6-52-82-06-85",
                  contactType: "emergency",
                  availableLanguage: ["French"],
                  areaServed: "FR",
                },
              ],
              sameAs: [
                "https://facebook.com/sconnectfrance",
                "https://linkedin.com/company/sconnectfrance",
                "https://instagram.com/sconnectfrance",
              ],
            }),
          }}
        />
        
        {/* Schema.org LocalBusiness */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": ["Electrician", "Locksmith", "LocalBusiness"],
              "@id": `${siteUrl}/#localbusiness`,
              name: "S Connect France",
              description:
                "Expert en électricité, relamping LED, contrôle d'accès, serrurerie et métallerie en Île-de-France. Certifié Qualifélec, RGE.",
              image: `${siteUrl}/og-image.jpg`,
              url: siteUrl,
              telephone: "+33-6-52-82-06-85",
              email: "contact@sconnectfrance.fr",
              address: {
                "@type": "PostalAddress",
                streetAddress: "35 rue des Cailloux",
                addressLocality: "Clichy",
                postalCode: "92110",
                addressRegion: "Île-de-France",
                addressCountry: "FR",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 48.9046,
                longitude: 2.3045,
              },
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                  opens: "08:00",
                  closes: "19:00",
                },
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: "Saturday",
                  opens: "09:00",
                  closes: "17:00",
                },
              ],
              priceRange: "€€",
              currenciesAccepted: "EUR",
              paymentAccepted: "Cash, Credit Card, Check, Bank Transfer",
              areaServed: [
                { "@type": "AdministrativeArea", name: "Paris" },
                { "@type": "AdministrativeArea", name: "Hauts-de-Seine" },
                { "@type": "AdministrativeArea", name: "Seine-Saint-Denis" },
                { "@type": "AdministrativeArea", name: "Val-de-Marne" },
                { "@type": "AdministrativeArea", name: "Yvelines" },
                { "@type": "AdministrativeArea", name: "Essonne" },
                { "@type": "AdministrativeArea", name: "Val-d'Oise" },
                { "@type": "AdministrativeArea", name: "Seine-et-Marne" },
              ],
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Services S Connect France",
                itemListElement: [
                  {
                    "@type": "OfferCatalog",
                    name: "Électricité",
                    itemListElement: [
                      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Installation électrique" } },
                      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Rénovation électrique" } },
                      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Mise aux normes NF C 15-100" } },
                      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Dépannage électrique 24/7" } },
                      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Relamping LED & audit éclairage" } },
                      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Relamping LED bureau & tertiaire" } },
                      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Relamping LED commerce & restaurant" } },
                      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Relamping LED copropriété & parking" } },
                      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Relamping LED industriel & entrepôt" } },
                      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Borne de recharge IRVE" } },
                    ],
                  },
                  {
                    "@type": "OfferCatalog",
                    name: "Contrôle d'accès",
                    itemListElement: [
                      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Interphonie" } },
                      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Vidéophonie" } },
                      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Badges et digicodes" } },
                      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Vidéosurveillance" } },
                    ],
                  },
                  {
                    "@type": "OfferCatalog",
                    name: "Serrurerie",
                    itemListElement: [
                      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Ouverture de porte" } },
                      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Remplacement de serrure" } },
                      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Blindage de porte A2P" } },
                    ],
                  },
                  {
                    "@type": "OfferCatalog",
                    name: "Métallerie",
                    itemListElement: [
                      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Fabrication de portail sur mesure" } },
                      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Garde-corps métallique" } },
                      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Structure métallique" } },
                    ],
                  },
                ],
              },
              // Pas d'aggregateRating : la page /avis a été supprimée — une
              // note auto-déclarée sans avis consultables sur le site viole
              // les guidelines review snippet de Google (risque d'action
              // manuelle). À réintroduire seulement adossée au futur GBP.
            }),
          }}
        />

        {/* Schema.org WebSite — sans SearchAction : l'endpoint
            /actualites?q=… n'existe pas, déclarer une searchbox vers une
            URL non fonctionnelle est pire que de ne rien déclarer. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": `${siteUrl}/#website`,
              url: siteUrl,
              name: "S Connect France",
              description: "Expert en électricité, contrôle d'accès et serrurerie en Île-de-France",
              publisher: { "@id": `${siteUrl}/#organization` },
              inLanguage: "fr-FR",
            }),
          }}
        />
      </head>
      <body className="font-sans">
        <a href="#main" className="skip-link">
          Aller au contenu
        </a>
        <ThemeProvider>
          <MetaThemeColor />
          <SiteShell config={shellConfig}>{children}</SiteShell>
          <StickyCallButton />
          <CookieBanner />
          <LazyToaster />
        </ThemeProvider>
        <AnalyticsGate />
      </body>
    </html>
  );
}
