import { Button } from "./components/Button";
import React, { FC, useState } from "react";
import styled from "styled-components";
import { Movie } from "../App";

export const ShowMovie: FC<{
  movieCollection: Movie[];
  onUpdateMovie: (movieUpdated: Movie) => void;
  onDeleteMovie: (movieToDelete: number) => void;
}> = ({ movieCollection, onUpdateMovie, onDeleteMovie }) => {
  const [addedComment, setAddedComment] = useState("");
  const [editedTitle, setEditedTitle] = useState("");
  const [readReview, setReadReview] = useState("");
  const [editedValuation, setEditedValuation] = useState(0);
  const [editedReview, setEditedReview] = useState<number[]>([-1, -1]);
  const [editingComponent, setEditingComponent] = useState(-1);
  const [displayComments, setDisplayComments] = useState(-1);

  const handleUpdateMovie = (movieId: number) => {
    const updatedMovieCollection = movieCollection;
    const movieUpdated = updatedMovieCollection.find(
      (movie) => movie.id === movieId
    );
    if (!!addedComment) {
      movieUpdated?.reviews.push(addedComment);
      setAddedComment("");
    }
    if (!!movieUpdated) {
      movieUpdated.valuation = editedValuation;
    }
    if (!!movieUpdated && !!editedTitle) {
      movieUpdated.title = editedTitle;
      onUpdateMovie(movieUpdated);
    }
    setEditingComponent(-1);
  };

  const handleDelete = (selectedMovie: number) => {
    onDeleteMovie(selectedMovie);

    setDisplayComments(-1);
  };

  const handleEdit = (index: number) => {
    if (editingComponent < 0) {
      setEditingComponent(index);
    } else {
      setEditingComponent(-1);
    }
  };

  const handleDisplay = (movie: Movie) => {
    displayComments === -1 && movie.reviews.length > 0
      ? setDisplayComments(movie.id)
      : setDisplayComments(-1);
  };

  const handleEditTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setEditedTitle(event.target.value);
  };

  const handleReadReview = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setReadReview(event.target.value);
  };

  const handleAddComment = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setAddedComment(event.target.value);
  };

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setEditedValuation(event.target.value.charCodeAt(0) - 48);
  };

  const handleDeleteReview = (movieToDelete: Movie, index: number) => {
    const updatedMovieCollection = movieCollection;
    const movieUpdated = updatedMovieCollection.find(
      (movie) => movie.id === movieToDelete.id
    );

    if (!!movieUpdated) {
      movieUpdated.reviews = movieUpdated.reviews.filter(
        (review) => review !== movieUpdated.reviews[index]
      );
      onUpdateMovie(movieUpdated);
    }
    setEditedReview([-1, -1]);
    if (movieUpdated?.reviews.length === 0) {
      setDisplayComments(-1);
    }
  };

  const handleEditReview = (movieEdited: Movie, index: number) => {
    editedReview[0] === -1
      ? setEditedReview([movieEdited.id, index])
      : setEditedReview([-1, -1]);

    const updatedMovieCollection = movieCollection;
    const movieUpdated = updatedMovieCollection.find(
      (movie) => movie.id === movieEdited.id
    );
    if (!!movieUpdated) {
      movieUpdated.reviews[index] = readReview;

      onUpdateMovie(movieUpdated);
    }
  };

  return (
    <InnerWrapper>
      {movieCollection.length !== 0 ? (
        movieCollection.map((movie) => {
          return (
            <>
              <Pelicula>
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
                        onChange={handleAddComment}
                        type="text"
                        id="comment"
                      />
                    </div>
                    <div>
                      <span>Valoración: </span>
                      <div>
                        <input
                          type="radio"
                          id="1edit"
                          name="editValoracion"
                          value="1edit"
                          checked={movie.valuation === 1}
                          onChange={handleOptionChange}
                        />
                        <label htmlFor="1edit">1 estrella</label>
                      </div>
                      <div>
                        <input
                          type="radio"
                          id="2edit"
                          name="editValoracion"
                          value="2edit"
                          checked={movie.valuation === 2}
                          onChange={handleOptionChange}
                        />
                        <label htmlFor="2edit">2 estrellas</label>
                      </div>
                      <div>
                        <input
                          type="radio"
                          id="3edit"
                          name="editValoracion"
                          value="3edit"
                          checked={movie.valuation === 3}
                          onChange={handleOptionChange}
                        />
                        <label htmlFor="3edit">3 estrellas</label>
                      </div>
                      <div>
                        <input
                          type="radio"
                          id="4edit"
                          name="editValoracion"
                          value="4edit"
                          checked={movie.valuation === 4}
                          onChange={handleOptionChange}
                        />
                        <label htmlFor="4edit">4 estrellas</label>
                      </div>
                      <div>
                        <input
                          type="radio"
                          id="5edit"
                          name="editValoracion"
                          value="5edit"
                          checked={movie.valuation === 5}
                          onChange={handleOptionChange}
                        />
                        <label htmlFor="5edit">5 estrellas</label>
                      </div>
                    </div>
                  </div>
                ) : (
                  <StyledMovie
                    onClick={() => handleDisplay(movie)}
                    key={movie.id}
                  >
                    <span>{movie.title}</span>
                    {movie.valuation < 1 ? (
                      <span>No hay valoración </span>
                    ) : (
                      <span>{movie.valuation} estrellas</span>
                    )}
                    <span>
                      {movie.reviews.length} comentario
                      {movie.reviews.length !== 1 && <span>s</span>}
                    </span>
                  </StyledMovie>
                )}

                <div>
                  {editingComponent === movie.id ? (
                    <Button
                      backgroundColor="orange"
                      onClick={() => handleUpdateMovie(movie.id)}
                    >
                      Guardar película
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
                    onClick={() => handleDelete(movie.id)}
                  >
                    Eliminar
                  </Button>
                </div>
              </Pelicula>
              {displayComments === movie.id && (
                <Comments>
                  <span>Comentarios</span>
                  {movie.reviews.length !== 0 &&
                    movie.reviews.map((comment, index) => {
                      return (
                        <div key={index}>
                          {editedReview[0] === movie.id &&
                          editedReview[1] === index ? (
                            <>
                              <label htmlFor="editarComentario">
                                Edita el comentario:
                              </label>
                              <TypeTitle
                                onChange={handleReadReview}
                                type="text"
                                id="editarComentario"
                                placeholder={movie.reviews[index]}
                              />
                              <Button
                                backgroundColor="orange"
                                onClick={() => handleEditReview(movie, index)}
                              >
                                Guardar comentario
                              </Button>
                            </>
                          ) : (
                            <>
                              <span> - {comment}</span>
                              <Button
                                backgroundColor="orange"
                                onClick={() => handleEditReview(movie, index)}
                              >
                                Editar comentario
                              </Button>
                            </>
                          )}

                          <Button
                            backgroundColor="red"
                            onClick={() => handleDeleteReview(movie, index)}
                          >
                            Eliminar comentario
                          </Button>
                        </div>
                      );
                    })}
                </Comments>
              )}
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

const Comments = styled.div`
  border: 1px solid black;
  padding: 5px 10px;
  background-color: #aaaaaa;
  color: white;
`;

const StyledMovie = styled.div`
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  span {
    margin-right: 40px;
    span {
      margin: 0;
    }
  }
`;

const Pelicula = styled.div`
  border: 1px solid black;
  padding: 5px 10px;
  display: flex;
  justify-content: space-between;
`;
