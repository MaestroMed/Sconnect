"use client";

import { useState, useEffect } from "react";
import { Loader2, ChevronDown, ChevronRight, Zap, Lock, KeyRound } from "lucide-react";

interface Service {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
}

interface ServiceCategory {
  id: string;
  name: string;
  slug: string;
  icon: string;
  color: string;
  shortDescription: string;
  services: Service[];
}

interface ServicesData {
  categories: ServiceCategory[];
}

const iconComponents: Record<string, typeof Zap> = {
  zap: Zap,
  lock: Lock,
  keyRound: KeyRound,
};

export default function ServicesPage() {
  const [data, setData] = useState<ServicesData | null>(null);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string[]>([]);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    const res = await fetch("/api/admin/services");
    const json = await res.json();
    setData(json);
    setExpanded(json.categories.map((c: ServiceCategory) => c.id));
    setLoading(false);
  };

  const toggleCategory = (id: string) => {
    setExpanded((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-dark-900">Services</h1>
        <p className="text-dark-500">
          Vue d&apos;ensemble des services proposés (édition via fichiers JSON)
        </p>
      </div>

      <div className="space-y-4">
        {data.categories.map((category) => {
          const IconComponent = iconComponents[category.icon] || Zap;
          const isExpanded = expanded.includes(category.id);

          return (
            <div key={category.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <button
                onClick={() => toggleCategory(category.id)}
                className="w-full flex items-center justify-between p-4 hover:bg-dark-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      category.color === "primary"
                        ? "bg-primary-100 text-primary-600"
                        : category.color === "accent"
                        ? "bg-accent-100 text-accent-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-dark-900">{category.name}</h3>
                    <p className="text-sm text-dark-500">{category.services.length} services</p>
                  </div>
                </div>
                {isExpanded ? (
                  <ChevronDown className="w-5 h-5 text-dark-400" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-dark-400" />
                )}
              </button>

              {isExpanded && (
                <div className="border-t border-dark-100">
                  <div className="p-4 bg-dark-50">
                    <p className="text-sm text-dark-600">{category.shortDescription}</p>
                  </div>
                  <div className="divide-y divide-dark-100">
                    {category.services.map((service) => (
                      <div key={service.id} className="p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-medium text-dark-900">{service.name}</h4>
                            <p className="text-sm text-dark-500 mt-1">{service.description}</p>
                          </div>
                          <span className="text-xs text-dark-400 bg-dark-100 px-2 py-1 rounded">
                            /{category.slug}/{service.slug}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
        <h3 className="font-semibold text-yellow-800 mb-2">💡 Note</h3>
        <p className="text-sm text-yellow-700">
          Pour modifier les services (prestations, FAQ, etc.), éditez directement le fichier{" "}
          <code className="bg-yellow-100 px-1 rounded">src/lib/data/services.json</code>.
          Les modifications seront prises en compte au rechargement de la page.
        </p>
      </div>
    </div>
  );
}




