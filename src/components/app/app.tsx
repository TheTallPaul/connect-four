import React from "react";
import { ThemeProvider, Container } from "@material-ui/core";

import Game from "../game";
import { AppTheme, UseStyles } from "styles/styles";

export default function App(): JSX.Element {
  const classes = UseStyles();

  return (
    <div>
      <header>
        <ThemeProvider theme={AppTheme}>
          <Container maxWidth={false}>
            <h1 className={classes.blueText}>Connect Four</h1>
            <Game />
          </Container>
        </ThemeProvider>
      </header>
    </div>
  );
}
