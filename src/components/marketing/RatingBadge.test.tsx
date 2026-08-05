import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import RatingBadge from "./RatingBadge";

// rating/reviewCount sont désormais OBLIGATOIRES : le badge affiche toujours
// des chiffres réels calculés depuis les témoignages, jamais un défaut en dur.
describe("RatingBadge", () => {
  it("renders the supplied rating and review count", () => {
    render(<RatingBadge rating={4.6} reviewCount={42} />);
    expect(screen.getByText("4.6/5")).toBeInTheDocument();
    expect(screen.getByText(/42 avis clients/)).toBeInTheDocument();
  });

  it("renders as a static (non-link) chip by default", () => {
    render(<RatingBadge rating={4.9} reviewCount={12} />);
    expect(screen.queryByRole("link")).toBeNull();
    // Static variant exposes the rating via an img role + aria-label.
    expect(
      screen.getByRole("img", { name: /note moyenne 4\.9 sur 5/i }),
    ).toBeInTheDocument();
  });

  it("supports a custom href (e.g. future GBP URL)", () => {
    render(
      <RatingBadge rating={4.9} reviewCount={12} href="https://g.page/r/CabcDef123" />,
    );
    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "https://g.page/r/CabcDef123",
    );
  });

  it("includes a descriptive aria-label for screen readers", () => {
    render(<RatingBadge rating={4.9} reviewCount={127} />);
    expect(
      screen.getByLabelText("Note moyenne 4.9 sur 5, 127 avis clients"),
    ).toBeInTheDocument();
  });

  it("rounds the rating to one decimal in the aria-label", () => {
    render(<RatingBadge rating={4.666} reviewCount={9} />);
    expect(
      screen.getByLabelText("Note moyenne 4.7 sur 5, 9 avis clients"),
    ).toBeInTheDocument();
  });

  it("renders 5 star icons (filled or empty)", () => {
    const { container } = render(<RatingBadge rating={3.5} reviewCount={50} />);
    // Lucide renders <svg class="lucide-star" /> — count the wrappers.
    const stars = container.querySelectorAll("svg.lucide-star");
    // 5 base stars + 1 half overlay on the 4th = 6
    expect(stars.length).toBeGreaterThanOrEqual(5);
  });
});
