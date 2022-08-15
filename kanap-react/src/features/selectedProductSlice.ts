import { createSlice } from "@reduxjs/toolkit";
import { ILocalStorage, IProductsState } from "../assets/Interface";
import { current } from "@reduxjs/toolkit";

const initialState: ILocalStorage["selectedProducts"] | null = JSON.parse(localStorage.getItem("products")!);

export const selectedProductSlice = createSlice({
  name: "selectedProduct",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state = [action.payload];
      return state;
    },
    addSameColorProduct: (state, action) => {
      let newArr: IProductsState["selectedProducts"] = [];

      if (state) {
        for (const i of current(state)) {
          if (i._id === action.payload._id && i.color === action.payload.color) {
            let num = i.quantity + action.payload.quantity;
            i.quantity = num;
          }
          newArr.push(i);
        }
      }
      return newArr;
    },
  },
});

export const { addProduct, addSameColorProduct } = selectedProductSlice.actions;

export default selectedProductSlice.reducer;
