import React from "react";
import { Grid } from "@material-ui/core";

import { SquareFilled } from "./Game";
import Square from "./Square";

// legalSquare determines if it is legal to place a game piece at the provided
// coordinates
function legalSquare(
  squares: Array<Array<string>>,
  row: number,
  col: number
): boolean {
  // No existing piece at spot and is on bottom row or above a placed piece
  if (
    !SquareFilled(squares[row][col]) &&
    (row === squares.length - 1 || squares[row + 1][col].length > 0)
  ) {
    return true;
  }

  return false;
}

type boardProps = {
  squares: Array<Array<string>>;
  onClick: (a: number, b: number) => void;
};

// Board renders the squares of the Connect Four board
function Board(props: boardProps) {
  const blankSquareSymbol = "_";
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
              : blankSquareSymbol
          }
          onClick={() => props.onClick(row, col)}
          key={col}
          legal={legalSquare(props.squares, row, col)}
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
}

export default Board;
