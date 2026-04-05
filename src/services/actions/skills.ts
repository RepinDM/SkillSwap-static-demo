import { convertSkillsToCards, convertSubcategoriesToCategoryItems, getUserSkills } from "@/api/skillswap-api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchSkillCards = createAsyncThunk(
  "skillCards/fetchSkillCards",
  async () => {
    const data = await getUserSkills();

    const skillCardList = convertSkillsToCards(
      data.userSkillList,
      data.userList
    );

    const categoryItems = convertSubcategoriesToCategoryItems(
      data.subcategoryList
    );

    return {
      categoryItems: categoryItems,
      skillCardList: skillCardList,
      filteredSkillCardList: skillCardList,
    };
  }
);