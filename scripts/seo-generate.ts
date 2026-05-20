#!/usr/bin/env tsx
/**
 * SEO content generator — picks the next pending item from the backlog
 * and scaffolds the corresponding file (MDX for blog-post, TSX for
 * location-page / vertical-page). Designed to run unattended via
 * `.github/workflows/seo-loop.yml` (cron daily).
 *
 * Usage:
 *   npm run seo:generate              # generate next item, mark as `generated`
 *   npm run seo:generate -- --dry     # show what would be generated, no write
 *   npm run seo:generate -- --id=X    # force a specific backlog id
 *
 * Workflow:
 *   1. Read content/seo-backlog.json
 *   2. Pick next pending item (highest priority, oldest first)
 *   3. Render the appropriate template
 *   4. Write the file (don't overwrite existing)
 *   5. Update the backlog entry status to `generated` + write publishedAt later
 *
 * The script intentionally produces DRAFT-quality scaffolds: a structured
 * outline, frontmatter, internal links, and the SEO essentials. Human
 * review enriches every section before publishing (toggling `draft: false`
 * in the MDX frontmatter).
 */

import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(__dirname, "..");
const BACKLOG_PATH = path.join(ROOT, "content", "seo-backlog.json");
const BLOG_DIR = path.join(ROOT, "content", "blog");
const RELAMPING_DIR = path.join(
  ROOT,
  "src",
  "app",
  "services",
  "electricite",
  "relamping",
);

interface BacklogItemBase {
  id: string;
  type: "blog-post" | "location-page" | "vertical-page";
  cluster: string;
  priority: number;
  status: "pending" | "generated" | "published";
  slug: string;
  title: string;
  primaryKeyword: string;
  secondaryKeywords?: string[];
  createdAt: string;
  publishedAt: string | null;
}

interface BlogPostItem extends BacklogItemBase {
  type: "blog-post";
  excerpt: string;
  category: string;
  tags: string[];
  cover?: string;
  wordTarget: number;
  outline?: string[];
  howTo?: {
    name?: string;
    totalTime?: string;
    steps: Array<{ name: string; text: string }>;
  } | null;
}

interface LocationPageItem extends BacklogItemBase {
  type: "location-page";
  city: string;
  postalCodes: string[];
}

interface VerticalPageItem extends BacklogItemBase {
  type: "vertical-page";
  vertical: string;
}

type BacklogItem = BlogPostItem | LocationPageItem | VerticalPageItem;

interface Backlog {
  version: number;
  lastReviewed: string;
  items: BacklogItem[];
}

// ─── CLI args ────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const isDry = args.includes("--dry");
const forcedId = args.find((a) => a.startsWith("--id="))?.split("=")[1];

// ─── Pick next item ──────────────────────────────────────────────────────
function readBacklog(): Backlog {
  const raw = fs.readFileSync(BACKLOG_PATH, "utf-8");
  return JSON.parse(raw) as Backlog;
}

function writeBacklog(b: Backlog) {
  fs.writeFileSync(BACKLOG_PATH, JSON.stringify(b, null, 2) + "\n", "utf-8");
}

function pickNext(b: Backlog): BacklogItem | null {
  if (forcedId) {
    const found = b.items.find((i) => i.id === forcedId);
    if (!found) throw new Error(`Item not found: ${forcedId}`);
    return found;
  }
  const pending = b.items
    .filter((i) => i.status === "pending")
    .sort((a, x) => x.priority - a.priority || a.createdAt.localeCompare(x.createdAt));
  return pending[0] ?? null;
}

// ─── Templates ───────────────────────────────────────────────────────────

