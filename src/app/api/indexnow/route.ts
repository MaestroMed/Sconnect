import { NextRequest, NextResponse } from "next/server";
import { submitToIndexNow } from "@/lib/indexnow";
import { getClientIdentifier, rateLimit, rateLimitResponse } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/**
 * Manual + CI-triggered IndexNow ping.
 *
 * Auth: protected by a bearer token (env `INDEXNOW_TRIGGER_TOKEN`) so
 * only the GitHub Actions workflow (or Mehdi via curl) can submit.
 *
 * Body:
 *   { urls: ["https://sconnectfrance.fr/path1", ...] }
 *
 * If no urls supplied, the sitemap.xml ping is sent to Google + Bing
 * (no IndexNow body needed for that flow).
 */
export async function POST(request: NextRequest) {
  // Tight rate limit — 5 per hour per IP — to prevent abuse if the
  // token ever leaks. The CI runs once per deploy, so this is plenty.
  const id = getClientIdentifier(request, "indexnow");
  const lim = rateLimit({ identifier: id, limit: 5, windowMs: 3600_000 });
  const limited = rateLimitResponse(lim);
  if (limited) return limited;

  const expected = process.env.INDEXNOW_TRIGGER_TOKEN;
  if (!expected) {
    return NextResponse.json(
      { error: "INDEXNOW_TRIGGER_TOKEN not configured on the server" },
      { status: 503 },
    );
  }
  const auth = request.headers.get("authorization");
  if (auth !== `Bearer ${expected}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { urls?: string[] } = {};
  try {
    body = (await request.json()) as { urls?: string[] };
  } catch {
    body = {};
  }

  const urls = Array.isArray(body.urls) ? body.urls.filter(Boolean) : [];
  const results = await submitToIndexNow(urls);

  return NextResponse.json({
    submitted: urls.length,
    results,
    timestamp: new Date().toISOString(),
  });
}
