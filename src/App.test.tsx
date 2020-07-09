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

  const titulo = screen.getByLabelText(/titulo/i);
  userEvent.type(titulo, "Star Wars");
  const guardar = screen.getByText(/guardar/i);
  userEvent.click(guardar);

  expect(screen.getByText("Star Wars")).toBeInTheDocument();
});

it("Añade dos películas", () => {
  render(<App />);

  const titulo = screen.getByLabelText(/titulo/i);
  userEvent.type(titulo, "Star Wars");
  const guardar = screen.getByText(/guardar/i);
  userEvent.click(guardar);

  userEvent.type(titulo, "El Padrino");
  userEvent.click(guardar);

  expect(screen.getByText("Star Wars")).toBeInTheDocument();
  expect(screen.getByText("El Padrino")).toBeInTheDocument();
});

it("Devuelve mensaje de error", () => {
  render(<App />);

  const titulo = screen.getByLabelText(/titulo/i);
  userEvent.type(titulo, "");
  const guardar = screen.getByText(/guardar/i);
  userEvent.click(guardar);

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

  const titulo = screen.getByLabelText(/titulo/i);
  userEvent.type(titulo, "Star Wars");
  const guardar = screen.getByText(/guardar/i);
  userEvent.click(guardar);

  const eliminar = screen.getByText(/eliminar/i);
  userEvent.click(eliminar);

  expect(screen.queryByText("Star Wars")).not.toBeInTheDocument();
});
