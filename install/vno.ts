import { build, create, run } from "../core/cli/vno.cli.ts";

// ensure permissions
const read = { name: "read" } as const;
const write = { name: "write" } as const;
// permission requests
const resRead = await Deno.permissions.request(read);
const resWrite = await Deno.permissions.request(write);

const { args } = Deno;

const cmnd = {
  create: /create/i,
  build: /build/i,
  run: /run/i,
};

if (resRead && resWrite) {
  if (cmnd.create.test(args[0])) await create(args);
  if (cmnd.build.test(args[0])) await build(args);
  if (cmnd.run.test(args[0])) await run(args);
}
