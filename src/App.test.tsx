import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("Muestra el título", () => {
  render(<App />);

  expect(screen.getByText(/cinematik/i)).toBeInTheDocument();
});
