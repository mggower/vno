import vno from "./vno-parser.ts";
// import Output from "../vno-build/Output.js";

const root = {
  label: "App",
  path: vno.locate("./App.vue"),
};
console.log("entered ssr.ts");

const help = await vno.parse(root);
const appObj: any = help.filter((obj: any) => obj.name === "App")[0];

const template = appObj.template;
const script = appObj.script;
const style: string = appObj.style;

const html: string =
  `<html><head><script type="module" src="{mikeysbundle}"></script><style type="module" src="{csss}"></style></head><body><div>${template}</div></body></html>`;

const js = script;
console.log("exited ssr.ts");

import { Application } from "https://deno.land/x/oak/mod.ts";

const app = new Application();

app.use(async (ctx, next) => {
  const filePath = ctx.request.url.pathname;
  if (filePath === "/") {
    ctx.response.type = "text/html";
    ctx.response.body = html;
  } else await next();
});

// Error handler
app.use(async (ctx) => {
  ctx.throw(500, "unknown route, please look harder...");
});

app.addEventListener("listen", () => {
  console.log(`Listening on localhost: 8000`);
});

await app.listen({ port: 8000 });
export { html, js };
