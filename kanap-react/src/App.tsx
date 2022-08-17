import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//components
import Header from "./components/Header";
import Products from "./components/productPage/Products";
import OneProduct from "./components/productPage/OneProduct";
import Cart from "./components/productPage/Cart";
import Confirmation from "./components/productPage/Confirmation";
import NotFound from "./components/productPage/NotFound";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/products/:id" element={<OneProduct />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/confirmation/:orderId" element={<Confirmation />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
}

export default App;
