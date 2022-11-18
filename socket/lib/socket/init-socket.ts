import { Socket } from "socket.io";
import { UserSocketsMap } from ".";
import { Message } from "../../api-lib/chat-client";
import { io } from "../../main";
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from "../../shared/socket";
import { getAccountClient, getChatRpcClient } from "../rpc/chat-rpc-client";

const initSocket = (
  socket: Socket<ClientToServerEvents, ServerToClientEvents>
) => {
  socket.on("login", async (jwt) => {
    const client = getAccountClient(jwt);
    const [err, res] = await client.GetCurrentUser();
    if (err) {
      console.error(err);
      // 返回登录失败
      socket.emit("login", false);
      // 若获取用户信息失败则关闭Socket连接
      socket.disconnect();
      return;
    }

    // 在Map中绑定用户和Socket的索引
    UserSocketsMap.bindSocketId(socket.id, { ...res, jwt });
    // 返回登录成功，前端在此时会结束初始化
    socket.emit("login", true);
  });
  // 拉取会话列表
  socket.on("sequenceItem", async () => {
    const jwt = UserSocketsMap.getUserBySocketId(socket.id)?.jwt;

    const client = getChatRpcClient(jwt);
    const [err, res] = await client.GetSequenceItem();
    if (err) {
      socket.emit("error", err.message);
      console.error(err);
      return;
    }

    socket.emit("sequenceItem", res);
  });
  // 进入指定会话
  socket.on("enterConversation", async (convId) => {
    const user = UserSocketsMap.getUserBySocketId(socket.id);
    if (!user) {
      socket.emit("error", "当前用户尚未登录");
      return;
    }

    const client = getChatRpcClient();
    // 校验用户是否为指定会话的成员
    const [err, res] = await client.GetUserEnterConversationLimit(
      user.UserId,
      convId
    );

    if (err) {
      socket.emit("error", err.message);
      console.error(err);
      return;
    }

    if (!res) {
      socket.emit("error", "用户不是指定会话的成员");
      return;
    }

    // 将该Socket加入指定的Room
    socket.join("conv::" + convId);
  });
  socket.on("postMessage", async (content, convId, mark) => {
    const user = UserSocketsMap.getUserBySocketId(socket.id);
    if (!user) {
      socket.emit("error", "当前用户尚未登录");
      return;
    }

    const message: Message = {
      Id: 0,
      Type: "",
      Content: content,
      MemberId: 0,
      TimeStamp: 0,
      TargetCheckedCount: 0,
      CurrentCheckedCount: 0,
    };
    const client = getChatRpcClient();
    const [err, res] = await client.PostUserMessage(
      user.UserId,
      convId,
      message
    );
    if (err) {
      socket.emit("error", err.message);
      return;
    }

    socket.emit("postMessage", res, convId, mark);
    socket.broadcast.to("conv::" + convId).emit("messages", convId, [res]);
  });
  socket.on("messages", async (convId, originMessageId) => {
    const user = UserSocketsMap.getUserBySocketId(socket.id);
    if (!user) {
      socket.emit("error", "当前用户尚未登录");
      return;
    }

    const client = getChatRpcClient();

    const [err, res] = await client.GetMessages(
      user.UserId,
      convId,
      originMessageId ?? 0
    );

    if (err) {
      socket.emit("error", err.message);
      return;
    }

    socket.emit("messages", convId, res);
  });
  socket.on("checkedMessage", async (convId) => {
    const user = UserSocketsMap.getUserBySocketId(socket.id);
    if (!user) {
      socket.emit("error", "当前用户尚未登录");
      return;
    }

    const client = getChatRpcClient();
    // 校验用户是否为指定会话的成员
    const [err, res] = await client.GetUserEnterConversationLimit(
      user.UserId,
      convId
    );

    if (err) {
      socket.emit("error", err.message);
      console.error(err);
      return;
    }

    if (!res) {
      socket.emit("error", "用户不是指定会话的成员");
      return;
    }

    // 向服务端发送消息查看信息
    const [checkErr, _] = await client.CheckMessage(user.UserId, convId);
    if (checkErr) {
      socket.emit("error", checkErr.message);
      console.error(err);
      return;
    }
  });
};

export default initSocket;
