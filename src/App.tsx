import React from "react";
import { ThemeProvider, Container } from "@material-ui/core";

import Game from "./Game";
import { AppTheme } from "./Styles";

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Container>
          <ThemeProvider theme={AppTheme}>
            <h1>Connect Four</h1>
            <Game />
          </ThemeProvider>
        </Container>
      </header>
    </div>
  );
};

export default App;
