import { NextResponse } from 'next/server'
import { getAuthenticatedUser } from '@/lib/auth'
import { isPersistenceAvailable, listNewsletterSubscribers } from '@/lib/data-adapter'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

function csvEscape(value: unknown): string {
  if (value === null || value === undefined) return ''
  const s = typeof value === 'string' ? value : JSON.stringify(value)
  if (/[",\n;]/.test(s)) return `"${s.replace(/"/g, '""')}"`
  return s
}

export async function GET() {
  const user = await getAuthenticatedUser()
  if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })
  if (!isPersistenceAvailable())
    return NextResponse.json({ error: 'Persistance non configurée' }, { status: 503 })

  const subs = await listNewsletterSubscribers()
  const header = ['email', 'status', 'source', 'consent_at']
  const lines = [header.join(',')]
  for (const s of subs) {
    lines.push([s.email, s.status, s.source, s.consent_at].map(csvEscape).join(','))
  }

  const filename = `newsletter-${new Date().toISOString().slice(0, 10)}.csv`
  return new NextResponse(lines.join('\n'), {
    status: 200,
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Cache-Control': 'no-store',
    },
  })
}
