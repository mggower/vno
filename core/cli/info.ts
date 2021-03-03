export default {
  version: "v1.1.2",
  description:
    "vno is a build tool for compiling and bunding vue single file components for a deno environment",
  docs: "https://vno.land/",
  module: "https://deno.land/x/vno@v1.1.2/install/vno.ts",
  commands: [
    {
      action: "create",
      cmd: [
        "vno create [project-name]",
        "deno run --allow-net --allow-write --allow-read --unstable https://deno.land/x/vno@v1.1.2/install/vno.ts create [project-name]",
      ],
      about:
        "The create argument will prompt you with messages on the command line to roughly create the file structure of a simple vno application",
    },
    {
      action: "build",
      cmd: [
        "vno build",
        "deno run --allow-net --allow-write --allow-read --unstable https://deno.land/x/vno@v1.1.2/install/vno.ts build",
      ],
      about:
        "The build argument will read your vno.config.json and run the bundler to create a vno-build/ package",
    },
    {
      action: "run dev",
      cmd: [
        "vno run dev",
        "deno run --allow-net --allow-write --allow-read --unstable https://deno.land/x/vno@v1.1.2/install/vno.ts run dev",
      ],
      about:
        "the run dev argument will run the bundler and host a development server",
    },
    {
      action: "run server",
      cmd: [
        "vno run server",
        "deno run --allow-net --allow-write --allow-read --allow-env --unstable https://deno.land/x/vno@v1.1.2/install/vno.ts run server",
      ],
      about:
        "the run server argument will run a build and run a users own server logic from the file provided on the 'server' property in the vno.config.json file",
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
