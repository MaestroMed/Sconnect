/**
 * Migrate JSON data files (src/lib/data/*.json) into Supabase.
 *
 * Usage:
 *   1. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local
 *   2. Run: npx tsx scripts/migrate-json-to-supabase.ts
 *
 * Idempotent: each table is upserted on its natural key.
 */

import { createClient } from '@supabase/supabase-js'
import fs from 'node:fs'
import path from 'node:path'
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

const dataDir = path.join(process.cwd(), 'src', 'lib', 'data')

function readJson<T = unknown>(filename: string): T {
  return JSON.parse(fs.readFileSync(path.join(dataDir, filename), 'utf-8')) as T
}

function ok(label: string, error: { message?: string } | null) {
  if (error) {
    console.error(`✖ ${label}: ${error.message ?? JSON.stringify(error)}`)
    process.exitCode = 1
  } else {
    console.log(`✓ ${label}`)
  }
}

async function migrateSiteConfig() {
  const json = readJson<any>('site-config.json')
  const row = {
    site_name: json.siteName,
    site_tagline: json.siteTagline,
    phone: json.phone,
    phone_emergency: json.phoneEmergency,
    email: json.email,
    address_street: json.address.street,
    address_postal_code: json.address.postalCode,
    address_city: json.address.city,
    hours_weekdays: json.hours.weekdays,
    hours_saturday: json.hours.saturday,
    hours_emergency: json.hours.emergency,
    social_facebook: json.social.facebook,
    social_linkedin: json.social.linkedin,
    social_instagram: json.social.instagram,
    seo_title: json.seo.title,
    seo_description: json.seo.description,
    seo_keywords: json.seo.keywords,
    stats_interventions: json.stats.interventionsPerYear,
    stats_years: json.stats.yearsExperience,
    stats_satisfaction: json.stats.satisfactionRate,
    zones: json.zones,
  }
  const { data: existing } = await supabase.from('site_config').select('id').limit(1).maybeSingle()
  if (existing) {
    const { error } = await supabase.from('site_config').update(row).eq('id', existing.id)
    ok('site_config (update)', error)
  } else {
    const { error } = await supabase.from('site_config').insert(row)
    ok('site_config (insert)', error)
  }
}

async function migrateHomepage() {
  const json = readJson<any>('homepage.json')
  const { id: _id, ...row } = json
  const { data: existing } = await supabase.from('homepage').select('id').limit(1).maybeSingle()
  if (existing) {
    const { error } = await supabase.from('homepage').update(row).eq('id', existing.id)
    ok('homepage (update)', error)
  } else {
    const { error } = await supabase.from('homepage').insert(row)
    ok('homepage (insert)', error)
  }
}

async function migrateServices() {
  const json = readJson<any>('services.json')
  for (const cat of json.categories) {
    const catRow = {
      name: cat.name,
      slug: cat.slug,
      icon: cat.icon,
      color: cat.color,
      short_description: cat.shortDescription,
      order_index: 0,
    }
    const { data: existingCat } = await supabase
      .from('service_categories')
      .select('id')
      .eq('slug', cat.slug)
      .maybeSingle()
    let categoryId: string
    if (existingCat) {
      const { error } = await supabase
        .from('service_categories')
        .update(catRow)
        .eq('id', existingCat.id)
      ok(`service_categories[${cat.slug}] (update)`, error)
      categoryId = existingCat.id
    } else {
      const { data, error } = await supabase
        .from('service_categories')
        .insert(catRow)
        .select('id')
        .single()
      ok(`service_categories[${cat.slug}] (insert)`, error)
      if (!data) continue
      categoryId = data.id
    }

    let order = 0
    for (const svc of cat.services ?? []) {
      const svcRow = {
        category_id: categoryId,
        name: svc.name,
        slug: svc.slug,
        icon: svc.icon,
        description: svc.description,
        full_description: svc.fullDescription,
        prestations: svc.prestations ?? [],
        faqs: svc.faqs ?? [],
        order_index: order++,
      }
      const { data: existingSvc } = await supabase
        .from('services')
        .select('id')
        .eq('category_id', categoryId)
        .eq('slug', svc.slug)
        .maybeSingle()
      if (existingSvc) {
        const { error } = await supabase.from('services').update(svcRow).eq('id', existingSvc.id)
        ok(`services[${cat.slug}/${svc.slug}] (update)`, error)
      } else {
        const { error } = await supabase.from('services').insert(svcRow)
        ok(`services[${cat.slug}/${svc.slug}] (insert)`, error)
      }
    }
  }
}

