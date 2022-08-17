import React, { useState, useEffect, FC } from "react";
import "../css/cart.css";
import Form from "./cartComponents/Form";
import SelectedProduct from "./cartComponents/SelectedProduct";
import { IData } from "../../assets/Interface";

//redux
import { useSelector, RootState } from "../../app/store";

const Cart: FC = () => {
  const [error, setError] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [items, setItems] = useState<IData[]>([]);
  const [totalQuantity, setTotalQuantity] = useState<number>(0);

  //redux
  const testSelectedProduct = useSelector((state: RootState) => state.selectedProduct);

  //fetch all products api
  useEffect(() => {
    const getAllProduct = async (): Promise<void> => {
      try {
        const response = await fetch("http://localhost:3000/api/products");
        const data = await response.json();

        setItems(data);
        setIsLoaded(true);

        if (!response.ok) {
          setError(true);
        }
      } catch (e) {
        setError(true);
      }
    };
    getAllProduct();
  }, []);

  const showEmptyMsg: boolean = testSelectedProduct?.length === 0 || testSelectedProduct === null ? true : false;
  return (
    <>
      <div className="cart-box">
        <h1>Votre panier</h1>

        {/* message when error occur */}
        {error && (
          <p className="error-msg">
            Problème de chargement <br /> Veuillez ressayer
          </p>
        )}

        {/* show msg when cart is empty */}
        {!error && showEmptyMsg && <p className="error-msg">Votre panier est vide</p>}

        {/* selected product, display when LS is presented and data is loaded */}
        {testSelectedProduct && isLoaded && (
          <SelectedProduct items={items} isLoaded={isLoaded} totalQuantity={totalQuantity} setTotalQuantity={setTotalQuantity} />
        )}

        {/* client info form, display when LS is presented*/}
        {testSelectedProduct !== null && totalQuantity > 0 && <Form />}
      </div>
    </>
  );
};

export default Cart;
