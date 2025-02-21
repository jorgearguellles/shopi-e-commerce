import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { SignIn } from "../../../Pages/SignIn";
import { ShopContext } from "../../../Context";

// Mock global context
const mockContext = (overrides) => ({
  account: {},
  setSignOut: vi.fn(),
  setAccount: vi.fn(),
  ...overrides,
});

// Helper function to render SignIn with mock context
const renderWithContext = (contextValues) => {
  return render(
    <ShopContext.Provider value={contextValues}>
      <MemoryRouter>
        <SignIn />
      </MemoryRouter>
    </ShopContext.Provider>
  );
};

describe("SignIn Component:", () => {
  // 1. Renders without crashing
  it("Renders SignIn component without crashing", () => {
    renderWithContext(mockContext());
    expect(screen.getByText("Welcome")).toBeInTheDocument();
  });

  // 2. Displays login form when a user exists
  it("Shows login form when a user exists", () => {
    const mockAccount = { email: "test@example.com", password: "123456" };
    renderWithContext(mockContext({ account: mockAccount }));
    expect(screen.getByText("Email:")).toBeInTheDocument();
    expect(screen.getByText("Password:")).toBeInTheDocument();
  });

  // 3. Login button is disabled when no account exists
  it("Disables login button when no account exists", () => {
    renderWithContext(mockContext());
    expect(screen.getByRole("button", { name: /log in/i })).toBeDisabled();
  });

  // 4. Login button redirects when clicked
  it("Redirects when login button is clicked", () => {
    const mockAccount = { email: "test@example.com", password: "123456" };
    const mockSetSignOut = vi.fn();
    renderWithContext(
      mockContext({ account: mockAccount, setSignOut: mockSetSignOut })
    );
    const loginButton = screen.getByRole("button", { name: /log in/i });
    fireEvent.click(loginButton);
    expect(mockSetSignOut).toHaveBeenCalledWith(false);
  });

  // 5. Sign-up button is disabled when an account exists
  it("Disables sign-up button when an account exists", () => {
    const mockAccount = { email: "test@example.com" };
    renderWithContext(mockContext({ account: mockAccount }));
    expect(screen.getByRole("button", { name: /sign up/i })).toBeDisabled();
  });

  // 6. Switches to create user form when sign-up button is clicked
  it("Displays create user form when sign-up is clicked", () => {
    renderWithContext(mockContext());
    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));
    expect(screen.getByText("Your name:")).toBeInTheDocument();
  });

  // 7. Create user form renders properly
  it("Displays all fields in create user form", () => {
    renderWithContext(mockContext());
    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));
    expect(screen.getByPlaceholderText("Peter")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("hi@helloworld.com")
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("******")).toBeInTheDocument();
  });

  // 8. Create button calls createAnAccount function
  it("Calls createAnAccount function when Create button is clicked", () => {
    const mockSetAccount = vi.fn();
    renderWithContext(mockContext({ setAccount: mockSetAccount }));
    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));
    fireEvent.click(screen.getByRole("button", { name: /create/i }));
    expect(mockSetAccount).toHaveBeenCalled();
  });
});
