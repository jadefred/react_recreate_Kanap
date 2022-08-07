import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//components
import Header from "./components/Header";
import Products from "./components/productPage/Products";
import OneProduct from "./components/productPage/OneProduct";
import Cart from "./components/productPage/Cart";
import Confirmation from "./components/productPage/Confirmation";
import NotFound from "./components/productPage/NotFound";
import Footer from "./components/Footer";

import { ILocalStorage } from "./assets/Interface";

function App() {
  //state to save selected product - initial value is null or any products saved in LS
  const [selectedProducts, setSelectProducts] = useState<ILocalStorage["selectedProducts"]>([]);

  useEffect(() => {
    const lsItem = localStorage.getItem("products");
    console.log(lsItem);
    if (lsItem && lsItem !== "undefined") {
      setSelectProducts(JSON.parse(lsItem));
    }
  }, []);

  //when children - OneProduct setState, update local storage accordingly
  useEffect(() => {
    console.log("app useEffect trrigered", selectedProducts);
    localStorage.setItem("products", JSON.stringify(selectedProducts));
  }, [selectedProducts]);

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Products />} />
          <Route
            path="/products/:id"
            element={<OneProduct selectedProducts={selectedProducts} setSelectProducts={setSelectProducts} />}
          />
          <Route path="/cart" element={<Cart selectedProducts={selectedProducts} setSelectProducts={setSelectProducts} />} />
          <Route path="/confirmation/:orderId" element={<Confirmation />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
}

export default App;
