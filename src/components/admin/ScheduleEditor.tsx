"use client";

import { useState } from "react";
import { Copy, Ban, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { DEFAULT_SCHEDULE, type WeeklySchedule, type DayKey } from "@/lib/availability";

const DAYS: { key: DayKey; label: string; short: string }[] = [
  { key: "mon", label: "Lundi", short: "Lun" },
  { key: "tue", label: "Mardi", short: "Mar" },
  { key: "wed", label: "Mercredi", short: "Mer" },
  { key: "thu", label: "Jeudi", short: "Jeu" },
  { key: "fri", label: "Vendredi", short: "Ven" },
  { key: "sat", label: "Samedi", short: "Sam" },
  { key: "sun", label: "Dimanche", short: "Dim" },
];

interface ScheduleEditorProps {
  value: WeeklySchedule | undefined | null;
  onChange: (schedule: WeeklySchedule) => void;
}

/**
 * Weekly schedule editor bound to the live AvailabilityBadge pipeline.
 * Handles closed days via a toggle and offers a "copy weekdays"
 * shortcut that mirrors Monday's hours to Tue–Fri.
 */
export default function ScheduleEditor({ value, onChange }: ScheduleEditorProps) {
  const schedule: WeeklySchedule = value ?? DEFAULT_SCHEDULE;
  const [copied, setCopied] = useState(false);

  const updateDay = (day: DayKey, patch: Partial<{ open: string | null; close: string | null }>) => {
    const next: WeeklySchedule = {
      ...schedule,
      [day]: { ...schedule[day], ...patch },
    };
    onChange(next);
  };

  const toggleClosed = (day: DayKey) => {
    const current = schedule[day];
    const isClosed = !current.open || !current.close;
    if (isClosed) {
      updateDay(day, { open: "09:00", close: "18:00" });
    } else {
      updateDay(day, { open: null, close: null });
    }
  };

  const copyWeekdays = () => {
    const monday = schedule.mon;
    if (!monday.open || !monday.close) return;
    onChange({
      ...schedule,
      tue: { ...monday },
      wed: { ...monday },
      thu: { ...monday },
      fri: { ...monday },
    });
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm text-foreground-muted">
          Ces horaires pilotent le badge <strong>Ouvert/Fermé</strong> affiché en temps réel
          sur le site.
        </p>
        <button
          type="button"
          onClick={copyWeekdays}
          disabled={!schedule.mon.open}
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface-elevated px-3 py-1.5 text-xs font-medium text-foreground hover:bg-surface-muted disabled:opacity-50"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-green-600" /> Copié
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" /> Copier lundi sur mar–ven
            </>
          )}
        </button>
      </div>

      <div className="divide-y divide-border rounded-xl border border-border bg-surface-elevated overflow-hidden">
        {DAYS.map(({ key, label }) => {
          const day = schedule[key];
          const isClosed = !day.open || !day.close;
          return (
            <div
              key={key}
              className={cn(
                "grid grid-cols-12 gap-3 items-center px-4 py-3",
                isClosed && "bg-surface-muted/60",
              )}
            >
              <div className="col-span-3 sm:col-span-2 font-medium text-foreground">{label}</div>
              <div className="col-span-9 sm:col-span-10 flex items-center gap-3 flex-wrap">
                <button
                  type="button"
                  onClick={() => toggleClosed(key)}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold transition-colors",
                    isClosed
                      ? "border-red-200 bg-red-50 text-red-700 dark:border-red-500/40 dark:bg-red-500/10 dark:text-red-300"
                      : "border-green-200 bg-green-50 text-green-700 dark:border-green-500/40 dark:bg-green-500/10 dark:text-green-300",
                  )}
                >
                  {isClosed ? (
                    <>
                      <Ban className="h-3 w-3" />
                      Fermé
                    </>
                  ) : (
                    <>
                      <Check className="h-3 w-3" />
                      Ouvert
                    </>
                  )}
                </button>

                {!isClosed && (
                  <div className="flex items-center gap-2">
                    <input
                      type="time"
                      value={day.open ?? ""}
                      onChange={(e) => updateDay(key, { open: e.target.value || null })}
                      aria-label={`Heure d'ouverture ${label}`}
                      className="rounded-lg border border-border bg-surface px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                    <span className="text-foreground-muted text-sm">→</span>
                    <input
                      type="time"
                      value={day.close ?? ""}
                      onChange={(e) => updateDay(key, { close: e.target.value || null })}
                      aria-label={`Heure de fermeture ${label}`}
                      className="rounded-lg border border-border bg-surface px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
