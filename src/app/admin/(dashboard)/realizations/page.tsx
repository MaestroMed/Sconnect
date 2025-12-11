"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Loader2, X, Save } from "lucide-react";
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
  featured: boolean;
}

const categories = [
  { value: "electricite", label: "Électricité" },
  { value: "controle-acces", label: "Contrôle d'accès" },
  { value: "serrurerie", label: "Serrurerie" },
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

  const [form, setForm] = useState({
    title: "",
    type: "",
    location: "",
    category: "",
    serviceType: "",
    description: "",
    image: "",
    featured: false,
  });

  useEffect(() => {
    fetchRealizations();
  }, []);

  const fetchRealizations = async () => {
    const res = await fetch("/api/admin/realizations");
    const data = await res.json();
    setRealizations(data.realizations);
    setLoading(false);
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
          <p className="text-dark-500">Gérez vos projets et chantiers</p>
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
              <Image src={r.image} alt={r.title} fill className="object-cover" />
              {r.featured && (
                <span className="absolute top-2 left-2 px-2 py-1 bg-accent-500 text-white text-xs font-semibold rounded">
                  À la une
                </span>
              )}
              <span className="absolute top-2 right-2 px-2 py-1 bg-dark-900/70 text-white text-xs rounded">
                {categories.find((c) => c.value === r.category)?.label}
              </span>
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
          <div className="bg-white rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b">
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
              <div>
                <label className="block text-sm font-medium text-dark-700 mb-1">
                  URL de l&apos;image
                </label>
                <input
                  type="url"
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  className="w-full px-4 py-2 border border-dark-200 rounded-lg bg-white text-dark-900"
                  placeholder="https://..."
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={form.featured}
                  onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                  className="w-4 h-4 text-primary-600 rounded"
                />
                <label htmlFor="featured" className="text-sm text-dark-700">
                  Mettre à la une
                </label>
              </div>
            </div>
            <div className="flex justify-end gap-3 p-4 border-t">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-dark-600 hover:bg-dark-100 rounded-lg transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
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



