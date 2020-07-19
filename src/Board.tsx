import React from "react";
import { Grid } from "@material-ui/core";

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
    squares[row][col].length === 0 &&
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
  for (let rowIndex = 0; rowIndex < props.squares.length; rowIndex++) {
    let rowSquares = [];
    for (
      let colIndex = 0;
      colIndex < props.squares[rowIndex].length;
      colIndex++
    ) {
      rowSquares.push(
        <Square
          piece={
            props.squares[rowIndex][colIndex].length > 0
              ? props.squares[rowIndex][colIndex]
              : blankSquareSymbol
          }
          onClick={() => props.onClick(rowIndex, colIndex)}
          key={colIndex}
          legal={legalSquare(props.squares, rowIndex, colIndex)}
        />
      );
    }
    boardSquares.push(
      <Grid container item spacing={0} key={rowIndex}>
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
