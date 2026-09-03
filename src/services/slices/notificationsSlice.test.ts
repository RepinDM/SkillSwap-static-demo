import { afterEach, describe, expect, it } from "vitest";
import reducer, { addNotification, clearRead, markAllRead } from "./notificationsSlice";

afterEach(() => localStorage.clear());

describe("demo notifications", () => {
  it("marks notifications as read and clears them", () => {
    let state = reducer(undefined, addNotification({
      title: "Обмен подтверждён",
      description: "Предложение добавлено в список обменов.",
      route: "/profile/exchanges",
    }));

    state = reducer(state, markAllRead());
    expect(state.items[0]?.isRead).toBe(true);

    state = reducer(state, clearRead());
    expect(state.items).toEqual([]);
  });
});
