/**
 * Availability / opening-hours helper for the live status badge.
 * Keeps backwards-compat with the existing `hours` string object in site-config.json
 * while introducing an optional structured `schedule` object. Timezone: Europe/Paris.
 */

export type DayKey = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";

export interface DaySchedule {
  open: string | null;
  close: string | null;
}

export type WeeklySchedule = Record<DayKey, DaySchedule>;

export type AvailabilityStatus = "open" | "closing-soon" | "closed" | "emergency-only";

export interface AvailabilityResult {
  status: AvailabilityStatus;
  label: string;
  detail: string;
  emergency: boolean;
}

const DAY_ORDER: DayKey[] = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
const DAY_LABEL: Record<DayKey, string> = {
  mon: "lundi",
  tue: "mardi",
  wed: "mercredi",
  thu: "jeudi",
  fri: "vendredi",
  sat: "samedi",
  sun: "dimanche",
};

/** Default schedule derived from current legacy site-config hours strings. */
export const DEFAULT_SCHEDULE: WeeklySchedule = {
  mon: { open: "08:00", close: "19:00" },
  tue: { open: "08:00", close: "19:00" },
  wed: { open: "08:00", close: "19:00" },
  thu: { open: "08:00", close: "19:00" },
  fri: { open: "08:00", close: "19:00" },
  sat: { open: "09:00", close: "17:00" },
  sun: { open: null, close: null },
};

/** Get the Paris-local clock components for `now`. */
function parisParts(now: Date) {
  const fmt = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Paris",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const parts = fmt.formatToParts(now);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  const weekdayMap: Record<string, DayKey> = {
    Mon: "mon",
    Tue: "tue",
    Wed: "wed",
    Thu: "thu",
    Fri: "fri",
    Sat: "sat",
    Sun: "sun",
  };
  const day = weekdayMap[get("weekday")] ?? "mon";
  const hours = parseInt(get("hour"), 10) || 0;
  const minutes = parseInt(get("minute"), 10) || 0;
  return { day, hours, minutes, totalMinutes: hours * 60 + minutes };
}

function toMinutes(time: string | null): number | null {
  if (!time) return null;
  const [h, m] = time.split(":").map((v) => parseInt(v, 10));
  if (Number.isNaN(h) || Number.isNaN(m)) return null;
  return h * 60 + m;
}

function formatTime(time: string | null): string {
  if (!time) return "";
  const [h, m] = time.split(":");
  return m === "00" ? `${parseInt(h, 10)}h` : `${parseInt(h, 10)}h${m}`;
}

export interface GetAvailabilityOptions {
  schedule?: WeeklySchedule;
  emergencyAlwaysOn?: boolean;
  closingSoonThresholdMinutes?: number;
  now?: Date;
}

export function getAvailability({
  schedule = DEFAULT_SCHEDULE,
  emergencyAlwaysOn = true,
  closingSoonThresholdMinutes = 30,
  now = new Date(),
}: GetAvailabilityOptions = {}): AvailabilityResult {
  const { day, totalMinutes } = parisParts(now);
  const today = schedule[day];
  const openM = toMinutes(today?.open ?? null);
  const closeM = toMinutes(today?.close ?? null);

  if (openM != null && closeM != null && totalMinutes >= openM && totalMinutes < closeM) {
    const remaining = closeM - totalMinutes;
    if (remaining <= closingSoonThresholdMinutes) {
      return {
        status: "closing-soon",
        label: "Ferme bientôt",
        detail: `Ferme à ${formatTime(today.close)}`,
        emergency: emergencyAlwaysOn,
      };
    }
    return {
      status: "open",
      label: "Ouvert",
      detail: `Ferme à ${formatTime(today.close)}`,
      emergency: emergencyAlwaysOn,
    };
  }

  // Closed — find next opening day
  for (let offset = 1; offset <= 7; offset += 1) {
    const nextDayKey = DAY_ORDER[(DAY_ORDER.indexOf(day) + offset) % 7];
    const next = schedule[nextDayKey];
    if (next?.open) {
      return {
        status: emergencyAlwaysOn ? "emergency-only" : "closed",
        label: emergencyAlwaysOn ? "Urgences 24/7" : "Fermé",
        detail:
          offset === 1
            ? `Ouvre demain à ${formatTime(next.open)}`
            : `Ouvre ${DAY_LABEL[nextDayKey]} à ${formatTime(next.open)}`,
        emergency: emergencyAlwaysOn,
      };
    }
  }

  return {
    status: emergencyAlwaysOn ? "emergency-only" : "closed",
    label: emergencyAlwaysOn ? "Urgences 24/7" : "Fermé",
    detail: "Appelez nos urgences",
    emergency: emergencyAlwaysOn,
  };
}
