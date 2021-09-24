import { createContext, useCallback, useState } from "react";
import { Message } from "../types";
import { v4 as uuidv4 } from "uuid";

interface contextType {
  messages: Message[];
  addNewMessage: (newMessage: Message) => void;
  removeMessageById: (key: string) => void;
  removeAllMessages: () => void;
}

const MessagesContext = createContext({} as contextType);

const MessagesProvider = ({ children }: any) => {
  const [messages, setMessages] = useState<Message[]>([]);

  const removeMessageById = useCallback(
    (selectedId: string) => {
      let updatedMessages = messages.filter(({ id }) => id !== selectedId);
      setMessages([...updatedMessages]);
    },
    [messages, setMessages]
  );

  const addNewMessage = useCallback(
    (newMessage: Message) => {
      newMessage["id"] = uuidv4();
      messages.push(newMessage);
      setMessages([...messages]);
    },
    [messages, setMessages]
  );

  const removeAllMessages = useCallback(() => {
    setMessages([...[]]);
  }, [setMessages]);

  return (
    <MessagesContext.Provider
      value={{
        messages,
        removeAllMessages,
        removeMessageById,
        addNewMessage,
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
};
export { MessagesContext, MessagesProvider };
