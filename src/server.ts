import { Application, join, log, send } from "./deps.ts";
import vno from "./vno-parser.ts";

const port: number = 4000;
const server: Application = new Application();

await vno.parse({
  label: "App",
  path: vno.locate("./App.vue"),
});

server.use(async (context) => {
  await send(context, context.request.url.pathname, {
    root: Deno.cwd(),
    index: "index.html",
  });
});

if (import.meta.main) {
  log.info(`Server is up and running on ${port}`);
  await server.listen({ port });
}

export { server };
