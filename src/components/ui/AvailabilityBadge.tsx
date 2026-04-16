"use client";

import { useEffect, useMemo, useState } from "react";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { getAvailability, type AvailabilityResult, type WeeklySchedule } from "@/lib/availability";

interface AvailabilityBadgeProps {
  schedule?: WeeklySchedule;
  emergencyAlwaysOn?: boolean;
  className?: string;
  compact?: boolean;
  variant?: "light" | "dark";
}

const STATUS_STYLES: Record<
  AvailabilityResult["status"],
  { dot: string; text: string; ring: string }
> = {
  open: {
    dot: "bg-green-500",
    text: "text-green-600 dark:text-green-400",
    ring: "ring-green-500/30",
  },
  "closing-soon": {
    dot: "bg-accent-500",
    text: "text-accent-600 dark:text-accent-300",
    ring: "ring-accent-500/30",
  },
  closed: {
    dot: "bg-red-500",
    text: "text-red-600 dark:text-red-400",
    ring: "ring-red-500/30",
  },
  "emergency-only": {
    dot: "bg-red-500",
    text: "text-red-600 dark:text-red-400",
    ring: "ring-red-500/30",
  },
};

export default function AvailabilityBadge({
  schedule,
  emergencyAlwaysOn = true,
  className,
  compact = false,
  variant = "light",
}: AvailabilityBadgeProps) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  const availability = useMemo(() => {
    if (!now) return null;
    return getAvailability({ schedule, emergencyAlwaysOn, now });
  }, [now, schedule, emergencyAlwaysOn]);

  if (!availability) {
    // SSR / pre-hydration placeholder to avoid flicker
    return (
      <span
        aria-hidden="true"
        className={cn(
          "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium",
          variant === "dark" ? "bg-white/5 text-white/50" : "bg-surface-muted text-foreground-muted",
          className,
        )}
      >
        <span className="h-2 w-2 rounded-full bg-foreground-muted/50" />
        <span>Horaires</span>
      </span>
    );
  }

  const styles = STATUS_STYLES[availability.status];
  const live = availability.status === "open" || availability.status === "closing-soon";

  return (
    <span
      role="status"
      aria-live="polite"
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ring-1 transition-colors",
        variant === "dark"
          ? "bg-white/5 text-white ring-white/10"
          : "bg-surface-elevated text-foreground ring-border",
        className,
      )}
    >
      <span className="relative flex h-2.5 w-2.5 items-center justify-center">
        {live && (
          <span
            className={cn("absolute inline-flex h-full w-full animate-ping rounded-full opacity-75", styles.dot)}
          />
        )}
        <span className={cn("relative inline-flex h-2 w-2 rounded-full", styles.dot)} />
      </span>
      <span className={styles.text}>{availability.label}</span>
      {!compact && (
        <>
          <span className="h-3 w-px bg-border/80" aria-hidden="true" />
          <span className="inline-flex items-center gap-1 text-foreground-muted">
            <Clock className="h-3 w-3" aria-hidden="true" />
            {availability.detail}
          </span>
        </>
      )}
    </span>
  );
}
