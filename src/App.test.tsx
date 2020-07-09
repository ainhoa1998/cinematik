import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

it("Muestra el título", () => {
  render(<App />);

  expect(screen.getByText(/cinematik/i)).toBeInTheDocument();
});

it("Añade una película", () => {
  render(<App />);

  const title = screen.getByLabelText(/titulo/i);
  userEvent.type(title, "Star Wars");
  const saveButton = screen.getByText(/guardar/i);
  userEvent.click(saveButton);

  expect(screen.getByText("Star Wars")).toBeInTheDocument();
});

it("Añade dos películas", () => {
  render(<App />);

  const title = screen.getByLabelText(/titulo/i);
  userEvent.type(title, "Star Wars");
  const saveButton = screen.getByText(/guardar/i);
  userEvent.click(saveButton);

  userEvent.type(title, "El Padrino");
  userEvent.click(saveButton);

  expect(screen.getByText("Star Wars")).toBeInTheDocument();
  expect(screen.getByText("El Padrino")).toBeInTheDocument();
});

it("Devuelve mensaje de error", () => {
  render(<App />);

  const title = screen.getByLabelText(/titulo/i);
  userEvent.type(title, "");
  const saveButton = screen.getByText(/guardar/i);
  userEvent.click(saveButton);

  expect(
    screen.getByText("Debes indicar un título para guardar una película")
  ).toBeInTheDocument();
});

it("Informa de que no tiene películas", () => {
  render(<App />);

  expect(screen.getByText("No tiene películas añadidas")).toBeInTheDocument();
});

it("Elimina una película añadida", () => {
  render(<App />);

  const title = screen.getByLabelText(/titulo/i);
  userEvent.type(title, "Star Wars");
  const saveButton = screen.getByText(/guardar/i);
  userEvent.click(saveButton);

  const deleteButton = screen.getByText(/eliminar/i);
  userEvent.click(deleteButton);

  expect(screen.queryByText("Star Wars")).not.toBeInTheDocument();
});
