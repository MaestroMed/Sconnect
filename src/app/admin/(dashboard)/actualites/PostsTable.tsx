"use client";

import { useMemo } from "react";
import Link from "next/link";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/admin/DataTable";
import { ChevronRight, FileText } from "lucide-react";

export interface PostRow {
  slug: string;
  title: string;
  published: boolean;
  published_at: string | null;
  tags: string[];
  source: "db" | "fs";
}

function formatDate(iso?: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function PostsTable({
  rows,
  fallbackRows,
  editable,
}: {
  rows: PostRow[];
  fallbackRows: PostRow[];
  editable: boolean;
}) {
  const data = rows.length > 0 ? rows : fallbackRows;

  const columns = useMemo<ColumnDef<PostRow>[]>(
    () => [
      {
        accessorKey: "title",
        header: "Titre",
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-foreground-muted shrink-0" />
            <span className="font-medium text-foreground">{row.original.title}</span>
          </div>
        ),
      },
      {
        accessorKey: "published_at",
        header: "Publication",
        cell: ({ row }) => (
          <span className="text-sm text-foreground-muted">
            {formatDate(row.original.published_at)}
          </span>
        ),
      },
      {
        accessorKey: "tags",
        header: "Tags",
        cell: ({ row }) => (
          <div className="flex flex-wrap gap-1">
            {row.original.tags.slice(0, 3).map((t) => (
              <span
                key={t}
                className="rounded bg-primary-50 px-1.5 py-0.5 text-[11px] font-medium text-primary-700 dark:bg-primary-500/15 dark:text-primary-200"
              >
                {t}
              </span>
            ))}
          </div>
        ),
      },
      {
        accessorKey: "published",
        header: "Statut",
        cell: ({ row }) =>
          row.original.published ? (
            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
              Publié
            </span>
          ) : (
            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold bg-slate-100 text-slate-600 dark:bg-slate-700/30 dark:text-slate-300">
              Brouillon
            </span>
          ),
      },
      {
        id: "actions",
        header: "",
        cell: ({ row }) => {
          if (!editable || row.original.source === "fs") {
            return (
              <Link
                href={`/actualites/${row.original.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-foreground-muted hover:text-foreground"
              >
                Voir
                <ChevronRight className="w-4 h-4" />
              </Link>
            );
          }
          return (
            <Link
              href={`/admin/actualites/${row.original.slug}`}
              className="inline-flex items-center gap-1 text-primary-600 dark:text-primary-300 hover:underline text-sm font-semibold"
            >
              Éditer
              <ChevronRight className="w-4 h-4" />
            </Link>
          );
        },
      },
    ],
    [editable],
  );

  return (
    <DataTable
      columns={columns}
      data={data}
      emptyMessage={editable ? "Aucun article. Créez votre premier article." : "Aucun article."}
      searchPlaceholder="Rechercher un article…"
    />
  );
}
