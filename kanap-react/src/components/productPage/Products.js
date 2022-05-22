import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/products.css";

function Products() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const getAllProduct = async () => {
      const response = await fetch("http://localhost:3000/api/products");
      const data = await response.json();

      setItems(data);
      setIsLoaded(true);
    };

    getAllProduct().catch((e) => setError(e));
  }, []);

  return (
    <>
      <div className="bg-color">
        <div className="title">
          <h1>Nos produits</h1>
          <h2>Une gamme d'articles exclusifs</h2>
        </div>

        {/* render if error is occured */}
        {error && <div>Error: {error.message}</div>}

        {items.length > 0 && isLoaded && (
          <div className="product-cards-box">
            {items.map((item) => {
              return (
                <Link to={`/${item._id}`} style={{ textDecoration: "none", color: "inherit" }}>
                  <div className="card" key={item._id}>
                    <img src={item.imageUrl} alt={item.altTxt} />
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}

export default Products;
