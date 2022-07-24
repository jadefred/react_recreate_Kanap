import { render, screen, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import Products from "../components/productPage/Products";
import { BrowserRouter as Router } from "react-router-dom";

const server = setupServer(
  rest.get("http://localhost:3000/api/products", (req, res, ctx) => {
    // Respond with a mocked user token that gets persisted
    // in the `sessionStorage` by the `Login` component.
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
        {
          colors: ["Black/Yellow", "Black/Red"],
          _id: "415b7cacb65d43b2b5c1ff70f3393ad1",
          name: "Kanap Cyllène",
          price: 4499,
          imageUrl: "http://localhost:3000/images/kanap02.jpeg",
          description:
            "Morbi nec erat aliquam, sagittis urna non, laoreet justo. Etiam sit amet interdum diam, at accumsan lectus.",
          altTxt: "Photo d'un canapé jaune et noir, quattre places",
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

describe("Testing Products Component", () => {
  test("Render titles", () => {
    render(<Products />);

    const h1 = screen.getByRole("heading", { name: "Nos produits" });
    const h2 = screen.getByRole("heading", { name: "Une gamme d'articles exclusifs" });
    expect(h1).toBeTruthy();
    expect(h2).toBeTruthy();
  });

  test("Successfully fetch data", async () => {
    render(
      <Router>
        <Products />
      </Router>
    );

    await waitFor(() => expect(screen.getAllByRole("link").length).toEqual(2));
  });

  test("Successfully fetch all data", async () => {
    render(
      <Router>
        <Products />
      </Router>
    );
    const img = await screen.findByAltText("Photo d'un canapé bleu, deux places");
    expect(await screen.findByText("Kanap Sinopé")).toBeTruthy();
    expect(
      await screen.findByText(
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      )
    ).toBeTruthy();
    expect(await screen.findByAltText("Photo d'un canapé bleu, deux places")).toBeTruthy();
    expect(img.src).toContain("http://localhost:3000/images/kanap01.jpeg");
  });

  test("Failed to fetch data", async () => {
    server.use(
      rest.get("http://localhost:3000/api/products", (req, res, ctx) => {
        // Respond with "500 Internal Server Error" status for this test.
        return res(ctx.status(500), ctx.json({ message: "Internal Server Error" }));
      })
    );

    render(
      <Router>
        <Products />
      </Router>
    );

    expect(await screen.findByText("Problème de chargement Veuillez ressayer")).toBeTruthy();
  });

  test("Redirect to related page end with product id after click the card", async () => {
    render(
      <Router>
        <Products />
      </Router>
    );

    //const img = await screen.findByAltText("Photo d'un canapé bleu, deux places");
    const redirectLink = await screen.findByRole("link", {
      name: "Photo d'un canapé bleu, deux places Kanap Sinopé Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    });

    await waitFor(() => expect(redirectLink.href).toEqual("http://localhost/products/107fb5b75607497b96722bda5b504926"));
  });
});
