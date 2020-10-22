import React from 'react';

import { Square } from './square';
import TTTGrid, { GridIndex } from './grid';

export interface BoardProps {
  grid: TTTGrid,
  onClick: (i: GridIndex, j: GridIndex) => void
}

export function Board({ grid, onClick }: BoardProps) {
  return (
    <div>
      <div className="board-row">
        {renderSquare(0,0, grid, onClick)}
        {renderSquare(0,1, grid, onClick)}
        {renderSquare(0,2, grid, onClick)}
      </div>
      <div className="board-row">
        {renderSquare(1,0, grid, onClick)}
        {renderSquare(1,1, grid, onClick)}
        {renderSquare(1,2, grid, onClick)}
      </div>
      <div className="board-row">
        {renderSquare(2,0, grid, onClick)}
        {renderSquare(2,1, grid, onClick)}
        {renderSquare(2,2, grid, onClick)}
      </div>
    </div>
  );
}

function renderSquare(
  i: GridIndex,
  j: GridIndex,
  grid: TTTGrid,
  onClick: (i: GridIndex, j: GridIndex) => void
) {
  return (
      <Square
        value={ grid.valAtPos(i, j) }
        onClick={ () => onClick(i,j) }
      />
  );
}
