export interface ServerToClientEvents {}

export interface ClientToServerEvents {}

// 用户与Socket表
export class UserSocketsMap {
  // socketid - userid 表
  private socketToUser = new Map<string, number>();
  // userid - socketid 表
  private userToSocket = new Map<number, string[]>();

  getSocketsIdByUserId(userId: number) {
    return this.userToSocket.get(userId);
  }
  getUserIdBySocketId(socketId: string) {
    return this.socketToUser.get(socketId);
  }

  removeSocketId(socketId: string) {
    // 用户Socket连接断开时，需要清除两个Map中存储的数据
    const userId = this.socketToUser.get(socketId);
    if (!userId) return;

    this.socketToUser.delete(socketId);
    // 计算出指定Socket下线后用户存储的SocketId数组
    const list = this.userToSocket
      .get(userId)!
      .filter((item) => item !== socketId);
    if (list.length === 0) {
      this.userToSocket.delete(userId);
    } else {
      this.userToSocket.set(userId, list);
    }
  }

  bindSocketId(socketId: string, userId: number) {
    this.socketToUser.set(socketId, userId);
    const list = this.userToSocket.get(userId);
    if (list) {
      list.push(socketId);
    } else {
      this.userToSocket.set(userId, [socketId]);
    }
  }
}
