import { convertSkillsToCards, getUserSkills } from "@/api/skillswap-api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchSkillCards = createAsyncThunk(
  "skillCards/fetchSkillCards",
  async () => {
    const data = await getUserSkills();
    return convertSkillsToCards(data.userSkillList, data.userList);
  }
);