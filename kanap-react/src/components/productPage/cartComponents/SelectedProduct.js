import React, { useState, useEffect, useCallback } from "react";

function SelectedProduct({ selectedProducts, setSelectProducts, items, isLoaded, totalQuantity, setTotalQuantity }) {
  const [totalPrice, setTotalPrice] = useState(0);

  //function to setTotalPrice by mapping out selected product, price times quantity, finally reduce to sum all num
  const getTotalPrice = useCallback(() => {
    const priceOfEachItem = selectedProducts.map((i) => {
      return items.find((obj) => obj._id === i._id).price * i.quantity;
    });
    const result = priceOfEachItem.reduce((prev, current) => prev + parseInt(current), 0);
    setTotalPrice(result);
  }, [items, selectedProducts]);

  //update total quantity and total price when first render the page and whenever change of items quantity
  useEffect(() => {
    if (selectedProducts !== null && isLoaded) {
      setTotalQuantity(selectedProducts.reduce((prev, current) => prev + parseInt(current.quantity), 0));
      getTotalPrice();
    } else {
      setTotalQuantity(0);
    }
  }, [isLoaded, selectedProducts, getTotalPrice, setTotalQuantity]);

  //onChange function to modify quantity
  function quantityChange(event, index) {
    if (event.target.value <= 0 || event.target.value > 100) {
      event.target.value = selectedProducts[index].quantity;
    } else {
      setSelectProducts((prev) => {
        const newArr = [...prev];
        newArr[index].quantity = event.target.value;
        return newArr;
      });
    }
  }

  //onClick to delete product
  function deleteProduct(index) {
    setSelectProducts((prev) => {
      const newArr = [...prev];
      newArr.splice(index, 1);
      return newArr;
    });
  }

  return (
    <>
      {selectedProducts.map((i, index) => {
        return (
          <div className="cart--card-of-product" key={i._id}>
            <div className="cart--card-of-product-img-box">
              <img src={items.find((obj) => obj._id === i._id).imageUrl} alt={items.find((obj) => obj._id === i._id).altTxt} />
            </div>

            <div className="cart--card-of-product-info">
              <div className="cart--card-of-product-info-description-box">
                <h2>{items.find((obj) => obj._id === i._id).name}</h2>
                <p>{i.color}</p>
                <p>{items.find((obj) => obj._id === i._id).price * i.quantity}€</p>
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
}

export default SelectedProduct;
