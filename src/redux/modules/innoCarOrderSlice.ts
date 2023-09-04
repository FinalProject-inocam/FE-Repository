import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface innoCarOrderSliceType {
  type: string;
  price: number;
  trim: string;
  color: string;
}

const innoCarOrderSlice = createSlice({
  name: "innoCarOrderSlice",
  initialState: {} as any | {},
  reducers: {
    setInnocarOrderData: (
      state,
      action: PayloadAction<Partial<innoCarOrderSliceType>>
    ) => {
      return { ...state, ...action.payload };
    },
    deleteInnocarOrderData: () => {
      return {};
    },
  },
});

export const innoCarOrderReducer = innoCarOrderSlice.reducer;
export const selectInnoCarOrder = (state: any) => state.innoCarOrderReducer; // 수정
export const { setInnocarOrderData, deleteInnocarOrderData } =
  innoCarOrderSlice.actions;
