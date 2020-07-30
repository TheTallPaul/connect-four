import React from "react";
import { Container } from "@material-ui/core";

import { useGame } from "./hooks";
import { Board } from "./components";
import { Settings } from "./components";
import { DARK_SYMBOL, LIGHT_SYMBOL, UseStyles } from "styles/styles";
import { dimensionsFormInput } from "types/form-inputs";

const INIT_ROW = 6;
const INIT_COL = 7;

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
  const classes = UseStyles();

  return (
    <Container maxWidth={false}>
      <Board
        squares={squares}
        onClick={(row: number, col: number) => handleSquareClick(row, col)}
        winner={winner}
      />
      <span className={classes.blueText}>
        {winner.length > 0
          ? "Winner is " + winner
          : "Next piece: ".concat(darkIsNext ? DARK_SYMBOL : LIGHT_SYMBOL)}
      </span>
      <Settings
        dimensions={dimensions}
        onSubmit={(data: dimensionsFormInput) => setDimensions(data)}
      />
    </Container>
  );
}
