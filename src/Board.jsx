import React from "react";
import { Grid } from "@material-ui/core";

import Square from "./Square";

// Board renders the squares of the Connect Four board
function Board(props) {
  let boardSquares = [];

  // Build the board
  for (const [rowIndex, row] of props.squares.entries()) {
    let rowSquares = [];
    for (let colIndex in row) {
      rowSquares.push(
        <Square
          piece={props.squares[rowIndex][colIndex]}
          onClick={() => props.onClick(rowIndex, colIndex)}
          key={row + colIndex + rowIndex}
        />
      );
    }
    boardSquares.push(
      <Grid container item spacing={0} key={row + rowIndex}>
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
