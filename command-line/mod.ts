import ProgressBar from "https://deno.land/x/progress@v1.2.3/mod.ts";
import { bgGreen, bgWhite } from "https://deno.land/std@0.74.0/fmt/colors.ts";
import { prompt } from "./utils.ts";
import { ensureDir, ensureFile } from "https://deno.land/std/fs/mod.ts";

const userOptions = ["Your vno project","App.vue","HelloVno","https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js","3000"];

function customize() {
  const msg1: string = "Please enter a project title:";
  const msg2: string =
    "What would you like to name your root Vue component?(recommend App.vue): ";
  const msg3: string = "What would you like to name your additional component?:";
  const msg4: string =
    "Which version of Vue would you like to use? (type 'default' for 2.6.12):";
  const msg5: string = "Port number for server:";
  const msg6: string = "Confirm these results and create your project?(yes/no):";
  // const htmlMSG = "Lets optimize your HTML template";
  // const msg2 = "Would like to optimize your project with SSR?(yes/no): ";
  console.log(welcome);
  const titlePrompt: any = function t() {
     await prompt(msg1);
  }
  if (!titlePrompt) {
    console.log('Please enter a valid entry');
    return titlePrompt();
  };
  const root: string = await prompt(msg2);
  // const spa = await prompt(msg3);
  // const msg3 = "Is this a single-page application?(yes/no): ";
  // console.log(htmlMSG);
  const child: string = await prompt(msg3);
  const vue: string = await prompt(msg4);
  const port: string = await prompt(msg5);
  console.log(
    `Your Options:\n Title: ${title}, \n Root: ${root}, \n Additional Component: ${child} \n Vue Version: ${vue} \n Port: ${port}`,
  );
  const confirm: string = await prompt(msg6);
  
  if (confirm.toLowerCase() === "yes") {
    userOptions[0] = title
    userOptions[1] = root
    userOptions[2] = child
    userOptions[3] = vue
    userOptions[4] = port
  }
}


const welcome = "initializing your vno project...";
const decide = "Would you like to customize your project?(yes/no):";
if (decide.toLowerCase() === "yes") {
  return customize()
} else {
  console.log('Creating vno Project')
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

console.log(`Writing parent component app.vue`);
const helloVno: string = `<template>
<div class="hello">
  <h1>{{ msg }}</h1>
  <p>
    For a guide and preview of our osLabs repo<br>
    check out 
    <a href="https://github.com/oslabs-beta/vno" target="_blank" rel="noopener">&nbsp;vno documentation</a>.
  </p>
  <h3>Installed CLI Plugins</h3>
  <ul>
  <li><a href="https://github.com/jgrubb16/vnocli" target="_blank" rel="noopener">babel</a></li>
  </ul>
</div>
</template>
<script>
export default {
  name: 'HelloVno',
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

const App: string = `<template>
<div id="app">
<a href="https://ibb.co/mHwdLSK"><img src="https://i.ibb.co/4jGC6JL/image.png" alt="image" border="0" width="450" height="450"></a>
<HelloVno msg="Welcome to vno!"/>
</div>
</template>
<script>
import HelloVno from './components/HelloVno.vue'
export default {
  name: 'app',
  components: {
    HelloVno
  }
}
</script>
<style>
#app {
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
    <script src=`${vue}`></script>
    <link rel="stylesheet" href="./style.css">
    <title>`${title}`</title>
  </head>
  <body>
    <div id="app">
      <!-- built files will be auto injected -->
    </div>
    <script src=`${vue}`></script>
    <script type="module" src='./build.js'></script>
  </body>
</html>
`;

const server: string =
  `import { Application, join, log, send } from "./deps.ts";
import vno from "../src/strategies/renderer.ts";
const port: number = 3000;
const server: Application = new Application();
await vno.config({
  label: "App",
  entry: "./",
  cdn: "https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.esm.browser.js",
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
  log.info("Server is up and running on port" + port );
  await server.listen({ port });
}
export { server };`;

const deps: string =
  `export { dirname, join } from "https://deno.land/std@0.74.0/path/mod.ts";
export * as log from "https://deno.land/std@0.74.0/log/mod.ts";
// oak
export {
  Application,
  Router,
  send,
} from "https://deno.land/x/oak@v6.3.1/mod.ts";
// dotenv
export { config } from "https://deno.land/x/dotenv/mod.ts";
`;
const appPath: string = "./";
const componentPath: string = "./components/";

ensureDir("public");
console.info("Done writing public dir!");

ensureDir("components");
console.log("Done writing component dir!");

// ensureDir("assets");
// console.log("Done writing assets dir!");

ensureFile("App.vue")
  .then(() => {
    Deno.writeTextFile("App.vue", App);
    console.info("Done writing App component!");
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

ensureFile(`components/${HelloVno}.vue`)
  .then(() => {
    Deno.writeTextFile("components/HelloVno.vue", `${HelloVno}`);
    console.info("Done writing");
  });

ensureFile("server.ts")
  .then(() => {
    Deno.writeTextFile("server.ts", server);
    console.info("Done writing server");
  });

console.log("writing App.vue");
console.log("DONE!");
