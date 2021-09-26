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
