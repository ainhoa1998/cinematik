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
    if (movie !== "") {
      setIsError(false);
      setMovieCollection([...movieCollection, movie]);
    } else {
      setIsError(true);
    }
  };

  return (
    <Wrapper>
      <Title>Cinematik</Title>
      <Text>Registra la última película que has visto</Text>
      <InnerWrapper>
        <div>
          <label htmlFor="titulo">Titulo:</label>
          <TypeTitle onChange={handleChange} type="text" id="titulo" />
        </div>
        {isError && (
          <Error>Debes indicar un título para guardar una película</Error>
        )}
        <ButtonGuardar onClick={handleClick}>Guardar</ButtonGuardar>
      </InnerWrapper>
      <Text>Mis películas</Text>
      <InnerWrapper data-testid="movieList">
        {movieCollection.length !== 0 ? (
          movieCollection.map((movie, index) => {
            return <Movie key={index}>{movie}</Movie>;
          })
        ) : (
          <div>No tiene películas añadidas</div>
        )}
      </InnerWrapper>
    </Wrapper>
  );
};

export default App;

const Wrapper = styled.div`
  margin: 50px 500px;
  font-family: "Lucida Console", Courier, monospace;
`;

const InnerWrapper = styled.div`
  margin: 0 50px;
`;

const Text = styled.div`
  padding: 0 0 20px;
  font-size: 20px;
`;

const ButtonGuardar = styled.button`
  margin: 10px 0 50px;
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
  padding-top: 10px;
  color: red;
`;

const Movie = styled.div`
  border: 1px solid black;
  padding: 5px 10px;
`;
