/**
 * 本文件由Omi.js自动生成，谨慎改动！
 * 生成时间：2022年11月26日 22:47:17.
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
}
export const ChatSocketControllerDefinition = {
  POST_USER_SEQUENCE_PATH: "ChatSocket.UserSequence",
  POST_MESSAGES_PATH: "ChatSocket.Messages",
  KICKOUT_MEMBER_PATH: "ChatSocket.KickoutMember",
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
