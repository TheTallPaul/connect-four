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
import { DimensionsFormInput } from "types/types";

type settingsProps = {
  dimensions: DimensionsFormInput;
  onSubmit: (data: DimensionsFormInput) => void;
};

// Settings has inputs to change the rules and layout of the game
export default function Settings(props: settingsProps): JSX.Element {
  const minDimension = 4;
  const maxDimension = 20;

  const classes = UseStyles();
  const { control, handleSubmit } = useForm<DimensionsFormInput>();

  const dimensionSelectOptions = buildOptions(
    minDimension,
    maxDimension,
    classes.blueText
  );

  // onSubmit passes the dimensions from the HTML event to the Game function
  const onSubmit = (data: DimensionsFormInput) => {
    props.onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl className={classes.formControl}>
        <InputLabel className={classes.blueText}>Rows</InputLabel>
        <Controller
          name="numRows"
          as={<Select>{dimensionSelectOptions}</Select>}
          defaultValue={props.dimensions.numRows}
          control={control}
          className={classes.blueText}
        />
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel className={classes.blueText}>Columns</InputLabel>
        <Controller
          name="numCols"
          as={<Select>{dimensionSelectOptions}</Select>}
          defaultValue={props.dimensions.numCols}
          control={control}
          className={classes.blueText}
        />
      </FormControl>
      <FormControl className={classes.formControl}>
        <Button type="submit" color="primary" variant="contained">
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
      <MenuItem key={option} value={option} className={itemStyle}>
        {option}
      </MenuItem>
    );
  }

  return dimensionSelectOptions;
};
