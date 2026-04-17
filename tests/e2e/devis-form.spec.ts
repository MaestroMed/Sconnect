import { test, expect } from "@playwright/test";

test.describe("Devis form", () => {
  test("multi-step flow submits and shows confirmation", async ({ page }) => {
    // Mock the API so the test does not actually send email / hit Supabase.
    await page.route("**/api/devis", (route) =>
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ success: true, submissionId: "test-1" }),
      }),
    );

    await page.goto("/demande-devis");

    // Step 1 — Coordonnées
    await page.locator("select").first().selectOption("M.");
    await page.getByPlaceholder("Dupont").fill("Test");
    await page.getByPlaceholder("Jean").fill("Playwright");
    await page.getByPlaceholder("jean.dupont@email.com").fill("test@example.test");
    await page.getByPlaceholder("06 12 34 56 78").fill("0612345678");
    await page.getByRole("button", { name: /suivant/i }).click();

    // Step 2 — Adresse
    await page.locator("select").first().selectOption("Maison");
    await page.getByPlaceholder("12 rue de la République").fill("1 rue du Test");
    await page.getByPlaceholder("92110").fill("92110");
    await page.getByPlaceholder("Clichy").fill("Clichy");
    await page.getByRole("button", { name: /suivant/i }).click();

    // Step 3 — Services
    await page.getByLabel(/électricité/i).first().check();
    await page.getByRole("button", { name: /suivant/i }).click();

    // Step 4 — Détails + consent
    await page
      .getByLabel(/conditions générales/i)
      .check();
    await page.getByRole("button", { name: /envoyer ma demande/i }).click();

    await expect(
      page.getByRole("heading", { name: /demande envoyée/i }),
    ).toBeVisible({ timeout: 10_000 });
  });
});
