import { createTheme } from "@mui/material/styles";

export enum colors {
  error = "#F56236",
  warning = "#FCE788",
  info = "#88FCA3",
}

const theme = createTheme({
  palette: {
    error: {
      main: colors.error,
    },
    success: {
      main: colors.info,
    },
    warning: {
      main: colors.warning,
    },
  },
});

export default theme;
