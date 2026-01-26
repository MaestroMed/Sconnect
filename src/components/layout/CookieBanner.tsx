"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Cookie, X, Settings } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
        const savedPrefs = JSON.parse(consent);
        setPreferences(savedPrefs);
        loadScripts(savedPrefs);
      } catch (e) {
        console.error("Erreur chargement préférences cookies:", e);
      }
    }
  }, []);

  const loadScripts = (prefs: typeof preferences) => {
    // Charger Google Analytics si autorisé
    if (prefs.analytics && process.env.NEXT_PUBLIC_GA_ID) {
      const script = document.createElement("script");
      script.src = `https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`;
      script.async = true;
      document.head.appendChild(script);

      script.onload = () => {
        window.dataLayer = window.dataLayer || [];
        function gtag(...args: any[]) {
          window.dataLayer.push(args);
        }
        gtag("js", new Date());
        gtag("config", process.env.NEXT_PUBLIC_GA_ID);
      };
    }

    // Charger GTM si autorisé
    if (prefs.marketing && process.env.NEXT_PUBLIC_GTM_ID) {
      (function (w: any, d, s, l, i) {
        w[l] = w[l] || [];
        w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
        var f = d.getElementsByTagName(s)[0],
          j = d.createElement(s) as HTMLScriptElement,
          dl = l != "dataLayer" ? "&l=" + l : "";
        j.async = true;
        j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
        f.parentNode!.insertBefore(j, f);
      })(window, document, "script", "dataLayer", process.env.NEXT_PUBLIC_GTM_ID);
    }
  };

  const savePreferences = (prefs: typeof preferences) => {
    localStorage.setItem("cookie-consent", JSON.stringify(prefs));
    setPreferences(prefs);
    loadScripts(prefs);
    setShowBanner(false);
    setShowSettings(false);
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

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div className="container-custom max-w-6xl">
            <div className="bg-white rounded-2xl shadow-2xl border border-dark-200 p-6 md:p-8">
              {!showSettings ? (
                <>
                  {/* Bannière simple */}
                  <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                        <Cookie className="w-6 h-6 text-primary-600" />
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-display font-bold text-lg text-dark-900 mb-2">
                        Nous utilisons des cookies
                      </h3>
                      <p className="text-dark-600 text-sm md:text-base">
                        Nous utilisons des cookies pour améliorer votre expérience sur notre site.
                        Certains sont nécessaires au fonctionnement, d'autres nous aident à analyser notre audience.{" "}
                        <Link href="/cookies" className="text-primary-600 hover:text-primary-700 font-semibold">
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
                    <h3 className="font-display font-bold text-xl text-dark-900">
                      Paramètres des cookies
                    </h3>
                    <button
                      onClick={() => setShowSettings(false)}
                      className="text-dark-400 hover:text-dark-600 transition-colors"
                      aria-label="Fermer les paramètres"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-4 mb-6">
                    {/* Cookies nécessaires */}
                    <div className="border border-dark-200 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-dark-900">Cookies nécessaires</h4>
                        <span className="text-xs bg-dark-100 text-dark-600 px-3 py-1 rounded-full font-medium">
                          Toujours actifs
                        </span>
                      </div>
                      <p className="text-sm text-dark-600">
                        Ces cookies sont indispensables au fonctionnement du site et ne peuvent être désactivés.
                      </p>
                    </div>

                    {/* Cookies analytics */}
                    <div className="border border-dark-200 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-dark-900">Cookies analytics</h4>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={preferences.analytics}
                            onChange={(e) =>
                              setPreferences({ ...preferences, analytics: e.target.checked })
                            }
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-dark-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                        </label>
                      </div>
                      <p className="text-sm text-dark-600">
                        Ces cookies nous permettent de mesurer l'audience et d'améliorer le site (Google Analytics).
                      </p>
                    </div>

                    {/* Cookies marketing */}
                    <div className="border border-dark-200 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-dark-900">Cookies marketing</h4>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={preferences.marketing}
                            onChange={(e) =>
                              setPreferences({ ...preferences, marketing: e.target.checked })
                            }
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-dark-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                        </label>
                      </div>
                      <p className="text-sm text-dark-600">
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
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Augmenter le type Window pour TypeScript
declare global {
  interface Window {
    dataLayer: any[];
  }
}
