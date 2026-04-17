import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Mail, Phone, User } from "lucide-react";
import { getSubmission, isPersistenceAvailable } from "@/lib/data-adapter";
import DemandeEditor from "./DemandeEditor";

export const dynamic = "force-dynamic";

const TYPE_LABEL: Record<string, string> = {
  contact: "Contact",
  devis: "Demande de devis",
  intervention: "Demande d'intervention",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("fr-FR", {
    dateStyle: "full",
    timeStyle: "short",
  });
}

function formatPayload(payload: unknown): Array<[string, string]> {
  if (!payload || typeof payload !== "object") return [];
  return Object.entries(payload as Record<string, unknown>).map(([k, v]) => [
    k,
    typeof v === "string" ? v : JSON.stringify(v, null, 2),
  ]);
}

export default async function DemandeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!isPersistenceAvailable()) notFound();

  const submission = await getSubmission(id);
  if (!submission) notFound();

  const fields = formatPayload(submission.payload);

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/admin/demandes"
          className="inline-flex items-center gap-1 text-sm text-foreground-muted hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour aux demandes
        </Link>
      </div>

      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-primary-600 dark:text-primary-300">
            {TYPE_LABEL[submission.type] ?? submission.type}
          </p>
          <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground mt-1">
            {submission.contact_name ?? "Demande sans nom"}
          </h1>
          <p className="text-sm text-foreground-muted mt-1">
            Reçue le {formatDate(submission.created_at)}
          </p>
        </div>
      </header>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <section className="rounded-xl border border-border bg-surface p-6">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground-muted mb-4">
              Coordonnées
            </h2>
            <dl className="grid sm:grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="text-xs text-foreground-muted flex items-center gap-1">
                  <User className="w-3 h-3" />
                  Nom
                </dt>
                <dd className="font-medium text-foreground mt-0.5">
                  {submission.contact_name ?? "—"}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-foreground-muted flex items-center gap-1">
                  <Mail className="w-3 h-3" />
                  Email
                </dt>
                <dd className="font-medium text-foreground mt-0.5">
                  {submission.contact_email ? (
                    <a
                      href={`mailto:${submission.contact_email}`}
                      className="text-primary-600 hover:underline dark:text-primary-300"
                    >
                      {submission.contact_email}
                    </a>
                  ) : (
                    "—"
                  )}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-foreground-muted flex items-center gap-1">
                  <Phone className="w-3 h-3" />
                  Téléphone
                </dt>
                <dd className="font-medium text-foreground mt-0.5">
                  {submission.contact_phone ? (
                    <a
                      href={`tel:${submission.contact_phone}`}
                      className="text-primary-600 hover:underline dark:text-primary-300"
                    >
                      {submission.contact_phone}
                    </a>
                  ) : (
                    "—"
                  )}
                </dd>
              </div>
            </dl>
          </section>

          <section className="rounded-xl border border-border bg-surface p-6">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground-muted mb-4">
              Détail du formulaire
            </h2>
            {fields.length === 0 ? (
              <p className="text-sm text-foreground-muted">Aucun détail.</p>
            ) : (
              <dl className="space-y-3">
                {fields.map(([key, value]) => (
                  <div
                    key={key}
                    className="grid sm:grid-cols-[180px_1fr] gap-1 sm:gap-4 border-b border-border/50 pb-3 last:border-0"
                  >
                    <dt className="text-xs font-semibold uppercase tracking-wide text-foreground-muted">
                      {key}
                    </dt>
                    <dd className="text-sm text-foreground whitespace-pre-wrap break-words">
                      {value || "—"}
                    </dd>
                  </div>
                ))}
              </dl>
            )}
          </section>
        </div>

        <aside className="space-y-6">
          <section className="rounded-xl border border-border bg-surface p-6">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground-muted mb-4">
              Suivi
            </h2>
            <DemandeEditor submission={submission} />
          </section>
        </aside>
      </div>
    </div>
  );
}
