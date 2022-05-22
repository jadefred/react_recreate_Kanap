import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import "../css/cart.css";

function Cart(props) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  //fetch all products api
  useEffect(() => {
    const getAllProduct = async () => {
      const response = await fetch("http://localhost:3000/api/products");
      const data = await response.json();

      setItems(data);
      setIsLoaded(true);
    };
    getAllProduct().catch((e) => setError(e));
  }, []);

  //function to setTotalPrice by mapping out selected product, price times quantity, finally reduce to sum all num
  function getTotalPrice() {
    const priceOfEachItem = props.selectedProducts.map((i) => {
      return items.find((obj) => obj._id === i._id).price * i.quantity;
    });
    const result = priceOfEachItem.reduce((prev, current) => prev + parseInt(current), 0);
    setTotalPrice(result);
  }

  //update total quantity and total price when first render the page and whenever change of items quantity
  useEffect(() => {
    if (props.selectedProducts !== null && isLoaded) {
      setTotalQuantity(props.selectedProducts.reduce((prev, current) => prev + parseInt(current.quantity), 0));
      getTotalPrice();
    } else {
      setTotalQuantity(0);
    }
  }, [isLoaded, props.selectedProducts]);

  //onChange function to modify quantity
  function quantityChange(event, index) {
    if (event.target.value <= 0 || event.target.value > 100) {
      event.target.value = props.selectedProducts[index].quantity;
    } else {
      props.setSelectProducts((prev) => {
        const newArr = [...prev];
        newArr[index].quantity = event.target.value;
        return newArr;
      });
    }
  }

  //onClick to delete product
  function deleteProduct(index) {
    props.setSelectProducts((prev) => {
      const newArr = [...prev];
      newArr.splice(index, 1);
      return newArr;
    });
  }

  // Form component
  const [formValue, setFormValue] = useState({ firstName: "", lastName: "", address: "", city: "", email: "" });
  const [errorMsg, setErrorMsg] = useState({ firstName: "", lastName: "", address: "", city: "", email: "" });
  //const inputName = ["firstName", "lastName", "address", "city", "email"];
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  let navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    // for (const i of inputName) {
    //   if (e.target[i].value === "") {
    //     setErrorMsg({ ...errorMsg, [i]: `Veuillez entrer votre ${i}` });
    //   }
    // }

    if (
      !e.target.firstName.value ||
      !e.target.lastName.value ||
      !e.target.address.value ||
      !e.target.city.value ||
      !e.target.email.value ||
      emailPattern.test(e.target.email.value) === false
    ) {
      if (!e.target.firstName.value) {
        setErrorMsg({ ...errorMsg, firstName: "Veuillez entrer votre prénom" });
      }
      if (!e.target.lastName.value) {
        setErrorMsg({ ...errorMsg, lastName: "Veuillez entrer votre nom" });
      }
      if (!e.target.address.value) {
        setErrorMsg({ ...errorMsg, address: "Veuillez entrer votre adresse" });
      }
      if (!e.target.city.value) {
        setErrorMsg({ ...errorMsg, city: "Veuillez entrer votre ville" });
      }
      if (!e.target.email.value) {
        setErrorMsg({ ...errorMsg, email: "Veuillez entrer votre email" });
      }
      if (emailPattern.test(e.target.email.value) === false) {
        setErrorMsg({ ...errorMsg, email: "L'adresse email est incorrect. Veuillez la modifier" });
      }
    } else {
      //prepare an array of selected products' id for POST
      let products = [];
      for (const i of props.selectedProducts) {
        products.push(i._id);
      }

      //object which contain contact of client and his products' id
      const order = {
        contact: formValue,
        products: products,
      };

      //Prepare post object
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      };

      //get confirmation id from server
      placeOrder(options);
    }
  }

  //async to POST data to server
  async function placeOrder(options) {
    try {
      const response = await fetch("http://localhost:3000/api/products/order", options);
      const data = await response.json();

      //redirect to confirmation page with query of order id
      navigate("/confirmation/" + data.orderId);
    } catch (e) {
      console.log(e);
    }
  }

  function handleFormInput(e) {
    const name = e.target.name;
    const value = e.target.value;
    setFormValue({ ...formValue, [name]: value });
  }

  return (
    <>
      <div className="cart-box">
        <h1>Votre panier</h1>

        {/* add error block */}

        {props.selectedProducts === null && <div>Votre Panier est vide</div>}

        {/* selected product, display when LS is presented and data is loaded */}
        {props.selectedProducts !== null &&
          isLoaded &&
          props.selectedProducts.map((i, index) => {
            return (
              <div className="cart--card-of-product" key={i._id}>
                <div className="cart--card-of-product-img-box">
                  <img
                    src={items.find((obj) => obj._id === i._id).imageUrl}
                    alt={items.find((obj) => obj._id === i._id).altTxt}
                  />
                </div>

                <div className="cart--card-of-product-info">
                  <div className="cart--card-of-product-info-description-box">
                    <h2>{i.name}</h2>
                    <p>{i.color}</p>
                    <p>{items.find((obj) => obj._id === i._id).price * i.quantity}€</p>
                  </div>

                  <div className="cart--card-of-product-info-setting-box">
                    <div className="cart--card-of-product-info__quantity">
                      <p>Qté : </p>
                      <input
                        onChange={(event) => quantityChange(event, index)}
                        type="number"
                        name="itemQuantity"
                        min="1"
                        max="100"
                        value={i.quantity}
                        required
                      />
                    </div>
                    <div className="cart--card-of-product-info__delete">
                      <p onClick={() => deleteProduct(index)}>Supprimer</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

        <div className="cart--card-of-price">
          <p>
            Total ({totalQuantity} articles) : {totalPrice}.00 €
          </p>
        </div>

        {/* client info form */}

        <div className="cart--card-of-order">
          <form action="get" onSubmit={handleSubmit}>
            <div className="cart--card-of-order__question">
              <label htmlFor="firstName">Prénom: </label>
              <input onChange={handleFormInput} type="text" name="firstName" id="firstName" required />
              {errorMsg.firstName !== "" && <p>{errorMsg.firstName}</p>}
            </div>
            <div className="cart--card-of-order__question">
              <label htmlFor="lastName">Nom: </label>
              <input onChange={handleFormInput} type="text" name="lastName" id="lastName" required />
              {errorMsg.lastName !== "" && <p>{errorMsg.lastName}</p>}
            </div>
            <div className="cart--card-of-order__question">
              <label htmlFor="address">Adresse: </label>
              <input onChange={handleFormInput} type="text" name="address" id="address" required />
              {errorMsg.address !== "" && <p>{errorMsg.address}</p>}
            </div>
            <div className="cart--card-of-order__question">
              <label htmlFor="city">Ville: </label>
              <input onChange={handleFormInput} type="text" name="city" id="city" required />
              {errorMsg.city !== "" && <p>{errorMsg.city}</p>}
            </div>
            <div className="cart--card-of-order__question">
              <label htmlFor="email">Email: </label>
              <input onChange={handleFormInput} type="text" name="email" id="email" required />
              {errorMsg.email !== "" && <p>{errorMsg.email}</p>}
            </div>
            <div className="cart--card-of-order__submit">
              <input type="submit" value="Commander !" id="order" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Cart;
