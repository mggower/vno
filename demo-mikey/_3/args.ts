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
const msg1 = "Working Title (you can change this later): ";
const msg2 = "Would like to optimize your project with SSR?: ";
const msg3 = "Is this a single-page application?: ";
const htmlMSG = "Lets optimize your HTML template";
const msg4 = "Language: ";

// console.log(welcome);
const title = await prompt(msg1);
const ssr = await prompt(msg2);
const spa = await prompt(msg3);
console.log(htmlMSG);
const lang = await prompt(msg4);

console.log(
  `results are in:\n title: ${title}, \n ssr: ${ssr}, \n spa:${spa}, \n lang: ${lang}`,
);
