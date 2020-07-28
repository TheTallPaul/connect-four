import React from "react";
import { ThemeProvider, Container } from "@material-ui/core";

import Game from "./Game";
import { AppTheme, UseStyles } from "./Styles";

const App = () => {
  const classes = UseStyles();

  return (
    <div>
      <header>
        <Container>
          <ThemeProvider theme={AppTheme}>
            <h1 className={classes.blueText}>Connect Four</h1>
            <Game />
          </ThemeProvider>
        </Container>
      </header>
    </div>
  );
};

export default App;
