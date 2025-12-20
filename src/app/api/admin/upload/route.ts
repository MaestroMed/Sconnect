import { NextRequest, NextResponse } from 'next/server'
import { getAuthenticatedUser } from '@/lib/auth'
import { writeFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

// Check if Supabase is configured
function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  return Boolean(url && key && url.includes('supabase'))
}

// Save file locally
async function saveLocally(file: File, folder: string): Promise<string> {
  const extension = file.name.split('.').pop() || 'png'
  const uniqueFilename = `${Date.now()}-${Math.random().toString(36).substring(7)}.${extension}`
  
  const uploadsDir = path.join(process.cwd(), 'public', 'uploads', folder)
  
  // Create directory if it doesn't exist
  if (!existsSync(uploadsDir)) {
    await mkdir(uploadsDir, { recursive: true })
  }

  const filePath = path.join(uploadsDir, uniqueFilename)
  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)
  
  await writeFile(filePath, buffer)
  
  return `/uploads/${folder}/${uniqueFilename}`
}

export async function POST(request: NextRequest) {
  // Verify authentication
  const user = await getAuthenticatedUser()
  if (!user) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null
    const folder = (formData.get('folder') as string) || 'general'

    if (!file) {
      return NextResponse.json({ error: 'Aucun fichier fourni' }, { status: 400 })
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'Le fichier doit être une image' }, { status: 400 })
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: 'Le fichier ne doit pas dépasser 10MB' }, { status: 400 })
    }

    let publicUrl: string

    // Try Supabase Storage first if configured
    if (isSupabaseConfigured()) {
      try {
        const { uploadImageFromFormData } = await import('@/lib/supabase/storage')
        const url = await uploadImageFromFormData(formData, folder as any)
        
        if (url) {
          publicUrl = url
          return NextResponse.json({ url: publicUrl })
        }
      } catch (supabaseError) {
        console.warn('Supabase Storage failed, falling back to local storage:', supabaseError)
      }
    }

    // Fallback to local storage
    // Re-get file from formData since it may have been consumed
    const localFile = formData.get('file') as File
    if (!localFile) {
      // If formData was consumed, use the original file reference
      publicUrl = await saveLocally(file, folder)
    } else {
      publicUrl = await saveLocally(localFile, folder)
    }

    return NextResponse.json({ url: publicUrl })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Erreur serveur lors de l\'upload' }, { status: 500 })
  }
}
