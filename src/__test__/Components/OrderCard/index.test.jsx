import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { OrderCard } from "../../../Components/OrderCard";

// Test suite for OrderCard component
describe("OrderCard Component", () => {
  // Mock product data for testing
  const mockProduct = {
    title: "Test Product",
    price: 99.99,
    image: "https://via.placeholder.com/150",
  };

  it("renders the order card correctly", () => {
    // Render the OrderCard component with mock data
    render(<OrderCard {...mockProduct} />);

    // Verify that the title, price, and image are displayed correctly
    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("$ 99.99")).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: /test product/i })
    ).toBeInTheDocument();
  });
});
