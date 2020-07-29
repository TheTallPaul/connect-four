import React from "react";
import { Button } from "@material-ui/core";

import { UseStyles } from "styles/styles";

type squareProps = {
  piece: string;
  onClick(): void;
  legal: boolean;
};

// Square shows displays a game piece or allows a user to place a game piece
export default function Square(props: squareProps): JSX.Element {
  const classes = UseStyles();

  return (
    <Button
      classes={{
        root: classes.boardButton,
        disabled: classes.disabled,
      }}
      onClick={props.onClick}
      variant={props.legal ? "contained" : "outlined"}
      color="secondary"
      disabled={!props.legal}
      size="large"
    >
      {props.piece}
    </Button>
  );
}
