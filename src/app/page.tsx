import type { Metadata } from "next";
import { getSiteConfig, getHomepage, getTestimonials, getRealizations, getBrands } from "@/lib/data-adapter";
import HomePageClient from "@/components/home/HomePageClient";
import { generateVideoSchema, injectSchema } from "@/lib/structured-data";

// Canonical de la home — porté par la page (plus par le root layout, dont
// l'`alternates` était hérité par toutes les pages sans canonical propre).
// Relatif : résolu en absolu via metadataBase du root layout.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

// ISR — re-render at most every 10 min. The home content (site config,
// testimonials, brands) doesn't change second by second; static + ISR
// gives us sub-1s TTFB instead of the 5-15s cold-start we had with
// `force-dynamic` + `revalidate: 0`. Editorial changes propagate within
// 10 min, or instantly via Vercel's on-demand revalidation if we wire it.
export const revalidate = 600;

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sconnectfrance.fr";

// Hero VideoObject schema → indexed by Google as a standalone video result.
const heroVideoSchema = generateVideoSchema({
  name: "S Connect France — artisan multi-métiers en Île-de-France",
  description:
    "Vue cinématographique d'une fenêtre parisienne au crépuscule. Hero animé de S Connect, artisan électricien, serrurier, métallier et spécialiste contrôle d'accès à Clichy.",
  thumbnailUrl: "/images/hero/hero-cinema-paris.webp",
  uploadDate: "2026-05-10",
  duration: "PT6S",
  contentUrl: `${siteUrl}/videos/hero-paris-window.mp4`,
  baseUrl: siteUrl,
});

// Home breadcrumb — even on the root, declaring it explicit helps Google
// understand the URL is the canonical entry point of the site graph.
const homeBreadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Accueil",
      item: siteUrl,
    },
  ],
};

export default async function Home() {
  // Récupérer les données du back-office (Supabase en prod, JSON en dev)
  const siteConfig = await getSiteConfig();
  const homepage = await getHomepage();
  const { testimonials } = await getTestimonials();
  const { realizations } = await getRealizations();
  const { brands } = await getBrands();

  // Transformer les données pour le client
  const clientTestimonials = testimonials.map((t) => ({
    name: t.name,
    rating: t.rating,
    text: t.text,
    service: t.service,
    location: t.location,
  }));

  const clientRealizations = realizations
    .filter((r) => r.featured)
    .map((r) => ({
      id: r.id,
      title: r.title,
      type: r.type,
      location: r.location,
      category: r.category,
      image: r.image,
      hasCompare: Boolean(r.imageBefore && r.imageAfter && r.imageBefore !== r.imageAfter),
    }));

  const clientBrands = brands.slice(0, 6).map((b) => ({
    id: b.id,
    name: b.name,
    logo: b.logo,
  }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={injectSchema(heroVideoSchema)}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={injectSchema(homeBreadcrumbSchema)}
      />
      <HomePageClient
        siteConfig={{
          siteName: siteConfig.siteName,
          phone: siteConfig.phone,
          phoneEmergency: siteConfig.phoneEmergency,
          stats: siteConfig.stats,
          zones: siteConfig.zones,
        }}
        homepage={{
          hero_title: homepage.hero_title,
          hero_subtitle: homepage.hero_subtitle,
          hero_cta_primary: homepage.hero_cta_primary,
          hero_cta_secondary: homepage.hero_cta_secondary,
          hero_image_url: homepage.hero_image_url,
          brands_title: homepage.brands_title,
          brands_subtitle: homepage.brands_subtitle,
          cta_title: homepage.cta_title,
          cta_subtitle: homepage.cta_subtitle,
          cta_button: homepage.cta_button,
        }}
        testimonials={clientTestimonials}
        realizations={clientRealizations}
        brands={clientBrands}
      />
    </>
  );
}
