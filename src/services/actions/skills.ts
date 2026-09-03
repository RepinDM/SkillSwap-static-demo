import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  convertSkillsToCards,
  convertSubcategoriesToCategoryItems,
  extractCities,
  getUserSkills,
} from "@/api/skillswap-api";
import { updateUserSkills } from "@/api/update-data-profile-api";

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
      // текущие learn-навыки чтобы не потерять их
      currentLearnSkills: { subcategoryId: string }[];
    },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const formData = new FormData();
      formData.append("skillName", payload.title);
      formData.append("description", payload.description);
      formData.append("categoryId", payload.categoryId);
      formData.append("skillSubcategoryId", payload.subcategoryId);

      // Новые файлы
      payload.images.forEach((img) => formData.append("images", img));

      // Существующие URL картинок — бэкенд их пока игнорирует,
      // но передаём на будущее
      payload.existingImageUrls.forEach((url) =>
        formData.append("existingTeachSkillImages", url)
      );

      // Передаём текущие learn-навыки чтобы бэкенд их не удалил
      payload.currentLearnSkills.forEach((s) =>
        formData.append("learningSubcategoryIds", s.subcategoryId)
      );

      const result = await updateUserSkills(formData);
      dispatch(fetchSkillCards());
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
      // текущий teach-навык чтобы не потерять его
      currentTeachSkill: {
        title: string;
        description: string;
        subcategoryId: string;
        imageUrls: string[];
      };
    },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const formData = new FormData();
      
      // Передаём teach как есть
      formData.append("skillName", payload.currentTeachSkill.title);
      formData.append("description", payload.currentTeachSkill.description);
      formData.append("skillSubcategoryId", payload.currentTeachSkill.subcategoryId);
      payload.currentTeachSkill.imageUrls.forEach((url) =>
        formData.append("existingTeachSkillImages", url)
      );

      // Новые learn-навыки
      payload.skills.forEach((s) =>
        formData.append("learningSubcategoryIds", s.subcategoryId)
      );

      const result = await updateUserSkills(formData);
      dispatch(fetchSkillCards());
      return result;
    } catch {
      return rejectWithValue("Ошибка сохранения навыков");
    }
  }
);
