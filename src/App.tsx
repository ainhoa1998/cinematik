import React, { FC, useState } from "react";
import styled from "styled-components";

const App: FC = () => {
  const [movie, setMovie] = useState("");
  const [movieCollection, setMovieCollection] = useState<string[]>([]);
  const [isError, setIsError] = useState(false);

  const handleChange = (event: any) => {
    event.preventDefault();
    setMovie(event.target.value);
  };

  const handleClick = () => {
    setIsError(movie === "");
    if (!isError) {
      setMovieCollection([...movieCollection, movie]);
    }
  };

  return (
    <Wrapper>
      <Title>Cinematik</Title>
      <Text>Registra la última película que has visto</Text>
      <div>
        <label htmlFor="titulo">Titulo:</label>
        <TypeTitle onChange={handleChange} type="text" id="titulo" />
      </div>
      <ButtonGuardar onClick={handleClick}>Guardar</ButtonGuardar>
      {isError && (
        <Error>Debes indicar un título para guardar una película</Error>
      )}

      <MovieCollection>
        {movieCollection.map((movie, index) => {
          return <Movie key={index}>{movie}</Movie>;
        })}
      </MovieCollection>
    </Wrapper>
  );
};

export default App;

const Wrapper = styled.div`
  margin: 50px 500px;
  font-family: "Lucida Console", Courier, monospace;
`;

const Text = styled.div`
  padding: 0 0 20px;
`;

const MovieCollection = styled.div`
  padding: 10px;
`;

const ButtonGuardar = styled.button`
  margin-top: 10px;
  background-color: white;
  padding: 5px;
`;

const TypeTitle = styled.input`
  margin-left: 15px;
`;

const Title = styled.h1`
  text-transform: uppercase;
`;

const Error = styled.div`
  color: red;
`;

const Movie = styled.div`
  border: 1px solid black;
  padding: 5px;
`;
