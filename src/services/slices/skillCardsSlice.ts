import type { TSkillCard } from "@/entities/skill/types";
import type { TCategoryItem } from "@/entities/category/types";
import { createSlice } from "@reduxjs/toolkit";
import { fetchSkillCards } from "../actions/skills";

interface SkillCardsState {
  allSkillCards: TSkillCard[];
  filteredSkillCards: TSkillCard[];
  categoryItems: TCategoryItem[];
  isLoading: boolean;
  error: string | null;
}

const initialState: SkillCardsState = {
  allSkillCards: [],
  filteredSkillCards: [],
  categoryItems: [],
  isLoading: false,
  error: null
};

const skillCardsSlice = createSlice({
  name: 'skillCards',
  initialState,
  reducers: {
    setFilteredSkillCards: (state, action) => {
      state.filteredSkillCards = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSkillCards.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSkillCards.fulfilled, (state, action) => {
        state.isLoading = false;

        state.allSkillCards = action.payload.skillCardList;
        state.filteredSkillCards = action.payload.filteredSkillCardList;
        state.categoryItems = action.payload.categoryItems;
      })
      .addCase(fetchSkillCards.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Ошибка загрузки";
      });
  }
});

export const { setFilteredSkillCards } = skillCardsSlice.actions;
export default skillCardsSlice.reducer;