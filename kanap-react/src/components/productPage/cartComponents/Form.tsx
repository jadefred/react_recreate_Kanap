import { useState, FC } from "react";
import { useNavigate } from "react-router";
import { IProductsState } from "../../../assets/Interface";
//redux
import { useSelector, RootState } from "../../../app/store";
import { useDispatch } from "react-redux";
import { updateProduct } from "../../../features/selectedProductSlice";

type FormInput = {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  email: string;
};

type Order = {
  contact: FormInput;
  products: string[];
};

type Options = {
  method: string;
  headers: {
    "Content-Type": string;
  };
  body: string;
};

const Form: FC<IProductsState> = ({ selectedProducts, setSelectProducts }) => {
  const [formValue, setFormValue] = useState<FormInput>({ firstName: "", lastName: "", address: "", city: "", email: "" });
  const [errorMsg, setErrorMsg] = useState<FormInput>({ firstName: "", lastName: "", address: "", city: "", email: "" });
  const emailPattern: RegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  let navigate = useNavigate();

  //redux
  //redux
  const testSelectedProduct = useSelector((state: RootState) => state.selectedProduct);
  const dispatch = useDispatch();

  function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();
    if (
      !formValue.firstName ||
      !formValue.lastName ||
      !formValue.address ||
      !formValue.city ||
      !formValue.email ||
      emailPattern.test(formValue.email) === false
    ) {
      if (!formValue.firstName) {
        setErrorMsg({ ...errorMsg, firstName: "Veuillez entrer votre prénom" });
      }
      if (!formValue.lastName) {
        setErrorMsg({ ...errorMsg, lastName: "Veuillez entrer votre nom" });
      }
      if (!formValue.address) {
        setErrorMsg({ ...errorMsg, address: "Veuillez entrer votre adresse" });
      }
      if (!formValue.city) {
        setErrorMsg({ ...errorMsg, city: "Veuillez entrer votre ville" });
      }
      if (!formValue.email) {
        setErrorMsg({ ...errorMsg, email: "Veuillez entrer votre email" });
      }
      if (emailPattern.test(formValue.email) === false) {
        setErrorMsg({ ...errorMsg, email: "L'adresse email est incorrect. Veuillez la modifier" });
      }
    } else {
      //prepare an array of selected products' id for POST
      let products: string[] = [];
      if (testSelectedProduct) {
        for (const i of testSelectedProduct) {
          products.push(i._id);
        }
      }

      //object which contain contact of client and his products' id
      const order: Order = {
        contact: formValue,
        products: products,
      };

      //Prepare post object
      const options: Options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      };

      //get confirmation id from server
      placeOrder(options);
    }
  }

  //async to POST data to server
  async function placeOrder(options: Options) {
    try {
      const response = await fetch("http://localhost:3000/api/products/order", options);
      const data = await response.json();

      //set empty array to clear state
      dispatch(updateProduct([]));

      //redirect to confirmation page with query of order id
      navigate("/confirmation/" + data.orderId);
    } catch (e) {
      console.log(e);
    }
  }

  function handleFormInput(e: { target: { name: string; value: string } }) {
    const name = e.target.name;
    const value = e.target.value;
    setFormValue({ ...formValue, [name]: value });
  }

  return (
    <>
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
    </>
  );
};

export default Form;
