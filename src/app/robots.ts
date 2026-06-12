import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sconnectfrance.fr";
  
  return {
    rules: [
      // /api/og doit rester crawlable : c'est l'endpoint des images OG
      // dynamiques référencées par les metadata et le schema Article —
      // le bloquer empêche Google de récupérer les images. La règle la
      // plus spécifique (allow /api/og) gagne sur disallow /api/.
      {
        userAgent: "*",
        allow: ["/", "/api/og"],
        disallow: ["/api/", "/admin/"],
      },
      {
        userAgent: "Googlebot",
        allow: ["/", "/api/og"],
        disallow: ["/api/", "/admin/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
