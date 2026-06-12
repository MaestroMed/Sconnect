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
});

export const contactApiSchema = z.object({
  nom: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Email invalide'),
  objet: z.string().min(3, "L'objet doit contenir au moins 3 caractères"),
  // Sur le formulaire contact, le message EST le contenu — requis ici ET
  // côté client (contactSchema de src/lib/schemas.ts exige aussi min 20).
  message: z.string().min(20, 'Le message doit contenir au moins 20 caractères'),
});
