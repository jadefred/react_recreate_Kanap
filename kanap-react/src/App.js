import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

//components
import Header from "./components/Header";
import Products from "./components/productPage/Products";
import OneProduct from "./components/productPage/OneProduct";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/:id" element={<OneProduct />} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
}

export default App;
