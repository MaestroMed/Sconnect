#!/usr/bin/env tsx
/**
 * Compose the Open Graph / Twitter card image (1200×630) from a Higgsfield
 * cinematic backdrop + brand overlay (title, tagline, phone, logo glyph).
 *
 * Inputs:
 *   /scripts/og-base.png   — Higgsfield cinematic 16:9 raw (run `npm run og:fetch` first
 *                            or drop your own 1344×768+ JPG/PNG here)
 *   /public/icon.svg       — brand glyph for the corner badge
 *
 * Output:
 *   /public/og-image.jpg   — final 1200×630 OG card (referenced in layout.tsx)
 *   /src/app/opengraph-image.jpg — Next 15 App Router convention
 *   /src/app/twitter-image.jpg   — Twitter card (same composition)
 *
 * Why a static composite (not <ImageResponse>):
 *   - 1× compute at build, not per-request
 *   - Predictable bytes for crawlers (no font-loading edge cases)
 *   - The branding is fixed across the site, no per-page customisation needed
 */

import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(__dirname, "..");
const PUBLIC_DIR = path.join(ROOT, "public");
const APP_DIR = path.join(ROOT, "src", "app");
const BASE_PATH = path.join(ROOT, "scripts", "og-base.png");

const OG_WIDTH = 1200;
const OG_HEIGHT = 630;

// SVG overlay generated programmatically — text + gradient + logo glyph.
// Designed for the OG card to read at 240px wide (typical Slack/Twitter preview).
function buildOverlaySvg(): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${OG_WIDTH}" height="${OG_HEIGHT}" viewBox="0 0 ${OG_WIDTH} ${OG_HEIGHT}">
  <defs>
    <!-- left-to-right dark gradient for text readability -->
    <linearGradient id="darken" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#000814" stop-opacity="0.92"/>
      <stop offset="50%" stop-color="#001528" stop-opacity="0.70"/>
      <stop offset="100%" stop-color="#001a30" stop-opacity="0.30"/>
    </linearGradient>
    <!-- bottom gradient for footer band -->
    <linearGradient id="darkenBottom" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#000814" stop-opacity="0"/>
      <stop offset="100%" stop-color="#000814" stop-opacity="0.85"/>
    </linearGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#fdcb28"/>
      <stop offset="100%" stop-color="#fee47a"/>
    </linearGradient>
    <radialGradient id="bulbGlow" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0%" stop-color="#fee47a" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="#fdcb28" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <!-- darken left half for text legibility on any backdrop -->
  <rect x="0" y="0" width="${OG_WIDTH}" height="${OG_HEIGHT}" fill="url(#darken)"/>
  <rect x="0" y="${OG_HEIGHT - 140}" width="${OG_WIDTH}" height="140" fill="url(#darkenBottom)"/>

  <!-- brand glyph top-left (rounded square + S + bulb accent) -->
  <g transform="translate(64, 56)">
    <rect x="0" y="0" width="76" height="76" rx="18" fill="#0a4a78"/>
    <circle cx="54" cy="22" r="14" fill="url(#bulbGlow)"/>
    <path d="M48 23c-3-2.6-6.6-4-10.6-4-6.4 0-11.4 3.8-11.4 10 0 5.4 3.6 8 9.2 10l4.5 1.4c3 1 4.5 1.9 4.5 3.6 0 1.9-1.9 3-4.7 3-3.5 0-6.8-1.4-9.9-4.2l-4 5.9c3.8 3.3 8.5 5.2 13.7 5.2 7.1 0 12.3-3.8 12.3-10.2 0-5.6-3.8-8.3-9.7-10.2l-4.3-1.4c-2.6-0.9-3.8-1.6-3.8-3 0-1.7 1.6-2.8 4.2-2.8 2.8 0 5.4 0.9 7.8 2.8z"
          transform="scale(1.08) translate(-3, -2)" fill="#ffffff"/>
    <circle cx="54" cy="22" r="6" fill="#fdcb28"/>
    <circle cx="54" cy="22" r="2.2" fill="#fef3a8"/>
  </g>

  <!-- brand wordmark next to glyph -->
  <text x="160" y="106" font-family="'Outfit', 'Segoe UI', sans-serif" font-size="36" font-weight="800"
        letter-spacing="2" fill="#ffffff">SCONNECT</text>
  <text x="160" y="138" font-family="'Outfit', 'Segoe UI', sans-serif" font-size="17" font-weight="500"
        letter-spacing="1.5" fill="#89a5b2">Île-de-France · depuis 2014</text>

  <!-- main heading -->
  <text x="64" y="290" font-family="'Outfit', 'Segoe UI', sans-serif" font-size="62" font-weight="800"
        fill="#ffffff" letter-spacing="-0.5">Relamping LED IDF.</text>
  <text x="64" y="358" font-family="'Outfit', 'Segoe UI', sans-serif" font-size="62" font-weight="800"
        fill="url(#accent)" letter-spacing="-0.5">L'expertise qui dure.</text>

  <!-- subheading -->
  <text x="64" y="412" font-family="'Outfit', 'Segoe UI', sans-serif" font-size="24" font-weight="500"
        fill="#d6e3eb">Audit gratuit · Devis ferme = facture finale</text>
  <text x="64" y="448" font-family="'Outfit', 'Segoe UI', sans-serif" font-size="24" font-weight="500"
        fill="#d6e3eb">Qualifelec · RGE · IRVE niveau 2 · Décennale</text>

  <!-- bottom bar with phone + CTA -->
  <text x="64" y="560" font-family="'Outfit', 'Segoe UI', sans-serif" font-size="22" font-weight="600"
        fill="#fdcb28" letter-spacing="0.5">06 52 82 06 85</text>
  <text x="240" y="560" font-family="'Outfit', 'Segoe UI', sans-serif" font-size="20" font-weight="500"
        fill="#89a5b2">· 24/7 urgence Paris + 92 + 93</text>

  <text x="${OG_WIDTH - 64}" y="560" text-anchor="end" font-family="'Outfit', 'Segoe UI', sans-serif"
        font-size="20" font-weight="600" fill="#ffffff">sconnectfrance.fr</text>
