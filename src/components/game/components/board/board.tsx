import React from "react";
import { Grid } from "@material-ui/core";

import { Square } from "..";
import GAME_SYMBOLS from "constants/game-symbols";

type boardProps = {
  squares: Array<Array<string>>;
  onClick(a: number, b: number): void;
  winner: string;
};

// Board renders the squares of the Connect Four board
export default function Board({
  squares,
  onClick,
  winner,
}: boardProps): JSX.Element {
  return (
    <Grid container item spacing={0} role="grid">
      {squares.map((row, rowIndex) => {
        let squareRow = row.map((square, colIndex) => {
          return (
            <Square
              piece={
                squares[rowIndex][colIndex].length > 0
                  ? squares[rowIndex][colIndex]
                  : GAME_SYMBOLS.blank
              }
              onClick={() => onClick(rowIndex, colIndex)}
              key={colIndex}
              legal={
                winner.length > 0
                  ? false
                  : legalSquare(squares, rowIndex, colIndex)
              }
              id={rowIndex.toString() + "-" + colIndex.toString()}
            />
          );
        });
        return (
          <Grid container item spacing={0} key={rowIndex} role="row">
            {squareRow}
          </Grid>
        );
      })}
    </Grid>
  );
}

// legalSquare determines if it is legal to place a game piece at the provided
// coordinates
const legalSquare = (
  squares: Array<Array<string>>,
  row: number,
  col: number
): boolean => {
  // No existing piece at spot and is on bottom row or above a placed piece
  if (
    squares[row][col].length === 0 &&
    (row === squares.length - 1 || squares[row + 1][col].length > 0)
  ) {
    return true;
  }

  return false;
};
