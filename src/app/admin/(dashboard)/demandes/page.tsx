import Link from "next/link";
import { listSubmissions, isPersistenceAvailable } from "@/lib/data-adapter";
import { Inbox, AlertCircle, FileDown } from "lucide-react";
import DemandesTable from "./DemandesTable";

export const dynamic = "force-dynamic";

export default async function DemandesPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; status?: string; search?: string }>;
}) {
  const sp = await searchParams;

  if (!isPersistenceAvailable()) {
    return (
      <div className="space-y-6">
        <header>
          <h1 className="text-3xl font-display font-bold text-foreground">Demandes</h1>
        </header>
        <div className="rounded-xl border border-amber-300 bg-amber-50 dark:border-amber-700 dark:bg-amber-950 p-6 flex gap-3">
          <AlertCircle className="w-6 h-6 text-amber-600 shrink-0" />
          <div>
            <p className="font-semibold text-amber-900 dark:text-amber-100">
              Persistance Supabase non configurée
            </p>
            <p className="text-sm text-amber-800 dark:text-amber-200 mt-1">
              Ajoutez <code>NEXT_PUBLIC_SUPABASE_URL</code> et{" "}
              <code>SUPABASE_SERVICE_ROLE_KEY</code> à votre environnement, puis
              exécutez <code>supabase/migrations/001_phase2_tables.sql</code>.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const { rows, count } = await listSubmissions({
    type: (sp.type as never) ?? "all",
    status: (sp.status as never) ?? "all",
    search: sp.search,
    limit: 200,
  });

  const csvHref = `/api/admin/submissions/export.csv?${new URLSearchParams({
    type: sp.type ?? "all",
    status: sp.status ?? "all",
    ...(sp.search ? { search: sp.search } : {}),
  }).toString()}`;

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-primary-600 dark:text-primary-300 uppercase tracking-wide mb-1">
            Inbox
          </p>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground flex items-center gap-3">
            <Inbox className="w-7 h-7 text-primary-500" />
            Demandes ({count})
          </h1>
          <p className="text-foreground-muted mt-1">
            Toutes les soumissions de formulaire (contact, devis, intervention).
          </p>
        </div>
        <Link
          href={csvHref}
          className="btn-outline btn-sm"
          prefetch={false}
        >
          <FileDown className="w-4 h-4" />
          Export CSV
        </Link>
      </header>

      <DemandesTable initialRows={rows} initialFilters={sp} />
    </div>
  );
}
