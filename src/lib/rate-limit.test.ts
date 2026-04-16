import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { rateLimit, getClientIdentifier, rateLimitResponse } from "./rate-limit";

describe("rateLimit", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("allows up to the limit then blocks", () => {
    const id = `test-${Math.random()}`;
    for (let i = 0; i < 5; i += 1) {
      const result = rateLimit({ identifier: id, limit: 5, windowMs: 60_000 });
      expect(result.success).toBe(true);
      expect(result.remaining).toBe(4 - i);
    }
    const blocked = rateLimit({ identifier: id, limit: 5, windowMs: 60_000 });
    expect(blocked.success).toBe(false);
    expect(blocked.retryAfter).toBeGreaterThan(0);
  });

  it("resets after the window expires", () => {
    const id = `test-${Math.random()}`;
    for (let i = 0; i < 3; i += 1) {
      rateLimit({ identifier: id, limit: 3, windowMs: 1_000 });
    }
    expect(rateLimit({ identifier: id, limit: 3, windowMs: 1_000 }).success).toBe(false);

    vi.advanceTimersByTime(1_100);

    const afterReset = rateLimit({ identifier: id, limit: 3, windowMs: 1_000 });
    expect(afterReset.success).toBe(true);
    expect(afterReset.remaining).toBe(2);
  });

  it("uses separate buckets per identifier", () => {
    const a = rateLimit({ identifier: "a", limit: 1 });
    const b = rateLimit({ identifier: "b", limit: 1 });
    expect(a.success).toBe(true);
    expect(b.success).toBe(true);
    expect(rateLimit({ identifier: "a", limit: 1 }).success).toBe(false);
    expect(rateLimit({ identifier: "b", limit: 1 }).success).toBe(false);
  });
});

describe("getClientIdentifier", () => {
  it("uses x-forwarded-for when present", () => {
    const req = new Request("http://test", {
      headers: { "x-forwarded-for": "1.2.3.4, 5.6.7.8" },
    });
    expect(getClientIdentifier(req, "/api/contact")).toBe("/api/contact:1.2.3.4");
  });

  it("falls back to x-real-ip", () => {
    const req = new Request("http://test", {
      headers: { "x-real-ip": "9.9.9.9" },
    });
    expect(getClientIdentifier(req, "/api/devis")).toBe("/api/devis:9.9.9.9");
  });

  it("falls back to anonymous when no IP headers present", () => {
    const req = new Request("http://test");
    expect(getClientIdentifier(req, "/api/x")).toBe("/api/x:anonymous");
  });
});

describe("rateLimitResponse", () => {
  it("returns null on success", () => {
    expect(
      rateLimitResponse({ success: true, remaining: 4, resetAt: 0, retryAfter: 0 }),
    ).toBeNull();
  });

  it("returns a 429 with Retry-After on failure", () => {
    const response = rateLimitResponse({
      success: false,
      remaining: 0,
      resetAt: Date.now() + 30_000,
      retryAfter: 30,
    });
    expect(response).not.toBeNull();
    expect(response!.status).toBe(429);
    expect(response!.headers.get("Retry-After")).toBe("30");
  });
});
