import { describe, expect, it } from "vitest";

import { extractCities } from "./skillswap-api";

describe("extractCities", () => {
  it("keeps valid cities from all users, removes duplicates, and sorts them", () => {
    const cities = extractCities([
      { id: 1, name: "Анна", city: { id: 2, name: "Москва" } },
      { id: 2, name: "Борис", city: { id: 1, name: "Казань" } },
      { id: 3, name: "Вера", city: { id: 2, name: "Москва" } },
      { id: 4, name: "Глеб", city: {} },
    ]);

    expect(cities).toEqual([
      { id: 1, name: "Казань" },
      { id: 2, name: "Москва" },
    ]);
  });
});
