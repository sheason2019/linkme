/**
 * 本文件由Omi.js自动生成，谨慎改动！
 * 生成时间：2022年11月28日 22:20:52.
 */
import { SequenceItem, Message, MessageMember } from "./chat-server";
export interface UserConversationSequence {
  UserId: number;
  Sequence: SequenceItem[];
}
export interface UnimpledChatSocketController {
  PostUserSequence(payload: PostUserSequenceRequest): Promise<void> | void;
  PostMessages(payload: PostMessagesRequest): Promise<void> | void;
  // 删除成员
  KickoutMember(payload: KickoutMemberRequest): Promise<void> | void;
  // 会话信息发生了变化，让正在会话中的成员重新同步会话信息
  ConversationUpdate(payload: ConversationUpdateRequest): Promise<void> | void;
}
export const ChatSocketControllerDefinition = {
  POST_USER_SEQUENCE_PATH: "ChatSocket.UserSequence",
  POST_MESSAGES_PATH: "ChatSocket.Messages",
  KICKOUT_MEMBER_PATH: "ChatSocket.KickoutMember",
  CONVERSATION_UPDATE_PATH: "ChatSocket.ConversationUpdate",
} as const;
export interface PostUserSequenceRequest {
  userSequence: UserConversationSequence[];
}
export interface PostMessagesRequest {
  convId: number;
  messages: Message[];
}
export interface KickoutMemberRequest {
  members: MessageMember[];
}
export interface ConversationUpdateRequest {
  convId: number;
}
