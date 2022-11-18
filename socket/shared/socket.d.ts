import { Message } from "../api-lib/chat-client";

export interface ServerToClientEvents {
  login: (result: boolean) => void;
  sequenceItem: (items: SequenceItem[]) => void;
  error: (message: string) => void;
  messages: (convId: number, messages: Message[]) => void;
  postMessage: (message: Message, convId: number, mark: string) => void;
}

export interface ClientToServerEvents {
  login: (jwt: string) => void;
  sequenceItem: () => void;
  postMessage: (content: string, convId: number, mark: string) => void;
  messages: (convId: number, originMessageId?: number) => void;
  enterConversation: (convId: number) => void;
  checkedMessage: (convId: number) => void;
}
