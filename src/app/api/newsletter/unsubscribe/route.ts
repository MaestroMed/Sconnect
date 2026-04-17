import { NextRequest, NextResponse } from 'next/server'
import { isPersistenceAvailable, unsubscribeNewsletterByToken } from '@/lib/data-adapter'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET(request: NextRequest) {
  if (!isPersistenceAvailable()) {
    return NextResponse.json({ error: 'Service indisponible' }, { status: 503 })
  }

  const { searchParams } = new URL(request.url)
  const token = searchParams.get('token')
  if (!token) {
    return NextResponse.json({ error: 'Token manquant' }, { status: 400 })
  }

  const ok = await unsubscribeNewsletterByToken(token)
  if (!ok) return NextResponse.json({ error: 'Désabonnement échoué' }, { status: 500 })

  const html = `<!doctype html>
<html lang="fr"><head><meta charset="utf-8"><title>Désabonnement</title>
<meta name="viewport" content="width=device-width,initial-scale=1">
<style>body{font-family:system-ui,sans-serif;max-width:520px;margin:80px auto;padding:24px;text-align:center;color:#1f2937}h1{color:#0ea5e9}</style>
</head><body>
<h1>Désabonnement confirmé</h1>
<p>Votre adresse a été retirée de la liste S'Connect. Vous ne recevrez plus nos communications.</p>
<p><a href="/">Retour à l'accueil</a></p>
</body></html>`

  return new NextResponse(html, {
    status: 200,
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  })
}
