import React from 'react';
import './App.css';
import Game from "./game"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Tic Tac Toe
      </header>
      <div className="Game-container">
        <Game />
      </div>
    </div>
  );
}

export default App;
