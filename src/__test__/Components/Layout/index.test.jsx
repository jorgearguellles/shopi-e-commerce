import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Layout } from "../../../Components/Layout"; // Ajusta la ruta según tu estructura de archivos

// Test suite for the Layout component
describe("Layout Component:", () => {
  it("Renders children correctly", () => {
    // Render the Layout component with a sample child element
    render(
      <Layout>
        <p>Test Child</p>
      </Layout>
    );

    // Verify that the child element is correctly rendered inside Layout
    expect(screen.getByText("Test Child")).toBeInTheDocument();
  });
});
