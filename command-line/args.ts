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
const msg1 =
  "What would you like to name your root Vue component?(recommend App.vue): ";
const msg2 = "Would like to optimize your project with SSR?(yes/no): ";
const msg4 = "Language: ";
const msg5 = "Confirm these results and create your project?(yes/no)";

// const htmlMSG = "Lets optimize your HTML template";
console.log(welcome);
const title = await prompt(msg1);
const ssr = await prompt(msg2);
// const spa = await prompt(msg3);
// const msg3 = "Is this a single-page application?(yes/no): ";
// console.log(htmlMSG);
const lang = await prompt(msg4);
console.log(
  `results are in:\n Root: ${title}, \n ssr: ${ssr}, \n lang: ${lang}`,
);
const confirm = await prompt(msg5);
