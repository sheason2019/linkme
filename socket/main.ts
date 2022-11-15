import Koa from "koa";
import Router from "koa-router";
import { Server } from "socket.io";
import http from "http";
import { generateRpc } from "./lib/rpc";
import { UserSocketsMap } from "./lib/socket";
import { getAccountClient, getChatRpcClient } from "./lib/rpc/chat-rpc-client";
import { ClientToServerEvents, ServerToClientEvents } from "./shared/socket";

const app = new Koa();
const server = new http.Server(app.callback());
export const io = new Server<ClientToServerEvents, ServerToClientEvents>(
  server
);

generateRpc();

const router = new Router();
router.get("/", (ctx, next) => {
  ctx.body = "Hello World";
});

app.use(router.routes());
app.use(router.allowedMethods());

server.listen(3000, () => {
  console.log("Service started on port 3000");
});

io.on("connection", (socket) => {
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
});
