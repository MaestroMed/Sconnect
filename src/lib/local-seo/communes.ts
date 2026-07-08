import communesData from "./communes.json";

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
  process.env.NEXT_PUBLIC_LOCALSEO_MIN_POP ?? 50000,
);

export function publishedCommunes(): Commune[] {
  return COMMUNES.filter((c) => c.population >= WAVE_MIN_POPULATION);
}

export function isPublished(c: Commune): boolean {
  return c.population >= WAVE_MIN_POPULATION;
}
