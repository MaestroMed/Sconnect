import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import RatingBadge from "./RatingBadge";

describe("RatingBadge", () => {
  it("renders default 4.9/127 wording when no props are supplied", () => {
    render(<RatingBadge />);
    expect(screen.getByText("4.9/5")).toBeInTheDocument();
    expect(screen.getByText(/127 avis vérifiés/)).toBeInTheDocument();
  });

  it("links to /avis by default", () => {
    render(<RatingBadge />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/avis");
  });

  it("renders a custom rating and review count", () => {
    render(<RatingBadge rating={4.6} reviewCount={42} />);
    expect(screen.getByText("4.6/5")).toBeInTheDocument();
    expect(screen.getByText(/42 avis vérifiés/)).toBeInTheDocument();
  });

  it("supports a custom href (e.g. future GBP URL)", () => {
    render(<RatingBadge href="https://g.page/r/CabcDef123" />);
    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "https://g.page/r/CabcDef123",
    );
  });

  it("includes a descriptive aria-label for screen readers", () => {
    render(<RatingBadge rating={4.9} reviewCount={127} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute(
      "aria-label",
      "Voir les avis clients : note moyenne 4.9 sur 5, 127 avis vérifiés",
    );
  });

  it("renders 5 star icons (filled or empty)", () => {
    const { container } = render(<RatingBadge rating={3.5} reviewCount={50} />);
    // Lucide renders <svg class="lucide-star" /> — count the wrappers.
    const stars = container.querySelectorAll("svg.lucide-star");
    // 5 base stars + 1 half overlay on the 4th = 6
    expect(stars.length).toBeGreaterThanOrEqual(5);
  });
});
