import Initialize from "../strategies/initialize.ts";

import { creator, print, str } from "../command-line/_exp.ts";
import { fs, oak, path } from "../lib/deps.ts";

const read = { name: "read" } as const;
const write = { name: "write" } as const;
const run = { name: "run" } as const;
const net = { name: "net" } as const;

const resRead = await Deno.permissions.request(read);
const resWrite = await Deno.permissions.request(write);
const resRun = await Deno.permissions.request(run);
const resNet = await Deno.permissions.request(net);


const bundler = new (Initialize as any)();
const { args } = Deno;

if (resRead && resRun && resWrite && resNet) {
  if ((/create/i).test(args[0])) {
    const repo = Deno.args[1];

    if (repo) {
      const dir = `${Deno.cwd()}/${repo}`;
      await fs.ensureDir(dir);
      Deno.chdir(dir);
    }

    await creator(repo && repo);
  }

  if ((/build/i).test(args[0]) || /run/i.test(args[0])) {
    let configFile;

    for await (const file of fs.walk(".")) {
      const currFile = path.parse(file.path);

      if (currFile.name === "vno.config") {
        configFile = currFile;
      }
    }

    if (configFile) {
      const configPath = `${Deno.cwd()}/${configFile.base}`;

      const json = await Deno.readTextFile(configPath)
        .then((res) => JSON.parse(res));

      const { entry, root } = json;
      const { options } = json;

      await bundler.config({ entry, root });
      if (args[1] === "quiet" || args[2] === "quiet") print.QUIET();
      else print.ASCII();

      if (/run/i.test(args[0]) && /dev/i.test(args[1])) {
        const { Application, send } = oak;

        const port = Number(options.port) || 3000;
        const hostname = options.hostname || "0.0.0.0";

        const server = new Application();

        server.use(async (context, next) => {
          const { pathname } = context.request.url;

          const buildpath = `${Deno.cwd()}/vno-build`;

          if (pathname === "/") {
            context.response.body = str.htmlTemplate(options);
          } else if (pathname === "/build.js") {
            context.response.type = "application/javascript";

            await send(context, pathname, {
              root: buildpath,
              index: "build.js",
            });
          } else if (pathname === "/style.css") {
            context.response.type = "text/css";

            await send(context, pathname, {
              root: buildpath,
              index: "style.css",
            });
          } else {
            await next();
          }
        });

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
  } else if ((/--help/i.test(args[0])) || (/--info/i.test(args[0]))) {
    const json = await Deno.readTextFile("../command-line/cmd.json")
      .then((res) => JSON.parse(res));

    print.ASCII();
    print.INFO(json);
    if (/--help/i.test(args[0])) print.CMDS(json);
    if (/--info/i.test(args[0])) console.log("\n");
  }
} else {
  print.WARN(">> Deno needs read/write/run permissions to run vno");
}

export default new (Initialize as any)();
