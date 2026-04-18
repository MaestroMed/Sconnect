import * as Sentry from "@sentry/nextjs";

if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    tracesSampleRate: Number(process.env.NEXT_PUBLIC_SENTRY_TRACES_SAMPLE_RATE ?? 0.1),
    replaysSessionSampleRate: 0,
    replaysOnErrorSampleRate: 1.0,
    environment: process.env.NEXT_PUBLIC_VERCEL_ENV ?? process.env.NODE_ENV,
    integrations: [Sentry.replayIntegration({ maskAllText: false, blockAllMedia: false })],
    ignoreErrors: [
      // ResizeObserver warnings (benign, all browsers)
      "ResizeObserver loop limit exceeded",
      "ResizeObserver loop completed with undelivered notifications",
      // Extension noise
      "top.GLOBALS",
      /^.*chrome-extension:\/\/.*$/,
      /^.*moz-extension:\/\/.*$/,
    ],
    beforeSend(event) {
      // Drop events entirely if DSN was never set (shouldn't reach here,
      // but belt-and-braces)
      if (!process.env.NEXT_PUBLIC_SENTRY_DSN) return null;
      return event;
    },
  });
}
