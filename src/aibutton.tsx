/**
 * Naive implementation of MiniMax for TicTacToe. No caching, no optimization.
 */

import React from "react";
import TTTGrid, { X, O } from "./grid";

export interface AiButtonProps {
  grid: TTTGrid;
  isTurnX: boolean;
}

export function AiButton({ grid, isTurnX }: AiButtonProps) {
  return (
    <button onClick={() => onClick(grid, isTurnX)}>Do Best Next Move</button>
  );
}

function onClick(grid: TTTGrid, isTurnX: boolean) {
  const move = miniMax(grid, isTurnX);
  if (move !== -1 && move !== 1) {
    // this.clickSquare(...move);
  }
}

// MINIMAX

function miniMax(grid: TTTGrid, isTurnX: boolean) {
  // FIxZME wtfff
  // base case
  const winner = grid.detectWinner();
  if (winner === X) {
    return 1;
  } else if (winner === O) {
    return -1;
  } else if (grid.isBoardFull()) {
    return 0;
  }
}

// map integer representation of board state to win 1, loss -1, or draw 0 for X
const m = new Map();
