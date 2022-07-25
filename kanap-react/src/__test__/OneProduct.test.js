import { render, screen, waitFor } from "@testing-library/react";
import OneProduct from "../components/productPage/OneProduct";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { BrowserRouter as Router } from "react-router-dom";
import userEvent from "@testing-library/user-event";

const server = setupServer(
  rest.get("http://localhost:3000/api/products/107fb5b75607497b96722bda5b504926", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          colors: ["Blue", "White", "Black"],
          _id: "107fb5b75607497b96722bda5b504926",
          name: "Kanap Sinopé",
          price: 1849,
          imageUrl: "http://localhost:3000/images/kanap01.jpeg",
          description:
            "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          altTxt: "Photo d'un canapé bleu, deux places",
        },
      ])
    );
  })
);

// Enable API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => server.close());

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
    id: `107fb5b75607497b96722bda5b504926`,
  }),
}));

describe("Test one product page", () => {
  test("Fetch data", async () => {
    // const route = "api/products/107fb5b75607497b96722bda5b504926";
    // renderWithRouter(<OneProduct />, { route });

    render(
      <Router>
        <OneProduct />
      </Router>
    );

    console.log(global.window.location.href);
    //expect(global.window.location.href).toContain("107fb5b75607497b96722bda5b504926");
    //expect(await screen.findByText("Kanap Sinopé")).toBeTruthy();
    await waitFor(() => {
      screen.getByText("Kanap Sinopé").toBeTruthy();
    });
  });
});
