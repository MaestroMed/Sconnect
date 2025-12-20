"use client";

import { useState, useEffect, useRef } from "react";
import { Save, Loader2, CheckCircle, Upload, Image as ImageIcon, X } from "lucide-react";

interface SiteConfig {
  siteName: string;
  siteTagline: string;
  phone: string;
  phoneEmergency: string;
  email: string;
  address: {
    street: string;
    postalCode: string;
    city: string;
  };
  hours: {
    weekdays: string;
    saturday: string;
    emergency: string;
  };
  social: {
    facebook: string;
    linkedin: string;
    instagram: string;
  };
  seo: {
    title: string;
    description: string;
    keywords: string;
  };
  stats: {
    interventionsPerYear: number;
    yearsExperience: number;
    satisfactionRate: number;
  };
  zones: string[];
  logoUrl?: string;
  logoDarkUrl?: string;
}

export default function SiteConfigPage() {
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [zonesText, setZonesText] = useState("");
  const [uploading, setUploading] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);
  const logoDarkInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    try {
      const res = await fetch("/api/admin/site-config");
      if (!res.ok) {
        throw new Error('Erreur lors du chargement');
      }
      const data = await res.json();
      
      // Ensure nested objects exist with defaults
      const configWithDefaults: SiteConfig = {
        siteName: data.siteName || '',
        siteTagline: data.siteTagline || '',
        phone: data.phone || '',
        phoneEmergency: data.phoneEmergency || '',
        email: data.email || '',
        address: data.address || { street: '', postalCode: '', city: '' },
        hours: data.hours || { weekdays: '', saturday: '', emergency: '' },
        social: data.social || { facebook: '', linkedin: '', instagram: '' },
        seo: data.seo || { title: '', description: '', keywords: '' },
        stats: data.stats || { interventionsPerYear: 0, yearsExperience: 0, satisfactionRate: 0 },
        zones: data.zones || [],
        logoUrl: data.logoUrl || '',
        logoDarkUrl: data.logoDarkUrl || '',
      };
      
      setConfig(configWithDefaults);
      setZonesText(configWithDefaults.zones.join(", "));
    } catch (error) {
      console.error('Error fetching config:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!config) return;
    
    setSaving(true);
    const updatedConfig = {
      ...config,
      zones: zonesText.split(",").map((z) => z.trim()).filter(Boolean),
    };

    await fetch("/api/admin/site-config", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedConfig),
    });

    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const updateConfig = (path: string, value: string | number) => {
    if (!config) return;
    
    const keys = path.split(".");
    const newConfig = { ...config };
    let obj = newConfig as Record<string, unknown>;
    
    for (let i = 0; i < keys.length - 1; i++) {
      obj[keys[i]] = { ...(obj[keys[i]] as Record<string, unknown>) };
      obj = obj[keys[i]] as Record<string, unknown>;
    }
    obj[keys[keys.length - 1]] = value;
    
    setConfig(newConfig);
  };

  const handleLogoUpload = async (file: File, field: 'logoUrl' | 'logoDarkUrl') => {
    if (!config) return;
    
    setUploading(field);
    setUploadError(null);
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', 'logos');
    
    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });
      
      const data = await res.json();
      
      if (res.ok && data.url) {
        setConfig({ ...config, [field]: data.url });
      } else {
        setUploadError(data.error || 'Erreur lors de l\'upload');
      }
    } catch (error) {
      console.error('Upload error:', error);
      setUploadError('Erreur réseau');
    } finally {
      setUploading(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
      </div>
    );
  }

  if (!config) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-dark-900">Configuration du site</h1>
          <p className="text-dark-500">Modifiez les informations générales du site</p>
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
        {/* Logo & Branding */}
        <div className="bg-white rounded-xl p-6 shadow-sm lg:col-span-2">
          <h2 className="text-lg font-semibold text-dark-900 mb-4">
            Logo & Identité visuelle
          </h2>
          {uploadError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {uploadError}
            </div>
          )}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Logo principal */}
            <div>
              <label className="block text-sm font-medium text-dark-700 mb-2">
                Logo principal (fond clair)
              </label>
              <div className="border-2 border-dashed border-dark-200 rounded-lg p-4 text-center hover:border-primary-500 transition-colors">
                {config.logoUrl ? (
                  <div className="relative inline-block">
                    <img 
                      src={config.logoUrl} 
                      alt="Logo" 
                      className="max-h-20 mx-auto object-contain"
                    />
                    <button
                      type="button"
                      onClick={() => setConfig({ ...config, logoUrl: '' })}
                      className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <div className="py-4">
                    <ImageIcon className="w-10 h-10 mx-auto text-dark-300 mb-2" />
                    <p className="text-sm text-dark-500">Aucun logo</p>
                  </div>
                )}
                <input
                  ref={logoInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleLogoUpload(file, 'logoUrl');
                  }}
                />
                <button
                  type="button"
                  onClick={() => logoInputRef.current?.click()}
                  disabled={uploading === 'logoUrl'}
                  className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50"
                >
                  {uploading === 'logoUrl' ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Upload className="w-4 h-4" />
                  )}
                  {uploading === 'logoUrl' ? 'Upload...' : 'Télécharger'}
                </button>
              </div>
              <p className="text-xs text-dark-400 mt-2">Format: PNG ou SVG transparent, max 5MB</p>
            </div>

            {/* Logo fond sombre */}
            <div>
              <label className="block text-sm font-medium text-dark-700 mb-2">
                Logo variante (fond sombre) - optionnel
              </label>
              <div className="border-2 border-dashed border-dark-200 rounded-lg p-4 text-center hover:border-primary-500 transition-colors bg-dark-800">
                {config.logoDarkUrl ? (
                  <div className="relative inline-block">
                    <img 
                      src={config.logoDarkUrl} 
                      alt="Logo dark" 
                      className="max-h-20 mx-auto object-contain"
                    />
                    <button
                      type="button"
                      onClick={() => setConfig({ ...config, logoDarkUrl: '' })}
                      className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <div className="py-4">
                    <ImageIcon className="w-10 h-10 mx-auto text-dark-500 mb-2" />
                    <p className="text-sm text-dark-400">Aucun logo</p>
                  </div>
                )}
                <input
                  ref={logoDarkInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleLogoUpload(file, 'logoDarkUrl');
                  }}
                />
                <button
                  type="button"
                  onClick={() => logoDarkInputRef.current?.click()}
                  disabled={uploading === 'logoDarkUrl'}
                  className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-white text-dark-900 rounded-lg hover:bg-dark-100 disabled:opacity-50"
                >
                  {uploading === 'logoDarkUrl' ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Upload className="w-4 h-4" />
                  )}
                  {uploading === 'logoDarkUrl' ? 'Upload...' : 'Télécharger'}
                </button>
              </div>
              <p className="text-xs text-dark-400 mt-2">Version blanche/claire pour footer</p>
            </div>
          </div>
        </div>

        {/* General Info */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-dark-900 mb-4">
            Informations générales
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-dark-700 mb-1">
                Nom du site
              </label>
              <input
                type="text"
                value={config.siteName}
                onChange={(e) => updateConfig("siteName", e.target.value)}
                className="w-full px-4 py-2 border border-dark-200 rounded-lg focus:ring-2 focus:ring-primary-500 bg-white text-dark-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-700 mb-1">
                Slogan
              </label>
              <input
                type="text"
                value={config.siteTagline}
                onChange={(e) => updateConfig("siteTagline", e.target.value)}
                className="w-full px-4 py-2 border border-dark-200 rounded-lg focus:ring-2 focus:ring-primary-500 bg-white text-dark-900"
              />
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-dark-900 mb-4">Contact</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-dark-700 mb-1">
                Téléphone
              </label>
              <input
                type="text"
                value={config.phone}
                onChange={(e) => updateConfig("phone", e.target.value)}
                className="w-full px-4 py-2 border border-dark-200 rounded-lg focus:ring-2 focus:ring-primary-500 bg-white text-dark-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-700 mb-1">
                Téléphone urgences
              </label>
              <input
                type="text"
                value={config.phoneEmergency}
                onChange={(e) => updateConfig("phoneEmergency", e.target.value)}
                className="w-full px-4 py-2 border border-dark-200 rounded-lg focus:ring-2 focus:ring-primary-500 bg-white text-dark-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={config.email}
                onChange={(e) => updateConfig("email", e.target.value)}
                className="w-full px-4 py-2 border border-dark-200 rounded-lg focus:ring-2 focus:ring-primary-500 bg-white text-dark-900"
              />
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-dark-900 mb-4">Adresse</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-dark-700 mb-1">
                Rue
              </label>
              <input
                type="text"
                value={config.address.street}
                onChange={(e) => updateConfig("address.street", e.target.value)}
                className="w-full px-4 py-2 border border-dark-200 rounded-lg focus:ring-2 focus:ring-primary-500 bg-white text-dark-900"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-dark-700 mb-1">
                  Code postal
                </label>
                <input
                  type="text"
                  value={config.address.postalCode}
                  onChange={(e) => updateConfig("address.postalCode", e.target.value)}
                  className="w-full px-4 py-2 border border-dark-200 rounded-lg focus:ring-2 focus:ring-primary-500 bg-white text-dark-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-700 mb-1">
                  Ville
                </label>
                <input
                  type="text"
                  value={config.address.city}
                  onChange={(e) => updateConfig("address.city", e.target.value)}
                  className="w-full px-4 py-2 border border-dark-200 rounded-lg focus:ring-2 focus:ring-primary-500 bg-white text-dark-900"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Hours */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-dark-900 mb-4">Horaires</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-dark-700 mb-1">
                Semaine
              </label>
              <input
                type="text"
                value={config.hours.weekdays}
                onChange={(e) => updateConfig("hours.weekdays", e.target.value)}
                className="w-full px-4 py-2 border border-dark-200 rounded-lg focus:ring-2 focus:ring-primary-500 bg-white text-dark-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-700 mb-1">
                Samedi
              </label>
              <input
                type="text"
                value={config.hours.saturday}
                onChange={(e) => updateConfig("hours.saturday", e.target.value)}
                className="w-full px-4 py-2 border border-dark-200 rounded-lg focus:ring-2 focus:ring-primary-500 bg-white text-dark-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-700 mb-1">
                Urgences
              </label>
              <input
                type="text"
                value={config.hours.emergency}
                onChange={(e) => updateConfig("hours.emergency", e.target.value)}
                className="w-full px-4 py-2 border border-dark-200 rounded-lg focus:ring-2 focus:ring-primary-500 bg-white text-dark-900"
              />
            </div>
          </div>
        </div>

        {/* Social */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-dark-900 mb-4">Réseaux sociaux</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-dark-700 mb-1">
                Facebook
              </label>
              <input
                type="url"
                value={config.social.facebook}
                onChange={(e) => updateConfig("social.facebook", e.target.value)}
                className="w-full px-4 py-2 border border-dark-200 rounded-lg focus:ring-2 focus:ring-primary-500 bg-white text-dark-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-700 mb-1">
                LinkedIn
              </label>
              <input
                type="url"
                value={config.social.linkedin}
                onChange={(e) => updateConfig("social.linkedin", e.target.value)}
                className="w-full px-4 py-2 border border-dark-200 rounded-lg focus:ring-2 focus:ring-primary-500 bg-white text-dark-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-700 mb-1">
                Instagram
              </label>
              <input
                type="url"
                value={config.social.instagram}
                onChange={(e) => updateConfig("social.instagram", e.target.value)}
                className="w-full px-4 py-2 border border-dark-200 rounded-lg focus:ring-2 focus:ring-primary-500 bg-white text-dark-900"
              />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-dark-900 mb-4">
            Statistiques affichées
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-dark-700 mb-1">
                Interventions par an
              </label>
              <input
                type="number"
                value={config.stats.interventionsPerYear}
                onChange={(e) => updateConfig("stats.interventionsPerYear", parseInt(e.target.value) || 0)}
                className="w-full px-4 py-2 border border-dark-200 rounded-lg focus:ring-2 focus:ring-primary-500 bg-white text-dark-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-700 mb-1">
                Années d&apos;expérience
              </label>
              <input
                type="number"
                value={config.stats.yearsExperience}
                onChange={(e) => updateConfig("stats.yearsExperience", parseInt(e.target.value) || 0)}
                className="w-full px-4 py-2 border border-dark-200 rounded-lg focus:ring-2 focus:ring-primary-500 bg-white text-dark-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-700 mb-1">
                Taux de satisfaction (%)
              </label>
              <input
                type="number"
                value={config.stats.satisfactionRate}
                onChange={(e) => updateConfig("stats.satisfactionRate", parseInt(e.target.value) || 0)}
                className="w-full px-4 py-2 border border-dark-200 rounded-lg focus:ring-2 focus:ring-primary-500 bg-white text-dark-900"
              />
            </div>
          </div>
        </div>

        {/* SEO */}
        <div className="bg-white rounded-xl p-6 shadow-sm lg:col-span-2">
          <h2 className="text-lg font-semibold text-dark-900 mb-4">SEO</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-dark-700 mb-1">
                Titre SEO
              </label>
              <input
                type="text"
                value={config.seo.title}
                onChange={(e) => updateConfig("seo.title", e.target.value)}
                className="w-full px-4 py-2 border border-dark-200 rounded-lg focus:ring-2 focus:ring-primary-500 bg-white text-dark-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-700 mb-1">
                Meta description
              </label>
              <textarea
                value={config.seo.description}
                onChange={(e) => updateConfig("seo.description", e.target.value)}
                rows={3}
                className="w-full px-4 py-2 border border-dark-200 rounded-lg focus:ring-2 focus:ring-primary-500 bg-white text-dark-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-700 mb-1">
                Mots-clés (séparés par des virgules)
              </label>
              <input
                type="text"
                value={config.seo.keywords}
                onChange={(e) => updateConfig("seo.keywords", e.target.value)}
                className="w-full px-4 py-2 border border-dark-200 rounded-lg focus:ring-2 focus:ring-primary-500 bg-white text-dark-900"
              />
            </div>
          </div>
        </div>

        {/* Zones */}
        <div className="bg-white rounded-xl p-6 shadow-sm lg:col-span-2">
          <h2 className="text-lg font-semibold text-dark-900 mb-4">
            Zones d&apos;intervention
          </h2>
          <div>
            <label className="block text-sm font-medium text-dark-700 mb-1">
              Villes (séparées par des virgules)
            </label>
            <textarea
              value={zonesText}
              onChange={(e) => setZonesText(e.target.value)}
              rows={2}
              className="w-full px-4 py-2 border border-dark-200 rounded-lg focus:ring-2 focus:ring-primary-500 bg-white text-dark-900"
            />
          </div>
        </div>
      </div>
    </div>
  );
}



