import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { ShopContext } from "../../../Context";
import { Navbar } from "../../../Components/Navbar";

// Mocked context values
const mockContextValue = {
  cartProducts: [{ id: 1 }, { id: 2 }], // Simulating two items in cart
  setSearchByCategory: vi.fn(), // Mock function for category filtering
  setSignOut: vi.fn(), // Mock function for sign-out
  signOut: false,
  account: { email: "test@example.com" },
};

// Clear all mocks before each test to prevent interference
beforeEach(() => {
  vi.clearAllMocks();
});

describe("Navbar Component:", () => {
  it("Renders the navbar correctly", () => {
    render(
      <BrowserRouter>
        <ShopContext.Provider value={mockContextValue}>
          <Navbar />
        </ShopContext.Provider>
      </BrowserRouter>
    );

    // Verify that essential elements are present
    expect(screen.getByText("Shopi")).toBeInTheDocument();
    expect(screen.getByText("All")).toBeInTheDocument();
    expect(screen.getByText("Man Clothes")).toBeInTheDocument();
    expect(screen.getByText("Women Clothes")).toBeInTheDocument();
    expect(screen.getByText("Electronics")).toBeInTheDocument();
    expect(screen.getByText("Jewelery")).toBeInTheDocument();
  });

  it("Calls setSearchByCategory when category links are clicked", () => {
    render(
      <BrowserRouter>
        <ShopContext.Provider value={mockContextValue}>
          <Navbar />
        </ShopContext.Provider>
      </BrowserRouter>
    );

    // Simulate user clicking the "Electronics" category
    fireEvent.click(screen.getByText("Electronics"));

    // Verify that setSearchByCategory was called with "electronics"
    expect(mockContextValue.setSearchByCategory).toHaveBeenCalledWith(
      "electronics"
    );
  });

  it("Shows the correct cart product count", () => {
    render(
      <BrowserRouter>
        <ShopContext.Provider value={mockContextValue}>
          <Navbar />
        </ShopContext.Provider>
      </BrowserRouter>
    );

    // Verify that the cart icon displays the correct count
    expect(screen.getByText("🛒 2")).toBeInTheDocument();
  });

  it("Calls setSignOut when clicking the sign-out link", () => {
    render(
      <BrowserRouter>
        <ShopContext.Provider value={mockContextValue}>
          <Navbar />
        </ShopContext.Provider>
      </BrowserRouter>
    );

    // Simulate clicking on the sign-out link
    fireEvent.click(screen.getByText("Sign out"));

    // Verify that setSignOut was called
    expect(mockContextValue.setSignOut).toHaveBeenCalledWith(true);
  });
});
