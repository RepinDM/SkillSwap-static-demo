import { loginDemoUser } from "@/api/demo-auth";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      return loginDemoUser(email, password);
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Не удалось войти",
      );
    }
  }
);
