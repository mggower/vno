import { Application, join, log, send } from "./deps.ts";
import vno from "./strategies/renderer.ts";

const port: number = 3000;
const server: Application = new Application();

const bundle = await vno.config(
  "App",
  "./",
  "https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.esm.browser.js",
);

if (bundle) {
  server.use(async (context: any) => {
    await send(context, context.request.url.pathname, {
      root: Deno.cwd(),
      index: "index.html",
    });
  });

  if (import.meta.main) {
    log.info(`Server is up and running on ${port}`);
    await server.listen({ port });
  }
}

export { server };

// const html = vno.createRenderer({
//   title: "test",
//   root: "app",
// }, vno.root);

// console.log(html, vno.root);

// server.use(async (ctx, next) => {
//   const filePath = ctx.request.url.pathname;
//   if (filePath === "/") {
//     ctx.response.type = "text/html";
//     ctx.response.body = html;
//   } else if (filePath === "/build.js") {
//     ctx.response.type = "application/javascript";
//     await send(ctx, filePath, {
//       root: join(Deno.cwd(), "vno-build"),
//       index: "build.js",
//     });
//   } else if (filePath === "/style.css") {
//     ctx.response.type = "text/css";
//     await send(ctx, filePath, {
//       root: join(Deno.cwd(), "vno-build"),
//       index: "style.css",
//     });
//   } else await next();
// });

/**
 *  

await vno.parse({
  label: "App",
  path: vno.locate("./App.vue"),
});



const indiH = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width,initial-scale=1.0" />
    <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
    <script type="module" src='/build.js'></script>
    <link rel="stylesheet" href="/style.css">
    <title>vno test</title>
  </head>
  <body>
    <div id="app">
      <!-- built files will be auto injected -->
    </div>
    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.12"></script>
  </body>
</html>
`;
**/
