import { afterEach, describe, expect, it } from "vitest";
import { readStoredJson } from "./storage";

afterEach(() => localStorage.clear());

describe("readStoredJson", () => {
  it("returns the fallback and removes malformed data", () => {
    localStorage.setItem("broken", "not-json");

    expect(readStoredJson("broken", [])).toEqual([]);
    expect(localStorage.getItem("broken")).toBeNull();
  });
});
