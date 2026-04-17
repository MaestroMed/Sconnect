import { NextRequest, NextResponse } from 'next/server'
import { getAuthenticatedUser } from '@/lib/auth'
import { listSubmissions, type SubmissionStatus, type SubmissionType } from '@/lib/data-adapter'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET(request: NextRequest) {
  const user = await getAuthenticatedUser()
  if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })

  const { searchParams } = new URL(request.url)
  const type = (searchParams.get('type') ?? 'all') as SubmissionType | 'all'
  const status = (searchParams.get('status') ?? 'all') as SubmissionStatus | 'all'
  const search = searchParams.get('search') ?? undefined
  const limit = Number(searchParams.get('limit') ?? '50')
  const offset = Number(searchParams.get('offset') ?? '0')

  const { rows, count } = await listSubmissions({ type, status, search, limit, offset })
  return NextResponse.json({ rows, count })
}
