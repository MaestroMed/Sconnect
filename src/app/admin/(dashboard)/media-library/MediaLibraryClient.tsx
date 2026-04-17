"use client";

import { useMemo, useState, useTransition } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Search, Trash2, CheckSquare, Square, Copy } from "lucide-react";

interface MediaItem {
  path: string;
  name: string;
  folder: string;
  url: string;
  size: number;
  updatedAt: string;
}

const FOLDER_LABELS: Record<string, string> = {
  logos: "Logos",
  realizations: "Réalisations",
  brands: "Marques",
  hero: "Hero",
  general: "Général",
};

function formatSize(bytes: number) {
  if (!bytes) return "—";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} Ko`;
  return `${(bytes / 1024 / 1024).toFixed(2)} Mo`;
}

export default function MediaLibraryClient({ initialItems }: { initialItems: MediaItem[] }) {
  const router = useRouter();
  const [items] = useState<MediaItem[]>(initialItems);
  const [search, setSearch] = useState("");
  const [folder, setFolder] = useState<string>("all");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [busy, setBusy] = useState(false);
  const [, startTransition] = useTransition();

  const folders = useMemo(() => {
    const set = new Set(items.map((i) => i.folder));
    return Array.from(set).sort();
  }, [items]);

  const filtered = useMemo(() => {
    return items.filter((it) => {
      if (folder !== "all" && it.folder !== folder) return false;
      if (search && !it.name.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [items, search, folder]);

  const toggle = (path: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(path)) next.delete(path);
      else next.add(path);
      return next;
    });
  };

  const toggleAll = () => {
    if (selected.size === filtered.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(filtered.map((f) => f.path)));
    }
  };

  const removeSelected = async () => {
    if (selected.size === 0) return;
    if (!window.confirm(`Supprimer ${selected.size} fichier(s) définitivement ?`)) return;
    setBusy(true);
    try {
      const res = await fetch("/api/admin/media/library", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paths: Array.from(selected) }),
      });
      if (!res.ok) throw new Error();
      toast.success(`${selected.size} fichier(s) supprimé(s)`);
      setSelected(new Set());
      startTransition(() => router.refresh());
    } catch {
      toast.error("Échec de la suppression");
    } finally {
      setBusy(false);
    }
  };

  const copyUrl = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success("URL copiée");
    } catch {
      toast.error("Impossible de copier");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground-muted" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher par nom…"
            className="w-full rounded-lg border border-border bg-surface pl-9 pr-3 py-1.5 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none"
          />
        </div>
        <select
          value={folder}
          onChange={(e) => setFolder(e.target.value)}
          className="rounded-lg border border-border bg-surface px-3 py-1.5 text-sm"
        >
          <option value="all">Tous les dossiers</option>
          {folders.map((f) => (
            <option key={f} value={f}>
              {FOLDER_LABELS[f] ?? f}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={toggleAll}
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-1.5 text-sm font-medium hover:bg-surface-muted"
        >
          {selected.size === filtered.length && filtered.length > 0 ? (
            <CheckSquare className="w-4 h-4" />
          ) : (
            <Square className="w-4 h-4" />
          )}
          Tout sélectionner
        </button>
        {selected.size > 0 && (
          <button
            type="button"
            onClick={removeSelected}
            disabled={busy}
            className="inline-flex items-center gap-2 rounded-lg border border-rose-300 bg-rose-50 px-3 py-1.5 text-sm font-semibold text-rose-700 hover:bg-rose-100 disabled:opacity-50 dark:border-rose-700 dark:bg-rose-950 dark:text-rose-200"
          >
            <Trash2 className="w-4 h-4" />
            Supprimer ({selected.size})
          </button>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border bg-surface p-12 text-center">
          <p className="text-sm text-foreground-muted">Aucun fichier.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {filtered.map((item) => {
            const isSelected = selected.has(item.path);
            return (
              <div
                key={item.path}
                className={`group relative aspect-square rounded-xl border overflow-hidden bg-surface ${
                  isSelected ? "border-primary-500 ring-2 ring-primary-200" : "border-border"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(item.path)}
                  className="absolute inset-0 z-10"
                  aria-label={isSelected ? `Désélectionner ${item.name}` : `Sélectionner ${item.name}`}
                />
                <Image
                  src={item.url}
                  alt={item.name}
                  fill
                  sizes="200px"
                  className="object-cover"
                  unoptimized
                />
                <div className="absolute top-1 left-1 z-20">
                  <span
                    className={`inline-flex items-center justify-center w-6 h-6 rounded ${
                      isSelected
                        ? "bg-primary-500 text-white"
                        : "bg-white/80 text-foreground-muted"
                    }`}
                  >
                    {isSelected ? (
                      <CheckSquare className="w-4 h-4" />
                    ) : (
                      <Square className="w-4 h-4" />
                    )}
                  </span>
                </div>
                <div className="absolute top-1 right-1 z-20">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      copyUrl(item.url);
                    }}
                    className="inline-flex items-center justify-center w-6 h-6 rounded bg-white/80 text-foreground-muted hover:bg-white hover:text-foreground"
                    aria-label="Copier l'URL"
                    title="Copier l'URL"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="absolute bottom-0 inset-x-0 z-20 bg-gradient-to-t from-black/70 to-transparent p-2">
                  <p className="text-[11px] text-white truncate">{item.name}</p>
                  <p className="text-[10px] text-white/70">{formatSize(item.size)}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