</svg>`;
}

async function main() {
  console.log("\n── Generating OG image (1200×630) ──\n");

  if (!fs.existsSync(BASE_PATH)) {
    console.error(`✗ Missing base image: ${BASE_PATH}`);
    console.error(`  Download the Higgsfield 16:9 cinematic to that path first.`);
    process.exit(1);
  }

  // Load base, resize to OG canvas (cover crop) then composite the overlay
  const baseBuffer = await sharp(BASE_PATH)
    .resize(OG_WIDTH, OG_HEIGHT, { fit: "cover", position: "centre" })
    .toBuffer();

  const overlayBuffer = Buffer.from(buildOverlaySvg(), "utf-8");

  const finalBuffer = await sharp(baseBuffer)
    .composite([{ input: overlayBuffer, top: 0, left: 0 }])
    .jpeg({ quality: 86, progressive: true, mozjpeg: true })
    .toBuffer();

  // Emit to all three locations (legacy /public + Next 15 conventions)
  const outputs = [
    path.join(PUBLIC_DIR, "og-image.jpg"),
    path.join(APP_DIR, "opengraph-image.jpg"),
    path.join(APP_DIR, "twitter-image.jpg"),
  ];

  for (const outPath of outputs) {
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, finalBuffer);
    const size = fs.statSync(outPath).size;
    console.log(`  ✓ ${(size / 1024).toFixed(1).padStart(6)} KB  → ${path.relative(ROOT, outPath)}`);
  }

  console.log(`\n✓ Done. ${finalBuffer.length / 1024} KB total.\n`);
}

main().catch((err) => {
  console.error("✗ Generation failed:", err);
  process.exit(1);
});
