import { NextResponse, type NextRequest } from "next/server";

/**
 * Content-Security-Policy with a per-request nonce.
 *
 * Next.js 16 renamed the "middleware" convention to "proxy" — same API,
 * same runtime. This file therefore lives at the project root and exports
 * a function named `proxy`.
 *
 * Why this lives at the edge (not next.config.ts):
 *   - `headers()` in next.config.ts can only emit a static value. Nonces
 *     must change per request to be meaningful.
 *   - When the proxy sets `x-nonce` on the *request* headers, Next.js
 *     automatically applies that nonce to its own inline framework scripts
 *     (hydration, router). The same nonce is then placed on every
 *     Schema.org JSON-LD <script> we render via `getCspNonce()`.
 *
 * `'strict-dynamic'` tells supporting browsers to trust scripts loaded by
 * an already-nonced script (covers Next's lazy chunk loads + Vercel
 * Analytics). Older browsers fall back to the host allowlist.
 *
 * `'unsafe-eval'` is still required by Next.js dev (Turbopack HMR) and
 * by Framer Motion's spring inertia integrator in some code paths; we
 * keep it in dev only.
 */
function buildCsp(nonce: string): string {
  const isDev = process.env.NODE_ENV !== "production";
  const scriptSrc = [
    "'self'",
    `'nonce-${nonce}'`,
    "'strict-dynamic'",
    // Fallback for browsers that don't support 'strict-dynamic' — they
    // ignore the nonce + strict-dynamic and use the host allowlist.
    "https://www.googletagmanager.com",
    "https://www.google-analytics.com",
    "https://va.vercel-scripts.com",
    ...(isDev ? ["'unsafe-eval'"] : []),
  ].join(" ");

  return [
    "default-src 'self'",
    `script-src ${scriptSrc}`,
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' data: blob: https:",
    "font-src 'self' https://fonts.gstatic.com data:",
    "connect-src 'self' https://*.supabase.co https://api.resend.com https://www.google-analytics.com https://vitals.vercel-insights.com https://vercel.live",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'",
    "upgrade-insecure-requests",
  ].join("; ");
}

export function proxy(request: NextRequest) {
  // ── Maintenance gate (pre-existing) ───────────────────────────────
  if (process.env.MAINTENANCE_MODE === "true") {
    const { pathname } = request.nextUrl;
    const allowed =
      pathname.startsWith("/maintenance") ||
      pathname.startsWith("/api/") ||
      pathname.startsWith("/admin") ||
      pathname.startsWith("/_next") ||
      pathname === "/favicon.ico";
    if (!allowed) {
      const url = request.nextUrl.clone();
      url.pathname = "/maintenance";
      return NextResponse.rewrite(url);
    }
  }

  // ── Per-request CSP nonce ─────────────────────────────────────────
  // Edge runtime exposes Web Crypto; base64-encoded UUID gives a token
  // that survives JSON escaping inside HTML attribute values.
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const csp = buildCsp(nonce);

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  // Next reads the request's CSP header to strip the nonce from its own
  // dev-only error overlay scripts that would otherwise be flagged.
  requestHeaders.set("Content-Security-Policy", csp);

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });
  response.headers.set("Content-Security-Policy", csp);
  return response;
}

export const config = {
  // Apply to every page so server components can always read x-nonce.
  // Exclude static assets and the Next image optimiser (which serve no
  // HTML and would only add latency). Also exclude API routes — they
  // return JSON, not HTML with scripts.
  matcher: [
    "/((?!api/|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|webp|avif|svg|ico|mp4|webm|json|txt|xml)$).*)",
  ],
};
