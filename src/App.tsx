import React, { FC, useState } from "react";
import styled from "styled-components";

const App: FC = () => {
  const [movie, setMovie] = useState("");
  const [movieList, setMovieList] = useState<string[]>([]);

  const handleChange = (event: any) => {
    event.preventDefault();
    setMovie(event.target.value);
  };

  const handleClick = () => {
    setMovieList([...movieList, movie]);
  };

  return (
    <Wrapper>
      <Title>Cinematik</Title>
      <label htmlFor="titulo">Titulo:</label>
      <TypeTitle onChange={handleChange} type="text" id="titulo" />
      <button onClick={handleClick}>Guardar</button>
      <MovieList>
        {movieList.map((movie, index) => {
          return <div key={index}>{movie}</div>;
        })}
      </MovieList>
    </Wrapper>
  );
};

export default App;

const Wrapper = styled.div`
  padding: 30px;
  background-color: antiquewhite;
  text-align: center;
  box-shadow: 11px 10px 5px 0px rgba(0, 0, 0, 0.47);
`;

const MovieList = styled.div`
  padding: 10px;
`;

const TypeTitle = styled.input`
  margin-left: 15px;
`;

const Title = styled.h1`
  text-transform: uppercase;
`;
