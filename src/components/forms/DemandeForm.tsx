"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import {
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
  User,
  MapPin,
  FileText,
  Wrench,
} from "lucide-react";
import { demandeSchema, DemandeFormData, servicesOptions } from "@/lib/schemas";
import {
  InputField,
  SelectField,
  TextareaField,
  CheckboxField,
  RadioGroup,
  CheckboxGroup,
} from "./FormField";
import FileUpload from "./FileUpload";

interface DemandeFormProps {
  type: "devis" | "intervention";
}

const civiliteOptions = [
  { value: "M.", label: "Monsieur" },
  { value: "Mme", label: "Madame" },
  { value: "Mlle", label: "Mademoiselle" },
];

const typeBatimentOptions = [
  { value: "Maison", label: "Maison" },
  { value: "Appartement", label: "Appartement" },
  { value: "Société / Local commercial", label: "Société / Local commercial" },
  { value: "Copropriété", label: "Copropriété" },
];

const urgenceOptions = [
  {
    value: "urgence",
    label: "Urgence",
    description: "Intervention dans les 2h si possible",
  },
  {
    value: "non-urgence",
    label: "Non urgent",
    description: "Prise de rendez-vous selon vos disponibilités",
  },
];

const steps = [
  { id: 1, title: "Coordonnées", icon: User },
  { id: 2, title: "Adresse", icon: MapPin },
  { id: 3, title: "Services", icon: Wrench },
  { id: 4, title: "Détails", icon: FileText },
];

