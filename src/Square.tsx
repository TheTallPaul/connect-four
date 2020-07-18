import React from "react";
import { Button } from "@material-ui/core";

type squareProps = {
  piece: string;
  onClick: () => void;
};

function Square(props: squareProps) {
  return (
    <Button onClick={props.onClick} variant="contained" color="primary">
      {props.piece}
    </Button>
  );
}

export default Square;
