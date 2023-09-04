import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const mergeWCDreviewSlice = createSlice({
	name: "mergeWCDreviewSlice",
	initialState: [] as any | [],
	reducers: {
		setMergeDate: (state, action: PayloadAction<any>) => {
			// 새로운 댓글 데이터
			const newComments = action.payload;
			// 기존 댓글과 새로운 댓글을 합친 후, 고유한 댓글만 남김
			const uniqueComments = Array.from(new Set([...state, ...newComments].map((s) => s.reviewId))).map((id) =>
				[...state, ...newComments].find((s) => s.reviewId === id)
			);
			return uniqueComments;
		},
		deleteData: () => {
			return [];
		},
	},
});

export const MergeWCDreviewReducer = mergeWCDreviewSlice.reducer;
export const selectMergeWCDreview = (state: any) => state.MergeWCDreviewReducer;
export const { setMergeDate, deleteData } = mergeWCDreviewSlice.actions;

/*
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const mergeWCDreviewSlice = createSlice({
	name: "mergeWCDreviewSlice",
	initialState: [] as any | [],
	reducers: {
		setMergeDate: (state, action: PayloadAction<any>) => {
			// 새로운 댓글 데이터
			const newComments = action.payload;
			// 기존 댓글과 새로운 댓글을 합친 후, 고유한 댓글만 남김
			const uniqueComments = Array.from(new Set([...state, ...newComments].map((s) => s.reviewId))).map((id) =>
				[...state, ...newComments].find((s) => s.reviewId === id)
			);
			return uniqueComments;
		},
		deleteData: () => {
			return [];
		},
	},
});

export const MergeWCDreviewReducer = mergeWCDreviewSlice.reducer;
export const selectMergeWCDreview = (state: any) => state.MergeWCDreviewReducer;
export const { setMergeDate, deleteData } = mergeWCDreviewSlice.actions;

*/
