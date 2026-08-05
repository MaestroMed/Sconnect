"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
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

// Cumul max des pièces jointes envoyées en base64 dans le corps JSON. Au-delà,
// la requête dépasse la limite de body de la plateforme (~4,5 Mo après +33%
// d'overhead base64) et échouerait AVANT d'atteindre l'API → lead perdu.
const MAX_TOTAL_ATTACH_BYTES = 3 * 1024 * 1024;

type LeadAttachment = { filename: string; content: string; contentType: string };

/** Lit un fichier en base64 (sans le préfixe data:) pour l'envoi JSON. */
function fileToAttachment(file: File): Promise<LeadAttachment> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result || "");
      const comma = result.indexOf(",");
      resolve({
        filename: file.name,
        content: comma >= 0 ? result.slice(comma + 1) : result,
        contentType: file.type || "application/octet-stream",
      });
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

// « Mademoiselle » est banni des formulaires administratifs depuis 2012
// (circulaire n° 5575/SG) — l'option est retirée ; « Mlle » reste accepté
// dans le schéma pour ne pas invalider les anciens brouillons.
const civiliteOptions = [
  { value: "M.", label: "Monsieur" },
  { value: "Mme", label: "Madame" },
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

const DRAFT_TTL_MS = 24 * 60 * 60 * 1000;
const draftStorageKey = (type: "devis" | "intervention") => `sconnect-${type}-draft`;

type DraftEnvelope = {
  values: Partial<DemandeFormData>;
  savedAt: number;
};

export default function DemandeForm({ type }: DemandeFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [files, setFiles] = useState<File[]>([]);
  const reduceMotion = useReducedMotion();

  // Transitions d'étapes : annulées si prefers-reduced-motion.
  const stepMotion = reduceMotion
    ? { initial: false as const, animate: { opacity: 1, x: 0 } }
    : {
        initial: { opacity: 0, x: 20 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -20 },
      };

  // Au changement d'étape, le focus part sur le titre de la nouvelle étape
  // (sinon il reste sur le bouton « Suivant » et un lecteur d'écran n'annonce
  // rien). Callback ref : avec AnimatePresence mode="wait", le nouveau titre
  // ne monte qu'après l'animation de sortie — un useEffect sur currentStep
  // viserait un nœud pas encore monté.
  const shouldFocusTitleRef = useRef(false);
  const stepTitleRef = useCallback((node: HTMLHeadingElement | null) => {
    if (node && shouldFocusTitleRef.current) {
      shouldFocusTitleRef.current = false;
      node.focus();
    }
  }, []);

  const {
    register,
    handleSubmit,
    control,
    watch,
    trigger,
    reset,
    formState: { errors, isDirty },
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

  const storageKey = draftStorageKey(type);
  const restorePromptedRef = useRef(false);

  useEffect(() => {
    if (restorePromptedRef.current) return;
    if (typeof window === "undefined") return;
    restorePromptedRef.current = true;
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (!raw) return;
      const draft = JSON.parse(raw) as DraftEnvelope;
      if (!draft?.savedAt || Date.now() - draft.savedAt > DRAFT_TTL_MS) {
        window.localStorage.removeItem(storageKey);
        return;
      }
      const id = toast.message("Brouillon trouvé", {
        description: "Reprendre la demande commencée précédemment ?",
        duration: 12000,
        action: {
          label: "Restaurer",
          onClick: () => {
            reset(draft.values as DemandeFormData);
            toast.success("Brouillon restauré");
          },
        },
        cancel: {
          label: "Ignorer",
          onClick: () => {
            window.localStorage.removeItem(storageKey);
          },
        },
      });
      return () => {
        toast.dismiss(id);
      };
    } catch {
      window.localStorage.removeItem(storageKey);
    }
  }, [reset, storageKey]);

  const watchedValues = watch();
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!isDirty) return;
    if (submitStatus === "success") return;
    const handle = window.setTimeout(() => {
      try {
        const envelope: DraftEnvelope = { values: watchedValues, savedAt: Date.now() };
        window.localStorage.setItem(storageKey, JSON.stringify(envelope));
      } catch {
        // localStorage may be full or disabled — ignore silently
      }
    }, 1000);
    return () => window.clearTimeout(handle);
  }, [watchedValues, isDirty, submitStatus, storageKey]);

  // shouldFocus : en cas d'erreur, le focus va directement sur le premier
  // champ invalide au lieu de rester sur le bouton « Suivant ».
  const validateStep = async (step: number): Promise<boolean> => {
    switch (step) {
      case 1:
        return await trigger(["civilite", "nom", "prenom", "email", "telephone"], {
          shouldFocus: true,
        });
      case 2:
        return await trigger(
          [
            "adresseIntervention.typeBatiment",
            "adresseIntervention.numeroRue",
            "adresseIntervention.codePostal",
            "adresseIntervention.ville",
          ],
          { shouldFocus: true },
        );
      case 3:
        return await trigger(["services", "urgence"], { shouldFocus: true });
      case 4:
        return await trigger(["consentement"], { shouldFocus: true });
      default:
        return true;
    }
  };

  const nextStep = async () => {
    const isValid = await validateStep(currentStep);
    if (isValid && currentStep < 4) {
      shouldFocusTitleRef.current = true;
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      shouldFocusTitleRef.current = true;
      setCurrentStep((prev) => prev - 1);
    }
  };

  const onSubmit = async (data: DemandeFormData) => {
    setSubmitStatus("loading");

    try {
      // Préparer les données selon le type de demande
      const apiEndpoint = type === "devis" ? "/api/devis" : "/api/intervention";

      // Pièces jointes → base64. Garde-fou taille AVANT l'envoi : un dépassement
      // ferait échouer toute la demande côté plateforme (lead perdu).
      let attachments: LeadAttachment[] = [];
      if (files.length > 0) {
        const totalRaw = files.reduce((n, f) => n + f.size, 0);
        if (totalRaw > MAX_TOTAL_ATTACH_BYTES) {
          setSubmitStatus("error");
          toast.error("Pièces jointes trop lourdes", {
            description:
              "Limitez-les à 3 Mo au total (ou envoyez-les par e-mail après). Votre demande n'a pas été envoyée.",
          });
          return;
        }
        attachments = await Promise.all(files.map(fileToAttachment));
      }

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

      // Envoyer à l'API (données + pièces jointes base64 dans le même corps)
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...requestData, attachments }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Erreur lors de l\'envoi');
      }

      setSubmitStatus("success");
      if (typeof window !== "undefined") {
        window.localStorage.removeItem(storageKey);
      }
      toast.success(
        type === "devis" ? "Devis envoyé avec succès" : "Demande d'intervention envoyée",
        { description: "Nous vous recontactons dans les plus brefs délais." },
      );
    } catch (error) {
      console.error('Erreur:', error);
      setSubmitStatus("error");
      const message = error instanceof Error ? error.message : "Une erreur est survenue";
      toast.error("Envoi impossible", { description: message });
    }
  };

  if (submitStatus === "success") {
    return (
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        role="status"
        className="card p-12 text-center"
      >
        <div className="w-20 h-20 mx-auto bg-green-100 dark:bg-green-500/15 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-10 h-10 text-green-600 dark:text-green-400" />
        </div>
        <h2 className="font-display font-bold text-2xl text-foreground mb-4">
          Demande envoyée avec succès !
        </h2>
        <p className="text-foreground-muted max-w-md mx-auto mb-8">
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
      {/* Progress Steps — <ol> + aria-current : la progression est une vraie
          liste ordonnée pour les technologies d'assistance. */}
      <ol
        aria-label="Étapes de la demande"
        className="flex items-center justify-between mb-8 overflow-x-auto pb-4"
      >
        {steps.map((step, index) => (
          <li
            key={step.id}
            aria-current={currentStep === step.id ? "step" : undefined}
            className="flex items-center"
          >
            <div
              className={`flex items-center gap-2 ${
                currentStep === step.id
                  ? "text-primary-600 dark:text-primary-400"
                  : currentStep > step.id
                  ? "text-green-600 dark:text-green-400"
                  : "text-foreground-muted"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-colors ${
                  currentStep === step.id
                    ? "bg-primary-600 text-white"
                    : currentStep > step.id
                    ? "bg-green-600 text-white"
                    : "bg-surface-muted text-foreground-muted"
                }`}
              >
                {currentStep > step.id ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  <step.icon className="w-5 h-5" />
                )}
              </div>
              <span className="font-medium hidden sm:inline">{step.title}</span>
              <span className="sr-only">
                {currentStep > step.id ? " (terminée)" : currentStep === step.id ? " (étape en cours)" : ""}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                aria-hidden="true"
                className={`w-8 sm:w-16 h-0.5 mx-2 ${
                  currentStep > step.id ? "bg-green-600" : "bg-border"
                }`}
              />
            )}
          </li>
        ))}
      </ol>

      <AnimatePresence mode="wait">
        {/* Step 1: Coordonnées */}
        {currentStep === 1 && (
          <motion.div key="step1" {...stepMotion} className="space-y-6">
            <h3
              ref={stepTitleRef}
              tabIndex={-1}
              className="font-display font-bold text-xl text-foreground mb-6 focus:outline-none"
            >
              Vos coordonnées
            </h3>

            <SelectField
              label="Civilité"
              required
              options={civiliteOptions}
              placeholder="Sélectionnez..."
              autoComplete="honorific-prefix"
              error={errors.civilite?.message}
              {...register("civilite")}
            />

            <div className="grid md:grid-cols-2 gap-4">
              <InputField
                label="Nom"
                required
                placeholder="Dupont"
                autoComplete="family-name"
                error={errors.nom?.message}
                {...register("nom")}
              />
              <InputField
                label="Prénom"
                required
                placeholder="Jean"
                autoComplete="given-name"
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
                autoComplete="email"
                inputMode="email"
                error={errors.email?.message}
                {...register("email")}
              />
              <InputField
                label="Téléphone"
                type="tel"
                required
                placeholder="06 12 34 56 78"
                autoComplete="tel"
                inputMode="tel"
                error={errors.telephone?.message}
                {...register("telephone")}
              />
            </div>

            <InputField
              label="Société / Organisme (optionnel)"
              placeholder="Nom de votre entreprise"
              autoComplete="organization"
              error={errors.societe?.message}
              {...register("societe")}
            />
          </motion.div>
        )}

        {/* Step 2: Adresse */}
        {currentStep === 2 && (
          <motion.div key="step2" {...stepMotion} className="space-y-6">
            <h3
              ref={stepTitleRef}
              tabIndex={-1}
              className="font-display font-bold text-xl text-foreground mb-6 focus:outline-none"
            >
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
              autoComplete="address-line1"
              error={errors.adresseIntervention?.numeroRue?.message}
              {...register("adresseIntervention.numeroRue")}
            />

            <div className="grid md:grid-cols-2 gap-4">
              <InputField
                label="Code postal"
                required
                placeholder="92110"
                autoComplete="postal-code"
                inputMode="numeric"
                error={errors.adresseIntervention?.codePostal?.message}
                {...register("adresseIntervention.codePostal")}
              />
              <InputField
                label="Ville"
                required
                placeholder="Clichy"
                autoComplete="address-level2"
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

            <div className="border-t border-border pt-6">
              <CheckboxField
                label="L'adresse de facturation est identique à l'adresse d'intervention"
                {...register("facturationIdentique")}
              />

              {!facturationIdentique && (
                <motion.div
                  initial={reduceMotion ? false : { opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={reduceMotion ? undefined : { opacity: 0, height: 0 }}
                  className="mt-6 space-y-4 p-6 bg-surface-muted rounded-xl"
                >
                  <h4 className="font-semibold text-foreground">Adresse de facturation</h4>

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
                    autoComplete="billing address-line1"
                    {...register("adresseFacturation.numeroRue")}
                  />

                  <div className="grid md:grid-cols-2 gap-4">
                    <InputField
                      label="Code postal"
                      required
                      placeholder="92110"
                      autoComplete="billing postal-code"
                      inputMode="numeric"
                      {...register("adresseFacturation.codePostal")}
                    />
                    <InputField
                      label="Ville"
                      required
                      placeholder="Clichy"
                      autoComplete="billing address-level2"
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
          <motion.div key="step3" {...stepMotion} className="space-y-8">
            <div>
              <h3
                ref={stepTitleRef}
                tabIndex={-1}
                className="font-display font-bold text-xl text-foreground mb-6 focus:outline-none"
              >
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
          <motion.div key="step4" {...stepMotion} className="space-y-6">
            <h3
              ref={stepTitleRef}
              tabIndex={-1}
              className="font-display font-bold text-xl text-foreground mb-6 focus:outline-none"
            >
              Informations complémentaires
            </h3>

            <FileUpload onFilesChange={setFiles} />

            <TextareaField
              label="Message complémentaire"
              placeholder="Décrivez votre besoin en détail : type de travaux, contraintes particulières, disponibilités..."
              {...register("message")}
            />

            <div className="p-6 bg-surface-muted rounded-xl">
              <CheckboxField
                label={
                  <>
                    Je certifie avoir lu et accepté les{" "}
                    <Link
                      href="/conditions-generales"
                      target="_blank"
                      rel="noopener"
                      className="text-primary-600 dark:text-primary-400 underline underline-offset-2 hover:text-primary-700"
                    >
                      conditions générales de service
                    </Link>
                  </>
                }
                error={errors.consentement?.message}
                {...register("consentement")}
              />

              {type === "intervention" && (
                <p className="mt-4 text-sm text-foreground-muted">
                  💳 Le règlement se fera par chèque ou via un lien de paiement
                  carte bancaire sécurisé envoyé après l&apos;intervention.
                </p>
              )}
            </div>

            {submitStatus === "error" && (
              <div className="p-4 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-xl flex items-start gap-3 text-red-700 dark:text-red-300">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <p>
                  L&apos;envoi n&apos;a pas abouti. Réessayez, ou appelez-nous
                  directement au{" "}
                  <a href="tel:+33652820685" className="font-semibold underline">
                    06 52 82 06 85
                  </a>{" "}
                  — nous prenons votre demande par téléphone.
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex justify-between mt-8 pt-6 border-t border-border">
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

