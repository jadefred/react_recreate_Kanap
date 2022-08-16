import React, { useState, useEffect, useCallback, FC } from "react";
import { IData, IProductsState, IAddProductPayload } from "../../../assets/Interface";
//redux
import { useDispatch } from "react-redux";
import { useSelector, RootState } from "../../../app/store";
import { updateProduct } from "../../../features/selectedProductSlice";

interface Props {
  selectedProducts: IProductsState["selectedProducts"];
  setSelectProducts: IProductsState["setSelectProducts"];
  items: IData[];
  isLoaded: boolean;
  totalQuantity: number;
  setTotalQuantity: React.Dispatch<React.SetStateAction<number>>;
}

const SelectedProduct: FC<Props> = ({
  selectedProducts,
  setSelectProducts,
  items,
  isLoaded,
  totalQuantity,
  setTotalQuantity,
}) => {
  const [totalPrice, setTotalPrice] = useState<number>(0);

  //redux
  const testSelectedProduct = useSelector((state: RootState) => state.selectedProduct);
  const dispatch = useDispatch();

  //function to setTotalPrice by mapping out selected product, price times quantity, finally reduce to sum all num
  const getTotalPrice = useCallback(() => {
    const priceOfEachItem = testSelectedProduct?.map((i) => {
      return items.find((obj) => obj._id === i._id)!.price * i.quantity;
    });
    const result = priceOfEachItem!.reduce((prev, current) => prev + current, 0);
    setTotalPrice(result);
  }, [items, testSelectedProduct]);

  //update total quantity and total price when first render the page and whenever change of items quantity
  useEffect(() => {
    if (testSelectedProduct && isLoaded) {
      setTotalQuantity(testSelectedProduct.reduce((prev, current) => prev + current.quantity, 0));
      getTotalPrice();
    } else {
      setTotalQuantity(0);
    }
  }, [isLoaded, getTotalPrice, setTotalQuantity, testSelectedProduct]);

  //onChange function to modify quantity
  function quantityChange(event: React.ChangeEvent<HTMLInputElement>, index: number) {
    let targetNumber = parseInt(event.target.value);
    if (targetNumber <= 0 || targetNumber > 100) {
      targetNumber = testSelectedProduct![index].quantity;
    } else {
      //copy obj of product which will be modified and assign with new quantity
      const objToBeModify = testSelectedProduct![index];

      //if the state has more than one object in the array
      //use for loop to filter the irrelevant obj and push to empty job
      if (testSelectedProduct!.length > 1) {
        let newArr: IAddProductPayload[] = [];
        if (testSelectedProduct) {
          for (const i of testSelectedProduct) {
            if (i._id === objToBeModify._id && i.color === objToBeModify.color) {
              newArr.push({ _id: i._id, color: i.color, quantity: targetNumber });
            } else {
              newArr.push(i);
            }
          }
        }
        dispatch(updateProduct(newArr));
      }
      //state has only one object, directly assign with new value
      else {
        const newQuantityObj = { _id: objToBeModify._id, color: objToBeModify.color, quantity: targetNumber };
        dispatch(updateProduct([newQuantityObj]));
      }
    }
  }

  //onClick to delete product
  function deleteProduct(index: number) {
    //if state has only one element, set state to empty array
    if (testSelectedProduct!.length === 1) {
      dispatch(updateProduct([]));
    }
    //create an empty array and loop through all element and push to array
    //except the element which meant to be delete
    else {
      let newArr: IAddProductPayload[] = [];
      for (let i = 0; i < testSelectedProduct!.length; i++) {
        if (i !== index) {
          newArr.push(testSelectedProduct![i]);
        }
        dispatch(updateProduct(newArr));
      }
    }
  }

  return (
    <>
      {testSelectedProduct?.map((i, index) => {
        return (
          <div className="cart--card-of-product" key={`${i._id}-${i.color}`}>
            <div className="cart--card-of-product-img-box">
              <img src={items.find((obj) => obj._id === i._id)?.imageUrl} alt={items.find((obj) => obj._id === i._id)?.altTxt} />
            </div>

            <div className="cart--card-of-product-info">
              <div className="cart--card-of-product-info-description-box">
                <h2>{items.find((obj) => obj._id === i._id)?.name}</h2>
                <p>{i.color}</p>
                <p>{items.find((obj) => obj._id === i._id)!.price * i.quantity}€</p>
              </div>

              <div className="cart--card-of-product-info-setting-box">
                <div className="cart--card-of-product-info__quantity">
                  <p>Qté : </p>
                  <input
                    onChange={(event) => quantityChange(event, index)}
                    type="number"
                    name="itemQuantity"
                    min="1"
                    max="100"
                    value={i.quantity}
                    required
                  />
                </div>
                <div className="cart--card-of-product-info__delete">
                  <p onClick={() => deleteProduct(index)}>Supprimer</p>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {testSelectedProduct !== null && totalQuantity > 0 && (
        <div className="cart--card-of-price">
          <p>
            Total ({totalQuantity} articles) : {totalPrice}.00 €
          </p>
        </div>
      )}
    </>
  );
};

export default SelectedProduct;
