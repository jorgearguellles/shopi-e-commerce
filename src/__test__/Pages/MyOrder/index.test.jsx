import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MyAccount } from "../../../Pages/MyAccount";
import { ShopContext } from "../../../Context";

// Mock global context
const mockContext = (overrides) => ({
  setAccount: vi.fn(),
  ...overrides,
});

// Helper function to render MyAccount with mock context
const renderWithContext = (contextValues) => {
  return render(
    <ShopContext.Provider value={contextValues}>
      <MyAccount />
    </ShopContext.Provider>
  );
};

describe("MyAccount Component:", () => {
  // 1. Initial render
  it("Renders user information correctly", () => {
    localStorage.setItem(
      "account",
      JSON.stringify({
        name: "Jorge",
        lastName: "Arias",
        email: "jorge@arias.com",
        password: "123456",
      })
    );

    renderWithContext(mockContext());

    expect(screen.getByText("Jorge")).toBeInTheDocument();
    expect(screen.getByText("Arias")).toBeInTheDocument();
    expect(screen.getByText("jorge@arias.com")).toBeInTheDocument();
  });

  // 2. Edit mode
  it("Switches to edit mode when edit button is clicked", () => {
    renderWithContext(mockContext());

    fireEvent.click(screen.getByText("Edit"));

    expect(screen.getByLabelText("Your name:")).toBeInTheDocument();
    expect(screen.getByLabelText("Your last name:")).toBeInTheDocument();
    expect(screen.getByLabelText("Your email:")).toBeInTheDocument();
    expect(screen.getByLabelText("Your password:")).toBeInTheDocument();
  });

  // 3. Update user data
  it("Updates user information and persists it", () => {
    const mockSetAccount = vi.fn();
    localStorage.setItem(
      "account",
      JSON.stringify({
        name: "Jorge",
        lastName: "Arias",
        email: "jorge@arias.com",
        password: "123456",
      })
    );

    renderWithContext(mockContext({ setAccount: mockSetAccount }));
    fireEvent.click(screen.getByText("Edit"));

    fireEvent.change(screen.getByLabelText("Your name:"), {
      target: { value: "Carlos" },
    });
    fireEvent.change(screen.getByLabelText("Your last name:"), {
      target: { value: "Martínez" },
    });
    fireEvent.change(screen.getByLabelText("Your email:"), {
      target: { value: "carlos@martinez.com" },
    });
    fireEvent.change(screen.getByLabelText("Your password:"), {
      target: { value: "654321" },
    });

    fireEvent.click(screen.getByText("Edit"));

    expect(mockSetAccount).toHaveBeenCalledWith({
      name: "Carlos",
      lastName: "Martínez",
      email: "carlos@martinez.com",
      password: "654321",
    });

    const updatedAccount = JSON.parse(localStorage.getItem("account"));
    expect(updatedAccount).toEqual({
      name: "Carlos",
      lastName: "Martínez",
      email: "carlos@martinez.com",
      password: "654321",
    });
  });
});
