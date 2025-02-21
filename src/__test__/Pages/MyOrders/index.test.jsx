import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { MyOrders } from "../../../Pages/MyOrders";
import { ShopContext } from "../../../Context";

// Mock global context
const mockContext = (overrides) => ({
  order: [],
  ...overrides,
});

// Helper function to render MyOrders with mock context
const renderWithContext = (contextValues) => {
  return render(
    <ShopContext.Provider value={contextValues}>
      <MemoryRouter>
        <MyOrders />
      </MemoryRouter>
    </ShopContext.Provider>
  );
};

describe("MyOrders Component:", () => {
  // 1. Initial render with empty orders
  it("Displays 'My Orders' title correctly", () => {
    renderWithContext(mockContext());
    expect(screen.getByText("My Orders")).toBeInTheDocument();
  });

  // 2. Render with orders
  it("Displays the correct number of order items", () => {
    const mockOrders = [
      { totalPrice: 100, totalProducts: 2 },
      { totalPrice: 200, totalProducts: 3 },
      { totalPrice: 300, totalProducts: 4 },
    ];

    renderWithContext(mockContext({ order: mockOrders }));

    // Check if the number of rendered orders matches the length of mockOrders
    const orderLinks = screen.getAllByRole("link");
    expect(orderLinks).toHaveLength(mockOrders.length);
  });

  // 3. Check if each order has a link
  it("Each order is wrapped in a link", () => {
    const mockOrders = [{ totalPrice: 100, totalProducts: 2 }];

    renderWithContext(mockContext({ order: mockOrders }));
    expect(screen.getByRole("link")).toHaveAttribute("href", "/my-orders/0");
  });

  // 4. Render with no orders
  it("Displays nothing when there are no orders", () => {
    renderWithContext(mockContext({ order: [] }));
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });
});
