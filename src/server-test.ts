import { superoak } from "https://deno.land/x/superoak@3.0.0/mod.ts";
import { server } from "./server.ts";
import { html } from "./ssr.ts";
//when connected uncomment line 14 to test for correct html being served

Deno.test({
  name: "server responds to GET request to root with content type HTML",
  async fn() {
    const test = await superoak(server);
    await test
      .get("/")
      .expect(200)
      .expect("content-type", "text/html; charset=utf-8");
    //.expect(html);
  },
});

// Deno.test("server responds to GET request to root with correct HTML", async () => {
//   const test = await superoak(server);
//  await test
//     .get("/")
//     .expect(html);
// });
Deno.test({
  name: "GET requests to root hydrate delivered HTML",
  async fn() {
    const test = await superoak(server);
    await test
      .get("/bundle.js")
      .expect(200)
      .expect("content-type", "application/javascript");
  },
});

Deno.test({
  name: "GET request serves CSS file",
  async fn() {
    const test = await superoak(server);
    await test
      .get("/style.css")
      .expect(200)
      .expect("content-type", "text/css");
  },
});
