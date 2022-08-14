import { configureStore } from "@reduxjs/toolkit";
import selectedProductReducer from "../features/selectedProductSlice";
import { useSelector as rawUseSelector, TypedUseSelectorHook } from "react-redux";

export const store = configureStore({
  reducer: {
    selectedProduct: selectedProductReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useSelector: TypedUseSelectorHook<RootState> = rawUseSelector;
