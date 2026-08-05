"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
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
import { AuroraBackdrop, NoiseOverlay } from "@/components/ui/ambient";
import BulbText from "@/components/ui/BulbText";
import { InputField, TextareaField } from "@/components/forms/FormField";

export default function ContactPage() {
  const reduceMotion = useReducedMotion();
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
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de l\'envoi');
      }

      setSubmitStatus("success");
      setFormState({ nom: "", email: "", objet: "", message: "" });
      setErrors({});
    } catch (error) {
      console.error('Erreur:', error);
      setSubmitStatus("error");
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="relative bg-dark-950 py-20 md:py-28 overflow-hidden">
        <AuroraBackdrop intensity="soft" />
        <div className="absolute inset-0 bg-grid opacity-[0.12]" />
        <NoiseOverlay opacity={0.05} />

        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            {/* initial={false} : le H1 (candidat LCP) doit être visible dès le
                premier paint SSR, pas après un fade 0→1. */}
            <motion.div initial={false} animate={{ opacity: 1, y: 0 }}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-300 text-sm font-semibold mb-6 backdrop-blur-sm">
                <Mail className="w-4 h-4" />
                Contact
              </span>
              <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight">
                <BulbText>Contactez-nous</BulbText>
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
      <section className="section-padding bg-surface">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <motion.div
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                className="card p-6 md:p-8"
              >
                <h2 className="font-display font-bold text-2xl text-foreground mb-6">
                  Envoyez-nous un message
                </h2>

                {submitStatus === "success" ? (
                  <div className="text-center py-12" role="status">
                    <div className="w-16 h-16 mx-auto bg-green-100 dark:bg-green-500/15 rounded-full flex items-center justify-center mb-4">
                      <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="font-display font-bold text-xl text-foreground mb-2">
                      Message envoyé !
                    </h3>
                    <p className="text-foreground-muted mb-6">
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
                      <InputField
                        label="Nom"
                        required
                        type="text"
                        name="nom"
                        autoComplete="name"
                        placeholder="Votre nom"
                        value={formState.nom}
                        error={errors.nom}
                        onChange={(e) =>
                          setFormState({ ...formState, nom: e.target.value })
                        }
                      />
                      <InputField
                        label="Email"
                        required
                        type="email"
                        name="email"
                        autoComplete="email"
                        inputMode="email"
                        placeholder="votre@email.com"
                        value={formState.email}
                        error={errors.email}
                        onChange={(e) =>
                          setFormState({ ...formState, email: e.target.value })
                        }
                      />
                    </div>

                    <InputField
                      label="Objet"
                      required
                      type="text"
                      name="objet"
                      placeholder="Objet de votre message"
                      value={formState.objet}
                      error={errors.objet}
                      onChange={(e) =>
                        setFormState({ ...formState, objet: e.target.value })
                      }
                    />

                    <TextareaField
                      label="Message"
                      required
                      name="message"
                      className="min-h-[150px]"
                      placeholder="Décrivez votre demande..."
                      value={formState.message}
                      error={errors.message}
                      onChange={(e) =>
                        setFormState({ ...formState, message: e.target.value })
                      }
                    />

                    {submitStatus === "error" && (
                      <div className="p-4 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-xl flex items-start gap-3 text-red-700 dark:text-red-300">
                        <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                        <p>
                          Une erreur est survenue. Réessayez, ou appelez-nous
                          directement au{" "}
                          <a href="tel:+33652820685" className="font-semibold underline">
                            06 52 82 06 85
                          </a>
                          .
                        </p>
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
                initial={reduceMotion ? false : { opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="card p-6"
              >
                <h3 className="font-display font-bold text-lg text-foreground mb-6">
                  Nos coordonnées
                </h3>
                <ul className="space-y-5">
                  <li>
                    <a
                      href="tel:+33652820685"
                      className="flex items-start gap-4 group"
                    >
                      <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center group-hover:bg-primary-200 transition-colors">
                        <Phone className="w-6 h-6 text-primary-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground group-hover:text-primary-600 transition-colors">
                          06 52 82 06 85
                        </p>
                        <p className="text-sm text-foreground-muted">
                          Urgences 24h/24
                        </p>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a
                      href="mailto:contact@sconnectfrance.fr"
                      className="flex items-start gap-4 group"
                    >
                      <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center group-hover:bg-primary-200 transition-colors">
                        <Mail className="w-6 h-6 text-primary-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground group-hover:text-primary-600 transition-colors">
                          contact@sconnectfrance.fr
                        </p>
                        <p className="text-sm text-foreground-muted">
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
                      <p className="font-semibold text-foreground">
                        35 rue des Cailloux
                      </p>
                      <p className="text-foreground-muted">92110 Clichy</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                      <Clock className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Horaires</p>
                      <p className="text-foreground-muted text-sm">
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
                initial={reduceMotion ? false : { opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="card overflow-hidden"
              >
                <div className="aspect-square bg-surface-muted relative">
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
                initial={reduceMotion ? false : { opacity: 0, x: 20 }}
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

