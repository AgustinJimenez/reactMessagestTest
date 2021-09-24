import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useCallback, useContext } from "react";
import { MessagesContext } from "../../contexts/MessagesContext";
import List from "@mui/material/List";
import { Message, MessagesListProps } from "../../types";
import { CountLabelContainerGrid, MessageListItem } from "./styles";
import { Text } from "../Text";
import { Title } from "../Title";

const MessagesListItem = ({ message, id }: Message) => {
  const { removeMessageById } = useContext(MessagesContext);

  const removeMessage = useCallback(() => {
    if (!!id) removeMessageById(id);
  }, [id, removeMessageById]);
  return (
    <Grid container justifyContent="space-between">
      <Grid item xs={12}>
        <Text>{message}</Text>
      </Grid>
      <Grid container item xs={12} justifyContent="flex-end">
        <Button onClick={removeMessage} variant="text" color="inherit">
          <Text>Clear</Text>
        </Button>
      </Grid>
    </Grid>
  );
};

const MessagesList = ({ title, count, messages, type }: MessagesListProps) => {
  return (
    <List data-testid="messages-list">
      <Grid container>
        <Grid item xs={12}>
          <Title data-testid="messages-list-title">{title}</Title>
        </Grid>
        <CountLabelContainerGrid item xs={12}>
          <span data-testid="messages-list-count">
            Count <span>{count}</span>
          </span>
        </CountLabelContainerGrid>
        <Grid container item xs={12}>
          {messages?.map?.(
            ({ message, priority, id }: Message, key: number) => (
              <MessageListItem key={key} type={type}>
                <MessagesListItem
                  message={message}
                  priority={priority}
                  id={id}
                  key={key}
                />
              </MessageListItem>
            )
          )}
        </Grid>
      </Grid>
    </List>
  );
};
export default MessagesList;
