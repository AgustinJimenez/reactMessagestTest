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
  console.log("RENDER ===> ", messages);
  return (
    <div>
      <h2>nuffsaid.com Coding Challenge</h2>
      <hr />
      <Grid container item justifyContent="center">
        <Grid container item md={4} xs={12} justifyContent="center">
          <Button variant="contained" color="success">
            STOP
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={removeAllMessages}
          >
            CLEAR
          </Button>
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