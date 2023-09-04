import { inocamRTK } from "../api";
import {
  decodeTokenReducer,
  geoLocationReducer,
  SignupReducer,
  validiteMsgReducer,
  ChatMsgReducer,
  LocationReducer,
  ReviewFormReducer,
  ThreejsReducer,
  CommunityFormReducer,
  MergeWCDreviewReducer,
  ShopListReducer,
  LoginReducer,
  innoCarOrderReducer,
} from "../modules";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

export const store = configureStore({
  reducer: {
    decodeTokenReducer,
    geoLocationReducer,
    SignupReducer,
    validiteMsgReducer,
    ChatMsgReducer,
    LocationReducer,
    ReviewFormReducer,
    ThreejsReducer,
    CommunityFormReducer,
    MergeWCDreviewReducer,
    ShopListReducer,
    LoginReducer,
    innoCarOrderReducer,
    [inocamRTK.reducerPath]: inocamRTK.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(inocamRTK.middleware),
});

setupListeners(store.dispatch);
