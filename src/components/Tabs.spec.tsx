import { render, screen } from "@testing-library/react";
import { Tabs } from "./Tabs";

let tab: HTMLElement;

describe("Tabs case", () => {
  beforeEach(() => {
    const tabs = [
      {
        title: "Wallet",
        children: <h1>Wallet content</h1>,
      },
      { title: "Register", children: <h1>Register content</h1> },
    ];

    render(<Tabs tabs={tabs} />);

    tab = screen.getByTestId("tabs");
  });

  it("should be render tabs with children", () => {
    expect(tab).toHaveTextContent("Wallet");
    expect(tab).toHaveTextContent("Wallet content");
    expect(tab).toHaveTextContent("Register");
  });
});
