import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { readStoredJson, writeStoredJson } from "@/shared/lib/storage";

const STORAGE_KEY = "skillswap-demo-notifications";

export type DemoNotification = {
  id: string;
  title: string;
  description: string;
  route: "/profile/requests" | "/profile/exchanges";
  isRead: boolean;
  createdAt: string;
};

const initialState: { items: DemoNotification[] } = {
  items: readStoredJson<DemoNotification[]>(STORAGE_KEY, []).map((item) => ({
    ...item,
    isRead: Boolean(item.isRead),
  })),
};

const save = (items: DemoNotification[]) => writeStoredJson(STORAGE_KEY, items);

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<Omit<DemoNotification, "id" | "isRead" | "createdAt">>) => {
      state.items.unshift({
        ...action.payload,
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        isRead: false,
        createdAt: new Date().toISOString(),
      });
      save(state.items);
    },
    markAllRead: (state) => {
      state.items.forEach((item) => {
        item.isRead = true;
      });
      save(state.items);
    },
    clearRead: (state) => {
      state.items = state.items.filter((item) => !item.isRead);
      save(state.items);
    },
  },
  selectors: {
    selectNotifications: (state) => state.items,
  },
});

export const { addNotification, markAllRead, clearRead } = notificationsSlice.actions;
export const { selectNotifications } = notificationsSlice.selectors;
export default notificationsSlice.reducer;
