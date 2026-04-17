"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Loader2, ArrowLeft, CheckCircle2 } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/admin/auth/forgot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "Erreur");
        return;
      }
      setDone(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-muted px-4">
      <div className="max-w-md w-full rounded-2xl border border-border bg-surface p-8 shadow-lg">
        <h1 className="text-2xl font-display font-bold text-foreground mb-2">
          Mot de passe oublié
        </h1>
        <p className="text-sm text-foreground-muted mb-6">
          Entrez votre email administrateur. Si un compte existe, vous recevrez un lien
          de réinitialisation valable 1 heure.
        </p>

        {done ? (
          <div className="rounded-lg border border-emerald-300 bg-emerald-50 p-4 text-sm text-emerald-900 dark:border-emerald-700 dark:bg-emerald-950 dark:text-emerald-100 flex gap-2">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <p>
              Si l&apos;adresse <strong>{email}</strong> est associée à un compte, un
              email vient d&apos;être envoyé. Vérifiez votre boîte de réception.
            </p>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-3">
            <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wide text-foreground-muted">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground-muted" />
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@sconnectfrance.fr"
                className="w-full rounded-lg border border-border bg-surface pl-9 pr-3 py-2 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none"
              />
            </div>
            {error && (
              <p className="text-sm text-rose-600 dark:text-rose-300">{error}</p>
            )}
            <button
              type="submit"
              disabled={submitting}
              className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700 disabled:opacity-50"
            >
              {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
              Envoyer le lien
            </button>
          </form>
        )}

        <div className="mt-6 text-center">
          <Link
            href="/admin/login"
            className="inline-flex items-center gap-1 text-sm text-foreground-muted hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour à la connexion
          </Link>
        </div>
      </div>
    </div>
  );
}
