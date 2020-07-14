import React, { FC, useState } from "react";
import styled from "styled-components";
import { Button } from "./components/Button";

const App: FC = () => {
  const [movie, setMovie] = useState("");
  const [comment, setComment] = useState("");
  const [movieCollection, setMovieCollection] = useState<string[]>([]);
  const [commentCollection, setCommentCollection] = useState<string[]>([]);
  const [isError, setIsError] = useState(false);
  const [editingComponent, setEditingComponent] = useState(-1);

  //En el segundo input en vez de handleClick
  const handleUpdate = (index: number, movieChanged: string) => {
    const updatedMovieCollection = movieCollection;

    updatedMovieCollection[index] = movieChanged;
    setMovieCollection(updatedMovieCollection);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setMovie(event.target.value);
  };

  const handleChangeComment = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setComment(event.target.value);
  };

  const handleClick = () => {
    if (movie !== "") {
      setIsError(false);
      setMovieCollection([...movieCollection, movie]);
    } else {
      setIsError(true);
    }
  };

  const handleClickComment = () => {
    setCommentCollection([...commentCollection, comment]);
  };

  const handleDelete = (selectedMovie: string) => {
    setMovieCollection(
      movieCollection.filter((movie) => movie !== selectedMovie)
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
      <InnerWrapper>
        <div>
          <label htmlFor="titulo">Titulo:</label>
          <TypeTitle onChange={handleChange} type="text" id="titulo" />
        </div>
        {isError && (
          <Error>Debes indicar un título para guardar una película</Error>
        )}
        <Button backgroundColor="white" onClick={handleClick}>
          Guardar
        </Button>
      </InnerWrapper>
      <Text>Mis películas</Text>
      <InnerWrapper>
        {movieCollection.length !== 0 ? (
          movieCollection.map((movie, index) => {
            return (
              <>
                <Movie key={index}>
                  {editingComponent === index ? (
                    <div>
                      <label htmlFor="editarTitulo">Edita el título: </label>
                      <TypeTitle
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>
                        ) => handleUpdate(index, event.target.value)}
                        type="text"
                        id="editarTitulo"
                        placeholder={movie}
                      />
                      <br></br>
                      <label htmlFor="comment">Escribe un comentario: </label>
                      <TypeTitle
                        onChange={handleChangeComment}
                        type="text"
                        id="comment"
                      />
                    </div>
                  ) : (
                    <span>{movie}</span>
                  )}
                  <div>
                    <Button
                      backgroundColor="orange"
                      color="white"
                      onClick={() => handleEdit(index)}
                    >
                      {editingComponent === index ? (
                        <span onClick={handleClickComment}>Guardar título</span>
                      ) : (
                        <span>Editar</span>
                      )}
                    </Button>
                    <Button
                      backgroundColor="red"
                      color="white"
                      onClick={() => handleDelete(movie)}
                    >
                      Eliminar
                    </Button>
                  </div>
                </Movie>
                <div>
                  {commentCollection.map((comment, index) => {
                    return <div key={index}>{comment}</div>;
                  })}
                </div>
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
  padding: 0 0 20px;
  font-size: 20px;
`;

const Error = styled.div`
  padding-top: 10px;
  color: red;
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
