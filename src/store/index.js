import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import nftReducer from "./nftSlice";

const reducer = combineReducers({
  nft: nftReducer,
});

export const store = configureStore({
  reducer,
});
