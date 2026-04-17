// store/registerSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface RegisterState {
  step1: {
    email: string;
    password: string;
  } | null;

  step2: {
    name: string;
    birthDate: string;
    gender: string;
    cityId: string;
    learnSkills: { categoryId: string; subcategoryId: string }[];
    avatar?: File | null;
    about?: string;
  } | null;

  step3: {
    skillName: string;
    categoryId: string;
    subcategoryId: string;
    description: string;
    images: File[];
  } | null;
}

const initialState: RegisterState = {
  step1: null,
  step2: null,
  step3: null,
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    setStep1(state, action: PayloadAction<RegisterState["step1"]>) {
      state.step1 = action.payload;
    },
    setStep2(state, action: PayloadAction<RegisterState["step2"]>) {
      state.step2 = action.payload;
    },
    setStep3(state, action: PayloadAction<RegisterState["step3"]>) {
      state.step3 = action.payload;
    },
    clearRegister() {
      return initialState;
    },
  },

  selectors: {
        selectStep1: (state) => state.step1,
        selectStep2: (state) => state.step2,
        selectStep3: (state) => state.step3
    },
});

export const { setStep1, setStep2, setStep3, clearRegister } =
  registerSlice.actions;

  export const { selectStep1, selectStep2, selectStep3 } =
  registerSlice.selectors;

export default registerSlice.reducer;