/**
 * 本文件由Omi.js自动生成，谨慎改动！
 * 生成时间：2022年11月27日 16:44:25.
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
}
