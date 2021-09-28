import { createContext, useCallback } from "react";
import { Message } from "../types";
import {
  setDatasetToReducer,
  setDatasetListToObjectReducer,
  addMessageReducerAtion,
  toggleMessagesRunnerReducerAtion,
} from "../reducers/actions";
import { usePersistedContext } from "react-persist-context";
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
  const { state, dispatch } = usePersistedContext();

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
      dispatch(addMessageReducerAtion(newMessage));
    },
    [dispatch]
  );

  const removeAllMessages = useCallback(
    () => dispatch(setDatasetToReducer([], "messages")),
    [dispatch]
  );

  const toggleMessagesRunner = useCallback(
    () => dispatch(toggleMessagesRunnerReducerAtion()),
    [dispatch]
  );

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
