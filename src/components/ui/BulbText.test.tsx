import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import BulbText from "./BulbText";

describe("BulbText", () => {
  it("renders the full text as aria-label on the wrapper", () => {
    render(<BulbText>Hello world</BulbText>);
    expect(screen.getByLabelText("Hello world")).toBeInTheDocument();
  });

  it("preserves word boundaries (no mid-word line breaks)", () => {
    const { container } = render(<BulbText>vo tre</BulbText>);
    // Each word should sit in an inline-block whitespace-nowrap wrapper.
    const wrappers = container.querySelectorAll("span.inline-block.whitespace-nowrap");
    expect(wrappers.length).toBe(2);
  });

  it("emits one .bulb-letter per non-space character with a unique --i variable", () => {
    const text = "abc";
    const { container } = render(<BulbText>{text}</BulbText>);
    const letters = container.querySelectorAll(".bulb-letter");
    expect(letters.length).toBe(3);
    letters.forEach((el, i) => {
      const style = el.getAttribute("style") || "";
      expect(style).toMatch(new RegExp(`--i: ?${i}`));
    });
  });

  it("continues the index across words (no reset)", () => {
    const text = "ab cd"; // 4 letters total → indices 0,1,2,3
    const { container } = render(<BulbText>{text}</BulbText>);
    const letters = container.querySelectorAll(".bulb-letter");
    expect(letters.length).toBe(4);
    const lastStyle = letters[3].getAttribute("style") || "";
    expect(lastStyle).toMatch(/--i: ?3/);
  });

  it("inherits the gradient-text-living class for the parent", () => {
    const { container } = render(<BulbText>X</BulbText>);
    const root = container.firstElementChild;
    expect(root?.className).toContain("gradient-text-living");
  });

  it("appends custom classNames passed via props", () => {
    const { container } = render(<BulbText className="extra-class">X</BulbText>);
    const root = container.firstElementChild;
    expect(root?.className).toContain("extra-class");
  });
});
