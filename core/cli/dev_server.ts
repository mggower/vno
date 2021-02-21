import { oak, path } from "../lib/deps.ts";
import { print } from "./vno.cli.ts";

export const runDev = async function (port: number, hostname: string) {
  console.log("runDev: import.meta.main = ", import.meta.main);
  console.log("runDev: import.meta.url = ", import.meta.url);

  const server: oak.Application = new oak.Application();
  console.log("the call is coming from inside the house");
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
  server.addEventListener("listen", () => print.LISTEN(port, hostname));
  await server.listen({ port, hostname });
};
