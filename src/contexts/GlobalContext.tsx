import { createContext, useCallback, useReducer, useState } from "react";
import { Message } from "../types";
import {
  removeMessageReducerAction,
  addMessageReducerAction,
  removeAllMessagesReducerAction,
} from "../reducers/actions";
import appReducer from "../reducers";

interface contextType {
  messages: Message[];
  addNewMessage: (newMessage: Message) => void;
  removeMessageById: (key: string) => void;
  removeAllMessages: () => void;
}

const initialState = {
  messages: [],
};

const GlobalContext = createContext({} as contextType);

const GlobalProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const removeMessageById = useCallback((selectedId: string) => {
    dispatch(removeMessageReducerAction(selectedId));
  }, []);

  const addNewMessage = useCallback((newMessage: Message) => {
    dispatch(addMessageReducerAction(newMessage));
  }, []);

  const removeAllMessages = useCallback(() => {
    dispatch(removeAllMessagesReducerAction());
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        messages: state.messages,
        removeAllMessages,
        removeMessageById,
        addNewMessage,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
export { GlobalContext, GlobalProvider };
