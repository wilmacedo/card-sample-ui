import { render, screen } from "@testing-library/react";
import { Navbar } from "./Navbar";

let navbar: HTMLElement | null;

describe("Navbar case", () => {
  beforeEach(() => {
    render(<Navbar />);

    navbar = document.querySelector("nav");
  });

  it("should be render navbar", () => {
    expect(navbar).toBeInTheDocument();
  });

  it("should be render logo", () => {
    expect(navbar).toHaveTextContent("/ wil.macedo.sa@gmail.com");
  });

  it("should be render buttons", () => {
    const logInButton = screen.getByRole("button", { name: "Log In" });
    const getStartedButton = screen.getByRole("button", {
      name: "Get Started",
    });

    expect(logInButton).toBeInTheDocument();
    expect(getStartedButton).toBeInTheDocument();
  });
});
