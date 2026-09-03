import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { fetchSkillCards } from "../actions/skills";
import { readStoredJson, writeStoredJson } from "@/shared/lib/storage";

type Like = {
  count: number
  isLiked: boolean
}

interface LikesState{
  likes: Record<number, Like>
}

const STORAGE_KEY = "skillswap-demo-likes";
const getDemoLikeCount = (id: number) => 12 + ((id * 37) % 78);

const initialState: LikesState = {
  likes: readStoredJson<LikesState["likes"]>(STORAGE_KEY, {}),
};

const likesSlice = createSlice({
  name: 'likes',
  initialState,
  reducers: {
    initLikes: (state, action: PayloadAction<number[]>) => {
      action.payload.forEach(id => {
        if (!state.likes[id]) {
          state.likes[id] = {
            count: getDemoLikeCount(id),
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
      writeStoredJson(STORAGE_KEY, state.likes);
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSkillCards.fulfilled, (state, action) => {
    const ids = action.payload.skillCardList.map(card => card.id);

    ids.forEach(id => {
      if (!state.likes[id]) {
        state.likes[id] = {
          count: getDemoLikeCount(id),
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
