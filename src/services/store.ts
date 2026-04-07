import { configureStore } from '@reduxjs/toolkit'
import skillCardsSlice from './slices/skillCardsSlice'

export const store = configureStore({
  reducer: {
    skillCards: skillCardsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch