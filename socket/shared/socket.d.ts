import { Message } from "../api-lib/chat-client";

export interface ServerToClientEvents {
  login: (result: boolean) => void;
  sequenceItem: (items: SequenceItem[]) => void;
  error: (message: string) => void;
  postMessage: (message: Message, convId: number, mark: string) => void;
}

export interface ClientToServerEvents {
  login: (jwt: string) => void;
  sequenceItem: () => void;
  postMessage: (content: string, convId: number, mark: string) => void;
  enterConversation: (convId: number) => void;
}
