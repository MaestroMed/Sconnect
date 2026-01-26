/**
 * Générateurs de données structurées Schema.org
 * Pour optimiser le SEO et l'affichage dans les résultats de recherche
 */

type BreadcrumbItem = {
  name: string;
  url: string;
};

type FAQItem = {
  question: string;
  answer: string;
};

type ReviewSchema = {
  author: string;
  rating: number;
  text: string;
  date: string;
};

type ServiceSchema = {
  name: string;
  description: string;
  provider: string;
  areaServed: string[];
  priceRange?: string;
};

/**
 * Génère un BreadcrumbList schema
 */
export function generateBreadcrumbSchema(items: BreadcrumbItem[], baseUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `${baseUrl}${item.url}`,
    })),
  };
}

/**
 * Génère un FAQPage schema
 */
export function generateFAQSchema(faqs: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };
}

/**
 * Génère un Review schema
 */
export function generateReviewSchema(review: ReviewSchema, baseUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    "itemReviewed": {
      "@type": "LocalBusiness",
      "name": "S'Connect",
      "url": baseUrl,
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": review.rating,
      "bestRating": "5",
      "worstRating": "1",
    },
    "author": {
      "@type": "Person",
      "name": review.author,
    },
    "reviewBody": review.text,
    "datePublished": review.date,
  };
}

/**
 * Génère un Service schema
 */
export function generateServiceSchema(service: ServiceSchema, baseUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": service.name,
    "description": service.description,
    "provider": {
      "@type": "LocalBusiness",
      "@id": `${baseUrl}/#localbusiness`,
      "name": service.provider,
    },
    "areaServed": service.areaServed.map((area) => ({
      "@type": "AdministrativeArea",
      "name": area,
    })),
    ...(service.priceRange && { "priceRange": service.priceRange }),
    "availableChannel": {
      "@type": "ServiceChannel",
      "serviceUrl": baseUrl,
      "servicePhone": process.env.NEXT_PUBLIC_PHONE || "+33100000000",
    },
  };
}

/**
 * Génère un HowTo schema (pour guides/tutoriels)
 */
export function generateHowToSchema(data: {
  name: string;
  description: string;
  steps: { name: string; text: string; image?: string }[];
  baseUrl: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": data.name,
    "description": data.description,
    "step": data.steps.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": step.name,
      "text": step.text,
      ...(step.image && { "image": `${data.baseUrl}${step.image}` }),
    })),
  };
}

/**
 * Génère un AggregateRating schema
 */
export function generateAggregateRatingSchema(data: {
  ratingValue: number;
  reviewCount: number;
  baseUrl: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "AggregateRating",
    "itemReviewed": {
      "@type": "LocalBusiness",
      "@id": `${data.baseUrl}/#localbusiness`,
      "name": "S'Connect",
    },
    "ratingValue": data.ratingValue.toFixed(1),
    "reviewCount": data.reviewCount,
    "bestRating": "5",
    "worstRating": "1",
  };
}

/**
 * Génère un Product/Service Offer schema
 */
export function generateOfferSchema(data: {
  name: string;
  description: string;
  price?: string;
  priceCurrency?: string;
  availability?: string;
  baseUrl: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Offer",
    "itemOffered": {
      "@type": "Service",
      "name": data.name,
      "description": data.description,
    },
    ...(data.price && {
      "price": data.price,
      "priceCurrency": data.priceCurrency || "EUR",
    }),
    "availability": data.availability || "https://schema.org/InStock",
    "seller": {
      "@type": "LocalBusiness",
      "@id": `${data.baseUrl}/#localbusiness`,
      "name": "S'Connect",
    },
  };
}

/**
 * Génère un VideoObject schema
 */
export function generateVideoSchema(data: {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  duration?: string;
  contentUrl: string;
  baseUrl: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": data.name,
    "description": data.description,
    "thumbnailUrl": `${data.baseUrl}${data.thumbnailUrl}`,
    "uploadDate": data.uploadDate,
    ...(data.duration && { "duration": data.duration }),
    "contentUrl": data.contentUrl,
  };
}

/**
 * Helper pour injecter le schema dans une page
 */
export function injectSchema(schema: object) {
  return {
    __html: JSON.stringify(schema),
  };
}
