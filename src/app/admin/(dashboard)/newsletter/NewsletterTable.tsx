"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { ColumnDef } from "@tanstack/react-table";
import { toast } from "sonner";
import { DataTable } from "@/components/admin/DataTable";
import type { NewsletterSubscriber } from "@/lib/data-adapter";
import { UserMinus } from "lucide-react";
import { useConfirm } from "@/components/ui/ConfirmDialog";

const STATUS_COLOR: Record<string, string> = {
  active: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
  unsubscribed: "bg-slate-100 text-slate-600 dark:bg-slate-700/30 dark:text-slate-300",
  bounced: "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300",
};

const STATUS_LABEL: Record<string, string> = {
  active: "Actif",
  unsubscribed: "Désinscrit",
  bounced: "Rejeté",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function NewsletterTable({ rows }: { rows: NewsletterSubscriber[] }) {
  const router = useRouter();
  const confirm = useConfirm();
  const [busy, setBusy] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  const unsubscribe = async (sub: NewsletterSubscriber) => {
    if (sub.status !== "active") return;
    const ok = await confirm({
      title: "Désinscrire l'abonné",
      description: `Confirmer la désinscription de ${sub.email} ?`,
      confirmLabel: "Désinscrire",
      destructive: true,
    });
    if (!ok) return;
    setBusy(sub.id);
    try {
      const res = await fetch(
        `/api/newsletter/unsubscribe?token=${encodeURIComponent(sub.unsubscribe_token)}`,
        { method: "GET" },
      );
      if (!res.ok) throw new Error();
      toast.success("Désinscription effectuée");
      startTransition(() => router.refresh());
    } catch {
      toast.error("Échec");
    } finally {
      setBusy(null);
    }
  };

  const columns = useMemo<ColumnDef<NewsletterSubscriber>[]>(
    () => [
      {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => (
          <span className="font-medium text-foreground">{row.original.email}</span>
        ),
      },
      {
        accessorKey: "source",
        header: "Source",
        cell: ({ row }) => (
          <span className="text-sm text-foreground-muted">{row.original.source ?? "—"}</span>
        ),
      },
      {
        accessorKey: "status",
        header: "Statut",
        cell: ({ row }) => (
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold ${
              STATUS_COLOR[row.original.status] ?? STATUS_COLOR.active
            }`}
          >
            {STATUS_LABEL[row.original.status] ?? row.original.status}
          </span>
        ),
      },
      {
        accessorKey: "consent_at",
        header: "Inscrit le",
        cell: ({ row }) => (
          <span className="text-sm text-foreground-muted">
            {formatDate(row.original.consent_at)}
          </span>
        ),
      },
      {
        id: "actions",
        header: "",
        cell: ({ row }) => {
          const sub = row.original;
          if (sub.status !== "active") return null;
          return (
            <button
              type="button"
              onClick={() => unsubscribe(sub)}
              disabled={busy === sub.id}
              className="inline-flex items-center gap-1 text-rose-600 dark:text-rose-300 hover:underline text-sm font-semibold disabled:opacity-50"
            >
              <UserMinus className="w-4 h-4" />
              Désinscrire
            </button>
          );
        },
      },
    ],
    [busy],
  );

  return (
    <DataTable
      columns={columns}
      data={rows}
      emptyMessage="Aucun abonné pour le moment."
      searchPlaceholder="Rechercher par email…"
    />
  );
}
