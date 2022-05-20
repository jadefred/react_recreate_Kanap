import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/products.css";

function Products() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/products")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
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

        {/* loading block */}
        {!isLoaded && <div>Loading...</div>}

        {items.length > 0 && (
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
