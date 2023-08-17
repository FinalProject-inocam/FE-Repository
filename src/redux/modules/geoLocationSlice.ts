import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import * as Type from "../../types";

const geoLocationSlice = createSlice({
	name: "geoLocation",
	initialState: {} as Type.useGeolocation | {},
	reducers: {
		setGeoLocation: (_, action: PayloadAction<any>) => {
			console.log(action.payload);
			return action.payload;
		},
	},
});

export const geoLocationReducer = geoLocationSlice.reducer;
export const selectgeoLocation = (state: any) => state.geoLocationReducer;
export const { setGeoLocation } = geoLocationSlice.actions;
