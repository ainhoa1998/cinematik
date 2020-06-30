import React, { FC, useState } from "react";
import "./App.css";

const App: FC = () => {
  const [listaPeliculas, setListaPeliculas] = useState("");
  const handleClick = () => {
    setListaPeliculas("Star Wars");
  };

  return (
    <div className="App">
      <h1 className="title">Cinematik</h1>
      <label htmlFor="titulo">Titulo:</label>
      <input type="text" id="titulo" />
      <button onClick={handleClick}>Guardar</button>
      <div className="listadoPeliculas">{listaPeliculas}</div>
    </div>
  );
};

export default App;
