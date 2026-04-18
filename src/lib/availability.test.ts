import { describe, it, expect } from "vitest";
import { getAvailability, type WeeklySchedule } from "./availability";

const schedule: WeeklySchedule = {
  mon: { open: "08:00", close: "19:00" },
  tue: { open: "08:00", close: "19:00" },
  wed: { open: "08:00", close: "19:00" },
  thu: { open: "08:00", close: "19:00" },
  fri: { open: "08:00", close: "19:00" },
  sat: { open: "09:00", close: "17:00" },
  sun: { open: null, close: null },
};

// Helper: build a Date for a given weekday + Paris-local HH:MM.
// We build it as UTC then adjust for the Paris offset so tests are
// stable regardless of the runner's timezone.
function parisDate(dayOffset: number, hour: number, minute = 0): Date {
  // Anchor a known Monday (2025-01-06 was a Monday) at midnight UTC.
  const anchor = new Date(Date.UTC(2025, 0, 6, 0, 0, 0));
  anchor.setUTCDate(anchor.getUTCDate() + dayOffset);
  // Paris is UTC+1 in January (no DST); subtract 1h to target Paris-local hour.
  anchor.setUTCHours(hour - 1, minute, 0, 0);
  return anchor;
}

describe("getAvailability", () => {
  describe("open hours", () => {
    it("returns 'open' during weekday business hours", () => {
      const result = getAvailability({
        schedule,
        now: parisDate(0, 10, 0), // Monday 10:00
      });
      expect(result.status).toBe("open");
      expect(result.label).toBe("Ouvert");
      expect(result.detail).toContain("19h");
    });

    it("returns 'open' on Saturday morning", () => {
      const result = getAvailability({
        schedule,
        now: parisDate(5, 10, 30), // Saturday 10:30
      });
      expect(result.status).toBe("open");
    });

    it("returns 'closing-soon' within 30min of closing", () => {
      const result = getAvailability({
        schedule,
        now: parisDate(0, 18, 45), // Monday 18:45 (closes 19:00)
      });
      expect(result.status).toBe("closing-soon");
      expect(result.label).toBe("Ferme bientôt");
    });

    it("respects a custom closing-soon threshold", () => {
      const result = getAvailability({
        schedule,
        now: parisDate(0, 18, 45),
        closingSoonThresholdMinutes: 10,
      });
      expect(result.status).toBe("open");
    });
  });

  describe("closed hours", () => {
    it("returns 'emergency-only' after closing on a weekday", () => {
      const result = getAvailability({
        schedule,
        now: parisDate(0, 20, 0), // Monday 20:00
      });
      expect(result.status).toBe("emergency-only");
      expect(result.label).toBe("Urgences 24/7");
      expect(result.detail).toContain("demain");
    });

    it("returns 'closed' after closing when emergency mode is off", () => {
      const result = getAvailability({
        schedule,
        now: parisDate(0, 20, 0),
        emergencyAlwaysOn: false,
      });
      expect(result.status).toBe("closed");
      expect(result.label).toBe("Fermé");
    });

    it("points to Saturday when called Friday evening", () => {
      const result = getAvailability({
        schedule,
        now: parisDate(4, 20, 0), // Friday 20:00
      });
      expect(result.status).toBe("emergency-only");
      expect(result.detail).toContain("demain");
    });

    it("points to 'demain' on Sunday (next day is Monday)", () => {
      const result = getAvailability({
        schedule,
        now: parisDate(6, 14, 0), // Sunday
      });
      expect(result.status).toBe("emergency-only");
      expect(result.detail).toMatch(/demain|lundi/);
    });

    it("skips to Monday when called Saturday evening", () => {
      const result = getAvailability({
        schedule,
        now: parisDate(5, 18, 0), // Saturday 18:00 (closed, next open is Mon)
      });
      expect(result.status).toBe("emergency-only");
      // Saturday+1 = Sunday (closed), so next open is Monday: "lundi"
      expect(result.detail).toContain("lundi");
    });

    it("returns 'emergency-only' before opening on Monday morning", () => {
      const result = getAvailability({
        schedule,
        now: parisDate(0, 6, 0), // Monday 06:00
      });
      expect(result.status).toBe("emergency-only");
    });
  });

  describe("edge cases", () => {
    it("treats the exact opening minute as open", () => {
      const result = getAvailability({
        schedule,
        now: parisDate(0, 8, 0),
        closingSoonThresholdMinutes: 0,
      });
      expect(result.status).toBe("open");
    });

    it("treats the exact closing minute as closed", () => {
      const result = getAvailability({
        schedule,
        now: parisDate(0, 19, 0),
      });
      expect(result.status).toBe("emergency-only");
    });

    it("formats minutes correctly in detail", () => {
      const scheduleWithHalf: WeeklySchedule = {
        ...schedule,
        mon: { open: "08:30", close: "18:30" },
      };
      const result = getAvailability({
        schedule: scheduleWithHalf,
        now: parisDate(0, 10, 0),
      });
      expect(result.detail).toContain("18h30");
    });
  });
});
