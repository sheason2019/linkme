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
  CommitedList: number[];
}
export interface TodoItem {
  Id: number;
  Content: string;
  ReferenceList: number[];
  ContainedList: number[];
  // Status是一个Int类型的Enum， 0: 未完成 1: 已完成 2: 已提交
  Status: string;
}
export interface PostTodoPayload {
  // 当该字段不为0时，PostTodo逻辑将会创建指定Todo的引用，而不是创建新的Todo
  TodoId: number;
  // Todo内容，仅TodoId为0时会调用该字段
  Content: string;
  // 挂载位置 group 或 todo
  MountOn: string;
  MountId: number;
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
  // 创建Todo
  PostTodo(req: PostTodoPayload) {
    const url = "Todo.Todo";
    const method = "Post";
    return this.request<void>(url, method, { req });
  }
  // 修改Todo
  PutTodo(todo: TodoItem) {
    const url = "Todo.Todo";
    const method = "Put";
    return this.request<void>(url, method, { todo });
  }
  // 删除TODO
  DeleteTodo(todoId: number, mountOn: string, mountId: number) {
    const url = "Todo.Todo";
    const method = "Delete";
    return this.request<void>(url, method, { todoId, mountOn, mountId });
  }
  // 修改Group
  PutGroup(group: GroupInfo) {
    const url = "Todo.Group";
    const method = "Put";
    return this.request<void>(url, method, { group });
  }
  GetTodoItemsByIdList(idList: number[]) {
    const url = "Todo.TodoItemsByIdList";
    const method = "Get";
    return this.request<TodoItem[]>(url, method, { idList });
  }
}
