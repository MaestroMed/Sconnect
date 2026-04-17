"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/admin/DataTable";
import type { Submission, SubmissionStatus, SubmissionType } from "@/lib/data-adapter";
import { ChevronRight, Mail, Phone } from "lucide-react";

const STATUS_LABEL: Record<SubmissionStatus, string> = {
  new: "Nouveau",
  in_progress: "En cours",
  done: "Traité",
  archived: "Archivé",
};

const STATUS_COLOR: Record<SubmissionStatus, string> = {
  new: "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300",
  in_progress: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
  done: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
  archived: "bg-slate-100 text-slate-600 dark:bg-slate-700/30 dark:text-slate-300",
};

const TYPE_LABEL: Record<SubmissionType, string> = {
  contact: "Contact",
  devis: "Devis",
  intervention: "Intervention",
};

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString("fr-FR", { dateStyle: "short", timeStyle: "short" });
}

export default function DemandesTable({
  initialRows,
  initialFilters,
}: {
  initialRows: Submission[];
  initialFilters: { type?: string; status?: string; search?: string };
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [type, setType] = useState<string>(initialFilters.type ?? "all");
  const [status, setStatus] = useState<string>(initialFilters.status ?? "all");

  const rows = initialRows;

  const updateFilter = (key: "type" | "status", value: string) => {
    const params = new URLSearchParams(searchParams?.toString() ?? "");
    if (value === "all") params.delete(key);
    else params.set(key, value);
    router.push(`/admin/demandes?${params.toString()}`);
    router.refresh();
  };

  const columns = useMemo<ColumnDef<Submission>[]>(
    () => [
      {
        accessorKey: "type",
        header: "Type",
        cell: ({ row }) => (
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold bg-primary-50 text-primary-700 dark:bg-primary-500/15 dark:text-primary-300">
            {TYPE_LABEL[row.original.type]}
          </span>
        ),
      },
      {
        accessorKey: "contact_name",
        header: "Contact",
        cell: ({ row }) => (
          <div className="space-y-0.5">
            <div className="font-medium text-foreground">
              {row.original.contact_name ?? "—"}
            </div>
            <div className="flex flex-wrap gap-2 text-xs text-foreground-muted">
              {row.original.contact_email && (
                <span className="inline-flex items-center gap-1">
                  <Mail className="w-3 h-3" />
                  {row.original.contact_email}
                </span>
              )}
              {row.original.contact_phone && (
                <span className="inline-flex items-center gap-1">
                  <Phone className="w-3 h-3" />
                  {row.original.contact_phone}
                </span>
              )}
            </div>
          </div>
        ),
      },
      {
        accessorKey: "status",
        header: "Statut",
        cell: ({ row }) => (
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold ${STATUS_COLOR[row.original.status]}`}
          >
            {STATUS_LABEL[row.original.status]}
          </span>
        ),
      },
      {
        accessorKey: "created_at",
        header: "Reçu le",
        cell: ({ row }) => (
          <span className="text-sm text-foreground-muted">
            {formatDate(row.original.created_at)}
          </span>
        ),
      },
      {
        id: "actions",
        header: "",
        cell: ({ row }) => (
          <Link
            href={`/admin/demandes/${row.original.id}`}
            className="inline-flex items-center gap-1 text-primary-600 dark:text-primary-300 hover:underline text-sm font-semibold"
          >
            Ouvrir
            <ChevronRight className="w-4 h-4" />
          </Link>
        ),
      },
    ],
    [],
  );

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <select
          className="rounded-lg border border-border bg-surface px-3 py-1.5 text-sm"
          value={type}
          onChange={(e) => {
            setType(e.target.value);
            updateFilter("type", e.target.value);
          }}
        >
          <option value="all">Tous les types</option>
          <option value="contact">Contact</option>
          <option value="devis">Devis</option>
          <option value="intervention">Intervention</option>
        </select>
        <select
          className="rounded-lg border border-border bg-surface px-3 py-1.5 text-sm"
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            updateFilter("status", e.target.value);
          }}
        >
          <option value="all">Tous les statuts</option>
          <option value="new">Nouveau</option>
          <option value="in_progress">En cours</option>
          <option value="done">Traité</option>
          <option value="archived">Archivé</option>
        </select>
      </div>
      <DataTable
        columns={columns}
        data={rows}
        emptyMessage="Aucune demande pour ces filtres."
        searchPlaceholder="Rechercher par nom, email, téléphone…"
      />
    </div>
  );
}
