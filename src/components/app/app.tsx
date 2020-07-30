import React from "react";
import { ThemeProvider } from "@material-ui/core";

import Game from "../game";
import { AppTheme, UseStyles } from "styles/styles";

export default function App(): JSX.Element {
  const classes = UseStyles();

  return (
    <div>
      <header>
        <ThemeProvider theme={AppTheme}>
          <h1 className={classes.blueText}>Connect Four</h1>
          <Game />
        </ThemeProvider>
      </header>
    </div>
  );
}
