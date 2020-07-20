import React, { FC, useState } from "react";
import styled from "styled-components";
import { AddMovieForm } from "./views/AddMovieForm";
import { ShowMovie } from "./views/ShowMovie";

export interface Movie {
  title: string;
  reviews: Array<string>;
  id: number;
  valuation: number;
}

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
          ? movieCollection[movieCollection.length - 1].id + 1
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

  const handleDelete = (movieToDelete: number) => {
    setMovieCollection(
      movieCollection.filter((movie) => movie.id !== movieToDelete)
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

const Text = styled.div`
  padding: 20px 0;
  font-size: 20px;
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
