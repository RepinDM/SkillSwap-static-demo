import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  convertSkillsToCards,
  convertSubcategoriesToCategoryItems,
  extractCities,
  getUserSkills,
} from "@/api/skillswap-api";
import { saveDemoLearnSkills, saveDemoTeachSkill } from "@/api/demo-data";

export const fetchSkillCards = createAsyncThunk(
  "skillCards/fetchSkillCards",
  async () => {
    const data = await getUserSkills();
    return {
      categoryItems: convertSubcategoriesToCategoryItems(data.subcategoryList),
      cities: extractCities(data.userList),
      skillCardList: convertSkillsToCards(data.userSkillList, data.userList),
      filteredSkillCardList: convertSkillsToCards(data.userSkillList, data.userList),
    };
  }
);

export const saveTeachSkill = createAsyncThunk(
  "skillCards/saveTeachSkill",
  async (
    payload: {
      title: string;
      description: string;
      categoryId: string;
      subcategoryId: string;
      images: File[];
      existingImageUrls: string[];
    },
    { dispatch, getState, rejectWithValue }
  ) => {
    try {
      const userId = (getState() as { auth: { user: { id: number } | null } }).auth.user?.id;

      if (userId === undefined) {
        return rejectWithValue("Войдите в демо-аккаунт, чтобы изменить навык");
      }

      const data = await getUserSkills();
      const result = await saveDemoTeachSkill(data, userId, payload);
      await dispatch(fetchSkillCards()).unwrap();
      return result;
    } catch {
      return rejectWithValue("Ошибка сохранения навыка");
    }
  }
);

export const saveLearnSkills = createAsyncThunk(
  "skillCards/saveLearnSkills",
  async (
    payload: {
      skills: { categoryId: string; subcategoryId: string }[];
    },
    { dispatch, getState, rejectWithValue }
  ) => {
    try {
      const userId = (getState() as { auth: { user: { id: number } | null } }).auth.user?.id;

      if (userId === undefined) {
        return rejectWithValue("Войдите в демо-аккаунт, чтобы изменить навыки");
      }

      const data = await getUserSkills();
      const result = saveDemoLearnSkills(data, userId, payload.skills);
      await dispatch(fetchSkillCards()).unwrap();
      return result;
    } catch {
      return rejectWithValue("Ошибка сохранения навыков");
    }
  }
);
