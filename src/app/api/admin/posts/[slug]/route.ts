import { NextRequest, NextResponse } from 'next/server'
import { getAuthenticatedUser } from '@/lib/auth'
import { getPost, upsertPost, deletePost, isPersistenceAvailable } from '@/lib/data-adapter'
import { sanitizeHtml } from '@/lib/sanitize'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

interface PostPayload {
  title?: string
  excerpt?: string | null
  cover_url?: string | null
  body_mdx?: string
  tags?: string[]
  author?: string | null
  published?: boolean
  published_at?: string | null
}

export async function GET(_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const user = await getAuthenticatedUser()
  if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })
  if (!isPersistenceAvailable())
    return NextResponse.json({ error: 'Persistance Supabase non configurée' }, { status: 503 })

  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return NextResponse.json({ error: 'Introuvable' }, { status: 404 })
  return NextResponse.json(post)
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const user = await getAuthenticatedUser()
  if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })
  if (!isPersistenceAvailable())
    return NextResponse.json({ error: 'Persistance Supabase non configurée' }, { status: 503 })

  const { slug } = await params
  const existing = await getPost(slug)
  if (!existing) return NextResponse.json({ error: 'Introuvable' }, { status: 404 })

  const body = (await request.json()) as PostPayload
  const published = body.published ?? existing.published

  const row = await upsertPost({
    slug,
    title: body.title ?? existing.title,
    excerpt: body.excerpt ?? existing.excerpt,
    cover_url: body.cover_url ?? existing.cover_url,
    body_mdx:
      body.body_mdx !== undefined ? sanitizeHtml(body.body_mdx) : existing.body_mdx,
    tags: body.tags ?? existing.tags,
    author: body.author ?? existing.author,
    published,
    published_at: published
      ? body.published_at ?? existing.published_at ?? new Date().toISOString()
      : null,
  })
  if (!row) return NextResponse.json({ error: 'Mise à jour échouée' }, { status: 500 })
  return NextResponse.json(row)
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const user = await getAuthenticatedUser()
  if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })
  if (!isPersistenceAvailable())
    return NextResponse.json({ error: 'Persistance Supabase non configurée' }, { status: 503 })

  const { slug } = await params
  const ok = await deletePost(slug)
  if (!ok) return NextResponse.json({ error: 'Suppression échouée' }, { status: 500 })
  return NextResponse.json({ success: true })
}
