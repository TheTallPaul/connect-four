import { useState, useEffect, useCallback } from "react";
import GAME_SYMBOLS from "constants/game-symbols";
import Dimensions from "types/dimensions";

// useGame holds the hooks for the Game component. It keeps track of the board,
// the winner, the current player, and the dimensions of the board. Changes to
// those values will propogate changes in the hooks.
export default function useGame(
  initRow: number,
  initCol: number
): {
  dimensions: Dimensions;
  setDimensions: React.Dispatch<React.SetStateAction<Dimensions>>;
  squares: string[][];
  darkIsNext: boolean;
  winner: string;
  handleSquareClick: (row: number, col: number) => void;
} {
  const [dimensions, setDimensions] = useState({
    numRows: initRow,
    numCols: initCol,
  });
  const [squares, setSquares] = useState([[""]]);
  const [darkIsNext, setDarkIsNext] = useState(true);
  const [winner, setWinner] = useState("");

  // Create a new board if the dimensions have changed and reset the winner and
  // active player
  useEffect(() => {
    setSquares(generateSquares(dimensions.numRows, dimensions.numCols));
    setWinner("");
    setDarkIsNext(true);
  }, [dimensions]);

  // Set the winner if there is a winning state
  useEffect(() => {
    if (checkForWinner(squares)) {
      darkIsNext ? setWinner(GAME_SYMBOLS.light) : setWinner(GAME_SYMBOLS.dark);
    }
  }, [squares, darkIsNext]);

  // handleSquareClick adds the new piece and sets the next player
  const handleSquareClick = useCallback(
    (row: number, col: number): void => {
      let squaresCopy = squares.map((row) => {
        return row.slice();
      });
      squaresCopy[row][col] = darkIsNext
        ? GAME_SYMBOLS.dark
        : GAME_SYMBOLS.light;

      setSquares(squaresCopy);
      setDarkIsNext(!darkIsNext);
    },
    [darkIsNext, squares]
  );

  return {
    dimensions,
    setDimensions,
    squares,
    darkIsNext,
    winner,
    handleSquareClick,
  };
}

// generateSquares creates a 2d array of empty strings to serve as the board
const generateSquares = (numRows: number, numCols: number) => {
  return Array<Array<string>>(numRows)
    .fill([])
    .map(() => Array<string>(numCols).fill(""));
};

// checkForWinner checks each square if there's a winning line of four
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
