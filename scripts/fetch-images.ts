/**
 * Fetch a curated set of Unsplash photos, optimize them with sharp
 * (webp + jpg fallback), and emit a blur-placeholder manifest.
 *
 * Usage:
 *   npx tsx scripts/fetch-images.ts           # fetch missing only
 *   npx tsx scripts/fetch-images.ts --force   # re-fetch all
 *
 * Writes:
 *   public/images/{category}/{slug}.webp
 *   public/images/{category}/{slug}.jpg
 *   src/lib/image-manifest.generated.json
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import sharp from "sharp";

type Category =
  | "hero"
  | "services"
  | "realisations"
  | "zones"
  | "team";

interface ImageSpec {
  slug: string;
  category: Category;
  /** Unsplash photo ID (the part after photo-). */
  unsplashId: string;
  /** Alt text baseline (FR). */
  alt: string;
  /** Output width in px. Default 1600. */
  width?: number;
  /** Crop height (when different ratio needed). */
  height?: number;
}

const CATALOG: ImageSpec[] = [
  // ——— Hero (large, wide format) ———
  { slug: "hero-electricien", category: "hero", unsplashId: "1621905251189-08b45d6a269e", alt: "Électricien en intervention sur tableau électrique", width: 1920, height: 1080 },
  { slug: "hero-serrurier", category: "hero", unsplashId: "1606765962248-7ff407b51667", alt: "Serrurier installant une serrure haute sécurité", width: 1920, height: 1080 },
  { slug: "hero-controle-acces", category: "hero", unsplashId: "1558002038-1055907df827", alt: "Système de contrôle d'accès moderne", width: 1920, height: 1080 },
  { slug: "hero-portail", category: "hero", unsplashId: "1558618666-fcd25c85cd64", alt: "Portail métallique sur mesure", width: 1920, height: 1080 },

  // ——— Services (square-ish, mid resolution) ———
  // Électricité
  { slug: "electricite-installation", category: "services", unsplashId: "1621905252507-b35492cc74b4", alt: "Installation électrique en cours", width: 1200, height: 900 },
  { slug: "electricite-depannage", category: "services", unsplashId: "1581092335397-9583eb92d232", alt: "Dépannage électrique", width: 1200, height: 900 },
  { slug: "electricite-borne-irve", category: "services", unsplashId: "1593941707882-a5bba14938c7", alt: "Borne de recharge IRVE", width: 1200, height: 900 },

  // Contrôle d'accès
  { slug: "acces-interphone", category: "services", unsplashId: "1608889476518-738c9b1dcb40", alt: "Interphone vidéo", width: 1200, height: 900 },
  { slug: "acces-badge", category: "services", unsplashId: "1621905251918-48416bd8575a", alt: "Système de badge d'accès", width: 1200, height: 900 },
  { slug: "acces-videophone", category: "services", unsplashId: "1564466809058-bf4114d55352", alt: "Vidéophone moderne", width: 1200, height: 900 },

  // Serrurerie
  { slug: "serrurerie-ouverture", category: "services", unsplashId: "1517248135467-4c7edcad34c4", alt: "Ouverture de porte", width: 1200, height: 900 },
  { slug: "serrurerie-blindage", category: "services", unsplashId: "1558002038-1055907df827", alt: "Blindage de porte", width: 1200, height: 900 },
  { slug: "serrurerie-serrure", category: "services", unsplashId: "1558618666-fcd25c85cd64", alt: "Remplacement de serrure haute sécurité", width: 1200, height: 900 },

  // Métallerie
  { slug: "metallerie-portail", category: "services", unsplashId: "1558618666-fcd25c85cd64", alt: "Fabrication de portail sur mesure", width: 1200, height: 900 },
  { slug: "metallerie-garde-corps", category: "services", unsplashId: "1503387762-592deb58ef4e", alt: "Garde-corps métallique", width: 1200, height: 900 },
  { slug: "metallerie-structure", category: "services", unsplashId: "1504307651254-35680f356dfd", alt: "Structure métallique sur mesure", width: 1200, height: 900 },

  // ——— Réalisations (gallery) ———
  { slug: "realisation-1", category: "realisations", unsplashId: "1558618666-fcd25c85cd64", alt: "Réalisation — installation électrique complète", width: 1200, height: 900 },
  { slug: "realisation-2", category: "realisations", unsplashId: "1621905252507-b35492cc74b4", alt: "Réalisation — tableau électrique rénové", width: 1200, height: 900 },
  { slug: "realisation-3", category: "realisations", unsplashId: "1558002038-1055907df827", alt: "Réalisation — contrôle d'accès installé", width: 1200, height: 900 },
  { slug: "realisation-4", category: "realisations", unsplashId: "1556740758-90de374c12ad", alt: "Réalisation — interphonie copropriété", width: 1200, height: 900 },
  { slug: "realisation-5", category: "realisations", unsplashId: "1497366216548-37526070297c", alt: "Réalisation — éclairage intérieur", width: 1200, height: 900 },
  { slug: "realisation-6", category: "realisations", unsplashId: "1517248135467-4c7edcad34c4", alt: "Réalisation — pose de serrure", width: 1200, height: 900 },
  { slug: "realisation-7", category: "realisations", unsplashId: "1621905251189-08b45d6a269e", alt: "Réalisation — chantier complet", width: 1200, height: 900 },
  { slug: "realisation-8", category: "realisations", unsplashId: "1593941707882-a5bba14938c7", alt: "Réalisation — installation borne IRVE", width: 1200, height: 900 },

  // ——— Zones d'intervention ———
  { slug: "zone-paris", category: "zones", unsplashId: "1449824913935-59a10b8d2000", alt: "Paris et Île-de-France", width: 1600, height: 1200 },
  { slug: "zone-clichy", category: "zones", unsplashId: "1502602898657-3e91760cbb34", alt: "Clichy et Hauts-de-Seine", width: 1600, height: 1200 },
  { slug: "zone-idf", category: "zones", unsplashId: "1431274172761-fca41d930114", alt: "Île-de-France vue aérienne", width: 1600, height: 1200 },

  // ——— Team / About ———
  { slug: "team-technicien", category: "team", unsplashId: "1581092921461-eab62e97a780", alt: "Technicien en intervention", width: 1200, height: 900 },
  { slug: "team-equipe", category: "team", unsplashId: "1521737604893-d14cc237f11d", alt: "Équipe Sconnect au complet", width: 1200, height: 900 },
  { slug: "team-vehicule", category: "team", unsplashId: "1507003211169-0a1dd7228f2d", alt: "Véhicule d'intervention Sconnect", width: 1200, height: 900 },
];

