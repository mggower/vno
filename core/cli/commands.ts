import Factory from "../factory/Factory.ts";
import { fs, path } from "../lib/deps.ts";
import { createApplication, print, runDev } from "./vno.cli.ts";

const cmnd = {
  create: /create/i,
  build: /build/i,
  run: /run/i,
  dev: /dev/i,
  server: /server/i,
};

export const create = async function (args: string[]): Promise<void> {
  if (!cmnd.create.test(args[0])) return;

  const repo = args[1];
  if (repo) {
    const dir = `${Deno.cwd()}/${repo}`;
    await fs.ensureDir(dir);
    Deno.chdir(dir);
  }

  await createApplication(repo);
  return;
};

export const build = async function (args: string[]): Promise<void> {
  if (!cmnd.build.test(args[0])) return;

  const vno = new Factory();
  await vno.build();

  const quietArg =
    ((arg: string | undefined) =>
      typeof arg === "string" ? arg.toLowerCase() === "quiet" : undefined);

  if (quietArg(args[1]) || quietArg(args[2])) print.QUIET();
  else print.ASCII();
};

export const run = async function (args: string[]): Promise<void> {
  if (!cmnd.run.test(args[0])) return;

  const vno = new Factory();
  await vno.build();
  const { port, hostname } = vno;

  if (cmnd.dev.test(args[1])) {
    await runDev(port, hostname);
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