async function migrateRealizations() {
  const json = readJson<any>('realizations.json')
  let order = 0
  for (const r of json.realizations ?? []) {
    const row = {
      title: r.title,
      type: r.type,
      location: r.location,
      category: r.category,
      service_type: r.serviceType,
      description: r.description,
      image_url: r.image,
      featured: !!r.featured,
      order_index: order++,
    }
    // We can't reuse the JSON id (string like "1") because the schema uses uuid.
    // Match on (title, location) for idempotence.
    const { data: existing } = await supabase
      .from('realizations')
      .select('id')
      .eq('title', r.title)
      .eq('location', r.location)
      .maybeSingle()
    if (existing) {
      const { error } = await supabase.from('realizations').update(row).eq('id', existing.id)
      ok(`realizations[${r.title}] (update)`, error)
    } else {
      const { error } = await supabase.from('realizations').insert(row)
      ok(`realizations[${r.title}] (insert)`, error)
    }
  }
}

async function migrateTestimonials() {
  const json = readJson<any>('testimonials.json')
  for (const t of json.testimonials ?? []) {
    const row = {
      name: t.name,
      rating: t.rating,
      text: t.text,
      service: t.service,
      category: t.category,
      location: t.location,
      date: t.date,
      verified: !!t.verified,
    }
    const { data: existing } = await supabase
      .from('testimonials')
      .select('id')
      .eq('name', t.name)
      .eq('date', t.date)
      .eq('text', t.text)
      .maybeSingle()
    if (existing) {
      const { error } = await supabase.from('testimonials').update(row).eq('id', existing.id)
      ok(`testimonials[${t.name}/${t.date}] (update)`, error)
    } else {
      const { error } = await supabase.from('testimonials').insert(row)
      ok(`testimonials[${t.name}/${t.date}] (insert)`, error)
    }
  }
}

async function migrateBrands() {
  const json = readJson<any>('brands.json')
  let order = 0
  for (const b of json.brands ?? []) {
    const row = {
      name: b.name,
      category: b.category,
      description: b.description,
      logo_url: b.logo,
      website: b.website,
      order_index: order++,
    }
    const { data: existing } = await supabase
      .from('brands')
      .select('id')
      .eq('name', b.name)
      .maybeSingle()
    if (existing) {
      const { error } = await supabase.from('brands').update(row).eq('id', existing.id)
      ok(`brands[${b.name}] (update)`, error)
    } else {
      const { error } = await supabase.from('brands').insert(row)
      ok(`brands[${b.name}] (insert)`, error)
    }
  }
}

async function migrateAdminUsers() {
  const json = readJson<any>('admin-users.json')
  for (const u of json.users ?? json ?? []) {
    // Le fichier local écrit le hash dans `password` (cf. create-admin.ts) ;
    // on accepte aussi `passwordHash` par tolérance.
    const passwordHash = u.password ?? u.passwordHash
    if (!u.email || !passwordHash) continue
    const row = {
      email: u.email,
      password_hash: passwordHash,
      name: u.name ?? 'Admin',
      role: u.role ?? 'admin',
    }
    const { data: existing } = await supabase
      .from('admin_users')
      .select('id')
      .eq('email', u.email)
      .maybeSingle()
    if (existing) {
      const { error } = await supabase.from('admin_users').update(row).eq('id', existing.id)
      ok(`admin_users[${u.email}] (update)`, error)
    } else {
      const { error } = await supabase.from('admin_users').insert(row)
      ok(`admin_users[${u.email}] (insert)`, error)
    }
  }
}

async function main() {
  console.log(`▶ Migrating JSON → Supabase at ${SUPABASE_URL}`)
  await migrateSiteConfig()
  await migrateHomepage()
  await migrateServices()
  await migrateRealizations()
  await migrateTestimonials()
  await migrateBrands()
  await migrateAdminUsers()
  console.log(process.exitCode ? '⚠ Migration finished with errors' : '✓ Migration complete')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
