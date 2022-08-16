import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ILocalStorage, IProductsState, IAddProductPayload } from "../assets/Interface";
import { current } from "@reduxjs/toolkit";

const initialState: ILocalStorage["selectedProducts"] | null = JSON.parse(localStorage.getItem("products")!);

export const selectedProductSlice = createSlice({
  name: "selectedProduct",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<IAddProductPayload>) => {
      if (!state) {
        state = [action.payload];
        return state;
      }

      if (state && current(state)!.length > 0) {
        return [...current(state), action.payload];
      }
    },
    addSameColorProduct: (state, action: PayloadAction<IAddProductPayload>) => {
      //when user add same product more than once, modify quantity of state of products
      let newArr: IProductsState["selectedProducts"] = [];

      if (state) {
        for (const i of current(state)) {
          if (i._id === action.payload._id && i.color === action.payload.color) {
            //calculate the new quantity of product
            const newQuantity: number = action.payload.quantity + i.quantity;
            const newPayload: IAddProductPayload = {
              _id: action.payload._id,
              color: action.payload.color,
              quantity: newQuantity,
            };

            //if length of state is larger than 1, filter the repeated obj and push the newPayload to the array
            if (newArr!.length > 1) {
              newArr.filter((obj) => obj._id !== action.payload._id && obj.color !== action.payload.color);
              newArr?.push(newPayload);
            }
            //if state has only one element, use direcly payload as state
            else {
              newArr = [newPayload];
            }
          } else {
            newArr.push(i);
          }
        }
      }

      return newArr;
    },

    updateProduct: (state, action: PayloadAction<IAddProductPayload[]>) => {
      return [...action.payload];
    },
  },
});

export const { addProduct, addSameColorProduct, updateProduct } = selectedProductSlice.actions;

export default selectedProductSlice.reducer;
