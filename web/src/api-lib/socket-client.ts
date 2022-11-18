/**
 * 本文件由Omi.js自动生成，谨慎改动！
 * 生成时间：2022年11月18日 18:24:54.
 */

import { OmiClientBase } from "@omi-stack/omi-client";
import { AxiosRequestConfig } from "axios";

import { SequenceItem } from "./chat-client";
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
}
