const read = { name: "read" } as const;
const run = { name: "run" } as const;

const resRead = await Deno.permissions.request(read);
const resRun = await Deno.permissions.request(run);

const regex: RegExp = /init/i;

if (regex.test(Deno.args[0])) {
  const p = Deno.run({
    cmd: [
      "deno",
      "run",
      "--allow-read",
      "./src/log.ts",
    ],
  });

  const { code } = await p.status();

  Deno.exit(code);
}
