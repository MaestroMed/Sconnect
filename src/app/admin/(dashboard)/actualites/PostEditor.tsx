"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Save, Trash2, Eye, X } from "lucide-react";
import RichTextEditor from "@/components/admin/RichTextEditor";

export interface PostFormValues {
  slug?: string;
  title: string;
  excerpt: string;
  cover_url: string;
  body_mdx: string;
  tags: string[];
  author: string;
  published: boolean;
  published_at: string | null;
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export default function PostEditor({
  initial,
  mode,
}: {
  initial: PostFormValues;
  mode: "create" | "edit";
}) {
  const router = useRouter();
  const [values, setValues] = useState<PostFormValues>(initial);
  const [tagInput, setTagInput] = useState("");
  const [saving, setSaving] = useState(false);

  const update = <K extends keyof PostFormValues>(key: K, value: PostFormValues[K]) =>
    setValues((prev) => ({ ...prev, [key]: value }));

  const addTag = () => {
    const t = tagInput.trim();
    if (!t || values.tags.includes(t)) {
      setTagInput("");
      return;
    }
    update("tags", [...values.tags, t]);
    setTagInput("");
  };

  const removeTag = (tag: string) =>
    update(
      "tags",
      values.tags.filter((t) => t !== tag),
    );

  const save = async (publish?: boolean) => {
    if (!values.title.trim()) {
      toast.error("Titre requis");
      return;
    }
    if (!values.body_mdx.trim()) {
      toast.error("Contenu requis");
      return;
    }
    setSaving(true);
    try {
      const willPublish = publish ?? values.published;
      const payload = {
        ...values,
        slug: values.slug || slugify(values.title),
        published: willPublish,
        published_at: willPublish
          ? values.published_at ?? new Date().toISOString()
          : null,
      };
      const url =
        mode === "create" ? "/api/admin/posts" : `/api/admin/posts/${values.slug}`;
      const method = mode === "create" ? "POST" : "PATCH";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("save failed");
      const data = await res.json();
      toast.success(willPublish ? "Article publié" : "Brouillon enregistré");
      if (mode === "create") {
        router.push(`/admin/actualites/${data.slug}`);
      } else {
        router.refresh();
      }
    } catch {
      toast.error("Échec de l'enregistrement");
    } finally {
      setSaving(false);
    }
  };

  const remove = async () => {
    if (mode !== "edit" || !values.slug) return;
    if (!window.confirm("Supprimer définitivement cet article ?")) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/posts/${values.slug}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      toast.success("Article supprimé");
      router.push("/admin/actualites");
    } catch {
      toast.error("Échec de la suppression");
      setSaving(false);
    }
  };

