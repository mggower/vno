import Initialize from "../strategies/initialize.ts";
import { creator, info, print, str } from "../command-line/_exp.ts";
import { fs, oak, path } from "../lib/deps.ts";

// ensure permissions
const read = { name: "read" } as const;
const write = { name: "write" } as const;
const run = { name: "run" } as const;
const net = { name: "net" } as const;
// permission requests
const resRead = await Deno.permissions.request(read);
const resWrite = await Deno.permissions.request(write);
const resRun = await Deno.permissions.request(run);
const resNet = await Deno.permissions.request(net);

// vno module
const bundler = new (Initialize as any)();
// command line arguments
const { args } = Deno;

if (resRead && resRun && resWrite && resNet) {
  // vno create [project-name]
  if ((/create/i).test(args[0])) {
    const repo = args[1];
    // if a project title is provided
    if (repo) {
      const dir = `${Deno.cwd()}/${repo}`;
      await fs.ensureDir(dir);
      Deno.chdir(dir);
    }
    // run creator for an application template
    await creator(repo && repo);
  }
  // vno build || vno run dev
  if ((/build/i).test(args[0]) || /run/i.test(args[0])) {
    let configFile;
    // located vno.config.json in file system
    for await (const file of fs.walk(".")) {
      const currFile = path.parse(file.path);
      // when located, save the parsed path object to configFile;
      if (currFile.name === "vno.config") {
        configFile = currFile;
      }
    }
    if (configFile) {
      const configPath = `${Deno.cwd()}/${configFile.base}`;
      // read the vno.config.json file and parse it into js
      const json = await Deno.readTextFile(configPath)
        .then((res) => JSON.parse(res));
      // {entry, root} will be used to run the vno bundler

      const { entry, root } = json;
      // { options } stores user data that will populate an html file
      const { options } = json;
      // invoke the bundler
      await bundler.config({ entry, root });
      // if 'quiet' is run as an argument, do not print ASCII
      if (args[1] === "quiet" || args[2] === "quiet") print.QUIET();
      else print.ASCII();

      // vno run dev
      if (/run/i.test(args[0]) && /dev/i.test(args[1])) {
        const { Application, send } = oak;
        // establish port and hostname
        const port = Number(options.port) || 3000;
        const hostname = options.hostname || "0.0.0.0";

        const server = new Application();
        // respond to requests with appropriate content
        server.use(async (context, next) => {
          // locate the request url
          const { pathname } = context.request.url;
          // save the path to vno-build dir
          const buildpath = `${Deno.cwd()}/vno-build`;

          // http response
          if (pathname === "/") {
            // render template to the server
            context.response.body = str.htmlTemplate({ root, ...options });
          } else if (pathname === "/build.js") {
            context.response.type = "application/javascript";
            // bundled javascript
            await send(context, pathname, {
              root: buildpath,
              index: "build.js",
            });
          } else if (pathname === "/style.css") {
            context.response.type = "text/css";
            // component styles
            await send(context, pathname, {
              root: buildpath,
              index: "style.css",
            });
          } else {
            await next();
          }
        });
        // listen for active server
        if (import.meta.main) {
          server.addEventListener("listen", () => print.LISTEN(port, hostname));
          await server.listen({ port, hostname });
        }
      }
    } else {
      print.WARN(
        ">> could not locate vno.config.json \n>> run cmd again in root directory || create vno.config.json",
      );
    }
    //
  } else {
    // --flags to help users on the command-line
    if ((/--help/i.test(args[0])) || (/--info/i.test(args[0]))) {
      print.ASCII();
      print.INFO(info);
      // vno --help responds with info on all commands
      if (/--help/i.test(args[0])) {
        print.CMDS(info);
        print.OPTIONS(info);
      } // vno --info responds with module specific information
      if (/--info/i.test(args[0])) console.log("\n");
    }
  }
} else {
  print.WARN(">> Deno needs read/write/run permissions to run vno");
}

export default new (Initialize as any)();
