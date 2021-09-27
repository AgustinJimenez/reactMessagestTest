import {
  ADD_MESSAGE_ACTION,
  Message,
  REMOVE_ALL_MESSAGES_ACTION,
  REMOVE_MESSAGE_BY_ID_ACTION,
} from "../types";

export const addMessageReducerAction = (message: Message) => ({
  type: ADD_MESSAGE_ACTION,
  payload: { message },
});

export const removeMessageReducerAction = (id: string) => ({
  type: REMOVE_MESSAGE_BY_ID_ACTION,
  payload: { selectedId: id },
});

export const removeAllMessagesReducerAction = () => ({
  type: REMOVE_ALL_MESSAGES_ACTION,
  payload: {},
});
