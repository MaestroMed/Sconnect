'use client'

import { useState, useEffect, useRef } from 'react'
import { Save, Upload, Image as ImageIcon, Loader2, CheckCircle, Plus, Trash2, X } from 'lucide-react'
import Image from 'next/image'

interface Partner {
  id: string
  name: string
  logo: string
}

interface MediaData {
  logo: string
  logo_white: string
  favicon: string
  hero_image: string
  og_image: string
  partners: Partner[]
}

export default function MediaAdminPage() {
  const [data, setData] = useState<MediaData | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [newPartner, setNewPartner] = useState({ name: '', logo: '' })
  const [uploading, setUploading] = useState<string | null>(null)
  
  const logoInputRef = useRef<HTMLInputElement>(null)
  const logoWhiteInputRef = useRef<HTMLInputElement>(null)
  const heroInputRef = useRef<HTMLInputElement>(null)
  const partnerLogoInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    try {
      const res = await fetch('/api/admin/media')
      if (res.ok) {
        const media = await res.json()
        setData(media)
      }
    } catch (error) {
      console.error('Error fetching media:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleSave() {
    if (!data) return
    setSaving(true)

    try {
      const res = await fetch('/api/admin/media', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      if (res.ok) {
        setSaved(true)
        setTimeout(() => setSaved(false), 3000)
      }
    } catch (error) {
      console.error('Error saving media:', error)
    } finally {
      setSaving(false)
    }
  }

  async function uploadImage(file: File, folder: string, field: keyof MediaData) {
    setUploading(field)
    
    const formData = new FormData()
    formData.append('file', file)
    formData.append('folder', folder)

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData
      })

      if (res.ok) {
        const { url } = await res.json()
        setData(prev => prev ? { ...prev, [field]: url } : null)
      }
    } catch (error) {
      console.error('Upload error:', error)
    } finally {
      setUploading(null)
    }
  }

  async function uploadPartnerLogo(file: File) {
    setUploading('partner')
    
    const formData = new FormData()
    formData.append('file', file)
    formData.append('folder', 'brands')

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData
      })

      if (res.ok) {
        const { url } = await res.json()
        setNewPartner(prev => ({ ...prev, logo: url }))
      }
    } catch (error) {
      console.error('Upload error:', error)
    } finally {
      setUploading(null)
    }
  }

  function addPartner() {
    if (!data || !newPartner.name || !newPartner.logo) return
    
    const partner: Partner = {
      id: Date.now().toString(),
      name: newPartner.name,
      logo: newPartner.logo
    }
    
    setData({ ...data, partners: [...(data.partners || []), partner] })
    setNewPartner({ name: '', logo: '' })
  }

  function removePartner(id: string) {
    if (!data) return
    setData({ ...data, partners: data.partners.filter(p => p.id !== id) })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
      </div>
    )
  }

  if (!data) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
        Erreur lors du chargement des données.
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-dark-900">Médias & Logos</h1>
          <p className="text-dark-500">Gérez les images du site avec le sélecteur de fichiers</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
        >
          {saving ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : saved ? (
            <CheckCircle className="w-5 h-5" />
          ) : (
            <Save className="w-5 h-5" />
          )}
          {saving ? "Enregistrement..." : saved ? "Enregistré !" : "Enregistrer"}
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Logo principal */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-dark-900 mb-4 flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-primary-500" />
            Logo principal
          </h2>
          <div className="space-y-4">
            <div 
              onClick={() => logoInputRef.current?.click()}
              className="bg-dark-100 rounded-lg p-4 flex items-center justify-center min-h-[120px] cursor-pointer hover:bg-dark-200 transition-colors border-2 border-dashed border-dark-300 hover:border-primary-500"
            >
              {uploading === 'logo' ? (
                <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
              ) : data.logo ? (
                <div className="relative">
                  <Image src={data.logo} alt="Logo" width={200} height={80} className="max-h-20 object-contain" unoptimized />
                </div>
              ) : (
                <div className="text-center">
                  <Upload className="w-8 h-8 mx-auto text-dark-400 mb-2" />
                  <span className="text-dark-500">Cliquez pour sélectionner un fichier</span>
                </div>
              )}
            </div>
            <input
              ref={logoInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={e => {
                const file = e.target.files?.[0]
                if (file) uploadImage(file, 'logos', 'logo')
              }}
            />
            {data.logo && (
              <button
                onClick={() => setData({ ...data, logo: '' })}
                className="text-sm text-red-600 hover:text-red-700"
              >
                Supprimer le logo
              </button>
            )}
          </div>
        </div>

        {/* Logo blanc */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-dark-900 mb-4 flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-primary-500" />
            Logo blanc (footer)
          </h2>
          <div className="space-y-4">
            <div 
              onClick={() => logoWhiteInputRef.current?.click()}
              className="bg-dark-800 rounded-lg p-4 flex items-center justify-center min-h-[120px] cursor-pointer hover:bg-dark-700 transition-colors border-2 border-dashed border-dark-600 hover:border-primary-500"
            >
              {uploading === 'logo_white' ? (
                <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
              ) : data.logo_white ? (
                <Image src={data.logo_white} alt="Logo blanc" width={200} height={80} className="max-h-20 object-contain" unoptimized />
              ) : (
                <div className="text-center">
                  <Upload className="w-8 h-8 mx-auto text-dark-400 mb-2" />
                  <span className="text-dark-400">Cliquez pour sélectionner</span>
                </div>
              )}
            </div>
            <input
              ref={logoWhiteInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={e => {
                const file = e.target.files?.[0]
                if (file) uploadImage(file, 'logos', 'logo_white')
              }}
            />
          </div>
        </div>

        {/* Image Hero */}
        <div className="bg-white rounded-xl p-6 shadow-sm lg:col-span-2">
          <h2 className="text-lg font-semibold text-dark-900 mb-4 flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-primary-500" />
            Image Hero (page d&apos;accueil)
          </h2>
          <div className="space-y-4">
            <div 
              onClick={() => heroInputRef.current?.click()}
              className="bg-dark-100 rounded-lg overflow-hidden min-h-[200px] cursor-pointer hover:opacity-90 transition-opacity border-2 border-dashed border-dark-300 hover:border-primary-500 flex items-center justify-center"
            >
              {uploading === 'hero_image' ? (
                <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
              ) : data.hero_image ? (
                <div className="relative w-full h-[200px]">
                  <Image src={data.hero_image} alt="Hero" fill className="object-cover" unoptimized />
                  <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white font-medium">Cliquez pour changer</span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-10">
                  <Upload className="w-10 h-10 mx-auto text-dark-400 mb-2" />
                  <span className="text-dark-500">Cliquez pour sélectionner l&apos;image hero</span>
                </div>
              )}
            </div>
            <input
              ref={heroInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={e => {
                const file = e.target.files?.[0]
                if (file) uploadImage(file, 'hero', 'hero_image')
              }}
            />
          </div>
        </div>

        {/* Favicon & OG Image */}
        <div className="bg-white rounded-xl p-6 shadow-sm lg:col-span-2">
          <h2 className="text-lg font-semibold text-dark-900 mb-4 flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-primary-500" />
            Favicon & OG Image
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-dark-700 mb-1">
                Favicon (URL)
              </label>
              <input
                type="text"
                value={data.favicon}
                onChange={e => setData({ ...data, favicon: e.target.value })}
                placeholder="/favicon.ico"
                className="w-full px-4 py-2 border border-dark-200 rounded-lg bg-white text-dark-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-700 mb-1">
                OG Image - réseaux sociaux (URL)
              </label>
              <input
                type="text"
                value={data.og_image}
                onChange={e => setData({ ...data, og_image: e.target.value })}
                placeholder="/images/og-image.jpg"
                className="w-full px-4 py-2 border border-dark-200 rounded-lg bg-white text-dark-900"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Partenaires - "Ils nous font confiance" */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-dark-900 mb-4 flex items-center gap-2">
          <Upload className="w-5 h-5 text-primary-500" />
          Logos partenaires - &quot;Ils nous font confiance&quot;
        </h2>
        
        {/* Liste des partenaires */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
          {(data.partners || []).map(partner => (
            <div key={partner.id} className="relative bg-dark-50 rounded-lg p-4 group">
              <button
                onClick={() => removePartner(partner.id)}
                className="absolute -top-2 -right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
              >
                <X className="w-3 h-3" />
              </button>
              <div className="h-12 flex items-center justify-center mb-2">
                {partner.logo ? (
                  <Image src={partner.logo} alt={partner.name} width={80} height={48} className="max-h-full max-w-full object-contain" unoptimized />
                ) : (
                  <ImageIcon className="w-8 h-8 text-dark-300" />
                )}
              </div>
              <p className="text-xs text-center text-dark-600 truncate">{partner.name}</p>
            </div>
          ))}
        </div>

        {/* Ajouter un partenaire */}
        <div className="border-t border-dark-100 pt-4">
          <h3 className="text-sm font-medium text-dark-700 mb-3">Ajouter un partenaire / client</h3>
          <div className="flex flex-wrap gap-4">
            <input
              type="text"
              value={newPartner.name}
              onChange={e => setNewPartner({ ...newPartner, name: e.target.value })}
              placeholder="Nom du partenaire"
              className="flex-1 min-w-[200px] px-4 py-2 border border-dark-200 rounded-lg bg-white text-dark-900"
            />
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => partnerLogoInputRef.current?.click()}
                className="flex items-center gap-2 px-4 py-2 bg-dark-100 hover:bg-dark-200 text-dark-700 rounded-lg transition-colors"
              >
                {uploading === 'partner' ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Upload className="w-5 h-5" />
                )}
                {newPartner.logo ? 'Logo sélectionné ✓' : 'Sélectionner logo'}
              </button>
              <input
                ref={partnerLogoInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={e => {
                  const file = e.target.files?.[0]
                  if (file) uploadPartnerLogo(file)
                }}
              />
            </div>
            
            <button
              onClick={addPartner}
              disabled={!newPartner.name || !newPartner.logo}
              className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Plus className="w-5 h-5" />
              Ajouter
            </button>
          </div>
          
          {newPartner.logo && (
            <div className="mt-3 flex items-center gap-2">
              <span className="text-sm text-dark-500">Aperçu:</span>
              <Image src={newPartner.logo} alt="Aperçu" width={60} height={40} className="h-10 object-contain" unoptimized />
              <button
                onClick={() => setNewPartner({ ...newPartner, logo: '' })}
                className="text-sm text-red-600"
              >
                Supprimer
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
