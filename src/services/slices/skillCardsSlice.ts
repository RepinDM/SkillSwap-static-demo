import type { TSkillCard } from "@/entities/skill/types";
import type { TCategoryItem } from "@/entities/category/types";
import { createSlice } from "@reduxjs/toolkit";
import { fetchSkillCards } from "../actions/skills";


interface SkillCardsState {
  allSkillCards: TSkillCard[];
  categoryItems: TCategoryItem[];
  status: "idle" | "loading" | "success" | "error";
  error: string | null;
}

const initialState: SkillCardsState = {
  allSkillCards: [],
  categoryItems: [],
  status: "idle",
  error: null
};

const skillCardsSlice = createSlice({
  name: 'skillCards',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSkillCards.pending, (state) => {
      state.status = "loading";
      state.error = null;
    })
    .addCase(fetchSkillCards.fulfilled, (state, action) => {
      state.status = "success";
      state.allSkillCards = action.payload.skillCardList;
      state.categoryItems = action.payload.categoryItems;
    })
    .addCase(fetchSkillCards.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message || "Ошибка загрузки";
    });
  },

  selectors: {
    selectAllSkillCards: (state) => state.allSkillCards,
    selectCategoryItems: (state) => state.categoryItems,
    selectStatus: (state) => state.status,
    selectError: (state) => state.error,
  },
});

export const { 
  selectAllSkillCards, 
  selectCategoryItems,
  selectStatus,
  selectError
} = skillCardsSlice.selectors;

export const { clearError } = skillCardsSlice.actions;

export default skillCardsSlice.reducer;