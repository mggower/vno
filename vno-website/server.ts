import { Application, join, log, send } from "./deps.ts";
const port: number = 8080;
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
  log.info("Server is up and running on port 8080");
  await server.listen({ port });
}

export { server };
