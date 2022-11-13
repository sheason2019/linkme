import Koa from "koa";
import Router from "koa-router";
import { Server } from "socket.io";
import http from "http";

const app = new Koa();
const router = new Router();

router.get("/", (ctx, next) => {
  ctx.body = "Hello World";
});

app.use(router.routes());
app.use(router.allowedMethods());

const server = new http.Server(app.callback());

server.listen(3000, () => {
  console.log("Service started on port 3000");
});

const io = new Server(server);

io.on("connection", (socket) => {});
