
import React, { MouseEventHandler } from 'react';
import { CellValue } from './grid';

export interface SquareProps {
  value: CellValue,
  onClick: MouseEventHandler 
}

function Square({ value, onClick }: SquareProps) {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
}

export { Square };
