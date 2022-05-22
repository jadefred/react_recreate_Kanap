import React, { useState, useEffect } from "react";

import "../css/cart.css";
import Form from "./cartComponents/Form";

function Cart(props) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  //fetch all products api
  useEffect(() => {
    const getAllProduct = async () => {
      const response = await fetch("http://localhost:3000/api/products");
      const data = await response.json();

      setItems(data);
      setIsLoaded(true);
    };
    getAllProduct().catch((e) => setError(e));
  }, []);

  //function to setTotalPrice by mapping out selected product, price times quantity, finally reduce to sum all num
  function getTotalPrice() {
    const priceOfEachItem = props.selectedProducts.map((i) => {
      return items.find((obj) => obj._id === i._id).price * i.quantity;
    });
    const result = priceOfEachItem.reduce((prev, current) => prev + parseInt(current), 0);
    setTotalPrice(result);
  }

  //update total quantity and total price when first render the page and whenever change of items quantity
  useEffect(() => {
    if (props.selectedProducts !== null && isLoaded) {
      setTotalQuantity(props.selectedProducts.reduce((prev, current) => prev + parseInt(current.quantity), 0));
      getTotalPrice();
    } else {
      setTotalQuantity(0);
    }
  }, [isLoaded, props.selectedProducts]);

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
      <div className="cart-box">
        <h1>Votre panier</h1>

        {/* add error block */}

        {!props.selectedProducts && <div>Votre Panier est vide</div>}

        {/* selected product, display when LS is presented and data is loaded */}
        {props.selectedProducts !== null &&
          isLoaded &&
          props.selectedProducts.map((i, index) => {
            return (
              <div className="cart--card-of-product" key={i._id}>
                <div className="cart--card-of-product-img-box">
                  <img
                    src={items.find((obj) => obj._id === i._id).imageUrl}
                    alt={items.find((obj) => obj._id === i._id).altTxt}
                  />
                </div>

                <div className="cart--card-of-product-info">
                  <div className="cart--card-of-product-info-description-box">
                    <h2>{i.name}</h2>
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

        <div className="cart--card-of-price">
          <p>
            Total ({totalQuantity} articles) : {totalPrice}.00 €
          </p>
        </div>

        {/* client info form */}
        {props.selectedProducts !== null && totalQuantity > 0 &&
        <Form
          selectedProducts={props.selectedProducts}
          setSelectProducts={props.setSelectProducts}
          totalQuantity={totalQuantity}
        />}
      </div>
    </>
  );
}

export default Cart;
