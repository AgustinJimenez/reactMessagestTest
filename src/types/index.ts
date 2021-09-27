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
  timestamp?: Date;
}

export interface MessagesListProps {
  title: string;
  count: number;
  messages: Message[];
  type: messagesTypes;
}
export const SET_ITEM_TO_DATASET_REDUCER = "SET_ITEM_TO_DATASET_REDUCER";
export const ADD_MESSAGE_SAGA = "ADD_MESSAGE_SAGA";
