import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const reviewFormSlice = createSlice({
	name: "reviewFormSlice",
	initialState: {
		revisit: 0,
		review: "",
	} as any | {},
	reducers: {
		setReviewDate: (state, action: PayloadAction<Partial<any>>) => {
			return { ...state, ...action.payload };
		},
		deleteReiewDate: () => {
			return { revisit: 0, review: "" };
		},
	},
});

export const ReviewFormReducer = reviewFormSlice.reducer;
export const selectReviewForm = (state: any) => state.ReviewFormReducer;
export const selectReviewFormStar = (state: any) => state.ReviewFormReducer.star;
export const selectReviewFormRevisit = (state: any) => state.ReviewFormReducer.revisit;
export const selectReviewFormReview = (state: any) => state.ReviewFormReducer.review;
export const { setReviewDate, deleteReiewDate } = reviewFormSlice.actions;
