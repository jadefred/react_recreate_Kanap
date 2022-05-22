import React, { useState, useEffect } from "react";

import "../css/cart.css";
import Form from "./cartComponents/Form";
import SelectedProduct from "./cartComponents/SelectedProduct";

function Cart(props) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);

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

  return (
    <>
      <div className="cart-box">
        <h1>Votre panier</h1>

        {/* add error block */}
        {!props.selectedProducts && <div>Votre Panier est vide</div>}

        {/* selected product, display when LS is presented and data is loaded */}
        {props.selectedProducts !== null && isLoaded && (
          <SelectedProduct
            selectedProducts={props.selectedProducts}
            setSelectProducts={props.setSelectProducts}
            items={items}
            isLoaded={isLoaded}
            totalQuantity={totalQuantity}
            setTotalQuantity={setTotalQuantity}
          />
        )}

        {/* client info form, display when LS is presented*/}
        {props.selectedProducts !== null && totalQuantity > 0 && (
          <Form
            selectedProducts={props.selectedProducts}
            setSelectProducts={props.setSelectProducts}
            totalQuantity={totalQuantity}
          />
        )}
      </div>
    </>
  );
}

export default Cart;
