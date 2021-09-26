import React from "react";
import ReactDOM from "react-dom";
import HomePage from "./pages/HomePage";
import { MessagesProvider } from "./contexts/MessagesContext";
import reportWebVitals from "./reportWebVitals";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <React.StrictMode>
      <MessagesProvider>
        <HomePage />
        <ToastContainer limit={1} />
      </MessagesProvider>
    </React.StrictMode>
  </ThemeProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
