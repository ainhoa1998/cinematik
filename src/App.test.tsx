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

it("Añade una película con crítica", () => {
  render(<App />);

  const title = screen.getByLabelText(/titulo/i);
  userEvent.type(title, "Star Wars");
  const review = screen.getByLabelText(/crítica/i);
  userEvent.type(review, "Es una película muy buena.");
  const saveButton = screen.getByText(/guardar/i);
  userEvent.click(saveButton);

  expect(screen.getByText("Es una película muy buena.")).toBeInTheDocument();
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
expect(screen.queryByText("Star Wars")).not.toBeInTheDocument();

it("Edita una película añadida", () => {
  render(<App />);

  const title = screen.getByLabelText(/titulo/i);
  userEvent.type(title, "Star Wars");
  const saveButton = screen.getByText(/guardar/i);
  userEvent.click(saveButton);

  const editButton = screen.getByText(/editar/i);
  userEvent.click(editButton);

  const changeTitle = screen.getByPlaceholderText("Star Wars");
  userEvent.type(changeTitle, "Star Wars 2");
  const saveChanges = screen.getByText(/guardar título/i);
  userEvent.click(saveChanges);

  expect(screen.queryByText("Star Wars 2")).toBeInTheDocument();
  expect(screen.queryByText("Star Wars")).not.toBeInTheDocument();
});

it("Añade un comentario", () => {
  render(<App />);

  const title = screen.getByLabelText(/titulo/i);
  userEvent.type(title, "Star Wars");
  const saveButton = screen.getByText(/guardar/i);
  userEvent.click(saveButton);
  const editButton = screen.getByText(/editar/i);
  userEvent.click(editButton);

  const writeComent = screen.getByLabelText(/escribe un comentario/i);
  userEvent.type(writeComent, "Película muy buena");
  const saveChanges = screen.getByText(/guardar título/i);
  userEvent.click(saveChanges);

  expect(screen.getByText("Película muy buena")).toBeInTheDocument();
});

it("Valora una película", () => {
  render(<App />);

  const title = screen.getByLabelText(/titulo/i);
  userEvent.type(title, "Star Wars");
  const saveButton = screen.getByText(/guardar/i);
  userEvent.click(saveButton);

  const radioButton = screen.getByLabelText("2") as HTMLInputElement;
  expect(radioButton.value).toBe("2");

  userEvent.click(radioButton);
  expect(radioButton.value).toBe("2");
  expect(screen.queryByText("2 estrellas")).toBeInTheDocument();
});
