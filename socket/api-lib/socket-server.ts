/**
 * 本文件由Omi.js自动生成，谨慎改动！
 * 生成时间：2022年11月18日 16:48:1.
 */
import { SequenceItem } from "./chat-server";
export interface UserConversationSequence {
  UserId: number;
  Sequence: SequenceItem[];
}
export interface UnimpledChatSocketController {
  PostUserSequence(payload: PostUserSequenceRequest): Promise<void> | void;
}
export const ChatSocketControllerDefinition = {
  POST_USER_SEQUENCE_PATH: "ChatSocket.UserSequence",
} as const;
export interface PostUserSequenceRequest {
  userSequence: UserConversationSequence[];
}
