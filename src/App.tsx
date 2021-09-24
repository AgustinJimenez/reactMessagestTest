/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, FC } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useEffect } from "react";
import generateMessage from "./Api";
import MessagesList from "./components/MessagesList";
import { Message, messagesPrioritiesTypes, messagesTypes } from "./types";
import { MessagesContext } from "./contexts/MessagesContext";
import { toast } from "react-toastify";
import { snackBarErrorDefaultOptions } from "./constants";

const App: FC<{}> = () => {
  const { messages, addNewMessage, removeAllMessages } =
    useContext(MessagesContext);

  useEffect(() => {
    const cleanUp = generateMessage((newMessage: Message) => {
      addNewMessage(newMessage);
      if (newMessage.priority === messagesPrioritiesTypes.ERROR)
        toast(newMessage.message, snackBarErrorDefaultOptions);
    });
    return cleanUp;
  }, [generateMessage]);

  const errorMessages = messages?.filter?.(
    ({ priority }) => priority === messagesPrioritiesTypes.ERROR
  );
  const warningMessages = messages?.filter?.(
    ({ priority }) => priority === messagesPrioritiesTypes.WARNING
  );
  const infoMessages = messages?.filter?.(
    ({ priority }) => priority === messagesPrioritiesTypes.INFO
  );
  return (
    <div>
      <h2 data-testid="page-title">nuffsaid.com Coding Challenge</h2>
      <hr />
      <Grid container item justifyContent="center">
        <Grid container item md={4} xs={12} justifyContent="center" spacing={1}>
          <Grid item xs={12} md={2} justifyContent="center">
            <Button
              variant="contained"
              color="success"
              fullWidth
              data-testid="stop-button"
            >
              STOP
            </Button>
          </Grid>
          <Grid item xs={12} md={2} justifyContent="center">
            <Button
              variant="contained"
              color="success"
              onClick={removeAllMessages}
              fullWidth
              data-testid="clear-button"
            >
              CLEAR
            </Button>
          </Grid>
        </Grid>

        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} md={3}>
            <MessagesList
              messages={errorMessages}
              title="Error Type 1"
              count={errorMessages?.length}
              type={messagesTypes.error}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <MessagesList
              messages={warningMessages}
              title="Warning Type 2"
              count={warningMessages?.length}
              type={messagesTypes.warning}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <MessagesList
              messages={infoMessages}
              title="Info Type 3"
              count={infoMessages?.length}
              type={messagesTypes.info}
            />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default App;
