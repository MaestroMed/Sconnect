"use client";

import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
      Sentry.captureException(error);
    }
  }, [error]);

  return (
    <html lang="fr">
      <body>
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
            background:
              "linear-gradient(135deg, #0f172a 0%, #020617 50%, #0c1e4a 100%)",
            color: "white",
            fontFamily: "system-ui, sans-serif",
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: "500px" }}>
            <h1 style={{ fontSize: "1.875rem", fontWeight: 700, marginBottom: "1rem" }}>
              Erreur critique
            </h1>
            <p style={{ color: "#cbd5e1", marginBottom: "2rem" }}>
              Une erreur inattendue s&apos;est produite. Notre équipe a été notifiée.
            </p>
            <button
              onClick={() => reset()}
              style={{
                padding: "0.75rem 1.5rem",
                borderRadius: "0.5rem",
                background: "#2563eb",
                color: "white",
                border: "none",
                fontSize: "1rem",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Réessayer
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