function blogPostTemplate(item: BlogPostItem): string {
  const tags = (item.tags ?? []).map((t) => `"${t}"`).join(", ");
  const howToBlock = item.howTo
    ? `\nhowTo:\n  name: "${item.howTo.name ?? item.title}"\n${item.howTo.totalTime ? `  totalTime: "${item.howTo.totalTime}"\n` : ""}  steps:\n${item.howTo.steps
        .map((s) => `    - name: "${s.name.replace(/"/g, '\\"')}"\n      text: "${s.text.replace(/"/g, '\\"')}"`)
        .join("\n")}`
    : "";

  const outline = item.outline ?? [
    "Introduction — pourquoi ce sujet aujourd'hui",
    "Le contexte technique / réglementaire",
    "Notre méthode S Connect",
    "Cas concret chiffré",
    "Pièges à éviter",
    "FAQ",
  ];
  const sections = outline.map((h, i) => {
    const heading = `## ${i + 1}. ${h}`;
    const placeholder = `<!-- TODO[seo-generate]: ${item.wordTarget ? `~${Math.round(item.wordTarget / outline.length)} mots ici. ` : ""}Contenu unique, exemples chiffrés, sources, IIH (interne hyper-internal-link) vers la pillar /services/electricite/relamping. -->\n\nÀ rédiger.`;
    return `${heading}\n\n${placeholder}`;
  });

  return `---
title: "${item.title.replace(/"/g, '\\"')}"
excerpt: "${item.excerpt.replace(/"/g, '\\"')}"
date: "${new Date().toISOString().slice(0, 10)}"
author: "Mehdi Belkacem, fondateur S Connect"
category: "${item.category}"
tags: [${tags}]
${item.cover ? `cover: "${item.cover}"\n` : ""}draft: true${howToBlock}
---

> **Note (draft auto-généré le ${new Date().toISOString().slice(0, 10)})** — Cet article a été scaffolded par \`scripts/seo-generate.ts\` à partir de l'item backlog \`${item.id}\`. Avant publication : enrichir chaque section, ajouter sources, vérifier les chiffres, retirer ce bloc et basculer \`draft\` à \`false\`.

${sections.join("\n\n")}

## Pour aller plus loin

- [Notre service relamping LED en Île-de-France](/services/electricite/relamping)
- [Demander un audit éclairage gratuit](/demande-devis)
- [Auteur — Mehdi Belkacem, fondateur S Connect](/auteur/mehdi-belkacem)
`;
}

