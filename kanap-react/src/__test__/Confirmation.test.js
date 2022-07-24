import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Confirmation from "../components/productPage/Confirmation";
import { BrowserRouter as Router } from "react-router-dom";

// const renderWithRouter = (ui, { route = "/" } = {}) => {
//   //   global.window = Object.create(window);
//   //   const url = "http://localhost:3001/";
//   //   Object.defineProperty(window, "location", {
//   //     value: {
//   //       href: url + route,
//   //     },
//   //   });
//   window.history.pushState({}, "Test page", route);

//   return {
//     user: userEvent.setup(),
//     ...render(ui, { wrapper: Router }),
//   };
// };

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    orderId: 12345,
  }),
}));

describe("Test component - Confirmation", () => {
  test("Display text - without props", () => {
    render(
      <Router>
        <Confirmation />
      </Router>
    );

    expect(screen.getByText(/Commande validée/)).toBeTruthy();
    expect(screen.getByText(/Votre numéro de commande est :/)).toBeTruthy();
  });

  test("Display text - test props", async () => {
    render(
      <Router>
        <Confirmation />
      </Router>
    );
    // const route = "confirmation/12345";
    // renderWithRouter(<Confirmation />, { route });
    // //expect(global.window.location.href).toContain("12345");
    expect(screen.getByText(/12345/)).toBeTruthy();
  });
});