export default function DemandeForm({ type }: DemandeFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [files, setFiles] = useState<File[]>([]);

  const {
    register,
    handleSubmit,
    control,
    watch,
    trigger,
    formState: { errors },
  } = useForm<DemandeFormData>({
    resolver: zodResolver(demandeSchema),
    defaultValues: {
      facturationIdentique: true,
      services: [],
      urgence: type === "intervention" ? "urgence" : "non-urgence",
      consentement: false,
    },
  });

  const facturationIdentique = watch("facturationIdentique");

  const validateStep = async (step: number): Promise<boolean> => {
    switch (step) {
      case 1:
        return await trigger(["civilite", "nom", "prenom", "email", "telephone"]);
      case 2:
        return await trigger([
          "adresseIntervention.typeBatiment",
          "adresseIntervention.numeroRue",
          "adresseIntervention.codePostal",
          "adresseIntervention.ville",
        ]);
      case 3:
        return await trigger(["services", "urgence"]);
      case 4:
        return await trigger(["consentement"]);
      default:
        return true;
    }
  };

  const nextStep = async () => {
    const isValid = await validateStep(currentStep);
    if (isValid && currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const onSubmit = async (data: DemandeFormData) => {
    setSubmitStatus("loading");

    try {
      // Préparer les données selon le type de demande
      const apiEndpoint = type === "devis" ? "/api/devis" : "/api/intervention";
      
      // Mapper les données du formulaire au format attendu par l'API
      const requestData = type === "devis" ? {
        civilite: data.civilite,
        nom: data.nom,
        prenom: data.prenom,
        email: data.email,
        telephone: data.telephone,
        adresse: data.adresseIntervention.numeroRue,
        codePostal: data.adresseIntervention.codePostal,
        ville: data.adresseIntervention.ville,
        typeBatiment: data.adresseIntervention.typeBatiment,
        services: data.services || [],
        delai: data.urgence === "urgence" ? "Urgent (moins de 48h)" : "Sous 1 semaine",
        description: data.message || "",
        budget: undefined,
      } : {
        civilite: data.civilite,
        nom: data.nom,
        prenom: data.prenom,
        email: data.email,
        telephone: data.telephone,
        adresse: data.adresseIntervention.numeroRue,
        codePostal: data.adresseIntervention.codePostal,
        ville: data.adresseIntervention.ville,
        typeBatiment: data.adresseIntervention.typeBatiment,
        typeIntervention: data.services?.[0] || "Intervention urgente",
        description: data.message || "",
        disponibilite: data.urgence === "urgence" ? "Immédiatement" : "Selon disponibilités",
      };

      // Envoyer à l'API
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Erreur lors de l\'envoi');
      }

      // TODO: Upload files if any (voir étape upload d'images)
      if (files.length > 0) {
        console.log('Files à uploader:', files);
        // L'upload de fichiers sera implémenté dans la phase d'optimisation
      }

      setSubmitStatus("success");
    } catch (error) {
      console.error('Erreur:', error);
      setSubmitStatus("error");
    }
  };

  if (submitStatus === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="card p-12 text-center"
      >
        <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="font-display font-bold text-2xl text-dark-900 mb-4">
          Demande envoyée avec succès !
        </h2>
        <p className="text-dark-600 max-w-md mx-auto mb-8">
          Nous avons bien reçu votre demande de {type === "devis" ? "devis" : "d'intervention"}.
          Notre équipe vous contactera dans les plus brefs délais.
        </p>
        <Link href="/" className="btn-primary">
          Retour à l&apos;accueil
        </Link>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card p-6 md:p-8">
      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-8 overflow-x-auto pb-4">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div
              className={`flex items-center gap-2 ${
                currentStep === step.id
                  ? "text-primary-600"
                  : currentStep > step.id
                  ? "text-green-600"
                  : "text-dark-400"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-colors ${
                  currentStep === step.id
                    ? "bg-primary-600 text-white"
                    : currentStep > step.id
                    ? "bg-green-600 text-white"
                    : "bg-dark-100 text-dark-500"
                }`}
              >
                {currentStep > step.id ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  <step.icon className="w-5 h-5" />
                )}
              </div>
              <span className="font-medium hidden sm:inline">{step.title}</span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`w-8 sm:w-16 h-0.5 mx-2 ${
                  currentStep > step.id ? "bg-green-600" : "bg-dark-200"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* Step 1: Coordonnées */}
        {currentStep === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h3 className="font-display font-bold text-xl text-dark-900 mb-6">
              Vos coordonnées
            </h3>

            <SelectField
              label="Civilité"
              required
              options={civiliteOptions}
              placeholder="Sélectionnez..."
              error={errors.civilite?.message}
              {...register("civilite")}
            />

            <div className="grid md:grid-cols-2 gap-4">
              <InputField
                label="Nom"
                required
                placeholder="Dupont"
                error={errors.nom?.message}
                {...register("nom")}
              />
              <InputField
                label="Prénom"
                required
                placeholder="Jean"
                error={errors.prenom?.message}
                {...register("prenom")}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <InputField
                label="Email"
                type="email"
                required
                placeholder="jean.dupont@email.com"
                error={errors.email?.message}
                {...register("email")}
              />
              <InputField
                label="Téléphone"
                type="tel"
                required
                placeholder="06 12 34 56 78"
                error={errors.telephone?.message}
                {...register("telephone")}
              />
            </div>

            <InputField
              label="Société / Organisme (optionnel)"
              placeholder="Nom de votre entreprise"
              error={errors.societe?.message}
              {...register("societe")}
            />
          </motion.div>
        )}

        {/* Step 2: Adresse */}
        {currentStep === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h3 className="font-display font-bold text-xl text-dark-900 mb-6">
              Adresse d&apos;intervention
            </h3>

            <SelectField
              label="Type de bâtiment"
              required
              options={typeBatimentOptions}
              placeholder="Sélectionnez..."
              error={errors.adresseIntervention?.typeBatiment?.message}
              {...register("adresseIntervention.typeBatiment")}
            />

            <InputField
              label="Numéro et rue"
              required
              placeholder="12 rue de la République"
              error={errors.adresseIntervention?.numeroRue?.message}
              {...register("adresseIntervention.numeroRue")}
            />

            <div className="grid md:grid-cols-2 gap-4">
              <InputField
                label="Code postal"
                required
                placeholder="92110"
                error={errors.adresseIntervention?.codePostal?.message}
                {...register("adresseIntervention.codePostal")}
              />
              <InputField
                label="Ville"
                required
                placeholder="Clichy"
                error={errors.adresseIntervention?.ville?.message}
                {...register("adresseIntervention.ville")}
              />
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <InputField
                label="Escalier / Bâtiment"
                placeholder="Bât. A"
                {...register("adresseIntervention.escalierBatiment")}
              />
              <InputField
                label="Étage"
                placeholder="3ème"
                {...register("adresseIntervention.etage")}
              />
              <InputField
                label="Code d'accès"
                placeholder="1234A"
                {...register("adresseIntervention.codeAcces")}
              />
            </div>

            <div className="border-t border-dark-100 pt-6">
              <CheckboxField
                label="L'adresse de facturation est identique à l'adresse d'intervention"
                {...register("facturationIdentique")}
              />

              {!facturationIdentique && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6 space-y-4 p-6 bg-dark-50 rounded-xl"
                >
                  <h4 className="font-semibold text-dark-900">Adresse de facturation</h4>
                  
                  <SelectField
                    label="Type de bâtiment"
                    required
                    options={typeBatimentOptions}
                    placeholder="Sélectionnez..."
                    {...register("adresseFacturation.typeBatiment")}
                  />

                  <InputField
                    label="Numéro et rue"
                    required
                    placeholder="12 rue de la République"
                    {...register("adresseFacturation.numeroRue")}
                  />

                  <div className="grid md:grid-cols-2 gap-4">
                    <InputField
                      label="Code postal"
                      required
                      placeholder="92110"
                      {...register("adresseFacturation.codePostal")}
                    />
                    <InputField
                      label="Ville"
                      required
                      placeholder="Clichy"
                      {...register("adresseFacturation.ville")}
                    />
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}

        {/* Step 3: Services */}
        {currentStep === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div>
              <h3 className="font-display font-bold text-xl text-dark-900 mb-6">
                Services souhaités
              </h3>

              <Controller
                name="services"
                control={control}
                render={({ field }) => (
                  <CheckboxGroup
                    label="Sélectionnez un ou plusieurs services"
                    required
                    options={servicesOptions.map((s) => ({
                      value: s.value,
                      label: s.label,
                    }))}
                    selectedValues={field.value}
                    onChange={field.onChange}
                    error={errors.services?.message}
                  />
                )}
              />
            </div>

            <div>
              <RadioGroup
                label="Degré d'urgence"
                required
                options={urgenceOptions}
                error={errors.urgence?.message}
                {...register("urgence")}
              />
            </div>
          </motion.div>
        )}

        {/* Step 4: Détails */}
        {currentStep === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h3 className="font-display font-bold text-xl text-dark-900 mb-6">
              Informations complémentaires
            </h3>

            <FileUpload onFilesChange={setFiles} />

            <TextareaField
              label="Message complémentaire"
              placeholder="Décrivez votre besoin en détail : type de travaux, contraintes particulières, disponibilités..."
              {...register("message")}
            />

            <div className="p-6 bg-dark-50 rounded-xl">
              <CheckboxField
                label="Je certifie avoir lu et accepté les conditions générales de service"
                error={errors.consentement?.message}
                {...register("consentement")}
              />

              {type === "intervention" && (
                <p className="mt-4 text-sm text-dark-600">
                  💳 Le règlement se fera par chèque ou via un lien de paiement
                  carte bancaire sécurisé envoyé après l&apos;intervention.
                </p>
              )}
            </div>

            {submitStatus === "error" && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-700">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <p>Une erreur est survenue. Veuillez réessayer.</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex justify-between mt-8 pt-6 border-t border-dark-100">
        {currentStep > 1 ? (
          <button type="button" onClick={prevStep} className="btn-ghost">
            Précédent
          </button>
        ) : (
          <div />
        )}

        {currentStep < 4 ? (
          <button type="button" onClick={nextStep} className="btn-primary">
            Suivant
          </button>
        ) : (
          <button
            type="submit"
            disabled={submitStatus === "loading"}
            className="btn-primary"
          >
            {submitStatus === "loading" ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Envoi en cours...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Envoyer ma demande
              </>
            )}
          </button>
        )}
      </div>
    </form>
  );
}

