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
  const openComments = screen.getByText("Star Wars");
  userEvent.click(openComments);

  expect(screen.getByText("- Es una película muy buena.")).toBeInTheDocument();
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
  const saveChanges = screen.getByText(/guardar película/i);
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
  const saveChanges = screen.getByText(/guardar película/i);
  userEvent.click(saveChanges);
  const openComments = screen.getByText("Star Wars");
  userEvent.click(openComments);

  expect(screen.getByText("- Película muy buena")).toBeInTheDocument();
});

it("Valora una película", () => {
  render(<App />);

  const title = screen.getByLabelText(/titulo/i);
  userEvent.type(title, "Star Wars");

  const radioButton = screen.getByLabelText("2") as HTMLInputElement;
  userEvent.click(radioButton);
  expect(radioButton.value).toBe("2");

  const saveButton = screen.getByText(/guardar/i);
  userEvent.click(saveButton);
  expect(screen.getByText("2 estrellas")).toBeInTheDocument();
});

it("Edita valoración de una película", () => {
  render(<App />);

  const title = screen.getByLabelText(/titulo/i);
  userEvent.type(title, "Star Wars");

  const saveButton = screen.getByText(/guardar/i);
  userEvent.click(saveButton);

  const editButton = screen.getByText(/editar/i);
  userEvent.click(editButton);
  const radioButtonChange = screen.getByLabelText(
    "3 estrellas"
  ) as HTMLInputElement;
  userEvent.click(radioButtonChange);
  const saveChanges = screen.getByText(/guardar película/i);
  userEvent.click(saveChanges);

  expect(screen.getByText("3 estrellas")).toBeInTheDocument();
});

it("Elimina un comentario", () => {
  render(<App />);

  const title = screen.getByLabelText(/titulo/i);
  userEvent.type(title, "Star Wars");
  const saveButton = screen.getByText(/guardar/i);
  userEvent.click(saveButton);
  const editButton = screen.getByText(/editar/i);
  userEvent.click(editButton);

  const writeComent = screen.getByLabelText(/escribe un comentario/i);
  userEvent.type(writeComent, "Película muy buena");
  const saveChanges = screen.getByText(/guardar película/i);
  userEvent.click(saveChanges);
  const openComments = screen.getByText("Star Wars");
  userEvent.click(openComments);

  const deleteButton = screen.getByText(/eliminar comentario/i);
  userEvent.click(deleteButton);

  expect(screen.queryByText(/película muy buena/i)).not.toBeInTheDocument();
});

it("Edita un comentario", () => {
  render(<App />);

  const title = screen.getByLabelText(/titulo/i);
  userEvent.type(title, "Star Wars");
  const review = screen.getByLabelText(/crítica/i);
  userEvent.type(review, "Muy buena");
  const saveButton = screen.getByText(/guardar/i);
  userEvent.click(saveButton);

  const openComments = screen.getByText("Star Wars");
  userEvent.click(openComments);
  const editCommentButton = screen.getByText(/editar comentario/i);
  userEvent.click(editCommentButton);

  const editComment = screen.getByLabelText(/edita el comentario/i);
  userEvent.type(editComment, "Película muy buena!");
  const saveChanges = screen.getByText(/guardar comentario/i);
  userEvent.click(saveChanges);

  expect(screen.getByText(/Película muy buena!/i)).toBeInTheDocument();
});
