import { z } from 'zod';

/**
 * Schémas de validation des routes API publiques (leads).
 *
 * Extraits des fichiers route.ts pour être TESTABLES : un test de contrat
 * (api-schemas.test.ts) vérifie que le payload exact produit par les
 * formulaires passe la validation serveur. C'est ce qui a manqué quand
 * l'API exigeait `description.min(20)` alors que le formulaire déclarait le
 * message optionnel : tout prospect au message vide recevait un 400
 * « Envoi impossible » — invisible des e2e qui mockent l'API.
 *
 * Règle : le formulaire est le contrat. Toute contrainte ajoutée ici doit
 * être appliquée AUSSI côté client (sinon le test de contrat échouera).
 */

/**
 * Pièce jointe transmise en base64 dans le corps JSON. Bornée (max 4 fichiers,
 * ~3 Mo cumulés côté client + garde serveur dans la route) pour rester sous la
 * limite de body de la plateforme (~4,5 Mo) — au-delà, la requête échouerait
 * AVANT d'atteindre la route et le lead serait perdu.
 */
export const mailAttachmentSchema = z.object({
  filename: z.string().min(1).max(200),
  content: z.string().min(1), // base64 (sans préfixe data:)
  contentType: z.string().max(120).optional(),
});
export type MailAttachment = z.infer<typeof mailAttachmentSchema>;

export const devisSchema = z.object({
  civilite: z.enum(['M.', 'Mme', 'Mlle']),
  nom: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  prenom: z.string().min(2, 'Le prénom doit contenir au moins 2 caractères'),
  email: z.string().email('Email invalide'),
  telephone: z.string().min(10, 'Numéro de téléphone invalide'),
  // Contrat aligné sur DemandeForm : adresse = numeroRue seul (peut être court)
  adresse: z.string().min(1, 'Adresse requise'),
  codePostal: z.string().regex(/^\d{5}$/, 'Code postal invalide (5 chiffres)'),
  ville: z.string().min(2, 'La ville doit contenir au moins 2 caractères'),
  typeBatiment: z.string(),
  services: z.array(z.string()).min(1, 'Sélectionnez au moins un service'),
  delai: z.string(),
  // Le formulaire présente le message comme OPTIONNEL (payload
  // `description: data.message || ""`). Un devis sans description reste un
  // bon lead — ne jamais le rejeter pour ça.
  description: z.string().max(5000).optional().default(''),
  budget: z.string().optional(),
  attachments: z.array(mailAttachmentSchema).max(4).optional().default([]),
});

export const interventionSchema = z.object({
  civilite: z.enum(['M.', 'Mme', 'Mlle']),
  nom: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  prenom: z.string().min(2, 'Le prénom doit contenir au moins 2 caractères'),
  email: z.string().email('Email invalide'),
  telephone: z.string().min(10, 'Numéro de téléphone invalide'),
  adresse: z.string().min(1, 'Adresse requise'),
  codePostal: z.string().regex(/^\d{5}$/, 'Code postal invalide (5 chiffres)'),
  ville: z.string().min(2, 'La ville doit contenir au moins 2 caractères'),
  typeBatiment: z.string(),
  typeIntervention: z.string(),
  // Pour une URGENCE, rejeter un lead parce que la description est vide est
  // le pire arbitrage — le rappel téléphonique est le vrai canal.
  description: z.string().max(5000).optional().default(''),
  disponibilite: z.string(),
  attachments: z.array(mailAttachmentSchema).max(4).optional().default([]),
});

export const contactApiSchema = z.object({
  nom: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Email invalide'),
  objet: z.string().min(3, "L'objet doit contenir au moins 3 caractères"),
  // Sur le formulaire contact, le message EST le contenu — requis ici ET
  // côté client (contactSchema de src/lib/schemas.ts exige aussi min 20).
  message: z.string().min(20, 'Le message doit contenir au moins 20 caractères'),
});
