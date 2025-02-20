import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ProductDetail } from "../../../Components/ProductDetail";
import { ShopContext } from "../../../Context";

// Mock data for testing
const mockProduct = {
  title: "Test Product",
  price: 99.99,
  image: "https://via.placeholder.com/150",
  description: "This is a test product description.",
};

describe("ProductDetail Component:", () => {
  let mockContext;

  beforeEach(() => {
    mockContext = {
      closeProductDetail: vi.fn(), // Mock function for closing the detail
      isProductDetailOpen: true, // Simulate the product detail being open
      productToShow: mockProduct, // Provide the mock product data
    };
  });

  it("Renders correctly when product detail is open", () => {
    render(
      <ShopContext.Provider value={mockContext}>
        <ProductDetail />
      </ShopContext.Provider>
    );

    // Check if the product title appears
    expect(screen.getByText(mockProduct.title)).toBeInTheDocument();
    // Check if the product price appears
    expect(screen.getByText(`$${mockProduct.price}`)).toBeInTheDocument();
    // Check if the product description appears
    expect(screen.getByText(mockProduct.description)).toBeInTheDocument();
    // Check if the close button exists
    expect(screen.getByText("X")).toBeInTheDocument();
  });

  it("Calls closeProductDetail when the close button is clicked", () => {
    render(
      <ShopContext.Provider value={mockContext}>
        <ProductDetail />
      </ShopContext.Provider>
    );

    // Simulate clicking the close button
    fireEvent.click(screen.getByText("X"));

    // Ensure closeProductDetail is called once
    expect(mockContext.closeProductDetail).toHaveBeenCalledTimes(1);
  });
});
