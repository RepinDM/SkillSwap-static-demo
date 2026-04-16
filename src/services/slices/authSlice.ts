import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { loginUser } from "../actions/login";
import type { TUserAuth } from "@/entities/user/types";
import { editUser } from "../actions/editUser";

interface AuthState {
  user: TUserAuth | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Читаем токен из localStorage при старте
const accessToken = localStorage.getItem("accessToken");
const userRaw = localStorage.getItem("user");
const savedUser = userRaw ? (JSON.parse(userRaw) as TUserAuth) : null;

const initialState: AuthState = {
  user: savedUser,
  accessToken,
  refreshToken: localStorage.getItem("refreshToken"),
  isAuthenticated: !!accessToken,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
    },
    clearAuthError(state) {
      state.error = null;
    },
    updateAccessToken(state, action: PayloadAction<string>) {
      state.accessToken = action.payload;
    },
    setAuthData(state, action: PayloadAction<{ accessToken: string; refreshToken: string; user: TUserAuth }>) {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true;
      state.error = null;
      localStorage.setItem("accessToken", action.payload.accessToken);
      localStorage.setItem("refreshToken", action.payload.refreshToken);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
  },
  extraReducers: (builder) => {
    builder
        .addCase(loginUser.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            console.log("LOGIN SUCCESS", action.payload);

            state.isLoading = false;
            state.user = action.payload.user;
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            state.isAuthenticated = true;

            localStorage.setItem("accessToken", action.payload.accessToken);
            localStorage.setItem("refreshToken", action.payload.refreshToken);
            localStorage.setItem("user", JSON.stringify(action.payload.user));
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
        })

        .addCase(editUser.fulfilled, (state, action) => {
          state.user = action.payload.user ?? action.payload;
          state.isLoading = false;
          state.error = null;
          localStorage.setItem("user", JSON.stringify(state.user));

          const freshToken = localStorage.getItem("accessToken");
          if (freshToken) state.accessToken = freshToken;
        })
        .addCase(editUser.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
        .addCase(editUser.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.payload as string || "Ошибка обновления";
        })
  },
  selectors: {
    selectUser: (state) => state.user,
    selectIsAuthenticated: (state) => state.isAuthenticated,
    selectAuthIsLoading: (state) => state.isLoading,
    selectAuthError: (state) => state.error,
  },
});

export const { logout, clearAuthError, setAuthData } = authSlice.actions;
export const {
  selectUser,
  selectIsAuthenticated,
  selectAuthIsLoading,
  selectAuthError,
} = authSlice.selectors;
export default authSlice.reducer;
