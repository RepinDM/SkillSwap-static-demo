import { afterEach, describe, expect, it } from "vitest";
import reducer, { acceptRequest, addRequest, removeRequest } from "./exchangeRequestsSlice";

afterEach(() => localStorage.clear());

describe("exchange requests", () => {
  it("moves a confirmed demo request to the accepted state", () => {
    let state = reducer(undefined, addRequest({
      cardId: 12,
      status: "pending",
      createdAt: "2026-09-03T12:00:00.000Z",
    }));

    state = reducer(state, acceptRequest(12));

    expect(state.requests).toEqual([expect.objectContaining({ cardId: 12, status: "accepted" })]);
  });

  it("removes a cancelled request", () => {
    let state = reducer(undefined, addRequest({
      cardId: 12,
      status: "pending",
      createdAt: "2026-09-03T12:00:00.000Z",
    }));

    state = reducer(state, removeRequest(12));

    expect(state.requests).toEqual([]);
  });
});
