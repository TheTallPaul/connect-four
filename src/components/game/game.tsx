import React from "react";

import useGame from "./hooks";
import { Board } from "./components";
import { Settings } from "./components";
import { DarkSymbol, LightSymbol, UseStyles } from "styles/styles";
import { DimensionsFormInput } from "types/types";

// Game keeps track of the active player and winners of the Connect Four game
const Game = () => {
  const initRow = 6;
  const initCol = 7;
  const {
    dimensions,
    setDimensions,
    squares,
    darkIsNext,
    winner,
    handleSquareClick,
  } = useGame(initRow, initCol);
  const classes = UseStyles();

  return (
    <div>
      <Board
        squares={squares}
        onClick={(row: number, col: number) => handleSquareClick(row, col)}
        winner={winner}
      />
      <span className={classes.blueText}>
        {winner.length > 0
          ? "Winner is " + winner
          : "Next piece: ".concat(darkIsNext ? DarkSymbol : LightSymbol)}
      </span>
      <Settings
        dimensions={dimensions}
        onSubmit={(data: DimensionsFormInput) => setDimensions(data)}
      />
    </div>
  );
};

export default Game;
