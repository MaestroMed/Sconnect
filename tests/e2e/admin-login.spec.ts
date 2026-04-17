import { test, expect } from "@playwright/test";

test.describe("Admin login", () => {
  test("renders login form with email + password fields", async ({ page }) => {
    await page.goto("/admin/login");
    await expect(page.getByRole("heading", { name: /connexion/i })).toBeVisible();
    await expect(page.getByPlaceholder(/admin@/)).toBeVisible();
    await expect(page.getByPlaceholder("••••••••")).toBeVisible();
    await expect(page.getByRole("button", { name: /se connecter/i })).toBeVisible();
  });

  test("rejects invalid credentials with an error toast", async ({ page }) => {
    await page.goto("/admin/login");
    await page.getByPlaceholder(/admin@/).fill("nope@example.test");
    await page.getByPlaceholder("••••••••").fill("wrong-password");
    await page.getByRole("button", { name: /se connecter/i }).click();
    // Either inline error or toast — both acceptable signals of refusal.
    await expect(
      page.locator("text=/refus|invalide|incorrect|erreur/i").first(),
    ).toBeVisible({ timeout: 5_000 });
    await expect(page).toHaveURL(/admin\/login/);
  });

  test("forgot-password link navigates to /admin/login/forgot", async ({ page }) => {
    await page.goto("/admin/login");
    await page.getByRole("link", { name: /mot de passe oubli/i }).click();
    await expect(page).toHaveURL(/admin\/login\/forgot/);
    await expect(page.getByRole("heading", { name: /mot de passe oubli/i })).toBeVisible();
  });
});
