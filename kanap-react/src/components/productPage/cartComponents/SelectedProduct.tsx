import React, { useState, useEffect, useCallback, FC } from "react";
import { IData, ILocalStorage } from "../../../assets/Interface";

interface Props {
  selectedProducts: ILocalStorage["selectedProducts"];
  setSelectProducts(
    selectedProducts: {
      _id: string;
      quantity: number;
      color: string;
    }[]
  ): void;
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

  //function to setTotalPrice by mapping out selected product, price times quantity, finally reduce to sum all num
  const getTotalPrice = useCallback(() => {
    const priceOfEachItem = selectedProducts?.map((i) => {
      return items.find((obj) => obj._id === i._id)!.price * i.quantity;
    });
    const result = priceOfEachItem!.reduce((prev, current) => prev + current, 0);
    setTotalPrice(result);
  }, [items, selectedProducts]);

  //update total quantity and total price when first render the page and whenever change of items quantity
  useEffect(() => {
    if (selectedProducts !== null && isLoaded) {
      setTotalQuantity(selectedProducts.reduce((prev, current) => prev + current.quantity, 0));
      getTotalPrice();
    } else {
      setTotalQuantity(0);
    }
  }, [isLoaded, selectedProducts, getTotalPrice, setTotalQuantity]);

  //onChange function to modify quantity
  function quantityChange(event: React.ChangeEvent<HTMLInputElement>, index: number) {
    let targetNumber = parseInt(event.target.value);
    if (targetNumber <= 0 || targetNumber > 100) {
      targetNumber = selectedProducts![index].quantity;
    } else {
      let newArr = selectedProducts;
      newArr![index].quantity = targetNumber;
      setSelectProducts(newArr!);
    }
  }

  //onClick to delete product
  function deleteProduct(index: number) {
    console.log("to delete");
    const newArr = selectedProducts;
    newArr?.splice(index, 1);
    if (newArr) setSelectProducts(newArr);

    console.log("reached the end");
  }

  return (
    <>
      {selectedProducts?.map((i, index) => {
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

      {selectedProducts !== null && totalQuantity > 0 && (
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
