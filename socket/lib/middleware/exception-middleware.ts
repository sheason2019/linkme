import Koa from "koa";

const exceptionMiddleware: Koa.Middleware = async (ctx, next) => {
  try {
    await next();
  } catch {
    ctx.status = 500;
    ctx.message = "服务发生内部错误";
  }
};

export default exceptionMiddleware;
