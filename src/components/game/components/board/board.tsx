import React from "react";
import { Grid } from "@material-ui/core";

import Square from "../square";
import { BlankSquareSymbol } from "styles/styles";

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

type boardProps = {
  squares: Array<Array<string>>;
  onClick: (a: number, b: number) => void;
  winner: string;
};

// Board renders the squares of the Connect Four board
const Board = (props: boardProps) => {
  let boardSquares = [];

  // Build the board
  for (let row = 0; row < props.squares.length; row++) {
    let rowSquares = [];
    for (let col = 0; col < props.squares[row].length; col++) {
      rowSquares.push(
        <Square
          piece={
            props.squares[row][col].length > 0
              ? props.squares[row][col]
              : BlankSquareSymbol
          }
          onClick={() => props.onClick(row, col)}
          key={col}
          legal={
            props.winner.length > 0
              ? false
              : legalSquare(props.squares, row, col)
          }
        />
      );
    }
    boardSquares.push(
      <Grid container item spacing={0} key={row}>
        {rowSquares}
      </Grid>
    );
  }

  return (
    <Grid container item spacing={0}>
      {boardSquares}
    </Grid>
  );
};

export default Board;
