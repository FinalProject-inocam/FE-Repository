// import * as Type from "../../types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface Shop {
	shopId: string;
	shopName: string;
}

interface ShopListState {
	shopList: Shop[];
}

const initialState: ShopListState = {
	shopList: [],
};

const shopListSlice = createSlice({
	name: "shopList",
	initialState,
	reducers: {
		setShopList: (state, action: PayloadAction<Shop[]>) => {
			state.shopList = action.payload;
		},
		mergeShopList: (state, action: PayloadAction<Shop[]>) => {
			state.shopList = [...state.shopList, ...action.payload];
		},
		deleteShopList: (state) => {
			state.shopList = [];
		},
	},
});

export const ShopListReducer = shopListSlice.reducer;
export const selectShopList = (state: any) => state.ShopListReducer;
export const { setShopList, mergeShopList, deleteShopList } = shopListSlice.actions;
