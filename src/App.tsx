import React, { Component } from "react";

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
      <>
        <h1>Cinematik</h1>
        <form>
          <label htmlFor="titulo">Titulo</label>
          <input type="text" id="titulo" />
        </form>
        <button onClick={this.handleClick}>Guardar</button>
        <div>{this.state.listaPeliculas}</div>
      </>
    );
  }
}

export default App;
