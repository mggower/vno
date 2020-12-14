import vno from "./vno-parser.ts";
import { join } from "https://deno.land/std@0.74.0/path/mod.ts";

// import Output from "../vno-build/Output.js";
// const text: any = await Deno.readTextFile("../example/public/index.html");

const root = {
  name: "App",
  path: vno.locate("./App.vue"),
};
console.log("entered ssr.ts");

const parsed: any = await vno.parse(root);
console.log(parsed);
// console.log("HELP: ", help);
const appObj = await vno.root;
console.log("appObj: ", appObj);
// console.log("APP-OBJ: ", appObj);
const template = appObj.template;
// console.log("TEMPLATE,", template);
const script = appObj.script;
// console.log("SCRIPT: ", script);
const style: string = appObj.style;

const htmlRoot = root.name;

// const htmlRead = Deno.readTextFile("../example/public/index.html");
// console.log(htmlRead);

//POSSIBLE INTERFACE FOR HTML-OBJ
// interface htmlConfig {
//   template: string,
//   script: string,
//   style: string,
//   name: string;
// }

const htmlObj: object = {
  root: root.name || "App",

  build: join(Deno.cwd(), "./vno-build/build.js"),

  template: `${template}` ||
    `<template>
  <div id="app">
    <h1> Default Template </h1>
  </div>
</template>`,

  script: `${script}` ||
    `<script>
export default {
  name: 'app',
  data() {
    return {

    }
  },
  components: {
    
  }
}
</script>`,

  style: `${style}` ||
    `<style>
body {
  background-color: #025373;
}
</style>`,
};

function htmlBuild(obj: any) {
  `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width,initial-scale=1.0" />
    <link
      href="https://fonts.googleapis.com/css?family=Montserrat|PT+Serif"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="./src/assets/style.css" />
    <title>parsingVno</title>
  </head>
  <body>
  <h1>template</h1>
  ${obj.template}
    <noscript>
      <strong
        >We're sorry but <%= htmlWebpackPlugin.options.title %> doesn't work
        properly without JavaScript enabled. Please enable it to
        continue.</strong
      >
    </noscript>
    <div id="${obj.root}">
      <!-- built files will be auto injected -->
      ${obj.script}
    </div>
    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.12"></script>
    <script type="module">
    <script src=${obj.build}>
      import ${obj.root} from './src/${obj.root}.js';
    </script>
  </body>
</html>`;
}
const html: any = htmlBuild(htmlObj);

console.log("exited ssr.ts");

import { Application } from "https://deno.land/x/oak/mod.ts";
// import { tokensToFunction } from "https://deno.land/x/path_to_regexp@v6.2.0/index.ts";

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

// const divRegex = /<\W*div id="app">/;
// const divRegex2 = /<\/div>/;
// const scriptRegex = /<\W*script type="module">/;
// const docType = text.split(divRegex)[0].split(/\n|\s{2,}/).join("");
// const htmlInject = text.split(divRegex)[1].split(/\n|\s{2,}/).join("");
// const htmlInject2 = htmlInject.split(divRegex2)[1];
// const htmlInject3 = htmlInject.split(scriptRegex)[0];
// const htmlInject4 = htmlInject.split(scriptRegex)[1];

// const finalHtml =
//   `${docType}\n<div id="app">\n${template}\n</div>\n<script>${script}</script>\n${htmlInject3}\n<script type="model src=BUNDLE\n${htmlInject4}`;
// console.log("final", finalHtml);
