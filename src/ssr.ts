import vno from "./vno-parser.ts";
import { join } from "https://deno.land/std@0.74.0/path/mod.ts";
import { send } from "./deps.ts";

// import Output from "../vno-build/Output.js";
// const text: any = await Deno.readTextFile("../example/public/index.html");

// Root Obj
const root = {
  name: "App",
  path: vno.locate("./App.vue"),
};
console.log("entered ssr.ts");

//Assign const parsedCache a value of an array of children components from the vno-parser's cache
const parsedCache: any = await vno.parse(root);
//template will be the <template> string
const template: string = parsedCache.template;
//script will be the <script> string
const script: string = parsedCache.script;
//style will be the <style> string
const style: string = parsedCache.style;

//POSSIBLE INTERFACE FOR HTML-OBJ
// interface htmlConfig {
//   template: string,
//   script: string,
//   style: string,
//   name: string;
// }

/*Function which will build an html file injected with the root's template, script, name, and style values*/
function htmlBuild(obj: any) {
  const cssFile = vno.locate("./bonusCSS.css");

  /*An object within the function which assigns the correct property-values for each component. 
  If object passed in does not havecorrect value, a default value will be inserted*/
  const htmlObj: any = {
    //root of the app or "app"
    rootName: obj.rootName || "app",

    //the current working directory + the vno-build folder/file extensions (no default value assigned yet)
    build: join(Deno.cwd(), "./vno-build/build.js"),

    //root's template or default template
    template: obj.template ||
      `<template>
    <div id="app">
      <h1> Default Template </h1>
    </div>
  </template>`,

    //root's script or default script
    script: obj.script ||
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

    //root's style or default styile

    style: obj.style ||
      `<style>
  body {
    background-color: #025373;
  }
  </style>`,
  };

  //assign finalHtml const to a value of an interpolated string of htmlObj values
  const finalHtml: string =
    // eslint-disable-next-line [RULE]
    `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width,initial-scale=1.0" />
    <link rel="stylesheet" href="bonusCSS.css"/>
    <title>parsingVno</title>
  </head>
  <body>
  <h1>template</h1>
  ${htmlObj.template}
    <noscript>
      <strong
        >We're sorry but <%= htmlWebpackPlugin.options.title %> doesn't work
        properly without JavaScript enabled. Please enable it to
        continue.</strong
      >
    </noscript>
    <div id="${htmlObj.root}">
      <!-- built files will be auto injected -->
      <script>${htmlObj.script}</script>
      </div>
      <script type="module" src="${htmlObj.build}"></script>
    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.12"></script>
    <script type="module">
      import ${htmlObj.rootName} from './src/${htmlObj.rootName}.js';
    </script>
  </body>
</html>`;
  //return out the finalHtml var
  return finalHtml;
}

//Assign 'html' const the evaluated result of calling htmlBuild function on the vno's root obj
const html: any = htmlBuild(vno.root);
console.log("HTML: ", html);
console.log("exited ssr.ts");

import { Application } from "https://deno.land/x/oak/mod.ts";
// import { tokensToFunction } from "https://deno.land/x/path_to_regexp@v6.2.0/index.ts";

const app = new Application();

//if endpoint '/' is requested, the pre-interpolated html file will be served in the response body
app.use(async (ctx: any, next) => {
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

export { html };

//extra crap we may need with regex and HTML
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
