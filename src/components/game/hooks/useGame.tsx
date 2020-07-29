import { useState, useEffect } from "react";
import { DarkSymbol, LightSymbol } from "styles/styles";

// winningLine finds if the provided squares match each other and are filled
const winningLine = (
  square1: string,
  square2: string,
  square3: string,
  square4: string
): boolean => {
  if (
    square1.length > 0 &&
    square2 === square1 &&
    square3 === square1 &&
    square4 === square1
  ) {
    return true;
  }

  return false;
};

// checkForWinner checks each square if there's a winning line
const checkForWinner = (squares: Array<Array<string>>): boolean => {
  for (let row = 0; row < squares.length; row++) {
    for (let col = 0; col < squares[row].length; col++) {
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
        return true;
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
        return true;
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
        return true;
      }
      // Upward diagonal line
      else if (
        row >= 3 &&
        col < squares[row].length - 3 &&
        winningLine(
          squares[row][col],
          squares[row - 1][col + 1],
          squares[row - 2][col + 2],
          squares[row - 3][col + 3]
        )
      ) {
        return true;
      }
    }
  }
  return false;
};

// generateSquares creates a 2d array of empty strings to serve as the board
const generateSquares = (numRows: number, numCols: number) => {
  return Array<Array<string>>(numRows)
    .fill([])
    .map(() => Array<string>(numCols).fill(""));
};

// useGame holds the hooks for the Game component. It keeps track of the board,
// the winner, the current player, and the dimensions of the board. Changes to
// those values will propogate changes in the hooks.
const useGame = (initRow: number, initCol: number) => {
  const [dimensions, setDimensions] = useState({
    numRows: initRow,
    numCols: initCol,
  });
  const [squares, setSquares] = useState([[""]]);
  const [darkIsNext, setDarkIsNext] = useState(true);
  const [winner, setWinner] = useState("");

  // Set the winner if there is a winning state
  useEffect(() => {
    if (checkForWinner(squares)) {
      darkIsNext ? setWinner(LightSymbol) : setWinner(DarkSymbol);
    }
  }, [squares, darkIsNext]);

  // Create a new board if the dimesnions have changed
  useEffect(() => {
    setSquares(generateSquares(dimensions.numRows, dimensions.numCols));
    setWinner("");
  }, [dimensions]);

  // When the winner is reset, make the dark player the starter
  useEffect(() => {
    if (winner.length === 0) {
      setDarkIsNext(true);
    }
  }, [winner]);

  // handleSquareClick adds the new piece and sets the next player
  const handleSquareClick = (row: number, col: number) => {
    let squaresCopy = squares.map((row) => {
      return row.slice();
    });
    squaresCopy[row][col] = darkIsNext ? DarkSymbol : LightSymbol;

    setSquares(squaresCopy);
    setDarkIsNext(!darkIsNext);
  };

  return {
    dimensions,
    setDimensions,
    squares,
    setSquares,
    darkIsNext,
    setDarkIsNext,
    winner,
    setWinner,
    handleSquareClick,
  };
};

export default useGame;
