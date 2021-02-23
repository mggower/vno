// import { FactoryLib } from "./core/dts/factory.d.ts";

import Factory from "../core/factory/Factory.ts";

const vno = new Factory();
vno.build();

import { oak, path } from "../core/lib/deps.ts";

const port = 3000;
const hostname = "0.0.0.0";
const server: oak.Application = new oak.Application();

server.use(async (context, next) => {
  const { pathname } = context.request.url;

  if (pathname === "/") {
    await oak.send(context, pathname, {
      root: path.join(Deno.cwd(), "public"),
      index: "index.html",
    });
  } else if (pathname === "/build.js") {
    context.response.type = "application/javascript";
    await oak.send(context, pathname, {
      root: path.join(Deno.cwd(), "vno-build"),
      index: "build.js",
    });
  } else if (pathname === "/style.css") {
    context.response.type = "text/css";
    await oak.send(context, pathname, {
      root: path.join(Deno.cwd(), "vno-build"),
      index: "style.css",
    });
  } else await next();
});

// server error handling
server.addEventListener("error", (e) => console.error(e));
// listen for active server
server.addEventListener("listen", () => console.log(port, hostname));
await server.listen({ port, hostname });
