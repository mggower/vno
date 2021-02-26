import { build, create, flags, run } from "../core/cli/commands.ts";
import { cmnd } from "../core/cli/constants.ts";

const { args } = Deno;
const command = args[0];

if (cmnd.help.test(command) || cmnd.info.test(command)) flags(args);

// ensure permissions
const read = { name: "read" } as const;
const write = { name: "write" } as const;

// permission requests
const resRead = await Deno.permissions.request(read);
const resWrite = await Deno.permissions.request(write);

if (resRead && resWrite) {
  if (cmnd.create.test(command)) await create(args);
  if (cmnd.build.test(command)) await build(args);
  if (cmnd.run.test(command)) await run(args);
}
