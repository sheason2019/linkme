/**
 * 本文件由Omi.js自动生成，谨慎改动！
 * 生成时间：2022年11月20日 16:57:49.
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
  Members: MessageMember[];
}
export interface Message {
  Id: number;
  Type: string;
  Content: string;
  TimeStamp: number;
  // 发送该消息的会话成员信息
  MemberId: number;
  // 已读信息的人数统计
  TargetCheckedCount: number;
  CurrentCheckedCount: number;
}
export interface MessageMember {
  MemberId: number;
  UserId: number;
  Name: string;
  AvatarUrl: string;
}
export interface MessageResponse {
  Messages: Message[];
  HasMore: boolean;
}
export interface UnimpledChatController {
  // 创建私聊会话，参数是指定的用户ID，返回的是会话ID
  CreatePrivateConversation(
    payload: CreatePrivateConversationRequest
  ): Promise<number> | number;
  // 创建群组会话，返回会话ID
  CreateGroupConversation(
    payload: CreateGroupConversationRequest
  ): Promise<number> | number;
  // 获取会话信息
  GetConversationById(
    payload: GetConversationByIdRequest
  ): Promise<Conversation> | Conversation;
}
export const ChatControllerDefinition = {
  CREATE_PRIVATE_CONVERSATION_PATH: "Chat.CreatePrivateConversation",
  CREATE_GROUP_CONVERSATION_PATH: "Chat.CreateGroupConversation",
  GET_CONVERSATION_BY_ID_PATH: "Chat.ConversationById",
} as const;
export interface CreatePrivateConversationRequest {
  userId: number;
}
export interface CreateGroupConversationRequest {
  userIds: number[];
  groupName: string;
}
export interface GetConversationByIdRequest {
  convId: number;
}
export interface UnimpledChatRpcController {
  // 获取消息列表信息
  GetSequenceItem(): Promise<SequenceItem[]> | SequenceItem[];
  // 获取用户进入会话的权限
  GetUserEnterConversationLimit(
    payload: GetUserEnterConversationLimitRequest
  ): Promise<boolean> | boolean;
  // 用户发送消息
  PostUserMessage(payload: PostUserMessageRequest): Promise<Message> | Message;
  // 拉取会话消息
  GetMessages(
    payload: GetMessagesRequest
  ): Promise<MessageResponse> | MessageResponse;
  // 消息已读功能，为了保证上线速度，这里略微偷个懒
  // 在用户进入Conversation的时候，Socet端会向服务端发起一个请求
  // 随后服务端会将用户在指定会话中的已读信息全部置为已读
  // 并且使用全量更新向用户推送经过变化的消息列表信息
  CheckMessage(payload: CheckMessageRequest): Promise<void> | void;
}
export const ChatRpcControllerDefinition = {
  GET_SEQUENCE_ITEM_PATH: "ChatRpc.SequenceItem",
  GET_USER_ENTER_CONVERSATION_LIMIT_PATH: "ChatRpc.UserEnterConversationLimit",
  POST_USER_MESSAGE_PATH: "ChatRpc.UserMessage",
  GET_MESSAGES_PATH: "ChatRpc.Messages",
  CHECK_MESSAGE_PATH: "ChatRpc.CheckMessage",
} as const;

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
export interface CheckMessageRequest {
  userId: number;
  convId: number;
}
