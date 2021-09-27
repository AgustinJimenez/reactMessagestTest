import React from "react";
import Router from "../router";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";
import { GlobalProvider } from "../contexts/GlobalContext";
import { PersistentContextProvider } from "react-persist-context";
import "react-toastify/dist/ReactToastify.css";
import store from "../reducers/store";

const App = () => (
  <PersistentContextProvider store={store}>
    <ThemeProvider theme={theme}>
      <React.StrictMode>
        <GlobalProvider>
          <Router />
          <ToastContainer limit={1} />
        </GlobalProvider>
      </React.StrictMode>
    </ThemeProvider>
  </PersistentContextProvider>
);

export default App;
