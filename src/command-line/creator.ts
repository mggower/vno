import Utils from "../lib/utils.ts";
import str from "./templates.ts";
import { msgs, userOptions } from "./prompts.ts";
import { _, colors, fs, ProgressBar } from "../lib/deps.ts";

export default async function creator(repo?: string) {
  let newAddedComps: string | string[] = "";

  // customize function initializes prompts/stores answers
  async function customize() {
    console.log(colors.green("\ninitializing your vno project..."));

    // project title
    let title;
    if (repo) title = repo;
    else title = await Utils.prompt(msgs.one);
    // label of root component
    const root: string = await Utils.prompt(msgs.two);
    // additional components: ask user for additional comps if user inputs them, by default,  their first comp will be the first child in CLI demo page
    const addedComps: string = await Utils.prompt(msgs.thr);
    // preferred server port
    const port: string = await Utils.prompt(msgs.four);

    console.log(colors.green(
      `\nYour Options:\n\n` +
        `    Title: ${title || userOptions.title}\n` +
        `    Root: ${root || userOptions.root}\n` +
        `    Additional Component(s): ${addedComps}\n` +
        `    Port: ${port || userOptions.port}\n`,
    ));

    // new added components: re-assign global newAddedComps the value of the addedComps string split by empty spaces into an array of comp names logic works for any amount of spaces
    newAddedComps = addedComps.split(/\ +/);

    // if user enters yes either confirm which entries are empty and need defaults and which can overwrite defaults
    const confirm: string = await Utils.prompt(msgs.five);

    if (confirm.toLowerCase() === "yes") {
      if (title) userOptions.title = title;
      if (root) userOptions.root = root;
      // if user enters 'none' or as an edgecases: '0' and a valid entry...
      if (addedComps !== "none" && addedComps !== "0" && addedComps) {
        // reassigning the first comp name to the userOptions array
        userOptions.child = newAddedComps[0];
      }
      if (port) userOptions.port = port;
      console.log(colors.green("creating your vno project..."));
    } else {
      // user inputs 'no' and CLI resets to beginning
      console.log("\nresetting user options");
      await customize();
    }
  }
  // First terminal entry. If 'yes' user guided through customize function prompts, otherwise default file structure is made
  const decide = "\nWould you like to customize your vno project?(yes/no)";
  const decision: string = await Utils.prompt(decide);

  if (decision.toLowerCase() === "yes") {
    await customize();
  } else {
    console.log(colors.green("creating your vno project..."));
  }

  // progress bar logic
  const total = 100;
  const progress = new ProgressBar({
    total,
    clear: true,
    complete: colors.bgGreen(" "),
    incomplete: colors.bgWhite(" "),
    display: ":completed/:total vno load :time [:bar] :percent",
  });
  let completed = 0;
  function run() {
    if (completed <= total) {
      progress.render(completed++);

      setTimeout(function () {
        run();
      }, 20);
    }
  }
  run();

  // template strings for HTML/Components/Server/Deps
  const additionalComponent: string = str.childComponent(userOptions.child);
  const rootComp: string = str.rootComponent(userOptions);
  const genericComp: string = str.genericComponent();
  const html: string = str.htmlTemplate(userOptions);
  const config: string = str.vnoConfig(userOptions);

  fs.ensureDirSync("public");

  fs.ensureDirSync("components");

  fs.ensureFile(`${userOptions.root}.vue`)
    .then(() => {
      Deno.writeTextFileSync(`${userOptions.root}.vue`, rootComp);
    });

  fs.ensureFile(`components/${userOptions.child}.vue`)
    .then(() => {
      Deno.writeTextFileSync(
        `components/${userOptions.child}.vue`,
        additionalComponent,
      );
    });

  // If there are additional comps, they are added to file tree here. All of these will have default templating
  if (newAddedComps[1]) {
    for (let i = 1; i < newAddedComps.length; i += 1) {
      fs.ensureFile(`components/${newAddedComps[i]}.vue`)
        .then(() => {
          Deno.writeTextFileSync(
            `components/${newAddedComps[i]}.vue`,
            `// created component ${newAddedComps[i]}` + "\n" + genericComp,
          );
        })
        .catch(() => {
          console.log(`error writing component: ${newAddedComps[i]}.vue`);
        });
    }
  }

  fs.ensureFile("public/index.html")
    .then(() => {
      Deno.writeTextFileSync("public/index.html", html);
    });

  fs.ensureFile("vno.config.json")
    .then(() => {
      Deno.writeTextFileSync("vno.config.json", config);
    });
}
