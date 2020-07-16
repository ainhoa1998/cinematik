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

const App: FC = () => {
  const [editedComment, setEditedComment] = useState("");
  const [movieCollection, setMovieCollection] = useState<Movie[]>([]);

  const [editingComponent, setEditingComponent] = useState(-1);

  const handleUpdate = (index: number, movieChanged: string) => {
    const updatedMovieCollection = movieCollection;

    updatedMovieCollection[index].title = movieChanged;
    setMovieCollection(updatedMovieCollection);
  };

  const handleEditComment = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setEditedComment(event.target.value);
  };

  const handleSave = (
    movieTitle: string,
    comment: string,
    valuation: number
  ) => {
    const newMovie: Movie = {
      title: movieTitle,
      reviews: [comment],
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

  const handleClickComment = (movieTitle: string) => {
    const updatedMovieCollection = movieCollection;
    const movieUpdated = updatedMovieCollection.find(
      (movie) => movie.title === movieTitle
    );
    movieUpdated?.reviews.push(editedComment);
    setMovieCollection(updatedMovieCollection);
  };

  const handleDelete = (selectedMovie: string) => {
    setMovieCollection(
      movieCollection.filter((movie) => movie.title !== selectedMovie)
    );
  };

  const handleEdit = (index: number) => {
    if (editingComponent < 0) {
      setEditingComponent(index);
    } else {
      setEditingComponent(-1);
    }
  };

  return (
    <Wrapper>
      <Title>Cinematik</Title>
      <Text>Registra la última película que has visto</Text>
      <AddMovieForm onSaveMovie={handleSave} />
      <Text>Mis películas</Text>
      <InnerWrapper>
        {movieCollection.length !== 0 ? (
          movieCollection.map((movie) => {
            return (
              <>
                <Movie key={movie.id}>
                  {editingComponent === movie.id ? (
                    <div>
                      <div>
                        <label htmlFor="editarTitulo">Edita el título: </label>
                        <TypeTitle
                          onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                          ) => handleUpdate(movie.id, event.target.value)}
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
                    </>
                  )}
                  <div>
                    <Button
                      backgroundColor="orange"
                      onClick={() => handleEdit(movie.id)}
                    >
                      {editingComponent === movie.id ? (
                        <span onClick={() => handleClickComment(movie.title)}>
                          Guardar título
                        </span>
                      ) : (
                        <span>Editar</span>
                      )}
                    </Button>
                    <Button
                      backgroundColor="red"
                      onClick={() => handleDelete(movie.title)}
                    >
                      Eliminar
                    </Button>
                  </div>
                </Movie>

                <Comments>
                  {movie.reviews.length !== 0
                    ? movie.reviews.map((comment, index) => {
                        return <div key={index}>{comment}</div>;
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
`;

const Comments = styled.div`
  border: 1px solid black;
  padding: 5px 10px;
`;
