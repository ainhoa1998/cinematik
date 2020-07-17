import { Button } from "./components/Button";
import React, { FC, useState } from "react";
import styled from "styled-components";
import { Movie } from "../App";

export const ShowMovie: FC<{
  movieCollection: Movie[];
  onUpdateMovie: (movieUpdated: Movie) => void;
  onDeleteMovie: (movieToDelete: string) => void;
}> = ({ movieCollection, onUpdateMovie, onDeleteMovie }) => {
  const [editedComment, setEditedComment] = useState("");
  const [editedTitle, setEditedTitle] = useState("");
  const [editingComponent, setEditingComponent] = useState(-1);
  const [displayComments, setDisplayComments] = useState<"none" | "block">(
    "none"
  );

  const handleUpdateMovie = (movieId: number) => {
    const updatedMovieCollection = movieCollection;
    const movieUpdated = updatedMovieCollection.find(
      (movie) => movie.id === movieId
    );
    if (!!editedComment) {
      movieUpdated?.reviews.push(editedComment);
      setEditedComment("");
    }
    if (!!movieUpdated) {
      movieUpdated.title = editedTitle;
      onUpdateMovie(movieUpdated);
    }
    setEditingComponent(-1);
  };

  const handleDelete = (selectedMovie: string) => {
    onDeleteMovie(selectedMovie);

    setDisplayComments("none");
  };

  const handleEdit = (index: number) => {
    if (editingComponent < 0) {
      setEditingComponent(index);
    } else {
      setEditingComponent(-1);
    }
  };

  const handleDisplay = (movie: Movie) => {
    displayComments === "none" && movie.reviews.length > 0
      ? setDisplayComments("block")
      : setDisplayComments("none");
  };

  const handleEditTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setEditedTitle(event.target.value);
  };

  const handleEditComment = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setEditedComment(event.target.value);
  };

  return (
    <InnerWrapper>
      {movieCollection.length !== 0 ? (
        movieCollection.map((movie) => {
          return (
            <>
              <StyledMovie onClick={() => handleDisplay(movie)} key={movie.id}>
                {editingComponent === movie.id ? (
                  <div>
                    <div>
                      <label htmlFor="editarTitulo">Edita el título: </label>
                      <TypeTitle
                        onChange={handleEditTitle}
                        type="text"
                        id="editarTitulo"
                        placeholder={movie.title}
                      />
                    </div>
                    <div>
                      <label htmlFor="comment">Escribe un comentario: </label>
                      <TypeTitle
                        onChange={handleEditComment}
                        type="text"
                        id="comment"
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <span>{movie.title}</span>
                    {movie.valuation < 1 ? (
                      <span>No hay valoración </span>
                    ) : (
                      <span>{movie.valuation} estrellas</span>
                    )}
                    <span>
                      {movie.reviews.length} comentario
                      {movie.reviews.length !== 1 ? <span>s</span> : null}
                    </span>
                  </>
                )}
                <div>
                  {editingComponent === movie.id ? (
                    <Button
                      backgroundColor="orange"
                      onClick={() => handleUpdateMovie(movie.id)}
                    >
                      Guardar título
                    </Button>
                  ) : (
                    <Button
                      backgroundColor="orange"
                      onClick={() => handleEdit(movie.id)}
                    >
                      Editar
                    </Button>
                  )}
                  <Button
                    backgroundColor="red"
                    onClick={() => handleDelete(movie.title)}
                  >
                    Eliminar
                  </Button>
                </div>
              </StyledMovie>

              <Comments display={displayComments}>
                <span>Comentarios</span>
                {movie.reviews.length !== 0
                  ? movie.reviews.map((comment, index) => {
                      return <div key={index}>- {comment}</div>;
                    })
                  : null}
              </Comments>
            </>
          );
        })
      ) : (
        <InformationText>No tiene películas añadidas</InformationText>
      )}
    </InnerWrapper>
  );
};

const InformationText = styled.div`
  font-size: 20px;
  color: grey;
`;

const TypeTitle = styled.input`
  margin-left: 15px;
`;

const InnerWrapper = styled.div`
  margin: 0 50px;
`;

const Comments = styled.div<{ display: "none" | "block" }>`
  border: 1px solid black;
  padding: 5px 10px;
  display: ${(props) => props.display};
  background-color: #aaaaaa;
  color: white;
`;

const StyledMovie = styled.div`
  border: 1px solid black;
  padding: 5px 10px;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
`;
