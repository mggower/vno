import { Router, superoak } from "../lib/deps.ts";
import { server } from "../cli/dev.ts";

const router = new Router();

const hello = "Hello, Vno!";

router.get("/test", (ctx) => {
  ctx.response.body = hello;
});

server.use(router.routes());
server.use(router.allowedMethods());

Deno.test({
  name: "server responds to GET request supported by the Oak framework",
  async fn() {
    const request = await superoak(server);
    await request.get("/test").expect(hello);
  },
});
