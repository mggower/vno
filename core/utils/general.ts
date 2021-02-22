import { Util } from "../dts/factory.d.ts";
// reoccuring patterns
export const patterns: Record<string, RegExp> = {
  multilineComment: /\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*\//gm,
  htmlComment: /<!--([\s\S]*?)-->/gm,
  import:
    /import(?:["'\s]*([\w*${}\n\r\t, ]+)from\s*)?["'\s]["'\s](.*[@\w_-]+)["'\s].*$/gm,
  url:
    /(ftp|http|https|file):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/gm,
  whitespace: /(\s{2,})/g,
};

// returns index of pattern match
export const indexOfRegExp: Util.IOF = function (rx, arr) {
  return arr.findIndex((el) => rx.test(el));
};

// trims excess whitespace from an slice of an array and joins as string
export const sliceAndTrim: Util.TRIM = function (input, i, j) {
  if (typeof input === "string") return input;
  return input.slice(i, j).join("").replace(patterns.whitespace, " ");
};

// trims any whitespace from a slice of a string and returns as array
export const trimAndSplit: Util.TRIM = function (input, i, j) {
  if (typeof input !== "string") return input;
  return input.slice(i, j).replace(/\s/g, "").split(",");
};

// removes carriage return for windows users
export const removeCarriageReturn: Util.TXT = function (text) {
  return text.split("\r").filter((text) => text !== "\r").join("\n");
};

// stdin/out decoder for cli
export const prompt = async function (msg: string): Promise<string> {
  const buf = new Uint8Array(1024);
  await Deno.stdout.write(new TextEncoder().encode(`${msg}: `));
  const n = <number> await Deno.stdin.read(buf);
  return new TextDecoder().decode(buf.subarray(0, n)).trim();
};

