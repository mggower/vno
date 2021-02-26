import { Util } from "../dts/factory.d.ts";

export const custom = "\nWould you like to customize your vno project? (y/n)";
export const init = "\n\ninitializing you vno project...\n";
export const creating = "\ncreating your vno project...\n";
export const reset = "\nresetting user options\n";

export const load = ":completed/:total vno load :time [:bar] :percent";
export const pub = "public";
export const components = "components";
export const indexhtml = `${pub}/index.html`;
export const vnoconfig = "vno.config.json";

export const options: Util.CreateInputs = {
  title: "your project",
  root: "App",
  components: ["HelloVno"],
  port: 3000,
};

export const reqs: string[] = [
  "\nConfirm these results and create your project? (y/n)",
  "\nPort number for server",
  "\nName of additional components? (enter 'none' for default)",
  "\nWhat would you like to name your root Vue component? (recommend: App)",
  "\nPlease enter a project title",
];

// command tests
export const cmnd = {
  create: /create/i,
  build: /build/i,
  run: /run/i,
  dev: /dev/i,
  server: /server/i,
  quiet: /quiet/i,
  help: /--help/i,
  info: /--info/i,
};