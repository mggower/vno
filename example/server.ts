import { Application } from "https://deno.land/x/oak/mod.ts";
import { html } from "../src/ssr.ts";

// html export is commented out to make ssr.ts serve html

// import globalImportCSS from '../globalImportCSS'
console.log("entered server.ts");
const app = new Application();

// app.use((ctx) => {
//   ctx.response.body = "Hello World!";
// });

app.use(async (ctx, next) => {
  const filePath = ctx.request.url.pathname;
  if (filePath === "/") {
    console.log("responding to GET request now");
    ctx.response.type = "text/html";
    ctx.response.body = html;
  } else await next();
  // if (filePath === "/mikeysbundle") {
  //   ctx.response.type = "application/javascript";
  //   ctx.response.body = js;
  // }
  // if (filePath === "/style?") {
  //   ctx.response.type = "text/css";
  //   ctx.response.type = "globalImportCSS";
  // } else await next();
});

// Error handler
app.use(async (ctx) => {
  ctx.throw(500, "unknown route, please look harder...");
});

app.addEventListener("listen", () => {
  console.log(`Listening on localhost: 8000`);
});

await app.listen({ port: 8000 });
