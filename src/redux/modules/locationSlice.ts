import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const locationSlice = createSlice({
  name: "locationSlice",
  initialState: "" as string,
  reducers: {
    setLocationState: (_, action: PayloadAction<any>) => {
      return action.payload;
    },
    deleteLocation: () => {
      return "";
    },
  },
});

export const LocationReducer = locationSlice.reducer;
export const selectLocation = (state: any) => state.LocationReducer;
export const { setLocationState, deleteLocation } = locationSlice.actions;