const PUBLIC_DIR = path.resolve(__dirname, "..", "public", "images");
const MANIFEST_OUT = path.resolve(__dirname, "..", "src", "lib", "image-manifest.generated.json");

const UNSPLASH_BASE = "https://images.unsplash.com/photo-";

const force = process.argv.includes("--force");

async function ensureDir(dir: string) {
  await fs.mkdir(dir, { recursive: true });
}

async function fileExists(p: string): Promise<boolean> {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function downloadImage(url: string): Promise<Buffer> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Fetch failed ${res.status}: ${url}`);
  const ab = await res.arrayBuffer();
  return Buffer.from(ab);
}

interface ManifestEntry {
  slug: string;
  category: Category;
  alt: string;
  webp: string;
  jpg: string;
  width: number;
  height: number;
  blurDataURL: string;
}

async function processOne(spec: ImageSpec): Promise<ManifestEntry> {
  const w = spec.width ?? 1600;
  const h = spec.height ?? 900;
  const category = spec.category;
  const outDir = path.join(PUBLIC_DIR, category);
  await ensureDir(outDir);
  const webpPath = path.join(outDir, `${spec.slug}.webp`);
  const jpgPath = path.join(outDir, `${spec.slug}.jpg`);

  const hasWebp = await fileExists(webpPath);
  const hasJpg = await fileExists(jpgPath);

  if (!force && hasWebp && hasJpg) {
    // regenerate blur only
  } else {
    const url = `${UNSPLASH_BASE}${spec.unsplashId}?w=${w * 2}&q=85&fm=jpg&fit=crop`;
    process.stdout.write(`  fetching ${spec.slug}… `);
    const buf = await downloadImage(url);

    const base = sharp(buf).resize(w, h, { fit: "cover", position: "center" });
    await base.clone().webp({ quality: 82 }).toFile(webpPath);
    await base.clone().jpeg({ quality: 82, progressive: true, mozjpeg: true }).toFile(jpgPath);
    process.stdout.write("ok\n");
  }

  // Always refresh blur placeholder (fast)
  const blurBuf = await sharp(webpPath).resize(16, Math.round((16 * h) / w)).blur(2).toBuffer();
  const b64 = blurBuf.toString("base64");
  const blurDataURL = `data:image/webp;base64,${b64}`;

  return {
    slug: spec.slug,
    category,
    alt: spec.alt,
    webp: `/images/${category}/${spec.slug}.webp`,
    jpg: `/images/${category}/${spec.slug}.jpg`,
    width: w,
    height: h,
    blurDataURL,
  };
}

async function main() {
  console.log(`Fetching ${CATALOG.length} images (force=${force})…`);
  await ensureDir(PUBLIC_DIR);

  const entries: ManifestEntry[] = [];
  for (const spec of CATALOG) {
    try {
      const entry = await processOne(spec);
      entries.push(entry);
    } catch (err) {
      console.error(`  ! ${spec.slug}:`, err instanceof Error ? err.message : err);
    }
  }

  await fs.writeFile(MANIFEST_OUT, JSON.stringify(entries, null, 2), "utf-8");
  console.log(`\nWrote manifest with ${entries.length} entries → ${path.relative(process.cwd(), MANIFEST_OUT)}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
