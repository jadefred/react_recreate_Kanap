import { render, screen } from "@testing-library/react";
import Footer from "../components/Footer";
import { BrowserRouter as Router } from "react-router-dom";

describe("Test component - Footer", () => {
  test("Render component", () => {
    render(
      <Router>
        <Footer />
      </Router>
    );

    const img = screen.getAllByAltText("logo de kanap");
    expect(img).toBeTruthy();
    expect(screen.getByText("10 quai de la charente 75019 Paris 19")).toBeTruthy();
    expect(screen.getByText("Téléphone : 01 23 45 67 89")).toBeTruthy();
    expect(screen.getByText("Email : support@name.com")).toBeTruthy();
    expect(
      screen.getByText("© Copyright 2021 - 2042 | Openclassrooms by Openclassrooms | All Rights Reserved | Powered by Love")
    ).toBeTruthy();
  });
});
