// import * as Type from "../../types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface Shop {
	shopId: string;
	shopName: string;
	// other fields...
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
			console.log("123123123:", state.shopList);
		},
		deleteShopList: (state) => {
			state.shopList = [];
		},
	},
});

export const ShopListReducer = shopListSlice.reducer;
export const selectShopList = (state: any) => state.ShopListReducer;
export const { setShopList, mergeShopList, deleteShopList } = shopListSlice.actions;

/*

avgStar
:
0
isLike
:
false
latitude
:
35.2427384895787
likeCount
:
0
longitude
:
128.684218957156
rdnmAdr
:
"경상남도 창원시 의창구 사림로158번길 16-7"
reviewCount
:
0
shopId
:
"MA010120220806984598"
shopName
:
"블루핸즈사림점"

*/
