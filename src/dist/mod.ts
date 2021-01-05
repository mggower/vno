import Initialize from "../strategies/initialize.ts";
import Creator from "../command-line/creator.ts";
import Utils from "../lib/utils.ts";
import terminal from "../command-line/print.ts";

import { colors, fs, path } from "../lib/deps.ts";

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
      await fs.ensureDir(`${Deno.cwd()}/${repo}`);
      Deno.chdir(`${Deno.cwd()}/${repo}`);
      await Creator(repo);
    } else {
      await Creator();
    }
  }
  if ((/build/i).test(arg)) {
    let configFile;

    for await (const file of fs.walk(".")) {
      const currFile = path.parse(file.path);
      if (currFile.name === "vno.config") {
        configFile = currFile;
      }
    }

    if (configFile) {
      const config = await Deno.readTextFile(
        `${Deno.cwd()}/${configFile.base}`,
      ).then((res) => JSON.parse(res));

      await bundler.config(config);
    } else {
      console.warn(
        colors.yellow(
          ">> could not locate vno.config.ts \n" +
            ">> run test in root directory or create vno.config.ts",
        ),
      );
    }
  }
  if (/--help/i.test(arg)) {
    const json = await Deno.readTextFile("../command-line/cmd.json")
      .then((res) => JSON.parse(res));
    Utils.print();
    terminal(json);
  }
} else {
  console.warn(
    colors.yellow(
      ">> Deno needs read/write/run permissions to run vno",
    ),
  );
}

export default bundler;

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
