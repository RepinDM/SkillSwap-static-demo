import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface FavoritesState{
  byId: Record<number, true>
}

const initialState: FavoritesState = {
  byId: {}
}

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorites: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      
      if(state.byId[id]) {
        delete state.byId[id]
      } else{
        state.byId[id] = true
      }

      console.log(JSON.stringify(state.byId))
    }
  },
  selectors: {
    selectFavorites: (state) => state.byId
  }
})

export const {
  toggleFavorites
} = favoritesSlice.actions;

export const { selectFavorites } = favoritesSlice.selectors;

export default favoritesSlice.reducer;
