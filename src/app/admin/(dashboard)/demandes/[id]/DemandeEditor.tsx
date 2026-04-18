"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Trash2, Save, CheckCircle2, Clock, Inbox, Archive } from "lucide-react";
import type { Submission, SubmissionStatus } from "@/lib/data-adapter";
import { useConfirm } from "@/components/ui/ConfirmDialog";

const STATUS_OPTIONS: { value: SubmissionStatus; label: string; icon: typeof Inbox }[] = [
  { value: "new", label: "Nouveau", icon: Inbox },
  { value: "in_progress", label: "En cours", icon: Clock },
  { value: "done", label: "Traité", icon: CheckCircle2 },
  { value: "archived", label: "Archivé", icon: Archive },
];

export default function DemandeEditor({ submission }: { submission: Submission }) {
  const router = useRouter();
  const confirm = useConfirm();
  const [status, setStatus] = useState<SubmissionStatus>(submission.status);
  const [notes, setNotes] = useState<string>(submission.notes ?? "");
  const [saving, setSaving] = useState(false);
  const [, startTransition] = useTransition();

  const dirty = status !== submission.status || notes !== (submission.notes ?? "");

  const save = async () => {
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/submissions/${submission.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, notes }),
      });
      if (!res.ok) throw new Error("update failed");
      toast.success("Demande mise à jour");
      startTransition(() => router.refresh());
    } catch {
      toast.error("Échec de la mise à jour");
    } finally {
      setSaving(false);
    }
  };

  const remove = async () => {
    const ok = await confirm({
      title: "Supprimer la demande",
      description: "Supprimer définitivement cette demande ? Cette action est irréversible.",
      confirmLabel: "Supprimer",
      destructive: true,
    });
    if (!ok) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/submissions/${submission.id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("delete failed");
      toast.success("Demande supprimée");
      router.push("/admin/demandes");
    } catch {
      toast.error("Échec de la suppression");
      setSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="text-xs font-semibold uppercase tracking-wide text-foreground-muted">
          Statut
        </label>
        <div className="mt-2 grid grid-cols-2 lg:grid-cols-4 gap-2">
          {STATUS_OPTIONS.map((opt) => {
            const active = status === opt.value;
            const Icon = opt.icon;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => setStatus(opt.value)}
                className={`flex items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition ${
                  active
                    ? "border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-500/15 dark:text-primary-200"
                    : "border-border bg-surface text-foreground hover:border-primary-300"
                }`}
              >
                <Icon className="w-4 h-4" />
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label
          htmlFor="notes"
          className="text-xs font-semibold uppercase tracking-wide text-foreground-muted"
        >
          Notes internes
        </label>
        <textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={5}
          className="mt-2 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none"
          placeholder="Suivi commercial, rappels, etc."
        />
      </div>

      <div className="flex items-center justify-between gap-2 pt-2">
        <button
          type="button"
          onClick={remove}
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-lg border border-rose-300 bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-700 hover:bg-rose-100 disabled:opacity-50 dark:border-rose-700 dark:bg-rose-950 dark:text-rose-200"
        >
          <Trash2 className="w-4 h-4" />
          Supprimer
        </button>
        <button
          type="button"
          onClick={save}
          disabled={!dirty || saving}
          className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-700 disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {saving ? "Enregistrement…" : "Enregistrer"}
        </button>
      </div>
    </div>
  );
}
