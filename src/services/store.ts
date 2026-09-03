import { configureStore } from '@reduxjs/toolkit'
import skillCardsSlice from './slices/skillCardsSlice'
import registerSlice from './slices/registerSlice';
import authSlice from './slices/authSlice';
import likesSlice from './slices/likesSlice'
import favoritesSlice from './slices/favoritesSlice'
import { listenerMiddleware } from './middleware/saveFavorites.middleware';
import { loadFavoriteState } from './preloadedState';
import notificationsSlice from './slices/notificationsSlice';
import exchangeRequestsSlice from './slices/exchangeRequestsSlice';


export const store = configureStore({
  reducer: {
    skillCards: skillCardsSlice,
    register: registerSlice,
    auth: authSlice,
    likes: likesSlice,
    exchangeRequests: exchangeRequestsSlice,
    favorites: favoritesSlice,
    notifications: notificationsSlice,
  },
  preloadedState: {
    favorites: {byId: loadFavoriteState()},
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: ["register.step2.avatar", "register.step3.images"],
        ignoredActionPaths: ["payload.avatar", "payload.images"],
      },
    })
    .prepend(listenerMiddleware.middleware)
});
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
