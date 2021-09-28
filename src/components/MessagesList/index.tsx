import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useCallback, useContext } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";
import { Message, MessagesListProps } from "../../types";
import {
  ClearButtonContainerGrid,
  ClearMessageListItemText,
  CountLabelContainer,
  ListContainer,
  MessagesListItemContainer,
  MessageText,
  MessageTextContainer,
} from "./styles";
import { Title } from "../Title";
import TextTruncate from "../TextTruncate";

const MessagesListItem = ({
  message,
  id,
}: {
  message: string;
  id?: string;
}) => {
  const { removeMessageById } = useContext(GlobalContext);

  const removeMessage = useCallback(() => {
    if (!!id) removeMessageById(id);
  }, [id, removeMessageById]);
  return (
    <Grid container justifyContent="space-between">
      <MessageTextContainer item xs={12}>
        <MessageText data-testid="messages-list-message">
          <TextTruncate charNum={106}>{message}</TextTruncate>
        </MessageText>
      </MessageTextContainer>
      <ClearButtonContainerGrid
        container
        item
        xs={12}
        justifyContent="flex-end"
      >
        <Button
          onClick={removeMessage}
          variant="text"
          color="inherit"
          data-testid="messages-list-clear-button"
        >
          <ClearMessageListItemText>Clear</ClearMessageListItemText>
        </Button>
      </ClearButtonContainerGrid>
    </Grid>
  );
};

const MessagesList = ({
  title,
  count = 0,
  messages,
  type,
}: MessagesListProps) => {
  return (
    <Grid container data-testid="messages-list">
      <Grid item xs={12}>
        <Title data-testid="messages-list-title">{title}</Title>
      </Grid>
      <CountLabelContainer item xs={12}>
        <span data-testid="messages-list-count">
          Count <span data-testid="messages-list-count-value">{count}</span>
        </span>
      </CountLabelContainer>
      <ListContainer>
        {messages?.map?.(({ message, id }: Message, key: number) => (
          <MessagesListItemContainer
            key={key}
            type={type}
            data-testid="messages-list-item"
          >
            <MessagesListItem message={message} id={id} />
          </MessagesListItemContainer>
        ))}
      </ListContainer>
    </Grid>
  );
};
export default MessagesList;
