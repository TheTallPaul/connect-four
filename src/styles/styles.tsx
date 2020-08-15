import {
  createStyles,
  makeStyles,
  Theme,
  createMuiTheme,
} from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";

const blueHex = "#2979ff";

export const UseStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    boardButton: {
      "&$disabled": {
        borderColor: blueHex,
        color: blueHex,
      },
    },
    blueText: {
      color: blueHex,
    },
    disabled: {},
  })
);

export const AppTheme: Theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: blue,
  },
  shape: {
    borderRadius: 0,
  },
});
