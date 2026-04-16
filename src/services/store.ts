import { configureStore } from '@reduxjs/toolkit'
import skillCardsSlice from './slices/skillCardsSlice'
import registerSlice from './slices/registerSlice';
import authSlice from './slices/authSlice';
import likesSlice from './slices/likesSlice'
import favoritesSlice from './slices/favoritesSlice'
import { listenerMiddleware } from './middleware/saveFavorites.middleware';
import { loadFavoriteState } from './preloadedState';
import { loadLikesState } from './preloadedState';
import exchangeRequestsSlice from './slices/exchangeRequestsSlice';


export const store = configureStore({
  reducer: {
    skillCards: skillCardsSlice,
    register: registerSlice,
    auth: authSlice,
    likes: likesSlice,
    favorites: favoritesSlice,
  },
  preloadedState: {
    favorites: {byId: loadFavoriteState()},
    likes: loadLikesState()
    exchangeRequests: exchangeRequestsSlice,

  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
    .prepend(listenerMiddleware.middleware)
});
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch