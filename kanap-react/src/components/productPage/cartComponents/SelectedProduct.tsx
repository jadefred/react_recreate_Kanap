import React, { useState, useEffect, useCallback, FC } from "react";
import { IData, IProductsState } from "../../../assets/Interface";
//redux
import { useDispatch } from "react-redux";
import { useSelector, RootState } from "../../../app/store";
import { updateProductQuantity, deleteProductReducer } from "../../../features/selectedProductSlice";

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
      dispatch(updateProductQuantity({ targetNumber, index }));
    }
  }

  //onClick to delete product
  function deleteProduct(index: number) {
    dispatch(deleteProductReducer(index));
  }

  return (
    <>
      {testSelectedProduct?.map((i, index) => {
        return (
          <div className="cart--card-of-product" key={i._id}>
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
