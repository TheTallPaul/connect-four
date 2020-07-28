import React from "react";
import {
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Button,
} from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";

import { UseStyles } from "../../../../styles/styles";
import { DimensionsFormInput } from "../../../../types/types";

type settingsProps = {
  dimensions: DimensionsFormInput;
  onSubmit: (data: DimensionsFormInput) => void;
};

// Settings has inputs to change the rules and layout of the game
const Settings = (props: settingsProps) => {
  const classes = UseStyles();
  const { control, handleSubmit } = useForm<DimensionsFormInput>();

  const minDimension = 4;
  const maxDimension = 20;

  // onSubmit passes the dimensions from the HTML event to the Game function
  const onSubmit = (data: DimensionsFormInput) => {
    props.onSubmit(data);
  };

  let dimensionSelectOptions = [];
  for (let option = minDimension; option <= maxDimension; option++) {
    dimensionSelectOptions.push(
      <MenuItem key={option} value={option} className={classes.blueText}>
        {option}
      </MenuItem>
    );
  }

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
};

export default Settings;
