import { API_URL } from "@/api/config";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(
        `${API_URL}/login/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(
          data.error || "Неверный email или пароль"
        );
      }

      return {
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        user: data.user,
      };

    } catch {
      return rejectWithValue("Ошибка сети");
    }
  }
);
