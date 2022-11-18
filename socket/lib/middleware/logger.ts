import Koa from "koa";

const logger: Koa.Middleware = async (ctx, next) => {
  const props = () => {
    if (ctx.method === "GET" || ctx.method === "DELETE") {
      return JSON.stringify(ctx.query);
    } else {
      return JSON.stringify(ctx.request.body);
    }
  };

  await next();
  console.log(`${ctx.method} ${ctx.URL} ${ctx.status}\nprops :: ${props()}`);
};

export default logger;
