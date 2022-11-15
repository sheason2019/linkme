import Koa from "koa";
import Router from "koa-router";
import { Server } from "socket.io";
import http from "http";
import { generateRpc } from "./lib/rpc";

const app = new Koa();
const server = new http.Server(app.callback());
export const io = new Server(server);

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

io.on("connection", (socket) => {});
