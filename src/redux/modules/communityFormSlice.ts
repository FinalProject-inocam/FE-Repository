import { PayloadAction, createSlice } from "@reduxjs/toolkit";


const communityFormSlice = createSlice({
	name: "communityFormSlice",
	initialState : {} as any,
	reducers: {
		setCommunityDate: (state, action: PayloadAction<any>) => {
			console.log({...state, ...action.payload})
			return { ...state, ...action.payload };
		},
		deleteCommunityDate: () => {
			return { revisit: 0, review: "" };
		},
	},
});

export const CommunityFormReducer = communityFormSlice.reducer;
export const selectCommunityFormReducer = (state: { CommunityFormReducer: any }) => state.CommunityFormReducer;
export const { setCommunityDate, deleteCommunityDate } = communityFormSlice.actions;
