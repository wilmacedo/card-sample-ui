import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Button } from "./Button";

describe("Button case", () => {
  it("should be render text", () => {
    const text = "Click me";

    render(<Button>{text}</Button>);

    const button = screen.getByRole("button", { name: text });

    expect(button).toHaveTextContent(text);
  });

  it('should be render with "primary" color', () => {
    render(<Button color="primary">Button</Button>);

    const button = screen.getByRole("button", { name: "Button" });

    expect(button).toHaveClass("bg-[#CF5185]");
  });

  it('should be render with "secondary" color', () => {
    render(<Button color="secondary">Button</Button>);

    const button = screen.getByRole("button", { name: "Button" });

    expect(button).toHaveClass("bg-blue-600");
  });
});
