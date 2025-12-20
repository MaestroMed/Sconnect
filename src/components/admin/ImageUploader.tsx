'use client'

import { useState, useRef, useCallback } from 'react'
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react'
import Image from 'next/image'

interface ImageUploaderProps {
  value?: string
  onChange: (url: string) => void
  folder?: 'logos' | 'realizations' | 'brands' | 'hero' | 'general'
  label?: string
  accept?: string
  maxSize?: number // in MB
  className?: string
  aspectRatio?: 'square' | '16/9' | '4/3' | 'auto'
}

export function ImageUploader({
  value,
  onChange,
  folder = 'general',
  label = 'Image',
  accept = 'image/*',
  maxSize = 5,
  className = '',
  aspectRatio = 'auto'
}: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [dragOver, setDragOver] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = useCallback(async (file: File) => {
    setError(null)

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Le fichier doit être une image')
      return
    }

    // Validate file size
    if (file.size > maxSize * 1024 * 1024) {
      setError(`Le fichier ne doit pas dépasser ${maxSize}MB`)
      return
    }

    setIsUploading(true)

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('folder', folder)

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Erreur lors de l\'upload')
      }

      const data = await response.json()
      onChange(data.url)
    } catch (err) {
      console.error('Upload error:', err)
      setError(err instanceof Error ? err.message : 'Erreur lors de l\'upload')
    } finally {
      setIsUploading(false)
    }
  }, [folder, maxSize, onChange])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = () => {
    setDragOver(false)
  }

  const handleClear = () => {
    onChange('')
    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  const openFileDialog = () => {
    inputRef.current?.click()
  }

  const aspectRatioClass = {
    'square': 'aspect-square',
    '16/9': 'aspect-video',
    '4/3': 'aspect-[4/3]',
    'auto': 'min-h-[200px]'
  }[aspectRatio]

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      
      <div
        className={`
          relative border-2 border-dashed rounded-lg transition-all cursor-pointer
          ${aspectRatioClass}
          ${dragOver 
            ? 'border-primary-500 bg-primary-50' 
            : 'border-gray-300 hover:border-gray-400'
          }
          ${isUploading ? 'pointer-events-none opacity-50' : ''}
        `}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={openFileDialog}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={handleInputChange}
          className="hidden"
        />

        {value ? (
          <div className="relative w-full h-full group">
            <Image
              src={value}
              alt={label}
              fill
              className="object-contain rounded-lg"
              unoptimized
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  openFileDialog()
                }}
                className="p-2 bg-white rounded-full hover:bg-gray-100"
              >
                <Upload className="w-5 h-5 text-gray-700" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  handleClear()
                }}
                className="p-2 bg-red-500 rounded-full hover:bg-red-600"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4">
            {isUploading ? (
              <>
                <Loader2 className="w-10 h-10 text-primary-500 animate-spin" />
                <span className="text-sm text-gray-500">Upload en cours...</span>
              </>
            ) : (
              <>
                <ImageIcon className="w-10 h-10 text-gray-400" />
                <span className="text-sm text-gray-500 text-center">
                  Cliquez ou glissez une image ici
                </span>
                <span className="text-xs text-gray-400">
                  Max {maxSize}MB • {accept.replace('image/', '').toUpperCase()}
                </span>
              </>
            )}
          </div>
        )}
      </div>

      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}

      {/* Manual URL input as fallback */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-500">ou</span>
        <input
          type="text"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Entrer l'URL de l'image"
          className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded-md bg-white text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
      </div>
    </div>
  )
}

// Multiple images uploader
interface MultiImageUploaderProps {
  values: string[]
  onChange: (urls: string[]) => void
  folder?: 'logos' | 'realizations' | 'brands' | 'hero' | 'general'
  label?: string
  maxImages?: number
  maxSize?: number
}

export function MultiImageUploader({
  values,
  onChange,
  folder = 'general',
  label = 'Images',
  maxImages = 10,
  maxSize = 5
}: MultiImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (files: FileList) => {
    setError(null)
    
    const newFiles = Array.from(files).slice(0, maxImages - values.length)
    if (newFiles.length === 0) {
      setError(`Maximum ${maxImages} images`)
      return
    }

    setIsUploading(true)
    const uploadedUrls: string[] = []

    try {
      for (const file of newFiles) {
        if (!file.type.startsWith('image/')) continue
        if (file.size > maxSize * 1024 * 1024) continue

        const formData = new FormData()
        formData.append('file', file)
        formData.append('folder', folder)

        const response = await fetch('/api/admin/upload', {
          method: 'POST',
          body: formData,
        })

        if (response.ok) {
          const data = await response.json()
          uploadedUrls.push(data.url)
        }
      }

      if (uploadedUrls.length > 0) {
        onChange([...values, ...uploadedUrls])
      }
    } catch (err) {
      console.error('Upload error:', err)
      setError('Erreur lors de l\'upload')
    } finally {
      setIsUploading(false)
    }
  }

  const handleRemove = (index: number) => {
    onChange(values.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {values.map((url, index) => (
          <div key={index} className="relative aspect-square group">
            <Image
              src={url}
              alt={`Image ${index + 1}`}
              fill
              className="object-cover rounded-lg border border-gray-200"
              unoptimized
            />
            <button
              type="button"
              onClick={() => handleRemove(index)}
              className="absolute -top-2 -right-2 p-1 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>
        ))}

        {values.length < maxImages && (
          <div
            onClick={() => inputRef.current?.click()}
            className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary-500 transition-colors"
          >
            {isUploading ? (
              <Loader2 className="w-8 h-8 text-primary-500 animate-spin" />
            ) : (
              <>
                <Upload className="w-8 h-8 text-gray-400" />
                <span className="text-xs text-gray-500 mt-1">Ajouter</span>
              </>
            )}
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={(e) => e.target.files && handleFileSelect(e.target.files)}
        className="hidden"
      />

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  )
}



