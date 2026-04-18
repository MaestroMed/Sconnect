#!/usr/bin/env node
/**
 * One-shot batch replacer for the dark-mode token migration.
 * Usage: node scripts/tokenize-colors.mjs [paths...]
 * Replaces hardcoded Tailwind colors with semantic tokens.
 * Idempotent — running twice is a no-op. Safe because it only
 * touches exact class-token strings, never substrings.
 */
import { readFileSync, writeFileSync, statSync } from "node:fs";
import { readdirSync } from "node:fs";
import { join } from "node:path";

const REPLACEMENTS = [
  // Text colors
  [/\btext-dark-900\b/g, "text-foreground"],
  [/\btext-dark-800\b/g, "text-foreground"],
  [/\btext-dark-700\b/g, "text-foreground"],
  [/\btext-dark-600\b/g, "text-foreground-muted"],
  [/\btext-dark-500\b/g, "text-foreground-muted"],
  [/\btext-dark-400\b/g, "text-foreground-muted/80"],
  // Background colors (but NOT bg-white/X opacity variants)
  [/\bbg-white(?=[ '"\s>{}`])/g, "bg-surface"],
  [/\bbg-dark-50\b/g, "bg-surface-muted"],
  [/\bbg-dark-100\b/g, "bg-surface-muted"],
  // Borders
  [/\bborder-dark-100\b/g, "border-border"],
  [/\bborder-dark-200\b/g, "border-border"],
  // Dividers
  [/\bdivide-dark-100\b/g, "divide-border"],
];

function walk(path, out = []) {
  if (statSync(path).isDirectory()) {
    for (const entry of readdirSync(path)) {
      walk(join(path, entry), out);
    }
  } else if (path.endsWith(".tsx") || path.endsWith(".ts")) {
    out.push(path);
  }
  return out;
}

const targets = (process.argv.slice(2).length > 0 ? process.argv.slice(2) : ["src/app/services"])
  .flatMap((t) => walk(t));

let changedCount = 0;
for (const file of targets) {
  const original = readFileSync(file, "utf8");
  let next = original;
  for (const [re, repl] of REPLACEMENTS) {
    next = next.replace(re, repl);
  }
  if (next !== original) {
    writeFileSync(file, next);
    changedCount += 1;
    console.log(`✔ ${file}`);
  }
}
console.log(`\n${changedCount} file(s) updated.`);
