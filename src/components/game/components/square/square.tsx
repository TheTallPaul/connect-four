import React from "react";
import { Button } from "@material-ui/core";

import { UseStyles } from "styles/styles";

type squareProps = {
  piece: string;
  onClick(): void;
  legal: boolean;
  id: string;
};

// Square shows displays a game piece or allows a user to place a game piece
export default React.memo(function Square({
  piece,
  onClick,
  legal,
  id,
}: squareProps): JSX.Element {
  const classes = UseStyles();

  return (
    <Button
      classes={{
        root: classes.boardButton,
        disabled: classes.disabled,
      }}
      onClick={onClick}
      variant={legal ? "contained" : "outlined"}
      color="secondary"
      disabled={!legal}
      size="large"
      role="cell"
      data-testid={legal ? "legal-square-" + id : "illegal-square-" + id}
    >
      {piece}
    </Button>
  );
});
