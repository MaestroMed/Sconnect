import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { isPersistenceAvailable, subscribeNewsletter } from '@/lib/data-adapter'
import { getClientIdentifier, rateLimit, rateLimitResponse } from '@/lib/rate-limit'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const SubscribeSchema = z.object({
  email: z.string().email('Email invalide'),
  source: z.string().max(50).optional(),
  consent: z.boolean().refine((v) => v === true, 'Consentement requis'),
})

export async function POST(request: NextRequest) {
  // Rate limit: 3 subscribe attempts per 15 min per IP → kills the
  // "submit until you find a working email" abuse pattern + spam bots.
  const id = getClientIdentifier(request, 'newsletter')
  const limit = rateLimit({ identifier: id, limit: 3, windowMs: 15 * 60_000 })
  const limited = rateLimitResponse(limit)
  if (limited) return limited

  if (!isPersistenceAvailable()) {
    return NextResponse.json(
      { error: 'Inscription temporairement indisponible' },
      { status: 503 },
    )
  }

  // Accept both JSON (regular SPA flow) and FormData (no-JS progressive
  // enhancement fallback when the form submits natively).
  const contentType = request.headers.get('content-type') || ''
  let body: unknown
  let isFormSubmit = false
  try {
    if (contentType.includes('application/json')) {
      body = await request.json()
    } else {
      isFormSubmit = true
      const form = await request.formData()
      body = {
        email: form.get('email'),
        source: form.get('source') ?? 'no-js',
        consent: form.get('consent') === 'on' || form.get('consent') === 'true',
      }
    }
  } catch {
    return NextResponse.json({ error: 'Corps de requête invalide' }, { status: 400 })
  }

  const parsed = SubscribeSchema.safeParse(body)
  if (!parsed.success) {
    const msg = parsed.error.errors[0]?.message ?? 'Données invalides'
    if (isFormSubmit) {
      // No-JS clients can't parse JSON responses meaningfully → redirect with status.
      return NextResponse.redirect(
        new URL(`/?newsletter=error&msg=${encodeURIComponent(msg)}`, request.url),
        303,
      )
    }
    return NextResponse.json({ error: msg }, { status: 400 })
  }

  const sub = await subscribeNewsletter(parsed.data.email, parsed.data.source)
  if (!sub) {
    if (isFormSubmit) {
      return NextResponse.redirect(new URL('/?newsletter=error', request.url), 303)
    }
    return NextResponse.json({ error: 'Inscription échouée' }, { status: 500 })
  }

  if (isFormSubmit) {
    return NextResponse.redirect(new URL('/?newsletter=ok', request.url), 303)
  }

  return NextResponse.json({
    ok: true,
    status: sub.status,
    message:
      sub.status === 'active'
        ? 'Inscription confirmée. Merci !'
        : 'Adresse réinscrite avec succès.',
  })
}
