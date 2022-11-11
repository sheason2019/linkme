/**
 * 本文件由Omi.js自动生成，谨慎改动！
 * 生成时间：2022年11月11日 21:32:25.
 */

import { OmiClientBase } from "@omi-stack/omi-client";
import { AxiosRequestConfig } from "axios";

export interface User {
  Username: string;
  Password: string;
}
export class UserServiceClient extends OmiClientBase {
  // 接受登录信息，返回jwt
  Login(user: User) {
    const url = "UserService.Login";
    const method = "Post";
    return this.request<string>(url, method, { user });
  }
  // 同Login
  Regist(user: User) {
    const url = "UserService.Regist";
    const method = "Post";
    return this.request<string>(url, method, { user });
  }
}
