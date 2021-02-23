import { _, colors, fs, ProgressBar } from "../lib/deps.ts";
import * as utils from "../utils/utils.ts";
import * as fn from "./fns.ts";
import * as out from "./constants.ts";
import * as template from "./templates.ts";

export const createApplication = async function (repo?: string) {
  let app = out.options;

  // request if a user would like to customize
  const choice = await utils.prompt(out.custom);

  // customize function initializes out/stores answers
  if (choice.trim()[0].toLowerCase() === "y") app = await customize(repo);
  else fn.green(out.creating);

  // progress bar
  renderProgress();

  // app templates
  const root: string = template.rootComponent(app);
  const rootFile = `${app.root}.vue`;
  const component: string = template.childComponent(app.components[0]);
  const componentFiles = app.components.map(
    ((sfc: string) => `components/${sfc}.vue`),
  );
  const generic: string = template.genericComponent();
  const html: string = template.htmlTemplate(app);
  const config: string = template.vnoConfig(app);

  // write to app directory
  await fs.ensureDir(out.pub); // public dir
  await fs.ensureDir(out.components); // components dir
  await fs.ensureFile(out.indexhtml);
  await Deno.writeTextFile(out.indexhtml, html);
  await fs.ensureFile(out.vnoconfig);
  await Deno.writeTextFile(out.vnoconfig, config);
  await fs.ensureFile(rootFile);
  await Deno.writeTextFile(rootFile, root);
  componentFiles.forEach(async (filename: string, i: number) => {
    await fs.ensureFile(filename);
    if (i === 0) await Deno.writeTextFile(filename, component);
    else await Deno.writeTextFile(filename, generic);
  });
};

export const customize = async function (repo?: string) {
  let output = out.options;

  fn.green(out.init);
  const reqs = out.reqs.slice();

  // project title
  let title;
  if (repo) {
    reqs.pop();
    title = repo;
  } else {
    title = await utils.prompt(reqs.pop() as string);
  }

  // label root component file
  const root: string = await utils.prompt(reqs.pop() as string);

  // additional components
  const componentRes: string = await utils.prompt(reqs.pop() as string);
  const components: string[] = componentRes != null &&
      componentRes.toLowerCase().trim() != "none" &&
      componentRes.trim() != "0"
    ? componentRes.split(/\ +/)
    : out.options.components;

  // preferred port
  const portRes: string = await utils.prompt(reqs.pop() as string);
  const port: number = portRes != null
    ? parseInt(portRes.trim(), 10)
    : out.options.port;

  // request to confirm input
  fn.green(fn.confirmation(title, root, componentRes, portRes));
  const confirm: string = await utils.prompt(reqs.pop() as string);

  if (confirm.trim()[0].toLowerCase() === "y") {
    output = { title, root, components, port };
    fn.green(out.creating);
  } else { // reset on rejection
    fn.yellow(out.reset);
    await customize(repo);
  }

  return output;
};

export const renderProgress = function (): void {
  const total = 100;
  let percent = 0;

  const progressBar = new ProgressBar({
    total,
    clear: true,
    complete: colors.bgGreen(" "),
    incomplete: colors.bgWhite(" "),
    display: out.load,
  });

  const run = function () {
    if (percent <= total) {
      progressBar.render(percent++);
      setTimeout(() => run(), 20);
    }
  };
  run();
  return;
};
