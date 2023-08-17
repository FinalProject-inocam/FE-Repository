import { inocamRTK } from "../api";
import { decodeTokenReducer, geoLocationReducer } from "../modules";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

export const store = configureStore({
	reducer: {
		decodeTokenReducer,
		geoLocationReducer,
		[inocamRTK.reducerPath]: inocamRTK.reducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(inocamRTK.middleware),
});

setupListeners(store.dispatch);
