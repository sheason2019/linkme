/**
 * 本文件由Omi.js自动生成，谨慎改动！
 */

import { OmiClientBase } from "@omi-stack/omi-client";
import { AxiosRequestConfig } from "axios";

export interface GroupInfo {
  GroupId: number;
  Name: string;
  Type: string;
  TodoList: number[];
}
export interface TodoItem {
  Id: number;
  Content: string;
  ReferenceList: number[];
  ContainedList: number[];
  // Status是一个Int类型的Enum， 0: 未完成 1: 已完成 2: 已提交
  Status: number;
}
export class TodoClient extends OmiClientBase {
  GetDefaultGroup(username: string) {
    const url = "Todo.DefaultGroup";
    const method = "Get";
    return this.request<GroupInfo>(url, method, { username });
  }
  GetGroupInfoById(groupId: number) {
    const url = "Todo.GroupInfoById";
    const method = "Get";
    return this.request<GroupInfo>(url, method, { groupId });
  }
  GetTodoItemsByIdList(idList: number[]) {
    const url = "Todo.TodoItemsByIdList";
    const method = "Get";
    return this.request<TodoItem[]>(url, method, { idList });
  }
}
