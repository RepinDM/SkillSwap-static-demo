import { configureStore } from '@reduxjs/toolkit'
import skillCardsSlice from './slices/skillCardsSlice'
import registerSlice from './slices/registerSlice';
import authSlice from './slices/authSlice';
import likesSlice from './slices/likesSlice'

export const store = configureStore({
  reducer: {
    skillCards: skillCardsSlice,
    register: registerSlice,
    auth: authSlice,
    likes: likesSlice,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch