import { NextRequest, NextResponse } from 'next/server'
import { getAuthenticatedUser } from '@/lib/auth'
import { listSubmissions, type SubmissionStatus, type SubmissionType } from '@/lib/data-adapter'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

function csvEscape(value: unknown): string {
  if (value === null || value === undefined) return ''
  const s = typeof value === 'string' ? value : JSON.stringify(value)
  if (/[",\n;]/.test(s)) return `"${s.replace(/"/g, '""')}"`
  return s
}

export async function GET(request: NextRequest) {
  const user = await getAuthenticatedUser()
  if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })

  const { searchParams } = new URL(request.url)
  const type = (searchParams.get('type') ?? 'all') as SubmissionType | 'all'
  const status = (searchParams.get('status') ?? 'all') as SubmissionStatus | 'all'
  const search = searchParams.get('search') ?? undefined

  const { rows } = await listSubmissions({ type, status, search, limit: 10000 })

  const header = [
    'id',
    'type',
    'status',
    'created_at',
    'contact_name',
    'contact_email',
    'contact_phone',
    'notes',
    'payload',
  ]
  const lines = [header.join(',')]
  for (const r of rows) {
    lines.push(
      [
        r.id,
        r.type,
        r.status,
        r.created_at,
        r.contact_name,
        r.contact_email,
        r.contact_phone,
        r.notes,
        r.payload,
      ]
        .map(csvEscape)
        .join(',')
    )
  }

  const body = lines.join('\n')
  const filename = `submissions-${new Date().toISOString().slice(0, 10)}.csv`
  return new NextResponse(body, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Cache-Control': 'no-store',
    },
  })
}
