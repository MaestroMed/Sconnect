import { NextRequest, NextResponse } from 'next/server'
import { getAuthenticatedUser } from '@/lib/auth'

// Check if Supabase is configured
function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  return Boolean(url && key && url.includes('supabase'))
}

// Dossiers autorisés — doit rester aligné avec ImageFolder (lib/supabase/storage)
const ALLOWED_FOLDERS = new Set(['logos', 'realizations', 'brands', 'hero', 'general'])

// Détection du type réel par magic bytes : file.type vient du client et ne
// prouve rien (un .html renommé passerait le check `startsWith('image/')`).
function detectImageType(buffer: Buffer): { contentType: string; extension: string } | null {
  if (buffer.length < 12) return null
  // JPEG: FF D8 FF
  if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return { contentType: 'image/jpeg', extension: 'jpg' }
  }
  // PNG: 89 50 4E 47 0D 0A 1A 0A
  if (
    buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4e && buffer[3] === 0x47 &&
    buffer[4] === 0x0d && buffer[5] === 0x0a && buffer[6] === 0x1a && buffer[7] === 0x0a
  ) {
    return { contentType: 'image/png', extension: 'png' }
  }
  // GIF: "GIF87a" / "GIF89a"
  if (buffer.subarray(0, 6).toString('ascii') === 'GIF87a' || buffer.subarray(0, 6).toString('ascii') === 'GIF89a') {
    return { contentType: 'image/gif', extension: 'gif' }
  }
  // WebP: "RIFF" .... "WEBP"
  if (
    buffer.subarray(0, 4).toString('ascii') === 'RIFF' &&
    buffer.subarray(8, 12).toString('ascii') === 'WEBP'
  ) {
    return { contentType: 'image/webp', extension: 'webp' }
  }
  // AVIF: boîte ISO-BMFF "ftypavif" à l'offset 4
  if (buffer.subarray(4, 12).toString('ascii') === 'ftypavif') {
    return { contentType: 'image/avif', extension: 'avif' }
  }
  // SVG (XML texte) : balise <svg dans les premiers Ko — testé en dernier,
  // après les signatures binaires. Nécessaire : les logos du site sont des SVG.
  if (buffer.subarray(0, 4096).toString('utf8').toLowerCase().includes('<svg')) {
    return { contentType: 'image/svg+xml', extension: 'svg' }
  }
  return null
}

export async function POST(request: NextRequest) {
  // Verify authentication
  const user = await getAuthenticatedUser()
  if (!user) {
    return NextResponse.json({ error: 'Non autorisé - veuillez vous reconnecter' }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null
    const folder = (formData.get('folder') as string) || 'general'

    if (!file) {
      return NextResponse.json({ error: 'Aucun fichier fourni' }, { status: 400 })
    }

    if (!ALLOWED_FOLDERS.has(folder)) {
      return NextResponse.json({ error: 'Dossier de destination invalide' }, { status: 400 })
    }

    // Validate file size (max 5MB for Vercel)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'Le fichier ne doit pas dépasser 5MB' }, { status: 400 })
    }

    // Read file content into buffer before any async operations
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const detected = detectImageType(buffer)
    if (!detected) {
      return NextResponse.json(
        { error: 'Le fichier doit être une image (JPEG, PNG, GIF, WebP, AVIF ou SVG)' },
        { status: 400 }
      )
    }
    const { contentType, extension } = detected

    // Try Supabase Storage if configured
    if (isSupabaseConfigured()) {
      try {
        const { createServiceClient } = await import('@/lib/supabase/server')
        const supabase = createServiceClient()

        const uniqueFilename = `${Date.now()}-${Math.random().toString(36).substring(7)}.${extension}`
        const filePath = `${folder}/${uniqueFilename}`

        const { error } = await supabase.storage
          .from('sconnectfrance')
          .upload(filePath, buffer, {
            contentType,
            upsert: false
          })

        if (error) {
          console.error('Supabase upload error:', error)
          return NextResponse.json({
            error: `Supabase: ${error.message}`
          }, { status: 500 })
        }

        const { data: { publicUrl } } = supabase.storage
          .from('sconnectfrance')
          .getPublicUrl(filePath)

        return NextResponse.json({ url: publicUrl })
      } catch (supabaseError: any) {
        console.error('Supabase error:', supabaseError)
        return NextResponse.json({
          error: `Supabase: ${supabaseError?.message || 'Erreur inconnue'}`
        }, { status: 500 })
      }
    }

    // Fallback: return error since local storage doesn't work on Vercel
    return NextResponse.json({
      error: 'Supabase Storage non configuré'
    }, { status: 500 })
  } catch (error: any) {
    console.error('Upload error:', error)
    return NextResponse.json({
      error: `Erreur serveur: ${error?.message || 'Erreur inconnue'}`
    }, { status: 500 })
  }
}
