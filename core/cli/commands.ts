import Factory from "../factory/Factory.ts";
import * as print from "./stdout.ts";
import info from "./info.ts";
import { fs, path } from "../utils/deps.ts";
import { createApplication } from "./create.ts";
import { runDevServer } from "./dev.ts";
import { quietArg } from "./fns.ts";
import { cmnd } from "./constants.ts";

export const create = async function (args: string[]): Promise<void> {
  if (!cmnd.create.test(args[0])) return;

  const mutable = args.slice(1);
  const title = mutable.shift();
  const root = mutable.shift();
  const port = mutable.shift();
  const components = mutable.length > 0 ? mutable : undefined;

  if (title) {
    const dir = `${Deno.cwd()}/${title}`;
    await fs.ensureDir(dir);
    Deno.chdir(dir);
  }

  await createApplication({ title, root, port, components });
  return;
};

export const build = async function (args: string[]): Promise<void> {
  if (!cmnd.build.test(args[0])) return;

  const path = args[1];
  if (path) {
    const dir = `${Deno.cwd()}/${path}`;
    if (await fs.exists(dir)) Deno.chdir(dir);
  }

  const vno = Factory.create();
  await vno.build();

  if (quietArg(args[1]) || quietArg(args[2])) print.QUIET();
  else print.ASCII();
};

export const run = async function (args: string[]): Promise<void> {
  if (!cmnd.run.test(args[0])) return;

  const vno = Factory.create();
  await vno.build();

  if (quietArg(args[2]) || quietArg(args[3])) print.QUIET();
  else print.ASCII();
  const { port, hostname } = vno;

  if (cmnd.dev.test(args[1])) {
    await runDevServer(port, hostname);
    Deno.exit(0);
  } else if (cmnd.server.test(args[1])) {
    if (vno.server == null) return;
    try {
      const handler = (await import(path.resolve(vno.server)))?.default;
      await handler();
      Deno.exit(0);
    } catch (e) {
      console.error(e);
      Deno.exit(1);
    }
  }
};

export const flags = function (args: string[]): void {
  const helpArg = cmnd.help.test(args[0]);
  const infoArg = cmnd.info.test(args[0]);

  if (!helpArg && !infoArg) return;

  print.ASCII();
  print.INFO(info);

  if (helpArg) {
    print.CMDS(info);
    print.OPTIONS(info);
  } else console.log("\n");
};
