/**
 * Download Higgsfield-generated assets, convert PNG → webp + jpg via sharp,
 * regenerate blur placeholders, and update the image manifest.
 *
 * Inputs:
 *   - scripts/higgsfield-assets.json   (job_id ↔ slug ↔ target_dir map)
 *   - <show_generations dump file>     (URLs of completed jobs)
 *
 * Outputs:
 *   - public/images/{category}/{slug}.webp
 *   - public/images/{category}/{slug}.jpg
 *   - src/lib/image-manifest.generated.json  (updated entries)
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const SHOW_GEN_FILE = process.argv[2];
if (!SHOW_GEN_FILE) {
  console.error("usage: tsx scripts/fetch-higgsfield-assets.ts <show_generations.txt>");
  process.exit(1);
}

const ROOT = path.resolve(__dirname, "..");
const ASSETS_JSON = path.join(ROOT, "scripts", "higgsfield-assets.json");
const MANIFEST_OUT = path.join(ROOT, "src", "lib", "image-manifest.generated.json");

interface AssetSpec {
  slug: string;
  job_id: string;
  ratio: string;
  res: string;
  target_dir: string | null;
}

interface GenItem {
  id: string;
  status: string;
  type: string;
  results?: { rawUrl?: string; minUrl?: string };
}

const RATIO_DIMS: Record<string, { w: number; h: number }> = {
  "4:5": { w: 1280, h: 1600 },   // hero category portrait
  "21:9": { w: 2520, h: 1080 },  // cinematic wide (concept only)
  "16:9": { w: 1920, h: 1080 },  // hero cinema + realisations + zones
  "4:3": { w: 1600, h: 1200 },   // service tiles
};

// Slug-specific dimensions override (for hero res at 4K, we keep 4K-ish output)
const HERO_4K_DIMS = { w: 1600, h: 2000 }; // 4:5 hero, reasonable web size

// Alt text per slug (FR, accessibility)
const ALT_BY_SLUG: Record<string, string> = {
  "hero-electricien": "Électricien expert installant un disjoncteur Schneider Electric — appartement Haussmannien",
  "hero-controle-acces": "Clavier de contrôle d'accès noir mat à LED ambrée — porte chêne Haussmann",
  "hero-serrurier": "Main de serrurier installant un cylindre A2P haute sécurité",
  "hero-portail": "Métallier soudant un garde-corps en fer forgé parisien — étincelles",
  "hero-cinema-electricien": "Hero cinematic — disjoncteur Schneider avec LED bleue (poster vidéo)",
  "electricite-installation": "Tableau électrique Schneider neuf, disjoncteurs matte black avec LED",
  "electricite-depannage": "Dépannage électrique — multimètre testant un terminal sous tension",
  "electricite-borne-irve": "Borne de recharge IRVE Type 2 murale neuve",
  "acces-interphone": "Interphone moderne sur façade Haussmannienne",
  "acces-videophone": "Moniteur vidéophone intérieur monochrome",
  "acces-badge": "Lecteur de badge RFID mural et carte d'accès",
  "serrurerie-ouverture": "Serrurier ouvrant une porte avec outils de précision",
  "serrurerie-blindage": "Porte blindée A2P avec cylindre chromé haute sécurité",
  "serrurerie-serrure": "Trois cylindres de serrure A2P différentes finitions",
  "metallerie-portail": "Portail wrought-iron parisien fait main, finition atelier",
  "metallerie-garde-corps": "Garde-corps acier brossé sur balcon Haussmann",
  "metallerie-structure": "Soudure structurelle d'une poutre IPN en rénovation",
  "realisation-1": "Réalisation — tableau électrique entièrement rénové",
  "realisation-2": "Réalisation — porte blindée installée Paris",
  "realisation-3": "Réalisation — interphone façade Haussmann blue-hour",
  "realisation-4": "Réalisation — borne IRVE résidentielle",
  "realisation-5": "Réalisation — portail wrought-iron sur rue parisienne",
  "realisation-6": "Réalisation — garde-corps balcon vue rooftops Paris",
  "realisation-7": "Réalisation — rénovation électrique salon Haussmann",
  "realisation-8": "Réalisation — système badge réception bureau",
  "before-porte": "Avant : porte d'entrée vétuste à rénover",
  "before-serrure": "Avant : ancienne serrure usée à remplacer",
  "before-tableau": "Avant : tableau électrique dangereux à remettre aux normes",
  "zone-paris": "Paris vue aérienne blue hour — Tour Eiffel + Seine",
  "zone-clichy": "Clichy (92) — rue résidentielle blue hour",
  "zone-idf": "Île-de-France vue aérienne — Paris + La Défense + petite couronne",
  "team-equipe": "Équipe S'Connect — trois techniciens experts",
  "team-technicien": "Technicien S'Connect en intervention",
  "team-vehicule": "Véhicule d'intervention S'Connect — rue parisienne",
};

const CATEGORY_FROM_DIR = (target_dir: string): string => {
  // public/images/<category> → <category>
  return target_dir.replace(/^public[\\/]+images[\\/]+/, "").replace(/[\\/]+/g, "/");
};

async function downloadBuffer(url: string): Promise<Buffer> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`fetch ${res.status}: ${url}`);
  const ab = await res.arrayBuffer();
  return Buffer.from(ab);
}

async function processAsset(spec: AssetSpec, url: string) {
  const dims = RATIO_DIMS[spec.ratio] ?? { w: 1600, h: 900 };
  // For hero 4:5 4K, use a more web-realistic size
  const w = spec.target_dir?.endsWith("hero") && spec.ratio === "4:5" ? HERO_4K_DIMS.w : dims.w;
  const h = spec.target_dir?.endsWith("hero") && spec.ratio === "4:5" ? HERO_4K_DIMS.h : dims.h;

  const targetDirAbs = path.join(ROOT, spec.target_dir!);
  await fs.mkdir(targetDirAbs, { recursive: true });

  const webpPath = path.join(targetDirAbs, `${spec.slug}.webp`);
  const jpgPath = path.join(targetDirAbs, `${spec.slug}.jpg`);

  process.stdout.write(`  ${spec.slug} (${spec.ratio}, ${w}x${h})… `);
  const buf = await downloadBuffer(url);

  const base = sharp(buf).resize(w, h, { fit: "cover", position: "center" });
  await base.clone().webp({ quality: 84 }).toFile(webpPath);
  await base.clone().jpeg({ quality: 84, progressive: true, mozjpeg: true }).toFile(jpgPath);

  const blurBuf = await sharp(webpPath).resize(16, Math.round((16 * h) / w)).blur(2).toBuffer();
  const blurDataURL = `data:image/webp;base64,${blurBuf.toString("base64")}`;
  process.stdout.write("ok\n");

  const category = CATEGORY_FROM_DIR(spec.target_dir!);
  return {
    slug: spec.slug,
    category,
    alt: ALT_BY_SLUG[spec.slug] ?? spec.slug,
    webp: `/images/${category}/${spec.slug}.webp`,
    jpg: `/images/${category}/${spec.slug}.jpg`,
    width: w,
    height: h,
    blurDataURL,
  };
}

async function main() {
  const assetsRaw = JSON.parse(await fs.readFile(ASSETS_JSON, "utf-8")) as { stills: AssetSpec[] };
  const genRaw = JSON.parse(await fs.readFile(SHOW_GEN_FILE, "utf-8")) as { items: GenItem[] };

  const byId = new Map<string, GenItem>();
  for (const it of genRaw.items) byId.set(it.id, it);

  const shippable = assetsRaw.stills.filter((s) => s.target_dir !== null);
  const completed: typeof shippable = [];
  const pending: typeof shippable = [];
  const failed: typeof shippable = [];

  for (const s of shippable) {
    const item = byId.get(s.job_id);
    if (!item) {
      pending.push(s);
      continue;
    }
    if (item.status === "completed" && item.results?.rawUrl) {
      completed.push(s);
    } else if (item.status === "failed" || item.status === "error") {
      failed.push(s);
    } else {
      pending.push(s);
    }
  }

  console.log(`Shippable: ${shippable.length}, completed: ${completed.length}, pending: ${pending.length}, failed: ${failed.length}`);

  const entries: any[] = [];
  for (const s of completed) {
    const item = byId.get(s.job_id)!;
    const url = item.results!.rawUrl!;
    try {
      const entry = await processAsset(s, url);
      entries.push(entry);
    } catch (err) {
      console.error(`  ! ${s.slug}:`, err instanceof Error ? err.message : err);
      failed.push(s);
    }
  }

  if (pending.length > 0) {
    console.log("\nStill pending:", pending.map((p) => p.slug).join(", "));
  }
  if (failed.length > 0) {
    console.log("\nFailed:", failed.map((f) => f.slug).join(", "));
  }

  // Merge with existing manifest (preserve any entries not regenerated)
  let existing: any[] = [];
  try {
    existing = JSON.parse(await fs.readFile(MANIFEST_OUT, "utf-8"));
  } catch {
    // no existing manifest
  }
  const newSlugs = new Set(entries.map((e) => e.slug));
  const merged = [
    ...entries,
    ...existing.filter((e) => !newSlugs.has(e.slug)),
  ];
  await fs.writeFile(MANIFEST_OUT, JSON.stringify(merged, null, 2), "utf-8");
  console.log(`\nWrote ${entries.length} new entries (${merged.length} total) → ${path.relative(process.cwd(), MANIFEST_OUT)}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
