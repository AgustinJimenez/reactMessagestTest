import { createContext, useCallback, useReducer } from "react";
import { Message } from "../types";
import initialState from "../reducers/initialState";
import {
  setDatasetListToReducer,
  setDatasetToReducer,
  setDatasetListToObjectReducer,
} from "../reducers/actions";
import appReducer from "../reducers";

import { datasetSelector } from "../reducers/selectors";

interface contextType {
  messages: Message[];
  addNewMessage: (newMessage: Message) => void;
  removeMessageById: (key: string) => void;
  removeAllMessages: () => void;
  messagesAreRunning: boolean;
  toggleMessagesRunner: () => void;
}
const GlobalContext = createContext({} as contextType);

const GlobalProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const messages: Message[] = datasetSelector(state, "messages", {
    list_format: true,
  });
  const messagesAreRunning = datasetSelector(state, "messagesAreRunning");

  const removeMessageById = useCallback(
    (selectedId: string) => {
      const updatedMessages = messages.filter(({ id }) => id !== selectedId);
      dispatch(setDatasetListToObjectReducer(updatedMessages, "messages"));
    },
    [dispatch, messages]
  );

  const addNewMessage = useCallback(
    (newMessage: Message) => {
      dispatch(setDatasetListToReducer(newMessage, "messages"));
    },
    [dispatch]
  );

  const removeAllMessages = useCallback(() => {
    dispatch(setDatasetToReducer([], "messages"));
  }, [dispatch]);

  const toggleMessagesRunner = useCallback(() => {
    dispatch(setDatasetToReducer(!messagesAreRunning, "messagesAreRunning"));
  }, [messagesAreRunning, dispatch]);

  return (
    <GlobalContext.Provider
      value={{
        messages,
        removeAllMessages,
        removeMessageById,
        addNewMessage,
        messagesAreRunning,
        toggleMessagesRunner,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
export { GlobalContext, GlobalProvider };
