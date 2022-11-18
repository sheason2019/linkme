import Koa from "koa";
import { getRpcMap } from "../rpc";

const rpcGuard: Koa.Middleware = async (ctx, next) => {
  const rpcToken = ctx.headers["rpc-token"];
  const rpcMap = getRpcMap();
  const allow = Object.values(rpcMap).some((token) => rpcToken === token);
  console.log("rpc-token::", rpcToken, ctx.headers, allow);
  if (allow) {
    next();
  } else {
    ctx.status = 500;
    ctx.body = "没有执行RPC请求的权限";
  }
};

export default rpcGuard;
