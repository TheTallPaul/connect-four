import React from "react";
import {
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Button,
} from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";

import { UseStyles } from "styles/styles";
import Dimensions from "types/dimensions";

const MIN_DIMENSION: number = 4;
const MAX_DIMENSION: number = 20;

type settingsProps = {
  dimensions: Dimensions;
  onSubmit(data: Dimensions): void;
};

// Settings has inputs to change the rules and layout of the game
export default function Settings({
  dimensions,
  onSubmit,
}: settingsProps): JSX.Element {
  const classes = UseStyles();
  const { control, handleSubmit } = useForm<Dimensions>();

  const dimensionSelectOptions = buildOptions(
    MIN_DIMENSION,
    MAX_DIMENSION,
    classes.blueText
  );

  // onSubmit passes the dimensions from the HTML event to the Game function
  const onFormSubmit = (data: Dimensions): void => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <FormControl className={classes.formControl}>
        <InputLabel className={classes.blueText}>Rows</InputLabel>
        <Controller
          name="numRows"
          as={
            <Select role="list" data-testid="numRowSelect">
              {dimensionSelectOptions}
            </Select>
          }
          defaultValue={dimensions.numRows}
          control={control}
          className={classes.blueText}
        />
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel className={classes.blueText}>Columns</InputLabel>
        <Controller
          name="numCols"
          as={
            <Select role="list" data-testid="numColSelect">
              {dimensionSelectOptions}
            </Select>
          }
          defaultValue={dimensions.numCols}
          control={control}
          className={classes.blueText}
        />
      </FormControl>
      <FormControl className={classes.formControl}>
        <Button
          type="submit"
          color="primary"
          variant="contained"
          data-testid="newGameButton"
        >
          New Game
        </Button>
      </FormControl>
    </form>
  );
}

// buildOptions creates a dropdown menu of dimensions options in the provided
// range
const buildOptions = (
  minDimension: number,
  maxDimension: number,
  itemStyle: string
): JSX.Element[] => {
  let dimensionSelectOptions = [];

  for (let option = minDimension; option <= maxDimension; option++) {
    dimensionSelectOptions.push(
      <MenuItem
        key={option}
        value={option}
        className={itemStyle}
        role="listitem"
      >
        {option}
      </MenuItem>
    );
  }

  return dimensionSelectOptions;
};
