/**
 * TicTacToe Grid object TTTGrid
 *  + companion types and functions (X, O, CellValue, Row, Grid)
 */

// tic tac toe, rows of x's and o's
export type Xtype = "X";
export type Otype = "O";
export const X: Xtype = "X";
export const O: Otype = "O";
export type CellValue = Xtype | Otype | undefined;
export type Row = [CellValue, CellValue, CellValue];
export type Grid = [Row, Row, Row];
export type GridIndex = 0 | 1 | 2;

const zero: GridIndex = 0;
const one: GridIndex = 1;
const two: GridIndex = 2;
const gridIndices: Array<GridIndex> = [zero, one, two];

const boardLines = [
  // horizontal lines
  [
    [0, 0],
    [0, 1],
    [0, 2],
  ],
  [
    [1, 0],
    [1, 1],
    [1, 2],
  ],
  [
    [2, 0],
    [2, 1],
    [2, 2],
  ],
  // vertical lines
  [
    [0, 0],
    [1, 0],
    [2, 0],
  ],
  [
    [0, 1],
    [1, 1],
    [2, 1],
  ],
  [
    [0, 2],
    [1, 2],
    [2, 2],
  ],
  // diagonal lines
  [
    [0, 0],
    [1, 1],
    [2, 2],
  ],
  [
    [2, 0],
    [1, 1],
    [0, 2],
  ],
];

const defaultGrid = function (): Grid {
  return [
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
  ];
};

const copyGrid = function (grid: Grid): Grid {
  let copy = defaultGrid();
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid.length; j++) {
      copy[i][j] = grid[i][j];
    }
  }
  return copy;
};

const cellValueAsInt = function (v: CellValue): GridIndex {
  if (v === undefined) {
    return 0;
  } else if (v === X) {
    return 1;
  } else {
    // v === O
    return 2;
  }
};

const add = (x: number, y: number): number => x + y;

/**
 * TicTacToe Grid
 */
export default class TTTGrid {
  private readonly dim: number = 3;
  private readonly grid: Grid;

  constructor(grid: Grid | undefined = undefined) {
    this.grid = grid || defaultGrid();
  }

  detectWinner(): CellValue {
    let winner: CellValue = undefined;
    for (let line of boardLines) {
      let xs_and_os = line.map((pos) => this.grid[pos[0]][pos[1]]);

      if (xs_and_os.every((x_or_o) => x_or_o === X)) {
        winner = X;
        break;
      } else if (xs_and_os.every((x_or_o) => x_or_o === O)) {
        winner = O;
        break;
      }
    }
    return winner;
  }

  forEachCell(f: (i: number, j: number, v: CellValue) => void) {
    for (let i = 0; i < this.dim; i++) {
      for (let j = 0; j < this.dim; j++) {
        f(i, j, this.grid[i][j]);
      }
    }
  }

  valAtPos(i: GridIndex, j: GridIndex): CellValue {
    return this.grid[i][j];
  }

  isBoardFull(): boolean {
    let retval = true;
    this.grid.forEach((row) =>
      row.forEach((cell) => {
        if (cell === undefined) {
          retval = false;
        }
      })
    );
    return retval;
  }

  *possibleMoves(): Generator<[GridIndex, GridIndex]> {
    for (let i of gridIndices) {
      for (let j of gridIndices) {
        if (this.grid[i][j] === undefined) {
          yield [i, j];
        }
      }
    }
  }

  /**
   * @param {CellValue} playerTurn the value to assign to cell (i,j)
   * @param {number} i row index in range [0, 1, 2]
   * @param {number} j row index in range [0, 1, 2]
   * @return {TTTGrid} the current grid, but the cell at (i,j) has value playerTurn
   */
  withMove(playerTurn: CellValue, i: number, j: number): TTTGrid {
    const retval = copyGrid(this.grid);
    retval[i][j] = playerTurn;
    return new TTTGrid(retval);
  }

  uniqueId(): number {
    const cells: Array<CellValue> = this.grid.flat();
    return (
      cells
        // a cell can be on of three values (X, O, undefined), so we need at least 2 bits per cell
        .map((v, i) => {
          return cellValueAsInt(v) << (i * 2);
        })
        .reduce(add, 0)
    );
  }

  // all 8 equivalent board states by symmetry and rotation
  private *equivalentGrids() {
    const grid = copyGrid(this.grid);
    yield grid;

    yield [
      [grid[0][0], grid[1][0], grid[2][0]], // a a b
      [grid[0][1], grid[1][1], grid[2][1]], // * * b
      [grid[0][2], grid[1][2], grid[2][2]], // * * *
    ];
    yield [
      [grid[0][0], grid[1][0], grid[2][0]], // a a *
      [grid[0][1], grid[1][1], grid[2][1]], // * * *
      [grid[0][2], grid[1][2], grid[2][2]], // * b b
    ];
    yield [
      [grid[0][0], grid[1][0], grid[2][0]], // a a *
      [grid[0][1], grid[1][1], grid[2][1]], // b * *
      [grid[0][2], grid[1][2], grid[2][2]], // b * *
    ];

    const flip = [
      [grid[2][0], grid[2][1], grid[2][2]], // a a a
      [grid[1][0], grid[1][1], grid[1][2]], // - - -
      [grid[0][0], grid[0][1], grid[0][2]], // b b b
    ];
    yield flip;

    yield [
      [flip[0][0], flip[1][0], flip[2][0]], // a a b
      [flip[0][1], flip[1][1], flip[2][1]], // * * b
      [flip[0][2], flip[1][2], flip[2][2]], // * * *
    ];
    yield [
      [flip[0][0], flip[1][0], flip[2][0]], // a a *
      [flip[0][1], flip[1][1], flip[2][1]], // * * *
      [flip[0][2], flip[1][2], flip[2][2]], // * b b
    ];
    yield [
      [flip[0][0], flip[1][0], flip[2][0]], // a a *
      [flip[0][1], flip[1][1], flip[2][1]], // b * *
      [flip[0][2], flip[1][2], flip[2][2]], // b * *
    ];
  }
}
