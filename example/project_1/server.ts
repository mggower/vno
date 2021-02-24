import { Application, join, log, send } from "./deps.ts";

export default async function serve() {
  const port: number = 3000;
  const server: Application = new Application();

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

  log.info("Server is up and running on http://localhost:" + port);
  await server.listen({ port });
}
