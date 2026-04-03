import type { TSkillCard } from "@/entities/skill/types";
import { createSlice } from "@reduxjs/toolkit";
import { fetchSkillCards } from "../actions/skills";

const initialState = {
  skillCards: [] as TSkillCard[],
  isLoading: false,
  error: null as string | null
};

const skillCardsSlice = createSlice({
  name: 'skillCards',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSkillCards.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSkillCards.fulfilled, (state, action) => {
        state.isLoading = false;
        state.skillCards = action.payload;
      })
      .addCase(fetchSkillCards.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Ошибка загрузки";
      });
  }
});

export default skillCardsSlice.reducer;