import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getPost, isPersistenceAvailable } from "@/lib/data-adapter";
import PostEditor from "../PostEditor";

export const dynamic = "force-dynamic";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  if (!isPersistenceAvailable()) redirect("/admin/actualites");

  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/admin/actualites"
          className="inline-flex items-center gap-1 text-sm text-foreground-muted hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour aux articles
        </Link>
      </div>
      <header>
        <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">
          Éditer l&apos;article
        </h1>
        <p className="text-foreground-muted mt-1 text-sm">
          {post.published ? "Publié" : "Brouillon"} —{" "}
          {new Date(post.updated_at).toLocaleDateString("fr-FR")}
        </p>
      </header>

      <PostEditor
        mode="edit"
        initial={{
          slug: post.slug,
          title: post.title,
          excerpt: post.excerpt ?? "",
          cover_url: post.cover_url ?? "",
          body_mdx: post.body_mdx,
          tags: post.tags ?? [],
          author: post.author ?? "Équipe S'Connect",
          published: post.published,
          published_at: post.published_at,
        }}
      />
    </div>
  );
}
