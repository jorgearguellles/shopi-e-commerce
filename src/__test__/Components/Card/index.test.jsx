import { render, screen, fireEvent } from "@testing-library/react"; // Renders components and simulates user events
import { describe, expect, it, vi } from "vitest"; // Testing functions from Vitest
import { Card } from "../../../Components/Card"; // Card component to be tested
import { ShopContext } from "../../../Context"; // Context provider for the application

describe("Card Component:", () => {
  // Mock product data for testing
  const mockProduct = {
    id: 1,
    category: "Electronics",
    title: "Test Product",
    price: 99.99,
    image: "https://via.placeholder.com/150",
  };

  // Mock context values and functions
  const mockContextValue = {
    openProductDetail: vi.fn(), // Mock function for opening product details
    closeProductDetail: vi.fn(), // Mock function for closing product details
    collectProductInfo: vi.fn(), // Mock function for collecting product info
    addProductToCart: vi.fn(), // Mock function for adding a product to the cart
    openMyOrder: vi.fn(), // Mock function for opening the order summary
    cartProducts: [], // Mock cart products list
  };

  it("Renders the product details correctly", () => {
    // Render the Card component with the mocked context and product info
    render(
      <ShopContext.Provider value={mockContextValue}>
        <Card productInfo={mockProduct} />
      </ShopContext.Provider>
    );

    // Verify that product details are displayed correctly
    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("$99.99")).toBeInTheDocument();
    expect(screen.getByText("Electronics")).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: /test product/i })
    ).toBeInTheDocument();
  });

  it("Calls openProductDetail and collectProductInfo when clicked", () => {
    // Render the Card component with the mocked context
    render(
      <ShopContext.Provider value={mockContextValue}>
        <Card productInfo={mockProduct} />
      </ShopContext.Provider>
    );

    // Simulate clicking on the product card
    fireEvent.click(screen.getByText("Test Product"));

    // Check that the expected functions are called
    expect(mockContextValue.openProductDetail).toHaveBeenCalledTimes(1);
    expect(mockContextValue.collectProductInfo).toHaveBeenCalledWith(
      mockProduct
    );
  });

  it("Calls addProductToCart and updates UI when add button is clicked", () => {
    // Render the Card component with the mocked context
    render(
      <ShopContext.Provider value={mockContextValue}>
        <Card productInfo={mockProduct} />
      </ShopContext.Provider>
    );

    // Simulate clicking on the add-to-cart button
    const addButton = screen.getByText("+");
    fireEvent.click(addButton);

    // Verify that the correct functions are triggered
    expect(mockContextValue.addProductToCart).toHaveBeenCalledWith(mockProduct);
    expect(mockContextValue.openMyOrder).toHaveBeenCalledTimes(1);
  });
});
