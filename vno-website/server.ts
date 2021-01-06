import { Application, join, log, send } from "./deps.ts";

const port = Number(Deno.env.get("PORT")) || 8080;
const hostname = "0.0.0.0";
const server: Application = new Application();

server.use(async (ctx, next) => {
  const filePath = ctx.request.url.pathname;
  if (filePath.slice(0, 7) === "/assets") {
    await send(ctx, ctx.request.url.pathname, {
      root: join(Deno.cwd(), "src"),
    });
  } else if (filePath === "/") {
    await send(ctx, ctx.request.url.pathname, {
      root: join(Deno.cwd(), "public"),
      index: "index.html",
    });
  } else if (filePath === "/build.js") {
    ctx.response.type = "application/javascript";
    await send(ctx, filePath, {
      root: join(Deno.cwd(), "vno-build"),
      index: "build.js",
    });
  } else if (filePath === "/style.css") {
    ctx.response.type = "text/css";
    await send(ctx, filePath, {
      root: join(Deno.cwd(), "vno-build"),
      index: "style.css",
    });
  } else await next();
});
if (import.meta.main) {
  log.info(`: server is listening on ${hostname}:${port}`);
  await server.listen({ port, hostname });
}

export { server };
