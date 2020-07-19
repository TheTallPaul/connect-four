import React, { useState } from "react";
import Board from "./Board";

// Game keeps track of the active player and winners of the Connect Four game
function Game() {
  const numRows = 6;
  const numCols = 7;

  const darkSymbol = "\u2B24"; // ⬤
  const lightSymbol = "\u25Ef"; // ◯

  const [darkIsNext, setDarkIsNext] = useState(true);
  const [squares, setSquares] = useState(
    Array<Array<string>>(numRows)
      .fill([])
      .map(() => Array<string>(numCols).fill(""))
  );

  // handleClick adds the new piece and sets the next player
  function handleClick(row: number, col: number) {
    let squaresCopy = squares.map((row) => {
      return row.slice();
    });
    squaresCopy[row][col] = darkIsNext ? darkSymbol : lightSymbol;

    setSquares(squaresCopy);
    setDarkIsNext(!darkIsNext);
  }

  return (
    <Board
      squares={squares}
      onClick={(row: number, col: number) => handleClick(row, col)}
    />
  );
}

export default Game;
