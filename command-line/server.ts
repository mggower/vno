import { Application, join, log, send } from "./deps.ts";
import vno from "../src/dist/mod.ts";
const port: number = 3000;
const server: Application = new Application();
await vno.config({
  root: "App",
  entry: "./",
  cdn: "https://cdn.jsdelivr.net/npm/vue@2.6.12",
});
server.use(async (ctx, next) => {
  const filePath = ctx.request.url.pathname;
  if (filePath === "/") {
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
  log.info("Server is up and running on port 3000");
  await server.listen({ port });
}
export { server };