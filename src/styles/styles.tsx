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

export const AppTheme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: blue,
  },
  shape: {
    borderRadius: 0,
  },
});

export const DARK_SYMBOL = "\u2B24"; // ⬤
export const LIGHT_SYMBOL = "\u25Ef"; // ◯
export const BlankSquareSymbol = "\u2008"; // Punctuation Space
