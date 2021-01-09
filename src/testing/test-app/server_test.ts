import { superoak } from "../../lib/deps.ts";
import { server } from "./server.ts";

const decoder = new TextDecoder("utf-8");
let html = Deno.readFileSync("./public/index.html");

Deno.test({
  name: "server responds to GET request to root with content type HTML",
  async fn() {
    const test = await superoak(server);
    await test
      .get("/")
      .expect(200)
      .expect("content-type", "text/html; charset=utf-8")
      .expect(decoder.decode(html));
  },
});

Deno.test({
  name: "GET requests to root hydrate delivered HTML",
  async fn() {
    const test = await superoak(server);
    await test
      .get("/build.js")
      .expect(200)
      .expect("content-type", "application/javascript; charset=utf-8");
  },
});

Deno.test({
  name: "GET request serves CSS file",
  async fn() {
    const test = await superoak(server);
    await test
      .get("/style.css")
      .expect(200)
      .expect("content-type", "text/css; charset=utf-8");
  },
});
