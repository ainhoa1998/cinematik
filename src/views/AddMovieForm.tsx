import React, { FC, useState } from "react";
import styled from "styled-components";
import { Button } from "./components/Button";

export const AddMovieForm: FC<{
  onSaveMovie: (movieTitle: string, comment: string, valuation: number) => void;
}> = ({ onSaveMovie }) => {
  const [isError, setIsError] = useState(false);
  const [movieTitle, setMovieTitle] = useState("");
  const [comment, setComment] = useState("");
  const [valuation, setValuation] = useState(0);

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
      onSaveMovie(movieTitle, comment, valuation);
      setIsError(false);
    } else {
      setIsError(true);
    }
  };

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setValuation(event.target.value.charCodeAt(0) - 48);
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
      <InputBlock>
        <span>Crítica: </span>
        <input
          type="radio"
          id="1"
          name="valoracion"
          value="1"
          checked={valuation === 1}
          onChange={handleOptionChange}
        />
        <label htmlFor="1">1</label>
        <input
          type="radio"
          id="2"
          name="valoracion"
          value="2"
          checked={valuation === 2}
          onChange={handleOptionChange}
        />
        <label htmlFor="2">2</label>
        <input
          type="radio"
          id="3"
          name="valoracion"
          value="3"
          checked={valuation === 3}
          onChange={handleOptionChange}
        />
        <label htmlFor="3">3</label>
        <input
          type="radio"
          id="4"
          name="valoracion"
          value="4"
          checked={valuation === 4}
          onChange={handleOptionChange}
        />
        <label htmlFor="4">4</label>
        <input
          type="radio"
          id="5"
          name="valoracion"
          value="5"
          checked={valuation === 5}
          onChange={handleOptionChange}
        />
        <label htmlFor="5">5</label>
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
