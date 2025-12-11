import type { Metadata } from "next";
import { Outfit, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

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
  metadataBase: new URL("https://sconnect-france.fr"),
  title: {
    default: "S Connect France | Installation Électrique à Clichy & Île-de-France",
    template: "%s | S Connect France",
  },
  description:
    "S Connect France, votre expert en installation électrique à Clichy (92). Installation, rénovation, mise aux normes, dépannage 24/7, domotique et fibre optique. Devis gratuit.",
  keywords: [
    "électricien Clichy",
    "installation électrique",
    "dépannage électrique",
    "mise aux normes électrique",
    "électricien 92",
    "électricien Hauts-de-Seine",
    "électricien Île-de-France",
    "domotique",
    "fibre optique",
    "tableau électrique",
  ],
  authors: [{ name: "S Connect France" }],
  creator: "S Connect France",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://sconnect-france.fr",
    siteName: "S Connect France",
    title: "S Connect France | Installation Électrique à Clichy & Île-de-France",
    description:
      "Expert en installation électrique à Clichy (92). Installation, rénovation, mise aux normes, dépannage 24/7, domotique et fibre optique.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "S Connect France - Installation Électrique",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "S Connect France | Installation Électrique",
    description: "Expert en installation électrique à Clichy et Île-de-France",
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
  verification: {
    google: "votre-code-google",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${outfit.variable} ${spaceGrotesk.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1d4ed8" />
        
        {/* Schema.org LocalBusiness */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Electrician",
              name: "S Connect France",
              image: "https://sconnect-france.fr/logo.png",
              url: "https://sconnect-france.fr",
              telephone: "+33-1-XX-XX-XX-XX",
              address: {
                "@type": "PostalAddress",
                streetAddress: "XX Rue de XXX",
                addressLocality: "Clichy",
                postalCode: "92110",
                addressCountry: "FR",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 48.9022,
                longitude: 2.3058,
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
              areaServed: {
                "@type": "GeoCircle",
                geoMidpoint: {
                  "@type": "GeoCoordinates",
                  latitude: 48.9022,
                  longitude: 2.3058,
                },
                geoRadius: "50000",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                reviewCount: "127",
              },
            }),
          }}
        />
      </head>
      <body className="font-sans">
        {children}
      </body>
    </html>
  );
}

