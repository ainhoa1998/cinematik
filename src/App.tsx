import React, { FC, useState } from "react";
import styled from "styled-components";
import { Button } from "./components/Button";

interface Movie {
  title: string;
  reviews: Array<string>;
  id: number;
}

const App: FC = () => {
  const [movieTitle, setMovieTitle] = useState("");
  const [comment, setComment] = useState("");
  const [editedComment, setEditedComment] = useState("");
  const [movieCollection, setMovieCollection] = useState<Movie[]>([]);
  const [isError, setIsError] = useState(false);
  const [editingComponent, setEditingComponent] = useState(-1);

  const handleUpdate = (index: number, movieChanged: string) => {
    const updatedMovieCollection = movieCollection;

    updatedMovieCollection[index].title = movieChanged;
    setMovieCollection(updatedMovieCollection);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setMovieTitle(event.target.value);
  };

  const handleChangeComment = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setComment(event.target.value);
  };

  const handleEditComment = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setEditedComment(event.target.value);
  };

  const handleClick = () => {
    if (movieTitle !== "") {
      const newMovie: Movie = {
        title: movieTitle,
        reviews: [comment],
        id:
          movieCollection.length !== 0
            ? movieCollection.map((movie) => {
                return Math.max(movie.id) + 1;
              })[0]
            : 0,
      };
      setIsError(false);
      setMovieCollection([...movieCollection, newMovie]);
    } else {
      setIsError(true);
    }
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
        <Button backgroundColor="red" onClick={handleClick}>
          Guardar
        </Button>
      </InnerWrapper>
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
                      <div>
                        <span>{movie.title}</span>
                      </div>
                      <div>
                        <input
                          type="radio"
                          id="1"
                          name="valoracion"
                          value="1"
                        />
                        <label htmlFor="1">1</label>
                        <input
                          type="radio"
                          id="2"
                          name="valoracion"
                          value="2"
                        />
                        <label htmlFor="2">2</label>
                        <input
                          type="radio"
                          id="3"
                          name="valoracion"
                          value="3"
                        />
                        <label htmlFor="3">3</label>
                        <input
                          type="radio"
                          id="4"
                          name="valoracion"
                          value="4"
                        />
                        <label htmlFor="4">4</label>
                        <input
                          type="radio"
                          id="5"
                          name="valoracion"
                          value="5"
                        />
                        <label htmlFor="5">5</label>
                      </div>
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

const Comments = styled.div`
  border: 1px solid black;
  padding: 5px 10px;
`;

const InputBlock = styled.div`
  padding-bottom: 15px;
`;
