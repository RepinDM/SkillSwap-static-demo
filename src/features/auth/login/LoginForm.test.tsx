import { render, screen, fireEvent } from "@testing-library/react";
import { LoginForm } from "./LoginForm";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/services/slices/authSlice";
import { MemoryRouter } from "react-router-dom";
import * as hooks from "@/services/hooks";
import { loginUser } from "@/services/actions/login";
import { describe, expect, it, vi } from "vitest";
import type { AppDispatch } from "@/services/store";
import type * as ReactRouterDom from "react-router-dom";

vi.mock("@/services/actions/login");

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<typeof ReactRouterDom>("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const renderWithProviders = (state?: Partial<{ isLoading: boolean; error: string | null; user: null }>) => {
  const store = configureStore({
    reducer: {
      auth: authReducer,
    },
    preloadedState: {
      auth: {
        isLoading: false,
        error: null,
        user: null,
        ...state,
      },
    },
  });

  return render(
    <Provider store={store}>
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    </Provider>
  );
};

describe("LoginForm", () => {
  it("disables button while loading", () => {
    renderWithProviders({ isLoading: true });

    const button = screen.getByRole("button", { name: /Входим/i });

    expect(button).toBeDisabled();
  });

  it("redirects after successful login", async () => {
    const dispatch = vi.fn().mockResolvedValue({
      type: "auth/loginUser/fulfilled",
    });

    vi.spyOn(hooks, "useAppDispatch").mockReturnValue(dispatch as AppDispatch);

    loginUser.fulfilled = {
      match: () => true,
    };

    renderWithProviders();

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "test@mail.com" },
    });

    fireEvent.change(screen.getByLabelText(/Пароль/i), {
      target: { value: "123456" },
    });

    fireEvent.click(screen.getByText("Войти"));

    await Promise.resolve();

    expect(mockNavigate).toHaveBeenCalled();
  });
});
