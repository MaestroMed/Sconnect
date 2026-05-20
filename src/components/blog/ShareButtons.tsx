"use client";

import { useState } from "react";
import { Link2, Mail, Linkedin, Twitter, Check } from "lucide-react";
import { toast } from "sonner";

interface ShareButtonsProps {
  title: string;
  /** Absolute URL of the article. */
  url: string;
  /** Optional excerpt used for the share intent body / email subject. */
  excerpt?: string;
}

/**
 * Inline share controls for an article. Uses the native Web Share API on
 * mobile (single button) and falls back to per-platform intents on
 * desktop, plus a copy-to-clipboard. No tracking pixels, no third-party
 * SDK — just intent URLs.
 */
export default function ShareButtons({ title, url, excerpt }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const text = excerpt ?? title;
  const encoded = {
    url: encodeURIComponent(url),
    title: encodeURIComponent(title),
    text: encodeURIComponent(text),
  };

  const intents = {
    twitter: `https://twitter.com/intent/tweet?url=${encoded.url}&text=${encoded.title}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encoded.url}`,
    email: `mailto:?subject=${encoded.title}&body=${encoded.text}%0A%0A${encoded.url}`,
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("Lien copié");
      setTimeout(() => setCopied(false), 2200);
    } catch {
      toast.error("Impossible de copier le lien");
    }
  };

  const nativeShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, text, url });
        return true;
      } catch {
        return false;
      }
    }
    return false;
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-2 text-xs font-semibold uppercase tracking-wider text-foreground-muted">
        Partager
      </span>
      <button
        type="button"
        onClick={async () => {
          const native = await nativeShare();
          if (!native) await copy();
        }}
        aria-label="Copier le lien de l'article"
        title="Copier le lien"
        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface-elevated text-foreground-muted hover:text-primary-600 hover:border-primary-300 dark:hover:text-primary-300 dark:hover:border-primary-600 transition-colors"
      >
        {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Link2 className="h-4 w-4" />}
      </button>
      <a
        href={intents.twitter}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Partager sur Twitter / X"
        title="Partager sur X"
        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface-elevated text-foreground-muted hover:text-[#1d9bf0] hover:border-[#1d9bf0]/30 transition-colors"
      >
        <Twitter className="h-4 w-4" />
      </a>
      <a
        href={intents.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Partager sur LinkedIn"
        title="Partager sur LinkedIn"
        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface-elevated text-foreground-muted hover:text-[#0a66c2] hover:border-[#0a66c2]/30 transition-colors"
      >
        <Linkedin className="h-4 w-4" />
      </a>
      <a
        href={intents.email}
        aria-label="Partager par email"
        title="Partager par email"
        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface-elevated text-foreground-muted hover:text-primary-600 hover:border-primary-300 dark:hover:text-primary-300 dark:hover:border-primary-600 transition-colors"
      >
        <Mail className="h-4 w-4" />
      </a>
    </div>
  );
}
