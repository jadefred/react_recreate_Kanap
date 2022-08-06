import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/products.css";

interface IData {
  _id: string;
  imageUrl: string;
  altTxt: string;
  name: string;
  description: string;
}

function Products() {
  const [error, setError] = useState<boolean | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [items, setItems] = useState<IData[]>([]);

  useEffect(() => {
    const getAllProduct = async () => {
      const response = await fetch("http://localhost:3000/api/products");
      const data = await response.json();

      setItems(data);
      setIsLoaded(true);
      if (!response.ok) {
        setError(true);
      }
    };

    getAllProduct().catch((e) => setError(e));
  }, []);

  return (
    <>
      <div className="product-cards-wrapper"></div>
      <div className="bg-color">
        <div className="title">
          <h1>Nos produits</h1>
          <h2>Une gamme d'articles exclusifs</h2>
        </div>

        {/* render if error is occured */}
        {error && (
          <div className="error">
            <p>
              Problème de chargement <br /> Veuillez ressayer
            </p>
          </div>
        )}

        {items.length > 0 && isLoaded && (
          <div className="product-cards-box">
            {items.map((item) => {
              return (
                <Link to={`/products/${item._id}`} className="link" key={item._id}>
                  <div className="card">
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
      <div className="product-cards-wrapper"></div>
    </>
  );
}

export default Products;
