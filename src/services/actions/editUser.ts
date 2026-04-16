import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { API_URL } from "@/api/config";
import { fetchWithRefresh } from "@/api/fetchWithRefresh";

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
    const token = state.auth.accessToken;

    const formData = new FormData();

    if (payload.name) formData.append("name", payload.name);
    if (payload.email) formData.append("email", payload.email);
    if (payload.birthDate) formData.append("birthDate", payload.birthDate);
    if (payload.gender) formData.append("gender", payload.gender);
    if (payload.city) formData.append("city", payload.city);
    if (payload.about !== undefined) formData.append("about", payload.about);
    if (payload.avatar) formData.append("avatar", payload.avatar);
    if (payload.currentPassword) formData.append("currentPassword", payload.currentPassword);
    if (payload.newPassword) formData.append("newPassword", payload.newPassword);

    try {
      const response = await fetchWithRefresh(`${API_URL}edit_user/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data);
      }

      return data;
    } catch {
      return rejectWithValue("Ошибка сети");
    }
  }
);