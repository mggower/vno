import ProgressBar from "https://deno.land/x/progress@v1.2.3/mod.ts";
import { bgGreen, bgWhite } from "https://deno.land/std@0.74.0/fmt/colors.ts";
import { prompt } from "./utils.ts";
import { ensureDir, ensureFile } from "https://deno.land/std/fs/mod.ts";

const userOptions = [
  "Your vno project",
  "App",
  "HelloVno",
  "https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js",
  "3000",
];

const runner: any = async function customize() {
  const msg1: string = "Please enter a project title:";
  const msg2: string =
    "What would you like to name your root Vue component?(recommend App.vue):";
  const msg3: string =
    "What would you like to name your additional component?:";
  const msg4: string =
    "Which version of Vue would you like to use? (type 'default' for 2.6.12):";
  const msg5: string = "Port number for server:";
  const msg6: string =
    "Confirm these results and create your project?(yes/no):";

  console.log("Initializing your vno project");

  const title: string = await prompt(msg1);
  const root: string = await prompt(msg2);
  const child: string = await prompt(msg3);
  let vue: string = await prompt(msg4);
  if (vue === "default") vue = "https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js";
  const port: string = await prompt(msg5);
  console.log(
    `Your Options:\n Title: ${title}, \n Root: ${root}, \n Additional Component: ${child} \n Vue Version: ${vue} \n Port: ${port}`,
  );
  const confirm: string = await prompt(msg6);

  if (confirm.toLowerCase() === "yes") {
    if (title) userOptions[0] = title;
    if (root) userOptions[1] = root;
    if (child) userOptions[2] = child;
    if (vue) userOptions[3] = vue;
    if (port) userOptions[4] = port;
  } else {
    await runner();
  }
};

// const welcome = "initializing your vno project...";
const decide = "Would you like to customize your project?(yes/no):";
const decision: string = await prompt(decide);

if (decision.toLowerCase() === "yes") {
  await runner();
} else {
  console.log("Creating vno Project");
}

const total = 100;
const progress = new ProgressBar({
  total,
  complete: bgGreen(" "),
  incomplete: bgWhite(" "),
  display: ":completed/:total hello :time [:bar] :percent",
  clear: true,
});
let completed = 0;
function run() {
  if (completed <= total) {
    progress.render(completed++);

    setTimeout(function () {
      run();
    }, 20);
  }
}
run();

console.log(`Writing root component ${userOptions[1]}.vue`);
const additionalComponent: string = `<template>
<div class="hello">
  <h1>{{ msg }}</h1>
  <p>
    For github documentation:<br>
    
    <a href="https://github.com/oslabs-beta/vno" target="_blank" rel="noopener">&nbsp;vno documentation</a>.
  </p>
  <h3>Installed CLI Plugin</h3>
  <ul>
  <li><a href="https://github.com/oslabs-beta/vno/tree/main/command-line" target="_blank" rel="noopener">babel</a></li>
  </ul>
</div>
</template>
<script>
export default {
  name: ${userOptions[2]},
  props: {
    msg: String
  },
}
</script>
<style>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #79D0B2;
}
</style>`;

const rootComp: string = `<template>
<div id=${userOptions[1].toLowerCase()}>
<a href="https://ibb.co/mHwdLSK"><img src="https://i.ibb.co/4jGC6JL/image.png" alt="image" border="0" width="450" height="450"></a>
<${userOptions[2]} msg=${userOptions[0]}/>
</div>
</template>
<script>
import ${userOptions[2]} from ./components/${userOptions[2]}.vue
export default {
  name: ${userOptions[1].toLowerCase()},
  components: {
    ${userOptions[2]}
  }
}
</script>
<style>
#${userOptions[1].toLowerCase()} {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #79D0B2;
  margin-top: 60px;
}
</style>`;

const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width,initial-scale=1.0" />
    <script src=${userOptions[3]}></script>
    <link rel="stylesheet" href="./style.css">
    <title>${userOptions[0]}</title>
  </head>
  <body>
    <div id=${userOptions[1].toLocaleLowerCase()}>
      <!-- built files will be auto injected -->
    </div>
    <script src=${userOptions[3]}></script>
    <script type="module" src='./build.js'></script>
  </body>
</html>
`;

const server: string =
  `import { Application, join, log, send } from "./deps.ts";
import vno from "../src/strategies/renderer.ts";
const port: number = ${userOptions[4]};
const server: Application = new Application();
await vno.config({
  label: ${userOptions[1]},
  entry: "./",
  cdn: ${userOptions[3]},
});
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
});
if (import.meta.main) {
  log.info("Server is up and running on port" + ${userOptions[4]} );
  await server.listen(${userOptions[4]});
}
export { server };`;

const deps: string =
  `export { dirname, join } from "https://deno.land/std@0.74.0/path/mod.ts";
export * as log from "https://deno.land/std@0.74.0/log/mod.ts";
export {
  Application,
  Router,
  send,
} from "https://deno.land/x/oak@v6.3.1/mod.ts";
export { config } from "https://deno.land/x/dotenv/mod.ts";
`;
// const appPath: string = "./";
// const componentPath: string = "./components/";

ensureDir("public");
console.info("Done writing public dir!");

ensureDir("components");
console.log("Done writing component dir!");

// ensureDir("assets");
// console.log("Done writing assets dir!");

ensureFile(`${userOptions[1]}.vue`)
  .then(() => {
    Deno.writeTextFile(`${userOptions[1]}.vue`, rootComp);
    console.info(`Done writing ${userOptions[1]} component!`);
  });

ensureFile("public/index.html")
  .then(() => {
    Deno.writeTextFile("public/index.html", html);
    console.info("Done writing html file!");
  });

ensureFile("deps.ts")
  .then(() => {
    Deno.writeTextFile("deps.ts", deps);
    console.info("Done writing deps file!");
  });

ensureFile(`components/${userOptions[2]}.vue`)
  .then(() => {
    Deno.writeTextFile(`components/${userOptions[2]}.vue`, additionalComponent);
    console.info("Done writing");
  });

ensureFile("server.ts")
  .then(() => {
    Deno.writeTextFile("server.ts", server);
    console.info("Done writing server");
  });

console.log(`writing ${userOptions[1]}.vue`);
console.log("DONE!");
