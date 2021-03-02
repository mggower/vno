import { Application, path, send } from "../utils/deps.ts";
import * as print from "./stdout.ts";

export const server: Application = new Application();

export const runDevServer = async function (port: number, hostname: string) {
  server.use(async (ctx, next) => {
    const { pathname } = ctx.request.url;

    if (pathname === "/") {
      await send(ctx, pathname, {
        root: path.join(Deno.cwd(), "public"),
        index: "index.html",
      });
    } else if (pathname === "/build.js") {
      ctx.response.type = "application/javascript";
      await send(ctx, pathname, {
        root: path.join(Deno.cwd(), "vno-build"),
        index: "build.js",
      });
    } else if (pathname === "/style.css") {
      ctx.response.type = "text/css";
      await send(ctx, pathname, {
        root: path.join(Deno.cwd(), "vno-build"),
        index: "style.css",
      });
    } else await next();
  });

  // server error handling
  server.addEventListener("error", (e: unknown) => console.error(e));
  // listen for active server
  server.addEventListener("listen", () => print.LISTEN(port, hostname));
  await server.listen({ port, hostname });

  return server;
};
