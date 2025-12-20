"use client";

import { useState, useEffect, useRef } from "react";
import { Plus, Pencil, Trash2, Loader2, X, Save, Upload, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

interface Realization {
  id: string;
  title: string;
  type: string;
  location: string;
  category: string;
  serviceType: string;
  description: string;
  image: string;
  imageBefore?: string;
  imageAfter?: string;
  featured: boolean;
}

const categories = [
  { value: "electricite", label: "Électricité" },
  { value: "controle-acces", label: "Contrôle d'accès" },
  { value: "serrurerie", label: "Serrurerie" },
  { value: "metallerie", label: "Métallerie" },
];

const serviceTypes = ["Installation", "Rénovation", "Dépannage", "Mise aux normes"];

const buildingTypes = [
  "Appartement",
  "Maison",
  "Local commercial",
  "Commerce",
  "Bureaux",
  "Copropriété",
  "Restaurant",
];

export default function RealizationsPage() {
  const [realizations, setRealizations] = useState<Realization[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Realization | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);

  const imageInputRef = useRef<HTMLInputElement>(null);
  const beforeInputRef = useRef<HTMLInputElement>(null);
  const afterInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    title: "",
    type: "",
    location: "",
    category: "",
    serviceType: "",
    description: "",
    image: "",
    imageBefore: "",
    imageAfter: "",
    featured: false,
  });

  useEffect(() => {
    fetchRealizations();
  }, []);

  const fetchRealizations = async () => {
    try {
      const res = await fetch("/api/admin/realizations");
      if (!res.ok) throw new Error('Erreur lors du chargement');
      const data = await res.json();
      setRealizations(Array.isArray(data) ? data : data.realizations || []);
    } catch (error) {
      console.error('Error fetching realizations:', error);
      setRealizations([]);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (file: File, field: 'image' | 'imageBefore' | 'imageAfter') => {
    setUploading(field);
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', 'realizations');

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData
      });

      if (res.ok) {
        const { url } = await res.json();
        setForm(prev => ({ ...prev, [field]: url }));
      }
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setUploading(null);
    }
  };

  const openModal = (realization?: Realization) => {
    if (realization) {
      setEditing(realization);
      setForm({
        title: realization.title,
        type: realization.type,
        location: realization.location,
        category: realization.category,
        serviceType: realization.serviceType,
        description: realization.description,
        image: realization.image,
        imageBefore: realization.imageBefore || "",
        imageAfter: realization.imageAfter || "",
        featured: realization.featured,
      });
    } else {
      setEditing(null);
      setForm({
        title: "",
        type: "",
        location: "",
        category: "",
        serviceType: "",
        description: "",
        image: "",
        imageBefore: "",
        imageAfter: "",
        featured: false,
      });
    }
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditing(null);
  };

  const handleSave = async () => {
    setSaving(true);

    if (editing) {
      await fetch("/api/admin/realizations", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editing.id, ...form }),
      });
    } else {
      await fetch("/api/admin/realizations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    }

    await fetchRealizations();
    setSaving(false);
    closeModal();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer cette réalisation ?")) return;
    await fetch(`/api/admin/realizations?id=${id}`, { method: "DELETE" });
    await fetchRealizations();
  };

  const ImageUploadButton = ({ 
    field, 
    inputRef, 
    value, 
    label 
  }: { 
    field: 'image' | 'imageBefore' | 'imageAfter';
    inputRef: React.RefObject<HTMLInputElement | null>;
    value: string;
    label: string;
  }) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-dark-700">{label}</label>
      <div 
        onClick={() => inputRef.current?.click()}
        className={`
          relative border-2 border-dashed rounded-lg p-4 cursor-pointer transition-colors
          ${value ? 'border-green-400 bg-green-50' : 'border-dark-300 hover:border-primary-500'}
        `}
      >
        {uploading === field ? (
          <div className="flex items-center justify-center h-20">
            <Loader2 className="w-6 h-6 animate-spin text-primary-500" />
          </div>
        ) : value ? (
          <div className="relative h-20">
            <Image src={value} alt={label} fill className="object-contain" unoptimized />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setForm(prev => ({ ...prev, [field]: '' }));
              }}
              className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-20 text-dark-400">
            <Upload className="w-6 h-6 mb-1" />
            <span className="text-xs">Cliquez pour sélectionner</span>
          </div>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleUpload(file, field);
        }}
      />
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-dark-900">Réalisations</h1>
          <p className="text-dark-500">Gérez vos projets et chantiers avec photos avant/après</p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Ajouter
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {realizations.map((r) => (
          <div key={r.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="relative h-48">
              <Image src={r.image} alt={r.title} fill className="object-cover" unoptimized />
              {r.featured && (
                <span className="absolute top-2 left-2 px-2 py-1 bg-accent-500 text-white text-xs font-semibold rounded">
                  À la une
                </span>
              )}
              <span className="absolute top-2 right-2 px-2 py-1 bg-dark-900/70 text-white text-xs rounded">
                {categories.find((c) => c.value === r.category)?.label}
              </span>
              {(r.imageBefore || r.imageAfter) && (
                <span className="absolute bottom-2 left-2 px-2 py-1 bg-primary-600 text-white text-xs rounded flex items-center gap-1">
                  <ImageIcon className="w-3 h-3" />
                  Avant/Après
                </span>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-dark-900 mb-1">{r.title}</h3>
              <p className="text-sm text-dark-500 mb-3">
                {r.type} • {r.location}
              </p>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => openModal(r)}
                  className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(r.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b sticky top-0 bg-white z-10">
              <h2 className="text-lg font-semibold">
                {editing ? "Modifier la réalisation" : "Nouvelle réalisation"}
              </h2>
              <button onClick={closeModal} className="p-2 hover:bg-dark-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-dark-700 mb-1">
                  Titre
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-4 py-2 border border-dark-200 rounded-lg bg-white text-dark-900"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-dark-700 mb-1">
                    Catégorie
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-4 py-2 border border-dark-200 rounded-lg bg-white text-dark-900"
                  >
                    <option value="">Sélectionner...</option>
                    {categories.map((c) => (
                      <option key={c.value} value={c.value}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark-700 mb-1">
                    Type de service
                  </label>
                  <select
                    value={form.serviceType}
                    onChange={(e) => setForm({ ...form, serviceType: e.target.value })}
                    className="w-full px-4 py-2 border border-dark-200 rounded-lg bg-white text-dark-900"
                  >
                    <option value="">Sélectionner...</option>
                    {serviceTypes.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-dark-700 mb-1">
                    Type de bâtiment
                  </label>
                  <select
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                    className="w-full px-4 py-2 border border-dark-200 rounded-lg bg-white text-dark-900"
                  >
                    <option value="">Sélectionner...</option>
                    {buildingTypes.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark-700 mb-1">
                    Localisation
                  </label>
                  <input
                    type="text"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    className="w-full px-4 py-2 border border-dark-200 rounded-lg bg-white text-dark-900"
                    placeholder="Paris 8e"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-700 mb-1">
                  Description
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-dark-200 rounded-lg bg-white text-dark-900"
                />
              </div>

              {/* Image principale */}
              <div className="border-t pt-4">
                <h3 className="text-sm font-semibold text-dark-900 mb-3">📷 Image principale</h3>
                <ImageUploadButton
                  field="image"
                  inputRef={imageInputRef}
                  value={form.image}
                  label="Image de couverture"
                />
              </div>
              
              {/* Photos Avant/Après */}
              <div className="border-t pt-4">
                <h3 className="text-sm font-semibold text-dark-900 mb-3">📸 Photos Avant/Après (optionnel)</h3>
                <div className="grid grid-cols-2 gap-4">
                  <ImageUploadButton
                    field="imageBefore"
                    inputRef={beforeInputRef}
                    value={form.imageBefore}
                    label="Photo AVANT"
                  />
                  <ImageUploadButton
                    field="imageAfter"
                    inputRef={afterInputRef}
                    value={form.imageAfter}
                    label="Photo APRÈS"
                  />
                </div>
              </div>
              
              <div className="flex items-center gap-2 border-t pt-4">
                <input
                  type="checkbox"
                  id="featured"
                  checked={form.featured}
                  onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                  className="w-4 h-4 text-primary-600 rounded"
                />
                <label htmlFor="featured" className="text-sm text-dark-700">
                  Mettre à la une sur la page d&apos;accueil
                </label>
              </div>
            </div>
            <div className="flex justify-end gap-3 p-4 border-t sticky bottom-0 bg-white">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-dark-600 hover:bg-dark-100 rounded-lg transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleSave}
                disabled={saving || !form.title || !form.image}
                className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                {saving ? "Enregistrement..." : "Enregistrer"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
