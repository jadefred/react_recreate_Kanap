import React, { useState, useEffect } from "react";
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

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  }

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
                <div className="card" key={item.name}>
                  <img src={item.imageUrl} alt={item.altTxt} />
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}

export default Products;
