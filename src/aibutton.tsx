/**
 * Naive implementation of MiniMax for TicTacToe. No caching, no optimization.
 */

import React from "react";
import TTTGrid, { X, O, GridIndex } from "./grid";

export interface AiButtonProps {
  grid: TTTGrid;
  isTurnX: boolean;
  doClick: (i: GridIndex, j: GridIndex) => void;
}

export function AiButton({ grid, isTurnX, doClick }: AiButtonProps) {
  return (
    <button
      className={"ai-button"}
      onClick={() => handleClick(grid, isTurnX, doClick)}
    >
      AI Next Move
    </button>
  );
}

function handleClick(
  grid: TTTGrid,
  isTurnX: boolean,
  doClick: (i: GridIndex, j: GridIndex) => void
) {
  if (grid.isBoardFull()) {
    return;
  }

  const [, move] = miniMax(grid, isTurnX);
  if (move) {
    const [i, j] = move;
    doClick(i, j);
  }
}

// MINIMAX
// X is the maximizer, O is the minimizer
type XWins = 1;
const Xwins: XWins = 1;
type OWins = -1;
const Owins: OWins = -1;
type Draw = 0;
type Score = XWins | Draw | OWins;
type GridPos = [GridIndex, GridIndex];

function miniMax(
  grid: TTTGrid,
  isTurnX: boolean
): [Score, GridPos | undefined] {
  const winner = grid.detectWinner();
  if (winner === X) {
    return [1, undefined];
  } else if (winner === O) {
    return [-1, undefined];
  } else {
    // either draw or not done
    if (grid.isBoardFull()) {
      return [0, undefined];
    } else {
      const minOrMax = isTurnX ? myMax : myMin;
      const playerTurn = isTurnX ? X : O;

      // assume you lose
      let bestScore: Score = isTurnX ? Owins : Xwins;
      let bestMove: GridPos | undefined = undefined;

      for (let [i, j] of grid.possibleMoves()) {
        const [possibleScore] = miniMax(
          grid.withMove(playerTurn, i, j),
          !isTurnX
        );
        bestScore = minOrMax(bestScore, possibleScore);
        bestMove = bestScore === possibleScore ? [i, j] : bestMove;
      }
      return [bestScore, bestMove];
    }
  }
}

// some type safety bs
function myMax(x: Score, y: Score): Score {
  if (x > y) {
    return x;
  } else {
    return y;
  }
}
function myMin(x: Score, y: Score): Score {
  if (x < y) {
    return x;
  } else {
    return y;
  }
}
