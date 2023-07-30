import { render, screen } from "@testing-library/react";
import { Mail } from "lucide-react";
import { Input } from "./Input";

describe("Input case", () => {
  it("should be render input", () => {
    render(<Input icon={Mail} />);

    const input = screen.getByTestId("input");

    expect(input).toBeInTheDocument();
  });

  it("should be render input with icon", () => {
    render(<Input icon={Mail} />);

    const input = screen.getByTestId("input");
    const icon = input.querySelector("svg");

    expect(icon).toBeInTheDocument();
  });
});
