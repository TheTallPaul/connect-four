import React from "react";
import { Grid } from "@material-ui/core";

import { Square } from "..";
import { BLANK_SYMBOL } from "styles/styles";

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
    <Grid container item spacing={0}>
      {buildBoardSquares(squares, onClick, winner)}
    </Grid>
  );
}

// buildBoardSquares constructs a 2d grid of Squares based on the provided
// squares array. Squares that are not legal for play are disabled.
const buildBoardSquares = (
  squares: Array<Array<string>>,
  onClick: (a: number, b: number) => void,
  winner: string
): JSX.Element[] => {
  let boardSquares = [];

  for (let row = 0; row < squares.length; row++) {
    let rowSquares = [];
    for (let col = 0; col < squares[row].length; col++) {
      rowSquares.push(
        <Square
          piece={
            squares[row][col].length > 0 ? squares[row][col] : BLANK_SYMBOL
          }
          onClick={() => onClick(row, col)}
          key={col}
          legal={winner.length > 0 ? false : legalSquare(squares, row, col)}
        />
      );
    }
    boardSquares.push(
      <Grid container item spacing={0} key={row}>
        {rowSquares}
      </Grid>
    );
  }

  return boardSquares;
};

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
