import { getSiteConfig, getHomepage, getTestimonials, getRealizations, getBrands } from "@/lib/data-adapter";
import HomePageClient from "@/components/home/HomePageClient";
import { generateVideoSchema, injectSchema } from "@/lib/structured-data";

export const dynamic = "force-dynamic";
export const revalidate = 0; // Disable cache to always fetch fresh data

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
