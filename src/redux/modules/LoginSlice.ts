import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface LoginSliceType {
  email: string;
  password: string;
}

const LoginSlice = createSlice({
  name: "LoginSlice",
  initialState: {} as any | {},
  reducers: {
    setLoginDate: (state, action: PayloadAction<Partial<LoginSliceType>>) => {
      return { ...state, ...action.payload };
    },
    deleteLoginDate: () => {
      return {};
    },
  },
});

export const LoginReducer = LoginSlice.reducer;
export const selectLogin = (state: any) => state.LoginReducer;
export const { setLoginDate, deleteLoginDate } = LoginSlice.actions;
