import { AlertCircle, Mail, FileDown } from "lucide-react";
import { isPersistenceAvailable, listNewsletterSubscribers } from "@/lib/data-adapter";
import NewsletterTable from "./NewsletterTable";

export const dynamic = "force-dynamic";

export default async function NewsletterAdminPage() {
  if (!isPersistenceAvailable()) {
    return (
      <div className="space-y-6">
        <header>
          <h1 className="text-3xl font-display font-bold text-foreground">
            Newsletter
          </h1>
        </header>
        <div className="rounded-xl border border-amber-300 bg-amber-50 dark:border-amber-700 dark:bg-amber-950 p-6 flex gap-3">
          <AlertCircle className="w-6 h-6 text-amber-600 shrink-0" />
          <div>
            <p className="font-semibold text-amber-900 dark:text-amber-100">
              Persistance Supabase non configurée
            </p>
            <p className="text-sm text-amber-800 dark:text-amber-200 mt-1">
              Les inscriptions newsletter requièrent Supabase.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const subs = await listNewsletterSubscribers();
  const active = subs.filter((s) => s.status === "active").length;
  const csvHref = "/api/admin/newsletter/export.csv";

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-primary-600 dark:text-primary-300 uppercase tracking-wide mb-1">
            Marketing
          </p>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground flex items-center gap-3">
            <Mail className="w-7 h-7 text-primary-500" />
            Newsletter
          </h1>
          <p className="text-foreground-muted mt-1 text-sm">
            {active} abonnés actifs sur {subs.length} inscrits.
          </p>
        </div>
        <a href={csvHref} className="btn-outline btn-sm">
          <FileDown className="w-4 h-4" />
          Export CSV
        </a>
      </header>

      <NewsletterTable rows={subs} />
    </div>
  );
}
