import { createSlice } from "@reduxjs/toolkit";

const initialState = [JSON.parse(localStorage.getItem("products"))];

export const selectedProductSlice = createSlice({
  name: "selectedProduct",
  initialState,
  reducer: {
    addProduct: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const {addProduct} = selectedProductSlice.action

export default selectedProductSlice.reducer
