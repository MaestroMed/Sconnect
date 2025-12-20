'use client'

import { useState, useEffect } from 'react'
import { Save, Loader2, CheckCircle, ChevronDown, ChevronUp, Edit2, Plus, Trash2 } from 'lucide-react'

interface ServicePrestation {
  title: string
  items: string[]
}

interface ServiceFaq {
  question: string
  answer: string
}

interface Service {
  id: string
  name: string
  slug: string
  icon: string
  description: string
  fullDescription: string
  prestations: ServicePrestation[]
  faqs: ServiceFaq[]
}

interface ServiceCategory {
  id: string
  name: string
  slug: string
  icon: string
  color: string
  shortDescription: string
  services: Service[]
}

interface ServicesData {
  categories: ServiceCategory[]
}

export default function ServicesAdminPage() {
  const [data, setData] = useState<ServicesData | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null)

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    try {
      const res = await fetch('/api/admin/services')
      if (res.ok) {
        const services = await res.json()
        setData(services)
      }
    } catch (error) {
      console.error('Error fetching services:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleSave() {
    if (!data) return
    setSaving(true)

    try {
      const res = await fetch('/api/admin/services', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      if (res.ok) {
        setSaved(true)
        setTimeout(() => setSaved(false), 3000)
      }
    } catch (error) {
      console.error('Error saving services:', error)
    } finally {
      setSaving(false)
    }
  }

  function updateCategory(categoryId: string, updates: Partial<ServiceCategory>) {
    if (!data) return
    setData({
      ...data,
      categories: data.categories.map(cat =>
        cat.id === categoryId ? { ...cat, ...updates } : cat
      )
    })
  }

  function updateService(categoryId: string, serviceId: string, updates: Partial<Service>) {
    if (!data) return
    setData({
      ...data,
      categories: data.categories.map(cat =>
        cat.id === categoryId
          ? {
              ...cat,
              services: cat.services.map(svc =>
                svc.id === serviceId ? { ...svc, ...updates } : svc
              )
            }
          : cat
      )
    })
  }

  function saveEditingService() {
    if (!editingService || !editingCategoryId) return
    updateService(editingCategoryId, editingService.id, editingService)
    setEditingService(null)
    setEditingCategoryId(null)
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
          <h1 className="text-2xl font-bold text-dark-900">Services</h1>
          <p className="text-dark-500">Gérez les catégories et services</p>
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

      {/* Categories */}
      <div className="space-y-4">
        {data.categories.map(category => (
          <div key={category.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
            {/* Category Header */}
            <div
              className="flex items-center justify-between p-4 cursor-pointer hover:bg-dark-50"
              onClick={() => setExpandedCategory(expandedCategory === category.id ? null : category.id)}
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-${category.color}-100 text-${category.color}-600`}>
                  <span className="text-2xl">{category.icon === 'Zap' ? '⚡' : category.icon === 'KeyRound' ? '🔑' : category.icon === 'Lock' ? '🔒' : '🔧'}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-dark-900">{category.name}</h3>
                  <p className="text-sm text-dark-500">{category.services.length} services</p>
                </div>
              </div>
              {expandedCategory === category.id ? (
                <ChevronUp className="w-5 h-5 text-dark-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-dark-400" />
              )}
            </div>

            {/* Category Content */}
            {expandedCategory === category.id && (
              <div className="border-t border-dark-100 p-4 space-y-4">
                {/* Category Info */}
                <div className="grid md:grid-cols-2 gap-4 pb-4 border-b border-dark-100">
                  <div>
                    <label className="block text-sm font-medium text-dark-700 mb-1">Nom</label>
                    <input
                      type="text"
                      value={category.name}
                      onChange={e => updateCategory(category.id, { name: e.target.value })}
                      className="w-full px-4 py-2 border border-dark-200 rounded-lg bg-white text-dark-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark-700 mb-1">Slug</label>
                    <input
                      type="text"
                      value={category.slug}
                      onChange={e => updateCategory(category.id, { slug: e.target.value })}
                      className="w-full px-4 py-2 border border-dark-200 rounded-lg bg-white text-dark-900"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-dark-700 mb-1">Description courte</label>
                    <input
                      type="text"
                      value={category.shortDescription}
                      onChange={e => updateCategory(category.id, { shortDescription: e.target.value })}
                      className="w-full px-4 py-2 border border-dark-200 rounded-lg bg-white text-dark-900"
                    />
                  </div>
                </div>

                {/* Services List */}
                <div className="space-y-3">
                  <h4 className="font-medium text-dark-800">Services</h4>
                  {category.services.map(service => (
                    <div key={service.id} className="flex items-center justify-between p-3 bg-dark-50 rounded-lg">
                      <div>
                        <p className="font-medium text-dark-900">{service.name}</p>
                        <p className="text-sm text-dark-500">{service.description.substring(0, 60)}...</p>
                      </div>
                      <button
                        onClick={() => {
                          setEditingService(service)
                          setEditingCategoryId(category.id)
                        }}
                        className="p-2 hover:bg-dark-200 rounded-lg transition-colors"
                      >
                        <Edit2 className="w-4 h-4 text-dark-600" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Service Edit Modal */}
      {editingService && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-dark-100">
              <h2 className="text-xl font-bold text-dark-900">Modifier le service</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-dark-700 mb-1">Nom</label>
                  <input
                    type="text"
                    value={editingService.name}
                    onChange={e => setEditingService({ ...editingService, name: e.target.value })}
                    className="w-full px-4 py-2 border border-dark-200 rounded-lg bg-white text-dark-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark-700 mb-1">Slug</label>
                  <input
                    type="text"
                    value={editingService.slug}
                    onChange={e => setEditingService({ ...editingService, slug: e.target.value })}
                    className="w-full px-4 py-2 border border-dark-200 rounded-lg bg-white text-dark-900"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-700 mb-1">Description courte</label>
                <textarea
                  value={editingService.description}
                  onChange={e => setEditingService({ ...editingService, description: e.target.value })}
                  rows={2}
                  className="w-full px-4 py-2 border border-dark-200 rounded-lg bg-white text-dark-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-700 mb-1">Description complète</label>
                <textarea
                  value={editingService.fullDescription}
                  onChange={e => setEditingService({ ...editingService, fullDescription: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 border border-dark-200 rounded-lg bg-white text-dark-900"
                />
              </div>
            </div>
            <div className="p-6 border-t border-dark-100 flex justify-end gap-3">
              <button
                onClick={() => {
                  setEditingService(null)
                  setEditingCategoryId(null)
                }}
                className="px-4 py-2 border border-dark-200 rounded-lg hover:bg-dark-50"
              >
                Annuler
              </button>
              <button
                onClick={saveEditingService}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
              >
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
