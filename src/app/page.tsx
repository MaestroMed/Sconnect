import { getSiteConfig, getHomepage, getTestimonials, getRealizations, getBrands } from "@/lib/data-service";
import HomePageClient from "@/components/home/HomePageClient";

export const dynamic = "force-dynamic";

export default function Home() {
  // Récupérer les données du back-office
  const siteConfig = getSiteConfig();
  const homepage = getHomepage();
  const { testimonials } = getTestimonials();
  const { realizations } = getRealizations();
  const { brands } = getBrands();

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
    }));

  const clientBrands = brands.slice(0, 6).map((b) => ({
    id: b.id,
    name: b.name,
    logo: b.logo,
  }));

  return (
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
  );
}
