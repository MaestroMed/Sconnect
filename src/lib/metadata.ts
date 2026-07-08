import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://sconnectfrance.fr";
const SITE_NAME = "S Connect France";
const DEFAULT_DESCRIPTION =
  "Expert en installation électrique, systèmes de contrôle d'accès et serrurerie en Île-de-France. Intervention rapide 24h/24, devis gratuit.";

export interface BuildMetadataInput {
  title: string;
  description?: string;
  path?: string;
  image?: string;
  imageAlt?: string;
  keywords?: string[];
  noindex?: boolean;
  category?: string;
  publishedAt?: string;
  updatedAt?: string;
  type?: "website" | "article";
}

/**
 * Builds a fully-wired Next 15 Metadata object with Open Graph,
 * Twitter card, canonical URL and dynamic OG image URL.
 */
export function buildMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  path = "/",
  image,
  imageAlt,
  keywords,
  noindex = false,
  category,
  publishedAt,
  updatedAt,
  type = "website",
}: BuildMetadataInput): Metadata {
  const url = `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
  const ogImage =
    image ||
    `/api/og?${new URLSearchParams({
      title,
      ...(category ? { category } : {}),
    }).toString()}`;

  const absoluteOgImage = ogImage.startsWith("http") ? ogImage : `${SITE_URL}${ogImage}`;

  return {
    title,
    description,
    ...(keywords && keywords.length > 0 ? { keywords } : {}),
    alternates: {
      canonical: url,
    },
    robots: noindex
      ? { index: false, follow: false }
      : {
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
    openGraph: {
      type,
      locale: "fr_FR",
      url,
      siteName: SITE_NAME,
      title,
      description,
      images: [
        {
          url: absoluteOgImage,
          width: 1200,
          height: 630,
          alt: imageAlt || title,
        },
      ],
      ...(type === "article" && publishedAt ? { publishedTime: publishedAt } : {}),
      ...(type === "article" && updatedAt ? { modifiedTime: updatedAt } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteOgImage],
    },
  };
}
