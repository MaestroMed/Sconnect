import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

// Coverage: hero/landing, each service parent, the pillar, the author
// page, the contact page and the blog list — i.e. the routes a visitor
// is most likely to land on from organic search.
const ROUTES = [
  "/",
  "/presentation",
  "/services",
  "/services/electricite",
  "/services/electricite/relamping",
  "/services/electricite/borne-irve",
  "/services/serrurerie",
  "/services/metallerie",
  "/services/controle-acces",
  "/auteur/mehdi-belkacem",
  "/realisations",
  "/realisations",
  "/contact",
  "/actualites",
];

test.describe("Accessibility (axe-core, WCAG 2.1 AA)", () => {
  for (const route of ROUTES) {
    test(`${route} has no serious or critical violations`, async ({ page }) => {
      await page.goto(route);
      // Wait for hydration / animations to settle.
      await page.waitForLoadState("networkidle");

      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        .disableRules([
          // Color-contrast checks are noisy on gradient backgrounds and
          // animated overlays — audited manually elsewhere.
          "color-contrast",
        ])
        .analyze();

      const blocking = results.violations.filter(
        (v) => v.impact === "serious" || v.impact === "critical",
      );

      if (blocking.length > 0) {
        const summary = blocking
          .map(
            (v) =>
              `- [${v.impact}] ${v.id}: ${v.help}\n    nodes: ${v.nodes
                .slice(0, 3)
                .map((n) => n.target.join(" "))
                .join(", ")}`,
          )
          .join("\n");
        console.error(`Axe violations on ${route}:\n${summary}`);
      }

      expect(blocking).toEqual([]);
    });
  }
});
