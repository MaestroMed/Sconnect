import Link from "next/link";
import { Plus, Newspaper, AlertCircle } from "lucide-react";
import { listPosts, isPersistenceAvailable } from "@/lib/data-adapter";
import { getAllPosts as getFsPosts } from "@/lib/blog";
import PostsTable from "./PostsTable";

export const dynamic = "force-dynamic";

export default async function AdminActualitesPage() {
  const dbConfigured = isPersistenceAvailable();
  const dbRows = dbConfigured ? await listPosts() : [];

  // Fallback : afficher aussi les MDX du filesystem si la DB est vide ou non configurée
  const fsRows = !dbConfigured || dbRows.length === 0 ? await getFsPosts() : [];

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-primary-600 dark:text-primary-300 uppercase tracking-wide mb-1">
            Contenu
          </p>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground flex items-center gap-3">
            <Newspaper className="w-7 h-7 text-primary-500" />
            Actualités
          </h1>
          <p className="text-foreground-muted mt-1">
            Articles de blog : conseils, normes, retours d&apos;expérience.
          </p>
        </div>
        {dbConfigured && (
          <Link href="/admin/actualites/nouveau" className="btn-primary btn-sm">
            <Plus className="w-4 h-4" />
            Nouvel article
          </Link>
        )}
      </header>

      {!dbConfigured && (
        <div className="rounded-xl border border-amber-300 bg-amber-50 dark:border-amber-700 dark:bg-amber-950 p-6 flex gap-3">
          <AlertCircle className="w-6 h-6 text-amber-600 shrink-0" />
          <div className="text-sm">
            <p className="font-semibold text-amber-900 dark:text-amber-100">
              Édition désactivée — Supabase non configuré
            </p>
            <p className="text-amber-800 dark:text-amber-200 mt-1">
              Les articles sont actuellement servis depuis <code>content/blog/*.mdx</code>.
              Pour activer l&apos;éditeur, configurez Supabase puis lancez{" "}
              <code>npm run db:import-mdx</code>.
            </p>
          </div>
        </div>
      )}

      <PostsTable
        rows={dbRows.map((p) => ({
          slug: p.slug,
          title: p.title,
          published: p.published,
          published_at: p.published_at,
          tags: p.tags ?? [],
          source: "db" as const,
        }))}
        fallbackRows={fsRows.map((p) => ({
          slug: p.slug,
          title: p.frontmatter.title,
          published: !p.frontmatter.draft,
          published_at: p.frontmatter.date,
          tags: p.frontmatter.tags ?? [],
          source: "fs" as const,
        }))}
        editable={dbConfigured}
      />
    </div>
  );
}
