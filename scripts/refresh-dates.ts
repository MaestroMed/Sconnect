#!/usr/bin/env tsx
/**
 * Refresh dateModified on published MDX articles older than N days.
 * Google's freshness signal weighs `dateModified` for ranking on
 * time-sensitive queries. Without re-rendering content, bumping
 * the article date lets us signal "this is still current" to crawlers.
 *
 * The script does NOT touch articles already updated within the
 * last `RECENT_DAYS` days — no point churning fresh ones.
 *
 * It also NEVER touches drafts (`draft: true`) since those aren't
 * indexed.
 *
 * Usage:
 *   npm run seo:refresh-dates           # bump posts older than 90 days
 *   npm run seo:refresh-dates -- --dry  # show what would change
 *   npm run seo:refresh-dates -- --days=60
 */

import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(__dirname, "..");
const BLOG_DIR = path.join(ROOT, "content", "blog");

const args = process.argv.slice(2);
const isDry = args.includes("--dry");
const daysArg = args.find((a) => a.startsWith("--days="));
const RECENT_DAYS = daysArg ? Number(daysArg.split("=")[1]) : 90;

const cutoff = new Date();
cutoff.setDate(cutoff.getDate() - RECENT_DAYS);

const today = new Date().toISOString().slice(0, 10);

interface RefreshReport {
  refreshed: string[];
  skippedRecent: string[];
  skippedDrafts: string[];
}

function refresh(): RefreshReport {
  const report: RefreshReport = {
    refreshed: [],
    skippedRecent: [],
    skippedDrafts: [],
  };

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));
  for (const f of files) {
    const fullPath = path.join(BLOG_DIR, f);
    const raw = fs.readFileSync(fullPath, "utf-8");
    // Skip drafts
    if (/^draft:\s*true/m.test(raw)) {
      report.skippedDrafts.push(f);
      continue;
    }
    // Find the date frontmatter (`date: "YYYY-MM-DD"`)
    const dateMatch = raw.match(/^date:\s*"(\d{4}-\d{2}-\d{2})"/m);
    if (!dateMatch) continue;
    const articleDate = new Date(dateMatch[1]);
    if (articleDate > cutoff) {
      report.skippedRecent.push(f);
      continue;
    }
    // Bump the date to today
    const newRaw = raw.replace(/^date:\s*"\d{4}-\d{2}-\d{2}"/m, `date: "${today}"`);
    if (!isDry) {
      fs.writeFileSync(fullPath, newRaw, "utf-8");
      const now = new Date();
      fs.utimesSync(fullPath, now, now);
    }
    report.refreshed.push(f);
  }

  return report;
}

const report = refresh();
console.log(`\n── Refresh dateModified (${isDry ? "DRY RUN" : "WRITE"}) ──`);
console.log(`Cutoff: posts older than ${RECENT_DAYS} days bumped to ${today}\n`);
console.log(`✓ Refreshed (${report.refreshed.length}):`);
report.refreshed.forEach((f) => console.log(`    ${f}`));
console.log(`\n– Skipped: already recent (${report.skippedRecent.length}):`);
report.skippedRecent.forEach((f) => console.log(`    ${f}`));
console.log(`\n– Skipped: drafts (${report.skippedDrafts.length}):`);
report.skippedDrafts.forEach((f) => console.log(`    ${f}`));
console.log("");
