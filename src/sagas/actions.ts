import { ADD_MESSAGE_SAGA, Message } from "../types";

export const addMessageSagaAction = ({ message }: { message: Message }) => ({
  type: ADD_MESSAGE_SAGA,
  payload: { message },
});
