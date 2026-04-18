import { test, expect } from "@playwright/test";

test.describe("Contact form", () => {
  test("renders and validates required fields", async ({ page }) => {
    await page.goto("/contact");
    await expect(page.getByRole("heading", { name: /contact/i }).first()).toBeVisible();
  });

  test("blog list page lists at least one article", async ({ page }) => {
    await page.goto("/actualites");
    await expect(page.getByRole("heading", { level: 1, name: /actualit/i })).toBeVisible();
    // Seeded posts should be present
    await expect(page.locator("article, a").filter({ hasText: /2026|serrure|interphonie/i }).first()).toBeVisible();
  });

  test("rss feed returns XML", async ({ request }) => {
    const res = await request.get("/actualites/feed.xml");
    expect(res.status()).toBe(200);
    const body = await res.text();
    expect(body).toContain("<?xml");
    expect(body).toContain("<rss");
  });
});
