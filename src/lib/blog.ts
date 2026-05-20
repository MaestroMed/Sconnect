import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { isPersistenceAvailable, listPosts, getPost as getDbPost } from "./data-adapter";

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");

export interface PostFrontmatter {
  title: string;
  excerpt: string;
  date: string;
  author: string;
  cover?: string;
  tags?: string[];
  category?: string;
  draft?: boolean;
  /** Optional how-to metadata — when present, the article page emits an
   *  additional HowTo JSON-LD schema (Google rich results for "how to" /
   *  procedural content). */
  howTo?: {
    /** Human-readable name (defaults to title if omitted). */
    name?: string;
    /** Estimated total duration in ISO 8601 (e.g. "PT2H" for 2 hours). */
    totalTime?: string;
    steps: Array<{
      name: string;
      text: string;
    }>;
  };
}

export interface Post {
  slug: string;
  frontmatter: PostFrontmatter;
  content: string;
  readingTime: { text: string; minutes: number };
  updatedAt: string;
}

function ensureDir(): boolean {
  try {
    return fs.existsSync(CONTENT_DIR);
  } catch {
    return false;
  }
}

function buildReadingTime(content: string) {
  const rt = readingTime(content);
  return { text: rt.text.replace("min read", "min de lecture"), minutes: rt.minutes };
}

function fsGetAllSlugs(): string[] {
  if (!ensureDir()) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

function fsGetPostBySlug(slug: string): Post | null {
  if (!ensureDir()) return null;
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const stat = fs.statSync(filePath);

  return {
    slug,
    frontmatter: data as PostFrontmatter,
    content,
    readingTime: buildReadingTime(content),
    updatedAt: stat.mtime.toISOString(),
  };
}

function dbRowToPost(row: {
  slug: string;
  title: string;
  excerpt: string | null;
  cover_url: string | null;
  body_mdx: string;
  tags: string[];
  author: string | null;
  published: boolean;
  published_at: string | null;
  updated_at: string;
}): Post {
  return {
    slug: row.slug,
    frontmatter: {
      title: row.title,
      excerpt: row.excerpt ?? "",
      date: row.published_at ?? row.updated_at,
      author: row.author ?? "Équipe S'Connect",
      cover: row.cover_url ?? undefined,
      tags: row.tags ?? [],
      draft: !row.published,
    },
    content: row.body_mdx,
    readingTime: buildReadingTime(row.body_mdx),
    updatedAt: row.updated_at,
  };
}

export async function getAllPostSlugs(): Promise<string[]> {
  if (isPersistenceAvailable()) {
    const rows = await listPosts({ publishedOnly: true });
    return rows.map((r) => r.slug);
  }
  return fsGetAllSlugs();
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  if (isPersistenceAvailable()) {
    const row = await getDbPost(slug);
    if (row) return dbRowToPost(row);
  }
  return fsGetPostBySlug(slug);
}

export async function getAllPosts(): Promise<Post[]> {
  if (isPersistenceAvailable()) {
    const rows = await listPosts({ publishedOnly: true });
    return rows
      .map(dbRowToPost)
      .filter((p) => !p.frontmatter.draft)
      .sort(
        (a, b) =>
          new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime(),
      );
  }
  const slugs = fsGetAllSlugs();
  return slugs
    .map((slug) => fsGetPostBySlug(slug))
    .filter((p): p is Post => p !== null && !p.frontmatter.draft)
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime(),
    );
}

export async function getRelatedPosts(slug: string, limit = 3): Promise<Post[]> {
  const current = await getPostBySlug(slug);
  if (!current) return [];
  const tags = new Set(current.frontmatter.tags ?? []);
  const all = await getAllPosts();
  return all
    .filter((p) => p.slug !== slug)
    .map((p) => ({
      post: p,
      score:
        (p.frontmatter.tags ?? []).filter((t) => tags.has(t)).length +
        (p.frontmatter.category === current.frontmatter.category ? 1 : 0),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ post }) => post);
}

export async function getAllTags(): Promise<string[]> {
  const tags = new Set<string>();
  const posts = await getAllPosts();
  for (const post of posts) {
    for (const tag of post.frontmatter.tags ?? []) {
      tags.add(tag);
    }
  }
  return Array.from(tags).sort((a, b) => a.localeCompare(b, "fr"));
}

export async function getPostsByTag(tag: string): Promise<Post[]> {
  const all = await getAllPosts();
  return all.filter((p) => (p.frontmatter.tags ?? []).includes(tag));
}

export function formatDate(isoDate: string): string {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(isoDate));
}
