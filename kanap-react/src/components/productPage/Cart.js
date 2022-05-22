import React, { useState, useEffect } from "react";
import "../css/cart.css";

function Cart(props) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

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

  //to watch quantity onChange
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

  return (
    <>
      <div className="cart-box">
        <h1>Votre panier</h1>

        {/* selected product, display when LS is presented and data is loaded */}
        {props.selectedProducts.length > 0 &&
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
                    <p>{items.find((obj) => obj._id === i._id).price}€</p>
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
                      <p>Supprimer</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

        <div className="cart--card-of-price">
          <p>Total (0 articles) : 0.00 €</p>
        </div>

        {/* client info form */}

        <div className="cart--card-of-order">
          <form action="get">
            <div className="cart--card-of-order__question">
              <label htmlFor="firstName">Prénom: </label>
              <input type="text" name="firstName" id="firstName" required />
              <p id="firstNameErrorMsg"></p>
            </div>
            <div className="cart--card-of-order__question">
              <label htmlFor="lastName">Nom: </label>
              <input type="text" name="lastName" id="lastName" required />
              <p id="lastNameErrorMsg"></p>
            </div>
            <div className="cart--card-of-order__question">
              <label htmlFor="address">Adresse: </label>
              <input type="text" name="address" id="address" required />
              <p id="addressErrorMsg"></p>
            </div>
            <div className="cart--card-of-order__question">
              <label htmlFor="city">Ville: </label>
              <input type="text" name="city" id="city" required />
              <p id="cityErrorMsg"></p>
            </div>
            <div className="cart--card-of-order__question">
              <label htmlFor="email">Email: </label>
              <input type="text" name="email" id="email" required />
              <p id="emailErrorMsg"></p>
            </div>
            <div className="cart--card-of-order__submit">
              <input type="submit" value="Commander !" id="order" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Cart;
