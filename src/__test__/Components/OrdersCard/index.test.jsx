import { render, screen } from "@testing-library/react";
import { vi, describe, it, expect } from "vitest";
import { OrdersCard } from "../../../Components/OrdersCard";

// Mock getTodayDate to return a fixed date
vi.mock("../../../utils/getTodayDate", () => ({
  getTodayDate: vi.fn(() => "2025-02-19"),
}));

describe("OrdersCard Component:", () => {
  it("Renders correctly with given props", () => {
    // Test props
    const totalPrice = 150;
    const totalProducts = 3;

    // Render component
    render(
      <OrdersCard totalPrice={totalPrice} totalProducts={totalProducts} />
    );

    // Verify the purchase date is correctly displayed
    expect(screen.getByText(/Date of purchase:/)).toHaveTextContent(
      "Date of purchase: 2025-02-19"
    );

    // Verify the total number of items
    expect(screen.getByText(/Items:/)).toHaveTextContent("Items: # 3");

    // Verify the total price
    expect(screen.getByText(/Total Price:/)).toHaveTextContent(
      "Total Price: $ 150"
    );

    // Ensure the '>>' button is present
    expect(screen.getByText(">>")).toBeInTheDocument();
  });
});
