import { render, screen, fireEvent } from "@testing-library/react"; // Renders components and simulates user events
import { describe, expect, it, vi, beforeEach } from "vitest"; // Testing functions from Vitest
import { CheckoutSideMenu } from "../../../Components/CheckoutSideMenu"; // CheckoutSideMenu component to be tested
import { ShopContext } from "../../../Context"; // Context provider for the application
import { BrowserRouter } from "react-router-dom"; // Router wrapper for components that use Link

describe("CheckoutSideMenu Component:", () => {
  // Mock context values and functions
  const mockContextValue = {
    cartProducts: [
      { id: 1, title: "Product 1", price: 50, image: "img1.jpg" },
      { id: 2, title: "Product 2", price: 100, image: "img2.jpg" },
    ],
    setCartProducts: vi.fn(), // Mock function for updating cart products
    isMyOrderOpen: true, // Ensure the menu is open
    closeMyOrder: vi.fn(), // Mock function to close the order menu
    totalToPay: vi.fn(() => 150), // Mock total price
    order: [],
    setOrder: vi.fn(), // Mock function to update order history
  };

  beforeEach(() => {
    vi.clearAllMocks(); // Clears all mocks before each test.
  });

  it("Renders the order items and total correctly", () => {
    // Render CheckoutSideMenu with the mocked context
    render(
      <BrowserRouter>
        <ShopContext.Provider value={mockContextValue}>
          <CheckoutSideMenu />
        </ShopContext.Provider>
      </BrowserRouter>
    );

    // Verify that order items are displayed correctly
    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("Product 2")).toBeInTheDocument();
    expect(screen.getByText("$ 150")).toBeInTheDocument();
  });

  it("Calls closeMyOrder when close button is clicked", () => {
    // Render CheckoutSideMenu with the mocked context
    render(
      <BrowserRouter>
        <ShopContext.Provider value={mockContextValue}>
          <CheckoutSideMenu />
        </ShopContext.Provider>
      </BrowserRouter>
    );

    // Simulate clicking on the close button
    fireEvent.click(screen.getByText("X"));

    // Verify that closeMyOrder is called
    expect(mockContextValue.closeMyOrder).toHaveBeenCalledTimes(1);
  });

  it("Calls handleCheckOut when checkout button is clicked", () => {
    // Render CheckoutSideMenu with the mocked context
    render(
      <BrowserRouter>
        <ShopContext.Provider value={mockContextValue}>
          <CheckoutSideMenu />
        </ShopContext.Provider>
      </BrowserRouter>
    );

    // Simulate clicking on the checkout button
    fireEvent.click(screen.getByText("CheckOut"));

    // Verify that setOrder and setCartProducts are called correctly
    expect(mockContextValue.setOrder).toHaveBeenCalled();
    expect(mockContextValue.setCartProducts).toHaveBeenCalledWith([]);
    expect(mockContextValue.closeMyOrder).toHaveBeenCalledTimes(1);
  });
});
