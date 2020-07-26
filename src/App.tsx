import React from "react";
import { ThemeProvider } from "@material-ui/core";

import Game from "./Game";
import { AppTheme } from "./Styles";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ThemeProvider theme={AppTheme}>
          <Game />
        </ThemeProvider>
      </header>
    </div>
  );
}

export default App;
