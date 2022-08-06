import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//components
import Header from "./components/Header";
import Products from "./components/productPage/Products.tsx";
import OneProduct from "./components/productPage/OneProduct";
import Cart from "./components/productPage/Cart";
import Confirmation from "./components/productPage/Confirmation";
import NotFound from "./components/productPage/NotFound";
import Footer from "./components/Footer";

function App() {
  //state to save selected product - initial value is null or any products saved in LS
  const [selectedProducts, setSelectProducts] = useState(JSON.parse(localStorage.getItem("products")));

  //when children - OneProduct setState, update local storage accordingly
  useEffect(() => {
    console.log(selectedProducts);
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
