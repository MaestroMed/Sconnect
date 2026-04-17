"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Lock, Loader2, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

function ResetForm() {
  const router = useRouter();
  const params = useSearchParams();
  const token = params.get("token") ?? "";
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password.length < 8) {
      setError("8 caractères minimum");
      return;
    }
    if (password !== confirm) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/admin/auth/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Erreur");
        return;
      }
      toast.success("Mot de passe mis à jour");
      router.push("/admin/login");
    } finally {
      setSubmitting(false);
    }
  };

  if (!token) {
    return (
      <div className="rounded-lg border border-rose-300 bg-rose-50 p-4 text-sm text-rose-900 dark:border-rose-700 dark:bg-rose-950 dark:text-rose-100">
        Lien de réinitialisation invalide. Demandez-en un nouveau depuis la page{" "}
        <Link href="/admin/login/forgot" className="underline">
          mot de passe oublié
        </Link>
        .
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <label htmlFor="password" className="text-xs font-semibold uppercase tracking-wide text-foreground-muted">
        Nouveau mot de passe
      </label>
      <div className="relative">
        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground-muted" />
        <input
          id="password"
          type="password"
          required
          minLength={8}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-lg border border-border bg-surface pl-9 pr-3 py-2 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none"
        />
      </div>
      <label htmlFor="confirm" className="text-xs font-semibold uppercase tracking-wide text-foreground-muted">
        Confirmation
      </label>
      <div className="relative">
        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground-muted" />
        <input
          id="confirm"
          type="password"
          required
          minLength={8}
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className="w-full rounded-lg border border-border bg-surface pl-9 pr-3 py-2 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none"
        />
      </div>
      {error && <p className="text-sm text-rose-600 dark:text-rose-300">{error}</p>}
      <button
        type="submit"
        disabled={submitting}
        className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700 disabled:opacity-50"
      >
        {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
        Réinitialiser
      </button>
    </form>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-muted px-4">
      <div className="max-w-md w-full rounded-2xl border border-border bg-surface p-8 shadow-lg">
        <h1 className="text-2xl font-display font-bold text-foreground mb-2">
          Nouveau mot de passe
        </h1>
        <p className="text-sm text-foreground-muted mb-6">
          Définissez un nouveau mot de passe pour votre compte administrateur.
        </p>
        <Suspense fallback={<p className="text-sm text-foreground-muted">Chargement…</p>}>
          <ResetForm />
        </Suspense>
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
