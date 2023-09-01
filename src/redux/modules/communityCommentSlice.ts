import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import * as Type from "../../types";

const communityCommentSlice = createSlice({
	name: "communityCommentSlice",
	initialState: [] as any,
	reducers: {
		setCommentData: (state, action: PayloadAction<Type.CommunityComments[]>) => {
			console.log(action.payload);
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
