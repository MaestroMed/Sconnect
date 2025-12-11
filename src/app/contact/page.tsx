"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  AlertTriangle,
} from "lucide-react";

export default function ContactPage() {
  const [formState, setFormState] = useState({
    nom: "",
    email: "",
    objet: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formState.nom.trim()) newErrors.nom = "Le nom est requis";
    if (!formState.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      newErrors.email = "Email invalide";
    }
    if (!formState.objet.trim()) newErrors.objet = "L'objet est requis";
    if (!formState.message.trim()) {
      newErrors.message = "Le message est requis";
    } else if (formState.message.length < 20) {
      newErrors.message = "Le message doit contenir au moins 20 caractères";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitStatus("loading");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmitStatus("success");
      setFormState({ nom: "", email: "", objet: "", message: "" });
    } catch {
      setSubmitStatus("error");
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-dark-900 via-dark-950 to-primary-950 py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-electric-500/20 rounded-full blur-3xl" />

        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-semibold mb-6">
                <Mail className="w-4 h-4" />
                Contact
              </span>
              <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-6">
                Contactez-nous
              </h1>
              <p className="text-xl text-dark-300 leading-relaxed">
                Une question, un projet, un besoin de conseil ? Notre équipe est
                à votre écoute pour vous accompagner.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="card p-6 md:p-8"
              >
                <h2 className="font-display font-bold text-2xl text-dark-900 mb-6">
                  Envoyez-nous un message
                </h2>

                {submitStatus === "success" ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
                      <CheckCircle2 className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="font-display font-bold text-xl text-dark-900 mb-2">
                      Message envoyé !
                    </h3>
                    <p className="text-dark-600 mb-6">
                      Nous vous répondrons dans les plus brefs délais.
                    </p>
                    <button
                      onClick={() => setSubmitStatus("idle")}
                      className="btn-primary"
                    >
                      Envoyer un autre message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="input-label">
                          Nom <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          className={`input-field ${errors.nom ? "input-error" : ""}`}
                          placeholder="Votre nom"
                          value={formState.nom}
                          onChange={(e) =>
                            setFormState({ ...formState, nom: e.target.value })
                          }
                        />
                        {errors.nom && (
                          <p className="error-message">{errors.nom}</p>
                        )}
                      </div>
                      <div>
                        <label className="input-label">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          className={`input-field ${errors.email ? "input-error" : ""}`}
                          placeholder="votre@email.com"
                          value={formState.email}
                          onChange={(e) =>
                            setFormState({ ...formState, email: e.target.value })
                          }
                        />
                        {errors.email && (
                          <p className="error-message">{errors.email}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="input-label">
                        Objet <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        className={`input-field ${errors.objet ? "input-error" : ""}`}
                        placeholder="Objet de votre message"
                        value={formState.objet}
                        onChange={(e) =>
                          setFormState({ ...formState, objet: e.target.value })
                        }
                      />
                      {errors.objet && (
                        <p className="error-message">{errors.objet}</p>
                      )}
                    </div>

                    <div>
                      <label className="input-label">
                        Message <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        className={`input-field min-h-[150px] resize-y ${
                          errors.message ? "input-error" : ""
                        }`}
                        placeholder="Décrivez votre demande..."
                        value={formState.message}
                        onChange={(e) =>
                          setFormState({ ...formState, message: e.target.value })
                        }
                      />
                      {errors.message && (
                        <p className="error-message">{errors.message}</p>
                      )}
                    </div>

                    {submitStatus === "error" && (
                      <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-700">
                        <AlertCircle className="w-5 h-5 shrink-0" />
                        <p>Une erreur est survenue. Veuillez réessayer.</p>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={submitStatus === "loading"}
                      className="btn-primary w-full md:w-auto"
                    >
                      {submitStatus === "loading" ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Envoi en cours...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Envoyer le message
                        </>
                      )}
                    </button>
                  </form>
                )}
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Coordonnées */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="card p-6"
              >
                <h3 className="font-display font-bold text-lg text-dark-900 mb-6">
                  Nos coordonnées
                </h3>
                <ul className="space-y-5">
                  <li>
                    <a
                      href="tel:+33100000000"
                      className="flex items-start gap-4 group"
                    >
                      <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center group-hover:bg-primary-200 transition-colors">
                        <Phone className="w-6 h-6 text-primary-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-dark-900 group-hover:text-primary-600 transition-colors">
                          01 XX XX XX XX
                        </p>
                        <p className="text-sm text-dark-500">
                          Urgences 24h/24
                        </p>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a
                      href="mailto:contact@sconnect-france.fr"
                      className="flex items-start gap-4 group"
                    >
                      <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center group-hover:bg-primary-200 transition-colors">
                        <Mail className="w-6 h-6 text-primary-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-dark-900 group-hover:text-primary-600 transition-colors">
                          contact@sconnect-france.fr
                        </p>
                        <p className="text-sm text-dark-500">
                          Réponse sous 24h
                        </p>
                      </div>
                    </a>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-dark-900">
                        XX Rue de XXX
                      </p>
                      <p className="text-dark-500">92110 Clichy</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                      <Clock className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-dark-900">Horaires</p>
                      <p className="text-dark-500 text-sm">
                        Lun-Ven : 8h - 19h
                        <br />
                        Samedi : 9h - 17h
                        <br />
                        <span className="text-accent-600 font-medium">
                          Urgences 24h/24
                        </span>
                      </p>
                    </div>
                  </li>
                </ul>
              </motion.div>

              {/* Map */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="card overflow-hidden"
              >
                <div className="aspect-square bg-dark-100 relative">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10488.988459788897!2d2.2958!3d48.9022!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66f6bf8f4a6e7%3A0x40b82c3688c9460!2s92110%20Clichy!5e0!3m2!1sfr!2sfr!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Localisation S Connect France"
                  />
                </div>
                <div className="p-4">
                  <a
                    href="https://maps.google.com/?q=92110+Clichy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 font-semibold hover:text-primary-700 flex items-center gap-2"
                  >
                    Ouvrir dans Google Maps
                    <ChevronRight className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>

              {/* Urgence */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="card p-6 bg-gradient-to-br from-accent-500 to-orange-500 text-white"
              >
                <div className="flex items-center gap-4 mb-4">
                  <AlertTriangle className="w-8 h-8" />
                  <h3 className="font-display font-bold text-lg">
                    Urgence électrique ?
                  </h3>
                </div>
                <p className="text-white/90 mb-4">
                  Pour une intervention immédiate, utilisez notre formulaire dédié.
                </p>
                <Link
                  href="/demande-intervention"
                  className="btn bg-white text-accent-600 hover:bg-white/90 w-full justify-center"
                >
                  Intervention urgente
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

