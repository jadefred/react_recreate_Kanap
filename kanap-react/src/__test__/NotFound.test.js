import { render, screen } from "@testing-library/react";
import NotFound from "../components/productPage/NotFound";
import { BrowserRouter as Router } from "react-router-dom";

describe("Test component - NotFound", () => {
  test("Display all text", () => {
    render(
      <Router>
        <NotFound />
      </Router>
    );

    expect(screen.getByText("Opps...Vous êtes perdu dans notre site")).toBeTruthy();
  });
});
