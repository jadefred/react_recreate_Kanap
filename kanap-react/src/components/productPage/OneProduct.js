import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../css/oneProduct.css";

function OneProduct() {
  const { id } = useParams();
  const [error, setError] = useState(null);
  const [item, setItem] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/api/products/${id}`)
      .then((res) => res.json())
      .then(
        (result) => {
          setItem(result);
        },
        (error) => {
          setError(error);
        }
      );
  }, []);

  return (
    <>
      {/* render if error is occured */}
      {error && <div>Error: {error.message}</div>}

      {item && (
        <div id="product-wrapper">
          <div id="img-box">
            <img src={item.imageUrl} alt={item.altTxt} />
          </div>
          <div id="one-product-name-box">
            <h1>{item.name}</h1>
            <p>Prix : {item.price}€</p>
          </div>
          <div id="one-product-description-box">
            <h2>Description :</h2>
            <p>{item.description}</p>
          </div>
          <div id="one-product-color-quantity-box">
            <div id="color-selection">
              <label htmlFor="color-select">Choisir une couleur : </label>
              <select name="color-select" id="colors">
                <option value="">--SVP, choisissez une couleur--</option>
                {item.colors?.map((color) => {
                  return (
                    <option value={color} key={color}>
                      {color}
                    </option>
                  );
                })}
              </select>
            </div>
            <div id="quantity-selection">
              <label htmlFor="itemQuantity">Nombre d'article(s) (1-100) :</label>
              <input type="number" name="itemQuantity" min="1" max="100" value="0" />
            </div>
          </div>
          <div id="add-to-bag-btn-box">
            <button>Ajouter au panier</button>
          </div>
        </div>
      )}
    </>
  );
}

export default OneProduct;
