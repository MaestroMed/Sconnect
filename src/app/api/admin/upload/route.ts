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
  console.log('Upload request received')
  
  // Verify authentication
  const user = await getAuthenticatedUser()
  if (!user) {
    console.log('Upload rejected: not authenticated')
    return NextResponse.json({ error: 'Non autorisé - veuillez vous reconnecter' }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null
    const folder = (formData.get('folder') as string) || 'general'

    if (!file) {
      return NextResponse.json({ error: 'Aucun fichier fourni' }, { status: 400 })
    }

    console.log('File received:', { name: file.name, type: file.type, size: file.size, folder })

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'Le fichier doit être une image' }, { status: 400 })
    }

    // Validate file size (max 5MB for Vercel)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'Le fichier ne doit pas dépasser 5MB' }, { status: 400 })
    }

    // Read file content into buffer before any async operations
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const extension = file.name.split('.').pop() || 'png'
    const contentType = file.type

    // Try Supabase Storage if configured
    if (isSupabaseConfigured()) {
      try {
        console.log('Uploading to Supabase Storage...')
        const { createServiceClient } = await import('@/lib/supabase/server')
        const supabase = createServiceClient()
        
        const uniqueFilename = `${Date.now()}-${Math.random().toString(36).substring(7)}.${extension}`
        const filePath = `${folder}/${uniqueFilename}`
        
        const { error } = await supabase.storage
          .from('sconnectfrance')
          .upload(filePath, buffer, {
            contentType,
            upsert: true
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
        
        console.log('Upload successful:', publicUrl)
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
