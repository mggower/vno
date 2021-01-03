import { terminalOptions } from "../lib/types.ts";
import { _ } from "../lib/deps.ts";

// template literal strings for HTML/Components/Server/Deps
const childComponent = (childName: string) => {
  return (
    `<template>\n
    <div class="hello">\n
      <h1>{{ msg }}</h1>\n
      <p>\n
        For github documentation:<br>\n
    \n
        <a href="https://github.com/oslabs-beta/vno" target="_blank" rel="noopener">&nbsp;vno documentation</a>.\n
      </p>\n
      <h3>Installed CLI Plugin</h3>\n
        <ul>\n
          <li><a href="https://github.com/oslabs-beta/vno/tree/main/command-line" target="_blank" rel="noopener">Click Here</a></li>\n
          <br>\n
        </ul>\n
      </div>\n
      </template>\n
      \n
      <script>\n
      export default {\n
        name: '${_.kebabCase(childName)}',\n
        props: {\n
          msg: String\n
        },\n
      }\n
      </script>\n
      <style>\n
      h3 {\n
        margin: 40px 0 0;\n
      }\n
      ul {\n
        list-style-type: none;\n
        padding: 0;\n
      }\n
      li {\n
        display: inline-block;\n
        margin: 0 10px;\n
      }\n
      a {\n
        color: #79D0B2;\n
      }\n
      </style>\n`
  );
};

const rootComponent = (userOptions: terminalOptions) => {
  return (
    `<template>\n
      <div id="${userOptions.root.toLowerCase()}">\n
        <a href="https://ibb.co/mHwdLSK"><img src="https://i.ibb.co/4jGC6JL/image.png" alt="image" border="0" width="450" height="450"></a>\n
        <${userOptions.child} msg="You are building: ${userOptions.title} with vno"/>\n
      </div>\n
    </template>\n
    \n
    <script>\n
      import '${userOptions.child}' from './components/${userOptions.child}.vue'\n
      export default {\n
        name: '${_.kebabCase(userOptions.root)}',\n
        components: {\n
          ${userOptions.child}\n
        }\n
      }\n
    </script>\n
    \n
    <style>\n
      #${userOptions.root.toLowerCase()} {\n
        font-family: Avenir, Helvetica, Arial, sans-serif;\n
        -webkit-font-smoothing: antialiased;\n
        -moz-osx-font-smoothing: grayscale;\n
        text-align: center;\n
        color: #79D0B2;\n
        margin-top: 60px;\n
      }\n
    </style>\n`
  );
};

const genericComponent = () => {
  return (
    `<template>\n
    \n
     </template>\n
    \n
     <script>\n
      export default {\n
       name:\n 
      };\n
    \n
     </script>\n
    \n
     <style>\n
    \n
     </style>\n`
  );
};

const htmlTemplate = (userOptions: terminalOptions) => {
  return (
    `<!DOCTYPE html>\n
      <html lang="en">\n
        <head>\n
          <meta charset="utf-8" />\n
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />\n
          <meta name="viewport" content="width=device-width,initial-scale=1.0" />\n
          <script src="https://cdn.jsdelivr.net/npm/vue@2.6.12"></script>\n
          <link rel="stylesheet" href="./style.css">\n
          <title>${userOptions.title}</title>\n
        </head>\n
        <body>\n
          <div id="${userOptions.root.toLowerCase()}">\n
            <!-- built files will be auto injected -->\n
          </div>\n
          <script src="https://cdn.jsdelivr.net/npm/vue@2.6.12"></script>\n
          <script type="module" src='./build.js'></script>\n
        </body>\n
      </html>\n`
  );
};

const serverTemplate = (userOptions: terminalOptions) => {
  return (
    `import { Application, join, log, send } from "./deps.ts";\n
     import vno from "../src/dist/mod.ts";\n
     const port: number = ${userOptions.port};\n
     const server: Application = new Application();\n
     await vno.config({
       root: "${userOptions.root}",
       entry: "./",
       cdn: "https://cdn.jsdelivr.net/npm/vue@2.6.12",
     });\n
     server.use(async (ctx, next) => {
       const filePath = ctx.request.url.pathname;
       if (filePath === "/") {
         await send(ctx, ctx.request.url.pathname, {
           root: join(Deno.cwd(), "public"),
           index: "index.html",
         });
       } else if (filePath === "/build.js") {
         ctx.response.type = "application/javascript";
         await send(ctx, filePath, {
           root: join(Deno.cwd(), "vno-build"),
           index: "build.js",
         });
       } else if (filePath === "/style.css") {
         ctx.response.type = "text/css";
         await send(ctx, filePath, {
           root: join(Deno.cwd(), "vno-build"),
           index: "style.css",
         });
       } else await next();
     });\n
     if (import.meta.main) {
       log.info("Server is up and running on port ${userOptions.port}");
       await server.listen({ port });
     }\n
     export { server };\n`
  );
};

const depsTemplate = () => {
  return (
    `export { dirname, join } from "https://deno.land/std/path/mod.ts";
     export * as log from "https://deno.land/std/log/mod.ts";
     export { Application, Router, send } from "https://deno.land/x/oak@v6.3.1/mod.ts";
     export { config } from "https://deno.land/x/dotenv/mod.ts";`
  );
};

export default {
  childComponent,
  rootComponent,
  genericComponent,
  htmlTemplate,
  serverTemplate,
  depsTemplate,
};
