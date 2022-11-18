/**
 * 本文件由Omi.js自动生成，谨慎改动！
 * 生成时间：2022年11月18日 16:48:1.
 */
// 聊天服务 IDL 定义
export interface SequenceItem {
  ConversationId: number;
  Name: string;
  LastMessage: string;
  LastUpdateTime: number;
  UnreadCount: number;
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
  // 发送该消息的会话成员信息
  MemberId: number;
}
export interface MessageMember {
  MemberId: number;
  Name: string;
  AvatarUrl: string;
}
export interface MessageResponse {
  Messages: Message[];
  HasMoreEarlierMessage: boolean;
  HasMoreLaterMessage: boolean;
}
export interface UnimpledChatController {
  // 创建私聊会话，参数是指定的用户ID，返回的是会话ID
  CreatePrivateConversation(
    payload: CreatePrivateConversationRequest
  ): Promise<number> | number;
  // 获取会话信息
  GetConversationById(
    payload: GetConversationByIdRequest
  ): Promise<Conversation> | Conversation;
}
export const ChatControllerDefinition = {
  CREATE_PRIVATE_CONVERSATION_PATH: "Chat.CreatePrivateConversation",
  GET_CONVERSATION_BY_ID_PATH: "Chat.ConversationById",
} as const;
export interface CreatePrivateConversationRequest {
  userId: number;
}
export interface GetConversationByIdRequest {
  convId: number;
}
export interface UnimpledChatRpcController {
  // 获取消息列表信息
  GetSequenceItem(): Promise<SequenceItem[]> | SequenceItem[];
  // 获取默认的会话信息，即根据已读位置实现的会话信息，更早及更晚方向各拉取20条
  GetDefaultMessage(
    payload: GetDefaultMessageRequest
  ): Promise<MessageResponse> | MessageResponse;
  // 获取指定的会话信息, vector: earlier or later，返回40条信息
  GetSpecifiedMessage(
    payload: GetSpecifiedMessageRequest
  ): Promise<MessageResponse> | MessageResponse;
  // 获取用户进入会话的权限
  GetUserEnterConversationLimit(
    payload: GetUserEnterConversationLimitRequest
  ): Promise<boolean> | boolean;
  // 用户发送消息
  PostUserMessage(payload: PostUserMessageRequest): Promise<Message> | Message;
  // 拉取会话消息
  GetMessages(payload: GetMessagesRequest): Promise<Message[]> | Message[];
}
export const ChatRpcControllerDefinition = {
  GET_SEQUENCE_ITEM_PATH: "ChatRpc.SequenceItem",
  GET_DEFAULT_MESSAGE_PATH: "ChatRpc.DefaultMessage",
  GET_SPECIFIED_MESSAGE_PATH: "ChatRpc.SpecifiedMessage",
  GET_USER_ENTER_CONVERSATION_LIMIT_PATH: "ChatRpc.UserEnterConversationLimit",
  POST_USER_MESSAGE_PATH: "ChatRpc.UserMessage",
  GET_MESSAGES_PATH: "ChatRpc.Messages",
} as const;

export interface GetDefaultMessageRequest {
  convId: number;
}
export interface GetSpecifiedMessageRequest {
  messageId: number;
  vector: string;
}
export interface GetUserEnterConversationLimitRequest {
  userId: number;
  convId: number;
}
export interface PostUserMessageRequest {
  userId: number;
  convId: number;
  msg: Message;
}
export interface GetMessagesRequest {
  userId: number;
  convId: number;
  originMessageId: number;
}
