import vno from "../dist/mod.ts";
import str from "./templates.ts";
import { oak, path } from "../lib/deps.ts";
const { Application, send } = oak;

async function runDev(portReq?: number) {
  // await vno.config(config);
  // port is either the requested port or defaults to 3000;
  const port = portReq || 3000;
  const hostname = "0.0.0.0";

  const server = new Application();

  server.use(async (ctx, next) => {
    const filePath = ctx.request.url.pathname;
    if (filePath === "/") {
      await send(ctx, ctx.request.url.pathname, {
        root: path.join(Deno.cwd(), "public"),
        index: str.htmlTemplate(
          { title: "devServer", root: "App", port: "3000", child: "child" },
        ),
      });
    } else if (filePath === "/build.js") {
      ctx.response.type = "application/javascript";
      await send(ctx, filePath, {
        root: path.join(Deno.cwd(), "vno-build"),
        index: "build.js",
      });
    } else if (filePath === "/style.css") {
      ctx.response.type = "text/css";
      await send(ctx, filePath, {
        root: path.join(Deno.cwd(), "vno-build"),
        index: "style.css",
      });
    } else await next();
  });

  if (import.meta.main) {
    console.log(`dev server is listening on ${hostname}:${port}`);
    await server.listen({ port, hostname });
  }

  return server;
}

export default runDev;
