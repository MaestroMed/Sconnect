/**
 * Next.js instrumentation hook.
 * Initializes Sentry on both server and edge runtimes when SENTRY_DSN is set.
 * The client-side SDK loads via `sentry.client.config.ts` through the
 * Sentry webpack plugin wiring.
 */
export async function register() {
  if (!process.env.SENTRY_DSN) return;

  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("./sentry.server.config");
  }

  if (process.env.NEXT_RUNTIME === "edge") {
    await import("./sentry.edge.config");
  }
}

import * as Sentry from "@sentry/nextjs";

export async function onRequestError(
  error: unknown,
  request: Parameters<NonNullable<typeof Sentry.captureRequestError>>[1],
  errorContext: Parameters<NonNullable<typeof Sentry.captureRequestError>>[2],
) {
  if (!process.env.SENTRY_DSN) return;
  if (typeof Sentry.captureRequestError === "function") {
    Sentry.captureRequestError(error, request, errorContext);
  } else {
    Sentry.captureException(error);
  }
}
