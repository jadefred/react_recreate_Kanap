import { render, screen } from "@testing-library/react";
import Header from "../components/Header";
import { BrowserRouter as Router } from "react-router-dom";

describe("Testing Header Component", () => {
  it("Render all svg icons", () => {
    render(
      <Router>
        <Header />
      </Router>
    );
    const svg1 = screen.getByTestId("svg-1");
    const svg2 = screen.getByTestId("svg-1");
    const svg3 = screen.getByTestId("svg-1");
    expect(svg1).toBeTruthy();
    expect(svg2).toBeTruthy();
    expect(svg3).toBeTruthy();
  });

  it("Render Acceuil and Panier buttons", () => {
    render(
      <Router>
        <Header />
      </Router>
    );
    const acceuil = screen.getByTestId("acceuil-btn");
    expect(acceuil).toBeTruthy();
    const panier = screen.getByTestId("panier-btn");
    expect(panier).toBeTruthy();
  });

  it("Render images", async () => {
    render(
      <Router>
        <Header />
      </Router>
    );
    const images = await screen.findAllByRole("img");
    expect(images).toHaveLength(2);
  });
});
