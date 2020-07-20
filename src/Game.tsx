import React, { useState, useEffect } from "react";
import Board from "./Board";

export function SquareFilled(square: string): boolean {
  return square.length > 0;
}

// winningLine finds if the provided squares match each other and are filled
function winningLine(
  square1: string,
  square2: string,
  square3: string,
  square4: string
): boolean {
  if (
    SquareFilled(square1) &&
    square2 === square1 &&
    square3 === square1 &&
    square4 === square1
  ) {
    return true;
  }

  return false;
}

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
  const [winner, setWinner] = useState("");

  // handleClick adds the new piece and sets the next player
  const handleClick = (row: number, col: number) => {
    let squaresCopy = squares.map((row) => {
      return row.slice();
    });
    squaresCopy[row][col] = darkIsNext ? darkSymbol : lightSymbol;

    setSquares(squaresCopy);
    setDarkIsNext(!darkIsNext);
  };

  useEffect(() => {
    // Check if there's a winner and if so, set the winner
    for (let row = 0; row < squares.length; row++) {
      for (let col = 0; col < squares[row].length; col++) {
        let winnerFound = false;
        // Horizontal line
        if (
          col < squares[row].length - 3 &&
          winningLine(
            squares[row][col],
            squares[row][col + 1],
            squares[row][col + 2],
            squares[row][col + 3]
          )
        ) {
          winnerFound = true;
        }
        // Vertical line
        else if (
          row < squares.length - 3 &&
          winningLine(
            squares[row][col],
            squares[row + 1][col],
            squares[row + 2][col],
            squares[row + 3][col]
          )
        ) {
          winnerFound = true;
        }

        // Downward diagonal line
        else if (
          row < squares.length - 3 &&
          col < squares[row].length - 3 &&
          winningLine(
            squares[row][col],
            squares[row + 1][col + 1],
            squares[row + 2][col + 2],
            squares[row + 3][col + 3]
          )
        ) {
          winnerFound = true;
        }
        // Upward diagonal line
        else if (
          row > squares.length - 4 &&
          col < squares[row].length - 3 &&
          winningLine(
            squares[row][col],
            squares[row - 1][col + 1],
            squares[row - 2][col + 2],
            squares[row - 3][col + 3]
          )
        ) {
          winnerFound = true;
        }

        if (winnerFound) {
          !darkIsNext ? setWinner(darkSymbol) : setWinner(lightSymbol);
        }
      }
    }
  }, [squares, darkIsNext]);

  return (
    <div>
      <Board
        squares={squares}
        onClick={(row: number, col: number) => handleClick(row, col)}
      />
      {winner}
    </div>
  );
}

export default Game;
