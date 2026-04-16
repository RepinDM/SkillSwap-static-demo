import { type RootState } from "../store";
import { createListenerMiddleware } from "@reduxjs/toolkit";
import { toggleFavorites } from "../slices/favoritesSlice";

export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  actionCreator: toggleFavorites,

  effect: (action, api) => {
    const state = api.getState() as RootState;
    const userId = state.auth.user?.id;
    const favorites = state.favorites.byId;
    if (!userId) return;
    localStorage.setItem(
      `favorites_${userId}`,
      JSON.stringify(favorites)
    );
  },
});

// import type { Middleware } from "@reduxjs/toolkit";
// import { toggleFavorites } from "../slices/favoritesSlice";

// export const saveFavoritesMiddleware: Middleware = (store) => (next) => (action) => {
//   const result = next(action);

//   if (toggleFavorites.match(action)) {
//     const state = store.getState();
//     const userId = state.auth.user?.id;
//     const favorites = state.favorites.byId;
//     localStorage.setItem(
//       `favorites_${userId}`,
//       JSON.stringify(favorites)
//     );

//     console.log(localStorage)
//   }

//   return result;
// };