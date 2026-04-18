import { NextRequest, NextResponse } from 'next/server'
import { getAuthenticatedUser } from '@/lib/auth'
import {
  deleteSubmission,
  getSubmission,
  updateSubmission,
  type SubmissionStatus,
} from '@/lib/data-adapter'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const ALLOWED_STATUS: SubmissionStatus[] = ['new', 'in_progress', 'done', 'archived']

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getAuthenticatedUser()
  if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })

  const { id } = await params
  const row = await getSubmission(id)
  if (!row) return NextResponse.json({ error: 'Introuvable' }, { status: 404 })
  return NextResponse.json(row)
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getAuthenticatedUser()
  if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })

  const { id } = await params
  const body = (await request.json()) as { status?: SubmissionStatus; notes?: string }
  const updates: { status?: SubmissionStatus; notes?: string | null } = {}
  if (body.status) {
    if (!ALLOWED_STATUS.includes(body.status)) {
      return NextResponse.json({ error: 'Statut invalide' }, { status: 400 })
    }
    updates.status = body.status
  }
  if (typeof body.notes === 'string') updates.notes = body.notes

  const row = await updateSubmission(id, updates)
  if (!row) return NextResponse.json({ error: 'Mise à jour échouée' }, { status: 500 })
  return NextResponse.json(row)
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getAuthenticatedUser()
  if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })

  const { id } = await params
  const ok = await deleteSubmission(id)
  if (!ok) return NextResponse.json({ error: 'Suppression échouée' }, { status: 500 })
  return NextResponse.json({ success: true })
}
