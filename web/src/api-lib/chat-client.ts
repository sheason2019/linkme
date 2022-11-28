/**
 * 本文件由Omi.js自动生成，谨慎改动！
 * 生成时间：2022年11月28日 22:56:17.
 */

import { OmiClientBase } from "@omi-stack/omi-client";
import { AxiosRequestConfig } from "axios";

// 聊天服务 IDL 定义
export interface SequenceItem {
  ConversationId: number;
  Name: string;
  LastMessage: string;
  LastUpdateTime: number;
  UnreadCount: number;
  Avatar?: string;
}
export interface Conversation {
  Id: number;
  Name: string;
  Type: string;
  MemberCount: number;
  Members: MessageMember[];
  Avatar?: string;
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
  // 成员ID和群昵称
  MemberId: number;
  Nickname: string;
  // 成员相关的用户信息
  UserId: number;
  Username: string;
  // 成员所在的会话
  ConversationId: number;
  // 成员类型和头像SourceHash
  Type: string;
  AvatarUrl: string;
  // 成员是否被移出群聊
  Removed: boolean;
}
export interface MessageResponse {
  Messages: Message[];
  HasMore: boolean;
}
export interface GetGroupResponse {
  Groups: Conversation[];
  HasMore: boolean;
}
export class ChatClient extends OmiClientBase {
  // 创建私聊会话，参数是指定的用户ID，返回的是会话ID
  CreatePrivateConversation(userId: number) {
    const url = "Chat.CreatePrivateConversation";
    const method = "Post";
    return this.request<number>(url, method, { userId });
  }
  // 创建群组会话，返回会话ID
  CreateGroupConversation(userIds: number[], groupName: string) {
    const url = "Chat.CreateGroupConversation";
    const method = "Post";
    return this.request<number>(url, method, { userIds, groupName });
  }
  // 获取会话信息
  GetConversationById(convId: number) {
    const url = "Chat.ConversationById";
    const method = "Get";
    return this.request<Conversation>(url, method, { convId });
  }
  // 搜索群组信息，目前只能搜索已加入的群组，在群组可见度功能上线后，这里要同步更改成所有可搜索到的群组
  GetGroup(searchText: string, offset: number) {
    const url = "Chat.Group";
    const method = "Get";
    return this.request<GetGroupResponse>(url, method, { searchText, offset });
  }
  // 设置群组名称
  PutGroupName(groupId: number, name: string) {
    const url = "Chat.GroupName";
    const method = "Put";
    return this.request<void>(url, method, { groupId, name });
  }
  // 移除群组中的成员
  DeleteMembers(membersId: number[]) {
    const url = "Chat.Members";
    const method = "Delete";
    return this.request<void>(url, method, { membersId });
  }
  // 移除消息列表中的项
  DeleteSequenceItem(convId: number) {
    const url = "Chat.SequenceItem";
    const method = "Delete";
    return this.request<void>(url, method, { convId });
  }
  // 为群组邀请新成员
  PutMembers(convId: number, usersId: number[]) {
    const url = "Chat.Members";
    const method = "Put";
    return this.request<void>(url, method, { convId, usersId });
  }
  // 修改用户在群组中的昵称
  PutMemberNickname(convId: number, nickName: string) {
    const url = "Chat.MemberNickname";
    const method = "Put";
    return this.request<void>(url, method, { convId, nickName });
  }
}
export class ChatRpcClient extends OmiClientBase {
  // 获取消息列表信息
  GetSequenceItem() {
    const url = "ChatRpc.SequenceItem";
    const method = "Get";
    return this.request<SequenceItem[]>(url, method, {});
  }
  // 添加消息列表中的项，返回值表示消息列表是否发生改变
  PostSequenceItem(userId: number, convId: number) {
    const url = "ChatRpc.SequenceItem";
    const method = "Post";
    return this.request<boolean>(url, method, { userId, convId });
  }
  // 获取用户进入会话的权限
  GetUserEnterConversationLimit(userId: number, convId: number) {
    const url = "ChatRpc.UserEnterConversationLimit";
    const method = "Get";
    return this.request<boolean>(url, method, { userId, convId });
  }
  // 用户发送消息
  PostUserMessage(userId: number, convId: number, msg: Message) {
    const url = "ChatRpc.UserMessage";
    const method = "Post";
    return this.request<Message>(url, method, { userId, convId, msg });
  }
  // 拉取会话消息
  GetMessages(userId: number, convId: number, originMessageId: number) {
    const url = "ChatRpc.Messages";
    const method = "Get";
    return this.request<MessageResponse>(url, method, {
      userId,
      convId,
      originMessageId,
    });
  }
  // 消息已读功能，为了保证上线速度，这里略微偷个懒
  // 在用户进入Conversation的时候，Socet端会向服务端发起一个请求
  // 随后服务端会将用户在指定会话中的已读信息全部置为已读
  // 并且使用全量更新向用户推送经过变化的消息列表信息
  CheckMessage(userId: number, convId: number) {
    const url = "ChatRpc.CheckMessage";
    const method = "Post";
    return this.request<void>(url, method, { userId, convId });
  }
}
