import React from "react";
import "./index.css";
import { Board } from "./board";
import { AiButton } from "./aibutton";
import TTTGrid, { X, O, GridIndex } from "./grid";

interface GameState {
  history: Array<TTTGrid>;
  stepNumber: number;
  xIsNext: boolean;
}

export default class Game extends React.PureComponent<any, GameState> {
  constructor(props: any) {
    super(props);

    this.state = {
      history: [new TTTGrid()],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  render() {
    const history = this.state.history;
    const currentGrid = history[this.state.stepNumber];
    const winner = currentGrid.detectWinner();

    const moves = history.map((grid, gridNumber) => {
      const desc = gridNumber
        ? "Go to move #" + gridNumber
        : "Go to game start";
      return (
        <li key={grid.uniqueId()}>
          <button onClick={() => this.jumpTo(gridNumber)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? X : O);
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            grid={currentGrid}
            onClick={(i, j) => this.handleClick(i, j)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <AiButton
            grid={currentGrid}
            isTurnX={this.state.xIsNext}
            doClick={(i, j) => this.handleClick(i, j)}
          />
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }

  handleClick(i: GridIndex, j: GridIndex) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const currentGrid = history[history.length - 1];
    if (currentGrid.valAtPos(i, j) || currentGrid.detectWinner()) {
      return;
    }

    const pieceToPlay = this.state.xIsNext ? X : O;
    const nextGrid = currentGrid.withMove(pieceToPlay, i, j);
    const historyUntilNow = history.slice(0, this.state.stepNumber + 1);

    this.setState({
      history: [...historyUntilNow, nextGrid],
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(stepNumber: number) {
    this.setState({
      stepNumber: stepNumber,
      xIsNext: stepNumber % 2 === 0,
    });
  }
}
