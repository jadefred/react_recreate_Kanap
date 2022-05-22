import React, { useState, useEffect } from "react";

function SelectedProduct(props) {
  const [totalPrice, setTotalPrice] = useState(0);

  //function to setTotalPrice by mapping out selected product, price times quantity, finally reduce to sum all num
  function getTotalPrice() {
    const priceOfEachItem = props.selectedProducts.map((i) => {
      return props.items.find((obj) => obj._id === i._id).price * i.quantity;
    });
    const result = priceOfEachItem.reduce((prev, current) => prev + parseInt(current), 0);
    setTotalPrice(result);
  }

  //update total quantity and total price when first render the page and whenever change of items quantity
  useEffect(() => {
    if (props.selectedProducts !== null && props.isLoaded) {
      props.setTotalQuantity(props.selectedProducts.reduce((prev, current) => prev + parseInt(current.quantity), 0));
      getTotalPrice();
    } else {
      props.setTotalQuantity(0);
    }
  }, [props.isLoaded, props.selectedProducts]);

  //onChange function to modify quantity
  function quantityChange(event, index) {
    if (event.target.value <= 0 || event.target.value > 100) {
      event.target.value = props.selectedProducts[index].quantity;
    } else {
      props.setSelectProducts((prev) => {
        const newArr = [...prev];
        newArr[index].quantity = event.target.value;
        return newArr;
      });
    }
  }

  //onClick to delete product
  function deleteProduct(index) {
    props.setSelectProducts((prev) => {
      const newArr = [...prev];
      newArr.splice(index, 1);
      return newArr;
    });
  }

  return (
    <>
      {props.selectedProducts.map((i, index) => {
        return (
          <div className="cart--card-of-product" key={i._id}>
            <div className="cart--card-of-product-img-box">
              <img
                src={props.items.find((obj) => obj._id === i._id).imageUrl}
                alt={props.items.find((obj) => obj._id === i._id).altTxt}
              />
            </div>

            <div className="cart--card-of-product-info">
              <div className="cart--card-of-product-info-description-box">
                <h2>{props.items.find((obj) => obj._id === i._id).name}</h2>
                <p>{i.color}</p>
                <p>{props.items.find((obj) => obj._id === i._id).price * i.quantity}€</p>
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

      {props.selectedProducts !== null && props.totalQuantity > 0 && (
        <div className="cart--card-of-price">
          <p>
            Total ({props.totalQuantity} articles) : {totalPrice}.00 €
          </p>
        </div>
      )}
    </>
  );
}

export default SelectedProduct;
