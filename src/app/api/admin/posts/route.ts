import { NextRequest, NextResponse } from 'next/server'
import { getAuthenticatedUser } from '@/lib/auth'
import { listPosts, upsertPost, isPersistenceAvailable } from '@/lib/data-adapter'
import { sanitizeHtml } from '@/lib/sanitize'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET() {
  const user = await getAuthenticatedUser()
  if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })
  if (!isPersistenceAvailable())
    return NextResponse.json({ error: 'Persistance Supabase non configurée' }, { status: 503 })

  const rows = await listPosts()
  return NextResponse.json({ rows, count: rows.length })
}

interface PostPayload {
  slug?: string
  title?: string
  excerpt?: string | null
  cover_url?: string | null
  body_mdx?: string
  tags?: string[]
  author?: string | null
  published?: boolean
  published_at?: string | null
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
}

export async function POST(request: NextRequest) {
  const user = await getAuthenticatedUser()
  if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })
  if (!isPersistenceAvailable())
    return NextResponse.json({ error: 'Persistance Supabase non configurée' }, { status: 503 })

  const body = (await request.json()) as PostPayload
  if (!body.title || !body.body_mdx) {
    return NextResponse.json({ error: 'Titre et contenu requis' }, { status: 400 })
  }

  const slug = (body.slug && slugify(body.slug)) || slugify(body.title)
  const sanitized = sanitizeHtml(body.body_mdx)
  const published = body.published ?? false

  const row = await upsertPost({
    slug,
    title: body.title,
    excerpt: body.excerpt ?? null,
    cover_url: body.cover_url ?? null,
    body_mdx: sanitized,
    tags: body.tags ?? [],
    author: body.author ?? null,
    published,
    published_at: published ? body.published_at ?? new Date().toISOString() : null,
  })
  if (!row) return NextResponse.json({ error: 'Création échouée' }, { status: 500 })
  return NextResponse.json(row, { status: 201 })
}
