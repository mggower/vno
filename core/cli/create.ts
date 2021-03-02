import { _, colors, fs, ProgressBar } from "../utils/deps.ts";
import * as fn from "./fns.ts";
import * as out from "./constants.ts";
import * as template from "./templates.ts";

interface CreateProjectObj {
  title?: string;
  custom?: boolean;
  root?: string;
  port?: string;
  components?: string[];
}

export const createApplication = async function (obj: CreateProjectObj) {
  let app = out.options;

  // customize function initializes out/stores answers
  app = await customize(obj);
  fn.green(out.creating);

  // progress bar
  renderProgress();
  let complete = false;

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

  return;
};

export const customize = async function (obj: CreateProjectObj) {
  const preset = obj.title && obj.port && obj.root && obj.components;
  let output = out.options;

  // request if a user would like to customize
  if (!preset) {
    const choice = await prompt(out.custom, "yes/no") as string;
    if (choice.trim()[0].toLowerCase() !== "y") return output;
  }

  fn.green(out.init);
  const reqs = out.reqs.slice();

  // project title
  let title;
  if (obj.title) {
    reqs.pop();
    title = obj.title;
  } else {
    title = await prompt(reqs.pop() as string, "Your Project") as string;
  }

  // label root component file
  let root;
  if (obj.root) {
    reqs.pop();
    root = obj.root;
  } else {
    root = await prompt(reqs.pop() as string, "App") as string;
  }

  // preferred port
  let port;
  if (obj.port) {
    reqs.pop();
    port = obj.port;
  } else {
    port = await prompt(reqs.pop() as string, "3000") as string;
  }
  port = parseInt(port, 10);

  // additional components
  let components;
  if (obj.components) {
    reqs.pop();
    components = obj.components;
  } else {
    const response = await prompt(reqs.pop() as string);
    components = response != null &&
        response.toLowerCase().trim() != "none" &&
        response.trim() != "0"
      ? response.split(/\ +/)
      : out.options.components;
  }

  // request to confirm input
  fn.green(
    fn.confirmation(title, root, components.join(" + "), port.toString()),
  );

  let confirm;
  if (!preset) {
    confirm = await prompt(reqs.pop() as string, "yes/no") as string;
  }

  if (preset || confirm?.trim()[0].toLowerCase() === "y") {
    output = { title, root, components, port };
    fn.green(out.creating);
  } else { // reset on rejection
    fn.yellow(out.reset);
    await customize(obj);
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
