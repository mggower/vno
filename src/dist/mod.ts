import Initialize from "../strategies/initialize.ts";
import Creator from "../command-line/creator.ts";

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
} else {
  console.warn(
    colors.yellow(
      ">> Deno needs read/write/run permissions to run vno",
    ),
  );
}


export default bundler.config