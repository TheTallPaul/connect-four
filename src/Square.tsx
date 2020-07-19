import React from "react";
import { Button } from "@material-ui/core";

type squareProps = {
  piece: string;
  onClick: () => void;
  legal: boolean;
};

function Square(props: squareProps) {
  return (
    <Button
      onClick={props.onClick}
      variant="contained"
      color="primary"
      disabled={!props.legal}
    >
      {props.piece}
    </Button>
  );
}

export default Square;
