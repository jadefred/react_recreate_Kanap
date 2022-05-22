import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../css/oneProduct.css";

function OneProduct(props) {
  const { id } = useParams();
  const [error, setError] = useState(null);
  const [item, setItem] = useState([]);
  const [quantity, setQuantity] = useState("");
  const [color, setColor] = useState("");
  const [missingColor, setMissingColor] = useState(false);
  const [missingQuantity, setMissingQuantity] = useState(false);

  useEffect(() => {
    const getOneProduct = async () => {
      const response = await fetch(`http://localhost:3000/api/products/${id}`);
      const data = await response.json();

      setItem(data);
    };

    getOneProduct().catch((e) => setError(e));
  }, []);

  //pop warning message when the color / quantity is not correct, hide it when client modify them
  useEffect(() => {
    setMissingColor(false);
  }, [color]);

  useEffect(() => {
    setMissingQuantity(false);
  }, [quantity]);

  function getQuantity(e) {
    setQuantity(e.target.value);
  }

  function getColor(e) {
    setColor(e.target.value);
  }

  //add to cart function
  function addToCart(e) {
    e.preventDefault();
    //check if quantity and color is correct input
    if (quantity > 0 && quantity <= 100 && color) {
      //if in LS has no product, update props.setState directly in order to update LS
      if (!props.selectedProducts) {
        props.setSelectProducts([{ _id: id, quantity: quantity, color: color }]);
      } //check if existing array in LS, if there any repeated product with same color
      else if (props.selectedProducts.some((i) => i._id === id && i.color === color)) {
        //create new array to handle change of state, then modify quantity accordingly, then update setState
        let newArr = [];
        for (const i of props.selectedProducts) {
          if (i._id === id && i.color === color) {
            let num = parseInt(i.quantity) + parseInt(quantity);
            i.quantity = num.toString();
          }
          newArr.push(i);
        }
        props.setSelectProducts(newArr);
      } //if no product is repeated, add new selected product to existing LS array
      else {
        props.setSelectProducts((prev) => [...prev, { _id: id, quantity: quantity, color: color }]);
      }
    } // if color or quantity is incorrect, pop warning message
    else {
      if (!color) {
        setMissingColor(true);
      }
      if (quantity <= 0 || quantity > 100 || !quantity) {
        setMissingQuantity(true);
      }
    }
  }

  return (
    <>
      {/* render if error is occured */}
      {error && <div>Error: {error.message}</div>}

      {item && (
        <div className="product-wrapper">
          <div className="img-box">
            <img src={item.imageUrl} alt={item.altTxt} />
          </div>
          <div className="one-product-name-box">
            <h1>{item.name}</h1>
            <p>Prix : {item.price}€</p>
          </div>
          <div className="one-product-description-box">
            <h2>Description :</h2>
            <p>{item.description}</p>
          </div>
          <div className="one-product-color-quantity-box">
            <div className="color-selection">
              <label htmlFor="color-select">Choisir une couleur : </label>
              <select name="color-select" id="colors" onChange={getColor}>
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
            <div className="quantity-selection">
              <label htmlFor="itemQuantity">Nombre d'article(s) (1-100) :</label>
              <input
                type="number"
                name="itemQuantity"
                placeholder="0"
                min="1"
                max="100"
                value={quantity}
                onChange={getQuantity}
              />
            </div>
          </div>
          <div className="add-to-bag-btn-box">
            <button onClick={addToCart}>Ajouter au panier</button>
          </div>
          {/* warning message appear only when input is incorrect and client want to submit */}
          <div className="warning-msg-product">
            {missingColor && <p>Choisissez une couleur</p>}
            {missingQuantity && <p>La quantité est incorrecte</p>}
          </div>
        </div>
      )}
    </>
  );
}

export default OneProduct;