function locationPageTemplate(item: LocationPageItem): string {
  const city = item.city;
  const slug = item.slug;
  const postalCodes = item.postalCodes.join(", ");
  const secondary = (item.secondaryKeywords ?? []).map((k) => `"${k}"`).join(", ");

  return `import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Lightbulb,
  ChevronRight,
  Phone,
  MapPin,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";
import { NoiseOverlay } from "@/components/ui/ambient";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import {
  generateServiceSchema,
  injectSchema,
} from "@/lib/structured-data";
import BulbText from "@/components/ui/BulbText";

// Auto-generated from seo-backlog.json item "${item.id}" on ${new Date().toISOString().slice(0, 10)}.
// Review before going live: validate the local stats, swap the hero image
// if a city-specific one exists in /public/images/locations/.

export const metadata: Metadata = {
  title: "${item.title.replace(/"/g, '\\"')} | S Connect",
  description:
    "Spécialiste relamping LED à ${city} (${postalCodes}) : audit gratuit, étude personnalisée, installation, conformité NF EN 12464-1, accompagnement décret tertiaire. Devis sous 7 jours.",
  keywords: [
    "${item.primaryKeyword}",
    ${secondary},
  ],
  alternates: { canonical: "/services/electricite/relamping/${slug}" },
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sconnectfrance.fr";
const serviceSchema = generateServiceSchema(
  {
    name: "Relamping LED à ${city}",
    description:
      "Audit, étude et installation relamping LED pour bureaux, commerces, copropriétés et industriels à ${city} et alentours. Conformité NF EN 12464-1 et décret tertiaire (DEET) couverts.",
    provider: "S Connect",
    areaServed: ["${city}", "Île-de-France"],
    priceRange: "€€€",
  },
  siteUrl,
);

export default function Relamping${city.replace(/[^a-zA-Z]/g, "")}Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={injectSchema(serviceSchema)} />

      {/* Hero */}
      <section className="relative bg-dark-950 py-16 md:py-24 overflow-hidden">
        <Image
          src="/images/services/relamping-bureau.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-50"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-950 from-0% via-dark-950/75 via-50% to-dark-950/35 to-100%" />
        <NoiseOverlay opacity={0.04} />
        <div className="container-custom relative z-10">
          <div className="mb-6">
            <Breadcrumbs
              light
              items={[
                { label: "Services", href: "/services" },
                { label: "Électricité", href: "/services/electricite" },
                { label: "Relamping LED", href: "/services/electricite/relamping" },
                { label: "${city}" },
              ]}
            />
          </div>
          <div className="max-w-2xl">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-electric-500 rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-primary-500/30">
              <MapPin className="w-8 h-8 text-white" />
            </div>
            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-4 leading-tight [text-shadow:_0_2px_20px_rgba(0,0,0,0.6)]">
              Relamping LED à {"${city}"}
            </h1>
            <p className="text-xl md:text-2xl font-medium mb-6">
              <BulbText>Audit gratuit · ROI mesuré · Conforme NF EN 12464-1</BulbText>
            </p>
            <p className="text-lg text-white/90 leading-relaxed [text-shadow:_0_1px_8px_rgba(0,0,0,0.5)]">
              S Connect intervient sur tout ${city} et la couronne immédiate. Bureaux,
              copropriétés, commerces, industriels : nous mesurons avant de chiffrer,
              et la facture finale = le devis.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/demande-devis" className="btn-primary btn-lg shadow-xl shadow-primary-700/30">
                Audit gratuit
                <ChevronRight className="w-5 h-5" />
              </Link>
              <a href="tel:+33652820685" className="btn glass-panel text-white hover:bg-white/15 btn-lg">
                <Phone className="w-5 h-5" />
                06 52 82 06 85
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Pourquoi nous pour ${city} */}
      <section className="section-padding bg-surface">
        <div className="container-custom max-w-4xl">
          <SectionTitle
            badge="Pourquoi S Connect à ${city}"
            title="L'expertise éclairage locale, sans intermédiaire"
            subtitle="Basés à Clichy, nous intervenons sur ${city} en moins de 40 min. Notre équipe sait calibrer un éclairage pour chaque typologie de local de la ville."
          />
          <ul className="grid sm:grid-cols-2 gap-4">
            {[
              { title: "Audit gratuit sous 7 jours", desc: "Visite, mesures luxmètre étalonné, rapport chiffré avec ROI. Sans engagement." },
              { title: "Devis ferme = facture finale", desc: "Aucun supplément après diagnostic. Délais et coûts garantis par écrit." },
              { title: "Conformité NF EN 12464-1", desc: "Niveaux d'éclairement réglementaires par poste de travail vérifiés à la livraison." },
              { title: "Couverture décret tertiaire", desc: "Le relamping reste l'investissement n°1 pour atteindre les −40 % du DEET en 2030." },
            ].map((b) => (
              <li key={b.title} className="p-5 rounded-2xl bg-surface-elevated border border-border">
                <h3 className="font-display font-bold text-foreground mb-1 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary-500" />
                  {b.title}
                </h3>
                <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">{b.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Sub-clusters typologies */}
      <section className="section-padding bg-surface-muted">
        <div className="container-custom max-w-5xl">
          <SectionTitle
            badge="Selon votre typologie"
            title="Quelle solution pour votre local à ${city} ?"
          />
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { name: "Bureau & tertiaire", href: "/services/electricite/relamping/bureau-tertiaire" },
              { name: "Commerce & restaurant", href: "/services/electricite/relamping/commerce-restaurant" },
              { name: "Copropriété & parking", href: "/services/electricite/relamping/copropriete-parking" },
              { name: "Industriel & entrepôt", href: "/services/electricite/relamping/industriel-entrepot" },
            ].map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className="p-6 rounded-2xl bg-surface border border-border hover:border-primary-300 dark:hover:border-primary-500 transition-colors group"
              >
                <span className="font-display font-bold text-lg text-foreground group-hover:text-primary-600 dark:group-hover:text-primary-300 inline-flex items-center gap-2">
                  {t.name}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Cross-link pillar */}
      <section className="section-padding bg-surface">
        <div className="container-custom max-w-3xl text-center">
          <Lightbulb className="w-12 h-12 text-primary-500 mx-auto mb-4" />
          <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-3">
            Notre méthode relamping complète
          </h2>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
            Audit, calcul ROI, gestion DALI, conformité décret tertiaire : tout est
            détaillé sur notre page pilier dédiée.
          </p>
          <Link href="/services/electricite/relamping" className="btn-outline">
            Voir la page pilier Relamping LED
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 bg-gradient-to-r from-primary-700 via-primary-600 to-electric-600 overflow-hidden">
        <NoiseOverlay opacity={0.05} />
        <div className="container-custom relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-white">
            <h2 className="font-display font-bold text-2xl md:text-3xl mb-2">
              Auditons votre éclairage à {"${city}"} gratuitement
            </h2>
            <p className="text-primary-100 text-lg">
              Rapport chiffré + ROI sous 7 jours. Sans engagement.
            </p>
          </div>
          <div className="flex gap-4">
            <Link href="/demande-devis" className="btn-white btn-lg">
              Demander un audit
              <ChevronRight className="w-5 h-5" />
            </Link>
            <a href="tel:+33652820685" className="btn bg-transparent text-white border-2 border-white hover:bg-white hover:text-primary-700 btn-lg transition-colors">
              <Phone className="w-5 h-5" />
              06 52 82 06 85
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
`;
}

