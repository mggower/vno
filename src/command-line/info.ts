import { infoInterface } from "../lib/types.ts";

const info: infoInterface = {
  version: "v1.0",
  description:
    "vno is deno's first native build tool for compiling and bunding vue single file components",
  docs: "https://vno.land/docs",
  module: "https://deno.land/x/vno/dist/mod.ts",
  commands: [
    {
      action: "create",
      cmd: [
        "vno create [project-name]",
        "deno run --allow-run --allow-write --allow-read --unstable https://deno.land/x/vno/dist/mod.ts create [project-name]",
      ],
      about:
        "The create argument will prompt you with messages on the command line to roughly create the file structure of a simple vno application",
    },
    {
      action: "build",
      cmd: [
        "vno build",
        "deno run --allow-run --allow-write --allow-read --unstable https://deno.land/x/vno/dist/mod.ts build",
      ],
      about:
        "The build argument will read your vno.config.json and run the bundler to create a vno-build/ package",
    },
    {
      action: "run",
      cmd: [
        "vno run dev",
        "deno run --allow-run --allow-write --allow-read --allow-net --unstable https://deno.land/x/vno/dist/mod.ts run dev",
      ],
      about:
        "the run dev argument will run the bundler and host a development server",
    },
  ],
  options: [
    {
      action: "help",
      cmd: ["--help"],
      about: "prints helpful information on all commands",
    },
    {
      action: "info",
      cmd: ["--info"],
      about: "prints module specific information",
    },
  ],
};

export default info;
