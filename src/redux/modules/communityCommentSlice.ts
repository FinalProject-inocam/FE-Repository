import { createSlice } from "@reduxjs/toolkit"; //PayloadAction
// import * as Type from "../../types";

const communityCommentSlice = createSlice({
	name: "communityCommentSlice",
	initialState: [] as any,
	reducers: {
		// setCommentData: (state, action: PayloadAction<Type.CommunityComments[]>) => {
			setCommentData: (state) => {
			return state;
		},
		deleteCommentData: (state) => {
			state.content = [];
			return;
		},
	},
});

export const CommunityCommentReducer = communityCommentSlice.reducer;
export const selectMergeCommunityComment = (state: any) => state.CommunityCommentReducer;
export const { setCommentData, deleteCommentData } = communityCommentSlice.actions;
