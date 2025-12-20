import { createServiceClient } from './server'

export type ImageFolder = 'logos' | 'realizations' | 'brands' | 'hero' | 'general'

/**
 * Upload an image to Supabase Storage
 * @param file - The file to upload (as base64 or Buffer)
 * @param folder - The folder to upload to
 * @param filename - Optional custom filename
 * @returns The public URL of the uploaded image
 */
export async function uploadImage(
  file: Buffer | string,
  folder: ImageFolder,
  filename?: string
): Promise<string | null> {
  const supabase = createServiceClient()
  
  // Generate unique filename if not provided
  const uniqueFilename = filename || `${Date.now()}-${Math.random().toString(36).substring(7)}`
  const filePath = `${folder}/${uniqueFilename}`
  
  // Convert base64 to Buffer if needed
  let fileBuffer: Buffer
  if (typeof file === 'string') {
    // Remove data URL prefix if present
    const base64Data = file.replace(/^data:image\/\w+;base64,/, '')
    fileBuffer = Buffer.from(base64Data, 'base64')
  } else {
    fileBuffer = file
  }
  
  const { error } = await supabase.storage
    .from('sconnectfrance')
    .upload(filePath, fileBuffer, {
      contentType: 'image/png', // Auto-detect would be better
      upsert: true
    })
  
  if (error) {
    console.error('Error uploading image:', error)
    return null
  }
  
  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from('sconnectfrance')
    .getPublicUrl(filePath)
  
  return publicUrl
}

/**
 * Upload an image from a File object (for API routes)
 */
export async function uploadImageFromFormData(
  formData: FormData,
  folder: ImageFolder
): Promise<string | null> {
  const file = formData.get('file') as File
  if (!file) return null
  
  const supabase = createServiceClient()
  
  // Generate unique filename
  const extension = file.name.split('.').pop() || 'png'
  const uniqueFilename = `${Date.now()}-${Math.random().toString(36).substring(7)}.${extension}`
  const filePath = `${folder}/${uniqueFilename}`
  
  // Convert File to ArrayBuffer then to Buffer
  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)
  
  const { error } = await supabase.storage
    .from('sconnectfrance')
    .upload(filePath, buffer, {
      contentType: file.type,
      upsert: true
    })
  
  if (error) {
    console.error('Error uploading image:', error)
    return null
  }
  
  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from('sconnectfrance')
    .getPublicUrl(filePath)
  
  return publicUrl
}

/**
 * Delete an image from Supabase Storage
 * @param url - The public URL of the image
 */
export async function deleteImage(url: string): Promise<boolean> {
  const supabase = createServiceClient()
  
  // Extract file path from URL
  const urlObj = new URL(url)
  const pathParts = urlObj.pathname.split('/storage/v1/object/public/sconnectfrance/')
  if (pathParts.length < 2) return false
  
  const filePath = pathParts[1]
  
  const { error } = await supabase.storage
    .from('sconnectfrance')
    .remove([filePath])
  
  if (error) {
    console.error('Error deleting image:', error)
    return false
  }
  
  return true
}

/**
 * List all images in a folder
 */
export async function listImages(folder: ImageFolder): Promise<string[]> {
  const supabase = createServiceClient()
  
  const { data, error } = await supabase.storage
    .from('sconnectfrance')
    .list(folder)
  
  if (error) {
    console.error('Error listing images:', error)
    return []
  }
  
  return data.map(file => {
    const { data: { publicUrl } } = supabase.storage
      .from('sconnectfrance')
      .getPublicUrl(`${folder}/${file.name}`)
    return publicUrl
  })
}




