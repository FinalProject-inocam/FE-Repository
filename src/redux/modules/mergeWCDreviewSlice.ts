import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const mergeWCDreviewSlice = createSlice({
	name: "mergeWCDreviewSlice",
	initialState: [] as any | [],
	reducers: {
		setMergeDate: (state, action: PayloadAction<any>) => {
			return [...state, ...action.payload];
		},
		deleteData: () => {
			return [];
		},
	},
});

export const MergeWCDreviewReducer = mergeWCDreviewSlice.reducer;
export const selectMergeWCDreview = (state: any) => state.MergeWCDreviewReducer;
export const { setMergeDate, deleteData } = mergeWCDreviewSlice.actions;
