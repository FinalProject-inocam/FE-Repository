import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface InnoCarOrderSliceType {
  type: string;
  price: number;
  trim: string;
  color: string;
  gender: string;
  phoneNumber: string;
  usage: string;
  zoneNo: string;
  addressName: string;
  alarm: boolean;
  content: string;
}

const innoCarOrderSlice = createSlice({
  name: "innoCarOrderSlice",
  initialState: {} as any | {},
  reducers: {
    setInnocarOrderData: (
      state,
      action: PayloadAction<Partial<InnoCarOrderSliceType>>
    ) => {
      return { ...state, ...action.payload };
    },
    deleteInnocarOrderData: () => {
      return {};
    },
  },
});

export const innoCarOrderReducer = innoCarOrderSlice.reducer;
export const selectInnoCarOrder = (state: any) => state.innoCarOrderReducer;
export const { setInnocarOrderData, deleteInnocarOrderData } =
  innoCarOrderSlice.actions;
