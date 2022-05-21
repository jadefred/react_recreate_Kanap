import React from "react";
import "../css/cart.css";

function Cart() {
  return (
    <>
      <div className="cart-box">
        <h1>Votre panier</h1>

        {/* sleected product */}
        <div className="cart--card-of-product">
          <div className="cart--card-of-product-img-box">
            <img src="http://localhost:3000/images/kanap01.jpeg" alt="alt text" />
          </div>

          <div className="cart--card-of-product-info">
            <div className="cart--card-of-product-info-description-box">
              <h2>Kanap Sinopé</h2>
              <p>Green</p>
              <p>1200€</p>
            </div>

            <div className="cart--card-of-product-info-setting-box">
              <div className="cart--card-of-product-info__quantity">
                <p>Qté : </p>
                <input type="number" name="itemQuantity" min="1" max="100" value="2" />
              </div>
              <div className="cart--card-of-product-info__delete">
                <p>Supprimer</p>
              </div>
            </div>
          </div>
        </div>

        <div className="cart--card-of-price">
          <p>Total (0 articles) : 0.00 €</p>
        </div>

        {/* client info form */}

        <div className="cart--card-of-order">
          <form action="get" disable={false}>
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
