import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { isPersistenceAvailable } from "@/lib/data-adapter";
import { redirect } from "next/navigation";
import PostEditor from "../PostEditor";

export const dynamic = "force-dynamic";

export default function NewPostPage() {
  if (!isPersistenceAvailable()) redirect("/admin/actualites");

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
          Nouvel article
        </h1>
        <p className="text-foreground-muted mt-1 text-sm">
          Rédigez un article pour le blog. Vous pourrez l&apos;enregistrer en brouillon.
        </p>
      </header>

      <PostEditor
        mode="create"
        initial={{
          slug: "",
          title: "",
          excerpt: "",
          cover_url: "",
          body_mdx: "",
          tags: [],
          author: "Équipe S'Connect",
          published: false,
          published_at: null,
        }}
      />
    </div>
  );
}
