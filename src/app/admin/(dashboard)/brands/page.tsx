"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Loader2, X, Save, ExternalLink } from "lucide-react";

interface Brand {
  id: string;
  name: string;
  category: string;
  description: string;
  logo: string;
  website: string;
}

const categories = [
  { value: "electricite", label: "Électricité" },
  { value: "controle-acces", label: "Contrôle d'accès" },
  { value: "serrurerie", label: "Serrurerie" },
];

export default function BrandsPage() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Brand | null>(null);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    name: "",
    category: "",
    description: "",
    logo: "",
    website: "",
  });

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    const res = await fetch("/api/admin/brands");
    const data = await res.json();
    setBrands(data.brands);
    setLoading(false);
  };

  const openModal = (brand?: Brand) => {
    if (brand) {
      setEditing(brand);
      setForm({
        name: brand.name,
        category: brand.category,
        description: brand.description,
        logo: brand.logo,
        website: brand.website,
      });
    } else {
      setEditing(null);
      setForm({
        name: "",
        category: "",
        description: "",
        logo: "",
        website: "",
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
      await fetch("/api/admin/brands", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editing.id, ...form }),
      });
    } else {
      await fetch("/api/admin/brands", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    }

    await fetchBrands();
    setSaving(false);
    closeModal();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer cette marque ?")) return;
    await fetch(`/api/admin/brands?id=${id}`, { method: "DELETE" });
    await fetchBrands();
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
          <h1 className="text-2xl font-bold text-dark-900">Marques partenaires</h1>
          <p className="text-dark-500">Gérez vos marques et fournisseurs</p>
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
        {brands.map((b) => (
          <div key={b.id} className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-start justify-between mb-4">
              <div className="w-16 h-16 bg-dark-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl font-bold text-dark-400">
                  {b.name.charAt(0)}
                </span>
              </div>
              <span className="px-2 py-1 bg-dark-100 text-dark-600 text-xs rounded">
                {categories.find((c) => c.value === b.category)?.label}
              </span>
            </div>
            <h3 className="font-semibold text-dark-900 mb-1">{b.name}</h3>
            <p className="text-sm text-dark-500 mb-4 line-clamp-2">{b.description}</p>
            <div className="flex items-center justify-between">
              {b.website && (
                <a
                  href={b.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1"
                >
                  <ExternalLink className="w-4 h-4" />
                  Site web
                </a>
              )}
              <div className="flex gap-2 ml-auto">
                <button
                  onClick={() => openModal(b)}
                  className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(b.id)}
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
          <div className="bg-white rounded-xl w-full max-w-lg">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">
                {editing ? "Modifier la marque" : "Nouvelle marque"}
              </h2>
              <button onClick={closeModal} className="p-2 hover:bg-dark-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-dark-700 mb-1">
                  Nom
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-2 border border-dark-200 rounded-lg bg-white text-dark-900"
                />
              </div>
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
                  URL du logo
                </label>
                <input
                  type="url"
                  value={form.logo}
                  onChange={(e) => setForm({ ...form, logo: e.target.value })}
                  className="w-full px-4 py-2 border border-dark-200 rounded-lg bg-white text-dark-900"
                  placeholder="/brands/nom.svg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-700 mb-1">
                  Site web
                </label>
                <input
                  type="url"
                  value={form.website}
                  onChange={(e) => setForm({ ...form, website: e.target.value })}
                  className="w-full px-4 py-2 border border-dark-200 rounded-lg bg-white text-dark-900"
                  placeholder="https://..."
                />
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



