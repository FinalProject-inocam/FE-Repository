import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import * as Type from "../../types";

const geoLocationSlice = createSlice({
	name: "geoLocation",
	initialState: {} as Type.UseGeolocation | {},
	reducers: {
		setGeoLocation: (_, action: PayloadAction<Type.UseGeolocation>) => {
			return action.payload;
		},
	},
});

export const geoLocationReducer = geoLocationSlice.reducer;
export const selectgeoLocation = (state: any) => state.geoLocationReducer;
export const { setGeoLocation } = geoLocationSlice.actions;
