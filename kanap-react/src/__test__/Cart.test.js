import { render, screen } from "@testing-library/react";
import Cart from "../components/productPage/Cart";
import { BrowserRouter as Router } from "react-router-dom";

describe("Test Cart", () => {
  test("Render Component", () => {
    render(
      <Router>
        <Cart />
      </Router>
    );
    expect(screen.getByText(/Votre panier/)).toBeTruthy();
  });

  test("Render component with props", () => {
    const product = [{ _id: "415b7cacb65d43b2b5c1ff70f3393ad1", quantity: "1", color: "Black/Red" }];
    render(
      <Router>
        <Cart selectedProducts={product} />
      </Router>
    );

  });
});
