'use client'

import { useState, useEffect } from 'react'
import { Save, Eye, Upload, Image as ImageIcon, Type, MessageSquare, BarChart3, Star, Megaphone, Building2 } from 'lucide-react'

interface HomepageData {
  id: string
  hero_title: string
  hero_subtitle: string
  hero_cta_primary: string
  hero_cta_secondary: string
  hero_image_url: string | null
  hero_video_url: string | null
  about_title: string
  about_description: string
  about_features: Array<{ icon: string; title: string; description: string }>
  services_title: string
  services_subtitle: string
  stats_title: string
  testimonials_title: string
  testimonials_subtitle: string
  cta_title: string
  cta_subtitle: string
  cta_button: string
  brands_title: string
  brands_subtitle: string
}

export default function HomepageAdminPage() {
  const [data, setData] = useState<HomepageData | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  const [activeTab, setActiveTab] = useState<'hero' | 'about' | 'sections'>('hero')

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    try {
      const res = await fetch('/api/admin/homepage')
      if (res.ok) {
        const homepage = await res.json()
        setData(homepage)
      }
    } catch (error) {
      console.error('Error fetching homepage:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleSave() {
    if (!data) return
    setSaving(true)
    setMessage(null)

    try {
      const res = await fetch('/api/admin/homepage', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      if (res.ok) {
        setMessage({ type: 'success', text: 'Modifications enregistrées avec succès !' })
      } else {
        setMessage({ type: 'error', text: 'Erreur lors de la sauvegarde' })
      }
    } catch {
      setMessage({ type: 'error', text: 'Erreur de connexion' })
    } finally {
      setSaving(false)
    }
  }

  async function handleImageUpload(field: 'hero_image_url', file: File) {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('folder', 'hero')

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
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-electric-500"></div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-400">
        Erreur lors du chargement des données. Vérifiez la connexion à la base de données.
      </div>
    )
  }

  const tabs = [
    { id: 'hero', label: 'Hero & Header', icon: ImageIcon },
    { id: 'about', label: 'À propos', icon: Type },
    { id: 'sections', label: 'Sections', icon: BarChart3 },
  ] as const

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-white">Page d&apos;accueil</h1>
          <p className="text-dark-400 mt-1">Gérez le contenu de la page d&apos;accueil</p>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="/"
            target="_blank"
            className="flex items-center gap-2 px-4 py-2 bg-dark-700 hover:bg-dark-600 text-white rounded-lg transition-colors"
          >
            <Eye className="w-4 h-4" />
            Voir le site
          </a>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-electric-500 hover:bg-electric-600 text-white rounded-lg transition-colors disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {saving ? 'Enregistrement...' : 'Enregistrer'}
          </button>
        </div>
      </div>

      {/* Message */}
      {message && (
        <div className={`p-4 rounded-lg ${message.type === 'success' ? 'bg-green-500/10 border border-green-500/20 text-green-400' : 'bg-red-500/10 border border-red-500/20 text-red-400'}`}>
          {message.text}
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 border-b border-dark-700 pb-2">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              activeTab === tab.id
                ? 'bg-electric-500 text-white'
                : 'text-dark-400 hover:text-white hover:bg-dark-700'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Hero Tab */}
      {activeTab === 'hero' && (
        <div className="grid gap-6">
          <div className="bg-dark-800 rounded-xl p-6 border border-dark-700">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-electric-500" />
              Section Hero
            </h2>
            
            <div className="grid gap-4">
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">Titre principal</label>
                <input
                  type="text"
                  value={data.hero_title}
                  onChange={e => setData({ ...data, hero_title: e.target.value })}
                  className="w-full px-4 py-3 bg-white text-dark-900 border border-dark-600 rounded-lg focus:ring-2 focus:ring-electric-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">Sous-titre</label>
                <textarea
                  value={data.hero_subtitle}
                  onChange={e => setData({ ...data, hero_subtitle: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 bg-white text-dark-900 border border-dark-600 rounded-lg focus:ring-2 focus:ring-electric-500 focus:border-transparent"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-2">Bouton principal (CTA)</label>
                  <input
                    type="text"
                    value={data.hero_cta_primary}
                    onChange={e => setData({ ...data, hero_cta_primary: e.target.value })}
                    className="w-full px-4 py-3 bg-white text-dark-900 border border-dark-600 rounded-lg focus:ring-2 focus:ring-electric-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-2">Bouton secondaire</label>
                  <input
                    type="text"
                    value={data.hero_cta_secondary}
                    onChange={e => setData({ ...data, hero_cta_secondary: e.target.value })}
                    className="w-full px-4 py-3 bg-white text-dark-900 border border-dark-600 rounded-lg focus:ring-2 focus:ring-electric-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">Image Hero</label>
                <div className="flex items-center gap-4">
                  {data.hero_image_url ? (
                    <div className="relative w-48 h-32 rounded-lg overflow-hidden bg-dark-700">
                      <img src={data.hero_image_url} alt="Hero" className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="w-48 h-32 rounded-lg bg-dark-700 flex items-center justify-center text-dark-400">
                      <ImageIcon className="w-8 h-8" />
                    </div>
                  )}
                  <label className="flex items-center gap-2 px-4 py-2 bg-dark-700 hover:bg-dark-600 text-white rounded-lg cursor-pointer transition-colors">
                    <Upload className="w-4 h-4" />
                    Télécharger
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={e => {
                        const file = e.target.files?.[0]
                        if (file) handleImageUpload('hero_image_url', file)
                      }}
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">URL Vidéo (optionnel)</label>
                <input
                  type="text"
                  value={data.hero_video_url || ''}
                  onChange={e => setData({ ...data, hero_video_url: e.target.value || null })}
                  placeholder="https://youtube.com/embed/..."
                  className="w-full px-4 py-3 bg-white text-dark-900 border border-dark-600 rounded-lg focus:ring-2 focus:ring-electric-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* About Tab */}
      {activeTab === 'about' && (
        <div className="grid gap-6">
          <div className="bg-dark-800 rounded-xl p-6 border border-dark-700">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Type className="w-5 h-5 text-electric-500" />
              Section À propos
            </h2>
            
            <div className="grid gap-4">
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">Titre</label>
                <input
                  type="text"
                  value={data.about_title}
                  onChange={e => setData({ ...data, about_title: e.target.value })}
                  className="w-full px-4 py-3 bg-white text-dark-900 border border-dark-600 rounded-lg focus:ring-2 focus:ring-electric-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">Description</label>
                <textarea
                  value={data.about_description}
                  onChange={e => setData({ ...data, about_description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 bg-white text-dark-900 border border-dark-600 rounded-lg focus:ring-2 focus:ring-electric-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">Caractéristiques (JSON)</label>
                <textarea
                  value={JSON.stringify(data.about_features, null, 2)}
                  onChange={e => {
                    try {
                      const features = JSON.parse(e.target.value)
                      setData({ ...data, about_features: features })
                    } catch {
                      // Invalid JSON, ignore
                    }
                  }}
                  rows={8}
                  className="w-full px-4 py-3 bg-white text-dark-900 border border-dark-600 rounded-lg focus:ring-2 focus:ring-electric-500 focus:border-transparent font-mono text-sm"
                />
                <p className="text-dark-500 text-xs mt-1">Format: [{`{"icon": "Shield", "title": "...", "description": "..."}`}]</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sections Tab */}
      {activeTab === 'sections' && (
        <div className="grid gap-6">
          {/* Services Section */}
          <div className="bg-dark-800 rounded-xl p-6 border border-dark-700">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-electric-500" />
              Section Services
            </h2>
            <div className="grid gap-4">
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">Titre</label>
                <input
                  type="text"
                  value={data.services_title}
                  onChange={e => setData({ ...data, services_title: e.target.value })}
                  className="w-full px-4 py-3 bg-white text-dark-900 border border-dark-600 rounded-lg focus:ring-2 focus:ring-electric-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">Sous-titre</label>
                <input
                  type="text"
                  value={data.services_subtitle}
                  onChange={e => setData({ ...data, services_subtitle: e.target.value })}
                  className="w-full px-4 py-3 bg-white text-dark-900 border border-dark-600 rounded-lg focus:ring-2 focus:ring-electric-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="bg-dark-800 rounded-xl p-6 border border-dark-700">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-security-500" />
              Section Statistiques
            </h2>
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-2">Titre</label>
              <input
                type="text"
                value={data.stats_title}
                onChange={e => setData({ ...data, stats_title: e.target.value })}
                className="w-full px-4 py-3 bg-white text-dark-900 border border-dark-600 rounded-lg focus:ring-2 focus:ring-electric-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Testimonials Section */}
          <div className="bg-dark-800 rounded-xl p-6 border border-dark-700">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              Section Témoignages
            </h2>
            <div className="grid gap-4">
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">Titre</label>
                <input
                  type="text"
                  value={data.testimonials_title}
                  onChange={e => setData({ ...data, testimonials_title: e.target.value })}
                  className="w-full px-4 py-3 bg-white text-dark-900 border border-dark-600 rounded-lg focus:ring-2 focus:ring-electric-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">Sous-titre</label>
                <input
                  type="text"
                  value={data.testimonials_subtitle}
                  onChange={e => setData({ ...data, testimonials_subtitle: e.target.value })}
                  className="w-full px-4 py-3 bg-white text-dark-900 border border-dark-600 rounded-lg focus:ring-2 focus:ring-electric-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-dark-800 rounded-xl p-6 border border-dark-700">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Megaphone className="w-5 h-5 text-lock-500" />
              Section Call-to-Action
            </h2>
            <div className="grid gap-4">
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">Titre</label>
                <input
                  type="text"
                  value={data.cta_title}
                  onChange={e => setData({ ...data, cta_title: e.target.value })}
                  className="w-full px-4 py-3 bg-white text-dark-900 border border-dark-600 rounded-lg focus:ring-2 focus:ring-electric-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">Sous-titre</label>
                <input
                  type="text"
                  value={data.cta_subtitle}
                  onChange={e => setData({ ...data, cta_subtitle: e.target.value })}
                  className="w-full px-4 py-3 bg-white text-dark-900 border border-dark-600 rounded-lg focus:ring-2 focus:ring-electric-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">Texte du bouton</label>
                <input
                  type="text"
                  value={data.cta_button}
                  onChange={e => setData({ ...data, cta_button: e.target.value })}
                  className="w-full px-4 py-3 bg-white text-dark-900 border border-dark-600 rounded-lg focus:ring-2 focus:ring-electric-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Brands Section */}
          <div className="bg-dark-800 rounded-xl p-6 border border-dark-700">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-electric-500" />
              Section Marques
            </h2>
            <div className="grid gap-4">
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">Titre</label>
                <input
                  type="text"
                  value={data.brands_title}
                  onChange={e => setData({ ...data, brands_title: e.target.value })}
                  className="w-full px-4 py-3 bg-white text-dark-900 border border-dark-600 rounded-lg focus:ring-2 focus:ring-electric-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">Sous-titre</label>
                <input
                  type="text"
                  value={data.brands_subtitle}
                  onChange={e => setData({ ...data, brands_subtitle: e.target.value })}
                  className="w-full px-4 py-3 bg-white text-dark-900 border border-dark-600 rounded-lg focus:ring-2 focus:ring-electric-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}




