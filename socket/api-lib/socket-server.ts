/**
 * 本文件由Omi.js自动生成，谨慎改动！
 * 生成时间：2022年11月22日 0:28:12.
 */
import { SequenceItem, Message } from "./chat-server";
export interface UserConversationSequence {
  UserId: number;
  Sequence: SequenceItem[];
}
export interface UnimpledChatSocketController {
  PostUserSequence(payload: PostUserSequenceRequest): Promise<void> | void;
  PostMessages(payload: PostMessagesRequest): Promise<void> | void;
}
export const ChatSocketControllerDefinition = {
  POST_USER_SEQUENCE_PATH: "ChatSocket.UserSequence",
  POST_MESSAGES_PATH: "ChatSocket.Messages",
} as const;
export interface PostUserSequenceRequest {
  userSequence: UserConversationSequence[];
}
export interface PostMessagesRequest {
  convId: number;
  messages: Message[];
}
