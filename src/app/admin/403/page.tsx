import Link from "next/link";
import { ShieldOff, ArrowLeft } from "lucide-react";

export const metadata = { title: "Accès refusé · Administration" };

export default function ForbiddenPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-muted px-4">
      <div className="max-w-md w-full rounded-2xl border border-border bg-surface p-8 text-center shadow-lg">
        <div className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-rose-100 text-rose-600 dark:bg-rose-500/15 dark:text-rose-300">
          <ShieldOff className="w-7 h-7" />
        </div>
        <h1 className="text-2xl font-display font-bold text-foreground mb-2">
          Accès refusé
        </h1>
        <p className="text-sm text-foreground-muted mb-6">
          Vous n&apos;avez pas les droits requis pour consulter cette section.
          Contactez un administrateur si vous pensez qu&apos;il s&apos;agit d&apos;une erreur.
        </p>
        <div className="flex flex-col sm:flex-row gap-2 justify-center">
          <Link href="/admin" className="btn-outline btn-sm">
            <ArrowLeft className="w-4 h-4" />
            Tableau de bord
          </Link>
          <Link href="/admin/login" className="btn-primary btn-sm">
            Changer de compte
          </Link>
        </div>
      </div>
    </div>
  );
}
