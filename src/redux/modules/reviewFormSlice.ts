import * as Type from "../../types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: Partial<Type.ReviewSliceType> = {
	revisit: 0,
	review: "",
};

const reviewFormSlice = createSlice({
	name: "reviewFormSlice",
	initialState,
	reducers: {
		setReviewDate: (state, action: PayloadAction<Partial<Type.ReviewSliceType>>) => {
			return { ...state, ...action.payload };
		},
		deleteReiewDate: () => {
			return { revisit: 0, review: "" };
		},
	},
});

export const ReviewFormReducer = reviewFormSlice.reducer;
export const selectReviewForm = (state: { ReviewFormReducer: Type.ReviewSliceType }) => state.ReviewFormReducer;
export const selectReviewFormStar = (state: { ReviewFormReducer: Type.ReviewSliceType }) =>
	state.ReviewFormReducer.star;
export const selectReviewFormRevisit = (state: { ReviewFormReducer: Type.ReviewSliceType }) =>
	state.ReviewFormReducer.revisit;
export const selectReviewFormReview = (state: { ReviewFormReducer: Type.ReviewSliceType }) =>
	state.ReviewFormReducer.review;
export const { setReviewDate, deleteReiewDate } = reviewFormSlice.actions;
