// deno-lint-ignore-file
import ProgressBar from "https://deno.land/x/progress@v1.2.3/mod.ts";
import { bgGreen, bgWhite } from "https://deno.land/std@0.74.0/fmt/colors.ts";
import { prompt } from "./utils.ts";

import { ensureDirSync,ensureFile } from "https://deno.land/std/fs/mod.ts";
import utils from "../src/lib/utils.ts";
import _ from "https://cdn.skypack.dev/lodash";



const userOptions = {
  title: "Your vno project",
  root: "App",
  child: "HelloVno",
  port: "3000",
};

let newAddedComps: string | string[] = "";

//runner function initializes prompts/stores answers
const runner: any = async function customize() {
  const msg1: string = "\nPlease enter a project title";
  const msg2: string =
    "\nWhat would you like to name your root Vue component?(recommend App)";
  const msg3: string =
    "\nName of additional components?(enter 'none' for default)";
  const msg4: string = "\nPort number for server";
  const msg5: string =
    "\nConfirm these results and create your project?(yes/no)";

  console.log("\nInitializing your vno project...");

  const title: string = await prompt(msg1);
  const root: string = await prompt(msg2);
/*ask user for additional comps / if user inputs them, by default, their first comp will be the first child
in CLI demo page */
  const addedComps: string = await prompt(msg3);
  const port: string = await prompt(msg4);
  console.log(
    `\nYour Options: \n \n    Title: ${title ||
      userOptions.title}, \n    Root: ${root ||
      userOptions.root}, \n    Additional Component(s): ${addedComps} \n    Port: ${port || userOptions.port} \n`,
  );
  /*re-assign global newAddedComps the value of splitting the addedComps string by 
  empty spaces into an array of comp names | logic works for any amount of spaces*/

  newAddedComps = addedComps.split(/\ +/);
  /*if user enters yes either confirm which entries are empty and need defaults and which can overwrite defaults*/

  const confirm: string = await prompt(msg5);
  if (confirm.toLowerCase() === "yes") {
    if (title) userOptions.title = title;
    if (root) userOptions.root = root;
    //if user enters 'none' or as an edgecases: '0' and a valid entry...
    if (addedComps !== 'none' && addedComps !== '0' && addedComps){
  //reassigning the first comp name to the userOptions array
        userOptions.child = newAddedComps[0]
    }
    if (port) userOptions.port = port;
  } else {
    //user inputs 'no' and CLI resets to beginning
    console.log("\nResetting User Options");
    await runner();
  }
};
/*First terminal entry. If 'yes' user guided through runner function prompts, 
otherwise default file structure is made*/
const decide = "\nWould you like to customize your vno project?(yes/no)";
const decision: string = await prompt(decide);

if (decision.toLowerCase() === "yes") {
   await runner();
} else {
  console.log("Creating vno Project");
}

//Progress bar logic
const total = 100;
const progress = new ProgressBar({
  total,
  clear: true,
  complete: bgGreen(" "),
  incomplete: bgWhite(" "),
  display: ":completed/:total vno load :time [:bar] :percent",
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


//template literal strings for HTML/Components/Server/Deps
const additionalComponent: string = `<template>
<div class="hello">
  <h1>{{ msg }}</h1>
  <p>
    For github documentation:<br>
    
    <a href="https://github.com/oslabs-beta/vno" target="_blank" rel="noopener">&nbsp;vno documentation</a>.
  </p>
  <h3>Installed CLI Plugin</h3>
  <ul>
  <li><a href="https://github.com/oslabs-beta/vno/tree/main/command-line" target="_blank" rel="noopener">Click Here</a></li>
  <br>
  </ul>
</div>
</template>
<script>
export default {
  name: '${_.kebabCase(userOptions.child)}',
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
<div id="${userOptions.root.toLowerCase()}">
<a href="https://ibb.co/mHwdLSK"><img src="https://i.ibb.co/4jGC6JL/image.png" alt="image" border="0" width="450" height="450"></a>
<${userOptions.child} msg="You are building: ${userOptions.title} with vno"/>
</div>
</template>
<script>
import '${userOptions.child}' from './components/${userOptions.child}.vue'
export default {
  name: '${_.kebabCase(userOptions.root)}',
  components: {
    ${userOptions.child}
  }
}
</script>
<style>
#${userOptions.root.toLowerCase()} {
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
    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.12"></script>
    <link rel="stylesheet" href="./style.css">
    <title>${userOptions.title}</title>
  </head>
  <body>
    <div id="${userOptions.root.toLowerCase()}">
      <!-- built files will be auto injected -->
    </div>
    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.12"></script>
    <script type="module" src='./build.js'></script>
  </body>
</html>
`;

const server: string =
  `import { Application, join, log, send } from "./deps.ts";
import vno from "../src/dist/mod.ts";
const port: number = ${userOptions.port};
const server: Application = new Application();
await vno.config({
  root: "${userOptions.root}",
  entry: "./",
  cdn: "https://cdn.jsdelivr.net/npm/vue@2.6.12",
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
  log.info("Server is up and running on port ${userOptions.port}");
  await server.listen({ port });
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
const genericComp: string = `<template>

</template>

<script>
export default {
name: 

};
</script>
<style>

</style>`;
ensureDirSync("public");

ensureDirSync("components");

ensureFile(`${userOptions.root}.vue`)
  .then(() => {
    Deno.writeTextFileSync(`${userOptions.root}.vue`, rootComp);
  });

ensureFile(`components/${userOptions.child}.vue`)
  .then(() => {
    Deno.writeTextFileSync(
      `components/${userOptions.child}.vue`,
      additionalComponent,
    );
  });
/*If there are additional comps, they are added to file tree here. All of these will have default templating*/
if(newAddedComps[1]){
for (let i = 1; i < newAddedComps.length; i += 1) {
  ensureFile(`components/${newAddedComps[i]}.vue`)
    .then(() => {
      Deno.writeTextFileSync(
        `components/${newAddedComps[i]}.vue`,
        `//created component ${newAddedComps[i]}` + "\n" + genericComp,
      );
    })
    .catch(() => {
      console.log(`error writing component: ${newAddedComps[i]}.vue`);
    });
  }
}

ensureFile("public/index.html")
  .then(() => {
    Deno.writeTextFileSync("public/index.html", html);
  });

ensureFile("deps.ts")
  .then(() => {
    Deno.writeTextFileSync("deps.ts", deps);
  });

ensureFile("server.ts")
  .then(() => {
    Deno.writeTextFileSync("server.ts", server);
  }).then(() => {
  });

