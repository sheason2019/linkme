/**
 * 本文件由Omi.js自动生成，谨慎改动！
 * 生成时间：2022年11月15日 23:18:16.
 */

import { OmiClientBase } from "@omi-stack/omi-client/dist/commonjs";
import { AxiosRequestConfig } from "axios";

// 聊天服务 IDL 定义
export interface SequenceItem {
  ConversationId: number;
  Name: string;
  LastMessage: string;
  AvatarUrl?: string;
}
export interface Conversation {
  Id: number;
  Name: string;
  Type: string;
}
export interface Message {
  Id: number;
  Type: string;
  Content: string;
  TimeStamp: number;
}
export interface MessageResponse {
  Messages: Message[];
  HasMoreEarlierMessage: boolean;
  HasMoreLaterMessage: boolean;
}
export class ChatClient extends OmiClientBase {
  // 创建私聊会话，参数是指定的用户ID，返回的是会话ID
  CreatePrivateConversation(userId: number) {
    const url = "Chat.CreatePrivateConversation";
    const method = "Post";
    return this.request<number>(url, method, { userId });
  }
  // 获取会话信息
  GetConversationById(convId: number) {
    const url = "Chat.ConversationById";
    const method = "Get";
    return this.request<Conversation>(url, method, { convId });
  }
}
export class ChatRpcClient extends OmiClientBase {
  // 获取消息列表信息
  GetSequenceItem() {
    const url = "ChatRpc.SequenceItem";
    const method = "Get";
    return this.request<SequenceItem[]>(url, method, {});
  }
  // 获取默认的会话信息，即根据已读位置实现的会话信息，更早及更晚方向各拉取20条
  GetDefaultMessage(convId: number) {
    const url = "ChatRpc.DefaultMessage";
    const method = "Get";
    return this.request<MessageResponse>(url, method, { convId });
  }
  // 获取指定的会话信息, vector: earlier or later，返回40条信息
  GetSpecifiedMessage(messageId: number, vector: string) {
    const url = "ChatRpc.SpecifiedMessage";
    const method = "Get";
    return this.request<MessageResponse>(url, method, { messageId, vector });
  }
}