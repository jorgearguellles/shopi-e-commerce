import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { NotFound } from "../../../Pages/NotFound";

describe("NotFound Component:", () => {
  // 1. Renders the NotFound component correctly
  it("Renders without crashing", () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );
    expect(screen.getByText("Oops! Page not found")).toBeInTheDocument();
  });

  // 2. Displays the correct title
  it("Displays the correct title", () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );
    expect(screen.getByText("Oops! Page not found")).toBeInTheDocument();
  });

  // 3. Displays the correct message
  it("Displays the correct message", () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );
    expect(
      screen.getByText("It looks like you are lost in fashion space.")
    ).toBeInTheDocument();
  });

  // 4. Renders the shopping bag icon
  it("Renders the shopping bag icon", () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );
    const icon = screen.getByTestId("shopping-bag-icon");
    expect(icon).toBeInTheDocument();
  });

  // 5. Renders the back-to-shop button
  it("Renders the back-to-shop button", () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );
    expect(
      screen.getByRole("link", { name: /Back to Shop/i })
    ).toBeInTheDocument();
  });

  // 6. Button contains correct link to home page
  it("Button contains correct link to home page", () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );
    expect(screen.getByRole("link")).toHaveAttribute("href", "/");
  });
});
