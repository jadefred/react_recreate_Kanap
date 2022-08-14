import { createSlice } from "@reduxjs/toolkit";
import { ILocalStorage } from "../assets/Interface";

const initialState: ILocalStorage["selectedProducts"] | null = JSON.parse(localStorage.getItem("products")!);

export const selectedProductSlice = createSlice({
  name: "selectedProduct",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state?.push(action.payload);
    },
  },
});

export const { addProduct } = selectedProductSlice.actions;

export default selectedProductSlice.reducer;
