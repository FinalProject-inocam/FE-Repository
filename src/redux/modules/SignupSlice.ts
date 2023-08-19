import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface SignupSliceType {
  email: string;
  nickname: string;
  password: string;
  phonNumber: string;
  gender: string;
  birthdate: string;
}

const SignupSlice = createSlice({
  name: "SignupSlice",
  initialState: {} as any | {},
  reducers: {
    setSignupDate: (state, action: PayloadAction<Partial<SignupSliceType>>) => {
      return { ...state, ...action.payload };
    },
    deleteSignupDate: () => {
      return {};
    },
  },
});

export const SignupReducer = SignupSlice.reducer;
export const selectSignup = (state: any) => state.SignupReducer;
export const selectSignupP = (state: any) => state.SignupReducer.password;
export const { setSignupDate, deleteSignupDate } = SignupSlice.actions;
