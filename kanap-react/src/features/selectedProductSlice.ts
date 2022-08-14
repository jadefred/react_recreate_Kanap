import { createSlice } from "@reduxjs/toolkit";
import { ILocalStorage } from "../assets/Interface";

const initialState: ILocalStorage["selectedProducts"] | null = JSON.parse(localStorage.getItem("products")!);

export const selectedProductSlice = createSlice({
  name: "selectedProduct",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      if (!state) {
        state = [action.payload];
        console.log("state was null", state);
      } else {
        state?.push(action.payload);
        console.log("state was not null", state);
      }
    },
  },
});

export const { addProduct } = selectedProductSlice.actions;

export default selectedProductSlice.reducer;