// ─── Write file with safety ──────────────────────────────────────────────
function writeOnce(p: string, content: string) {
  if (fs.existsSync(p)) {
    console.log(`⚠  File already exists, skipping write: ${p}`);
    return false;
  }
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, content, "utf-8");
  console.log(`✓ wrote ${path.relative(ROOT, p)}`);
  return true;
}

// ─── Main ────────────────────────────────────────────────────────────────
function main() {
  const backlog = readBacklog();
  const item = pickNext(backlog);

  if (!item) {
    console.log("✓ Backlog empty (no pending items). Nothing to generate.");
    return;
  }

  console.log(`→ Picked: [${item.priority}] ${item.id} (${item.type}) — ${item.title}`);

  let writePath: string;
  let content: string;

  switch (item.type) {
    case "blog-post":
      writePath = path.join(BLOG_DIR, `${item.slug}.mdx`);
      content = blogPostTemplate(item);
      break;
    case "location-page":
      writePath = path.join(RELAMPING_DIR, item.slug, "page.tsx");
      content = locationPageTemplate(item);
      break;
    case "vertical-page":
      // Vertical pages share the location template (city → vertical context).
      // A bespoke vertical template can land in a future iteration.
      writePath = path.join(RELAMPING_DIR, "verticales", item.slug, "page.tsx");
      content = locationPageTemplate({
        ...item,
        city: (item as VerticalPageItem).vertical,
        postalCodes: ["IDF"],
      } as unknown as LocationPageItem);
      break;
  }

  if (isDry) {
    console.log("--- DRY RUN — content preview (first 400 chars) ---");
    console.log(content.slice(0, 400) + "…");
    return;
  }

  const wrote = writeOnce(writePath, content);
  if (!wrote) return;

  // Update backlog status
  const idx = backlog.items.findIndex((i) => i.id === item.id);
  if (idx >= 0) {
    backlog.items[idx] = { ...backlog.items[idx], status: "generated" };
    backlog.lastReviewed = new Date().toISOString().slice(0, 10);
    writeBacklog(backlog);
    console.log(`✓ backlog updated: ${item.id} → generated`);
  }
}

try {
  main();
} catch (err) {
  console.error("✗ seo-generate failed:", err);
  process.exit(1);
}
