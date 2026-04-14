import { configureStore } from '@reduxjs/toolkit'
import skillCardsSlice from './slices/skillCardsSlice'
import registerSlice from './slices/registerSlice';
import authSlice from './slices/authSlice';

export const store = configureStore({
  reducer: {
    skillCards: skillCardsSlice,
    register: registerSlice,
    auth: authSlice,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch