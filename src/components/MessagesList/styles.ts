import { styled } from "@mui/system";
import { Grid } from "@mui/material";

export const CountLabelContainerGrid = styled(Grid)(({ theme, type }: any) => ({
  marginBottom: theme.spacing(1),
}));

export const MessageListItem = styled("div")(({ theme, type }: any) => ({
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette[type].main,
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  width: "100%",
  height: theme.spacing(9),
  paddingTop: theme.spacing(2),
  paddingRight: theme.spacing(2),
  paddingLeft: theme.spacing(2),
  paddingBottom: theme.spacing(0),
  marginBottom: theme.spacing(1.5),
  boxShadow: "0 2px 2px rgba(0,0,0,0.16), 0 2px 2px rgba(0,0,0,0.23)",
}));
