"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";
import * as Sentry from "@sentry/nextjs";
import { AuroraBackdrop, NoiseOverlay } from "@/components/ui/ambient";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Erreur application:', error);
    // Report to Sentry (no-op if DSN not configured)
    if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
      Sentry.captureException(error);
    }
  }, [error]);

  return (
    <div className="relative min-h-[80vh] flex items-center justify-center bg-dark-950 px-4 py-16 overflow-hidden">
      <AuroraBackdrop intensity="soft" />
      <NoiseOverlay opacity={0.05} />
      <div className="max-w-md w-full text-center relative z-10">
        <div className="w-20 h-20 mx-auto bg-accent-500/10 backdrop-blur-lg border border-accent-500/20 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-accent-500/20">
          <AlertTriangle className="w-10 h-10 text-accent-400" aria-hidden="true" />
        </div>

        <h1 className="font-display font-bold text-3xl text-white mb-4">
          Une erreur est survenue
        </h1>

        <p className="text-dark-300 mb-8">
          Désolé, quelque chose s&apos;est mal passé. Veuillez réessayer ou revenir à l&apos;accueil.
        </p>

        {process.env.NODE_ENV === 'development' && error.message && (
          <div className="bg-red-500/10 backdrop-blur border border-red-500/30 rounded-lg p-4 mb-6 text-left">
            <p className="text-xs font-mono text-red-200 break-all">{error.message}</p>
            {error.digest && (
              <p className="text-xs font-mono text-red-300/70 mt-1">digest: {error.digest}</p>
            )}
          </div>
        )}

        <div className="flex gap-3 justify-center flex-wrap">
          <button onClick={reset} className="btn-primary">
            <RefreshCw className="w-5 h-5" />
            Réessayer
          </button>
          <Link href="/" className="btn bg-white/10 text-white hover:bg-white/20 border border-white/20 backdrop-blur">
            <Home className="w-5 h-5" />
            Accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
