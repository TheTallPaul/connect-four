import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const UseStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
);

export const DarkSymbol = "\u2B24"; // ⬤
export const LightSymbol = "\u25Ef"; // ◯
export const BlankSquareSymbol = "_";
