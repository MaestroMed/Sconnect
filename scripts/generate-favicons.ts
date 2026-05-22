#!/usr/bin/env tsx
/**
 * Generate the full favicon + app icon set from the SVG sources in /public.
 *
 * Inputs:
 *   /public/icon.svg          — main brand mark with rounded square
 *   /public/icon-maskable.svg — full-bleed version for PWA maskable
 *
 * Outputs (Next.js App Router conventions + PWA):
 *   /src/app/icon.png             — 32x32 favicon (auto-served at /icon)
 *   /src/app/apple-icon.png       — 180x180 Apple touch icon
 *   /public/favicon.ico           — 16x16 + 32x32 PNG-in-ICO container
 *   /public/icon-192.png          — PWA 192x192 (any purpose)
 *   /public/icon-512.png          — PWA 512x512 (any purpose)
 *   /public/icon-maskable-192.png — PWA maskable 192x192
 *   /public/icon-maskable-512.png — PWA maskable 512x512
 *
 * Why this script: the SVG sources can be edited freely, and a single
 * `npm run favicon:generate` regenerates the whole set deterministically.
 * No external SaaS, no manual Photoshop export.
 */

import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(__dirname, "..");
const PUBLIC_DIR = path.join(ROOT, "public");
const APP_DIR = path.join(ROOT, "src", "app");

const ICON_SVG = fs.readFileSync(path.join(PUBLIC_DIR, "icon.svg"));
const ICON_MASKABLE_SVG = fs.readFileSync(path.join(PUBLIC_DIR, "icon-maskable.svg"));

async function emit(label: string, buffer: Buffer, outPath: string) {
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, buffer);
  const size = fs.statSync(outPath).size;
  console.log(`  ✓ ${label.padEnd(30)} ${(size / 1024).toFixed(1)} KB  → ${path.relative(ROOT, outPath)}`);
}

async function rasterise(svg: Buffer, size: number): Promise<Buffer> {
  return sharp(svg, { density: 300 })
    .resize(size, size, { kernel: "lanczos3", fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ compressionLevel: 9, palette: false })
    .toBuffer();
}

async function buildFaviconIco(): Promise<Buffer> {
  // Sharp doesn't natively output .ico, but a "PNG-in-ICO" container is just
  // a small header + N PNG payloads concatenated. ICO directory entries point
  // to the PNG data; modern browsers accept PNG-inside-ICO since IE11+.
  const sizes = [16, 32, 48];
  const pngs = await Promise.all(sizes.map((s) => rasterise(ICON_SVG, s)));

  // ICONDIR header (6 bytes) + N × ICONDIRENTRY (16 bytes each)
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type = 1 (ICO)
  header.writeUInt16LE(sizes.length, 4); // image count

  const entries = Buffer.alloc(16 * sizes.length);
  let offset = 6 + 16 * sizes.length;
  pngs.forEach((png, i) => {
    const e = entries.subarray(i * 16, (i + 1) * 16);
    e.writeUInt8(sizes[i] === 256 ? 0 : sizes[i], 0); // width (0 = 256)
    e.writeUInt8(sizes[i] === 256 ? 0 : sizes[i], 1); // height
    e.writeUInt8(0, 2); // color palette
    e.writeUInt8(0, 3); // reserved
    e.writeUInt16LE(1, 4); // color planes
    e.writeUInt16LE(32, 6); // bits per pixel
    e.writeUInt32LE(png.length, 8); // image size
    e.writeUInt32LE(offset, 12); // offset to image data
    offset += png.length;
  });

  return Buffer.concat([header, entries, ...pngs]);
}

async function main() {
  console.log("\n── Generating favicons + PWA icons ──\n");

  // App Router conventions (auto-served as <link rel="icon"> + apple-touch)
  await emit("icon (32×32)", await rasterise(ICON_SVG, 32), path.join(APP_DIR, "icon.png"));
  await emit("apple-icon (180×180)", await rasterise(ICON_SVG, 180), path.join(APP_DIR, "apple-icon.png"));

  // PWA icons (referenced by /public/manifest.json)
  await emit("icon-192 (any)", await rasterise(ICON_SVG, 192), path.join(PUBLIC_DIR, "icon-192.png"));
  await emit("icon-512 (any)", await rasterise(ICON_SVG, 512), path.join(PUBLIC_DIR, "icon-512.png"));
  await emit(
    "icon-maskable-192",
    await rasterise(ICON_MASKABLE_SVG, 192),
    path.join(PUBLIC_DIR, "icon-maskable-192.png"),
  );
  await emit(
    "icon-maskable-512",
    await rasterise(ICON_MASKABLE_SVG, 512),
    path.join(PUBLIC_DIR, "icon-maskable-512.png"),
  );

  // favicon.ico (legacy fallback, multi-resolution container)
  await emit("favicon.ico (16/32/48)", await buildFaviconIco(), path.join(PUBLIC_DIR, "favicon.ico"));

  console.log("\n✓ Done. The SVG sources stay editable; rerun this script after any edit.\n");
}

main().catch((err) => {
  console.error("✗ Generation failed:", err);
  process.exit(1);
});
