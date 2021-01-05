import Initialize from "../strategies/initialize.ts";
import Creator from "../command-line/creator.ts";
import Utils from "../lib/utils.ts";
import print from "../command-line/print.ts";
import str from "../command-line/templates.ts";
import { colors, fs, oak, path } from "../lib/deps.ts";
const { Application, send } = oak;

const read = { name: "read" } as const;
const write = { name: "write" } as const;
const run = { name: "run" } as const;

const resRead = await Deno.permissions.request(read);
const resWrite = await Deno.permissions.request(write);
const resRun = await Deno.permissions.request(run);

const arg = Deno.args[0];
const bundler = new (Initialize as any)();

if (resRead && resRun && resWrite) {
  if ((/create/i).test(arg)) {
    const repo = Deno.args[1];

    if (repo) {
      const dir = `${Deno.cwd()}/${repo}`;
      await fs.ensureDir(dir);
      console.log(`NEW DIR: -> ${dir}`);
      Deno.chdir(dir);
      await Creator(repo);
    } else {
      await Creator();
    }
  }
  if ((/build/i).test(arg) || /run/i.test(arg)) {
    let configFile;

    for await (const file of fs.walk(".")) {
      const currFile = path.parse(file.path);
      if (currFile.name === "vno.config") {
        configFile = currFile;
      }
    }

    if (configFile) {
      const json = await Deno.readTextFile(
        `${Deno.cwd()}/${configFile.base}`,
      ).then((res) => JSON.parse(res));

      const config = { entry: json.entry, root: json.root };
      const { options } = json;
      await bundler.config(config);

      if (/run/i.test(arg)) {
        const port = 3000;
        const hostname = "0.0.0.0";

        const server = new Application();

        server.use(async (ctx, next) => {
          const filePath = ctx.request.url.pathname;
          if (filePath === "/") {
            ctx.response.body = str.htmlTemplate(options);
          } else if (filePath === "/build.js") {
            ctx.response.type = "application/javascript";
            await send(ctx, filePath, {
              root: path.join(Deno.cwd(), "vno-build"),
              index: "build.js",
            });
          } else if (filePath === "/style.css") {
            ctx.response.type = "text/css";
            await send(ctx, filePath, {
              root: path.join(Deno.cwd(), "vno-build"),
              index: "style.css",
            });
          } else await next();
        });

        if (import.meta.main) {
          console.log(`dev server is listening on ${hostname}:${port}`);
          await server.listen({ port, hostname });
        }
      }
    } else {
      console.warn(
        colors.yellow(
          ">> could not locate vno.config.ts \n" +
            ">> run test in root directory or create vno.config.ts",
        ),
      );
    }
  }
  const json = await Deno.readTextFile("../command-line/cmd.json")
    .then((res) => JSON.parse(res));

  if (/--help/i.test(arg)) {
    print.ASCII();
    print.INFO(json);
    print.CMDS(json);
  }

  if (/--info/i.test(arg)) {
    console.log("\n");
    print.INFO(json);
    console.log("\n");
  }
} else {
  console.warn(
    colors.yellow(
      ">> Deno needs read/write/run permissions to run vno",
    ),
  );
}

export default new (Initialize as any)();

/**
 * 
 * console.log(
  `  ${colors.yellow(colors.italic("version:"))} ${json.version}\n\n\n  ${
    colors.green(json.description)
  }`,
);
console.log(
  `\n\n  ${colors.yellow(colors.italic("docs:"))} ${json.docs}\n  ${
    colors.yellow(colors.italic("module:"))
  }: ${json.module}`,
);
console.log(
  `\n  ${colors.yellow(colors.italic("commands:"))}\n\n   ${
    colors.green(colors.italic(" create: "))
  }\n\n      ${colors.yellow(">>")}  ${
    json.commands.create.cmd[0]
  }\n\n            ${colors.italic("--or--")}\n\n      ${
    colors.yellow(">>")
  }  ${json.commands.create.cmd[1]}\n\n      ${json.commands.create.about}`,
);
console.log(
  `\n\n    ${colors.green(colors.italic(" build: "))}\n\n      ${
    colors.yellow(">>")
  }  ${json.commands.build.cmd[0]}\n\n            ${
    colors.italic("--or--")
  }\n\n      ${colors.yellow(">>")}  ${
    json.commands.build.cmd[1]
  }\n\n      ${json.commands.build.about}`,
);
 */
