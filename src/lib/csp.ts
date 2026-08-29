import { headers } from "next/headers";

/**
 * Returns the per-request CSP nonce set by middleware.ts on the request
 * header `x-nonce`. Returns null when the middleware did not set one
 * (e.g. during the build's static-rendering pass, or for routes that the
 * matcher excludes).
 *
 * Server-only — depends on `next/headers`.
 */
export async function getCspNonce(): Promise<string | null> {
  const h = await headers();
  return h.get("x-nonce");
}
