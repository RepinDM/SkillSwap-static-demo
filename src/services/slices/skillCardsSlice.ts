import type { TSkillCard } from "@/entities/skill/types";
import type { TCategoryItem } from "@/entities/category/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { fetchSkillCards } from "../actions/skills";

interface SkillCardsState {
  allSkillCards: TSkillCard[];
  categoryItems: TCategoryItem[];
  isLoading: boolean;
  error: string | null;

  searchQuery: string;
  searchFilteredSkillCards: TSkillCard[];
}

const initialState: SkillCardsState = {
  allSkillCards: [],
  categoryItems: [],
  isLoading: false,
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
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSkillCards.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSkillCards.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allSkillCards = action.payload.skillCardList;
        state.categoryItems = action.payload.categoryItems;

        state.searchFilteredSkillCards = filterSkillCards(
          action.payload.skillCardList,
          state.searchQuery
        );
      })
      .addCase(fetchSkillCards.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Ошибка загрузки";
      });
  }
});

export const {setSearchQuery} = skillCardsSlice.actions;

export default skillCardsSlice.reducer;
