import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test("renders the hero with primary CTA", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(
      page.getByRole("link", { name: /devis/i }).first(),
    ).toBeVisible();
  });

  test("has no console errors on load", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    // Ignore known Vercel Analytics/SpeedInsights noise in dev
    const filtered = errors.filter(
      (e) => !/vitals|analytics|_vercel/i.test(e),
    );
    expect(filtered).toEqual([]);
  });

  test("primary CTA navigates to devis page", async ({ page }) => {
    await page.goto("/");
    const cta = page.getByRole("link", { name: /devis gratuit/i }).first();
    await cta.click();
    await expect(page).toHaveURL(/demande-devis/);
  });

  test("skip link is reachable via keyboard", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    const skip = page.locator(".skip-link");
    await expect(skip).toBeFocused();
    await expect(skip).toHaveAttribute("href", "#main");
  });

  test("theme toggle switches html.dark class", async ({ page }) => {
    await page.goto("/");
    const toggle = page
      .getByRole("button", { name: /th\u00e8me/i })
      .first();
    const html = page.locator("html");

    const initiallyDark = await html.evaluate((el) => el.classList.contains("dark"));
    await toggle.click();
    await expect
      .poll(() => html.evaluate((el) => el.classList.contains("dark")))
      .toBe(!initiallyDark);
  });

  test("availability badge appears in desktop top bar", async ({ page, viewport }) => {
    test.skip(!viewport || viewport.width < 768, "desktop-only top bar");
    await page.goto("/");
    await expect(
      page.getByRole("status").filter({ hasText: /ouvert|ferm|urgences/i }).first(),
    ).toBeVisible();
  });
});
