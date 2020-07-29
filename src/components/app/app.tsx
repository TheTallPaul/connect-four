import React from "react";
import { ThemeProvider, Container } from "@material-ui/core";

import Game from "../game";
import { AppTheme, UseStyles } from "styles/styles";

export default function App() {
  const classes = UseStyles();

  return (
    <div>
      <header>
        <Container maxWidth={false}>
          <ThemeProvider theme={AppTheme}>
            <h1 className={classes.blueText}>Connect Four</h1>
            <Game />
          </ThemeProvider>
        </Container>
      </header>
    </div>
  );
}
