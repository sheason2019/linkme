import { User } from "../../../api-lib/account-client";
import { Conversation } from "../../../api-lib/chat-client";

export enum SearchTabs {
  Composite = "综合",
  User = "用户",
  Group = "群组",
}

export interface IDialogState {
  open: boolean;
}

export interface ISearchData {
  searchText: string;
  users: User[];
  groups: Conversation[];
  hasMore: boolean;
}
