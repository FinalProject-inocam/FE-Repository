import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const mergeWCDreviewSlice = createSlice({
	name: "mergeWCDreviewSlice",
	initialState: [] as any | [],
	reducers: {
		setMergeDate: (state, action: PayloadAction<any>) => {
			console.log(state);
			return [...state, ...action.payload];
		},
	},
});

export const MergeWCDreviewReducer = mergeWCDreviewSlice.reducer;
export const selectMergeWCDreview = (state: any) => state.MergeWCDreviewReducer;
export const { setMergeDate } = mergeWCDreviewSlice.actions;
