import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("Muestra el título", () => {
  render(<App />);
  const linkElement = screen.getByText(/cinematik/i);

  expect(linkElement).toBeInTheDocument();
});
