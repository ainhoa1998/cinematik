import React, { FC, useState } from "react";
import styled from "styled-components";

const App: FC = () => {
  const [movieList, setMovieList] = useState("");
  const handleClick = (event: any) => {
    alert(movieList);
  };

  const handleChange = (event: any) => {
    event.preventDefault();
    setMovieList(event.target.value);
    console.log(event.target.value);
  };

  return (
    <StyledApp>
      <Title>Cinematik</Title>
      <form onSubmit={handleClick}>
        <div>
          <label htmlFor="titulo">Titulo:</label>
          <TypeTitle onChange={handleChange} type="text" id="titulo" />
          <button>Guardar</button>
        </div>
      </form>
      <MovieList>{movieList}</MovieList>
    </StyledApp>
  );
};

export default App;

const StyledApp = styled.div`
  padding: 30px;
  background-color: antiquewhite;
  text-align: center;
  -webkit-box-shadow: 11px 10px 5px 0px rgba(0, 0, 0, 0.47);
  -moz-box-shadow: 11px 10px 5px 0px rgba(0, 0, 0, 0.47);
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
