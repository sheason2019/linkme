import Koa from "koa";
import Router from "koa-router";
import { ChatSocketControllerDefinition } from "../../api-lib/socket-server";
import rpcGuard from "../middleware/rpc-guard";
import ChatSocketController from "./chat-socket-controller";

const initRpcRouter = (app: Koa<Koa.DefaultState, Koa.DefaultContext>) => {
  const chatSocketController = new ChatSocketController();

  const rpcRouter = new Router({
    prefix: "/",
  });
  // 内部通信鉴权
  rpcRouter.use(rpcGuard);

  rpcRouter.post(
    ChatSocketControllerDefinition.POST_USER_SEQUENCE_PATH,
    (ctx, next) => {
      ctx.body = chatSocketController.PostUserSequence(ctx.request.body as any);
      ctx.status = 200;
      next();
    }
  );
  rpcRouter.post(
    ChatSocketControllerDefinition.POST_MESSAGES_PATH,
    (ctx, next) => {
      chatSocketController.PostMessages(ctx.request.body as any);
      ctx.status = 200;
      next();
    }
  );
  rpcRouter.post(
    ChatSocketControllerDefinition.KICKOUT_MEMBER_PATH,
    (ctx, next) => {
      chatSocketController.KickoutMember(ctx.request.body as any);
      ctx.status = 200;
      next();
    }
  );
  rpcRouter.post(
    ChatSocketControllerDefinition.CONVERSATION_UPDATE_PATH,
    (ctx, next) => {
      chatSocketController.ConversationUpdate(ctx.request.body as any);
      ctx.status = 200;
      next();
    }
  );

  app.use(rpcRouter.routes());
  app.use(rpcRouter.allowedMethods());
};

export default initRpcRouter;
