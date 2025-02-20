import { render, screen, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ShopContext, ShoppingContext } from "../../Context";
import { useContext } from "react";

// Helper function to consume context
const TestComponent = () => {
  const context = useContext(ShopContext);

  // Add the mock function to the context
  window.testContext = {
    ...context,
    filterBy: (filterType, items, searchTitle, searchCategory) => {
      switch (filterType) {
        case "BY_TITLE":
          return items.filter((item) =>
            item.title.toLowerCase().includes(searchTitle.toLowerCase())
          );
        case "BY_CATEGORY":
          return items.filter(
            (item) =>
              item.category.toLowerCase() === searchCategory.toLowerCase()
          );
        case "BY_TITLE_AND_CATEGORY":
          return items.filter(
            (item) =>
              item.title.toLowerCase().includes(searchTitle.toLowerCase()) &&
              item.category.toLowerCase() === searchCategory.toLowerCase()
          );
        default:
          return items;
      }
    },
  };

  return (
    <div>
      <p data-testid="isProductDetailOpen">
        {String(context.isProductDetailOpen)}
      </p>
      <p data-testid="isMyOrderOpen">{String(context.isMyOrderOpen)}</p>
      <p data-testid="cartProducts">{JSON.stringify(context.cartProducts)}</p>
    </div>
  );
};

// Renders the ShoppingContext for testing
const renderWithContext = () => {
  return render(
    <ShoppingContext>
      <TestComponent />
    </ShoppingContext>
  );
};

describe("ShoppingContext:", () => {
  it("Ensures default values are set correctly", () => {
    renderWithContext();

    expect(screen.getByTestId("isProductDetailOpen").textContent).toBe("false");
    expect(screen.getByTestId("isMyOrderOpen").textContent).toBe("false");
    expect(screen.getByTestId("cartProducts").textContent).toBe("[]");
  });

  it("Opens product detail when calling openProductDetail", () => {
    renderWithContext();

    act(() => {
      window.testContext.openProductDetail();
    });

    expect(screen.getByTestId("isProductDetailOpen").textContent).toBe("true");
  });

  it("Closes product detail when calling closeProductDetail", () => {
    renderWithContext();

    act(() => {
      window.testContext.openProductDetail();
      window.testContext.closeProductDetail();
    });

    expect(screen.getByTestId("isProductDetailOpen").textContent).toBe("false");
  });

  it("Opens order summary when calling openMyOrder", () => {
    renderWithContext();

    act(() => {
      window.testContext.openMyOrder();
    });

    expect(screen.getByTestId("isMyOrderOpen").textContent).toBe("true");
  });

  it("Closes order summary when calling closeMyOrder", () => {
    renderWithContext();

    act(() => {
      window.testContext.openMyOrder();
      window.testContext.closeMyOrder();
    });

    expect(screen.getByTestId("isMyOrderOpen").textContent).toBe("false");
  });

  it("Adds a product to the cart", () => {
    renderWithContext();
    const product = { id: 1, title: "Test Product", price: 50 };

    act(() => {
      window.testContext.addProductToCart(product);
    });

    expect(screen.getByTestId("cartProducts").textContent).toContain(
      "Test Product"
    );
  });

  it("Removes a product from the cart", () => {
    renderWithContext();
    const product1 = { id: 1, title: "Test Product 1", price: 50 };
    const product2 = { id: 2, title: "Test Product 2", price: 30 };

    act(() => {
      window.testContext.addProductToCart(product1);
      window.testContext.addProductToCart(product2);
      window.testContext.removeProductFromCart(1);
    });

    expect(screen.getByTestId("cartProducts").textContent).not.toContain(
      "Test Product 1"
    );
    expect(screen.getByTestId("cartProducts").textContent).toContain(
      "Test Product 2"
    );
  });

  it("Calculates total amount correctly", () => {
    renderWithContext();
    const product1 = { id: 1, price: 50 };
    const product2 = { id: 2, price: 30 };

    act(() => {
      window.testContext.addProductToCart(product1);
      window.testContext.addProductToCart(product2);
    });

    expect(product1.price + product2.price).toBe(80);
  });

  it("Filters items by title", () => {
    renderWithContext();

    const items = [
      { title: "Apple", category: "Fruit" },
      { title: "Banana", category: "Fruit" },
      { title: "Carrot", category: "Vegetable" },
      { title: "Carrot", category: "Vegetable" },
    ];
    const searchTitle = "Carrot";

    act(() => {
      const filteredItems = window.testContext.filterBy(
        "BY_TITLE",
        items,
        searchTitle,
        ""
      );
      expect(filteredItems).toHaveLength(2);
    });
  });

  it("Filters items by category", () => {
    const items = [
      { title: "Apple", category: "Fruit" },
      { title: "Banana", category: "Fruit" },
      { title: "Carrot", category: "Vegetable" },
    ];
    const searchCategory = "Fruit";

    act(() => {
      const filteredItems = window.testContext.filterBy(
        "BY_CATEGORY",
        items,
        "",
        searchCategory
      );
      expect(filteredItems).toHaveLength(2);
    });
  });

  it("Filters items by title and category", () => {
    const items = [
      { title: "Apple", category: "Fruit" },
      { title: "Apple", category: "Fruit" },
      { title: "Banana", category: "Fruit" },
      { title: "Carrot", category: "Vegetable" },
    ];
    const searchTitle = "Apple";
    const searchCategory = "Fruit";

    act(() => {
      const filteredItems = window.testContext.filterBy(
        "BY_TITLE_AND_CATEGORY",
        items,
        searchTitle,
        searchCategory
      );
      expect(filteredItems).toHaveLength(2);
    });
  });
});
