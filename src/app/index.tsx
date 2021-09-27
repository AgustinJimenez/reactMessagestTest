import React from "react";
import Router from "../router";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";
import { GlobalProvider } from "../contexts/GlobalContext";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <React.StrictMode>
        <GlobalProvider>
          <Router />
          <ToastContainer limit={1} />
        </GlobalProvider>
      </React.StrictMode>
    </ThemeProvider>
  );
};

export default App;
