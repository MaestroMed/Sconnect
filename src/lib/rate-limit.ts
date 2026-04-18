/**
 * Simple in-memory sliding-window rate limiter.
 *
 * Good enough for a single Vercel region / low-traffic public forms.
 * For multi-region deployments, swap the Map for Upstash Redis via
 * `@upstash/ratelimit` — the interface is intentionally identical.
 */

type Bucket = {
  count: number;
  resetAt: number;
};

const buckets = new Map<string, Bucket>();

// Periodically sweep expired buckets to cap memory (no-op if empty)
let sweepTimer: ReturnType<typeof setInterval> | null = null;
function ensureSweep() {
  if (sweepTimer) return;
  sweepTimer = setInterval(() => {
    const now = Date.now();
    for (const [key, bucket] of buckets.entries()) {
      if (bucket.resetAt <= now) buckets.delete(key);
    }
  }, 60_000);
  // Allow Node to exit if this is the only timer (edge runtime ignores this)
  if (typeof (sweepTimer as { unref?: () => void }).unref === "function") {
    (sweepTimer as { unref: () => void }).unref();
  }
}

export interface RateLimitOptions {
  identifier: string;
  limit?: number;
  windowMs?: number;
}

export interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetAt: number;
  retryAfter: number; // seconds
}

export function rateLimit({
  identifier,
  limit = 5,
  windowMs = 60_000,
}: RateLimitOptions): RateLimitResult {
  ensureSweep();
  const now = Date.now();
  const existing = buckets.get(identifier);

  if (!existing || existing.resetAt <= now) {
    buckets.set(identifier, { count: 1, resetAt: now + windowMs });
    return {
      success: true,
      remaining: limit - 1,
      resetAt: now + windowMs,
      retryAfter: 0,
    };
  }

  existing.count += 1;
  const allowed = existing.count <= limit;

  return {
    success: allowed,
    remaining: Math.max(0, limit - existing.count),
    resetAt: existing.resetAt,
    retryAfter: allowed ? 0 : Math.ceil((existing.resetAt - now) / 1000),
  };
}

/**
 * Extract a best-effort client IP from a Next.js `Request`.
 * Falls back to a literal `anonymous` bucket so that local dev still works.
 */
export function getClientIdentifier(request: Request, route: string): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip =
    forwarded?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "anonymous";
  return `${route}:${ip}`;
}

/**
 * Returns a 429 Response with standard RateLimit headers when not allowed,
 * else returns null so the handler can continue.
 */
export function rateLimitResponse(result: RateLimitResult): Response | null {
  if (result.success) return null;
  return new Response(
    JSON.stringify({
      error: "Trop de requêtes. Veuillez réessayer plus tard.",
      retryAfter: result.retryAfter,
    }),
    {
      status: 429,
      headers: {
        "Content-Type": "application/json",
        "Retry-After": String(result.retryAfter),
        "X-RateLimit-Remaining": String(result.remaining),
        "X-RateLimit-Reset": String(Math.ceil(result.resetAt / 1000)),
      },
    },
  );
}
