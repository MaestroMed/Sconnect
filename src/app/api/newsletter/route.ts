import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { isPersistenceAvailable, subscribeNewsletter } from '@/lib/data-adapter'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const SubscribeSchema = z.object({
  email: z.string().email('Email invalide'),
  source: z.string().max(50).optional(),
  consent: z.boolean().refine((v) => v === true, 'Consentement requis'),
})

export async function POST(request: NextRequest) {
  if (!isPersistenceAvailable()) {
    return NextResponse.json(
      { error: 'Inscription temporairement indisponible' },
      { status: 503 },
    )
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Corps de requête invalide' }, { status: 400 })
  }

  const parsed = SubscribeSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.errors[0]?.message ?? 'Données invalides' },
      { status: 400 },
    )
  }

  const sub = await subscribeNewsletter(parsed.data.email, parsed.data.source)
  if (!sub) {
    return NextResponse.json({ error: 'Inscription échouée' }, { status: 500 })
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
