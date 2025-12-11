"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Loader2, X, Save, Star } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  rating: number;
  text: string;
  service: string;
  category: string;
  location: string;
  date: string;
  verified: boolean;
}

const categories = [
  { value: "electricite", label: "Électricité" },
  { value: "controle-acces", label: "Contrôle d'accès" },
  { value: "serrurerie", label: "Serrurerie" },
];

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    name: "",
    rating: 5,
    text: "",
    service: "",
    category: "",
    location: "",
    date: new Date().toISOString().split("T")[0],
    verified: true,
  });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    const res = await fetch("/api/admin/testimonials");
    const data = await res.json();
    setTestimonials(data.testimonials);
    setLoading(false);
  };

  const openModal = (testimonial?: Testimonial) => {
    if (testimonial) {
      setEditing(testimonial);
      setForm({
        name: testimonial.name,
        rating: testimonial.rating,
        text: testimonial.text,
        service: testimonial.service,
        category: testimonial.category,
        location: testimonial.location,
        date: testimonial.date,
        verified: testimonial.verified,
      });
    } else {
      setEditing(null);
      setForm({
        name: "",
        rating: 5,
        text: "",
        service: "",
        category: "",
        location: "",
        date: new Date().toISOString().split("T")[0],
        verified: true,
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
      await fetch("/api/admin/testimonials", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editing.id, ...form }),
      });
    } else {
      await fetch("/api/admin/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    }

    await fetchTestimonials();
    setSaving(false);
    closeModal();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer ce témoignage ?")) return;
    await fetch(`/api/admin/testimonials?id=${id}`, { method: "DELETE" });
    await fetchTestimonials();
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
          <h1 className="text-2xl font-bold text-dark-900">Témoignages</h1>
          <p className="text-dark-500">Gérez les avis de vos clients</p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Ajouter
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-dark-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-dark-700">Client</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-dark-700">Note</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-dark-700 hidden md:table-cell">Service</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-dark-700 hidden lg:table-cell">Ville</th>
              <th className="px-4 py-3 text-right text-sm font-semibold text-dark-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-dark-100">
            {testimonials.map((t) => (
              <tr key={t.id} className="hover:bg-dark-50">
                <td className="px-4 py-3">
                  <div>
                    <p className="font-medium text-dark-900">{t.name}</p>
                    <p className="text-sm text-dark-500 line-clamp-1">{t.text}</p>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                </td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <span className="text-sm text-dark-600">{t.service}</span>
                </td>
                <td className="px-4 py-3 hidden lg:table-cell">
                  <span className="text-sm text-dark-600">{t.location}</span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => openModal(t)}
                      className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(t.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">
                {editing ? "Modifier le témoignage" : "Nouveau témoignage"}
              </h2>
              <button onClick={closeModal} className="p-2 hover:bg-dark-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-dark-700 mb-1">
                  Nom du client
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
                  Note
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setForm({ ...form, rating: n })}
                      className="p-1"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          n <= form.rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-dark-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-700 mb-1">
                  Témoignage
                </label>
                <textarea
                  value={form.text}
                  onChange={(e) => setForm({ ...form, text: e.target.value })}
                  rows={4}
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
                    Service
                  </label>
                  <input
                    type="text"
                    value={form.service}
                    onChange={(e) => setForm({ ...form, service: e.target.value })}
                    className="w-full px-4 py-2 border border-dark-200 rounded-lg bg-white text-dark-900"
                    placeholder="Ex: Dépannage électrique"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-dark-700 mb-1">
                    Ville
                  </label>
                  <input
                    type="text"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    className="w-full px-4 py-2 border border-dark-200 rounded-lg bg-white text-dark-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark-700 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="w-full px-4 py-2 border border-dark-200 rounded-lg bg-white text-dark-900"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="verified"
                  checked={form.verified}
                  onChange={(e) => setForm({ ...form, verified: e.target.checked })}
                  className="w-4 h-4 text-primary-600 rounded"
                />
                <label htmlFor="verified" className="text-sm text-dark-700">
                  Avis vérifié
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



