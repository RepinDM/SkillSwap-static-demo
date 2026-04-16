import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import FiltersSidebar from "./FilterSidebar";
import { useAppSelector } from "@/services/hooks";
import {
  selectAllSkillCards,
  selectCategoryItems,
} from "@/services/slices/skillCardsSlice";
import "@testing-library/jest-dom";
import type { TFilters } from "@/entities/filters/type";

vi.mock("@/services/hooks", () => ({
  useAppSelector: vi.fn(),
}));

const mockCategories = [
  {
    id: 1,
    name: "Frontend",
    subcategories: [
      { id: 11, name: "React" },
      { id: 12, name: "Vue" },
    ],
  },
  {
    id: 2,
    name: "Backend",
    subcategories: [
      { id: 21, name: "PHP" },
      { id: 22, name: "Python" },
    ],
  },
  {
    id: 3,
    name: "FullStack",
    subcategories: [
      { id: 31, name: "React/PHP" },
      { id: 32, name: "Python/Vue" },
    ],
  },
];

const mockSkillCards = [
  {
    user: { city: { name: "Moscow" } },
  },
  {
    user: { city: { name: "Kazan" } },
  },
];

const defaultValues: TFilters = {
  mode: "all",
  gender: null,
  cities: [],
  skillIds: [],
};

const renderSidebar = (
  values: TFilters = defaultValues,
  onChange = vi.fn()
) => {
  render(<FiltersSidebar values={values} onChange={onChange} />);

  return { onChange };
};

beforeEach(() => {
  vi.clearAllMocks();

  // Компонент использует два selector-а: категории и список карточек для городов.
  vi.mocked(useAppSelector).mockImplementation((selector) => {
    if (selector === selectCategoryItems) {
      return mockCategories;
    }

    if (selector === selectAllSkillCards) {
      return mockSkillCards;
    }

    return [];
  });
});

describe("FiltersSidebar", () => {
  it("показывает 0 активных фильтров по умолчанию", () => {
    renderSidebar();

    expect(screen.getByText(/Фильтры \(0\)/i)).toBeInTheDocument();
  });

  it("корректно считает активные фильтры", () => {
    renderSidebar({
      mode: "all",
      gender: "female",
      cities: ["Moscow"],
      skillIds: [11],
    });

    expect(screen.getByText(/Фильтры \(3\)/i)).toBeInTheDocument();
  });

  it("меняет режим на all", () => {
    const { onChange } = renderSidebar({
      ...defaultValues,
      mode: "learn",
    });

    fireEvent.click(screen.getByLabelText("Всё"));

    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ mode: "all" })
    );
  });

  it("меняет режим на learn", () => {
    const { onChange } = renderSidebar();

    fireEvent.click(screen.getByLabelText("Хочу научиться"));

    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ mode: "learn" })
    );
  });

  it("меняет режим на teach", () => {
    const { onChange } = renderSidebar();

    fireEvent.click(screen.getByLabelText("Могу научить"));

    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ mode: "teach" })
    );
  });

  it("сбрасывает фильтры к начальному состоянию", () => {
    const { onChange } = renderSidebar({
      mode: "learn",
      gender: "male",
      cities: ["Almaty"],
      skillIds: [11, 12],
    });

    fireEvent.click(screen.getByRole("button", { name: /Сбросить/i }));

    expect(onChange).toHaveBeenCalledWith(defaultValues);
  });

  it("выбирает категорию и добавляет все ее подкатегории", () => {
    const { onChange } = renderSidebar();

    fireEvent.click(screen.getByLabelText("Backend"));

    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ skillIds: [21, 22] })
    );
  });

  it("снимает категорию и убирает все ее подкатегории", () => {
    const { onChange } = renderSidebar({
      ...defaultValues,
      skillIds: [21, 22],
    });

    fireEvent.click(screen.getByLabelText("Backend"));

    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ skillIds: [] })
    );
  });

  it("открывает и закрывает список подкатегорий категории", () => {
    renderSidebar();

    const toggleButton = screen.getByRole("button", {
      name: "Переключить подкатегории Frontend",
    });

    // Проверяем именно раскрытие/сворачивание UI, а не внутренний state.
    fireEvent.click(toggleButton);
    expect(screen.getByText("React")).toBeInTheDocument();

    fireEvent.click(toggleButton);
    expect(screen.queryByText("React")).not.toBeInTheDocument();
  });

  it("выбирает подкатегорию навыка", () => {
    const { onChange } = renderSidebar();

    fireEvent.click(
      screen.getByRole("button", {
        name: "Переключить подкатегории Frontend",
      })
    );
    fireEvent.click(screen.getByLabelText("React"));

    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ skillIds: [11] })
    );
  });

  it("снимает подкатегорию навыка", () => {
    const { onChange } = renderSidebar({
      ...defaultValues,
      skillIds: [11],
    });

    fireEvent.click(
      screen.getByRole("button", {
        name: "Переключить подкатегории Frontend",
      })
    );
    fireEvent.click(screen.getByLabelText("React"));

    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ skillIds: [] })
    );
  });

  it("меняет текст кнопки показа всех категорий", () => {
    renderSidebar();

    fireEvent.click(screen.getByRole("button", { name: /Все категории/i }));

    expect(
      screen.getByRole("button", { name: /Скрыть категории/i })
    ).toBeInTheDocument();
  });
});
