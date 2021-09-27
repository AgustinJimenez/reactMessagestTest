import {
  ADD_MESSAGE_ACTION,
  Message,
  REMOVE_ALL_MESSAGES_ACTION,
  REMOVE_MESSAGE_BY_ID_ACTION,
} from "../types";
import { v4 as uuidv4 } from "uuid";

const appReducer = (state: any, action: any) => {
  switch (action.type) {
    case ADD_MESSAGE_ACTION:
      const { message } = action.payload;
      message["id"] = uuidv4();
      state.messages.push(message);
      return {
        ...state,
      };

    case REMOVE_ALL_MESSAGES_ACTION:
      return {
        ...state,
        messages: [],
      };

    case REMOVE_MESSAGE_BY_ID_ACTION:
      const { selectedId } = action.payload;
      const newMessages = state.messages.filter(
        ({ id }: Message) => id !== selectedId
      );
      console.log("REMOVE MESSAGES ===> ", {
        messages: state.messages,
        selectedId,
        newMessages,
      });
      return {
        ...state,
        messages: newMessages,
      };

    default:
      return state;
  }
};

export default appReducer;
