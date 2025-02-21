import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Home } from "../../../Pages/Home";
import { ShopContext } from "../../../Context";

// Mocks de componentes importados en Home
vi.mock("../../../Components/Card", () => ({
  Card: ({ productInfo }) => <div data-testid="card">{productInfo?.title}</div>,
}));

vi.mock("../../../Components/Layout", () => ({
  Layout: ({ children }) => <div data-testid="layout">{children}</div>,
}));

vi.mock("../../../Components/ProductDetail", () => ({
  ProductDetail: () => <div data-testid="product-detail">Product Detail</div>,
}));

// Helper function para crear un contexto mockeado
const mockContext = (overrides) => ({
  searchByTitle: "",
  setSearchByTitle: vi.fn(),
  filteredItems: [],
  ...overrides,
});

// Helper para renderizar Home con contexto mockeado
const renderWithContext = (contextValues) => {
  return render(
    <ShopContext.Provider value={contextValues}>
      <Home />
    </ShopContext.Provider>
  );
};

describe("Home Component:", () => {
  // 1. Initial render
  it("Renders Home component correctly", () => {
    renderWithContext(mockContext());

    expect(
      screen.getByPlaceholderText("Find your product")
    ).toBeInTheDocument();
    expect(screen.getByText("🔍")).toBeInTheDocument();
  });

  it("Renders Layout and ProductDetail components", () => {
    renderWithContext(mockContext());

    expect(screen.getByTestId("layout")).toBeInTheDocument();
    expect(screen.getByTestId("product-detail")).toBeInTheDocument();
  });

  // 2. Products searched
  it("Updates searchByTitle when typing in input", () => {
    const context = mockContext();
    renderWithContext(context);

    const input = screen.getByPlaceholderText("Find your product");
    fireEvent.change(input, { target: { value: "Apple" } });

    expect(context.setSearchByTitle).toHaveBeenCalledWith("Apple");
  });

  it("Clears search input on form submit", () => {
    const context = mockContext();
    renderWithContext(context);

    const form = screen.getByTestId("search-form");
    fireEvent.submit(form);

    expect(context.setSearchByTitle).toHaveBeenCalledWith("");
  });

  // 3. Products filtered
  it("Renders filtered items using Card component", () => {
    const context = mockContext({
      filteredItems: [
        { id: 1, title: "Apple" },
        { id: 2, title: "Banana" },
      ],
    });
    renderWithContext(context);

    expect(screen.getAllByTestId("card")).toHaveLength(2);
    expect(screen.getByText("Apple")).toBeInTheDocument();
    expect(screen.getByText("Banana")).toBeInTheDocument();
  });

  it("Shows 'no products' message when filteredItems is empty", () => {
    renderWithContext(mockContext());

    expect(screen.getByText("We do not find any product")).toBeInTheDocument();
  });

  // 4. Context Interaction
  it("consumes ShopContext correctly", () => {
    const mockValues = mockContext({ searchByTitle: "Mock Search" });
    renderWithContext(mockValues);

    const input = screen.getByPlaceholderText("Find your product");

    expect(input.value).toBe("Mock Search");
  });

  it("calls setSearchByTitle when handleChange is executed", () => {
    const context = mockContext();
    renderWithContext(context);

    const input = screen.getByPlaceholderText("Find your product");
    fireEvent.change(input, { target: { value: "Test" } });

    expect(context.setSearchByTitle).toHaveBeenCalledWith("Test");
  });
});
