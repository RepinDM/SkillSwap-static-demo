import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { SearchInput } from "./SearchInput";
import { useAppDispatch } from "@/services/hooks";
import { useNavigate, useLocation } from "react-router-dom";
import type { Mock } from "vitest";

vi.mock("@/services/hooks");

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: vi.fn(),
    useLocation: vi.fn(),
  };
});

vi.mock("@/services/slices/skillCardsSlice", () => ({
  setSearchQuery: vi.fn((payload) => ({
    type: "setSearchQuery",
    payload,
  })),
}));

describe("SearchInput", () => {
  const dispatch = vi.fn();
  const navigate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();

    (useAppDispatch as unknown as Mock).mockReturnValue(dispatch);
    (useNavigate as unknown as Mock).mockReturnValue(navigate);
    (useLocation as unknown as Mock).mockReturnValue({
      pathname: "/",
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("dispatch after 300ms debounce", () => {
    render(<SearchInput />);

    const input = screen.getByRole("searchbox");

    fireEvent.change(input, { target: { value: "react" } });

    expect(dispatch).not.toHaveBeenCalled();

    vi.advanceTimersByTime(300);

    expect(dispatch).toHaveBeenCalledWith({
      type: "setSearchQuery",
      payload: "react",
    });
  });

  it("navigates to / if not on main page", () => {
    (useLocation as unknown as Mock).mockReturnValue({
      pathname: "/profile",
    });

    render(<SearchInput />);

    const input = screen.getByRole("searchbox");

    fireEvent.change(input, { target: { value: "js" } });

    vi.advanceTimersByTime(300);

    expect(navigate).toHaveBeenCalledWith("/");
  });

  it("clears search when route changes", () => {
    (useLocation as unknown as Mock).mockReturnValue({
      pathname: "/profile",
    });

    render(<SearchInput value="react" />);

    expect(dispatch).toHaveBeenCalledWith({
      type: "setSearchQuery",
      payload: "",
    });
  });

  it("updates value from props", () => {
    const { rerender } = render(<SearchInput value="react" />);

    const input = screen.getByRole("searchbox") as HTMLInputElement;

    expect(input.value).toBe("react");

    rerender(<SearchInput value="vue" />);

    expect(input.value).toBe("vue");
  });

  it("updates local value on input change", () => {
    render(<SearchInput />);

    const input = screen.getByRole("searchbox") as HTMLInputElement;

    fireEvent.change(input, { target: { value: "angular" } });

    expect(input.value).toBe("angular");
  });
});