import Koa from "koa";
import { Server } from "socket.io";
import http from "http";
import bodyParser from "koa-bodyparser";

import { generateRpc } from "./lib/rpc";
import { ClientToServerEvents, ServerToClientEvents } from "./shared/socket";
import initSocket from "./lib/socket/init-socket";
import initRpcRouter from "./lib/controller/rpc-router";
import logger from "./lib/middleware/logger";
import { initServerHost } from "./lib/rpc/chat-rpc-client";
import exceptionMiddleware from "./lib/middleware/exception-middleware";

export const isProduct = process.argv.indexOf("-product") !== -1;

initServerHost(isProduct);

const app = new Koa();
const server = new http.Server(app.callback());

export const io = new Server<ClientToServerEvents, ServerToClientEvents>(
  server
);

app.use(exceptionMiddleware);
app.use(bodyParser());
app.use(logger);

generateRpc();

initRpcRouter(app);

server.listen(3000, () => {
  console.log("Service started on port 3000, isProduct::", isProduct);
});

io.on("connection", initSocket);
