/**
 * Import filesystem MDX articles (content/blog/*.mdx) into Supabase posts table.
 *
 * Usage:
 *   1. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local
 *   2. Run: npm run db:import-mdx
 *
 * Idempotent: upserts on slug. Existing rows are overwritten.
 */

import { createClient } from '@supabase/supabase-js'
import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { config as loadEnv } from 'dotenv'

loadEnv({ path: '.env.local' })
loadEnv()

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in env')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { persistSession: false },
})

const contentDir = path.join(process.cwd(), 'content', 'blog')

interface Frontmatter {
  title: string
  excerpt?: string
  date: string
  author?: string
  cover?: string
  tags?: string[]
  draft?: boolean
}

async function main() {
  if (!fs.existsSync(contentDir)) {
    console.error(`No content directory at ${contentDir}`)
    process.exit(1)
  }
  const files = fs.readdirSync(contentDir).filter((f) => f.endsWith('.mdx'))
  if (files.length === 0) {
    console.log('No .mdx files found.')
    return
  }

  let success = 0
  for (const file of files) {
    const slug = file.replace(/\.mdx$/, '')
    const raw = fs.readFileSync(path.join(contentDir, file), 'utf-8')
    const { data, content } = matter(raw)
    const fm = data as Frontmatter

    const { error } = await supabase.from('posts').upsert(
      {
        slug,
        title: fm.title,
        excerpt: fm.excerpt ?? null,
        cover_url: fm.cover ?? null,
        body_mdx: content,
        tags: fm.tags ?? [],
        author: fm.author ?? null,
        published: !fm.draft,
        published_at: fm.date ? new Date(fm.date).toISOString() : null,
      },
      { onConflict: 'slug' },
    )

    if (error) {
      console.error(`✖ ${slug}: ${error.message}`)
      process.exitCode = 1
    } else {
      console.log(`✔ ${slug}`)
      success++
    }
  }
  console.log(`\nImported ${success}/${files.length} articles.`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
