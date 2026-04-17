import { NextRequest, NextResponse } from 'next/server'
import { getAuthenticatedUser } from '@/lib/auth'
import { isPersistenceAvailable } from '@/lib/data-adapter'
import { listAllMedia, deleteMediaPaths } from '@/lib/supabase/storage'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET() {
  const user = await getAuthenticatedUser()
  if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })
  if (!isPersistenceAvailable())
    return NextResponse.json({ error: 'Persistance Supabase non configurée' }, { status: 503 })

  const items = await listAllMedia()
  return NextResponse.json({ items, count: items.length })
}

export async function DELETE(request: NextRequest) {
  const user = await getAuthenticatedUser()
  if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })
  if (!isPersistenceAvailable())
    return NextResponse.json({ error: 'Persistance Supabase non configurée' }, { status: 503 })

  const body = (await request.json()) as { paths?: string[] }
  if (!body.paths || !Array.isArray(body.paths) || body.paths.length === 0) {
    return NextResponse.json({ error: 'Aucun fichier sélectionné' }, { status: 400 })
  }

  const ok = await deleteMediaPaths(body.paths)
  if (!ok) return NextResponse.json({ error: 'Suppression échouée' }, { status: 500 })
  return NextResponse.json({ success: true, deleted: body.paths.length })
}
