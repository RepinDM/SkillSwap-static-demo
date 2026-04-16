import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import FiltersSidebar from "./FilterSidebar";
import { useAppSelector } from "@/services/hooks";
import { selectCategoryItems } from "@/services/slices/skillCardsSlice";
import { selectAllSkillCards } from "@/services/slices/skillCardsSlice";
import "@testing-library/jest-dom";

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

beforeEach(() => {
  (useAppSelector as any).mockImplementation((selector: any) => {
  if (selector === selectCategoryItems) {
    return mockCategories;
  }
  return [];
});
});

describe("фильтры", () => {
  it("0 фильтров", () => {
    const onChange = vi.fn();
    render(
      <FiltersSidebar
        values={{
          mode: "all",
          gender: null,
          cities: [],
          skillIds: [],
        }}
        onChange={onChange}
      />
    );

    const title = screen.getByText(/Фильтры/i);
    expect(title.textContent).toContain("(0)");

  });
  it("2 фильтра", () => {
    const onChange = vi.fn();
    render(
      <FiltersSidebar
        values={{
          mode: "all",
          gender: "female",
          cities: ["Moscow"],
          skillIds: [],
        }}
        onChange={onChange}
      />
    );

    const title = screen.getByText(/Фильтры/i);
    expect(title.textContent).toContain("(2)");

  });
})

it("фильтр хочу научиться", () => {
  const onChange = vi.fn();

  render(
    <FiltersSidebar
      values={{ mode: "all", gender: null, cities: [], skillIds: [] }}
      onChange={onChange}
    />
  );

  fireEvent.click(screen.getByLabelText("Хочу научиться"));

  expect(onChange).toHaveBeenCalledWith(
    expect.objectContaining({ mode: "learn" })
  );
});

it("фильтр могу научить", () => {
  const onChange = vi.fn();

  render(
    <FiltersSidebar
      values={{ mode: "all", gender: null, cities: [], skillIds: [] }}
      onChange={onChange}
    />
  );

  fireEvent.click(screen.getByLabelText("Могу научить"));

  expect(onChange).toHaveBeenCalledWith(
    expect.objectContaining({ mode: "teach" })
  );
});

it("сброс фильтров", () => {
  const onChange = vi.fn();

  render(
    <FiltersSidebar
      values={{
        mode: "learn",
        gender: "male",
        cities: ["Almaty"],
        skillIds: [1, 2],
      }}
      onChange={onChange}
    />
  );

  fireEvent.click(screen.getByText("Сбросить"));

  expect(onChange).toHaveBeenCalledWith({
    mode: "all",
    gender: null,
    cities: [],
    skillIds: [],
  });
});

it("выбор категории", () => {
  const onChange = vi.fn();

  render(
    <FiltersSidebar
      values={{
        mode: "all",
        gender: null,
        cities: [],
        skillIds: [],
      }}
      onChange={onChange}
    />
  );

  const frontend = screen.getByText("Backend")
  fireEvent.click(frontend);
  const firstCall = onChange.mock.calls[0][0];
  expect(firstCall.skillIds).toEqual([21, 22]);
  fireEvent.click(frontend);
  expect(onChange).toHaveBeenCalledTimes(2);

});

it("клик по подкатегории", () => {
  const onChange = vi.fn();

  render(
    <FiltersSidebar
      values={{
        mode: "all",
        gender: null,
        cities: [],
        skillIds: [],
      }}
      onChange={onChange}
    />
  );

  const element = screen.getAllByTestId("button");
  fireEvent.click(element[0]);

  const subcat = screen.getByText('React');
  fireEvent.click(subcat);
  expect(onChange.mock.calls[0][0].skillIds).toContain(11); // React
  // expect(onChange).toHaveBeenCalled(1);
});



describe('кнопка все категории', () => {
  it("изменение текста при клике", () => {
    render(
      <FiltersSidebar
        values={{ mode: "all", gender: null, cities: [], skillIds: [] }}
        onChange={vi.fn()}
      />
    );

    const toggleButton = screen.getByText("Все категории");
    fireEvent.click(toggleButton);
    expect(screen.getByText("Скрыть категории")).toBeInTheDocument();
  });

})
