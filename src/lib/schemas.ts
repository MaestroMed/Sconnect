import { z } from "zod";

// Regex pour validation
const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
const postalCodeRegex = /^\d{5}$/;

// Schéma pour les coordonnées
export const coordonneesSchema = z.object({
  civilite: z.enum(["M.", "Mme", "Mlle"], {
    required_error: "Veuillez sélectionner une civilité",
  }),
  nom: z
    .string()
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .max(50, "Le nom ne peut pas dépasser 50 caractères"),
  prenom: z
    .string()
    .min(2, "Le prénom doit contenir au moins 2 caractères")
    .max(50, "Le prénom ne peut pas dépasser 50 caractères"),
  email: z
    .string()
    .email("Veuillez entrer une adresse email valide"),
  telephone: z
    .string()
    .regex(phoneRegex, "Veuillez entrer un numéro de téléphone valide"),
  societe: z.string().optional(),
});

// Schéma pour l'adresse
export const adresseSchema = z.object({
  typeBatiment: z.enum(
    ["Maison", "Appartement", "Société / Local commercial", "Copropriété"],
    { required_error: "Veuillez sélectionner un type de bâtiment" }
  ),
  numeroRue: z
    .string()
    .min(1, "Veuillez entrer le numéro et la rue"),
  codePostal: z
    .string()
    .regex(postalCodeRegex, "Le code postal doit contenir 5 chiffres"),
  ville: z
    .string()
    .min(2, "Veuillez entrer une ville valide"),
  escalierBatiment: z.string().optional(),
  etage: z.string().optional(),
  codeAcces: z.string().optional(),
});

// Liste des services
export const servicesOptions = [
  { value: "installation-renovation", label: "Installation / Rénovation électrique" },
  { value: "mise-aux-normes", label: "Mise aux normes" },
  { value: "depannage-urgence", label: "Dépannage & Urgences" },
  { value: "domotique-fibre", label: "Domotique & Fibre" },
  { value: "maintenance-contrat", label: "Maintenance / Contrat" },
] as const;

// Schéma complet pour le formulaire de devis/intervention
export const demandeSchema = z.object({
  // Coordonnées
  ...coordonneesSchema.shape,
  
  // Adresse d'intervention
  adresseIntervention: adresseSchema,
  
  // Adresse de facturation
  facturationIdentique: z.boolean().default(true),
  adresseFacturation: adresseSchema.optional(),
  
  // Services sélectionnés
  services: z
    .array(z.string())
    .min(1, "Veuillez sélectionner au moins un service"),
  
  // Urgence
  urgence: z.enum(["urgence", "non-urgence"], {
    required_error: "Veuillez indiquer le degré d'urgence",
  }),
  
  // Message
  message: z.string().optional(),
  
  // Consentement
  consentement: z
    .boolean()
    .refine((val) => val === true, {
      message: "Vous devez accepter les conditions générales",
    }),
});

// Type inféré du schéma
export type DemandeFormData = z.infer<typeof demandeSchema>;

// Schéma pour le formulaire de contact simple
export const contactSchema = z.object({
  nom: z
    .string()
    .min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z
    .string()
    .email("Veuillez entrer une adresse email valide"),
  objet: z
    .string()
    .min(5, "L'objet doit contenir au moins 5 caractères"),
  message: z
    .string()
    .min(20, "Le message doit contenir au moins 20 caractères")
    .max(2000, "Le message ne peut pas dépasser 2000 caractères"),
});

export type ContactFormData = z.infer<typeof contactSchema>;

