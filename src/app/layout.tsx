import type { Metadata } from "next";
import { Outfit, Space_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "sonner";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import MetaThemeColor from "@/components/theme/MetaThemeColor";
import CookieBanner from "@/components/layout/CookieBanner";
import StickyCallButton from "@/components/layout/StickyCallButton";
import { getTestimonials } from "@/lib/data-service";

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
    "Expert en électricité, relamping LED, contrôle d'accès, serrurerie et métallerie en Île-de-France. Audit gratuit, intervention 24h/24, devis transparent, aides CEE gérées. Particuliers et professionnels.",
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
  authors: [{ name: "S'Connect" }],
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
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || "https://sconnectfrance.fr",
  },
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sconnectfrance.fr";

  // Compute aggregate rating from real testimonials (falls back to 5.0 / 0
  // when the dataset is empty — in which case we omit the schema to avoid
  // publishing a 0-review aggregate that Google would flag)
  const testimonialsData = getTestimonials();
  const verifiedReviews = testimonialsData.testimonials.filter(
    (t) => t.verified !== false && typeof t.rating === "number",
  );
  const ratingSum = verifiedReviews.reduce((acc, t) => acc + t.rating, 0);
  const reviewCount = verifiedReviews.length;
  const ratingValue = reviewCount > 0 ? (ratingSum / reviewCount).toFixed(1) : null;

  return (
    <html lang="fr" className={`${outfit.variable} ${spaceGrotesk.variable}`} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0ea5e9" />
        
        {/* Preconnect to external resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Schema.org Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": `${siteUrl}/#organization`,
              name: "S'Connect",
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
              name: "S'Connect",
              description:
                "Expert en électricité, relamping LED, contrôle d'accès, serrurerie et métallerie en Île-de-France. Certifié Qualifélec, RGE. Aides CEE gérées.",
              image: `${siteUrl}/og-image.jpg`,
              url: siteUrl,
              telephone: "+33-6-52-82-06-85",
              email: "contact@sconnect-france.fr",
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
                name: "Services S'Connect",
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
              ...(ratingValue && reviewCount > 0
                ? {
                    aggregateRating: {
                      "@type": "AggregateRating",
                      ratingValue,
                      reviewCount: String(reviewCount),
                      bestRating: "5",
                      worstRating: "1",
                    },
                  }
                : {}),
            }),
          }}
        />

        {/* Schema.org WebSite for sitelinks search box */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": `${siteUrl}/#website`,
              url: siteUrl,
              name: "S'Connect",
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
          {children}
          <StickyCallButton />
          <CookieBanner />
          <Toaster
            position="top-right"
            toastOptions={{
              className:
                "!bg-surface-elevated !text-foreground !border !border-border !shadow-xl",
            }}
            closeButton
            richColors
          />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
