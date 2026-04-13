import type { TSkillCard } from "@/entities/skill/types";
import type { TCategoryItem } from "@/entities/category/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { fetchSkillCards } from "../actions/skills";

interface SkillCardsState {
  allSkillCards: TSkillCard[];
  categoryItems: TCategoryItem[];
  status: "idle" | "loading" | "success" | "error";
  error: string | null;

  searchQuery: string;
  searchFilteredSkillCards: TSkillCard[];
}

const initialState: SkillCardsState = {
  allSkillCards: [],
  categoryItems: [],
  status: "idle",
  error: null,

  searchQuery: "",
  searchFilteredSkillCards: []
};

const filterSkillCards = (cards: TSkillCard[], query: string) => {
  const q = query.toLowerCase();

  if (!q) return cards;

  return cards.filter(({ teachSkill }) =>
    teachSkill.title.toLowerCase().includes(q) ||
    teachSkill.description.toLowerCase().includes(q) ||
    teachSkill.subcategory.name.toLowerCase().includes(q) ||
    teachSkill.subcategory.category.name.toLowerCase().includes(q)
  );
};

const skillCardsSlice = createSlice({
  name: 'skillCards',
  initialState,
  reducers: {
    setSearchQuery(state, action:PayloadAction<string>){
      state.searchQuery = action.payload;

      state.searchFilteredSkillCards = filterSkillCards(
        state.allSkillCards,
        action.payload
      );
    },

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

        state.searchFilteredSkillCards = filterSkillCards(
          action.payload.skillCardList,
          state.searchQuery
        );
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
    selectSearchQuery: (state) => state.searchQuery,
    selectSearchFilteredSkillCards: (state) =>
      state.searchFilteredSkillCards
  }
});

export const {setSearchQuery, clearError} = skillCardsSlice.actions;

export const { 
  selectAllSkillCards, 
  selectCategoryItems,
  selectStatus,
  selectError,
  selectSearchQuery,
  selectSearchFilteredSkillCards
} = skillCardsSlice.selectors;

export default skillCardsSlice.reducer;
