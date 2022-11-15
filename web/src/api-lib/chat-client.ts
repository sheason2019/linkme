/**
 * 本文件由Omi.js自动生成，谨慎改动！
 * 生成时间：2022年11月15日 15:49:36.
 */

import { OmiClientBase } from "@omi-stack/omi-client";
import { AxiosRequestConfig } from "axios";

// 聊天服务 IDL 定义
export class ChatClient extends OmiClientBase {
  // 创建私聊会话，参数是指定的用户ID，返回的是会话ID
  CreatePrivateConversation(userId: number) {
    const url = "Chat.CreatePrivateConversation";
    const method = "Post";
    return this.request<number>(url, method, { userId });
  }
}
