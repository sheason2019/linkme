import { User } from "../../api-lib/account-client";

interface UserWithJwt extends User {
  jwt: string;
}

// 用户与Socket表
export class UserSocketsMap {
  // socketid - userid 表
  private static socketToUser = new Map<string, UserWithJwt>();
  // userid - socketid 表
  private static userToSocket = new Map<number, string[]>();

  static getSocketsIdByUserId(userId: number) {
    return this.userToSocket.get(userId);
  }
  static getUserBySocketId(socketId: string) {
    return this.socketToUser.get(socketId);
  }

  static removeSocketId(socketId: string) {
    // 用户Socket连接断开时，需要清除两个Map中存储的数据
    const user = this.socketToUser.get(socketId);
    if (!user) return;

    this.socketToUser.delete(socketId);
    // 计算出指定Socket下线后用户存储的SocketId数组
    const list = this.userToSocket
      .get(user.UserId)!
      .filter((item) => item !== socketId);
    if (list.length === 0) {
      this.userToSocket.delete(user.UserId);
    } else {
      this.userToSocket.set(user.UserId, list);
    }
  }

  static bindSocketId(socketId: string, user: UserWithJwt) {
    this.socketToUser.set(socketId, user);
    const list = this.userToSocket.get(user.UserId);
    if (list) {
      list.push(socketId);
    } else {
      this.userToSocket.set(user.UserId, [socketId]);
    }
  }
}
