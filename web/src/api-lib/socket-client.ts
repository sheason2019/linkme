/**
 * 本文件由Omi.js自动生成，谨慎改动！
 * 生成时间：2022年11月28日 22:56:17.
 */

import { OmiClientBase } from "@omi-stack/omi-client";
import { AxiosRequestConfig } from "axios";

import { SequenceItem, Message, MessageMember } from "./chat-client";
export interface UserConversationSequence {
  UserId: number;
  Sequence: SequenceItem[];
}
export class ChatSocketClient extends OmiClientBase {
  PostUserSequence(userSequence: UserConversationSequence[]) {
    const url = "ChatSocket.UserSequence";
    const method = "Post";
    return this.request<void>(url, method, { userSequence });
  }
  PostMessages(convId: number, messages: Message[]) {
    const url = "ChatSocket.Messages";
    const method = "Post";
    return this.request<void>(url, method, { convId, messages });
  }
  // 删除成员
  KickoutMember(members: MessageMember[]) {
    const url = "ChatSocket.KickoutMember";
    const method = "Post";
    return this.request<void>(url, method, { members });
  }
  // 会话信息发生了变化，让正在会话中的成员重新同步会话信息
  ConversationUpdate(convId: number) {
    const url = "ChatSocket.ConversationUpdate";
    const method = "Post";
    return this.request<void>(url, method, { convId });
  }
}
