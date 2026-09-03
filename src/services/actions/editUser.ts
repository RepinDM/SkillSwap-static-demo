import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { updateDemoUser } from "@/api/demo-auth";

interface EditUserPayload {
  name?: string;
  email?: string;
  birthDate?: string;
  gender?: string;
  city?: string;
  about?: string;
  avatar?: File;
  currentPassword?: string;
  newPassword?: string;
}

export const editUser = createAsyncThunk(
  "auth/editUser",
  async (payload: EditUserPayload, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const currentUser = state.auth.user;

    if (!currentUser) {
      return rejectWithValue("Войдите в демо-аккаунт, чтобы изменить профиль");
    }

    try {
      const user = updateDemoUser({
        ...currentUser,
        name: payload.name ?? currentUser.name,
        email: payload.email ?? currentUser.email,
        birthDate: payload.birthDate ?? currentUser.birthDate,
        gender: payload.gender === "male" || payload.gender === "female"
          ? payload.gender
          : currentUser.gender,
        about: payload.about ?? currentUser.about,
        city: payload.city
          ? { ...currentUser.city, id: Number(payload.city) }
          : currentUser.city,
        avatar: payload.avatar
          ? URL.createObjectURL(payload.avatar)
          : currentUser.avatar,
      });

      return { user };
    } catch {
      return rejectWithValue("Не удалось сохранить профиль");
    }
  }
);
