import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { fetchSkillCards } from "../actions/skills";

type Like = {
  count: number
  isLiked: boolean
}

interface LikesState{
  likes: Record<number, Like>
}

const initialState: LikesState = {
  likes: {}
}

const likesSlice = createSlice({
  name: 'likes',
  initialState,
  reducers: {
    initLikes: (state, action: PayloadAction<number[]>) => {
      action.payload.forEach(id => {
        if (!state.likes[id]) {
          state.likes[id] = {
            count: Math.floor(Math.random() * 101),
            isLiked: false
          }
        }
      })
    },
    toggleLike: (state, action: PayloadAction<number>) => {
      const item = state.likes[action.payload];
      if(!item) return;
      if(item.isLiked){
        item.isLiked = false;
        item.count -= 1;
      } else{
        item.isLiked = true;
        item.count += 1;
      }
      if (item.count < 0) item.count = 0;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSkillCards.fulfilled, (state, action) => {
    const ids = action.payload.skillCardList.map(card => card.id);

    ids.forEach(id => {
      if (!state.likes[id]) {
        state.likes[id] = {
          count: Math.floor(Math.random() * 101),
          isLiked: false,
        };
      }
    });
  });
  },
  selectors: {
    selectLikes: (state) => state.likes,
    selectLikesById: (state, id) => state.likes[id],
  }
})

export const {
  initLikes,
  toggleLike
} = likesSlice.actions;

export const { selectLikes, selectLikesById } = likesSlice.selectors;

export default likesSlice.reducer;