import React from "react";

import { useGame } from "./hooks";
import { Board, Settings } from "./components";
import { GAME_SYMBOLS } from "constants/";
import Dimensions from "types/dimensions";

const INIT_ROW: number = 6;
const INIT_COL: number = 7;

// Game keeps track of the active player and winners of the Connect Four game
export default function Game(): JSX.Element {
  const {
    dimensions,
    setDimensions,
    squares,
    darkIsNext,
    winner,
    handleSquareClick,
  } = useGame(INIT_ROW, INIT_COL);

  return (
    <div>
      <Board
        squares={squares}
        onClick={(row: number, col: number) => handleSquareClick(row, col)}
        winner={winner}
      />
      <span role="alert">
        {winner.length > 0
          ? "Winner is ".concat(winner)
          : "Next piece: ".concat(
              darkIsNext ? GAME_SYMBOLS.dark : GAME_SYMBOLS.light
            )}
      </span>
      <Settings
        dimensions={dimensions}
        onSubmit={(data: Dimensions) => setDimensions(data)}
      />
    </div>
  );
}
