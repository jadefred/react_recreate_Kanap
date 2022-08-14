import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("products"));

export const selectedProductSlice = createSlice({
  name: "selectedProduct",
  initialState,
  reducer: {},
});
