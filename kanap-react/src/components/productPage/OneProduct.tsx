import React, { useState, useEffect, FC } from "react";
import { useParams } from "react-router-dom";
import "../css/oneProduct.css";
import { IData, IProductsState } from "../../assets/Interface";
import { useDispatch } from "react-redux";
import { useSelector, RootState } from "../../app/store";
import { addProduct, addSameColorProduct } from "../../features/selectedProductSlice";

const OneProduct: FC<IProductsState> = ({ selectedProducts, setSelectProducts }) => {
  const { id } = useParams<string>();
  const [error, setError] = useState<boolean | null>(null);
  const [item, setItem] = useState<IData>();
  const [quantity, setQuantity] = useState<number>(0);
  const [color, setColor] = useState<string>("");
  const [missingColor, setMissingColor] = useState<boolean>(false);
  const [missingQuantity, setMissingQuantity] = useState<boolean>(false);

  //test redux
  const testSelectedProduct = useSelector((state: RootState) => state.selectedProduct);
  const dispatch = useDispatch();

  useEffect(() => {
    const getOneProduct = async () => {
      const response = await fetch(`http://localhost:3000/api/products/${id}`);
      const data = await response.json();

      setItem(data);

      if (!response.ok) {
        setError(true);
      }
    };

    getOneProduct().catch((e) => setError(e));
  }, [id]);

  //pop warning message when the color / quantity is not correct, hide it when client modify them
  useEffect(() => {
    setMissingColor(false);
  }, [color]);

  useEffect(() => {
    setMissingQuantity(false);
  }, [quantity]);

  function getQuantity(e: React.ChangeEvent<HTMLInputElement>) {
    setQuantity(parseInt(e.target.value));
  }

  function getColor(e: { target: { value: React.SetStateAction<string> } }) {
    setColor(e.target.value);
  }

  //add to cart function
  function addToCart(e: { preventDefault: () => void }) {
    e.preventDefault();
    //check if quantity and color is correct input
    if (quantity > 0 && quantity <= 100 && color) {
      //if in LS has no product, update props.setState directly in order to update LS
      if (!testSelectedProduct && id) {
        console.log("it was null");
        //setSelectProducts([{ _id: id, quantity: quantity, color: color }]);
        dispatch(addProduct({ _id: id, quantity: quantity, color: color }));
      }

      //check if existing array in LS, if there any repeated product with same color
      else if (testSelectedProduct?.some((i) => i._id === id && i.color === color)) {
        console.log("same color");
        dispatch(addSameColorProduct({ _id: id, quantity: quantity, color: color }));
      }

      //if no product is repeated, add new selected product to existing LS array
      else {
        //if (id && selectedProducts) setSelectProducts([...selectedProducts, { _id: id, quantity: quantity, color: color }]);
        if (id && testSelectedProduct) {
          console.log("other color");
          dispatch(addProduct({ _id: id, quantity: quantity, color: color }));
        }
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
      {error && <div>Veuillez réessayer SVP</div>}

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
};

export default OneProduct;
