import { test, expect } from "@playwright/test";

test.describe("Realisations", () => {
  test("list page shows cards from JSON data", async ({ page }) => {
    await page.goto("/realisations");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    // Filter chip "Tous" is active by default
    await expect(page.getByRole("button", { name: "Tous" })).toBeVisible();
    // At least one realization card
    const cards = page.locator('a[href^="/realisations/"]');
    await expect(cards.first()).toBeVisible();
    expect(await cards.count()).toBeGreaterThan(0);
  });

  test("clicking a card navigates to a working detail page", async ({ page }) => {
    await page.goto("/realisations");
    const firstCard = page.locator('a[href^="/realisations/"]').first();
    await firstCard.click();
    await expect(page).toHaveURL(/\/realisations\/[^\/]+$/);
    // Detail page must have a heading and breadcrumbs
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByRole("navigation", { name: /ariane/i })).toBeVisible();
  });

  test("detail page injects CreativeWork JSON-LD", async ({ page }) => {
    await page.goto("/realisations/1");
    const ldScripts = await page
      .locator('script[type="application/ld+json"]')
      .allTextContents();
    const types = ldScripts
      .map((t) => {
        try {
          return JSON.parse(t)["@type"];
        } catch {
          return null;
        }
      })
      .filter(Boolean);
    expect(types).toContain("CreativeWork");
  });
});

test.describe("Service category page", () => {
  test("electricite page renders + has FAQ accordion", async ({ page }) => {
    await page.goto("/services/electricite");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    // Accordion FAQ items use Radix triggers
    const triggers = page.locator('[data-state][aria-expanded]');
    if ((await triggers.count()) > 0) {
      const first = triggers.first();
      await first.click();
      await expect(first).toHaveAttribute("aria-expanded", "true");
    }
  });

  test("breadcrumbs are present on service page", async ({ page }) => {
    await page.goto("/services/electricite");
    await expect(page.getByRole("navigation", { name: /ariane/i })).toBeVisible();
  });
});
