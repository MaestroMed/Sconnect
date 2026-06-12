import { describe, it, expect } from "vitest";
import { getAllPosts, getPostBySlug } from "./blog";

/**
 * QUALITY-GATE DU BLOG — le filet de sécurité du moteur SEO.
 *
 * Contexte : la prod a servi 0 article pendant des semaines parce que la
 * couche données basculait silencieusement sur une base Supabase morte.
 * Ces tests garantissent les invariants du pipeline fichier (la source de
 * vérité) : les drafts ne sortent JAMAIS, le corpus publié reste complet,
 * et chaque article a le frontmatter minimal qu'attendent les pages,
 * le sitemap et le flux RSS.
 */

describe("blog quality-gate (source filesystem)", () => {
  it("ne publie JAMAIS un article draft", async () => {
    const posts = await getAllPosts();
    const drafts = posts.filter((p) => p.frontmatter.draft);
    expect(drafts.map((p) => p.slug)).toEqual([]);
  });

  it("sert le corpus complet (>= 50 articles publiés)", async () => {
    // Si ce test casse à la baisse, le pipeline de contenu est cassé
    // (régression type « 0 article en prod »), pas une simple variation.
    const posts = await getAllPosts();
    expect(posts.length).toBeGreaterThanOrEqual(50);
  });

  it("chaque article publié a un frontmatter exploitable (title, excerpt, date, slug unique)", async () => {
    const posts = await getAllPosts();
    const slugs = new Set<string>();
    for (const p of posts) {
      expect(p.frontmatter.title, `${p.slug}: title`).toBeTruthy();
      expect(p.frontmatter.excerpt, `${p.slug}: excerpt`).toBeTruthy();
      expect(
        Number.isNaN(new Date(p.frontmatter.date).getTime()),
        `${p.slug}: date invalide (${p.frontmatter.date})`,
      ).toBe(false);
      expect(slugs.has(p.slug), `${p.slug}: slug dupliqué`).toBe(false);
      slugs.add(p.slug);
    }
  });

  it("getPostBySlug retrouve un article publié et son contenu", async () => {
    const posts = await getAllPosts();
    const first = posts[0];
    const fetched = await getPostBySlug(first.slug);
    expect(fetched).not.toBeNull();
    expect(fetched!.content.length).toBeGreaterThan(200);
  });

  it("getPostBySlug retourne null pour un slug inexistant", async () => {
    const fetched = await getPostBySlug("slug-qui-n-existe-pas-du-tout");
    expect(fetched).toBeNull();
  });

  it("aucun article publié ne contient de lien interne /blog/ (ancien format cassé)", async () => {
    const posts = await getAllPosts();
    const offenders = posts.filter((p) => p.content.includes("](/blog/"));
    expect(offenders.map((p) => p.slug)).toEqual([]);
  });
});
