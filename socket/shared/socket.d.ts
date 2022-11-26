import { Message } from "../api-lib/chat-client";

export interface ServerToClientEvents {
  login: (result: boolean) => void;
  sequenceItem: (items: SequenceItem[]) => void;
  error: (message: string) => void;
  messages: (convId: number, messages: Message[], hasMore?: boolean) => void;
  postMessage: (message: Message, convId: number, mark: string) => void;
  // 第一个参数表示被移出群聊的成员ID，第二个参数表示是否当前用户被移出群聊
  kickout: (membersId: number[], convId: number, isCurrent?: boolean) => void;
  syncSequenceItem: () => void;
  enterConversation: (convId: number) => void;
  leaveConversation: () => void;
}

export interface ClientToServerEvents {
  login: (jwt: string) => void;
  sequenceItem: () => void;
  postMessage: (content: string, convId: number, mark: string) => void;
  messages: (convId: number, originMessageId?: number) => void;
  enterConversation: (convId: number) => void;
  checkedMessage: (convId: number) => void;
  leaveConversation: () => void;
}
