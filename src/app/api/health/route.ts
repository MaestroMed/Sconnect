import { NextResponse } from 'next/server'
import { isPersistenceAvailable } from '@/lib/data-adapter'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

/**
 * Health check endpoint for uptime monitoring and load-balancer probes.
 *
 * - 200 → all systems nominal
 * - 503 → critical dependency unhealthy (persistence layer down)
 *
 * Body is JSON with timestamps + per-check status so a monitoring tool
 * (BetterStack, Vercel Monitoring, Cron-Job.org, etc.) can pinpoint
 * which subsystem failed without scraping logs.
 *
 * NOT cached. NOT indexed (robots.ts disallows it implicitly via the
 * route shape — confirm with a test if exposed in sitemap).
 */
export async function GET() {
  const checks: Record<string, { ok: boolean; latencyMs?: number; error?: string }> = {}

  // Check 1 — persistence (Supabase or JSON adapter)
  const t0 = Date.now()
  try {
    const ok = isPersistenceAvailable()
    checks.persistence = { ok, latencyMs: Date.now() - t0 }
  } catch (e) {
    checks.persistence = {
      ok: false,
      latencyMs: Date.now() - t0,
      error: e instanceof Error ? e.message : 'unknown',
    }
  }

  const allOk = Object.values(checks).every((c) => c.ok)

  return NextResponse.json(
    {
      status: allOk ? 'ok' : 'degraded',
      timestamp: new Date().toISOString(),
      uptime: typeof process !== 'undefined' && process.uptime ? Math.round(process.uptime()) : null,
      checks,
    },
    {
      status: allOk ? 200 : 503,
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    },
  )
}
