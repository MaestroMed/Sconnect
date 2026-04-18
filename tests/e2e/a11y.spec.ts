import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const ROUTES = ["/", "/services/electricite", "/contact", "/actualites"];

test.describe("Accessibility (axe-core)", () => {
  for (const route of ROUTES) {
    test(`${route} has no serious or critical violations`, async ({ page }) => {
      await page.goto(route);
      // Wait for hydration / animations to settle.
      await page.waitForLoadState("networkidle");

      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        .disableRules([
          // Color-contrast checks are noisy on gradient backgrounds — we audit
          // those manually. Re-enable once the design tokens are finalized.
          "color-contrast",
        ])
        .analyze();

      const blocking = results.violations.filter(
        (v) => v.impact === "serious" || v.impact === "critical",
      );

      if (blocking.length > 0) {
        const summary = blocking
          .map((v) => `- [${v.impact}] ${v.id}: ${v.help}`)
          .join("\n");
        console.error(`Axe violations on ${route}:\n${summary}`);
      }

      expect(blocking).toEqual([]);
    });
  }
});
