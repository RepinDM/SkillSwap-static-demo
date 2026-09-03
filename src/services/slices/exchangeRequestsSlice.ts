import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/services/store";
import { readStoredJson } from "@/shared/lib/storage";

export type ExchangeRequest = {
  cardId: number;
  status: "pending" | "accepted";
  createdAt: string;
};

interface ExchangeState {
  requests: ExchangeRequest[];
}

const initialState: ExchangeState = {
  requests: readStoredJson<ExchangeRequest[]>("exchangeRequests", []),
};

const exchangeRequestsSlice = createSlice({
  name: "exchangeRequests",
  initialState,
  reducers: {
    addRequest: (state, action: PayloadAction<ExchangeRequest>) => {
        const exists = state.requests.some(
            (r) => r.cardId === action.payload.cardId
        );

        if (!exists) {
            state.requests.push(action.payload);

            localStorage.setItem(
            "exchangeRequests",
            JSON.stringify(state.requests)
            );
        }
    },

    removeRequest: (state, action: PayloadAction<number>) => {
        state.requests = state.requests.filter(
            (r) => r.cardId !== action.payload
        );

        localStorage.setItem(
            "exchangeRequests",
            JSON.stringify(state.requests)
        );
        },

    acceptRequest: (state, action: PayloadAction<number>) => {
      const request = state.requests.find((item) => item.cardId === action.payload);

      if (request) {
        request.status = "accepted";
        localStorage.setItem("exchangeRequests", JSON.stringify(state.requests));
      }
    },

    clearRequests: (state) => {
      state.requests = [];
      localStorage.removeItem("exchangeRequests");
    },
  },
});

// actions
export const { addRequest, removeRequest, acceptRequest, clearRequests } =
  exchangeRequestsSlice.actions;

// selector
export const selectExchangeRequests = (state: RootState) =>
  state.exchangeRequests.requests;

export default exchangeRequestsSlice.reducer;
