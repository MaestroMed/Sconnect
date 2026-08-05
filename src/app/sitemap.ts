import { MetadataRoute } from "next";
import fs from "node:fs";
import path from "node:path";
import { getAllPosts } from "@/lib/blog";
import { getRealizations } from "@/lib/data-service";
import { SERVICES } from "@/lib/local-seo/services";
import { indexableCommunes } from "@/lib/local-seo/communes";

/**
 * Auto-discover relamping location + vertical sub-pages so the sitemap
 * stays in sync with whatever `scripts/seo-generate.ts` (or a human)
 * creates under `src/app/services/electricite/relamping/`.
 */
function discoverRelampingSubroutes(baseUrl: string, now: Date): MetadataRoute.Sitemap {
  const relampingDir = path.join(process.cwd(), "src", "app", "services", "electricite", "relamping");
  const out: MetadataRoute.Sitemap = [];

  // Skip dirs already declared statically below to avoid duplicates
  const explicit = new Set([
    "bureau-tertiaire",
    "commerce-restaurant",
    "copropriete-parking",
    "industriel-entrepot",
    "paris",
    "la-defense",
    "clichy",
  ]);

  try {
    const entries = fs.readdirSync(relampingDir, { withFileTypes: true });
    for (const e of entries) {
      if (!e.isDirectory() || explicit.has(e.name)) continue;
      if (e.name === "verticales") {
        // Vertical sub-pages
        const verticalDir = path.join(relampingDir, "verticales");
        for (const v of fs.readdirSync(verticalDir, { withFileTypes: true })) {
          if (!v.isDirectory()) continue;
          out.push({
            url: `${baseUrl}/services/electricite/relamping/verticales/${v.name}`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.75,
          });
        }
        continue;
      }
      // Location pages (city sub-route)
      const pageFile = path.join(relampingDir, e.name, "page.tsx");
      if (fs.existsSync(pageFile)) {
        out.push({
          url: `${baseUrl}/services/electricite/relamping/${e.name}`,
          lastModified: now,
          changeFrequency: "monthly",
          priority: 0.8,
        });
      }
    }
  } catch {
    // Directory not present (e.g. unit tests) — return empty
  }
  return out;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sconnectfrance.fr";
  const now = new Date();

  const posts = await getAllPosts();
  const blogPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/actualites`,
      lastModified: posts[0]?.updatedAt ? new Date(posts[0].updatedAt) : now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...posts.map((post) => ({
      url: `${baseUrl}/actualites/${post.slug}`,
      lastModified: new Date(post.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];

  const { realizations } = getRealizations();
  const realizationPages: MetadataRoute.Sitemap = realizations.map((r) => ({
    url: `${baseUrl}/realisations/${r.id}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: r.featured ? 0.7 : 0.6,
  }));

  // Pages principales
  const mainPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/presentation`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/realisations`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/marques`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/demande-devis`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/demande-intervention`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/auteur/mehdi-belkacem`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    // SEO weapons — standalone landings rankable on their own
    {
      url: `${baseUrl}/calculateur-relamping`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/lexique-eclairage`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/presse`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/etudes-de-cas`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  // Pages services - Électricité
  const electricitePages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/services/electricite`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/services/electricite/installation-renovation`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services/electricite/mise-aux-normes`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services/electricite/depannage-electrique`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services/electricite/borne-irve`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    // Relamping LED — pillar + 4 sub-pages (SEO cluster)
    {
      url: `${baseUrl}/services/electricite/relamping`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services/electricite/relamping/bureau-tertiaire`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services/electricite/relamping/commerce-restaurant`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services/electricite/relamping/copropriete-parking`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services/electricite/relamping/industriel-entrepot`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    // Local landing pages — auto-generated via scripts/seo-generate.ts
    {
      url: `${baseUrl}/services/electricite/relamping/paris`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/services/electricite/relamping/la-defense`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.82,
    },
    {
      url: `${baseUrl}/services/electricite/relamping/clichy`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    // Auto-discovered relamping subroutes (cities + verticals)
    ...discoverRelampingSubroutes(baseUrl, now),
  ];

  // Pages services - Contrôle d'accès
  const controleAccesPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/services/controle-acces`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/services/controle-acces/interphonie-videophonie`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services/controle-acces/badges-digicodes`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  // Pages services - Serrurerie
  const serrureriePages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/services/serrurerie`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/services/serrurerie/ouverture-porte`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services/serrurerie/remplacement-serrure`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services/serrurerie/blindage-porte`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  // Pages services - Métallerie
  const metalleriePages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/services/metallerie`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/services/metallerie/fabrication-portail`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services/metallerie/fabrication-porte`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services/metallerie/structure-metallique`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  // Pages légales (basse priorité mais indexables)
  const legalPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/mentions-legales`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/politique-confidentialite`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/cookies`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/conditions-generales`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Pages locales programmatiques (service × commune) + hubs de service.
  // Publiées par vagues (cf. WAVE_MIN_POPULATION) — le sitemap reflète
  // automatiquement la vague active. Reste sous la limite de 50 000 URLs même
  // à pleine échelle (~4 600 URLs), donc pas de sharding nécessaire.
  // ANTI-DÉSINDEXATION : on ne soumet à Google que les pages INDEXABLES —
  // les 12 hubs + les communes ENRICHIES (contexte local réel, cf.
  // isIndexableCommune). La longue traîne non enrichie est en noindex (cf.
  // page-factory) ; l'exposer au sitemap inviterait Google à crawler des pages
  // minces et dégraderait la qualité perçue du site entier. Le sitemap suit
  // donc automatiquement l'avancée de l'enrichissement, sans édition manuelle.
  const communesToIndex = indexableCommunes();
  const localSeoPages: MetadataRoute.Sitemap = [];
  for (const s of SERVICES) {
    localSeoPages.push({
      url: `${baseUrl}/${s.key}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    });
    for (const c of communesToIndex) {
      // Une ville couverte par une page artisanale /services/** n'expose pas
      // sa page usine au sitemap : elle canonicalise vers l'artisanale (déjà
      // listée dans la section relamping) — un sitemap ne liste que des URLs
      // canoniques.
      if (s.handcrafted?.[c.slug]) continue;
      localSeoPages.push({
        url: `${baseUrl}/${s.key}/${c.slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }

  return [
    ...mainPages,
    ...electricitePages,
    ...controleAccesPages,
    ...serrureriePages,
    ...metalleriePages,
    ...blogPages,
    ...realizationPages,
    ...legalPages,
    ...localSeoPages,
  ];
}
