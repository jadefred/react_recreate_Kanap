import { configureStore } from "@reduxjs/toolkit";
import selectedProductReducer from "../features/selectedProductSlice";

export const store = configureStore({
  reducer: {
    selectedProduct: selectedProductReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
