import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useCallback, useContext } from "react";
import { MessagesContext } from "../../contexts/MessagesContext";
import List from "@mui/material/List";
import { Message, MessagesListProps } from "../../types";
import { MessageListItem, messagesListStyles } from "./styles";
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
  const classes = messagesListStyles();
  return (
    <List>
      <Grid container>
        <Grid item xs={12}>
          <Title>{title}</Title>
        </Grid>
        <Grid item xs={12} className={classes.countContainer}>
          Count {count}
        </Grid>
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
