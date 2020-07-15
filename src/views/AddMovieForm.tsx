import React, { FC, useState } from "react";
import styled from "styled-components";
import { Button } from "./components/Button";

export const AddMovieForm: FC<{
  onSaveMovie: (movieTitle: string, comment: string) => void;
}> = ({ onSaveMovie }) => {
  const [isError, setIsError] = useState(false);
  const [movieTitle, setMovieTitle] = useState("");
  const [comment, setComment] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setMovieTitle(event.target.value);
  };

  const handleChangeComment = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setComment(event.target.value);
  };

  const handleSave = () => {
    if (movieTitle !== "") {
      onSaveMovie(movieTitle, comment);
      setIsError(false);
    } else {
      setIsError(true);
    }
  };

  return (
    <InnerWrapper>
      <InputBlock>
        <label htmlFor="titulo">Titulo:</label>
        <TypeTitle onChange={handleChange} type="text" id="titulo" />
      </InputBlock>
      <InputBlock>
        <label htmlFor="review">Crítica: </label>
        <input onChange={handleChangeComment} type="text" id="review" />
      </InputBlock>
      {isError && (
        <Error>Debes indicar un título para guardar una película</Error>
      )}
      <Button backgroundColor="red" onClick={handleSave}>
        Guardar
      </Button>
    </InnerWrapper>
  );
};

const InnerWrapper = styled.div`
  margin: 0 50px;
`;

const Error = styled.div`
  padding-top: 10px;
  color: red;
`;

const InputBlock = styled.div`
  padding-bottom: 15px;
`;

const TypeTitle = styled.input`
  margin-left: 15px;
`;
