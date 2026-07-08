import communesData from "./communes.json";
import { getLocalContext } from "./local-context";

export interface Commune {
  code: string; // code INSEE
  nom: string;
  dept: string; // "75".."95"
  population: number;
  cp: string; // code postal principal
  lat: number;
  lon: number;
  distanceKm: number; // distance depuis l'atelier de Clichy
  slug: string;
  tier: "A" | "B" | "C" | "D"; // A ≥50k, B ≥20k, C ≥10k, D ≥5k
  interventionMin: number; // temps d'intervention estimé (min)
  profile: "tertiaire-dense" | "tertiaire" | "mixte" | "residentiel";
  nearby: { slug: string; nom: string }[];
  densite?: number; // habitants/km² (INSEE population / superficie API Géo)
}

export const COMMUNES = communesData as Commune[];

const BY_SLUG = new Map(COMMUNES.map((c) => [c.slug, c]));

export function getCommune(slug: string): Commune | undefined {
  return BY_SLUG.get(slug);
}

const DEPT_NOM: Record<string, string> = {
  "75": "Paris",
  "77": "Seine-et-Marne",
  "78": "Yvelines",
  "91": "Essonne",
  "92": "Hauts-de-Seine",
  "93": "Seine-Saint-Denis",
  "94": "Val-de-Marne",
  "95": "Val-d'Oise",
};
export const deptNom = (dept: string) => DEPT_NOM[dept] ?? "Île-de-France";

/**
 * Déploiement PAR VAGUES (recommandation de l'étude : ne pas publier 4500
 * pages d'un coup sur un domaine jeune). On publie les communes dont la
 * population dépasse le seuil de la vague active ; les autres ne sont pas
 * générées (dynamicParams = false → 404 propre) tant que la vague n'est pas
 * ouverte. On baisse le seuil vague après vague en surveillant la GSC.
 *
 *   Vague 1 : ≥ 50 000 hab → 45 communes  (× 12 services = 540 pages)
 *   Vague 2 : ≥ 20 000 hab → 176 communes (× 12 = 2 112)
 *   Vague 3 : ≥ 10 000 hab → 266 communes (× 12 = 3 192)
 *   Vague 4 : ≥ 5 000 hab  → 377 communes (× 12 = 4 524)  [matrice complète]
 */
export const WAVE_MIN_POPULATION = Number(
  process.env.NEXT_PUBLIC_LOCALSEO_MIN_POP ?? 5000,
);

export function publishedCommunes(): Commune[] {
  return COMMUNES.filter((c) => c.population >= WAVE_MIN_POPULATION);
}

export function isPublished(c: Commune): boolean {
  return c.population >= WAVE_MIN_POPULATION;
}

/**
 * INDEXABILITÉ — source de vérité unique (factory noindex + hub + sitemap).
 *
 * Une commune n'est exposée à l'indexation Google QUE si elle possède un
 * contexte local RÉEL et unique (entrée dans local-context.json). Les pages
 * sans contexte restent servies (ISR 200) pour le trafic direct/pub mais en
 * noindex, pour ne jamais gonfler le ratio de pages minces (risque de démotion
 * SITEWIDE sur le programmatique à faible variation — Core Update 21 mai 2026).
 *
 * Invariant : « enrichi ⟺ indexé ». Ajouter une commune à local-context.json
 * l'indexe automatiquement (noindex levé + entrée sitemap + lien hub), sans
 * toucher au code. Les 45 communes tier A sont toutes enrichies ; l'ouverture
 * du tier B se fait vague par vague en enrichissant, pas en changeant un seuil.
 */
export function isIndexableCommune(c: Commune): boolean {
  return isPublished(c) && Boolean(getLocalContext(c.slug));
}

/** Communes indexables (enrichies) — pour le sitemap et le maillage des hubs. */
export function indexableCommunes(): Commune[] {
  return COMMUNES.filter(isIndexableCommune);
}
