/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, FC, useCallback, useState } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useEffect } from "react";
import faker from "faker";
import MessagesList from "../../components/MessagesList";
import { Message, messagesPrioritiesTypes, messagesTypes } from "../../types";
import { GlobalContext } from "../../contexts/GlobalContext";
import { toast } from "react-toastify";
import { snackBarErrorDefaultOptions } from "../../constants";
import random from "lodash/random";
import {
  ButtonTextBold,
  HomePageTitle,
  MessagesListsContainerGrid,
} from "./styles";

const App: FC<{}> = () => {
  const [msgsAreRunning, setMsgsAreRunning] = useState(true);
  const toggleMsgsRun = useCallback(() => {
    const newValue = !msgsAreRunning;
    setMsgsAreRunning(newValue);
    if (!newValue) toast.clearWaitingQueue();
  }, [msgsAreRunning]);
  const { messages, addNewMessage, removeAllMessages } =
    useContext(GlobalContext);

  const addMessage = useCallback(
    (newMessage: Message) => {
      if (!msgsAreRunning) return;
      addNewMessage(newMessage);
      if (newMessage.priority === messagesPrioritiesTypes.ERROR) {
        toast(newMessage.message, snackBarErrorDefaultOptions);
        toast.clearWaitingQueue();
      }
    },
    [msgsAreRunning, addNewMessage]
  );
  const generate = useCallback(() => {
    const message = faker.lorem.sentence();
    const priority = random(0, 2) as messagesPrioritiesTypes;
    const nextInMS = random(500, 3000);
    addMessage({ message, priority });
    setTimeout(generate, nextInMS);
  }, [addMessage, messages]);

  useEffect(() => {
    generate();
  }, []);

  const errorMessages = messages
    ?.filter?.(({ priority }) => priority === messagesPrioritiesTypes.ERROR)
    .reverse?.();
  const warningMessages = messages
    ?.filter?.(({ priority }) => priority === messagesPrioritiesTypes.WARNING)
    .reverse?.();
  const infoMessages = messages
    ?.filter?.(({ priority }) => priority === messagesPrioritiesTypes.INFO)
    .reverse?.();
  return (
    <div>
      <Grid container item>
        <HomePageTitle data-testid="page-title" container item xs={12}>
          nuffsaid.com Coding Challenge
        </HomePageTitle>
      </Grid>
      <hr />
      <Grid container item justifyContent="center">
        <Grid container item md={4} xs={12} justifyContent="center" spacing={1}>
          <Grid item xs={12} md={2} justifyContent="center">
            <Button
              variant="contained"
              color="success"
              fullWidth
              data-testid="stop-button"
              onClick={toggleMsgsRun}
            >
              <ButtonTextBold>
                {msgsAreRunning ? "STOP" : "START"}
              </ButtonTextBold>
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
              <ButtonTextBold>CLEAR</ButtonTextBold>
            </Button>
          </Grid>
        </Grid>

        <MessagesListsContainerGrid
          container
          spacing={2}
          justifyContent="center"
        >
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
        </MessagesListsContainerGrid>
      </Grid>
    </div>
  );
};

export default App;