  return (
    <div className="grid lg:grid-cols-[1fr_320px] gap-6">
      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="text-xs font-semibold uppercase tracking-wide text-foreground-muted">
            Titre
          </label>
          <input
            id="title"
            type="text"
            value={values.title}
            onChange={(e) => update("title", e.target.value)}
            className="mt-2 w-full rounded-lg border border-border bg-surface px-3 py-2 text-lg font-semibold focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none"
            placeholder="Titre accrocheur de l'article"
          />
        </div>

        <div>
          <label htmlFor="excerpt" className="text-xs font-semibold uppercase tracking-wide text-foreground-muted">
            Résumé
          </label>
          <textarea
            id="excerpt"
            value={values.excerpt}
            onChange={(e) => update("excerpt", e.target.value)}
            rows={2}
            className="mt-2 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none"
            placeholder="Phrase qui apparaît dans la liste et sur les réseaux sociaux"
          />
        </div>

        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-foreground-muted">
            Contenu
          </label>
          <div className="mt-2">
            <RichTextEditor
              value={values.body_mdx}
              onChange={(html) => update("body_mdx", html)}
              placeholder="Rédigez l'article…"
              minHeight={420}
            />
          </div>
        </div>
      </div>

      <aside className="space-y-4">
        <section className="rounded-xl border border-border bg-surface p-4 space-y-3">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-foreground-muted">
            Publication
          </h3>
          <button
            type="button"
            onClick={() => save(true)}
            disabled={saving}
            className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-700 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {values.published ? "Mettre à jour" : "Publier"}
          </button>
          <button
            type="button"
            onClick={() => save(false)}
            disabled={saving}
            className="w-full inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-surface px-4 py-2 text-sm font-semibold text-foreground hover:bg-surface-muted disabled:opacity-50"
          >
            Enregistrer en brouillon
          </button>
          {mode === "edit" && values.slug && (
            <a
              href={`/actualites/${values.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground-muted hover:text-foreground"
            >
              <Eye className="w-4 h-4" />
              Aperçu
            </a>
          )}
        </section>

        <section className="rounded-xl border border-border bg-surface p-4 space-y-3">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-foreground-muted">
            Métadonnées
          </h3>
          <div>
            <label htmlFor="slug" className="text-xs text-foreground-muted">Slug</label>
            <input
              id="slug"
              type="text"
              value={values.slug ?? ""}
              onChange={(e) => update("slug", slugify(e.target.value))}
              disabled={mode === "edit"}
              className="mt-1 w-full rounded-lg border border-border bg-surface px-3 py-1.5 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none disabled:opacity-60"
              placeholder="auto-généré depuis le titre"
            />
          </div>
          <div>
            <label htmlFor="author" className="text-xs text-foreground-muted">Auteur</label>
            <input
              id="author"
              type="text"
              value={values.author}
              onChange={(e) => update("author", e.target.value)}
              className="mt-1 w-full rounded-lg border border-border bg-surface px-3 py-1.5 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none"
            />
          </div>
          <div>
            <label htmlFor="cover" className="text-xs text-foreground-muted">URL image cover</label>
            <input
              id="cover"
              type="text"
              value={values.cover_url}
              onChange={(e) => update("cover_url", e.target.value)}
              placeholder="/blog/mon-image.jpg"
              className="mt-1 w-full rounded-lg border border-border bg-surface px-3 py-1.5 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none"
            />
          </div>
          <div>
            <label className="text-xs text-foreground-muted">Tags</label>
            <div className="mt-1 flex flex-wrap gap-1.5">
              {values.tags.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-1 rounded bg-primary-50 px-2 py-0.5 text-xs font-medium text-primary-700 dark:bg-primary-500/15 dark:text-primary-200"
                >
                  {t}
                  <button
                    type="button"
                    onClick={() => removeTag(t)}
                    className="hover:text-rose-600"
                    aria-label={`Retirer ${t}`}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="mt-2 flex gap-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addTag();
                  }
                }}
                placeholder="Ajouter un tag…"
                className="flex-1 rounded-lg border border-border bg-surface px-2 py-1 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none"
              />
              <button
                type="button"
                onClick={addTag}
                className="rounded-lg border border-border bg-surface px-3 py-1 text-sm font-medium hover:bg-surface-muted"
              >
                +
              </button>
            </div>
          </div>
        </section>

        {mode === "edit" && (
          <section className="rounded-xl border border-rose-200 bg-rose-50/50 p-4 dark:border-rose-800 dark:bg-rose-950/30">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-rose-700 dark:text-rose-300 mb-3">
              Zone de danger
            </h3>
            <button
              type="button"
              onClick={remove}
              disabled={saving}
              className="w-full inline-flex items-center justify-center gap-2 rounded-lg border border-rose-300 bg-white px-3 py-2 text-sm font-semibold text-rose-700 hover:bg-rose-100 disabled:opacity-50 dark:bg-rose-950 dark:border-rose-700 dark:text-rose-200"
            >
              <Trash2 className="w-4 h-4" />
              Supprimer l&apos;article
            </button>
          </section>
        )}
      </aside>
    </div>
  );
}
