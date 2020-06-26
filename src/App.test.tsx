import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("Muestra el título", () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/cinematik/i);
  expect(linkElement).toBeInTheDocument();
});
