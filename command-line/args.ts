import { prompt } from "./utils.ts";

// let args = Deno.args;

// console.log(args);

// Deno.env.set("DEVELOPMENT", "currently working in development");

// let env = Deno.env.get("DEVELOPMENT");

// console.log(env);

// await Deno.stdout.write(new TextEncoder().encode("Post Title: "));

// const buf = new Uint8Array(1024);
// const n = <number> await Deno.stdin.read(buf);
// const title = new TextDecoder().decode(buf.subarray(0, n)).trim();
// console.log(title);

const welcome = "initializing your vno project...";
const decide = "Would you like to customize your project?(yes/no):";
if (decide.toLowerCase() === "yes") {
}

function customize() {
  const msg1 = "Please enter a project title:";
  const msg2 =
    "What would you like to name your root Vue component?(recommend App.vue): ";
  const msg3 = "What would you like to name your additional component?:";
  const msg4 =
    "Which version of Vue would you like to use? (type 'default' for 2.6.12):";
  const msg5 = "Port number for server:";
  const msg6 = "Confirm these results and create your project?(yes/no):";
  // const htmlMSG = "Lets optimize your HTML template";
  // const msg2 = "Would like to optimize your project with SSR?(yes/no): ";
  console.log(welcome);
  const title = await prompt(msg1);
  const root = await prompt(msg2);
  // const spa = await prompt(msg3);
  // const msg3 = "Is this a single-page application?(yes/no): ";
  // console.log(htmlMSG);
  const child = await prompt(msg3);
  const vue = await prompt(msg4);
  const port = await prompt(msg5);
  console.log(
    `Your Options:\n Title: ${title}, \n Root: ${root}, \n Additional Component: ${child} \n Vue Version: ${vue} \n Port: ${port}`,
  );
  const confirm = await prompt(msg6);
  const userOptions = [];
  if (confirm.toLowerCase() === "yes") {
    userOptions.push(
      title || "Your vno project",
      root || "App.vue",
      child || "HelloVno",
      vue || "https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js",
      port || "3000",
    );
  }
}
