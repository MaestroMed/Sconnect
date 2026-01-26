"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log l'erreur pour monitoring
    console.error('Erreur application:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-dark-900 via-dark-950 to-primary-950 px-4">
      <div className="max-w-md w-full text-center">
        <div className="w-20 h-20 mx-auto bg-accent-500/10 backdrop-blur-lg border border-accent-500/20 rounded-full flex items-center justify-center mb-6">
          <AlertTriangle className="w-10 h-10 text-accent-400" />
        </div>
        
        <h1 className="font-display font-bold text-3xl text-white mb-4">
          Une erreur est survenue
        </h1>
        
        <p className="text-dark-300 mb-8">
          Désolé, quelque chose s'est mal passé. Veuillez réessayer ou revenir à l'accueil.
        </p>

        {process.env.NODE_ENV === 'development' && error.message && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-left">
            <p className="text-sm font-mono text-red-800 break-all">
              {error.message}
            </p>
          </div>
        )}

        <div className="flex gap-4 justify-center">
          <button
            onClick={reset}
            className="btn-primary"
          >
            <RefreshCw className="w-5 h-5" />
            Réessayer
          </button>
          
          <Link href="/" className="btn-outline text-white border-white/20 hover:bg-white/10">
            <Home className="w-5 h-5" />
            Accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
