import { PayloadAction, createSlice } from "@reduxjs/toolkit";


const threejsSlice = createSlice({
  name: "ThreejsSlice",
  initialState: {} as any | {},
  reducers: {
    setThreejs: (_, action: PayloadAction<any>) => {
      return {...action.payload}
    },
  },
});

export const ThreejsReducer = threejsSlice.reducer;
export const selectThreejs = (state: any) => state.ThreejsReducer;
export const { setThreejs } = threejsSlice.actions;
