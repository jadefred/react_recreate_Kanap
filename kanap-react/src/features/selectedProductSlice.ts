import { createSlice } from "@reduxjs/toolkit";
import { ILocalStorage, IProductsState } from "../assets/Interface";
import { current } from "@reduxjs/toolkit";

const initialState: ILocalStorage["selectedProducts"] | null = JSON.parse(localStorage.getItem("products")!);

export const selectedProductSlice = createSlice({
  name: "selectedProduct",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      if (!state) {
        console.log("state is null");
        state = [action.payload];
        return state;
      }

      if (state && current(state)!.length > 0) {
        console.log("am i here ???");
        return [...current(state), action.payload];
      }
    },
    addSameColorProduct: (state, action) => {
      //when user add same product more than once, modify quantity of state of products
      let newArr: IProductsState["selectedProducts"] = current(state);

      if (state) {
        for (const i of current(state)) {
          if (i._id === action.payload._id && i.color === action.payload.color) {
            //calculate the new quantity of product
            const newQuantity: number = action.payload.quantity + i.quantity;
            //create new payload
            const newPayload = { _id: action.payload._id, color: action.payload.color, quantity: newQuantity };

            //if length of state is larger than 1, remove the i element and push the payload with new quantity
            if (newArr!.length > 1) {
              newArr?.splice(newArr.indexOf(i));
              newArr?.push(newPayload);
            }
            //if state has only one element, use direcly payload as state
            else {
              newArr = [newPayload];
            }
          }
        }
      }

      console.log(newArr);
      return newArr;
    },
  },
});

export const { addProduct, addSameColorProduct } = selectedProductSlice.actions;

export default selectedProductSlice.reducer;
