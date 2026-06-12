"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Mail, Send, Loader2 } from "lucide-react";

interface NewsletterFormProps {
  source?: string;
  variant?: "inline" | "card";
  className?: string;
}

export default function NewsletterForm({
  source = "footer",
  variant = "inline",
  className = "",
}: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) {
      toast.error("Merci de cocher le consentement RGPD");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source, consent }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error ?? "Inscription échouée");
        return;
      }
      toast.success(data.message ?? "Merci pour votre inscription !");
      setEmail("");
      setConsent(false);
    } catch {
      toast.error("Erreur réseau");
    } finally {
      setSubmitting(false);
    }
  };

  if (variant === "card") {
    return (
      <form
        method="post"
        action="/api/newsletter"
        onSubmit={submit}
        className={`rounded-2xl border border-border bg-surface-elevated p-6 shadow-sm ${className}`}
      >
        <div className="flex items-center gap-2 mb-2">
          <Mail className="w-5 h-5 text-primary-500" />
          <h3 className="font-display font-bold text-lg text-foreground">
            Restez informé
          </h3>
        </div>
        <p className="text-sm text-foreground-muted mb-4">
          Recevez nos conseils et nouveautés (1 email par mois maximum).
        </p>
        <div className="space-y-3">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="votre@email.fr"
            name="email"
            aria-label="Votre adresse email"
            className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none"
          />
          <label className="flex items-start gap-2 text-xs text-foreground-muted">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-0.5"
            />
            <span>
              J&apos;accepte de recevoir les emails de S&apos;Connect. Désinscription en
              1 clic via chaque email. Voir notre{" "}
              <a href="/politique-confidentialite" className="underline">
                politique de confidentialité
              </a>
              .
            </span>
          </label>
          <button
            type="submit"
            disabled={submitting}
            className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-700 disabled:opacity-50"
          >
            {submitting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
            S&apos;inscrire
          </button>
        </div>
      </form>
    );
  }

  return (
    <form method="post" action="/api/newsletter" onSubmit={submit} className={`space-y-2 ${className}`}>
      <div className="flex flex-col sm:flex-row gap-2">
        <label htmlFor="newsletter-email" className="sr-only">
          Email
        </label>
        <input
          id="newsletter-email"
          type="email"
          name="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="votre@email.fr"
          className="flex-1 rounded-lg border border-border bg-surface px-3 py-2 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none"
        />
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700 disabled:opacity-50"
        >
          {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          S&apos;inscrire
        </button>
      </div>
      <label className="flex items-start gap-2 text-xs text-foreground-muted/80">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5"
        />
        <span>
          J&apos;accepte de recevoir les emails de S&apos;Connect (désinscription en 1 clic).
        </span>
      </label>
    </form>
  );
}
