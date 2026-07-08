import data from "./local-context.json";

/**
 * Contexte local RÉEL par commune — le levier d'unicité qui fait passer les
 * pages programmatiques au-dessus du seuil « ≥60% contenu unique » (au-delà
 * des seuls chiffres INSEE injectés). Chaque entrée est recherchée/vérifiée
 * (zones d'activité, quartiers d'affaires, desserte transports, profil bâti
 * réel), jamais générée par template. Peuplé par vagues via la boucle
 * d'enrichissement ; une commune sans entrée retombe sur le contenu de base.
 */
export interface LocalContext {
  /** 2-4 phrases de contexte local propre à la commune (fait réel). */
  paragraphe: string;
  /** Zones d'activité / quartiers notables (pour le maillage sémantique). */
  zones?: string[];
  /** Desserte transports (RER, métro, gares, tram). */
  transports?: string;
  /** Angle métier local (ex. forte densité tertiaire → relamping bureaux). */
  angle?: string;
}

const MAP = data as Record<string, LocalContext>;

export const getLocalContext = (slug: string): LocalContext | undefined => MAP[slug];
export const localContextSlugs = () => Object.keys(MAP);
export const localContextCount = () => Object.keys(MAP).length;
