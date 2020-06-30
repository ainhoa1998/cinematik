import React, { Component } from "react";
import "./App.css";

class App extends Component {
  state = {
    listaPeliculas: "",
  };
  handleClick = () => {
    this.setState({
      listaPeliculas: "Star Wars",
    });
  };
  render() {
    return (
      <div className="App">
        <h1 className="title">Cinematik</h1>
        <label htmlFor="titulo">Titulo:</label>
        <input type="text" id="titulo" />
        <button onClick={this.handleClick}>Guardar</button>
        <div className="listadoPeliculas">{this.state.listaPeliculas}</div>
      </div>
    );
  }
}

export default App;
