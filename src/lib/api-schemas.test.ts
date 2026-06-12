import { describe, it, expect } from "vitest";
import { devisSchema, interventionSchema, contactApiSchema } from "./api-schemas";

/**
 * TESTS DE CONTRAT client ↔ API.
 *
 * Le payload construit ici reproduit EXACTEMENT ce que DemandeForm.tsx envoie
 * (mapping de son onSubmit). Si quelqu'un re-serre la validation serveur sans
 * adapter le formulaire, ces tests cassent — au lieu de perdre des leads en
 * prod avec un 400 silencieux (c'est arrivé : description.min(20) côté API
 * vs message optionnel côté formulaire, masqué par le mock e2e).
 */

// Payload tel que produit par DemandeForm (cas devis, message laissé VIDE —
// le parcours qui cassait en prod).
const devisPayloadSansMessage = {
  civilite: "M." as const,
  nom: "Dupont",
  prenom: "Jean",
  email: "jean.dupont@example.fr",
  telephone: "0612345678",
  adresse: "35", // numeroRue seul — le form n'envoie QUE ce champ
  codePostal: "92110",
  ville: "Clichy",
  typeBatiment: "appartement",
  services: ["electricite"],
  delai: "Sous 1 semaine",
  description: "", // data.message || "" quand le message optionnel est vide
  budget: undefined,
};

describe("contrat formulaire devis ↔ /api/devis", () => {
  it("accepte une soumission SANS message (le champ est optionnel côté form)", () => {
    const result = devisSchema.safeParse(devisPayloadSansMessage);
    expect(result.success).toBe(true);
  });

  it("accepte une adresse courte (numeroRue seul, ex: « 35 »)", () => {
    const result = devisSchema.safeParse({ ...devisPayloadSansMessage, adresse: "35" });
    expect(result.success).toBe(true);
  });

  it("rejette toujours un email invalide", () => {
    const result = devisSchema.safeParse({ ...devisPayloadSansMessage, email: "pas-un-email" });
    expect(result.success).toBe(false);
  });

  it("rejette une soumission sans service sélectionné", () => {
    const result = devisSchema.safeParse({ ...devisPayloadSansMessage, services: [] });
    expect(result.success).toBe(false);
  });
});

describe("contrat formulaire intervention ↔ /api/intervention", () => {
  const interventionPayload = {
    civilite: "Mme" as const,
    nom: "Martin",
    prenom: "Sophie",
    email: "sophie.martin@example.fr",
    telephone: "0698765432",
    adresse: "12",
    codePostal: "75017",
    ville: "Paris",
    typeBatiment: "maison",
    typeIntervention: "depannage-electrique",
    description: "", // urgence sans description = lead valide, on rappelle
    disponibilite: "Dès que possible",
  };

  it("accepte une urgence SANS description", () => {
    const result = interventionSchema.safeParse(interventionPayload);
    expect(result.success).toBe(true);
  });
});

describe("contrat formulaire contact ↔ /api/contact", () => {
  it("le schéma client (min 20 chars) est au moins aussi strict que l'API", () => {
    // Sur le contact, le message EST le contenu : requis des deux côtés.
    const ok = contactApiSchema.safeParse({
      nom: "Durand",
      email: "p.durand@example.fr",
      objet: "Question devis",
      message: "Bonjour, je souhaite un devis pour un relamping de bureau.",
    });
    expect(ok.success).toBe(true);

    const tropCourt = contactApiSchema.safeParse({
      nom: "Durand",
      email: "p.durand@example.fr",
      objet: "Question",
      message: "court",
    });
    expect(tropCourt.success).toBe(false);
  });
});
