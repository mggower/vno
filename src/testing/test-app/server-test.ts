import { superoak } from "https://deno.land/x/superoak@3.0.0/mod.ts";
import { server } from "./server.ts";
import { describe, it } from "https://deno.land/x/superoak@3.0.0/test/utils.ts";

import { assertEquals } from "https://deno.land/std@0.83.0/testing/asserts.ts";
//readfile for HTML file to check
const decoder = new TextDecoder("utf-8");
let html = Deno.readFileSync("./public/index.html");
// console.log(decoder.decode((html));
//when connected uncomment line 14 to test for correct html being served

//set up dummy components
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
