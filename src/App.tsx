import React, { FC, useState } from "react";
import styled from "styled-components";
import { Button } from "./views/components/Button";
import { AddMovieForm } from "./views/AddMovieForm";

interface Movie {
  title: string;
  reviews: Array<string>;
  id: number;
  valuation: number;
}

const ShowMovie: FC<{
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
    }
    if (!!movieUpdated) {
      movieUpdated.title = editedTitle;
      onUpdateMovie(movieUpdated);
    }
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
              <Movie onClick={() => handleDisplay(movie)} key={movie.id}>
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
              </Movie>

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

const App: FC = () => {
  const [movieCollection, setMovieCollection] = useState<Movie[]>([]);

  const handleSave = (
    movieTitle: string,
    comment: string,
    valuation: number
  ) => {
    const newMovie: Movie = {
      title: movieTitle,
      reviews: comment !== "" ? [comment] : [],
      id:
        movieCollection.length !== 0
          ? movieCollection.map((movie) => {
              return Math.max(movie.id) + 1;
            })[0]
          : 0,
      valuation: valuation,
    };
    setMovieCollection([...movieCollection, newMovie]);
  };

  const handleUpdate = (updatedMovie: Movie) => {
    const updatedMovieCollection = movieCollection;
    const positionUpdatedMovie = updatedMovieCollection.findIndex(
      (movie) => movie.id === updatedMovie.id
    );
    updatedMovieCollection[positionUpdatedMovie] = updatedMovie;

    setMovieCollection(updatedMovieCollection);
  };

  const handleDelete = (movieToDelete: string) => {
    setMovieCollection(
      movieCollection.filter((movie) => movie.title !== movieToDelete)
    );
  };

  return (
    <Wrapper>
      <Title>Cinematik</Title>
      <Text>Registra la última película que has visto</Text>
      <AddMovieForm onSaveMovie={handleSave} />
      <Text>Mis películas</Text>
      <ShowMovie
        movieCollection={movieCollection}
        onUpdateMovie={handleUpdate}
        onDeleteMovie={handleDelete}
      />
    </Wrapper>
  );
};

export default App;

const Wrapper = styled.div`
  margin: 50px 30%;
  font-family: "Lucida Console", Courier, monospace;
`;

const InnerWrapper = styled.div`
  margin: 0 50px;
`;

const Text = styled.div`
  padding: 20px 0;
  font-size: 20px;
`;

const InformationText = styled.div`
  font-size: 20px;
  color: grey;
`;

const TypeTitle = styled.input`
  margin-left: 15px;
`;

const Title = styled.h1`
  text-transform: uppercase;
`;

const Movie = styled.div`
  border: 1px solid black;
  padding: 5px 10px;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
`;

const Comments = styled.div<{ display: "none" | "block" }>`
  border: 1px solid black;
  padding: 5px 10px;
  display: ${(props) => props.display};
  background-color: #aaaaaa;
  color: white;
`;
