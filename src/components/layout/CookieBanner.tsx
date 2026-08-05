"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Cookie, X, Settings } from "lucide-react";
// PAS de framer-motion ici : ce composant est monté dans le root layout, donc
// l'importer embarquait toute la lib (~36 kB gz) dans le First Load JS de
// CHAQUE page — pour un simple slide-in. L'animation est en CSS pur
// (.animate-cookie-banner-in dans globals.css, reduced-motion géré).
//
// PAS de chargement de scripts ici non plus : c'est AnalyticsGate qui monte
// GA4 (NEXT_PUBLIC_GA4_ID) en écoutant "cookie-consent:updated". L'ancien
// loadScripts (NEXT_PUBLIC_GA_ID / GTM) faisait doublon et chargeait un
// second gtag hors consentement géré.

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true, // Toujours true, non modifiable
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Vérifier si l'utilisateur a déjà fait un choix
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // Afficher la bannière après un court délai
      setTimeout(() => setShowBanner(true), 1000);
    } else {
      // Charger les préférences sauvegardées
      try {
        setPreferences(JSON.parse(consent));
      } catch (e) {
        console.error("Erreur chargement préférences cookies:", e);
      }
    }
  }, []);

  // Ré-ouverture depuis le bouton « Gérer les cookies » du footer (CNIL :
  // retirer son consentement doit rester possible à tout moment).
  useEffect(() => {
    const openSettings = () => {
      setShowSettings(true);
      setShowBanner(true);
    };
    window.addEventListener("cookie-consent:open", openSettings);
    return () => window.removeEventListener("cookie-consent:open", openSettings);
  }, []);

  const savePreferences = (prefs: typeof preferences) => {
    localStorage.setItem("cookie-consent", JSON.stringify(prefs));
    setPreferences(prefs);
    setShowBanner(false);
    setShowSettings(false);
    // Notify AnalyticsGate (and any other consumer) so they can flip
    // Vercel Analytics / Speed Insights / GA mounts without a reload.
    window.dispatchEvent(new CustomEvent("cookie-consent:updated", { detail: prefs }));
  };

  const acceptAll = () => {
    savePreferences({
      necessary: true,
      analytics: true,
      marketing: true,
    });
  };

  const acceptNecessary = () => {
    savePreferences({
      necessary: true,
      analytics: false,
      marketing: false,
    });
  };

  const acceptCustom = () => {
    savePreferences(preferences);
  };

  if (!showBanner) return null;

  return (
    <>
      {showBanner && (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 animate-cookie-banner-in">
          <div className="container-custom max-w-6xl">
            <div className="bg-surface-elevated rounded-2xl shadow-2xl border border-border p-6 md:p-8">
              {!showSettings ? (
                <>
                  {/* Bannière simple */}
                  <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-primary-100 dark:bg-primary-500/15 rounded-xl flex items-center justify-center">
                        <Cookie className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                      </div>
                    </div>

                    <div className="flex-1">
                      <h3 className="font-display font-bold text-lg text-foreground mb-2">
                        Nous utilisons des cookies
                      </h3>
                      <p className="text-foreground-muted text-sm md:text-base">
                        Nous utilisons des cookies pour améliorer votre expérience sur notre site.
                        Certains sont nécessaires au fonctionnement, d'autres nous aident à analyser notre audience.{" "}
                        <Link href="/cookies" className="text-primary-600 dark:text-primary-400 hover:text-primary-700 font-semibold">
                          En savoir plus
                        </Link>
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                      <button
                        onClick={() => setShowSettings(true)}
                        className="btn-outline btn-sm justify-center"
                      >
                        <Settings className="w-4 h-4" />
                        Personnaliser
                      </button>
                      <button
                        onClick={acceptNecessary}
                        className="btn-outline btn-sm justify-center"
                      >
                        Refuser tout
                      </button>
                      <button
                        onClick={acceptAll}
                        className="btn-primary btn-sm justify-center"
                      >
                        Accepter tout
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Paramètres détaillés */}
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="font-display font-bold text-xl text-foreground">
                      Paramètres des cookies
                    </h3>
                    <button
                      onClick={() => setShowSettings(false)}
                      className="p-2.5 -m-2.5 rounded-lg text-foreground-muted hover:text-foreground transition-colors"
                      aria-label="Fermer les paramètres"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-4 mb-6">
                    {/* Cookies nécessaires */}
                    <div className="border border-border rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-foreground">Cookies nécessaires</h4>
                        <span className="text-xs bg-surface-muted text-foreground-muted px-3 py-1 rounded-full font-medium">
                          Toujours actifs
                        </span>
                      </div>
                      <p className="text-sm text-foreground-muted">
                        Ces cookies sont indispensables au fonctionnement du site et ne peuvent être désactivés.
                      </p>
                    </div>

                    {/* Cookies analytics */}
                    <div className="border border-border rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-foreground">Cookies analytics</h4>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={preferences.analytics}
                            onChange={(e) =>
                              setPreferences({ ...preferences, analytics: e.target.checked })
                            }
                            className="sr-only peer"
                            aria-label="Activer les cookies analytics"
                          />
                          <div className="w-11 h-6 bg-dark-200 dark:bg-dark-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                        </label>
                      </div>
                      <p className="text-sm text-foreground-muted">
                        Ces cookies nous permettent de mesurer l'audience et d'améliorer le site (Google Analytics).
                      </p>
                    </div>

                    {/* Cookies marketing */}
                    <div className="border border-border rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-foreground">Cookies marketing</h4>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={preferences.marketing}
                            onChange={(e) =>
                              setPreferences({ ...preferences, marketing: e.target.checked })
                            }
                            className="sr-only peer"
                            aria-label="Activer les cookies marketing"
                          />
                          <div className="w-11 h-6 bg-dark-200 dark:bg-dark-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                        </label>
                      </div>
                      <p className="text-sm text-foreground-muted">
                        Ces cookies permettent de vous proposer des publicités pertinentes (Google Ads, Facebook).
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={acceptNecessary}
                      className="btn-outline btn-sm justify-center flex-1"
                    >
                      Refuser tout
                    </button>
                    <button
                      onClick={acceptCustom}
                      className="btn-primary btn-sm justify-center flex-1"
                    >
                      Enregistrer mes choix
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
