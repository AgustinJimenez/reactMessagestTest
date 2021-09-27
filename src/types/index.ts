export enum messagesTypes {
  error = "error",
  warning = "warning",
  info = "info",
}

export enum messagesPrioritiesTypes {
  ERROR,
  WARNING,
  INFO,
}

export interface Message {
  id?: string;
  message: string;
  priority: messagesPrioritiesTypes;
}

export interface MessagesListProps {
  title: string;
  count: number;
  messages: Message[];
  type: messagesTypes;
}

export const ADD_MESSAGE_ACTION = "ADD_MESSAGE_ACTION";
export const REMOVE_MESSAGE_BY_ID_ACTION = "REMOVE_MESSAGE_BY_ID_ACTION";
export const REMOVE_ALL_MESSAGES_ACTION = "REMOVE_ALL_MESSAGES_ACTION";
