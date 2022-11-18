/**
 * 本文件由Omi.js自动生成，谨慎改动！
 * 生成时间：2022年11月18日 18:38:29.
 */

import { OmiClientBase } from "@omi-stack/omi-client";
import { AxiosRequestConfig } from "axios";

export interface User {
  UserId: number;
  Username: string;
  Password: string;
  AvatarUrl?: string;
}
export interface GetCryptoInfoResponse {
  RsaPubKey: string;
  Salt: string;
  SaltId: number;
}
export interface GetUsersByUsernameResponse {
  // 拉取的用户信息
  Users: User[];
  // 是否存有更多用户
  HasMore: boolean;
}
export class AccountClient extends OmiClientBase {
  // 获取登录所需的秘钥信息
  GetCryptoInfo() {
    const url = "Account.CryptoInfo";
    const method = "Get";
    return this.request<GetCryptoInfoResponse>(url, method, {});
  }
  // 接受登录信息，返回jwt
  Login(user: User, saltId: number) {
    const url = "Account.Login";
    const method = "Post";
    return this.request<string>(url, method, { user, saltId });
  }
  // 同Login
  Regist(user: User, saltId: number) {
    const url = "Account.Regist";
    const method = "Post";
    return this.request<string>(url, method, { user, saltId });
  }
  // 使用请求头中的JWT获取当前的用户信息
  GetCurrentUser() {
    const url = "Account.CurrentUser";
    const method = "Get";
    return this.request<User>(url, method, {});
  }
  // 根据用户名搜索用户信息，一次最多拉取25条
  GetUsersByUsername(username: string, offset: number) {
    const url = "Account.UsersByUsername";
    const method = "Get";
    return this.request<GetUsersByUsernameResponse>(url, method, {
      username,
      offset,
    });
  }
}
